import test from 'node:test';
import assert from 'node:assert/strict';
import {buildTrend,dateRange,where,DAY} from '../server/admin-data';
import {admin,login} from '../server/auth';
import {csvCell,sign,signedCookie,uuid} from '../server/http';
import {attribution,country,device,isBot} from '../server/telemetry';
import {contactEvent,pagePath,productPath} from '../src/data/measurement';
import {activeDatePreset,presetDates} from '../src/data/adminDates';
import {onRequest} from '../functions/api/[[route]]';
import {blankDraft} from '../src/data/inquiry';

test('the inquiry endpoint rejects missing messages and missing selected contacts before saving', async()=>{
  const statements=[];
  const env={APP_ENV:'local',AUTH_MODE:'local',PRIVACY_SALT:'quote-validation-test-salt-at-least-32-characters',DB:{prepare(sql){statements.push(sql);assert.match(sql,/INSERT INTO rate_limits/);return {bind(){return {first:async()=>({count:1})};}};}}};
  const base={...blankDraft(),name:'Local QA',country:'Algeria',contactMethod:'phone',phone:'+971501234567',notes:'Three hybrid SUVs.'};
  for(const draft of [{...base,notes:'  '},{...base,phone:'',email:'buyer@example.invalid'}]){
    const response=await onRequest({request:new Request('http://127.0.0.1/api/inquiries/',{method:'POST',headers:{Origin:'http://127.0.0.1','Content-Type':'application/json'},body:JSON.stringify({draft,acceptPrivacy:true,idempotencyKey:crypto.randomUUID()})}),env});
    assert.equal(response.status,422);
  }
  assert.equal(statements.length,2);
});

test('shared failures use English on public routes and preserve Chinese in admin', async()=>{
  const env={DB:{},APP_ENV:'local',AUTH_MODE:'local'};
  const headers={Origin:'https://different.example','Content-Type':'application/json'};
  const publicResponse=await onRequest({request:new Request('http://127.0.0.1/api/inquiries/',{method:'POST',headers,body:'{}'}),env});
  assert.equal(publicResponse.status,403);
  assert.equal((await publicResponse.json()).error,'Please reload this page before sending your inquiry.');
  const adminResponse=await onRequest({request:new Request('http://127.0.0.1/api/admin/login/',{method:'POST',headers,body:'{}'}),env});
  assert.equal(adminResponse.status,403);
  assert.match((await adminResponse.json()).error,/请求来源/);
  const configResponse=await onRequest({request:new Request('http://127.0.0.1/api/public-config/'),env});
  assert.equal(configResponse.status,503);
  assert.match((await configResponse.json()).error,/inquiry service is unavailable/);
});

