import {useEffect,useRef,useState} from 'react';
import {Eye,Globe2,Inbox,Mail,MessageCircle,Phone,Users} from 'lucide-react';
import {eventLabels,statuses} from '../../data/measurement';
import {api,countryName,formatTime,known,pageName,query,today,type Filters} from './api';
import ActivityIcon from './ActivityIcon';
import {DetailPanel,Empty} from './Controls';
import type {TimelineEvent,VisitorDetail} from './types';
const locations:Record<string,string>={header:'页头',footer:'页脚',hero:'首屏',product_gallery:'产品图库',specifications:'参数区',quote_form:'询盘表单',main:'正文',contact:'联系页',unknown:'未知'};
export default function VisitorPanel({id,filters,refresh,onClose,onInquiry}:{id:string;filters:Filters;refresh:number;onClose:()=>void;onInquiry:(id:string,filters:Filters)=>void}){
 const [data,setData]=useState<VisitorDetail|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(false),[allHistory,setAllHistory]=useState(false);
 const generation=useRef(0);
 const scope=query(allHistory?{traffic:filters.traffic}:{from:filters.from,to:filters.to,traffic:filters.traffic});
 useEffect(()=>{
   const controller=new AbortController();generation.current++;setBusy(false);setData(null);setError('');
   api<VisitorDetail>('visitors/'+id+'?'+scope,{signal:controller.signal}).then(setData).catch(error=>{if(!controller.signal.aborted)setError(error.message);});
   return()=>{generation.current++;controller.abort();};
 },[id,scope,refresh]);
 async function older(){
   if(!data?.nextBefore||busy)return;const version=generation.current;setBusy(true);setError('');
   try{const next=await api<VisitorDetail>('visitors/'+id+'?'+scope+'&before='+encodeURIComponent(data.nextBefore));if(version===generation.current)setData(previous=>previous?{...next,events:[...previous.events,...next.events]}:next);}catch(error){if(version===generation.current)setError((error as Error).message);}finally{if(version===generation.current)setBusy(false);}
 }
 const groups=new Map<string,TimelineEvent[]>();
 data?.events.forEach(event=>{const key=event.session_id||'unassigned';if(!groups.has(key))groups.set(key,[]);groups.get(key)!.push(event);});
 const openInquiry=(inquiryId:string,createdAt?:number)=>onInquiry(inquiryId,createdAt?{...filters,from:today(createdAt),to:today(createdAt)}:filters);
 return <DetailPanel title="访客详情" id="adm-visitor-title" inline onClose={onClose}>
 <div className="adm-visitor-identity"><span className="adm-visitor-avatar"><Users size={20}/></span><div><h3>{data?.customer?.name||data?.customer?.company||'访客 '+id.slice(0,8)}</h3><small>{data?.events[0]?`${countryName(data.events[0].country)} · ${known(data.events[0].source)}`:id.slice(0,8)}</small></div></div>
 <div className="adm-history-scope"><span>{allHistory?'完整历史':filters.from===filters.to?filters.from:`${filters.from} — ${filters.to}`}</span><button className="adm-text" type="button" onClick={()=>setAllHistory(value=>!value)}>{allHistory?'返回所选日期':'查看完整历史'}</button></div>
 {error&&<p className="adm-error" role="alert">{error}</p>}
 {data?<>
 {data.customer&&<div className="adm-visitor-contact">{data.customer.company&&data.customer.company!==data.customer.name&&<p>{data.customer.company}</p>}{data.customer.email&&<a href={'mailto:'+data.customer.email}><Mail size={14}/>{data.customer.email}</a>}{data.customer.phone&&<a href={'tel:'+data.customer.phone}><Phone size={14}/>{data.customer.phone}</a>}</div>}
 <div className="adm-detail-stats adm-detail-stats-four"><div><Globe2 size={15}/><strong>{data.summary.visits||0}</strong><span>访问</span></div><div><Eye size={15}/><strong>{data.summary.pageviews||0}</strong><span>浏览</span></div><div><MessageCircle size={15}/><strong>{(data.summary.whatsapp_clicks||0)+(data.summary.email_clicks||0)}</strong><span>联系</span></div><div><Inbox size={15}/><strong>{data.inquiries.length}</strong><span>询盘</span></div></div>
 <div className="adm-associated"><h3>关联询盘</h3>{data.inquiries.length?data.inquiries.map(item=><button key={item.id} onClick={()=>openInquiry(item.id,item.created_at)}><Inbox size={15}/><span>{item.name||item.company||'未填写姓名'}<small>{formatTime(item.created_at)} · {statuses[item.status]}</small></span></button>):<p className="adm-muted">此范围暂无关联询盘</p>}</div>
 <section className="adm-journey"><h3>访问过程</h3>{[...groups].map(([sessionId,events],index)=>{
  const session=data.sessions.find(item=>item.session_id===sessionId),first=events[events.length-1];
  return <details className="adm-visit-session" key={sessionId} open={index===0?true:undefined}><summary><Globe2 size={15}/><span>{formatTime(session?.started_at||session?.first_at||first.created_at)}<small>{sessionId==='unassigned'?'未关联会话':`${session?.pageviews??events.filter(item=>item.name==='page_view').length} 页 · ${session?.events??events.length} 个行为`}</small></span></summary><ol className="adm-timeline">{events.map(event=><li key={event.id}><ActivityIcon name={event.name} size={17}/><div><strong>{eventLabels[event.name]||event.name}</strong><time>{formatTime(event.created_at)}</time><a href={event.page} target="_blank" rel="noreferrer">{pageName(event.page)}</a><small>{locations[event.position]||'未知位置'}{event.failure_code&&` · ${event.failure_code}`}{event.is_test===1&&' · 内部测试'}</small>{event.inquiry_id&&<button className="adm-text" onClick={()=>openInquiry(event.inquiry_id!,event.created_at)}>查看已保存询盘</button>}</div></li>)}</ol></details>;
 })}{!data.events.length&&<Empty text="此范围暂无行为记录"/>}{data.hasMore&&<button disabled={busy} onClick={()=>void older()}>{busy?'加载中…':'加载更早记录'}</button>}</section>
 <details className="adm-subdetails"><summary>访客编号与首次访问</summary><code>{id}</code><p className="adm-muted">首次记录 {formatTime(data.visitor.first_seen)}</p></details>
 </>:!error&&<p className="adm-loading" role="status">正在读取访问过程…</p>}
 </DetailPanel>;
}
