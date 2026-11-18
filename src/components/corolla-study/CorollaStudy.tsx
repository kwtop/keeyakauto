import {useEffect,useState} from 'react';
import type {Vehicle,VehicleVariant} from '../../data/catalog';
import type {ModelScene} from '../../data/modelVisuals';
import type {Alternative} from './data';
import {specificationText} from '../../data/keySpecifications';
import {Gallery,type StudyPhoto} from './Gallery';
import {SpecTable,CompareTable} from './Specifications';
import FAQ from './FAQ';
import Inquiry from './Inquiry';

type Props={direction:'a'|'b'|'c';vehicle:Vehicle;scene:ModelScene;alternatives:Alternative[]};
const base='/images/catalog/toyota/corolla/';
const side:StudyPhoto={src:base+'toyota-corolla-side-view-02.webp',alt:'Toyota Corolla supplied side-profile model photograph'};
const front:StudyPhoto={src:base+'toyota-corolla-front-view.webp',alt:'Toyota Corolla supplied front-view model photograph'};
const rear:StudyPhoto={src:base+'toyota-corolla-rear-view.webp',alt:'Toyota Corolla supplied rear-view model photograph'};
const wide='/images/corolla-study-20261021/corolla-panorama.webp';
function core(variant?:VehicleVariant){
 const find=(field:string)=>variant?.specs.find(s=>s.field===field||(field==='engine'&&s.label==='Engine designation'));
 const engine=find('engine'),power=find('power'),fuel=find('fuelConsumption'),seats=variant?.seats;
 return [{label:'Engine',value:engine?.value.split(' · ')[0]||'To confirm'}, {label:'Power · as listed',value:power?specificationText(power):'To confirm'}, {label:'WLTC fuel consumption',value:fuel?`${fuel.value} ${fuel.unit}`:'To confirm'}, {label:'Seats',value:seats?String(seats):'To confirm'}];
}
function Metrics({variant}:{variant?:VehicleVariant}){return <dl className="cs-metrics" aria-live="polite">{core(variant).map(f=><div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>;}
function resultsLink(from:string|null){if(!from||!from.startsWith('/')||from.startsWith('//'))return '/new-cars/';try{const url=new URL(from,location.origin);if(url.origin===location.origin&&/^\/new-cars\/(?:page\/\d+\/|[a-z0-9-]+\/)?$/.test(url.pathname))return url.pathname+url.search+'#vehicle-results';}catch{}return '/new-cars/';}
export default function CorollaStudy({direction,vehicle,scene,alternatives}:Props){
 const variants=vehicle.variants||[],[variantId,setVariantId]=useState(vehicle.defaultVariantId||variants[0]?.id||''),[back,setBack]=useState('/new-cars/');
 const [compareId,setCompareId]=useState(variants.find(v=>v.technicalReference?.status==='documented'&&v.id!==vehicle.defaultVariantId)?.id||'');
 useEffect(()=>{const restore=()=>{const p=new URLSearchParams(location.search);setVariantId(p.get('variant')||vehicle.defaultVariantId||'');setBack(resultsLink(p.get('from')));};restore();addEventListener('popstate',restore);return()=>removeEventListener('popstate',restore);},[vehicle.defaultVariantId]);
 const selected=variants.find(v=>v.id===variantId),unlisted=!selected,compare=variants.find(v=>v.id===compareId),documented=selected?.technicalReference?.status==='documented';
 const choose=(id:string)=>{setVariantId(id);const url=new URL(location.href);url.searchParams.set('variant',id);history.pushState({},'',url.pathname+url.search+url.hash);};
 const source='/new-cars/toyota/corolla/';
 const params=new URLSearchParams({model:vehicle.name,kind:'new',brand:vehicle.brand,variant:variantId,trim:selected?.name||'',year:selected?.year||'',powertrain:selected?.powertrain||'To confirm',source});if(vehicle.category)params.set('category',vehicle.category);
 const configuration=new URLSearchParams(params);configuration.set('service','Configuration sheet: equipment, colour, steering and destination documents');
 const photos:StudyPhoto[]=[{src:scene.src,srcSet:scene.srcSet,alt:scene.alt,original:scene.original,note:scene.note},...(vehicle.gallery||[])];
 const versionField=<label className="cs-version-field" htmlFor="cs-version">China-market version<select id="cs-version" value={variantId} onChange={e=>choose(e.target.value)}>{unlisted&&<option value={variantId}>Linked version · please confirm</option>}{variants.map(v=><option key={v.id} value={v.id}>{v.name}{v.technicalReference?.status==='catalog-only'?' · catalog reference':''}</option>)}</select></label>;
 return <div className={`corolla-study cs-${direction}`} data-corolla-direction={direction}>
  <div className="cs-shell"><nav className="cs-breadcrumbs" aria-label="Breadcrumb"><a href={back}>New Cars</a><span aria-hidden="true">/</span><a href="/new-cars/toyota/">Toyota</a><span aria-hidden="true">/</span><span>Corolla</span></nav></div>
  <section className="cs-hero cs-shell" id="cs-overview" data-core-module="overview" aria-labelledby="cs-model-title">
   {direction==='b'?<><div className="cs-b-heading"><h1 id="cs-model-title">Toyota Corolla</h1>{versionField}</div><div className="cs-b-photo"><picture><source media="(max-width:599px)" srcSet={scene.srcSet}/><img src={wide} width="1934" height="813" alt="Toyota Corolla in an AI-extended neighbourhood setting" fetchPriority="high"/></picture><div className="cs-b-facts"><Metrics variant={selected}/><a className="cs-action" href="#cs-inquiry">Request this model</a></div></div><p className="cs-picture-note"><a href={scene.original} target="_blank" rel="noopener noreferrer">Original photo</a></p></>:
    <><Gallery photos={direction==='c'?[...photos.slice(1),photos[0]]:photos} white={direction==='c'}/><div className="cs-hero-copy"><h1 id="cs-model-title">Toyota Corolla</h1>{versionField}<Metrics variant={selected}/><div className="cs-hero-actions"><a className="cs-action" href="#cs-inquiry">Request this model</a><a className="cs-text-link" href="#cs-specifications">View specifications</a></div><p className="cs-picture-note">Model-family photos. Exact version and availability to confirm.</p></div></>}
   {unlisted&&<p className="cs-data-gap" role="status">The linked version is not in the recorded list. Choose a listed version or keep its reference in your inquiry.</p>}
  </section>
  <nav className="cs-section-nav cs-shell" aria-label="On this page"><a href="#cs-specifications">Specifications</a><a href="#cs-details">A closer look</a><a href="#cs-faq">Before you order</a><a href="#cs-inquiry">Inquiry</a></nav>
  <section className="cs-section cs-spec-section" id="cs-specifications" data-core-module="specifications" aria-labelledby="cs-spec-title"><div className="cs-shell">
   <div className="cs-section-heading"><h2 id="cs-spec-title">{direction==='c'?'Compare configurations.':'Details & specifications.'}</h2><p>{selected?.name||'Version to confirm'}</p></div>
   {direction==='c'?<><CompareTable selected={selected} other={compare} options={variants.filter(v=>v.technicalReference?.status==='documented')} onChange={setCompareId}/><details className="cs-full-specs"><summary>Selected version · full specifications<span aria-hidden="true">+</span></summary><SpecTable variant={selected}/></details></>:
   <div className="cs-spec-layout"><div className="cs-spec-editorial"><p>{selected?.powertrain==='Hybrid'?'A hybrid reference with E-CVT. Compare the WLTC figure and the exact equipment for your order.':selected?.powertrain==='Gasoline'?'A gasoline Corolla reference. Review the powertrain, dimensions and fuel-consumption figures for your selected version.':'Choose the version before comparing its technical details.'}</p><img src={side.src} alt={side.alt} width="1448" height="1086" loading="lazy"/><div className="cs-feature-pair"><div><strong>{selected?.specs.find(s=>s.field==='torque')?specificationText(selected.specs.find(s=>s.field==='torque')!):'Configuration'}</strong><span>{selected?.specs.some(s=>s.field==='torque')?'Listed maximum torque':'Equipment to confirm'}</span></div><div><strong>{selected?.specs.find(s=>s.field==='transmission')?.value.split(' (')[0]||'Version-specific'}</strong><span>Transmission</span></div></div></div><div className="cs-spec-data"><SpecTable variant={selected} compact/></div></div>}
   {!documented&&selected&&<p className="cs-data-gap">This catalog version has fewer recorded specifications. Missing fields stay unconfirmed; they do not inherit data from another version.</p>}
   <a className="cs-text-link cs-config-link" href={'/quote/?'+configuration.toString()}>Request the configuration sheet</a>
  </div></section>
  <section className="cs-section cs-details-section cs-shell" id="cs-details" data-core-module="details" aria-labelledby="cs-detail-title"><div className="cs-section-heading"><h2 id="cs-detail-title">A closer look.</h2><p>Review the shape. Confirm the specification.</p></div><div className="cs-detail-gallery"><figure className="cs-angle-main"><a href={side.src} target="_blank" rel="noopener noreferrer"><img src={side.src} alt={side.alt} width="1448" height="1086" loading="lazy"/></a><figcaption>Side profile</figcaption></figure><figure><a href={front.src} target="_blank" rel="noopener noreferrer"><img src={front.src} alt={front.alt} width="1448" height="1086" loading="lazy"/></a><figcaption>Front view</figcaption></figure><figure><a href={rear.src} target="_blank" rel="noopener noreferrer"><img src={rear.src} alt={rear.alt} width="1448" height="1086" loading="lazy"/></a><figcaption>Rear view</figcaption></figure></div><div className="cs-equipment"><h3>Confirm for your order.</h3><p>Exterior and interior colours, steering position, options and supplied equipment belong in the configuration sheet. The photos are model-family references.</p></div></section>
  <section className="cs-section cs-faq-section cs-shell" id="cs-faq" data-core-module="faq" aria-labelledby="cs-faq-title"><div className="cs-section-heading"><h2 id="cs-faq-title">Before you order.</h2></div><FAQ/></section>
  <section className="cs-inquiry cs-shell" id="cs-inquiry" data-core-module="inquiry" aria-label="Corolla quotation"><Inquiry params={params} version={selected?.name||'Linked version to confirm'} sidePhoto={direction==='b'?side:undefined}/></section>
  <section className="cs-section cs-alternatives cs-shell" data-core-module="alternatives" aria-labelledby="cs-alternative-title"><div className="cs-section-heading"><h2 id="cs-alternative-title">Also consider.</h2><a className="cs-text-link" href="/new-cars/">All new cars</a></div><div className="cs-related-grid">{alternatives.map(v=><article key={v.href}><a className="cs-related-photo" href={v.href}><img src={v.image} srcSet={v.srcSet} sizes="(min-width:1200px) 310px, (min-width:600px) 45vw, calc(100vw - 40px)" alt={v.name+' model reference'} width="1448" height="1086" loading="lazy"/></a><h3><a href={v.href}>{v.name}</a></h3><p>{v.year} · {v.powertrain}</p></article>)}</div></section>
 </div>;
}
