import assert from 'node:assert/strict';
import {spawn,spawnSync} from 'node:child_process';
import {mkdtemp,readFile,realpath,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..'),base='http://127.0.0.1:8790',wrangler=resolve(root,'node_modules/wrangler/bin/wrangler.js');
const folder=await mkdtemp(join(tmpdir(),'keeyak-admin-integration-')),state=join(folder,'state');
const credentials=JSON.parse(await readFile(resolve(root,'.local/admin-credentials.json'),'utf8'));
const checks=[],start=Date.now();let worker,output='';
function run(args){const r=spawnSync(process.execPath,[wrangler,...args],{cwd:root,encoding:'utf8',env:{...process.env,WRANGLER_SEND_METRICS:'false'}});if(r.status!==0)throw Error(r.stderr||r.stdout);return r.stdout;}
function sql(command){return run(['d1','execute','DB','--local','--persist-to',state,'--command',command,'--json']);}
function pass(name){checks.push(name);console.log('PASS '+name);}
const jar=()=>new Map();
async function request(path,{method='GET',body,cookies,headers={}}={}){
  const r=await fetch(base+path,{method,headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) KEEYAKLocalQA',...(body!==undefined?{'Content-Type':'application/json',Origin:base}:{}),...(cookies?{Cookie:[...cookies].map(([k,v])=>k+'='+v).join('; ')}:{}),...headers},...(body!==undefined?{body:JSON.stringify(body)}:{})});
  if(cookies)for(const value of r.headers.getSetCookie()){const pair=value.split(';')[0],i=pair.indexOf('=');if(/Max-Age=0(?:;|$)/.test(value))cookies.delete(pair.slice(0,i));else cookies.set(pair.slice(0,i),pair.slice(i+1));}
  return r;
}
async function json(path,options){const response=await request(path,options);let value;try{value=await response.json();}catch{throw Error(path+' did not return JSON');}return {response,value};}
try{
  run(['d1','migrations','apply','DB','--local','--persist-to',state]);
  worker=spawn(process.execPath,[wrangler,'pages','dev','dist','--ip','127.0.0.1','--port','8790','--persist-to',state],{cwd:root,env:{...process.env,WRANGLER_SEND_METRICS:'false'},stdio:['ignore','pipe','pipe']});
  worker.stdout.on('data',b=>{output+=b;});worker.stderr.on('data',b=>{output+=b;});
  let ready=false;for(let i=0;i<100;i++){if(/Ready on http:\/\/127\.0\.0\.1:8790/.test(output)){ready=true;break;}if(worker.exitCode!==null)throw Error('Local runtime failed: '+output);await new Promise(r=>setTimeout(r,300));}
  assert.ok(ready,'Wrangler readiness log');
  let config=(await json('/api/public-config')).value;assert.equal(config.local,true);assert.equal(config.app,'keeyak-auto');pass('real local Cloudflare runtime and D1 schema');
  const canonicalConfig=await json('/api/public-config/');assert.equal(canonicalConfig.response.status,200);assert.equal(canonicalConfig.value.app,'keeyak-auto');
  for(const route of ['/api/admin/inquiries','/api/admin/export','/api/admin/insights','/api/admin/visitors','/api/admin/activity']){const {response,value}=await json(route);assert.equal(response.status,401);assert.deepEqual(Object.keys(value),['error']);}pass('unauthenticated customer data, analytics and exports denied');
  const admin=jar(),visitor=jar();
  let r=await json('/api/admin/login',{method:'POST',body:{...credentials,password:'wrong'},cookies:admin});assert.equal(r.response.status,401);pass('invalid credentials rejected');
  r=await json('/api/admin/login',{method:'POST',body:credentials,cookies:admin});assert.equal(r.response.status,200);assert.ok(admin.get('keeyak_admin'));assert.ok(r.response.headers.get('Set-Cookie').includes('HttpOnly'));assert.equal(r.response.headers.get('Cache-Control'),'no-store');pass('local authenticated session uses HttpOnly cookie and no-store responses');
  r=await json('/api/telemetry/session',{method:'POST',body:{page:'/new-cars/byd/han-l/',language:'en',source:'local-qa',medium:'test',referrer:'https://www.google.com/search?q=never-store-this'},cookies:visitor,headers:{'CF-IPCountry':'DE'}});
  assert.equal(r.response.status,200);const vid=r.value.visitorId,sid=r.value.sessionId;
  for(const invalid of [null,Array.from({length:31},()=>({}))]){
    r=await json('/api/telemetry/events/',{method:'POST',body:{events:invalid},cookies:visitor});
    assert.equal(r.response.status,400);assert.equal(r.value.error,'The activity data could not be processed.');
  }
  pass('invalid public activity batches return English without changing the session');
  const page='/new-cars/byd/han-l/';
  const events=['page_view','product_view','whatsapp_click','email_click','form_start','form_submit_failed','gallery_view','specifications_expand','download_click','inquiry_click'].map(name=>({id:crypto.randomUUID(),name,page:page+'?email=never-store-this@example.com',product:page,language:'en',position:'main',email:'never-store-this@example.com',keystrokes:'never-store-this',failureCode:'validation'}));
  events.push({id:crypto.randomUUID(),name:'inquiry_saved',page,language:'en',position:'main'});
  for(let i=0;i<2;i++){r=await json('/api/telemetry/events',{method:'POST',body:{events},cookies:visitor});assert.equal(r.response.status,200);assert.ok(r.response.headers.get('Set-Cookie').includes('Max-Age=1800'));}pass('duplicate events do not count twice and activity renews the session cookie');
  const date=n=>new Date(Date.now()+8*3600000-n*86400000).toISOString().slice(0,10);
  const current='?traffic=all&from='+date(6)+'&to='+date(0);
  r=await json('/api/admin/insights'+current,{cookies:admin});assert.equal(r.response.status,200,JSON.stringify(r.value));assert.deepEqual([r.value.current.visitors,r.value.current.visits,r.value.current.pageviews,r.value.current.contacts,r.value.current.form_starters,r.value.current.inquiries],[1,1,1,2,1,0]);pass('contact clicks and forged success events do not create inquiries');
  assert.equal(r.value.current.whatsapp_clicks,1);assert.equal(r.value.current.email_clicks,1);assert.equal(r.value.trend.reduce((sum,row)=>sum+Number(row.email_clicks||0),0),1);
  r=await json('/api/admin/insights?traffic=all',{cookies:admin});assert.equal(r.value.range.from,date(0));assert.equal(r.value.range.end-r.value.range.start,86400000);pass('default overview is today and both contact channels have distinct totals and trends');
  r=await json('/api/admin/activity'+current,{cookies:admin});assert.equal(r.value.total,2);assert.deepEqual(new Set(r.value.rows.map(row=>row.name)),new Set(['whatsapp_click','email_click']));assert.ok(r.value.rows.every(row=>row.page===page));
  r=await json('/api/admin/activity?traffic=all&event=invalid',{cookies:admin});assert.equal(r.response.status,400);pass('contact records contain deduplicated channel clicks and reject invalid filters');
  r=await json('/api/admin/insights',{cookies:admin});assert.ok(Object.values(r.value.current).every(n=>n===0));pass('internal traffic is excluded by default');
  r=await json('/api/admin/visitors/'+vid,{cookies:admin});assert.equal(r.value.events.length,10);assert.deepEqual(r.value.events.map(e=>e.name),events.filter(e=>e.name!=='inquiry_saved').map(e=>e.name).reverse());assert.ok(!JSON.stringify(r.value).includes('never-store-this'));assert.ok(r.value.events.every(e=>e.country==='unknown'));pass('event allowlist strips inputs and query strings while preserving same-batch action order');
  const draft={version:1,vehicles:[{id:'v1',kind:'new',model:'BYD Han L',quantity:'2',brand:'BYD',year:'2025',category:'Sedan',variant:'EV',variantReference:'',powertrain:'Pure Electric',source:page,mileage:'',mileageUnit:'km',condition:''}],name:'Local QA inquiry',company:'Local test only',email:'qa@example.invalid',phone:'',country:'UAE',port:'',budget:'',currency:'',delivery:'',color:'',alternatives:'',usedYears:'',usedMileage:'',notes:'Database verification only. No message is sent.',service:''};
  await new Promise(resolve=>setTimeout(resolve,1100));
  const payload={draft,idempotencyKey:crypto.randomUUID(),formToken:config.formToken,website:'',page:'/quote/',language:'en',acceptPrivacy:true,measurementAllowed:true};
  r=await json('/api/inquiries',{method:'POST',body:{...payload,website:'spam.example'},cookies:visitor});assert.equal(r.response.status,422);pass('honeypot submission rejected without a fake success');
  r=await json('/api/inquiries',{method:'POST',body:{...payload,draft:{...draft,email:'bad'}},cookies:visitor});assert.equal(r.response.status,422);pass('server validates contact and vehicle fields');
  r=await json('/api/inquiries',{method:'POST',body:{...payload,formToken:'forged'},cookies:visitor});assert.equal(r.response.status,400);pass('invalid form verification rejected');
  const concurrent=await Promise.all([json('/api/inquiries',{method:'POST',body:payload,cookies:visitor}),json('/api/inquiries',{method:'POST',body:payload,cookies:visitor}),json('/api/inquiries',{method:'POST',body:{...payload,idempotencyKey:crypto.randomUUID()},cookies:visitor})]);
  assert.ok(concurrent.every(v=>v.response.ok&&v.value.saved));const id=concurrent[0].value.id;assert.ok(concurrent.every(v=>v.value.id===id));pass('simultaneous retries and repeated content create one persistent inquiry');
  r=await json('/api/inquiries',{method:'POST',body:{...payload,draft:{...draft,notes:'different payload'}},cookies:visitor});assert.equal(r.response.status,409);pass('same idempotency key cannot overwrite a different payload');
  r=await json('/api/admin/inquiries?traffic=all&q=Local%20QA',{cookies:admin});assert.equal(r.value.total,1);assert.equal(r.value.rows[0].visitor_id,vid);assert.ok(!('fingerprint' in r.value.rows[0]));pass('saved inquiry is searchable and linked to the anonymous visitor');
  let detail=(await json('/api/admin/inquiries/'+id,{cookies:admin})).value;
  r=await json('/api/admin/inquiries/'+id,{method:'PATCH',body:{version:detail.inquiry.version,is_read:true,status:'following'},cookies:admin});assert.equal(r.response.status,200);detail=r.value;
  r=await json('/api/admin/inquiries/'+id,{method:'PATCH',body:{version:1,status:'completed'},cookies:admin});assert.equal(r.response.status,409);pass('read/follow-up updates persist and conflicting edits are rejected');
  const note={id:crypto.randomUUID(),note:'Confirmed requirements; awaiting a written offer.'};
  for(let i=0;i<2;i++){r=await json('/api/admin/inquiries/'+id+'/notes',{method:'POST',body:note,cookies:admin});assert.equal(r.response.status,200);}assert.equal(r.value.notes.length,1);pass('follow-up notes persist without duplicate retry entries');
  r=await json('/api/admin/insights'+current,{cookies:admin});assert.equal(r.value.current.inquiries,1);assert.equal(r.value.trend.reduce((n,p)=>n+Number(p.inquiries||0),0),1);pass('one saved inquiry yields exactly one success across totals and trend');
  r=await json('/api/admin/activity'+current,{cookies:admin});assert.equal(r.value.total,3);assert.equal(r.value.rows.filter(row=>row.inquiry_id===id).length,1);
  r=await json('/api/admin/activity'+current+'&event=email_click',{cookies:admin});assert.equal(r.value.total,1);assert.equal(r.value.rows[0].name,'email_click');
  r=await json('/api/admin/activity',{cookies:admin});assert.equal(r.value.total,0);
  r=await json('/api/admin/inquiries',{cookies:admin});assert.equal(r.value.total,0);pass('activity records reconcile with saved inquiries while internal tests are hidden by default');
  r=await json('/api/admin/inquiries/'+id,{method:'PATCH',body:{version:detail.inquiry.version,status:'spam'},cookies:admin});assert.equal(r.response.status,200);detail=r.value;
  r=await json('/api/admin/insights'+current,{cookies:admin});assert.equal(r.value.current.inquiries,0);pass('spam inquiries are excluded from successful-inquiry statistics');
  await json('/api/admin/inquiries/'+id,{method:'PATCH',body:{version:detail.inquiry.version,status:'completed'},cookies:admin});
  r=await json('/api/admin/inquiries/'+id,{method:'PATCH',body:{version:999,is_read:true},cookies:admin,headers:{Origin:'https://untrusted.example','Sec-Fetch-Site':'cross-site'}});assert.equal(r.response.status,403);pass('cross-site administrative writes rejected');
  const exportResponse=await request('/api/admin/export'+current,{cookies:admin}),bytes=new Uint8Array(await exportResponse.arrayBuffer());assert.equal(exportResponse.status,200);assert.deepEqual([...bytes.slice(0,3)],[239,187,191]);assert.ok(new TextDecoder().decode(bytes).includes(note.note));pass('authenticated CSV export contains actual saved rows and notes');
  const second={...payload,idempotencyKey:crypto.randomUUID(),measurementAllowed:false,draft:{...draft,name:'Local QA without measurement',email:'no-measurement@example.invalid'}};
  r=await json('/api/inquiries',{method:'POST',body:second,cookies:visitor});assert.equal(r.response.status,201);const secondDetail=(await json('/api/admin/inquiries/'+r.value.id,{cookies:admin})).value;assert.equal(secondDetail.inquiry.visitor_id,null);pass('revoking analytics consent prevents visitor linkage even with existing cookies');
  r=await json('/api/inquiries',{method:'POST',body:second});assert.equal(r.response.status,200);assert.equal(r.value.saved,true);pass('inquiry submission and retries work without visitor cookies');
  r=await json('/api/admin/activity'+current+'&event=inquiry_saved',{cookies:admin});assert.equal(r.value.total,2);assert.ok(r.value.rows.some(row=>row.inquiry_id&&row.visitor_id===null));
  r=await json('/api/admin/activity?traffic=all&from='+date(1)+'&to='+date(1),{cookies:admin});assert.equal(r.value.total,0);pass('inquiries without measurement appear in the correct date window without an invented visitor');
  r=await json('/api/admin/insights?traffic=all&product='+encodeURIComponent(page),{cookies:admin});assert.equal(r.value.current.inquiries,2);
  r=await json('/api/admin/insights?traffic=all&language=zz',{cookies:admin});assert.equal(r.value.current.pageviews,0);assert.equal(r.value.current.inquiries,0);pass('product and language filters constrain visits and saved inquiries');
  sql(`UPDATE sessions SET last_seen=${Date.now()-31*60000} WHERE id='${sid}';`);
  r=await json('/api/inquiries',{method:'POST',body:{...payload,idempotencyKey:crypto.randomUUID(),draft:{...draft,notes:'Local QA after a long form-editing interval.'}},cookies:visitor});assert.equal(r.response.status,201);
  const idleDetail=(await json('/api/admin/inquiries/'+r.value.id,{cookies:admin})).value;assert.equal(idleDetail.inquiry.visitor_id,vid);assert.equal(idleDetail.inquiry.session_id,null);pass('consented inquiry stays linked to a known visitor after session timeout');
  r=await json('/api/telemetry/session',{method:'POST',body:{page,language:'en'},cookies:visitor});assert.equal(r.value.visitorId,vid);assert.notEqual(r.value.sessionId,sid);
  await json('/api/telemetry/events',{method:'POST',body:{events:[{id:crypto.randomUUID(),name:'page_view',page,language:'en',position:'main'}]},cookies:visitor});
  r=await json('/api/admin/insights'+current,{cookies:admin});assert.equal(r.value.current.visits,2);assert.equal(r.value.current.returning,1);pass('30-minute session boundary creates a return visit without a second visitor');
  sql(`INSERT INTO events(id,created_at,name,page,product,language,source,country,device,visitor_id,session_id,is_test) VALUES ('${crypto.randomUUID()}',${Date.now()-7*86400000},'page_view','${page}','${page}','en','local-qa','unknown','desktop','${vid}','${sid}',1);`);
  r=await json('/api/admin/insights'+current,{cookies:admin});assert.equal(r.value.previous.pageviews,1);assert.equal(r.value.current.pageviews,2);assert.equal(r.value.range.previousEnd-r.value.range.previousStart,7*86400000);pass('previous-period comparison uses the same full duration');
  r=await json('/api/telemetry/session',{method:'POST',body:{page,language:'en'},headers:{'User-Agent':'Googlebot/2.1'}});assert.equal(r.response.status,202);pass('identified bots are ignored');
  const records=sql('SELECT (SELECT COUNT(*) FROM inquiries) AS inquiries,(SELECT COUNT(*) FROM events WHERE name=\'inquiry_saved\') AS saved_events,(SELECT COUNT(*) FROM visitors) AS visitors;');
  const recordsJson=JSON.parse(records.slice(records.indexOf('[')));assert.deepEqual(recordsJson[0].results[0],{inquiries:3,saved_events:3,visitors:1});pass('independent D1 SQL confirms exact inquiry, conversion and visitor counts');
  r=await json('/api/inquiries/',{method:'POST',headers:{'CF-Connecting-IP':'192.0.2.10'},body:{...payload,idempotencyKey:crypto.randomUUID(),draft:{...draft,name:'',vehicles:[]}}});
  assert.equal(r.response.status,422);
  assert.equal(r.value.error,'Enter your name.');
  pass('a new vehicle inquiry requires a name even when no vehicle is selected');
  for (const contact of [{email:'no-vehicle@example.invalid',phone:''},{email:'',phone:'+12025550123'}]) {
    const noVehicleDraft={...draft,...contact,vehicles:[],notes:'Please share the available hybrid SUVs and shipping options.'};
    r=await json('/api/inquiries/',{method:'POST',body:{...payload,measurementAllowed:false,idempotencyKey:crypto.randomUUID(),draft:noVehicleDraft}});
    assert.equal(r.response.status,201);
    const saved=await json('/api/admin/inquiries/'+r.value.id,{cookies:admin});
    assert.equal(saved.response.status,200);
    assert.deepEqual(saved.value.inquiry.draft.vehicles,[]);
    assert.equal(saved.value.inquiry.draft.notes,noVehicleDraft.notes);
    assert.deepEqual(saved.value.inquiry.products,[]);
    assert.equal(saved.value.inquiry.email,contact.email);
    assert.equal(saved.value.inquiry.phone,contact.phone);
  }
  pass('an inquiry without vehicles is saved with either email or phone');
  const contactTime=Date.now();
  const inserted=Array.from({length:28},()=>`('${crypto.randomUUID()}',${contactTime},'email_click','${page}','${page}','en','local-qa','unknown','desktop','${vid}','${sid}',1)`);
  sql('INSERT INTO events(id,created_at,name,page,product,language,source,country,device,visitor_id,session_id,is_test) VALUES '+inserted.join(','));
  const firstPage=(await json('/api/admin/activity'+current+'&event=email_click',{cookies:admin})).value;
  const secondPage=(await json('/api/admin/activity'+current+'&event=email_click&page=2',{cookies:admin})).value;
  assert.equal(firstPage.total,29);assert.equal(firstPage.rows.length,25);assert.equal(secondPage.rows.length,4);assert.equal(new Set([...firstPage.rows,...secondPage.rows].map(row=>row.id)).size,29);
  r=await json('/api/admin/activity'+current+'&source='+encodeURIComponent("x' OR 1=1 --"),{cookies:admin});assert.equal(r.response.status,200);assert.equal(r.value.total,0);
  pass('contact pagination handles equal timestamps without duplicates and source filters remain parameterized');
  sql(`INSERT INTO events(id,created_at,name,page,product,language,source,country,device,visitor_id,session_id,is_test) VALUES ('${crypto.randomUUID()}',${Date.now()-86400000},'page_view','${page}','${page}','en','local-qa','unknown','desktop','${vid}','${sid}',1),('${crypto.randomUUID()}',${Date.now()},'page_view','${page}','${page}','en','local-qa','unknown','desktop','${vid}','${sid}',1);`);
  r=await json('/api/admin/insights'+current,{cookies:admin});assert.equal(r.value.current.visitors,1);assert.equal(r.value.trend.reduce((sum,row)=>sum+Number(row.visitors||0),0),2);
  assert.ok(r.value.pending.every(row=>row.status==='pending'));assert.ok(r.value.pending.length<=3);assert.equal(r.value.current.pending,4);
  r=await json('/api/admin/visitors'+current,{cookies:admin});assert.equal(r.response.status,200,JSON.stringify(r.value));assert.equal(r.value.total,1);assert.equal(r.value.rows[0].pageviews,4);assert.equal(r.value.summary.visitors,1);assert.equal(r.value.summary.contact_visitors,1);assert.equal(r.value.summary.inquiry_visitors,1);assert.equal(r.value.rows[0].inquiries,2);
  r=await json('/api/admin/visitors'+current+'&engagement=inquiry&q='+vid.slice(0,8),{cookies:admin});assert.equal(r.value.total,1);
  r=await json('/api/admin/visitors?traffic=all&from='+date(1)+'&to='+date(1)+'&engagement=inquiry',{cookies:admin});assert.equal(r.value.total,0);assert.equal(r.value.summary.visitors,1);assert.equal(r.value.summary.inquiry_visitors,0);
  r=await json('/api/admin/visitors',{cookies:admin});assert.equal(r.value.total,0);assert.equal(r.value.summary.visitors,0);
  r=await json('/api/admin/inquiries?traffic=all&status=following',{cookies:admin});assert.equal(r.value.total,0);assert.equal(r.value.counts.all_count,5);assert.equal(r.value.counts.pending,4);assert.equal(r.value.counts.completed,1);
  pass('daily UV stays distinct across repeat visits while visitor rows, engagement counts and inquiry status counts reconcile');
  const history=Array.from({length:110},()=>`('${crypto.randomUUID()}',${Date.now()},'gallery_view','${page}','${page}','en','local-qa','unknown','desktop','${vid}','${sid}',1)`);
  sql('INSERT INTO events(id,created_at,name,page,product,language,source,country,device,visitor_id,session_id,is_test) VALUES '+history.join(','));
  const detailPath='/api/admin/visitors/'+vid+'?traffic=all&from='+date(0)+'&to='+date(0);
  const timeline=(await json(detailPath,{cookies:admin})).value;assert.equal(timeline.events.length,100);assert.equal(timeline.hasMore,true);assert.equal(timeline.summary.pageviews,3);
  const olderTimeline=(await json(detailPath+'&before='+encodeURIComponent(timeline.nextBefore),{cookies:admin})).value;
  assert.equal(new Set([...timeline.events,...olderTimeline.events].map(row=>row.id)).size,timeline.events.length+olderTimeline.events.length);
  const yesterdayDetail=(await json('/api/admin/visitors/'+vid+'?traffic=all&from='+date(1)+'&to='+date(1),{cookies:admin})).value;
  assert.equal(yesterdayDetail.events.length,1);assert.equal(yesterdayDetail.inquiries.length,0);assert.equal(yesterdayDetail.summary.pageviews,1);
  pass('visitor timeline pagination preserves the date window and selected-period summaries exclude other-day inquiries');
  const beforeCounts=(await json('/api/admin/insights'+current,{cookies:admin})).value.current;
  const counts=['page_view','product_view','whatsapp_click','email_click','inquiry_saved','form_start'].map(name=>({id:crypto.randomUUID(),name,page,language:'en',position:'header',visitor_id:vid,session_id:sid}));
  for(let n=0;n<2;n++){
    r=await json('/api/telemetry/counts/',{method:'POST',body:{events:counts},cookies:n?visitor:undefined});
    assert.equal(r.response.status,200);assert.deepEqual(r.response.headers.getSetCookie(),[]);
  }
  for(const headers of [{'DNT':'1'},{'Sec-GPC':'1'},{'User-Agent':'ExampleBot'}]){
    r=await json('/api/telemetry/counts/',{method:'POST',body:{events:[{...counts[0],id:crypto.randomUUID()}]},headers});
    assert.equal(r.response.status,202);assert.deepEqual(r.value,{ignored:true});
  }
  r=await json('/api/telemetry/counts/',{method:'POST',body:{events:counts},headers:{Origin:'https://example.invalid'}});assert.equal(r.response.status,403);
  const afterCounts=(await json('/api/admin/insights'+current,{cookies:admin})).value.current;
  for(const metric of ['pageviews','whatsapp_clicks','email_clicks'])assert.equal(afterCounts[metric],beforeCounts[metric]+1);
  for(const metric of ['visitors','visits','form_starters','inquiries'])assert.equal(afterCounts[metric],beforeCounts[metric]);
  const ids=counts.map(event=>"'"+event.id+"'").join(',');
  const storedCounts=JSON.parse(sql('SELECT name,visitor_id,session_id,inquiry_id,is_test FROM events WHERE id IN ('+ids+');'))[0].results;
  assert.deepEqual(storedCounts.map(row=>row.name).sort(),['email_click','page_view','product_view','whatsapp_click']);
  assert.ok(storedCounts.every(row=>row.visitor_id===null&&row.session_id===null&&row.inquiry_id===null&&row.is_test===1));
  pass('default counts need no cookie, deduplicate retries and respect browser privacy without creating a visitor or inquiry');
  const midnight=Date.parse(date(0)+'T00:00:00+08:00');
  const visits=Array.from({length:26},(_,index)=>{
    const time=index<24?midnight-1:midnight;
    return `('${crypto.randomUUID()}',${time},'page_view','/contact/',1)`;
  });
  sql('INSERT INTO events(id,created_at,name,page,is_test) VALUES '+visits.join(','));
  const totals=(await json('/api/admin/insights'+current,{cookies:admin})).value;
  const todayStats=totals.daily[0],yesterdayStats=totals.daily[1];
  assert.deepEqual(todayStats,{date:date(0),visitors:1,pageviews:6,anonymousPageviews:3});
  assert.deepEqual(yesterdayStats,{date:date(1),visitors:1,pageviews:25,anonymousPageviews:24});
  assert.equal(totals.current.visitors,1);
  assert.equal(totals.breakdowns.page.find(row=>row.value==='/contact/').views,26);
  const singleDay=(await json('/api/admin/insights?traffic=all',{cookies:admin})).value;
  assert.deepEqual(singleDay.daily,[todayStats]);
  const firstVisits=(await json('/api/admin/activity'+current+'&event=page_view',{cookies:admin})).value;
  const moreVisits=(await json('/api/admin/activity'+current+'&event=page_view&page=2',{cookies:admin})).value;
  const allVisits=[...firstVisits.rows,...moreVisits.rows];
  assert.equal(firstVisits.total,totals.current.pageviews);
  assert.equal(new Set(allVisits.map(row=>row.id)).size,totals.current.pageviews);
  assert.equal(allVisits.filter(row=>row.visitor_id===null).length,27);
  assert.ok(allVisits.every((row,index)=>index===0||allVisits[index-1].created_at>row.created_at||(allVisits[index-1].created_at===row.created_at&&allVisits[index-1].id>row.id)));
  const onlyPublic=(await json('/api/admin/activity'+current.replace('traffic=all&','')+'&event=page_view',{cookies:admin})).value;
  assert.equal(onlyPublic.total,0);
  pass('daily unique browsers and anonymous page views reconcile across midnight; all page visits paginate newest first');
  const exactPath=(await json('/api/admin/activity'+current+'&event=page_view&visitPath='+encodeURIComponent('/contact/'),{cookies:admin})).value;
  assert.equal(exactPath.total,26);
  assert.ok(exactPath.rows.every(row=>row.page==='/contact/'));
  const searchedPath=(await json('/api/admin/activity'+current+'&event=page_view&pathQuery=CONTACT',{cookies:admin})).value;
  assert.equal(searchedPath.total,exactPath.total);
  const conflictingPath=(await json('/api/admin/activity'+current+'&event=page_view&visitPath=%2F&pathQuery=contact',{cookies:admin})).value;
  assert.equal(conflictingPath.total,0);
  pass('page drilldown and search filter matching visits before pagination');

  const oldPending=crypto.randomUUID(),oldTime=midnight-2*86400000;
  sql(`INSERT INTO inquiries (id,idempotency_key,fingerprint,created_at,updated_at,name,company,email,phone,country,requirements,draft_json,products_json,page,is_test)
    SELECT '${oldPending}','${oldPending}',fingerprint,${oldTime},${oldTime},'Earlier pending fixture',company,email,phone,country,requirements,draft_json,products_json,page,1
    FROM inquiries WHERE id='${id}'`);
  const currentQueue=(await json('/api/admin/insights?traffic=all',{cookies:admin})).value.queue;
  const yesterdayQueue=(await json('/api/admin/insights?traffic=all&from='+date(1)+'&to='+date(1),{cookies:admin})).value.queue;
  assert.deepEqual(currentQueue,yesterdayQueue);
  assert.equal(currentQueue.items[0].id,oldPending);
  const queuePath='/api/admin/inquiries?scope=queue&traffic=all&from='+date(0)+'&to='+date(0)+'&status=pending';
  const pendingQueue=(await json(queuePath,{cookies:admin})).value;
  assert.ok(pendingQueue.rows.some(row=>row.id===oldPending));
  assert.ok(pendingQueue.rows.every(row=>row.status==='pending'));
  const beforeRead=(await json(queuePath+'&read=0',{cookies:admin})).value;
  assert.ok(beforeRead.rows.some(row=>row.id===oldPending));
  r=await json('/api/admin/inquiries/'+oldPending,{method:'PATCH',body:{version:1,is_read:true},cookies:admin});
  assert.equal(r.response.status,200);
  assert.ok(!(await json(queuePath+'&read=0',{cookies:admin})).value.rows.some(row=>row.id===oldPending));
  assert.ok((await json(queuePath,{cookies:admin})).value.rows.some(row=>row.id===oldPending));
  assert.ok(!(await json(queuePath.replace('&traffic=all',''),{cookies:admin})).value.rows.some(row=>row.id===oldPending));
  pass('work queue includes past pending inquiries and filters unread independently of status and date');
  const compact=(await json('/api/admin/insights'+current+'&compact=1',{cookies:admin})).value;
  const complete=(await json('/api/admin/insights'+current,{cookies:admin})).value;
  const validCards=(await json('/api/admin/inquiries'+current+'&validOnly=1&compact=1',{cookies:admin})).value;
  assert.equal(validCards.total,complete.current.inquiries);
  const countryProduct=(await json('/api/admin/insights'+current+'&country=unknown&product='+encodeURIComponent(page),{cookies:admin})).value;
  const filteredCards=(await json('/api/admin/inquiries'+current+'&validOnly=1&visitCountry=unknown&product='+encodeURIComponent(page),{cookies:admin})).value;
  assert.equal(filteredCards.total,countryProduct.current.inquiries);
  assert.deepEqual(compact.current,complete.current);assert.deepEqual(compact.daily,complete.daily);
  assert.deepEqual(compact.breakdowns.page,complete.breakdowns.page);assert.deepEqual(compact.queue.counts,complete.queue.counts);
  assert.deepEqual(Object.keys(compact.breakdowns),['page']);assert.ok(!('pending' in compact));
  assert.ok(compact.queue.items.every(item=>Array.isArray(item.vehicles)&&!('requirements' in item)&&!('draft' in item)));
  assert.ok(JSON.stringify(compact).length<JSON.stringify(complete).length);
  const expanded=(await json('/api/admin/insights'+current+'&section=breakdowns',{cookies:admin})).value;
  for(const key of ['country','source','device','language','product','channel'])assert.deepEqual(expanded.breakdowns[key],complete.breakdowns[key]);
  pass('compact overview preserves totals, daily counts, pages and queue; expanded distributions reconcile');
  const compactInquiries=(await json(queuePath+'&compact=1',{cookies:admin})).value;
  assert.deepEqual(compactInquiries.rows.map(row=>row.id),(await json(queuePath,{cookies:admin})).value.rows.map(row=>row.id));
  assert.ok(compactInquiries.rows.every(row=>Array.isArray(row.vehicles)&&!('requirements' in row)));
  const contactOnly=(await json('/api/admin/activity'+current+'&event=contacts',{cookies:admin})).value;
  assert.equal(contactOnly.total,complete.current.contacts);assert.ok(contactOnly.rows.every(row=>['whatsapp_click','email_click'].includes(row.name)));
  pass('lightweight inquiry cards and combined contact drilldown preserve counts and order');
  const customerId=crypto.randomUUID();
  sql(`INSERT INTO inquiries (id,idempotency_key,fingerprint,created_at,updated_at,name,company,email,phone,country,requirements,draft_json,products_json,page,is_test,visitor_id,session_id)
    SELECT '${customerId}','${customerId}',fingerprint,${Date.now()},${Date.now()},'Marina Buyer','Andes Motors','buyer@qa.invalid','+593990012345',country,requirements,draft_json,products_json,page,1,'${vid}','${sid}' FROM inquiries WHERE id='${id}'`);
  for(const search of ['MARINA','andes','BUYER@qa.invalid','990012345',vid.slice(0,8),'han-l']){
    const result=(await json('/api/admin/visitors'+current+'&q='+encodeURIComponent(search),{cookies:admin})).value;
    assert.equal(result.total,1,search);assert.equal(result.rows[0].id,vid);assert.equal(result.rows[0].customer_name,'Marina Buyer');
  }
  assert.equal((await json('/api/admin/visitors'+current+'&q='+encodeURIComponent("x' OR 1=1 --"),{cookies:admin})).value.total,0);
  assert.equal((await json('/api/admin/visitors?from='+date(0)+'&to='+date(0)+'&q=Marina',{cookies:admin})).value.total,0);
  pass('visitor lookup matches submitted identity and viewed pages case-insensitively without leaking excluded traffic');
  sql(`UPDATE sessions SET started_at=${midnight-5000} WHERE id='${sid}'`);
  const grouped=(await json(detailPath,{cookies:admin})).value;
  assert.equal(grouped.customer.email,'buyer@qa.invalid');assert.ok(grouped.events.every(event=>'session_id' in event));
  assert.equal(grouped.sessions.find(session=>session.session_id===sid).started_at,midnight-5000);
  assert.ok(grouped.inquiries.some(item=>item.id===customerId));
  const fullPublicHistory=(await json('/api/admin/visitors/'+vid+'?traffic=',{cookies:admin})).value;
  assert.equal(fullPublicHistory.events.length,0);assert.equal(fullPublicHistory.inquiries.length,0);assert.equal(fullPublicHistory.customer,null);assert.equal(fullPublicHistory.sessions.length,0);
  pass('session groups retain visits spanning midnight and full-history mode respects the traffic filter');
  const oldCookie=[...admin].map(([k,v])=>k+'='+v).join('; ');
  r=await json('/api/admin/logout',{method:'POST',body:{},cookies:admin});assert.equal(r.response.status,200);
  r=await json('/api/admin/inquiries',{headers:{Cookie:oldCookie}});assert.equal(r.response.status,401);pass('logout revokes the old session before another customer-data request');
  await writeFile(resolve(root,'.local/admin-integration-results.json'),JSON.stringify({passed:true,checks,durationMs:Date.now()-start,runtime:'wrangler pages dev + persistent local D1',cloudChanged:false},null,2));
  console.log(`\n${checks.length} integration checks passed. No cloud resources or outbound customer messages were changed.`);
}catch(error){console.error(error);process.exitCode=1;await new Promise(r=>setTimeout(r,200));console.error(output.slice(-6000));}
finally{
  if(worker?.pid){if(process.platform==='win32')spawnSync('taskkill',['/pid',String(worker.pid),'/t','/f'],{stdio:'ignore'});else worker.kill('SIGTERM');}
  const actual=await realpath(folder);if(actual.startsWith(resolve(tmpdir(),'keeyak-admin-integration-'))&&actual!==resolve(tmpdir()))await rm(actual,{recursive:true,force:true,maxRetries:20,retryDelay:200});
}
