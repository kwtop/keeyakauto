import {useEffect,useState} from 'react';
import {api,countryName,formatTime,known,pageName,query,type Filters} from './api';
import {Empty,Pagination} from './Controls';
import type {Activity,PageResult} from './types';

export default function PageVisits({filters,refresh,selected,onSelect,onPage}:{
  filters:Filters;refresh:number;selected:string;onSelect:(id:string)=>void;onPage:(page:number)=>void;
}){
  const [data,setData]=useState<PageResult<Activity>|null>(null);
  const [error,setError]=useState('');
  const request=query({...filters,event:'page_view'});

  useEffect(()=>{
    let active=true;const controller=new AbortController();
    setData(null);
    setError('');
    api<PageResult<Activity>>('activity?'+request,{signal:controller.signal})
      .then(result=>{if(active)setData(result);})
      .catch((error:Error)=>{if(active)setError(error.message);});
    return ()=>{active=false;controller.abort();};
  },[request,refresh]);

  return <section className="adm-list-panel adm-panel" aria-label="全部页面访问">
    {error?<p className="adm-error" role="alert">{error}</p>:<>
      <div className="adm-table-wrap adm-desktop-table" aria-busy={!data}>
        <table className="adm-table adm-page-visits-table">
          <thead><tr><th aria-sort="descending">访问时间</th><th>访问页面</th><th>访问国家 / 来源</th><th>访客</th></tr></thead>
          <tbody>{data?.rows.map(row=><tr key={row.id} className={row.visitor_id&&selected===row.visitor_id?'adm-selected-row':''}>
            <td><time dateTime={new Date(row.created_at).toISOString()}>{formatTime(row.created_at)}</time>
              {row.is_test===1&&<small className="adm-test">内部测试</small>}
            </td>
            <td><a href={row.page} target="_blank" rel="noreferrer">{pageName(row.page)}</a>{pageName(row.page)!==row.page&&<small>{row.page}</small>}</td>
            <td>{countryName(row.country)}<small>{known(row.source)}</small></td>
            <td>{row.visitor_id?<button className="adm-text" type="button" onClick={()=>onSelect(row.visitor_id!)}>{row.visitor_id.slice(0,8)}</button>:<span className="adm-muted">匿名</span>}</td>
          </tr>)}</tbody>
        </table>
      </div>
      {!!data?.rows.length&&<ul className="adm-mobile-records">{data.rows.map(row=><li key={row.id} className="adm-mobile-record">
        <div className="adm-mobile-record-top">
          <a href={row.page} target="_blank" rel="noreferrer">{pageName(row.page)}</a>
          <time dateTime={new Date(row.created_at).toISOString()}>{formatTime(row.created_at)}</time>
        </div>
        {pageName(row.page)!==row.page&&<small>{row.page}</small>}
        <div className="adm-mobile-record-meta">
          <span>{countryName(row.country)}{row.source&&row.source!=='unknown'&&' · '+known(row.source)}{row.is_test===1&&' · 内部测试'}</span>
          {row.visitor_id?<button type="button" className="adm-text" aria-pressed={selected===row.visitor_id} onClick={()=>onSelect(row.visitor_id!)}>{row.visitor_id.slice(0,8)}</button>:<span>匿名</span>}
        </div>
      </li>)}</ul>}
      {!data&&<p className="adm-loading" role="status">正在读取访问记录…</p>}
      {data&&!data.rows.length&&<Empty text="暂无符合筛选条件的页面访问"/>}
      {data&&<Pagination total={data.total} page={data.page} size={data.pageSize} onPage={onPage}/>}
    </>}
  </section>;
}
