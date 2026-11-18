import {useState} from 'react';
import type {Vehicle} from '../data/catalog';
import {vehicleHref} from '../data/catalogPaths';
import {vehicleDisplayImage} from '../data/imageDelivery';
import {bodyGroupLabel} from '../data/catalogLabels';

export default function HomeCatalog({items}:{items:Vehicle[]}) {
 const [kind,setKind]=useState<'new'|'used'>('new');
 const [brand,setBrand]=useState('');
 const [body,setBody]=useState('');
 const byKind=items.filter(v=>v.kind===kind);
 const preferred=kind==='new'?['camry','id-3','rav4']:['seagull','bz3x','starlight-730-ev'];
 const results=byKind.filter(v=>(!brand||v.brandSlug===brand)&&(!body||v.body===body));
 const featured=preferred.map(slug=>byKind.find(v=>v.slug===slug)).filter((v):v is Vehicle=>!!v);
 const selected=brand||body?results.slice(0,3):[...featured,...byKind.filter(v=>!featured.includes(v))].slice(0,3);
 const currentBrands=[...new Map(byKind.map(v=>[v.brandSlug,{name:v.brand,slug:v.brandSlug}])).values()];
 const parameters=new URLSearchParams();
 if(brand)parameters.set('brand',brand);
 if(body)parameters.set('body',body);
 const directoryHref='/'+kind+'-cars/'+(parameters.toString()?'?'+parameters.toString():'');
 const changeKind=(next:'new'|'used')=>{setKind(next);setBrand('');setBody('');};
 return <div className="gallery-catalog" id="find-a-car">
   <h2>Find your next model</h2>
   <div className="gallery-catalog-navigation"><div className="gallery-tabs" aria-label="Vehicle category"><button type="button" aria-pressed={kind==='new'} onClick={()=>changeKind('new')}>New Cars</button><button type="button" aria-pressed={kind==='used'} onClick={()=>changeKind('used')}>Used Cars</button></div><div className="gallery-filter-fields"><select aria-label="Brand" value={brand} onChange={e=>setBrand(e.target.value)}><option value="">All Brands</option>{currentBrands.map(b=><option key={b.slug} value={b.slug}>{b.name}</option>)}</select><select aria-label="Body type" value={body} onChange={e=>setBody(e.target.value)}><option value="">All Body Types</option>{[...new Set(byKind.map(v=>v.body))].map(b=><option key={b} value={b}>{bodyGroupLabel(b,kind)}</option>)}</select>{(brand||body)&&<button className="gallery-link" type="button" onClick={()=>{setBrand('');setBody('');}}>Clear filters</button>}</div></div>
   <div className="gallery-vehicles" aria-live="polite">{selected.length?selected.map(v=><article className="gallery-vehicle" data-kind={kind} key={v.kind+v.slug}><a className="gallery-vehicle-image" href={vehicleHref(v)} tabIndex={-1} aria-hidden="true"><img src={vehicleDisplayImage(v.image)} alt="" loading="lazy" width="1448" height="1086"/></a><div className="gallery-vehicle-caption"><h3><a href={vehicleHref(v)}>{v.name}</a></h3><p>{bodyGroupLabel(v.body,kind)+' · '+v.powertrain}</p></div></article>):<div className="gallery-empty"><h3>No models match these filters</h3><p>Change the filters or tell us what you need.</p><a className="home-button" href="/quote/">Request a Quote</a></div>}</div>
   <div className="gallery-catalog-bottom"><a className="gallery-link" href={directoryHref}>{brand||body?'View matching cars':'Explore all '+kind+' cars'} <span aria-hidden="true">→</span></a><div className="gallery-used"><h3>Looking for used cars?</h3><p>Share your model, year range and condition requirements.</p><a className="gallery-link" href="/used-cars/">Explore used car sourcing <span aria-hidden="true">→</span></a></div></div>
 </div>;
}