test('date windows use closed Shanghai days and an equal-length previous period',()=>{
  const r=dateRange(new URLSearchParams({from:'2026-10-01',to:'2026-10-07'}));
  assert.equal(r.start,Date.parse('2026-10-01T00:00:00+08:00'));
  assert.equal(r.end-r.start,7*DAY);assert.equal(r.previousEnd-r.previousStart,r.end-r.start);assert.equal(r.previousEnd,r.start);
});
test('default date and shortcuts use Shanghai calendar days across UTC midnight',()=>{
  const now=Date.parse('2026-11-05T16:05:00Z');
  assert.deepEqual(presetDates('today',now),{from:'2026-11-06',to:'2026-11-06'});
  assert.deepEqual(presetDates('yesterday',now),{from:'2026-11-05',to:'2026-11-05'});
  assert.deepEqual(presetDates('7days',now),{from:'2026-10-31',to:'2026-11-06'});
  assert.deepEqual(presetDates('30days',now),{from:'2026-10-08',to:'2026-11-06'});
  const range=dateRange(new URLSearchParams(),now);assert.equal(range.from,'2026-11-06');assert.equal(range.end-range.start,DAY);
  assert.equal(activeDatePreset('2026-10-31','2026-11-06',now),'7days');
  assert.equal(activeDatePreset('2026-10-30','2026-11-06',now),undefined);
});
test('contact classification recognizes real contact destinations without matching lookalike hosts',()=>{
  for(const url of ['https://wa.me/8617357146027','https://api.whatsapp.com/send?phone=123','https://web.whatsapp.com/send','whatsapp://send?phone=123'])assert.equal(contactEvent(url),'whatsapp_click');
  assert.equal(contactEvent('mailto:contact@keeyak.com?subject=hello'),'email_click');
  for(const url of ['https://wa.me.evil.example/send','https://example.com/?to=wa.me','/quote/','tel:123'])assert.equal(contactEvent(url),null);
});
test('invalid, reversed and oversized date ranges are rejected',()=>{
  for(const dates of [{from:'2026-02-30',to:'2026-03-01'},{from:'2026-10-10',to:'2026-10-01'},{from:'2026-01-01',to:'2026-10-01'}])assert.throws(()=>dateRange(new URLSearchParams(dates)));
});
test('analytics filters are bound parameters and default to excluding internal traffic',()=>{
  const value="x' OR 1=1 --",w=where(new URLSearchParams({source:value,product:'/new-cars/byd/han-l/'}),'inquiries',10,20);
  assert.ok(!w.sql.includes(value));assert.ok(w.sql.includes('is_test=0'));assert.ok(w.sql.includes('json_each'));assert.ok(w.values.includes(value));
});
test('CSV neutralizes formula prefixes and quotes multiline values',()=>{
  for(const value of ['=SUM(1,1)','+cmd','-2+2','@IMPORT',' \t=2'])assert.ok(csvCell(value).startsWith('"\''));
  assert.equal(csvCell('a"b\nc'),'"a""b\nc"');
});
test('measurement drops query strings and accepts only product-detail paths',()=>{
  assert.equal(pagePath('/quote/?email=secret@example.com'),'/quote/');
  assert.equal(productPath('/new-cars/byd/han-l/?email=secret'),'/new-cars/byd/han-l/');
  for(const path of ['https://evil.example/a','//evil.example','/new-cars/page/2/','/admin/'])assert.equal(productPath(path),'');
});
test('attribution stores only a referrer host and safe campaign tokens',()=>{
  const a=attribution({referrer:'https://www.google.com/search?q=private',source:'person@example.com',campaign:'private email@example.com'},'https://keeyak.com');
  assert.equal(a.referrer_host,'www.google.com');assert.equal(a.source,'www.google.com');assert.equal(a.medium,'organic');assert.equal(a.campaign,'');
  assert.equal(attribution({},'https://keeyak.com').source,'unknown');
});
test('local country is unknown rather than trusting forged geography headers',()=>{
  const r=new Request('http://127.0.0.1/api',{headers:{'CF-IPCountry':'DE','User-Agent':'Mozilla/5.0 (iPhone; Mobile)'}});
  assert.equal(country(r,{APP_ENV:'local'}),'unknown');assert.equal(device(r),'mobile');
  assert.equal(isBot(new Request('https://example.com',{headers:{'User-Agent':'Googlebot/2.1'}})),true);
});
test('anonymous cookies require a valid HMAC',async()=>{
  const env={PRIVACY_SALT:'x'.repeat(48)},id=crypto.randomUUID(),sig=await sign('keeyak_visitor:'+id,env);
  assert.equal(await signedCookie(new Request('https://example.com',{headers:{Cookie:'keeyak_visitor='+id+'.'+sig}}),'keeyak_visitor',env),id);
  assert.equal(await signedCookie(new Request('https://example.com',{headers:{Cookie:'keeyak_visitor='+id+'.fake'}}),'keeyak_visitor',env),'');assert.ok(uuid(id));
});
test('production cannot fall back to the local password login',async()=>{
  const r=new Request('https://keeyak-auto-preview.pages.dev/api/admin/login',{method:'POST',headers:{Origin:'https://keeyak-auto-preview.pages.dev'}});
  await assert.rejects(()=>login(r,{APP_ENV:'local',AUTH_MODE:'local'}),error=>error.status===403);
});
test('unsigned or forged Cloudflare Access identity is rejected',async()=>{
  const env={AUTH_MODE:'access',CF_ACCESS_TEAM_DOMAIN:'test.cloudflareaccess.com',CF_ACCESS_AUD:'expected',ADMIN_EMAILS:'admin@example.com'};
  await assert.rejects(()=>admin(new Request('https://example.com/api/admin/session',{headers:{'Cf-Access-Authenticated-User-Email':'admin@example.com','Cf-Access-Jwt-Assertion':'forged'}}),env),error=>error.status===401);
});


test('today has 24 hour bins, real zeroes up to now and null future bins',()=>{
 const start=Date.parse('2026-11-06T00:00:00+08:00'),now=start+14.5*3600000;
 const rows=buildTrend(start,start+DAY,[{bucket:14,visitors:2}],[{bucket:23,visitors:4}],now);
 assert.equal(rows.length,24);assert.equal(rows[0].label,'00:00');assert.equal(rows[23].label,'23:00');
 assert.equal(rows[0].visitors,0);assert.equal(rows[14].visitors,2);assert.equal(rows[15].visitors,null);
 assert.equal(rows[23].previous.visitors,4);assert.equal(rows[23].previous.inquiries,0);
 const yesterday=buildTrend(start-DAY,start,[],[],now);assert.ok(yesterday.every(r=>r.visitors===0));
 const days=buildTrend(start-6*DAY,start+DAY,[{bucket:0,visitors:1},{bucket:6,visitors:1}],[],now);
 assert.equal(days.length,7);assert.equal(days[0].label,'10-31');assert.equal(days[6].label,'11-06');
});
