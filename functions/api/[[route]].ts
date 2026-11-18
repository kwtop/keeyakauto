import type {Env} from '../../server/types';
import {HttpError,json,setCookie,signedValue} from '../../server/http';
import {admin,login,logout} from '../../server/auth';
import {publicConfig,saveInquiry} from '../../server/inquiries';
import {beginSession,forget,ingest,ingestAnonymous} from '../../server/telemetry';
import {activity,addNote,exportInquiries,inquiryDetail,insights,listInquiries,options,updateInquiry,visitorDetail,visitors} from '../../server/admin-data';

export const onRequest=async(context:{request:Request;env:Env})=>{
  const request=context.request,env=context.env;
  const path=new URL(request.url).pathname.replace(/\/$/,''),method=request.method;
  try{
    if(!env.DB)throw new HttpError(503,'数据库尚未配置。','The inquiry service is unavailable. Please contact us by email or WhatsApp.');
    if(path==='/api/public-config'&&method==='GET')return await publicConfig(request,env);
    if(path==='/api/inquiries'&&method==='POST')return await saveInquiry(request,env);
    if(path==='/api/telemetry/session'&&method==='POST')return await beginSession(request,env);
    if(path==='/api/telemetry/events'&&method==='POST')return await ingest(request,env);
    if(path==='/api/telemetry/counts'&&method==='POST')return await ingestAnonymous(request,env);
    if(path==='/api/telemetry/forget'&&method==='POST')return await forget(request,env);
    if(path==='/api/admin/login'&&method==='POST')return await login(request,env);
    if(path.startsWith('/api/admin/')){
      const user=await admin(request,env);
      if(path==='/api/admin/session'&&method==='GET')return json({user,mode:env.AUTH_MODE,local:env.APP_ENV==='local'},200,{'Set-Cookie':setCookie(request,'keeyak_internal',await signedValue('keeyak_internal','1',env),90*86400)});
      if(path==='/api/admin/logout'&&method==='POST')return await logout(request,env);
      if(path==='/api/admin/inquiries'&&method==='GET')return await listInquiries(request,env);
      if(path==='/api/admin/export'&&method==='GET')return await exportInquiries(request,env,user);
      if(path==='/api/admin/options'&&method==='GET')return await options(env);
      if(path==='/api/admin/insights'&&method==='GET')return await insights(request,env);
      if(path==='/api/admin/activity'&&method==='GET')return await activity(request,env);
      if(path==='/api/admin/visitors'&&method==='GET')return await visitors(request,env);
      const inquiry=path.match(/^\/api\/admin\/inquiries\/([^/]+)(\/notes)?$/);
      if(inquiry){
        if(inquiry[2]&&method==='POST')return await addNote(request,inquiry[1],env,user);
        if(!inquiry[2]&&method==='GET')return await inquiryDetail(inquiry[1],env);
        if(!inquiry[2]&&method==='PATCH')return await updateInquiry(request,inquiry[1],env,user);
      }
      const visitor=path.match(/^\/api\/admin\/visitors\/([^/]+)$/);
      if(visitor&&method==='GET')return await visitorDetail(request,visitor[1],env);
    }
    return json({error:path.startsWith('/api/admin/')?'接口不存在或请求方法不支持。':'This request is not supported. Please reload the page and try again.'},404);
  }catch(error){
    if(error instanceof HttpError)return json({error:path.startsWith('/api/admin/')?error.message:(error.publicMessage??error.message)},error.status);
    // Never log submitted customer fields, raw tokens, cookies or database errors.
    console.error('API request failed',{path,method,type:error instanceof Error?error.name:'Error'});
    return json({error:path.startsWith('/api/admin/')?'服务暂不可用，请稍后重试。':'The service is temporarily unavailable. Please retry; your form entries have not been cleared.'},503);
  }
};
