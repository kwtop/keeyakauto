import {anonymousEvents,clientEvents,pagePath,productPath,type ClientEvent} from '../src/data/measurement';
import type {Env,SessionRow} from './types';
import {HttpError,clientIp,json,limit,localRequest,readJson,sameOrigin,setCookie,signedCookie,signedValue,text,uuid} from './http';

export const language=(value:unknown)=>/^[a-z]{2,3}(?:-[a-z0-9]{2,8}){0,2}$/i.test(text(value,30))?text(value,30).toLowerCase():'unknown';
export function isBot(request:Request){
  const ua=request.headers.get('User-Agent')||'';
  const cf=(request as Request&{cf?:{botManagement?:{verifiedBot?:boolean}}}).cf;
  return !ua||!!cf?.botManagement?.verifiedBot||/bot\b|crawler|spider|headless|slurp|preview|curl\/|python-|wget\//i.test(ua);
}
export function device(request:Request){
  const ua=request.headers.get('User-Agent')||'';
  return !ua?'unknown':/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)?'tablet':/Mobi|iPhone|Android/i.test(ua)?'mobile':/Windows|Macintosh|X11|Linux/i.test(ua)?'desktop':'unknown';
}
export function country(request:Request,env:Env){
  if(localRequest(request,env))return 'unknown';
  const value=(request as Request&{cf?:{country?:string}}).cf?.country||'';
  return /^[A-Z]{2}$/.test(value)&&!['XX','T1'].includes(value)?value:'unknown';
}
export async function internal(request:Request,env:Env){
  return localRequest(request,env)||await signedCookie(request,'keeyak_internal',env)==='1'||(env.INTERNAL_IPS||'').split(',').map(s=>s.trim()).filter(Boolean).includes(clientIp(request));
}
export function attribution(body:Record<string,unknown>,origin:string){
  const token=(v:unknown)=>{const s=text(v,100).toLowerCase();return /^[a-z0-9][a-z0-9._-]{0,99}$/.test(s)?s:'';};
  const source=token(body.source),medium=token(body.medium),campaign=token(body.campaign);
  let referrer='';
  try{const url=new URL(text(body.referrer,500));if(['http:','https:'].includes(url.protocol)&&url.origin!==origin)referrer=url.hostname;}catch{ /* Missing referrers are normal. */ }
  const search=/^(www\.)?(google\.[a-z.]+|bing.com|search.yahoo.com|baidu.com|duckduckgo.com)$/i.test(referrer);
  const social=/(^|\.)(facebook.com|instagram.com|linkedin.com|t.co|x.com|youtube.com|tiktok.com)$/i.test(referrer);
  return {source:source||(body.paidGoogle===true?'google':referrer||'unknown'),medium:medium||(body.paidGoogle===true?'paid-search':search?'organic':social?'social':referrer?'referral':'unknown'),campaign,referrer_host:referrer};
}
export async function sessionFor(request:Request,env:Env){
  const sid=await signedCookie(request,'keeyak_session',env),vid=await signedCookie(request,'keeyak_visitor',env);
  if(!uuid(sid)||!uuid(vid))return null;
  return env.DB.prepare('SELECT * FROM sessions WHERE id=? AND visitor_id=? AND last_seen>?').bind(sid,vid,Date.now()-30*60000).first<SessionRow>();
}
export async function knownVisitor(request:Request,env:Env){
  const id=await signedCookie(request,'keeyak_visitor',env);
  if(!uuid(id))return null;
  const row=await env.DB.prepare('SELECT id FROM visitors WHERE id=?').bind(id).first<{id:string}>();
  return row?.id||null;
}
export async function beginSession(request:Request,env:Env){
  sameOrigin(request,env);
  if(isBot(request)||request.headers.get('DNT')==='1'||request.headers.get('Sec-GPC')==='1')return json({ignored:true},202);
  await limit(request,env,'session',120,60);
  const body=await readJson(request,4096),now=Date.now();
  let vid=await signedCookie(request,'keeyak_visitor',env);if(!uuid(vid))vid=crypto.randomUUID();
  const existing=await sessionFor(request,env),test=Number(await internal(request,env));
  let session:SessionRow;
  if(existing){
    session={...existing,last_seen:now,is_test:Math.max(existing.is_test,test)};
    await env.DB.prepare('UPDATE sessions SET last_seen=?,is_test=? WHERE id=?').bind(now,session.is_test,existing.id).run();
  }else{
    const before=await env.DB.prepare('SELECT id FROM sessions WHERE visitor_id=? LIMIT 1').bind(vid).first();
    const attr=attribution(body,new URL(request.url).origin);
    session={id:crypto.randomUUID(),visitor_id:vid,started_at:now,last_seen:now,landing_page:pagePath(body.page),...attr,country:country(request,env),device:device(request),language:language(body.language),is_returning:Number(!!before),is_test:test};
    await env.DB.batch([
      env.DB.prepare('INSERT INTO visitors VALUES (?,?,?) ON CONFLICT(id) DO UPDATE SET last_seen=excluded.last_seen').bind(vid,now,now),
      env.DB.prepare('INSERT INTO sessions (id,visitor_id,started_at,last_seen,landing_page,source,medium,campaign,referrer_host,country,device,language,is_returning,is_test) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(session.id,vid,now,now,session.landing_page,attr.source,attr.medium,attr.campaign,attr.referrer_host,session.country,session.device,session.language,session.is_returning,test)
    ]);
  }
  const response=json({visitorId:session.visitor_id,sessionId:session.id});
  response.headers.append('Set-Cookie',setCookie(request,'keeyak_visitor',await signedValue('keeyak_visitor',session.visitor_id,env),365*86400));
  response.headers.append('Set-Cookie',setCookie(request,'keeyak_session',await signedValue('keeyak_session',session.id,env),1800));
  return response;
}
const positions=new Set(['header','footer','hero','product_gallery','specifications','quote_form','main','contact','unknown']);
const failures=new Set(['validation','network','server','spam_check']);
export async function ingestAnonymous(request:Request,env:Env){
  sameOrigin(request,env);
  if(isBot(request)||request.headers.get('DNT')==='1'||request.headers.get('Sec-GPC')==='1')return json({ignored:true},202);
  const body=await readJson(request,24576);
  if(!Array.isArray(body.events)||body.events.length>30)throw new HttpError(400,'事件批次无效。','The activity data could not be processed.');
  const events=body.events.flatMap((value:unknown)=>{
    if(!value||typeof value!=='object')return [];
    const e=value as Record<string,unknown>,name=e.name as ClientEvent;
    if(!uuid(e.id)||!anonymousEvents.has(name))return [];
    const page=pagePath(e.page),model=productPath(page);
    if(/^\/(?:admin|api|design|design-preview)(?:\/|$)/.test(page)||name==='product_view'&&!model)return [];
    return [{id:e.id,name,page,product:model||productPath(e.product),language:language(e.language),position:positions.has(String(e.position))?e.position:'unknown'}];
  });
  if(events.length){
    await limit(request,env,'anonymous-counts',300,60);
    const now=Date.now(),test=Number(await internal(request,env)),region=country(request,env);
    // The event ID only deduplicates retries of this event. Never attach a browser, session or inquiry ID here.
    await env.DB.batch(events.map((e,order)=>env.DB.prepare('INSERT OR IGNORE INTO events (id,created_at,name,page,product,language,position,country,is_test,received_order) VALUES (?,?,?,?,?,?,?,?,?,?)').bind(e.id,now,e.name,e.page,e.product,e.language,e.position,region,test,order)));
  }
  return json({accepted:true});
}
export async function ingest(request:Request,env:Env){
  sameOrigin(request,env);
  if(isBot(request)||request.headers.get('DNT')==='1'||request.headers.get('Sec-GPC')==='1')return json({ignored:true},202);
  await limit(request,env,'events',300,60);
  const body=await readJson(request,24576),session=await sessionFor(request,env);
  if(!session)return json({renewSession:true},409);
  if(!Array.isArray(body.events)||body.events.length>30)throw new HttpError(400,'事件批次无效。','The activity data could not be processed.');
  const now=Date.now(),test=Math.max(session.is_test,Number(await internal(request,env)));
  const statements=[];
  for(const [order,value] of body.events.entries()){
    if(!value||typeof value!=='object')continue;
    const e=value as Record<string,unknown>;
    if(!uuid(e.id)||!clientEvents.includes(e.name as typeof clientEvents[number]))continue;
    const page=pagePath(e.page);
    if(page.startsWith('/admin')||page.startsWith('/api'))continue;
    const product=productPath(page)||productPath(e.product);
    if(e.name==='product_view'&&!productPath(page))continue;
    statements.push(env.DB.prepare('INSERT OR IGNORE INTO events (id,created_at,name,page,product,language,position,source,country,device,visitor_id,session_id,is_returning,is_test,failure_code,received_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(e.id,now,e.name,page,product,language(e.language),positions.has(String(e.position))?e.position:'unknown',session.source,session.country,session.device,session.visitor_id,session.id,session.is_returning,test,failures.has(String(e.failureCode))?e.failureCode:'',order));
  }
  if(statements.length)await env.DB.batch([...statements,
    env.DB.prepare('UPDATE sessions SET last_seen=?,is_test=? WHERE id=?').bind(now,test,session.id),
    env.DB.prepare('UPDATE visitors SET last_seen=? WHERE id=?').bind(now,session.visitor_id)
  ]);
  return json({accepted:true},200,statements.length?{'Set-Cookie':setCookie(request,'keeyak_session',await signedValue('keeyak_session',session.id,env),1800)}:{});
}
export async function forget(request:Request,env:Env){
  sameOrigin(request,env);const response=json({ok:true});
  for(const name of ['keeyak_visitor','keeyak_session'])response.headers.append('Set-Cookie',setCookie(request,name,'',0));
  return response;
}
