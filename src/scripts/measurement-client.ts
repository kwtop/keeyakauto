import {anonymousEvents,contactEvent,pagePath,productPath,type ClientEvent} from '../data/measurement';
const CONSENT='keeyak.measurement-consent.v1';
const PENDING='keeyak.measurement-pending.v1';
type EventRecord={id:string;name:ClientEvent;page:string;product:string;language:string;position:string;failureCode?:string};
type Mode='off'|'anonymous'|'detailed';
type QueuedEvent={event:EventRecord;mode:Exclude<Mode,'off'>};
export function track(name:ClientEvent,position='main',failureCode?:string){
  try{window.dispatchEvent(new CustomEvent('keeyak:measure',{detail:{name,position,failureCode}}));}catch{ /* Measurement must never interrupt the page. */ }
}
function browserOptsOut(){
  return navigator.doNotTrack==='1'||(navigator as Navigator&{globalPrivacyControl?:boolean}).globalPrivacyControl===true;
}
function measurementMode():Mode{
  if(browserOptsOut())return 'off';
  try{
    const choice=localStorage.getItem(CONSENT);
    if(choice==='declined')return 'off';
    if(choice===null||choice==='allowed')return 'detailed';
    return 'anonymous';
  }catch{return 'off';}
}
export function measurementAllowed(){return measurementMode()==='detailed';}
export function arrivalContext(){
  try{
    const params=new URLSearchParams(location.search),stored=sessionStorage.getItem('keeyak.arrival.v1');
    if(stored)return JSON.parse(stored) as Record<string,unknown>;
    const safe=(name:string)=>{const v=params.get(name)?.toLowerCase()||'';return /^[a-z0-9][a-z0-9._-]{0,99}$/.test(v)?v:'';};
    const value={source:safe('utm_source'),medium:safe('utm_medium'),campaign:safe('utm_campaign'),referrer:document.referrer?new URL(document.referrer).origin:'',paidGoogle:params.has('gclid')};
    sessionStorage.setItem('keeyak.arrival.v1',JSON.stringify(value));return value;
  }catch{return {};}
}
function initialize(){
  if(document.documentElement.hasAttribute('data-keeyak-measurement-ready'))return;
  document.documentElement.setAttribute('data-keeyak-measurement-ready','true');
  if(location.pathname.startsWith('/admin')||location.pathname.startsWith('/design'))return;
  const preferences=document.querySelector<HTMLElement>('[data-measurement-preferences]');
  const allowButtons=document.querySelectorAll<HTMLButtonElement>('[data-allow-measurement]');
  const basicButtons=document.querySelectorAll<HTMLButtonElement>('[data-basic-measurement]');
  const declineButton=preferences?.querySelector<HTMLButtonElement>('[data-decline-measurement]');
  const status=preferences?.querySelector<HTMLElement>('[data-measurement-status]');
  let mode=measurementMode(),queue:QueuedEvent[]=[],timer=0,sessionAt=0,starting:Promise<boolean>|null=null,busy=false,retries=0;
  function showPreference(message?:string){
    const blocked=browserOptsOut();
    allowButtons.forEach(button=>button.disabled=mode==='detailed'||blocked);
    basicButtons.forEach(button=>button.disabled=blocked);
    if(declineButton)declineButton.disabled=mode==='off';
    if(status)status.textContent=message??(blocked?'Your browser privacy preference keeps usage measurement off.':mode==='detailed'?'Website usage measurement is on.':mode==='anonymous'?'Anonymous usage counts are on.':'Usage measurement is off.');
    if(preferences)preferences.hidden=false;
  }
  if(mode==='detailed')try{const saved=JSON.parse(sessionStorage.getItem(PENDING)||'null');if(saved&&Date.now()-saved.at<30*60000&&Array.isArray(saved.events))queue=saved.events.slice(0,90).map((event:EventRecord)=>({event,mode:'detailed'}));}catch{}
  const persist=()=>{try{const events=queue.filter(item=>item.mode==='detailed').map(item=>item.event);if(events.length&&mode==='detailed')sessionStorage.setItem(PENDING,JSON.stringify({at:Date.now(),events}));else sessionStorage.removeItem(PENDING);}catch{}};
  const page=pagePath(location.pathname),product=productPath(page)||productPath(new URLSearchParams(location.search).get('source'));
  const language=document.documentElement.lang||'unknown';
  const started=new WeakSet<HTMLFormElement>();
  const jsonPost=(url:string,value:unknown)=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(value),credentials:'same-origin',keepalive:true,signal:AbortSignal.timeout(8000)});
  async function session(){
    if(Date.now()-sessionAt<25*60000)return true;
    if(starting)return starting;
    starting=(async()=>{
      try{const response=await jsonPost('/api/telemetry/session/',{...arrivalContext(),page,language});if(response.status!==200)return false;if(!measurementAllowed()){void jsonPost('/api/telemetry/forget/',{}).catch(()=>{});return false;}sessionAt=Date.now();return true;}catch{return false;}finally{starting=null;}
    })();return starting;
  }
  async function flush(){
    if(mode==='off'||busy||!queue.length)return;
    busy=true;
    try{
      const batchMode=queue[0].mode;
      if(batchMode==='detailed'&&(mode!=='detailed'||!await session()))return;
      if(measurementMode()==='off'||queue[0]?.mode!==batchMode)return;
      const batch:QueuedEvent[]=[];
      for(const item of queue){if(item.mode!==batchMode||batch.length===30)break;batch.push(item);}
      const response=await jsonPost(batchMode==='detailed'?'/api/telemetry/events/':'/api/telemetry/counts/',{events:batch.map(item=>item.event)});
      if(response.ok){const sent=new Set(batch);queue=queue.filter(item=>!sent.has(item));persist();retries=0;}
      else if(batchMode==='detailed'&&response.status===409)sessionAt=0;
    }catch{ /* Retain the same event IDs for a bounded retry. */ }
    finally{busy=false;if(queue.length&&retries++<4)timer=window.setTimeout(()=>void flush(),2000*retries);}
  }
  function enqueue(name:ClientEvent,position:string,failureCode?:string){
    if(mode==='off'||(mode==='anonymous'&&!anonymousEvents.has(name))||queue.length>=90)return;
    queue.push({event:{id:crypto.randomUUID(),name,page,product,language,position,failureCode},mode});if(mode==='detailed')persist();
    clearTimeout(timer);timer=window.setTimeout(()=>void flush(),500);
  }
  function firstViews(){enqueue('page_view','main');if(productPath(page))enqueue('product_view','main');void flush();}
  function position(element:Element){
    if(element.closest('header.primary-header'))return 'header';
    if(element.closest('footer'))return 'footer';
    if(element.closest('.vd-gallery'))return 'product_gallery';
    if(element.closest('#specifications'))return 'specifications';
    if(element.closest('.quote-form,.quote-ready'))return 'quote_form';
    if(element.closest('[class*="hero"]'))return 'hero';
    return location.pathname==='/contact/'?'contact':'main';
  }
  window.addEventListener('keeyak:measure',((event:CustomEvent)=>{
    if(event.detail)enqueue(event.detail.name,event.detail.position||'main',event.detail.failureCode);
  }) as EventListener);
  function measureLink(event:MouseEvent){
    if(event.type==='auxclick'&&event.button!==1)return;
    const element=event.target instanceof Element?event.target.closest('a'):null;
    if(!element)return;
    const href=element.getAttribute('href')||'',at=position(element);
    const contact=contactEvent(href);
    if(contact){enqueue(contact,at);void flush();}
    else if(href.startsWith('/quote/')&&!href.includes('thank-you'))enqueue('inquiry_click',at);
    else if(element.hasAttribute('download')||/\.(pdf|xlsx?|docx?|zip)(?:[?#]|$)/i.test(href))enqueue('download_click',at);
  }
  document.addEventListener('click',measureLink,{capture:true});
  document.addEventListener('auxclick',measureLink,{capture:true});
  document.addEventListener('focusin',event=>{
    const field=event.target;
    if(!(field instanceof HTMLInputElement||field instanceof HTMLTextAreaElement||field instanceof HTMLSelectElement)||!field.form||field.type==='hidden'||field.name==='website')return;
    const form=field.form;if(form.getAttribute('role')==='search'||form.closest('.tc-search,.car-search'))return;
    if(!started.has(form)){started.add(form);enqueue('form_start',position(form));}
  });
  document.addEventListener('submit',event=>{const form=event.target;if(form instanceof HTMLFormElement&&form.hasAttribute('action')&&form.method.toLowerCase()==='get'&&new URL(form.action).pathname==='/quote/')enqueue('inquiry_click',position(form));},{capture:true});
  document.addEventListener('toggle',event=>{const element=event.target;if(element instanceof HTMLDetailsElement&&element.open&&element.closest('#specifications'))enqueue('specifications_expand','specifications');},{capture:true});
  window.addEventListener('pagehide',()=>void flush());
  function updateMode(){
    const previous=mode;mode=measurementMode();
    if(mode==='off'){queue=[];persist();clearTimeout(timer);sessionAt=0;}
    else if(previous==='off')firstViews();
    else if(previous==='detailed'&&mode==='anonymous'){queue=queue.filter(item=>item.mode==='anonymous');sessionAt=0;}
    persist();
    showPreference();
  }
  window.addEventListener('storage',event=>{if(event.key===CONSENT||event.key===null)updateMode();});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')void flush();});
  allowButtons.forEach(button=>button.addEventListener('click',()=>{
    if(mode==='detailed'||browserOptsOut())return;
    try{localStorage.setItem(CONSENT,'allowed');}catch{showPreference('Your browser could not save this preference.');return;}
    updateMode();
    if(measurementAllowed())void session();
  }));
  basicButtons.forEach(button=>button.addEventListener('click',()=>{
    if(browserOptsOut())return;
    try{localStorage.setItem(CONSENT,'basic');}catch{showPreference('Your browser could not save this preference.');return;}
    updateMode();
    void jsonPost('/api/telemetry/forget/',{}).catch(()=>{});
  }));
  declineButton?.addEventListener('click',()=>{
    mode='off';queue=[];persist();clearTimeout(timer);sessionAt=0;
    try{localStorage.setItem(CONSENT,'declined');}catch{ /* Stay off for this page. */ }
    showPreference();
    void jsonPost('/api/telemetry/forget/',{}).catch(()=>{});
  });
  showPreference();
  if(mode!=='off')firstViews();
}
if(typeof window!=='undefined'){
  try{if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();}catch{ /* Do not affect browsing if instrumentation is unavailable. */ }
}
