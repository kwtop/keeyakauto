import {lazy,Suspense,useEffect,useRef,useState,type SubmitEvent} from 'react';
import {ArrowLeft,BarChart3,ExternalLink,Inbox,LockKeyhole,LogOut,Users} from 'lucide-react';
import {api,type Filters,type Options} from './api';
const loadInquiries=()=>import('./InquiryList'),loadInsights=()=>import('./Insights'),loadVisitors=()=>import('./Visitors');
const InquiryList=lazy(loadInquiries),Insights=lazy(loadInsights),Visitors=lazy(loadVisitors),InquiryPanel=lazy(()=>import('./InquiryPanel'));
type View='insights'|'inquiries'|'visitors';
const navigation=[{key:'insights',label:'数据总览',Icon:BarChart3,load:loadInsights},{key:'visitors',label:'访客记录',Icon:Users,load:loadVisitors},{key:'inquiries',label:'询盘管理',Icon:Inbox,load:loadInquiries}] as const;
type Session={user:string;mode:string;local:boolean};
export default function AdminApp(){
  const [session,setSession]=useState<Session|null>(null),[checked,setChecked]=useState(false),[authMode,setAuthMode]=useState(''),[error,setError]=useState(''),[username,setUsername]=useState(''),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[view,setView]=useState<View>('insights'),[options,setOptions]=useState<Options|null>(null),[inquiryId,setInquiryId]=useState(''),[visitorId,setVisitorId]=useState(''),[refresh,setRefresh]=useState(0),[detailScope,setDetailScope]=useState<Filters|undefined>(undefined);
  const [visited,setVisited]=useState<View[]>(['insights']),[scopes,setScopes]=useState<Partial<Record<View,Filters>>>({}),[revisions,setRevisions]=useState<Record<View,number>>({insights:0,visitors:0,inquiries:0}),[trail,setTrail]=useState<View[]>([]),[panelOrigin,setPanelOrigin]=useState<View>('insights');
  const scroll=useRef<Partial<Record<View,number>>>({}),optionsLoading=useRef(false),viewRefresh=useRef<Record<View,number>>({insights:0,visitors:0,inquiries:0});
  viewRefresh.current[view]=refresh;
  useEffect(()=>{
    const frame=requestAnimationFrame(()=>window.scrollTo({top:scroll.current[view]||0,behavior:'instant'}));
    return()=>cancelAnimationFrame(frame);
  },[view]);
  useEffect(()=>{
    let active=true;
    api<Session>('session').then(value=>{if(active)setSession(value);}).catch(()=>{}).finally(()=>{if(active)setChecked(true);});
    fetch('/api/public-config/',{cache:'no-store'}).then(r=>r.json()).then(r=>{if(r.app!=='keeyak-auto')throw Error();if(active)setAuthMode(r.authMode||'access');}).catch(()=>{if(active)setError('服务暂不可用或不是 KEEYAK 后台，请确认本地后台服务已启动。');});
    const expired=()=>{setSession(null);setInquiryId('');setOptions(null);setError('请重新登录。');};window.addEventListener('keeyak:admin-expired',expired);
    return()=>{active=false;window.removeEventListener('keeyak:admin-expired',expired);};
  },[]);
  useEffect(()=>{
    if(!session)return;
    const load=()=>{
      if(options||optionsLoading.current)return;
      optionsLoading.current=true;
      void api<Options>('options').then(setOptions).catch(e=>setError(e.message)).finally(()=>{optionsLoading.current=false;});
    };
    window.addEventListener('keeyak:admin-options',load);
    return()=>window.removeEventListener('keeyak:admin-options',load);
  },[session,options]);
  useEffect(()=>{
    if(!session?.user)return;
    let active=true;
    const lock=()=>{if(active){setSession(null);setInquiryId('');setVisitorId('');setOptions(null);setError('请重新登录。');}};
    const check=()=>{void api<Session>('session').catch((e:Error&{status?:number})=>{if(e.status===401)lock();});};
    const visible=()=>{if(document.visibilityState==='visible')check();};
    const restored=(event:PageTransitionEvent)=>{if(event.persisted)check();};
    const shared=(event:StorageEvent)=>{if(event.key==='keeyak.admin-logout.v1')lock();};
    const timer=window.setInterval(check,60000);
    document.addEventListener('visibilitychange',visible);window.addEventListener('pageshow',restored);window.addEventListener('storage',shared);
    return()=>{active=false;clearInterval(timer);document.removeEventListener('visibilitychange',visible);window.removeEventListener('pageshow',restored);window.removeEventListener('storage',shared);};
  },[session?.user]);
  async function signIn(event:SubmitEvent<HTMLFormElement>){
    event.preventDefault();if(busy)return;setBusy(true);setError('');
    try{const result=await api<Session>('login',{method:'POST',body:JSON.stringify({username,password})});setSession({...result,local:true});setPassword('');}catch(e){setError((e as Error).message);}finally{setBusy(false);}
  }
  async function signOut(){try{const result=await api<{logoutUrl:string|null}>('logout',{method:'POST',body:'{}'});setSession(null);setInquiryId('');setOptions(null);try{localStorage.setItem('keeyak.admin-logout.v1',String(Date.now()));}catch{}if(result.logoutUrl)location.assign(result.logoutUrl);}catch(e){setError((e as Error).message);}}
  if(!checked)return <div className="adm-start" role="status">正在验证登录状态…</div>;
  if(!session)return <main className="adm-login"><a href="/" aria-label="返回 KEEYAK 网站"><img src="/images/brand/keeyak-wordmark.png" alt="KEEYAK" width={170} height={31}/></a><section><LockKeyhole size={28} strokeWidth={1.5}/><h1>网站后台</h1>{error&&<p className="adm-error" role="alert">{error}</p>}{authMode==='local'?<form onSubmit={event=>void signIn(event)}><p className="adm-muted">本地测试登录</p><label>用户名<input autoComplete="username" required value={username} onChange={e=>setUsername(e.target.value)}/></label><label>密码<input autoComplete="current-password" type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><button type="submit" className="adm-primary" disabled={busy}>{busy?'登录中…':'登录'}</button></form>:<a className="adm-button adm-primary" href="/admin/">通过 Cloudflare Access 登录</a>}</section></main>;
  const navigate=(next:View,drill?:Filters,back=false)=>{
    scroll.current[view]=window.scrollY;
    if(drill){setScopes(previous=>({...previous,[next]:drill}));setRevisions(previous=>({...previous,[next]:previous[next]+1}));scroll.current[next]=0;}
    setVisited(previous=>previous.includes(next)?previous:[...previous,next]);
    setTrail(previous=>back?previous.slice(0,-1):drill?(next!==view?[...previous,view]:previous):[]);
    setView(next);setError('');
  };
  const openInquiry=(id:string,filters:Filters)=>{setDetailScope(filters);setPanelOrigin(view);setInquiryId(id);};
  const panel=inquiryId&&view===panelOrigin?<Suspense fallback={<p className="adm-loading">正在打开询盘…</p>}><InquiryPanel key={inquiryId} id={inquiryId} inline={view==='inquiries'} onClose={()=>setInquiryId('')} onChanged={()=>setRefresh(n=>n+1)} onVisitor={id=>{if(panelOrigin==='visitors'&&visitorId===id){setInquiryId('');return;}if(panelOrigin!=='inquiries')setInquiryId('');setVisitorId(id);navigate('visitors',{from:detailScope?.from||'',to:detailScope?.to||'',traffic:detailScope?.traffic??'all',mode:'people'});}}/></Suspense>:null;
  return <div className="adm-app"><aside className="adm-sidebar"><a className="adm-brand" href="/"><img src="/images/brand/keeyak-wordmark.png" alt="KEEYAK" width={148} height={27}/></a><nav aria-label="后台导航">{navigation.map(({key,label,Icon,load})=><button key={key} aria-current={view===key?'page':undefined} onPointerEnter={()=>void load()} onFocus={()=>void load()} onClick={()=>navigate(key)}><Icon size={19}/>{label}</button>)}</nav><div className="adm-sidebar-bottom"><span className="adm-environment">{session.local?'本地数据':'网站数据'}</span><small className="adm-account">{session.user}</small><a href="/" target="_blank" rel="noreferrer"><ExternalLink size={17}/>查看网站</a><button onClick={()=>void signOut()}><LogOut size={17}/>退出登录</button></div></aside><main className="adm-main">{error&&<p className="adm-error" role="alert">{error}</p>}{trail.length>0&&<button className="adm-text adm-back" onClick={()=>navigate(trail[trail.length-1],undefined,true)}><ArrowLeft size={15}/>返回{navigation.find(item=>item.key===trail[trail.length-1])?.label}</button>}
  {visited.map(key=><section className="adm-view" key={key} hidden={view!==key} aria-label={navigation.find(item=>item.key===key)?.label}><Suspense fallback={<p className="adm-loading" role="status">正在加载…</p>}>{key==='inquiries'?<InquiryList key={revisions.inquiries} options={options} onOpen={openInquiry} refresh={viewRefresh.current[key]} selected={inquiryId} detail={view===key?panel:null} initial={scopes.inquiries}/>:key==='insights'?<Insights options={options} refresh={viewRefresh.current[key]} onInquiry={openInquiry} onVisits={filters=>{setVisitorId('');navigate('visitors',{...filters,mode:filters.mode||'pages'});}} onQueue={filters=>{setInquiryId('');navigate('inquiries',filters);}} onVisitor={(id,filters)=>{setVisitorId(id);navigate('visitors',{...filters,mode:'people'});}}/>:<Visitors key={revisions.visitors} initial={scopes.visitors} options={options} selected={view===key?visitorId:''} onSelect={setVisitorId} onInquiry={openInquiry}/>}</Suspense></section>)}
  </main>{view!=='inquiries'&&panel}</div>;
}
