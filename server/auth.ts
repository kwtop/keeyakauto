import {createRemoteJWKSet,jwtVerify} from 'jose';
import type {Env} from './types';
import {HttpError,cookie,equal,hash,json,limit,localRequest,readJson,sameOrigin,setCookie,signedValue,text} from './http';
const jwks=new Map<string,ReturnType<typeof createRemoteJWKSet>>();
const COOKIE='keeyak_admin';
export async function admin(request:Request,env:Env):Promise<string>{
  if(localRequest(request,env)&&env.AUTH_MODE==='local'){
    const token=cookie(request,COOKIE);
    if(token.length>200)throw new HttpError(401,'请先登录。');
    const session=token&&await env.DB.prepare('SELECT username FROM admin_sessions WHERE token_hash=? AND expires_at>?').bind(await hash(token),Date.now()).first<{username:string}>();
    if(session)return session.username;
    throw new HttpError(401,'请先登录。');
  }
  if(env.AUTH_MODE!=='access'||!env.CF_ACCESS_AUD||!env.ADMIN_EMAILS||!/^([a-z0-9-]+\.)?cloudflareaccess\.com$/.test(env.CF_ACCESS_TEAM_DOMAIN||''))throw new HttpError(503,'后台认证尚未配置。');
  const issuer='https://'+env.CF_ACCESS_TEAM_DOMAIN;
  let key=jwks.get(issuer);if(!key){key=createRemoteJWKSet(new URL(issuer+'/cdn-cgi/access/certs'));jwks.set(issuer,key);}
  const assertion=request.headers.get('Cf-Access-Jwt-Assertion')||cookie(request,'CF_Authorization');
  if(!assertion)throw new HttpError(401,'请通过 Cloudflare Access 登录。');
  try{
    const {payload}=await jwtVerify(assertion,key,{issuer,audience:env.CF_ACCESS_AUD,algorithms:['RS256']});
    const email=typeof payload.email==='string'?payload.email.toLowerCase():'';
    if(!email||!env.ADMIN_EMAILS.split(',').map(s=>s.trim().toLowerCase()).includes(email))throw Error();
    return email;
  }catch{throw new HttpError(401,'登录已失效或账号未获授权。');}
}
async function passwordMatches(password:string,record:string){
  const [scheme,iterations,salt,expected]=record.split('$');
  if(scheme!=='pbkdf2'||Number(iterations)<100000||!salt||!expected)return false;
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:new TextEncoder().encode(salt),iterations:Number(iterations)},key,256);
  const actual=Array.from(new Uint8Array(bits),x=>x.toString(16).padStart(2,'0')).join('');
  return equal(expected,actual);
}
export async function login(request:Request,env:Env){
  sameOrigin(request,env);
  if(!localRequest(request,env)||env.AUTH_MODE!=='local')throw new HttpError(403,'请使用 Cloudflare Access 登录。');
  await limit(request,env,'login',8,900);
  const body=await readJson(request,4096),username=text(body.username,150),password=text(body.password,300);
  if(username!==(env.ADMIN_USERNAME||'local-admin')||!await passwordMatches(password,env.ADMIN_PASSWORD_HASH||''))throw new HttpError(401,'用户名或密码错误。');
  const token=crypto.randomUUID()+crypto.randomUUID(),now=Date.now();
  await env.DB.batch([
    env.DB.prepare('DELETE FROM admin_sessions WHERE expires_at<?').bind(now),
    env.DB.prepare('INSERT INTO admin_sessions VALUES (?,?,?)').bind(await hash(token),username,now+8*3600000)
  ]);
  const response=json({user:username,mode:'local'});
  response.headers.append('Set-Cookie',setCookie(request,COOKIE,token,8*3600));
  response.headers.append('Set-Cookie',setCookie(request,'keeyak_internal',await signedValue('keeyak_internal','1',env),90*86400));
  return response;
}
export async function logout(request:Request,env:Env){
  sameOrigin(request,env);await admin(request,env);
  const token=cookie(request,COOKIE);if(token)await env.DB.prepare('DELETE FROM admin_sessions WHERE token_hash=?').bind(await hash(token)).run();
  return json({ok:true,logoutUrl:localRequest(request,env)?null:'/cdn-cgi/access/logout'},200,{'Set-Cookie':setCookie(request,COOKIE,'',0)});
}
export async function audit(env:Env,actor:string,action:string,target:string){
  await env.DB.prepare('INSERT INTO admin_audit VALUES (?,?,?,?,?)').bind(crypto.randomUUID(),Date.now(),actor,action,target).run();
}
