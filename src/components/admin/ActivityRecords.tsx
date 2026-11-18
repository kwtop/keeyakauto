import {useEffect,useState} from 'react';
import {Clock3,Globe2,MapPin,MousePointerClick} from 'lucide-react';
import {api,countryName,formatTime,known,query,type Filters} from './api';
import type {Activity,PageResult} from './types';
import {Empty,Pagination} from './Controls';
import ActivityIcon from './ActivityIcon';
export const activityTypes=[['','全部'],['inquiry_saved','询盘提交'],['contacts','联系点击'],['whatsapp_click','WhatsApp 点击'],['email_click','邮箱点击']] as const;
const locations:Record<string,string>={header:'页头',footer:'页脚',hero:'首屏',product_gallery:'产品图库',specifications:'参数区',quote_form:'询盘表单',main:'正文',contact:'联系页',unknown:'未知'};
export default function ActivityRecords({filters,type,onType,onInquiry,onVisitor}:{filters:Filters;type:string;onType:(type:string)=>void;onInquiry:(id:string)=>void;onVisitor:(id:string)=>void}){
  const [page,setPage]=useState(1),[data,setData]=useState<PageResult<Activity>|null>(null),[error,setError]=useState('');
  const encoded=query({...filters,event:type,page:String(page)});
  useEffect(()=>{let active=true;const controller=new AbortController();setData(null);setError('');api<PageResult<Activity>>('activity?'+encoded,{signal:controller.signal}).then(result=>{if(active)setData(result);}).catch(e=>{if(active)setError(e.message);});return()=>{active=false;controller.abort();};},[encoded]);
  return <section className="adm-activity" aria-labelledby="activity-title">
    <div className="adm-section-heading"><h2 id="activity-title"><MousePointerClick size={19} aria-hidden="true"/>询盘与联系记录</h2></div>
    <div className="adm-activity-types" role="group" aria-label="记录类型">{activityTypes.map(([key,label])=><button key={key} type="button" aria-pressed={type===key} onClick={()=>onType(key)}>{key&&<ActivityIcon name={key} size={16}/>}{label}</button>)}</div>
    {error?<p className="adm-error" role="alert">{error}</p>:<div className="adm-table-wrap" aria-busy={!data}><table className="adm-table adm-activity-table"><thead><tr><th><Clock3 size={14} aria-hidden="true"/>记录时间</th><th>行为</th><th>页面 / 位置</th><th><Globe2 size={14} aria-hidden="true"/>来源 / 国家</th><th>关联记录</th></tr></thead><tbody>{data?.rows.map(row=><tr key={row.id}>
      <td><time dateTime={new Date(row.created_at).toISOString()}>{formatTime(row.created_at)}</time>{row.is_test===1&&<small className="adm-test">内部测试</small>}</td>
      <td><span className="adm-event-label"><ActivityIcon name={row.name}/>{activityTypes.find(([key])=>key===row.name)?.[1]||row.name}</span></td>
      <td><a href={row.page} target="_blank" rel="noreferrer">{row.page}</a><small className="adm-cell-icon"><MapPin size={12} aria-hidden="true"/>{locations[row.position]||'未知'}</small></td>
      <td>{known(row.source)}<small>{countryName(row.country)}</small></td>
      <td>{row.inquiry_id&&<button className="adm-text" onClick={()=>onInquiry(row.inquiry_id!)}>查看询盘</button>}{row.visitor_id&&<button className="adm-text" onClick={()=>onVisitor(row.visitor_id!)}>访客 {row.visitor_id.slice(0,8)}</button>}{!row.inquiry_id&&!row.visitor_id&&<span className="adm-muted">未关联访客</span>}</td>
    </tr>)}</tbody></table>{!data&&<p className="adm-loading" role="status">正在读取记录…</p>}{data&&!data.rows.length&&<Empty text="所选时间暂无记录"/>}</div>}
    {data&&<Pagination total={data.total} page={data.page} size={data.pageSize} onPage={setPage}/>}
    <p className="adm-record-note">联系点击表示打开联系入口。成功询盘以服务端入库为准，点击不等于客户已发送消息。</p>
  </section>;
}
