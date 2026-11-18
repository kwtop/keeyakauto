import {useRef,useState} from 'react';
import type {Vehicle} from '../data/catalog';
import {vehicleDisplayImage} from '../data/imageDelivery';
import {vehicleCategoryLabel} from '../data/vehicleCategories';

export default function CinematicCatalog({items}:{items:Vehicle[]}){
  const [kind,setKind]=useState<'new'|'used'>('new');
  const rail=useRef<HTMLDivElement>(null);
  const [end,setEnd]=useState(false);
  const [atEnd,setAtEnd]=useState(false);
  const isNew=kind==='new';
  const byKind=items.filter(v=>v.kind===kind);
  const directory=`/${kind}-cars/`;
  const find=(slug:string)=>byKind.find(v=>v.slug===slug)||byKind[0];
  const cards=isNew?[
    {label:vehicleCategoryLabel('Sedan'),vehicle:find('corolla'),href:directory+'?body=Sedan'},
    {label:'SUV',vehicle:find('rav4'),href:directory+'?body=SUV'},
    {label:'Electric',vehicle:find('id-3'),href:directory+'?power=Pure%20Electric'}
  ]:[
    {label:vehicleCategoryLabel('Sedan'),vehicle:find('seal-07-dm-i'),href:directory+'?body=Sedan'},
    {label:'SUV',vehicle:find('bz3x'),href:directory+'?body=SUV'},
    {label:'Van',vehicle:find('crown-vellfire-hybrid'),href:directory+'?body=MPV'}
  ];
  const allCards=cards;
  const change=(next:'new'|'used')=>{setKind(next);setEnd(false);setAtEnd(false);rail.current?.scrollTo({left:0,behavior:'instant'});};
  const move=(forward:boolean)=>rail.current?.scrollBy({left:(forward?1:-1)*Math.max(200,rail.current.clientWidth*.65),behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
  return <section data-core-module="model-selection" className="cinematic-catalog" id="find-a-car" aria-label="Explore new and used cars">
    <div className="cinematic-catalog-top"><div className="cinematic-kind-tabs" aria-label="Vehicle category"><button type="button" aria-pressed={isNew} aria-controls="cinematic-vehicle-selection" onClick={()=>change('new')}>New Cars</button><button type="button" aria-pressed={!isNew} aria-controls="cinematic-vehicle-selection" onClick={()=>change('used')}>Used Cars</button></div><div className="cinematic-catalog-tools"><div className="cinematic-rail-controls"><button type="button" className="cinematic-rail-button" aria-label="Previous car categories" onClick={()=>move(false)} disabled={!end}><img src="/images/home-cinematic/arrow-left.svg" alt="" width="18" height="18"/></button><button type="button" className="cinematic-rail-button" aria-label="Next car categories" onClick={()=>move(true)} disabled={atEnd}><img src="/images/home-cinematic/arrow-right.svg" alt="" width="18" height="18"/></button></div></div></div>
    <div className="cinematic-catalog-main" id="cinematic-vehicle-selection" aria-live="polite">
      <div className="cinematic-catalog-copy"><h2>{isNew?'Find your starting point.':'Used-car sourcing.'}</h2><p>{isNew?'Explore model references by body style or powertrain. Confirm the version and availability for your destination.':'Historical model references for your search. Confirm year, condition and availability for each proposed car.'}</p><a className="cinematic-button cinematic-button-black" href={directory}>Browse {isNew?'New':'Used'} Cars</a></div>
      <div className="cinematic-car-rail" ref={rail} onScroll={()=>{const current=rail.current;if(current){setEnd(current.scrollLeft>2);setAtEnd(current.scrollLeft>=current.scrollWidth-current.clientWidth-2);}}}>{allCards.map(card=><a className="cinematic-car-card" href={card.href} key={kind+card.label}><img className="cinematic-car-photo" src={vehicleDisplayImage(card.vehicle.image)} alt={`${card.vehicle.name} model reference`} width="1448" height="1086" loading="lazy"/><div className="cinematic-car-card-label"><h3>{card.label}</h3><p>{card.vehicle.name} · {isNew?'Model reference':'Historical reference'}</p></div></a>)}</div>
    </div>
  </section>;
}
