import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import {ChartNoAxesCombined,ChevronDown,Eye,Inbox,MessageCircle,Users} from 'lucide-react';
import {api,formatTime,query,presetDates,today,type Filters,type Options} from './api';
import type {Insights as Data} from './types';
import {DateToolbar,Empty,FiltersBar} from './Controls';
import TrafficSummary from './TrafficSummary';
const Chart=lazy(()=>import('./TrendChart')),ActivityRecords=lazy(()=>import('./ActivityRecords')),Breakdowns=lazy(()=>import('./Breakdowns'));
const metrics={visitors:'去重访客（已授权）',pageviews:'页面浏览',contacts:'联系点击',inquiries:'询盘提交',whatsapp_clicks:'WhatsApp 点击',email_clicks:'邮箱点击',visits:'会话次数（已授权）'};
export default function Insights({options,onInquiry,onVisitor,onQueue,onVisits,refresh}:{options:Options|null;refresh:number;onInquiry:(id:string,filters:Filters)=>void;onVisitor:(id:string,filters:Filters)=>void;onQueue:(filters:Filters)=>void;onVisits:(filters:Filters)=>void}){
 const [filters,setFilters]=useState<Filters>(()=>({...presetDates('today'),traffic:'all'})),[applied,setApplied]=useState(filters),[data,setData]=useState<Data|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(false),[metric,setMetric]=useState('visitors'),[activityType,setActivityType]=useState(''),[reload,setReload]=useState(0),[distributions,setDistributions]=useState(false),[showActivity,setShowActivity]=useState(false);
 const activity=useRef<HTMLDetailsElement>(null);
 const encoded=query(applied),apply=(next:Filters)=>{setFilters(next);setApplied(next);};
 useEffect(()=>{
   let active=true;const controller=new AbortController();setBusy(true);setError('');setData(null);
   api<Data>('insights?'+encoded+'&compact=1',{signal:controller.signal}).then(result=>{if(active)setData(result);}).catch(e=>{if(active)setError(e.message);}).finally(()=>{if(active)setBusy(false);});
   return()=>{active=false;controller.abort();};
 },[encoded,reload,refresh]);
 const count=(key:string)=>data?.current[key]?.toLocaleString()??'—';
 const queueCount=(key:string)=>data?.queue.counts[key]?.toLocaleString()??'—';
 const queueScope=(status='',read='')=>({scope:'queue',traffic:applied.traffic||'',status,read,page:'1'});
 const contactDetails=()=>{setMetric('contacts');setActivityType('contacts');setShowActivity(true);requestAnimationFrame(()=>activity.current?.scrollIntoView({block:'start',behavior:'instant'}));};
 const cards=[
   {key:'visitors',label:'去重访客',Icon:Users,note:'仅含已授权浏览器',open:()=>onVisits({...applied,mode:'people',page:'1'})},
   {key:'pageviews',label:'页面浏览',Icon:Eye,note:`匿名浏览 ${count('anonymous_pageviews')}`,open:()=>onVisits({...applied,mode:'pages',page:'1'})},
   {key:'contacts',label:'联系点击',Icon:MessageCircle,note:`WhatsApp ${count('whatsapp_clicks')} · 邮箱 ${count('email_clicks')}`,open:contactDetails},
   {key:'inquiries',label:'询盘提交',Icon:Inbox,note:`上期 ${data?.previous.inquiries.toLocaleString()??'—'}`,open:()=>onQueue({...applied,visitCountry:applied.country||'',country:'',scope:'',status:'',read:'',validOnly:'1',page:'1'})}
 ];
 return <>
 <div className="adm-title"><div className="adm-heading-copy"><h1>数据总览</h1><p>{applied.from===applied.to?applied.from:`${applied.from} — ${applied.to}`}<span>北京时间 · {applied.traffic==='all'?'包含内部测试':'已排除内部测试'}</span></p></div><div className="adm-page-tools"><DateToolbar value={applied} onApply={apply} busy={busy} onRefresh={()=>setReload(n=>n+1)}/><FiltersBar value={filters} onChange={setFilters} onApply={apply} options={options} analytics/></div></div>
 {error&&<p className="adm-error" role="alert">{error}</p>}
 <section className="adm-summary-strip adm-summary-four" aria-label="关键数据" aria-busy={busy}>{cards.map(({key,label,Icon,note,open})=><button key={key} className="adm-summary-card" onClick={open} aria-label={`查看${label}明细`}><span><Icon size={18}/>{label}</span><strong>{count(key)}</strong><small>{note}</small></button>)}</section>
 <div className="adm-overview-middle"><section className="adm-trends adm-panel"><div className="adm-section-heading"><h2><ChartNoAxesCombined size={18}/>访问趋势</h2><select aria-label="趋势指标" value={metric} onChange={e=>setMetric(e.target.value)}>{Object.entries(metrics).map(([key,label])=><option value={key} key={key}>{label}</option>)}</select></div><div className="adm-trend-context"><span>{data?.granularity==='hour'?'24 小时对比':'每日对比'}</span><div className="adm-chart-legend"><span><i/>{applied.from===applied.to?applied.from:'本期'}</span><span><i/>{data?.granularity==='hour'?formatTime(data.range.previousStart).slice(0,10):'上期'}</span></div></div>{data?<Suspense fallback={<p className="adm-loading">正在加载图表…</p>}><Chart data={data.trend} metric={metric} hourly={data.granularity==='hour'} observedAt={data.observedAt}/></Suspense>:<div className="adm-chart adm-loading" role="status">正在读取趋势…</div>}<p className="adm-chart-note">{data?`更新于 ${formatTime(data.observedAt)}`:'正在读取…'} · 去重访客仅统计已授权明细的浏览器</p></section>
 <section className="adm-work-queue adm-panel"><div className="adm-section-heading"><h2><Inbox size={18}/>询盘待办<small>全部日期</small></h2><button className="adm-text" onClick={()=>onQueue(queueScope())}>查看全部</button></div><div className="adm-queue-counts"><button onClick={()=>onQueue(queueScope('pending'))}><strong>{queueCount('pending')}</strong><span>待处理</span></button><button onClick={()=>onQueue(queueScope('following'))}><strong>{queueCount('following')}</strong><span>跟进中</span></button><button onClick={()=>onQueue(queueScope('','0'))}><strong>{queueCount('unread')}</strong><span>未读</span></button></div><div className="adm-queue-list">{data?.queue.items.map(item=><button key={item.id} onClick={()=>onInquiry(item.id,{...queueScope(),from:today(item.created_at),to:today(item.created_at)})}><strong>{item.name||item.company||'未填写姓名'}<small>{item.country}</small></strong><span>{item.vehicles.map(v=>`${v.model} · ${v.quantity} 辆`).join('、')||'查看采购需求'}</span><time>{formatTime(item.created_at)}{item.is_test===1&&' · 内部测试'}</time></button>)}{data&&!data.queue.items.length&&<Empty text="暂无待跟进询盘"/>}</div></section></div>
 {data&&<TrafficSummary daily={data.daily} pages={data.breakdowns.page||[]} onVisits={path=>onVisits({...applied,mode:'pages',visitPath:path||'',page:'1'})} onDay={date=>onVisits({...applied,from:date,to:date,mode:'people',page:'1'})}/>}
 <details ref={activity} className="adm-breakdown-disclosure adm-activity-disclosure" open={showActivity} onToggle={event=>setShowActivity(event.currentTarget.open)}><summary>询盘与联系明细<ChevronDown size={16}/></summary>{showActivity&&<Suspense fallback={<p className="adm-loading">正在读取联系记录…</p>}><ActivityRecords key={encoded+'|'+activityType+'|'+reload+'|'+refresh} filters={applied} type={activityType} onType={setActivityType} onInquiry={id=>onInquiry(id,applied)} onVisitor={id=>onVisitor(id,applied)}/></Suspense>}</details>
 <details className="adm-breakdown-disclosure" onToggle={event=>setDistributions(event.currentTarget.open)}><summary>来源与访问分布<ChevronDown size={16}/></summary>{distributions&&<Suspense fallback={<p className="adm-loading">正在读取分布…</p>}><Breakdowns filters={applied} refresh={reload+refresh}/></Suspense>}</details>
 <details className="adm-definitions"><summary>统计口径</summary><p>页面浏览和联系点击默认计数。只有主动允许明细统计的浏览器才有编号并计入去重访客和会话数。所选范围内，同一编号计为 1 人；更换浏览器或清除标识可能产生新编号。匿名浏览不能还原为具体访客；每日或每小时的访客人数不可相加。</p><p>今日图表显示 00–23 时，对比昨日完整 24 小时；当前时段为已发生记录，未来时段留空。多日按每日展示，对比上一等长周期。</p><p>询盘以服务端保存成功为准，排除垃圾询盘。联系点击不代表消息发送或送达。已关闭统计或启用浏览器隐私信号的访问不计入；成功保存的询盘仍计入。默认包含内部测试，可在筛选中关闭。待办不受日期筛选影响。</p></details>
 </>;
}
