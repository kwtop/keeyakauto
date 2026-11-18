import {useEffect,useRef,useState} from 'react';
import {ClipboardList,Mail,MapPin,MessageCircle,Phone,Plus} from 'lucide-react';
import {statuses,type InquiryStatus} from '../../data/measurement';
import {api,formatTime,known,countryName} from './api';
import type {InquiryDetail} from './types';
import {DetailPanel} from './Controls';
export default function InquiryPanel({id,onClose,onChanged,onVisitor,inline=false}:{inline?:boolean;id:string;onClose:()=>void;onChanged:()=>void;onVisitor:(id:string)=>void}){
  const [data,setData]=useState<InquiryDetail|null>(null),[error,setError]=useState(''),[note,setNote]=useState(''),[busy,setBusy]=useState(false),noteId=useRef('');
  useEffect(()=>{
    let active=true;
    (async()=>{try{let result=await api<InquiryDetail>('inquiries/'+id);if(!result.inquiry.is_read){result=await api<InquiryDetail>('inquiries/'+id,{method:'PATCH',body:JSON.stringify({is_read:true,version:result.inquiry.version})});onChanged();}if(active)setData(result);}catch(e){if(active)setError((e as Error).message);}})();
    return()=>{active=false;};
  },[id]);
  async function update(value:{status?:InquiryStatus;is_read?:boolean}){
    if(!data||busy)return;setBusy(true);setError('');
    try{setData(await api<InquiryDetail>('inquiries/'+id,{method:'PATCH',body:JSON.stringify({...value,version:data.inquiry.version})}));onChanged();}catch(e){setError((e as Error).message);}finally{setBusy(false);}
  }
  async function saveNote(){
    if(!note.trim()||busy)return;setBusy(true);setError('');if(!noteId.current)noteId.current=crypto.randomUUID();
    try{setData(await api<InquiryDetail>('inquiries/'+id+'/notes',{method:'POST',body:JSON.stringify({note,id:noteId.current})}));setNote('');noteId.current='';}catch(e){setError((e as Error).message);}finally{setBusy(false);}
  }
  const item=data?.inquiry,phone=item?.phone.replace(/[\s()-]/g,'')||'',whatsapp=/^\+[1-9]\d{6,14}$/.test(phone)?phone.slice(1):'';
  return <DetailPanel title="询盘详情" id="adm-inquiry-title" inline={inline} onClose={onClose}>
    {error&&<p className="adm-error" role="alert">{error}</p>}
    {!item?<p className="adm-loading" role="status">正在读取…</p>:<>
      <div className="adm-detail-meta"><time>{formatTime(item.created_at)}</time></div>
      <div className="adm-inquiry-followup">
      <section className="adm-customer"><h3>{item.name||'未填写姓名'}</h3>{item.company&&<p>{item.company}</p>}{item.email&&<a href={'mailto:'+item.email}><Mail size={15}/>{item.email}</a>}{item.phone&&<a href={'tel:'+item.phone}><Phone size={15}/>{item.phone}</a>}{whatsapp&&<a className="adm-contact-action" href={'https://wa.me/'+whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16}/>通过 WhatsApp 联系</a>}</section>
      <div className="adm-inquiry-brief">{item.draft.vehicles.map((vehicle,index)=><p key={index}><ClipboardList size={14}/>{vehicle.model} · {vehicle.quantity} 辆</p>)}<p><MapPin size={14}/>{item.country||'目的国家未填写'}{item.is_test===1&&<span className="adm-test">内部测试</span>}</p></div>
      <div className="adm-detail-actions"><label>跟进状态<select aria-label="跟进状态" value={item.status} disabled={busy} onChange={e=>void update({status:e.target.value as InquiryStatus})}>{Object.entries(statuses).map(([key,label])=><option value={key} key={key}>{label}</option>)}</select></label><button disabled={busy} onClick={()=>void update({is_read:!item.is_read})}>{item.is_read?'标记未读':'标记已读'}</button></div>
      <section className="adm-notes"><h3>跟进备注</h3><label className="adm-sr" htmlFor="adm-note">新备注</label><textarea id="adm-note" placeholder="记录沟通结果和下一步安排" rows={3} maxLength={4000} value={note} onChange={e=>{setNote(e.target.value);noteId.current='';}}/><button className="adm-primary" disabled={!note.trim()||busy} onClick={()=>void saveNote()}><Plus size={15}/>添加备注</button><ol>{data.notes.map(n=><li key={n.id}><p>{n.note}</p><small>{formatTime(n.created_at)} · {n.author}</small></li>)}</ol></section>
      </div>
      <section className="adm-request-section"><h3><ClipboardList size={16}/>采购需求</h3><div className="adm-vehicle-requests">{item.draft.vehicles.map((v,i)=><article key={i}><strong>{v.model}</strong><span>{v.kind==='new'?'新车':'二手车'} · {v.quantity} 辆{v.brand&&` · ${v.brand}`}</span>{v.variant&&<p>{v.variant}</p>}</article>)}</div><p className="adm-destination"><MapPin size={15}/>{item.country||'目的国家未填写'}</p><details className="adm-subdetails"><summary>完整提交内容</summary><pre>{item.requirements}</pre></details></section>
      <details className="adm-subdetails"><summary>提交与来源信息</summary><dl className="adm-facts">{[['编号',id],['提交页面',item.page],['网站语言',known(item.language)],['访问来源',known(item.source)],['来源域名',known(item.referrer_host)],['访问国家',countryName(item.visit_country)],['数据类型',item.is_test?'内部测试':'客户提交']].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value||'未知'}</dd></div>)}</dl></details>
      {item.visitor_id?<button className="adm-text" onClick={()=>onVisitor(item.visitor_id!)}>查看关联访问记录</button>:<p className="adm-muted">此询盘未关联浏览器记录</p>}
    </>}
  </DetailPanel>;
}
