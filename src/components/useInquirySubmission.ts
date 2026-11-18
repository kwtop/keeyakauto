import {useEffect,useRef,useState} from 'react';
import type {InquiryDraft} from '../data/inquiry';
import {createInquiryReceipt,INQUIRY_RECEIPT_KEY,restoreInquiryReceipt} from '../data/inquiryReceipt';
import {InquirySubmissionError,postInquiry} from '../data/inquirySubmission';
import {arrivalContext,measurementAllowed,track} from '../scripts/measurement-client';
type Config={formToken:string;siteKey:string|null;local:boolean};
type Turnstile={render:(node:HTMLElement,options:Record<string,unknown>)=>string;remove:(id:string)=>void;reset:(id:string)=>void};
declare global{interface Window{turnstile?:Turnstile;}}

export function useInquirySubmission({draft,onSaved,enabled=true,defaultAccepted=false}: {
 draft: InquiryDraft;
 onSaved?: (id: string) => void;
 enabled?: boolean;
 defaultAccepted?: boolean;
}) {
 const [config,setConfig]=useState<Config|null>(null),[configReady,setConfigReady]=useState(false);
 const [accepted, setAccepted] = useState(defaultAccepted);
 const [error,setError]=useState(''),[busy,setBusy]=useState(false),[saved,setSaved]=useState(''),[token,setToken]=useState(''),[retry,setRetry]=useState(0);
 const [errorKind,setErrorKind]=useState<'service'|'verification'|'submission'>('service');
 const [receiptChecked,setReceiptChecked]=useState(false);
 const widget=useRef<HTMLDivElement>(null),widgetId=useRef(''),sending=useRef(false);
 const attempt=useRef<{content:string;key:string}|null>(null);
 useEffect(()=>{
  if(!enabled)return;
  let active=true;setSaved('');setReceiptChecked(false);
  let value:unknown=null;try{value=JSON.parse(sessionStorage.getItem(INQUIRY_RECEIPT_KEY)||'null');}catch{}
  restoreInquiryReceipt(value,draft).then(receipt=>{
   if(!active)return;
   if(receipt){setSaved(receipt.id);onSaved?.(receipt.id);}
   setReceiptChecked(true);
  }).catch(()=>{if(active)setReceiptChecked(true);});
  return()=>{active=false;};
 },[enabled,draft,onSaved]);
 useEffect(()=>{
  if(!enabled||saved)return;
  const abort=new AbortController();let timer:ReturnType<typeof setTimeout>|undefined;
  setConfig(null);setConfigReady(false);setError('');setToken('');
  fetch('/api/public-config/',{signal:abort.signal,cache:'no-store'}).then(async response=>{
   if(!response.ok)throw Error();const result=await response.json();
   if(result.app!=='keeyak-auto'||typeof result.formToken!=='string'||(!result.local&&!result.siteKey))throw Error();
   if(abort.signal.aborted)return;setConfig(result);
   // Prepare the server's minimum token age while the visitor fills in the form.
   timer=setTimeout(()=>setConfigReady(true),Math.max(0,Number(result.formToken.split(':')[0])+1100-Date.now()));
  }).catch(e=>{if(e.name!=='AbortError'){setErrorKind('service');setError('The inquiry service is unavailable right now. Your draft is still here. Try again, or contact us by email or WhatsApp.');}});
  return()=>{abort.abort();clearTimeout(timer);};
 },[enabled,retry,saved]);
 useEffect(()=>{
  if(saved||!config?.siteKey||config.local||!widget.current)return;
  let disposed=false,script=document.querySelector<HTMLScriptElement>('script[data-keeyak-turnstile]');
  const render=()=>{
   if(disposed||!widget.current||!window.turnstile)return;
   widgetId.current=window.turnstile.render(widget.current,{sitekey:config.siteKey,action:'inquiry',callback:(value:string)=>{setToken(value);setError(current=>current.startsWith('The security check')?'':current);},'expired-callback':()=>setToken(''),'error-callback':()=>{setToken('');setErrorKind('verification');setError('The security check did not load. Try again, or contact us by email or WhatsApp.');}});
  };
  const scriptError=()=>{if(!disposed){setErrorKind('verification');setError('The security check is unavailable. Try again, or contact us by email or WhatsApp.');}};
  if(window.turnstile)render();else{
   if(!script){script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.defer=true;script.dataset.keeyakTurnstile='true';document.head.append(script);}
   script.addEventListener('load',render);script.addEventListener('error',scriptError,{once:true});
  }
  return()=>{disposed=true;script?.removeEventListener('load',render);script?.removeEventListener('error',scriptError);if(widgetId.current)window.turnstile?.remove(widgetId.current);widgetId.current='';};
 },[config,saved]);
 const canSubmit=enabled&&receiptChecked&&configReady&&!!config&&accepted&&(config.local||!!token)&&!busy&&!saved;
 async function submit(){
  if(sending.current||!canSubmit||!config)return;
  sending.current=true;setBusy(true);setError('');
  const content=JSON.stringify(draft);if(attempt.current?.content!==content)attempt.current={content,key:crypto.randomUUID()};
  try{
   const id=await postInquiry({draft,idempotencyKey:attempt.current.key,formToken:config.formToken,turnstileToken:token,acceptPrivacy:accepted,measurementAllowed:measurementAllowed(),website:(document.getElementById('inquiry-website') as HTMLInputElement|null)?.value||'',page:location.pathname,language:document.documentElement.lang||'unknown',attribution:arrivalContext()});
   try{sessionStorage.setItem(INQUIRY_RECEIPT_KEY,JSON.stringify(await createInquiryReceipt(id,draft)));}catch{}
   setSaved(id);onSaved?.(id);
  }catch(e){
   setErrorKind('submission');setError(e instanceof Error?e.message:'Your inquiry could not be saved. Please retry.');track('form_submit_failed','quote_form',e instanceof InquirySubmissionError?e.code:'network');
   if(widgetId.current){window.turnstile?.reset(widgetId.current);setToken('');}
  }finally{sending.current=false;setBusy(false);}
 }
 return {accepted,setAccepted,widget,error,errorKind,busy,saved,receiptChecked,canSubmit,submit,retry:()=>setRetry(n=>n+1)};
}
