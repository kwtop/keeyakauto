import {useEffect,useState} from 'react';

/** Sticky jump links below the overview; keeps the quote action in reach on long detail pages. */
export default function SectionNav({name,links,quoteHref,quoteLabel}:{name:string;links:{id:string;label:string;short:string}[];quoteHref:string;quoteLabel:string}){
 const [active,setActive]=useState(''),[pinned,setPinned]=useState(false);
 useEffect(()=>{
  const update=()=>{
   // The last section whose top has passed just below the sticky bar is the one being read.
   let current='';
   for(const link of links){const top=document.getElementById(link.id)?.getBoundingClientRect().top;if(top!==undefined&&top<200)current=link.id;}
   setActive(current);
   // The overview has its own quote button; show this one once that button has scrolled away.
   setPinned((document.getElementById('model-overview')?.getBoundingClientRect().bottom??0)<160);
  };
  update();window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update);
 },[links]);
 return <nav className={'vd-section-nav'+(pinned?' vd-section-nav--pinned':'')} aria-label={name+' sections'}>
  <span className="vd-section-nav-name">{name}</span>
  <div className="vd-section-nav-links">{links.map(link=><a key={link.id} href={'#'+link.id} aria-current={active===link.id?'location':undefined}><span className="vd-section-nav-full">{link.label}</span><span className="vd-section-nav-short" aria-hidden="true">{link.short}</span></a>)}</div>
  <div className="vd-section-nav-end"><a className="vd-action vd-section-nav-action" href={quoteHref} tabIndex={pinned?undefined:-1} aria-hidden={pinned?undefined:true}>{quoteLabel}</a></div>
 </nav>;
}
