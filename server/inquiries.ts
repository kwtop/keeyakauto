import {inquiryBrief,restoreDraft,selectedContactDraft,validateInquiry} from '../src/data/inquiry';
import {pagePath,productPath} from '../src/data/measurement';
import type {Env,InquiryRow} from './types';
import {HttpError,equal,hash,json,limit,localRequest,readJson,sameOrigin,sign,text,uuid} from './http';
import {attribution,country,internal,isBot,knownVisitor,language,sessionFor} from './telemetry';

export async function publicConfig(request:Request,env:Env){
  const value=Date.now()+':'+crypto.randomUUID();
  return json({app:'keeyak-auto',formToken:value+'.'+await sign('form:'+value,env),siteKey:env.TURNSTILE_SITE_KEY||null,local:localRequest(request,env),authMode:localRequest(request,env)&&env.AUTH_MODE==='local'?'local':'access'});
}
async function verifyChallenge(request:Request,env:Env,body:Record<string,unknown>){
  const raw=text(body.formToken,250),split=raw.lastIndexOf('.'),value=raw.slice(0,split),issued=Number(value.split(':')[0]);
  if(split<0||!equal(raw.slice(split+1),await sign('form:'+value,env))||Date.now()-issued<1000||Date.now()-issued>3600000)throw new HttpError(400,'Reload the page to renew the security check, then try sending again.');
  if(text(body.website)||isBot(request))throw new HttpError(422,'The submission could not be verified. Please contact us directly.');
  if(localRequest(request,env))return;
  if(!env.TURNSTILE_SECRET_KEY||!env.TURNSTILE_SITE_KEY)throw new HttpError(503,'The inquiry service is unavailable. Please contact us by email or WhatsApp.');
  const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{
    method:'POST',body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:text(body.turnstileToken,2048),idempotency_key:body.idempotencyKey as string}),signal:AbortSignal.timeout(10000)
  });
  const result=await response.json() as {success?:boolean;hostname?:string;action?:string};
  const hosts=[new URL(request.url).hostname,...(env.SITE_ORIGINS||'').split(',').flatMap(s=>{try{return [new URL(s.trim()).hostname];}catch{return [];}})];
  if(!result.success||!result.hostname||!hosts.includes(result.hostname)||result.action!=='inquiry')throw new HttpError(422,'Please complete the security check and try again.');
}
export async function saveInquiry(request:Request,env:Env){
  sameOrigin(request,env);await limit(request,env,'inquiry',12,600);
  const body=await readJson(request),key=uuid(body.idempotencyKey);
  if(body.acceptPrivacy!==true)throw new HttpError(422,'Please agree to the inquiry privacy notice before submitting.');
  if(!key)throw new HttpError(400,'The form could not be verified. Reload the page before sending your inquiry.');
  const restored=restoreDraft(body.draft);
  if(!restored)throw new HttpError(422,'Please check the required fields and contact details.');
  const draft=selectedContactDraft(restored);
  const {name:nameError,...validationErrors}=validateInquiry(draft,{requireName:true});
  if(Object.keys(validationErrors).length)throw new HttpError(422,'Please check the required fields and contact details.');
  // Only a completed, validated form enters this table. Analytics never carries these fields.
  const fingerprint=await hash(JSON.stringify({...draft,email:draft.email.toLowerCase(),phone:draft.phone.replace(/[\s()-]/g,''),vehicles:draft.vehicles.map(({id,...vehicle})=>vehicle)}));
  const prior=await env.DB.prepare('SELECT id,fingerprint FROM inquiries WHERE idempotency_key=?').bind(key).first<{id:string;fingerprint:string}>();
  if(prior){if(prior.fingerprint!==fingerprint)throw new HttpError(409,'This form has changed since an earlier send attempt. Reload the page, review your details and try again.');return json({id:prior.id,saved:true,duplicate:true});}
  if(nameError)throw new HttpError(422,nameError);
  await verifyChallenge(request,env,body);
  const now=Date.now(),id=crypto.randomUUID(),session=body.measurementAllowed===true?await sessionFor(request,env):null,test=Number(await internal(request,env));
  const visitor=body.measurementAllowed===true?(session?.visitor_id||await knownVisitor(request,env)):null;
  const products=[...new Set(draft.vehicles.map(v=>productPath(v.source)).filter(Boolean))];
  const page=pagePath(body.page),lang=language(body.language),attr=attribution((body.attribution||{}) as Record<string,unknown>,new URL(request.url).origin);
  const source=session?.source||attr.source,referrer=session?.referrer_host||attr.referrer_host,geo=session?.country||country(request,env);
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO inquiries (id,idempotency_key,fingerprint,created_at,updated_at,name,company,email,phone,country,requirements,draft_json,products_json,page,language,source,referrer_host,visit_country,visitor_id,session_id,is_test)
      SELECT ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM inquiries WHERE fingerprint=? AND created_at>=?) ON CONFLICT DO NOTHING`).bind(id,key,fingerprint,now,now,draft.name,draft.company,draft.email,draft.phone,draft.country,inquiryBrief(draft),JSON.stringify(draft),JSON.stringify(products),page,lang,source,referrer,geo,visitor,session?.id||null,Math.max(test,session?.is_test||0),fingerprint,now-20*60000),
    env.DB.prepare(`INSERT OR IGNORE INTO events (id,created_at,name,page,product,language,position,source,country,device,visitor_id,session_id,inquiry_id,is_returning,is_test)
      SELECT 'inquiry:'||id,created_at,'inquiry_saved',page,?,language,'quote_form',source,visit_country,?,visitor_id,session_id,id,?,is_test FROM inquiries WHERE id=?`).bind(products[0]||'',session?.device||'unknown',session?.is_returning||0,id),
    env.DB.prepare('UPDATE visitors SET last_seen=? WHERE id=? AND EXISTS (SELECT 1 FROM inquiries WHERE id=?)').bind(now,visitor,id)
  ]);
  const saved=await env.DB.prepare('SELECT id,fingerprint FROM inquiries WHERE idempotency_key=? OR (fingerprint=? AND created_at>=?) ORDER BY created_at DESC LIMIT 1').bind(key,fingerprint,now-20*60000).first<Pick<InquiryRow,'id'|'fingerprint'>>();
  if(!saved)throw new HttpError(503,'Your inquiry could not be saved. Please try again; your entries are still here.');
  if(saved.fingerprint!==fingerprint)throw new HttpError(409,'This form has changed since an earlier send attempt. Reload the page, review your details and try again.');
  return json({id:saved.id,saved:true,duplicate:saved.id!==id},saved.id===id?201:200);
}
