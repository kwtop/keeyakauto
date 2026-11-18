export async function api<T>(path:string,init:RequestInit={}):Promise<T>{
  const endpoint=new URL('/api/admin/'+path,window.location.origin);
  if(!endpoint.pathname.endsWith('/'))endpoint.pathname+='/';
  const response=await fetch(endpoint.pathname+endpoint.search,{...init,credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json',...init.headers}});
  const result=await response.json();
  if(response.status===401&&path!=='session'&&path!=='login')window.dispatchEvent(new Event('keeyak:admin-expired'));
  if(!response.ok)throw Object.assign(new Error(result.error||'请求失败，请稍后重试。'),{status:response.status});
  return result;
}
export type Filters=Record<string,string>;
export const query=(value:Filters)=>new URLSearchParams(Object.entries(value).filter(([,v])=>v!=='')).toString();
export {shanghaiDate as today,presetDates} from '../../data/adminDates';
const timeFormatter=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
const countryFormatter=new Intl.DisplayNames(['zh-CN'],{type:'region'});
export const formatTime=(value:number)=>timeFormatter.format(new Date(value));
export const known=(value:unknown)=>!value||value==='unknown'?'未知':String(value);
export const countryName=(value:unknown)=>{if(!value||value==='unknown')return '未知';try{return countryFormatter.of(String(value))||String(value);}catch{return String(value);}};
let productLabels:Record<string,string>|null=null;
export function productName(path:string){
  if(!productLabels){try{productLabels=JSON.parse(document.getElementById('admin-product-labels')?.textContent||'{}');}catch{productLabels={};}}
  return productLabels?.[path]||path.split('/').filter(Boolean).slice(-2).map(value=>value.replace(/-/g,' ')).join(' · ');
}
const pageLabels:Record<string,string>={
  '/':'首页','/new-cars/':'新车目录','/used-cars/':'二手车目录','/contact/':'联系我们',
  '/quote/':'提交询盘','/export-services/':'出口服务','/export-services/buying-guide/':'采购指南'
};
export function pageName(path:string){
  return pageLabels[path]||(/^\/(new-cars|used-cars)\/[^/]+\/[^/]+\/$/.test(path)?productName(path):path);
}
export interface Options{sources:string[];countries:string[];languages:string[];products:string[];destinations:string[];}
