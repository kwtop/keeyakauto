import type {Env} from './types';
export class HttpError extends Error {
  constructor(public status:number,message:string,public publicMessage?:string){super(message);}
}
export const json=(data:unknown,status=200,headers:HeadersInit={})=>new Response(JSON.stringify(data),{
  status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',
    'X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin',...headers}
});
export const localRequest=(r:Request,env:Env)=>env.APP_ENV==='local'&&['localhost','127.0.0.1','[::1]'].includes(new URL(r.url).hostname);
export function sameOrigin(request:Request,env:Env){
  const origin=request.headers.get('Origin');
  const allowed=[new URL(request.url).origin,...(env.SITE_ORIGINS||'').split(',').map(s=>s.trim()).filter(Boolean)];
  if(!origin||!allowed.includes(origin)||request.headers.get('Sec-Fetch-Site')==='cross-site')throw new HttpError(403,'请求来源无效，请刷新页面后重试。','Please reload this page before sending your inquiry.');
}
export async function readJson(request:Request,max=65536):Promise<Record<string,unknown>>{
  if(!request.headers.get('Content-Type')?.includes('application/json'))throw new HttpError(415,'需要 JSON 请求。','The form could not be read. Reload the page and try again.');
  if(Number(request.headers.get('Content-Length'))>max)throw new HttpError(413,'请求内容过长。','Your inquiry is too long. Shorten the requirements and try again.');
  const reader=request.body?.getReader();
  if(!reader)throw new HttpError(400,'请求内容为空。','No form details were received. Review your inquiry and try again.');
  const chunks:Uint8Array[]=[];let size=0;
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>max){await reader.cancel();throw new HttpError(413,'请求内容过长。','Your inquiry is too long. Shorten the requirements and try again.');}chunks.push(value);}
  const buffer=new Uint8Array(size);let offset=0;for(const chunk of chunks){buffer.set(chunk,offset);offset+=chunk.length;}
  try{const value=JSON.parse(new TextDecoder().decode(buffer));if(!value||Array.isArray(value)||typeof value!=='object')throw Error();return value;}catch{throw new HttpError(400,'JSON 内容无效。','The form could not be read. Reload the page and try again.');}
}
export const text=(value:unknown,max=300)=>typeof value==='string'?value.trim().slice(0,max):'';
export const uuid=(value:unknown)=>typeof value==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(value)?value:'';
export function cookie(request:Request,name:string){return request.headers.get('Cookie')?.split(';').map(v=>v.trim()).find(v=>v.startsWith(name+'='))?.slice(name.length+1)||'';}
export function setCookie(request:Request,name:string,value:string,age:number){return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${age}${new URL(request.url).protocol==='https:'?'; Secure':''}`;}
export async function hash(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');}
export async function sign(value:string,env:Env){
  if(!env.PRIVACY_SALT||env.PRIVACY_SALT.length<32)throw new HttpError(503,'服务尚未完成安全配置。','The inquiry service is unavailable. Please contact us by email or WhatsApp.');
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.PRIVACY_SALT),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  return Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');
}
export function equal(a:string,b:string){if(a.length!==b.length)return false;let different=0;for(let i=0;i<a.length;i++)different|=a.charCodeAt(i)^b.charCodeAt(i);return different===0;}
export async function signedCookie(request:Request,name:string,env:Env){const raw=cookie(request,name),split=raw.lastIndexOf('.');if(split<0)return '';const value=raw.slice(0,split);return equal(raw.slice(split+1),await sign(name+':'+value,env))?value:'';}
export async function signedValue(name:string,value:string,env:Env){return value+'.'+await sign(name+':'+value,env);}
export function clientIp(request:Request){return request.headers.get('CF-Connecting-IP')||'unknown';}
export async function limit(request:Request,env:Env,bucket:string,max:number,seconds:number){
  const now=Date.now(),key=await sign(bucket+':'+clientIp(request)+':'+Math.floor(now/(seconds*1000)),env);
  const row=await env.DB.prepare('INSERT INTO rate_limits(key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(key,now+seconds*2000).first<{count:number}>();
  if((row?.count||0)>max)throw new HttpError(429,'请求过于频繁，请稍后重试。','Too many attempts. Please wait a few minutes before trying again.');
}
export function csvCell(value:unknown){let s=String(value??'');if(/^[\s\u0000-\u001f]*[=+@\-]/.test(s)||/^[\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
