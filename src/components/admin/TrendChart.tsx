import {useEffect,useId,useRef,useState} from 'react';
import type {Insights} from './types';
export default function TrendChart({data,metric,hourly,observedAt}:{data:Insights['trend'];metric:string;hourly:boolean;observedAt:number}){
 const root=useRef<HTMLDivElement>(null),[width,setWidth]=useState(640),[active,setActive]=useState<number|null>(null),gradient=useId();
 useEffect(()=>{const element=root.current;if(!element)return;const observer=new ResizeObserver(([entry])=>setWidth(Math.max(180,entry.contentRect.width)));observer.observe(element);return()=>observer.disconnect();},[]);
 const rows=data.map(row=>({label:row.label,at:row.at,current:row[metric]===null?null:Number(row[metric]||0),previous:Number(row.previous?.[metric]||0)}));
 const left=34,right=width-12,top=21,bottom=182,step=Math.max(1,Math.ceil(Math.max(1,...rows.flatMap(row=>[row.current||0,row.previous]))/4)),max=step*4;
 const x=(index:number)=>left+(right-left)*index/Math.max(1,rows.length-1),y=(value:number)=>bottom-(bottom-top)*value/max;
 const points=rows.flatMap((row,index)=>row.current===null?[]:[{index,value:row.current}]);
 const current=points.map(({index,value},position)=>`${position?'L':'M'}${x(index)},${y(value)}`).join(' ');
 const previous=rows.map((row,index)=>`${index?'L':'M'}${x(index)},${y(row.previous)}`).join(' ');
 const tickStep=hourly?Math.max(3,Math.ceil(rows.length/Math.max(2,width/65))):Math.max(1,Math.ceil(rows.length/Math.max(2,width/75)));
 const currentIndex=hourly?rows.findIndex(row=>row.at<=observedAt&&row.at+3600000>observedAt):-1;
 const selected=active===null?null:rows[Math.min(active,rows.length-1)];
 return <div ref={root} className="adm-light-chart">
 <div className="adm-chart"><svg width="100%" height="220" viewBox={`0 0 ${width} 220`} role="img" tabIndex={0} aria-label={`${hourly?'00 至 23 时':'每日'}趋势，本期与上期对比。左右方向键查看数值。${selected?`${selected.label}，本期 ${selected.current??'尚未发生'}，上期 ${selected.previous}`:''}`} onFocus={()=>setActive(currentIndex>=0?currentIndex:rows.length-1)} onBlur={()=>setActive(null)} onKeyDown={event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();setActive(value=>Math.max(0,Math.min(rows.length-1,(value??0)+(event.key==='ArrowLeft'?-1:1))));}}} onPointerMove={event=>{const rect=event.currentTarget.getBoundingClientRect();setActive(Math.max(0,Math.min(rows.length-1,Math.round(((event.clientX-rect.left)*width/rect.width-left)/(right-left)*(rows.length-1)))));}} onPointerLeave={()=>setActive(null)}>
 <defs><linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#378362" stopOpacity=".15"/><stop offset="100%" stopColor="#378362" stopOpacity="0"/></linearGradient></defs>
 {Array.from({length:5},(_,index)=><g key={index}><line x1={left} x2={right} y1={y(step*index)} y2={y(step*index)} stroke="#edf0ee"/><text x={left-8} y={y(step*index)+4} textAnchor="end">{step*index}</text></g>)}
 {points.length>0&&<path d={`${current} L${x(points[points.length-1].index)},${bottom} L${x(points[0].index)},${bottom} Z`} fill={`url(#${gradient})`}/>}
 <path d={previous} fill="none" stroke="#a9b3ac" strokeWidth="1.7" strokeDasharray="4 4"/><path d={current} fill="none" stroke="#378362" strokeWidth="2.3"/>
 {currentIndex>=0&&<line x1={x(currentIndex)} x2={x(currentIndex)} y1={top} y2={bottom} stroke="#c4ccc6" strokeDasharray="3 4"/>}
 {rows.map((row,index)=>index%tickStep===0||index===rows.length-1?<text key={index} x={x(index)} y={207} textAnchor={index===0?'start':index===rows.length-1?'end':'middle'}>{row.label}</text>:null)}
 {selected&&active!==null&&<g><line x1={x(active)} x2={x(active)} y1={top} y2={bottom} stroke="#788b7c"/>{selected.current!==null&&<circle cx={x(active)} cy={y(selected.current)} r="4" fill="#378362"/>}</g>}
 </svg>{selected&&<output className="adm-chart-tooltip">{selected.label} · 本期 {selected.current??'尚未发生'} · 上期 {selected.previous}</output>}</div>
 <details className="adm-chart-data"><summary>查看数值</summary><div className="adm-table-wrap"><table className="adm-table adm-table--small"><thead><tr><th>时段</th><th>本期</th><th>上期</th></tr></thead><tbody>{rows.map(row=><tr key={row.at}><th scope="row">{row.label}</th><td>{row.current??'尚未发生'}</td><td>{row.previous}</td></tr>)}</tbody></table></div></details>
 </div>;
}
