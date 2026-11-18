import {CalendarDays,Files} from 'lucide-react';
import {Empty} from './Controls';
import {pageName} from './api';
import type {Insights} from './types';

export default function TrafficSummary({daily,pages,onVisits,onDay}:{
  daily:Insights['daily'];pages:Insights['breakdowns'][string];onVisits:(path?:string)=>void;onDay:(date:string)=>void;
}){
  return <div className="adm-traffic-tables">
    <section className="adm-panel" aria-labelledby="adm-daily-traffic">
      <div className="adm-section-heading"><h2 id="adm-daily-traffic"><CalendarDays size={18}/>每日访问</h2></div>
      <div className="adm-table-wrap adm-traffic-scroll">
        <table className="adm-table adm-table--small adm-traffic-counts adm-daily-counts">
          <thead><tr><th scope="col">日期</th><th scope="col">去重访客</th><th scope="col">页面浏览</th><th scope="col">匿名浏览</th></tr></thead>
          <tbody>{daily.map(day=><tr key={day.date}>
            <th scope="row"><button type="button" className="adm-text" aria-label={`查看 ${day.date} 的访客`} onClick={()=>onDay(day.date)}><time dateTime={day.date}>{day.date}</time></button></th>
            <td>{day.visitors.toLocaleString()}</td>
            <td>{day.pageviews.toLocaleString()}</td>
            <td>{day.anonymousPageviews.toLocaleString()}</td>
          </tr>)}</tbody>
        </table>
        {!daily.length&&<Empty text="所选日期暂无数据"/>}
      </div>
    </section>
    <section className="adm-panel" aria-labelledby="adm-visited-pages">
      <div className="adm-section-heading">
        <h2 id="adm-visited-pages"><Files size={18}/>热门访问页面</h2>
        <button className="adm-text" type="button" onClick={()=>onVisits()}>查看访问记录</button>
      </div>
      <div className="adm-table-wrap adm-traffic-scroll">
        <table className="adm-table adm-table--small adm-traffic-counts">
          <thead><tr><th scope="col">页面</th><th scope="col">浏览次数</th><th scope="col">去重访客</th></tr></thead>
          <tbody>{pages.map(row=><tr key={row.value}>
            <th scope="row"><button className="adm-text adm-page-drilldown" type="button" onClick={()=>onVisits(row.value)} aria-label={`查看 ${row.value} 的访问记录`}>{pageName(row.value)}</button>{pageName(row.value)!==row.value&&<small>{row.value}</small>}</th>
            <td>{row.views.toLocaleString()}</td>
            <td>{row.visitors.toLocaleString()}</td>
          </tr>)}</tbody>
        </table>
        {!pages.length&&<Empty text="所选时间暂无页面访问"/>}
      </div>
    </section>
  </div>;
}
