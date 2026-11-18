import type {D1PreparedStatement} from '@cloudflare/workers-types';
import {statuses} from '../src/data/measurement';
import type {Env,InquiryRow} from './types';
import {audit} from './auth';
import {HttpError,csvCell,json,readJson,sameOrigin,text,uuid} from './http';

type SqlValue=string|number;
export const TZ=8*3600000,DAY=86400000;
const dateString=(n:number)=>new Date(n+TZ).toISOString().slice(0,10);
export function dateRange(params:URLSearchParams,now=Date.now()){
  const from=params.get('from')||dateString(now),to=params.get('to')||dateString(now);
  const parse=(s:string)=>/^\d{4}-\d{2}-\d{2}$/.test(s)?Date.parse(s+'T00:00:00+08:00'):NaN;
  const start=parse(from),end=parse(to)+DAY;
  if(!Number.isFinite(start)||!Number.isFinite(end)||dateString(start)!==from||dateString(end-DAY)!==to||end<=start||end-start>93*DAY)throw new HttpError(400,'请选择有效日期范围，最长 93 天。');
  return {from,to,start,end,previousStart:start-(end-start),previousEnd:start};
}
export function where(params:URLSearchParams,kind:'events'|'inquiries',start:number,end:number){
  const alias=kind==='events'?'e':'i',clauses=[`${alias}.created_at>=?`,`${alias}.created_at<?`],values:SqlValue[]=[start,end];
  if(params.get('traffic')!=='all')clauses.push(`${alias}.is_test=0`);
  for(const [key,column] of [['source','source'],['country',kind==='events'?'country':'visit_country'],['language','language']] as const){
    const value=params.get(key);if(value){clauses.push(`${alias}.${column}=?`);values.push(text(value,200));}
  }
  const product=params.get('product');
  if(product){
    clauses.push(kind==='events'?`${alias}.product=?`:`EXISTS (SELECT 1 FROM json_each(${alias}.products_json) WHERE value=?)`);values.push(text(product,300));
  }
  if(kind==='inquiries'&&params.get('validOnly')==='1')clauses.push("i.status!='spam'");
  return {sql:clauses.join(' AND '),values};
}
function inquiryWhere(params:URLSearchParams){
  const clauses=['1=1'],values:SqlValue[]=[];
  if(params.get('traffic')!=='all')clauses.push('i.is_test=0');
  if(params.get('validOnly')==='1')clauses.push("i.status!='spam'");
  const q=text(params.get('q'),100);
  if(q){clauses.push("(i.name LIKE ? ESCAPE '\\' OR i.company LIKE ? ESCAPE '\\' OR i.email LIKE ? ESCAPE '\\' OR i.phone LIKE ? ESCAPE '\\' OR i.requirements LIKE ? ESCAPE '\\')");const like='%'+q.replace(/[\\%_]/g,'\\$&')+'%';values.push(like,like,like,like,like);}
  if(params.get('status')){if(!Object.hasOwn(statuses,params.get('status')!))throw new HttpError(400,'询盘状态无效。');clauses.push('i.status=?');values.push(params.get('status')!);}
  if(params.get('read')==='0'||params.get('read')==='1'){clauses.push('i.is_read=?');values.push(Number(params.get('read')));}
  for(const key of ['country','language','source'] as const){if(params.get(key)){clauses.push(`i.${key}=?`);values.push(text(params.get(key),200));}}
  if(params.get('visitCountry')){clauses.push('i.visit_country=?');values.push(text(params.get('visitCountry'),200));}
  if(params.get('product')){clauses.push('EXISTS (SELECT 1 FROM json_each(i.products_json) WHERE value=?)');values.push(text(params.get('product'),300));}
  if(params.get('scope')==='queue'){
    clauses.push("i.status IN ('pending','following')");
  }else{
    const range=dateRange(params);
    clauses.push('i.created_at>=? AND i.created_at<?');
    values.push(range.start,range.end);
  }
  return {sql:clauses.join(' AND '),values};
}
const safeInquiry=(row:InquiryRow)=>{
  const {fingerprint:_,idempotency_key:__,draft_json,products_json,...rest}=row;
  return {...rest,draft:JSON.parse(draft_json),products:JSON.parse(products_json)};
};
const previewInquiry=(row:InquiryRow)=>{
  const item=safeInquiry(row);
  return {id:item.id,created_at:item.created_at,name:item.name,company:item.company,email:item.email,phone:item.phone,country:item.country,status:item.status,is_read:item.is_read,is_test:item.is_test,source:item.source,vehicles:item.draft.vehicles.map((v:{model:string;quantity:string;variant:string})=>({model:v.model,quantity:v.quantity,variant:v.variant}))};
};
export async function listInquiries(request:Request,env:Env){
  const params=new URL(request.url).searchParams,w=inquiryWhere(params),page=Math.max(1,Math.min(100000,Math.floor(Number(params.get('page'))||1))),size=25;
  const base=new URLSearchParams(params);base.delete('status');base.delete('read');const bw=inquiryWhere(base);
  const order=params.get('scope')==='queue'?"(i.status='following'),i.created_at ASC,i.id":"i.created_at DESC,i.id";
  const [count,rows,counts]=await env.DB.batch([
    env.DB.prepare(`SELECT COUNT(*) AS total FROM inquiries i WHERE ${w.sql}`).bind(...w.values),
    env.DB.prepare(`SELECT i.* FROM inquiries i WHERE ${w.sql} ORDER BY ${order} LIMIT ? OFFSET ?`).bind(...w.values,size,(page-1)*size),
    env.DB.prepare(`SELECT COUNT(*) AS all_count,SUM(is_read=0) AS unread,SUM(status='pending') AS pending,SUM(status='following') AS following,SUM(status='completed') AS completed,SUM(status='spam') AS spam FROM inquiries i WHERE ${bw.sql}`).bind(...bw.values)
  ]);
  return json({total:(count.results[0] as {total:number})?.total||0,page,pageSize:size,counts:Object.fromEntries(Object.entries(counts.results[0]||{}).map(([key,value])=>[key,Number(value||0)])),rows:(rows.results as unknown as InquiryRow[]).map(row=>params.get('compact')==='1'?previewInquiry(row):safeInquiry(row))});
}
export async function inquiryDetail(id:string,env:Env){
  if(!uuid(id))throw new HttpError(404,'询盘不存在。');
  const row=await env.DB.prepare('SELECT * FROM inquiries WHERE id=?').bind(id).first<InquiryRow>();
  if(!row)throw new HttpError(404,'询盘不存在。');
  const notes=await env.DB.prepare('SELECT * FROM inquiry_notes WHERE inquiry_id=? ORDER BY created_at DESC').bind(id).all();
  return json({inquiry:safeInquiry(row),notes:notes.results});
}
export async function updateInquiry(request:Request,id:string,env:Env,actor:string){
  sameOrigin(request,env);if(!uuid(id))throw new HttpError(404,'询盘不存在。');
  const body=await readJson(request,4096),version=Number(body.version);
  const clauses:string[]=[],values:SqlValue[]=[];
  if(body.status!==undefined){if(typeof body.status!=='string'||!Object.hasOwn(statuses,body.status))throw new HttpError(400,'状态无效。');clauses.push('status=?');values.push(body.status);}
  if(body.is_read!==undefined){if(typeof body.is_read!=='boolean')throw new HttpError(400,'阅读状态无效。');clauses.push('is_read=?');values.push(Number(body.is_read));}
  if(!clauses.length||!Number.isSafeInteger(version))throw new HttpError(400,'更新内容无效。');
  const result=await env.DB.prepare(`UPDATE inquiries SET ${clauses.join(',')},updated_at=?,version=version+1 WHERE id=? AND version=?`).bind(...values,Date.now(),id,version).run();
  if(!result.meta.changes)throw new HttpError(409,'记录已被更新，请重新打开后再操作。');
  await audit(env,actor,'inquiry.update',id);
  return inquiryDetail(id,env);
}
export async function addNote(request:Request,id:string,env:Env,actor:string){
  sameOrigin(request,env);const body=await readJson(request,8192),note=text(body.note,4000),noteId=uuid(body.id);
  if(!note||!noteId||!uuid(id))throw new HttpError(400,'请填写有效备注。');
  if(!await env.DB.prepare('SELECT id FROM inquiries WHERE id=?').bind(id).first())throw new HttpError(404,'询盘不存在。');
  await env.DB.prepare('INSERT OR IGNORE INTO inquiry_notes VALUES (?,?,?,?,?)').bind(noteId,id,Date.now(),actor,note).run();
  return inquiryDetail(id,env);
}
export async function exportInquiries(request:Request,env:Env,actor:string){
  const params=new URL(request.url).searchParams,w=inquiryWhere(params);
  const size=await env.DB.prepare(`SELECT COUNT(*) AS count,COALESCE(SUM(length(i.requirements)+length(i.name)+length(i.company)+length(i.email)+length(i.phone)+length(i.page)+COALESCE((SELECT SUM(length(note)) FROM inquiry_notes WHERE inquiry_id=i.id),0)),0) AS characters FROM inquiries i WHERE ${w.sql}`).bind(...w.values).first<{count:number;characters:number}>();
  if((size?.count||0)>10000||(size?.characters||0)>4000000)throw new HttpError(413,'导出内容过大，请缩小日期范围后重试（最多 10000 条或 400 万字符）。');
  const {results}=await env.DB.prepare(`SELECT i.*, (SELECT group_concat(note,' | ') FROM inquiry_notes WHERE inquiry_id=i.id) AS notes FROM inquiries i WHERE ${w.sql} ORDER BY i.created_at DESC LIMIT 10001`).bind(...w.values).all<InquiryRow&{notes:string}>();
  if(results.length>10000)throw new HttpError(413,'单次最多导出 10000 条，请缩小日期范围。');
  const columns=['编号','提交时间（北京时间）','姓名','公司','邮箱','电话','目的国家','意向产品和需求','提交页面','网站语言','来源','外部来源域名','访问国家','匿名访客编号','状态','已读','内部测试','跟进备注'];
  const rows=results.map(r=>[r.id,new Date(r.created_at+TZ).toISOString().replace('T',' ').slice(0,19),r.name,r.company,r.email,r.phone,r.country,r.requirements,r.page,r.language,r.source,r.referrer_host,r.visit_country,r.visitor_id||'未知',statuses[r.status],r.is_read?'是':'否',r.is_test?'是':'否',r.notes||'']);
  await audit(env,actor,'inquiry.export',String(rows.length));
  return new Response('\ufeff'+[columns,...rows].map(row=>row.map(csvCell).join(',')).join('\r\n'),{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':`attachment; filename="keeyak-inquiries-${dateString(Date.now())}.csv"`,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}
const number=(row:Record<string,unknown>|null,key:string)=>Number(row?.[key]||0);
async function metrics(env:Env,params:URLSearchParams,start:number,end:number){
  const e=where(params,'events',start,end),ip=new URLSearchParams(params);ip.set('validOnly','1');const i=where(ip,'inquiries',start,end);
  const [events,inquiries]=await env.DB.batch([
    env.DB.prepare(`SELECT COUNT(DISTINCT CASE WHEN name='page_view' THEN visitor_id END) AS visitors,
      COUNT(DISTINCT CASE WHEN name='page_view' THEN session_id END) AS visits,
      SUM(name='page_view') AS pageviews,
      SUM(name='page_view' AND visitor_id IS NULL) AS anonymous_pageviews,
      COUNT(DISTINCT CASE WHEN name='page_view' AND is_returning=1 THEN visitor_id END) AS "returning",
      SUM(name IN ('whatsapp_click','email_click')) AS contacts,
      SUM(name='whatsapp_click') AS whatsapp_clicks,SUM(name='email_click') AS email_clicks,
      COUNT(DISTINCT CASE WHEN name='form_start' THEN visitor_id END) AS form_starters
      FROM events e WHERE ${e.sql}`).bind(...e.values),
    env.DB.prepare(`SELECT COUNT(*) AS inquiries,SUM(status='pending') AS pending,SUM(status='following') AS following,SUM(is_read=0) AS unread FROM inquiries i WHERE ${i.sql}`).bind(...i.values)
  ]);
  const row=events.results[0] as Record<string,unknown>;
  return Object.fromEntries(['visitors','visits','pageviews','anonymous_pageviews','returning','contacts','whatsapp_clicks','email_clicks','form_starters'].map(key=>[key,number(row,key)]).concat(['inquiries','pending','following','unread'].map(key=>[key,number(inquiries.results[0] as Record<string,unknown>,key)])));
}
const trendKeys=['visitors','pageviews','visits','contacts','whatsapp_clicks','email_clicks','form_starters','inquiries'];
export function buildTrend(start:number,end:number,trend:Record<string,number>[],comparison:Record<string,number>[],now:number){
  const interval=end-start===DAY?3600000:DAY;
  return Array.from({length:(end-start)/interval},(_,bucket)=>{
    const current=trend.find(row=>row.bucket===bucket),previous=comparison.find(row=>row.bucket===bucket),at=start+bucket*interval;
    return {bucket,at,label:interval===DAY?dateString(at).slice(5):String(bucket).padStart(2,'0')+':00',
      ...Object.fromEntries(trendKeys.map(key=>[key,at>now?null:Number(current?.[key]||0)])),
      previous:Object.fromEntries(trendKeys.map(key=>[key,Number(previous?.[key]||0)]))};
  });
}
async function distributions(env:Env,params:URLSearchParams,start:number,end:number,columns:('country'|'source'|'device'|'language'|'page'|'product')[],channel:boolean){
  const w=where(params,'events',start,end);
  const statements=columns.map(column=>env.DB.prepare(`SELECT e.${column} AS value,COUNT(*) AS views,COUNT(DISTINCT visitor_id) AS visitors FROM events e WHERE ${w.sql}${column==='product'?" AND e.name='product_view' AND e.product!=''":" AND e.name='page_view'"} GROUP BY e.${column} ORDER BY views DESC,value LIMIT 25`).bind(...w.values));
  if(channel)statements.push(env.DB.prepare(`SELECT COALESCE(s.medium,'unknown') AS value,COUNT(*) AS views,COUNT(DISTINCT e.visitor_id) AS visitors FROM events e LEFT JOIN sessions s ON s.id=e.session_id WHERE ${w.sql} AND e.name='page_view' GROUP BY s.medium ORDER BY views DESC,value LIMIT 25`).bind(...w.values));
  const rows=await env.DB.batch(statements);
  return Object.fromEntries([...columns,...(channel?['channel']:[])].map((key,index)=>[key,rows[index].results]));
}
export async function insights(request:Request,env:Env){
  const observedAt=Date.now(),params=new URL(request.url).searchParams,range=dateRange(params,observedAt),end=Math.min(range.end,observedAt+1),compact=params.get('compact')==='1';
  if(params.get('section')==='breakdowns')return json({breakdowns:await distributions(env,params,range.start,end,['country','source','device','language','product'],true),observedAt});
  const interval=range.end-range.start===DAY?3600000:DAY,count=(range.end-range.start)/interval;
  const trendFor=async(start:number,end:number)=>{
    const ew=where(params,'events',start,end),ip=new URLSearchParams(params);ip.set('validOnly','1');const iw=where(ip,'inquiries',start,end);
    const [ev,inq]=await env.DB.batch<Record<string,number>>([
      env.DB.prepare(`SELECT CAST((created_at-?)/? AS INTEGER) AS bucket,COUNT(DISTINCT CASE WHEN name='page_view' THEN visitor_id END) AS visitors,SUM(name='page_view') AS pageviews,SUM(name='page_view' AND visitor_id IS NULL) AS anonymous_pageviews,COUNT(DISTINCT CASE WHEN name='page_view' THEN session_id END) AS visits,SUM(name IN ('email_click','whatsapp_click')) AS contacts,SUM(name='whatsapp_click') AS whatsapp_clicks,SUM(name='email_click') AS email_clicks,COUNT(DISTINCT CASE WHEN name='form_start' THEN visitor_id END) AS form_starters FROM events e WHERE ${ew.sql} GROUP BY bucket`).bind(start,interval,...ew.values),
      env.DB.prepare(`SELECT CAST((created_at-?)/? AS INTEGER) AS bucket,COUNT(*) AS inquiries FROM inquiries i WHERE ${iw.sql} GROUP BY bucket`).bind(start,interval,...iw.values)
    ]);
    const eventBuckets=new Map(ev.results.map(row=>[row.bucket,row])),inquiryBuckets=new Map(inq.results.map(row=>[row.bucket,row]));
    return Array.from({length:count},(_,bucket)=>({...eventBuckets.get(bucket),...inquiryBuckets.get(bucket),bucket}));
  };
  const ip=new URLSearchParams(params);ip.set('validOnly','1');const iw=where(ip,'inquiries',range.start,end);
  const queueWhere=inquiryWhere(new URLSearchParams({scope:'queue',traffic:params.get('traffic')||''}));
  // Independent reads start together. The initial UI omits closed distributions and unused pending rows.
  const [current,previous,trend,comparison,breakdowns,pending,queueRows]=await Promise.all([
    metrics(env,params,range.start,end),metrics(env,params,range.previousStart,range.previousEnd),
    trendFor(range.start,end),trendFor(range.previousStart,range.previousEnd),
    distributions(env,params,range.start,end,compact?['page']:['country','source','device','language','page','product'],!compact),
    compact?Promise.resolve(null):env.DB.prepare(`SELECT i.* FROM inquiries i WHERE ${iw.sql} AND status='pending' ORDER BY created_at DESC,id DESC LIMIT 3`).bind(...iw.values).all<InquiryRow>(),
    env.DB.batch([
      env.DB.prepare(`SELECT SUM(status='pending') AS pending,SUM(status='following') AS following,SUM(is_read=0) AS unread FROM inquiries i WHERE ${queueWhere.sql}`).bind(...queueWhere.values),
      env.DB.prepare(`SELECT i.* FROM inquiries i WHERE ${queueWhere.sql} ORDER BY (i.status='following'),i.created_at,i.id LIMIT 3`).bind(...queueWhere.values)
    ])
  ]);
  // Daily visitors are distinct across the whole day, never the sum of hourly counts.
  const dailyBuckets=interval===DAY?trend:[current];
  const daily=dailyBuckets.flatMap((row,index)=>{
    const at=range.start+index*DAY;
    return at>observedAt?[]:[{date:dateString(at),visitors:number(row,'visitors'),pageviews:number(row,'pageviews'),anonymousPageviews:number(row,'anonymous_pageviews')}];
  }).reverse();
  const queue={counts:Object.fromEntries(['pending','following','unread'].map(key=>[key,number(queueRows[0].results[0] as Record<string,unknown>,key)])),items:(queueRows[1].results as InquiryRow[]).map(row=>compact?previewInquiry(row):safeInquiry(row))};
  return json({range,current,previous,trend:buildTrend(range.start,range.end,trend,comparison,observedAt),daily,...(pending?{pending:pending.results.map(safeInquiry)}:{}),queue,breakdowns,observedAt,granularity:interval===DAY?'day':'hour',timezone:'Asia/Shanghai'});
}
export async function activity(request:Request,env:Env){
  const params=new URL(request.url).searchParams,range=dateRange(params),type=params.get('event')||'';
  if(type&&!['inquiry_saved','whatsapp_click','email_click','page_view','contacts'].includes(type))throw new HttpError(400,'记录类型无效。');
  const page=Math.max(1,Math.min(100000,Math.floor(Number(params.get('page'))||1))),size=25;
  const selects:string[]=[],values:SqlValue[]=[];
  if(!type||type==='inquiry_saved'){
    const ip=new URLSearchParams(params);ip.set('validOnly','1');const w=where(ip,'inquiries',range.start,range.end);
    selects.push(`SELECT 'inquiry:'||i.id AS id,i.created_at,'inquiry_saved' AS name,i.page,COALESCE(json_extract(i.products_json,'$[0]'),'') AS product,i.language,'quote_form' AS position,i.source,i.visit_country AS country,i.visitor_id,i.id AS inquiry_id,i.is_test FROM inquiries i WHERE ${w.sql}`);values.push(...w.values);
  }
  if(type!=='inquiry_saved'){
    const w=where(params,'events',range.start,range.end);
    const visitPath=type==='page_view'?text(params.get('visitPath'),300):'';
    const pathQuery=type==='page_view'?text(params.get('pathQuery'),300):'';
    const pathSql=(visitPath?' AND e.page=?':'')+(pathQuery?' AND instr(lower(e.page),lower(?))>0':'');
    selects.push(`SELECT e.id,e.created_at,e.name,e.page,e.product,e.language,e.position,e.source,e.country,e.visitor_id,e.inquiry_id,e.is_test FROM events e WHERE ${w.sql} AND ${type&&type!=='contacts'?'e.name=?':"e.name IN ('whatsapp_click','email_click')"}${pathSql}`);
    values.push(...w.values,...(type&&type!=='contacts'?[type]:[]));
    if(visitPath)values.push(visitPath);
    if(pathQuery)values.push(pathQuery);
  }
  const sql=selects.join(' UNION ALL ');
  const [count,rows]=await env.DB.batch([
    env.DB.prepare(`SELECT COUNT(*) AS total FROM (${sql})`).bind(...values),
    env.DB.prepare(`SELECT * FROM (${sql}) ORDER BY created_at DESC,id DESC LIMIT ? OFFSET ?`).bind(...values,size,(page-1)*size)
  ]);
  return json({total:number(count.results[0] as Record<string,unknown>,'total'),page,pageSize:size,rows:rows.results});
}
export async function options(env:Env){
  const statements:D1PreparedStatement[]=[
    env.DB.prepare('SELECT DISTINCT source AS value FROM sessions UNION SELECT DISTINCT source FROM inquiries ORDER BY value LIMIT 250'),
    env.DB.prepare('SELECT DISTINCT country AS value FROM events UNION SELECT DISTINCT country FROM sessions UNION SELECT DISTINCT visit_country FROM inquiries ORDER BY value LIMIT 250'),
    env.DB.prepare('SELECT DISTINCT language AS value FROM events UNION SELECT DISTINCT language FROM sessions UNION SELECT DISTINCT language FROM inquiries ORDER BY value LIMIT 100'),
    env.DB.prepare("SELECT DISTINCT product AS value FROM events WHERE product!='' UNION SELECT DISTINCT value FROM inquiries,json_each(products_json) ORDER BY value LIMIT 250"),
    env.DB.prepare('SELECT DISTINCT country AS value FROM inquiries ORDER BY value LIMIT 250')
  ];
  const rows=await env.DB.batch<{value:string}>(statements);
  return json(Object.fromEntries(['sources','countries','languages','products','destinations'].map((key,i)=>[key,rows[i].results.map(r=>r.value)])));
}
export async function visitors(request:Request,env:Env){
  const params=new URL(request.url).searchParams,range=dateRange(params),w=where(params,'events',range.start,range.end),ip=new URLSearchParams(params);ip.set('validOnly','1');const iw=where(ip,'inquiries',range.start,range.end);
  const page=Math.max(1,Math.min(100000,Math.floor(Number(params.get('page'))||1))),includeTests=params.get('traffic')==='all';
  const cte=`WITH filtered AS (SELECT e.visitor_id,e.created_at,e.name,e.session_id,e.page,e.country,e.device,e.source,e.language,e.is_test,ROW_NUMBER() OVER (PARTITION BY visitor_id ORDER BY created_at DESC,received_order DESC,id DESC) AS rn FROM events e WHERE ${w.sql} AND visitor_id IS NOT NULL), people AS (
    SELECT e.visitor_id AS id,MIN(e.created_at) AS first_seen,MAX(e.created_at) AS last_seen,COUNT(DISTINCT CASE WHEN e.name='page_view' THEN e.session_id END) AS visits,SUM(e.name='page_view') AS pageviews,
    MAX(CASE WHEN rn=1 THEN country END) AS country,MAX(CASE WHEN rn=1 THEN device END) AS device,MAX(CASE WHEN rn=1 THEN source END) AS source,MAX(CASE WHEN rn=1 THEN language END) AS language,MAX(CASE WHEN rn=1 THEN page END) AS last_page,MAX(e.is_test) AS is_test,
    SUM(e.name='whatsapp_click') AS whatsapp_clicks,SUM(e.name='email_click') AS email_clicks,SUM(e.name IN ('whatsapp_click','email_click')) AS contacts,
    (SELECT COUNT(*) FROM inquiries i WHERE i.visitor_id=e.visitor_id AND ${iw.sql}) AS inquiries FROM filtered e GROUP BY e.visitor_id HAVING SUM(e.name='page_view')>0)
  `;
  const clauses=['1=1'],values:SqlValue[]=[...w.values,...iw.values],q=text(params.get('q'),100);
  const customerTest=includeTests?'':' AND customer.is_test=0';
  if(q){
    clauses.push(`(instr(lower(p.id),lower(?))>0 OR EXISTS (SELECT 1 FROM filtered f WHERE f.visitor_id=p.id AND instr(lower(f.page),lower(?))>0) OR EXISTS (SELECT 1 FROM inquiries customer WHERE customer.visitor_id=p.id AND customer.status!='spam'${customerTest} AND (instr(lower(customer.name),lower(?))>0 OR instr(lower(customer.company),lower(?))>0 OR instr(lower(customer.email),lower(?))>0 OR instr(lower(customer.phone),lower(?))>0)))`);
    values.push(q,q,q,q,q,q);
  }
  if(params.get('engagement')==='contact')clauses.push('p.contacts>0');
  else if(params.get('engagement')==='inquiry')clauses.push('p.inquiries>0');
  const condition=clauses.join(' AND ');
  const [rows,count,summary]=await env.DB.batch([
    env.DB.prepare(cte+`SELECT p.*,COALESCE(c.name,'') AS customer_name,COALESCE(c.company,'') AS customer_company FROM people p LEFT JOIN inquiries c ON c.id=(SELECT customer.id FROM inquiries customer WHERE customer.visitor_id=p.id AND customer.status!='spam'${customerTest} ORDER BY customer.created_at DESC,customer.id DESC LIMIT 1) WHERE ${condition} ORDER BY p.last_seen DESC,p.id DESC LIMIT 25 OFFSET ?`).bind(...values,(page-1)*25),
    env.DB.prepare(cte+`SELECT COUNT(*) AS total FROM people p WHERE ${condition}`).bind(...values),
    env.DB.prepare(cte+`SELECT COUNT(*) AS visitors,COALESCE(SUM(visits),0) AS visits,COALESCE(SUM(pageviews),0) AS pageviews,COALESCE(SUM(contacts>0),0) AS contact_visitors,COALESCE(SUM(inquiries>0),0) AS inquiry_visitors FROM people`).bind(...w.values,...iw.values)
  ]);
  return json({rows:rows.results,total:number(count.results[0] as Record<string,unknown>,'total'),summary:summary.results[0],page,pageSize:25});
}
export async function visitorDetail(request:Request,id:string,env:Env){
  if(!uuid(id))throw new HttpError(404,'访客不存在。');
  const params=new URL(request.url).searchParams,cursor=text(params.get('before'),200).split('|');
  const scoped=params.has('from')||params.has('to'),range=scoped?dateRange(params):null;
  const testScope=params.get('traffic')==='all'||(!scoped&&!params.has('traffic'))?'':' AND is_test=0';
  const scope=(range?' AND created_at>=? AND created_at<?':'')+testScope,scopeValues:SqlValue[]=range?[range.start,range.end]:[];
  const before=Number(cursor[0])||Date.now()+1,beforeOrder=cursor[1]===undefined?Number.MAX_SAFE_INTEGER:Number(cursor[1]),beforeId=cursor[2]||'~';
  if(!Number.isSafeInteger(beforeOrder))throw new HttpError(400,'时间线游标无效。');
  const [visitor,events,inquiries,sessions,summary,customer]=await env.DB.batch<Record<string,unknown>>([
    env.DB.prepare('SELECT id,first_seen,last_seen FROM visitors WHERE id=?').bind(id),
    env.DB.prepare(`SELECT id,created_at,name,page,product,language,position,source,country,device,inquiry_id,session_id,is_test,failure_code,received_order FROM events WHERE visitor_id=?${scope} AND (created_at<? OR (created_at=? AND (received_order<? OR (received_order=? AND id<?)))) ORDER BY created_at DESC,received_order DESC,id DESC LIMIT 101`).bind(id,...scopeValues,before,before,beforeOrder,beforeOrder,beforeId),
    env.DB.prepare(`SELECT id,created_at,name,company,status FROM inquiries WHERE visitor_id=?${scope} AND status!='spam' ORDER BY created_at DESC,id DESC`).bind(id,...scopeValues),
    env.DB.prepare(`SELECT e.session_id,MIN(e.created_at) AS first_at,MAX(e.created_at) AS last_at,SUM(e.name='page_view') AS pageviews,COUNT(*) AS events,MIN(s.started_at) AS started_at FROM (SELECT session_id,created_at,name FROM events WHERE visitor_id=?${scope} AND session_id IS NOT NULL) e LEFT JOIN sessions s ON s.id=e.session_id GROUP BY e.session_id ORDER BY last_at DESC LIMIT 100`).bind(id,...scopeValues),
    env.DB.prepare(`SELECT COUNT(DISTINCT CASE WHEN name='page_view' THEN session_id END) AS visits,SUM(name='page_view') AS pageviews,SUM(name='whatsapp_click') AS whatsapp_clicks,SUM(name='email_click') AS email_clicks FROM events WHERE visitor_id=?${scope}`).bind(id,...scopeValues),
    env.DB.prepare(`SELECT name,company,email,phone FROM inquiries WHERE visitor_id=?${testScope} AND status!='spam' ORDER BY created_at DESC,id DESC LIMIT 1`).bind(id)
  ]);
  if(!visitor.results[0])throw new HttpError(404,'访客不存在。');
  return json({visitor:visitor.results[0],customer:customer.results[0]||null,summary:summary.results[0],events:events.results.slice(0,100),hasMore:events.results.length>100,nextBefore:events.results.length>100?events.results[99].created_at+'|'+events.results[99].received_order+'|'+events.results[99].id:null,inquiries:inquiries.results,sessions:sessions.results});
}
