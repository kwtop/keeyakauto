import {useEffect,useState} from 'react';
import {Globe2} from 'lucide-react';
import {api,countryName,known,productName,query,type Filters} from './api';
import {Empty} from './Controls';
import type {Insights} from './types';
const devices:Record<string,string>={mobile:'手机',desktop:'电脑',tablet:'平板',unknown:'未知'};
export default function Breakdowns({filters,refresh}:{filters:Filters;refresh:number}){
 const [data,setData]=useState<Insights['breakdowns']|null>(null),[error,setError]=useState('');
 const encoded=query(filters);
 useEffect(()=>{
   const controller=new AbortController();setData(null);setError('');
   api<Pick<Insights,'breakdowns'>>('insights?'+encoded+'&section=breakdowns',{signal:controller.signal}).then(result=>setData(result.breakdowns)).catch(error=>{if(!controller.signal.aborted)setError(error.message);});
   return()=>controller.abort();
 },[encoded,refresh]);
 if(error)return <p className="adm-error" role="alert">{error}</p>;
 if(!data)return <p className="adm-loading" role="status">正在读取分布…</p>;
 return <div className="adm-breakdowns">{[['country','访问国家'],['source','访问来源'],['channel','访问渠道'],['device','设备'],['language','网站语言'],['product','热门产品']].map(([key,title])=><section className="adm-panel" key={key}><h2><Globe2 size={16}/>{title}</h2>{data[key]?.length?<div className="adm-table-wrap"><table className="adm-table adm-table--small"><thead><tr><th>{title}</th><th>浏览</th><th>访客（已授权）</th></tr></thead><tbody>{data[key].map(row=><tr key={row.value}><td>{key==='country'?countryName(row.value):key==='device'?devices[row.value]||'未知':key==='product'?<a href={row.value} target="_blank" rel="noreferrer">{productName(row.value)}</a>:known(row.value)}</td><td>{row.views}</td><td>{row.visitors}</td></tr>)}</tbody></table></div>:<Empty/>}</section>)}</div>;
}
