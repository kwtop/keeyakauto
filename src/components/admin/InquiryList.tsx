import {useEffect,useState,type ReactNode} from 'react';
import {Download,Inbox,RefreshCw,Search} from 'lucide-react';
import {statuses} from '../../data/measurement';
import {api,formatTime,known,presetDates,query,today,type Filters,type Options} from './api';
import type {InquiryPreview as Inquiry,PageResult} from './types';
import {DateToolbar,Empty,FiltersBar,Pagination} from './Controls';

interface Props{options:Options|null;onOpen:(id:string,filters:Filters)=>void;refresh:number;selected:string;detail:ReactNode;initial?:Filters;}

export default function InquiryList({options,onOpen,refresh,selected,detail,initial}:Props){
  const [filters,setFilters]=useState<Filters>(()=>({...presetDates('today'),traffic:'all',...(initial||{scope:'queue'})}));
  const [applied,setApplied]=useState(filters);
  const [data,setData]=useState<PageResult<Inquiry>|null>(null);
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const [download,setDownload]=useState(false);
  const [reload,setReload]=useState(0);
  const isQueue=applied.scope==='queue';
  const encoded=query(applied);
  const apply=(next:Filters)=>{setFilters(next);setApplied(next);};

  useEffect(()=>{
    let active=true;
    setBusy(true);setError('');setData(null);
    const controller=new AbortController();
    api<PageResult<Inquiry>>('inquiries?'+encoded+'&compact=1',{signal:controller.signal})
      .then(result=>{if(active)setData(result);})
      .catch(e=>{if(active)setError(e.message);})
      .finally(()=>{if(active)setBusy(false);});
    return()=>{active=false;controller.abort();};
  },[encoded,refresh,reload]);

  async function exportRows(){
    setDownload(true);setError('');
    try{
      const response=await fetch('/api/admin/export/?'+encoded,{credentials:'same-origin',cache:'no-store'});
      if(response.status===401)window.dispatchEvent(new Event('keeyak:admin-expired'));
      if(!response.ok){const result=await response.json();throw Error(result.error||'导出失败。');}
      const url=URL.createObjectURL(await response.blob());
      const link=document.createElement('a');
      link.href=url;link.download='keeyak-inquiries.csv';link.click();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
    }catch(e){setError((e as Error).message);}
    finally{setDownload(false);}
  }

  const open=(row:Inquiry)=>{
    const date=today(row.created_at);
    onOpen(row.id,isQueue?{...applied,from:date,to:date}:applied);
  };
  const changeScope=(scope:string)=>apply({...applied,scope,status:'',read:'',validOnly:'',page:'1'});
  const entries=Object.entries(statuses).filter(([key])=>!isQueue||key==='pending'||key==='following');
  const tabs=[['','全部','all_count'],...entries.map(([key,label])=>[key,label,key])];
  const modelName=(row:Inquiry)=>row.vehicles.map(vehicle=>vehicle.model).join('、')||'查看需求';
  const modelSpec=(row:Inquiry)=>row.vehicles.map(vehicle=>vehicle.quantity+' 辆'+(vehicle.variant?' · '+vehicle.variant:'')).join('、');
  const dateLabel=isQueue?'全部日期':applied.from+(applied.from===applied.to?'':' — '+applied.to);

  return <>
    <div className="adm-title">
      <div className="adm-heading-copy"><h1>询盘管理</h1><p>{dateLabel}<span>北京时间 · {applied.traffic==='all'?'包含内部测试':'已排除内部测试'}</span></p></div>
      <div className="adm-page-tools">
        {isQueue?<button type="button" className="adm-icon" aria-label="刷新数据" disabled={busy} onClick={()=>setReload(n=>n+1)}><RefreshCw size={17}/></button>:<DateToolbar value={applied} onApply={apply} busy={busy} onRefresh={()=>setReload(n=>n+1)}/>}
        <button type="button" disabled={download} onClick={()=>void exportRows()}><Download size={16}/>{download?'导出中…':'导出 CSV'}</button>
      </div>
    </div>
    <nav className="adm-tabs adm-visit-modes" aria-label="询盘视图">
      <button type="button" aria-current={isQueue?'page':undefined} onClick={()=>changeScope('queue')}>待跟进</button>
      <button type="button" aria-current={!isQueue?'page':undefined} onClick={()=>changeScope('')}>全部询盘</button>
    </nav>
    <div className="adm-list-toolbar adm-inquiry-toolbar">
      <nav className="adm-tabs" aria-label="询盘状态">
        {tabs.map(([key,label,count])=><button type="button" key={key} aria-current={(applied.status||'')===key?'page':undefined} onClick={()=>apply({...applied,status:key,validOnly:key==='spam'?'':applied.validOnly||'',page:'1'})}>{label}<span>{data?.counts?.[count]??'—'}</span></button>)}
      </nav>
      <button type="button" className="adm-unread-filter" aria-pressed={applied.read==='0'} onClick={()=>apply({...applied,read:applied.read==='0'?'':'0',page:'1'})}>仅未读{data?.counts?.unread!==undefined&&<span>{data.counts.unread}</span>}</button>
      {applied.validOnly==='1'&&<button type="button" className="adm-text" onClick={()=>apply({...applied,validOnly:'',page:'1'})}>有效询盘 ×</button>}
      <form className="adm-inline-search" onSubmit={e=>{e.preventDefault();apply({...filters,page:'1'});}}>
        <Search size={16}/><input aria-label="搜索客户或采购需求" placeholder="搜索客户或采购需求" value={filters.q||''} maxLength={100} onChange={e=>setFilters({...filters,q:e.target.value})}/>
        <button type="submit" className="adm-sr">搜索</button>
      </form>
      <FiltersBar value={filters} onChange={setFilters} onApply={apply} options={options}/>
    </div>
    {error&&<p className="adm-error" role="alert">{error}</p>}
    <div className="adm-master-detail">
      <section className="adm-list-panel adm-panel" aria-label={isQueue?'待跟进询盘':'询盘列表'} aria-busy={busy}>
        <div className="adm-table-wrap adm-desktop-table">
          <table className="adm-table adm-inquiry-table">
            <thead><tr><th>客户 / 提交时间</th><th>采购需求</th><th>目的国家</th><th>状态</th><th>来源</th></tr></thead>
            <tbody>{data?.rows.map(row=><tr key={row.id} className={(selected===row.id?'adm-selected-row ':'')+(row.is_read?'':'adm-unread')}>
              <td><button className="adm-row-link" aria-pressed={selected===row.id} onClick={()=>open(row)}>{!row.is_read&&<i className="adm-unread-dot"/>}{row.name||'未填写姓名'}</button>
                <small>{row.company||row.email||row.phone||'未填写公司'}</small><time>{formatTime(row.created_at)}</time>{row.is_test===1&&<small className="adm-test">内部测试</small>}
              </td>
              <td><button className="adm-row-link" onClick={()=>open(row)}>{modelName(row)}</button><small>{modelSpec(row)}</small></td>
              <td>{row.country||'未知'}</td><td><span className={'adm-status adm-status--'+row.status}>{statuses[row.status]}</span></td><td>{known(row.source)}</td>
            </tr>)}</tbody>
          </table>
        </div>
        {!!data?.rows.length&&<ul className="adm-mobile-records">{data.rows.map(row=><li key={row.id}>
          <button type="button" className="adm-mobile-record" aria-pressed={selected===row.id} onClick={()=>open(row)}>
            <span className="adm-mobile-record-top"><strong>{!row.is_read&&<i className="adm-unread-dot"/>}{row.name||'未填写姓名'}</strong><span className={'adm-status adm-status--'+row.status}>{statuses[row.status]}</span></span>
            <span>{modelName(row)}{modelSpec(row)&&<small>{modelSpec(row)}</small>}</span>
            <small>{row.country||'未知'} · <time>{formatTime(row.created_at)}</time>{row.is_test===1&&' · 内部测试'}</small>
          </button>
        </li>)}</ul>}
        {data&&!data.rows.length&&<Empty text={isQueue?'暂无符合筛选条件的待跟进询盘':'所选时间暂无询盘'}/>}
        {busy&&!data&&<p className="adm-loading" role="status">正在读取询盘…</p>}
        {data&&<Pagination total={data.total} page={data.page} size={data.pageSize} onPage={page=>apply({...applied,page:String(page)})}/>}
      </section>
      {detail||<aside className="adm-detail-placeholder adm-panel"><Inbox size={30} strokeWidth={1.4}/><h2>选择一条询盘</h2></aside>}
    </div>
  </>;
}

