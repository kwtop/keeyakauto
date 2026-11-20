import BrandLogo from '../BrandLogo';
import {useEffect,useState} from 'react';
import {Battery,CalendarCheck,CalendarDays,CarFront,Cog,Cylinder,Fuel,Gauge,PlugZap,Route,UsersRound,Zap,type LucideIcon} from 'lucide-react';
import type {Vehicle} from '../../data/catalog';
import {brandHref} from '../../data/catalogPaths';
import type {DetailRecommendation} from '../../data/detailRecommendations';
import {vehicleCategory,vehicleCategoryLabel} from '../../data/vehicleCategories';
import {company} from '../../data/company';
import {powertrainLabel} from '../../data/catalogLabels';
import {manufacturerReferences} from '../../data/manufacturerReferences';
import {resolveSelectableVariantId,resolveVariantId,selectableVehicleVariants} from '../../data/vehicleDefaultVariant';
import Gallery from './Gallery';
import Specifications from './Specifications';
import OrderFAQ from './OrderFAQ';
import ProductGuide from './ProductGuide';
import BuyerChecks from './BuyerChecks';
import Inquiry from './Inquiry';
import RelatedModels from './RelatedModels';
import {summaryMetrics,usedSummaryMetrics,type NewMetricField} from './presentation';
import VersionSelect from './VersionSelect';
import SectionNav from './SectionNav';
import '../../styles/vehicle-detail.css';

interface Props{vehicle:Vehicle;sourcePath:string;related?:DetailRecommendation[];editorialFocus:string;}
const noRelated:DetailRecommendation[]=[];
const sectionLinks={
 new:[{id:'specifications',label:'Specifications',short:'Specs'},{id:'buying-guide',label:'Buying guide',short:'Guide'},{id:'ordering',label:'Questions',short:'FAQ'}],
 used:[{id:'specifications',label:'Specifications',short:'Specs'},{id:'buying-guide',label:'Buying guide',short:'Guide'},{id:'used-model-questions',label:'Questions',short:'FAQ'}],
};
const newMetricIcons: Record<NewMetricField,LucideIcon> = {
 engine: Cylinder,
 power: Zap,
 fuelConsumption: Fuel,
 depletedFuel: Fuel,
 seats: UsersRound,
 electricRange: Route,
 batteryEnergy: Battery,
 fastCharging: PlugZap,
 transmission: Cog,
 powertrain: CarFront,
 year: CalendarDays,
};
const usedMetricIcons: Partial<Record<string,LucideIcon>> = {
 'Model year': CalendarDays,
 'Year in past listing': CalendarDays,
 'First registration': CalendarCheck,
 'Recorded mileage': Gauge,
 Powertrain: Cog,
 'Body style': CarFront,
 'Engine displacement': Cylinder,
 Engine: Cylinder,
 'Listed range': Route,
 Range: Route,
};
function safeResultsPath(from:string|null,origin:string){
 if(!from||!from.startsWith('/')||from.startsWith('//'))return '';
 try{const url=new URL(from,origin);return url.origin===origin&&/^\/(new-cars|used-cars)\/(?:page\/\d+\/|[a-z0-9-]+\/)?$/.test(url.pathname)?url.pathname+url.search+'#vehicle-results':'';}catch{return '';}
}

export default function VehicleDetailPage({vehicle,sourcePath,related=noRelated,editorialFocus}:Props){
 const isNew=vehicle.kind==='new';
 const modelReference=manufacturerReferences[vehicle.brandSlug+'/'+vehicle.slug];
 const variants=isNew?selectableVehicleVariants(vehicle,modelReference?.specs.length?modelReference.variantId:undefined):vehicle.variants??[];
 const defaultId=resolveSelectableVariantId(vehicle,variants,vehicle.defaultVariantId??variants[0]?.id??'');
 const [variantId,setVariantId]=useState(defaultId),[comparisonId,setComparisonId]=useState(''),[resultsPath,setResultsPath]=useState('');
 useEffect(()=>{
  const restore=()=>{
   const params=new URLSearchParams(window.location.search);
   if(isNew){
    const requested=params.get('variant');
    const resolved=resolveSelectableVariantId(vehicle,variants,requested||defaultId);
    setVariantId(resolved);
    if(requested&&resolveVariantId(vehicle,requested)!==resolved){
     if(resolved)params.set('variant',resolved);else params.delete('variant');
     window.history.replaceState(window.history.state,'',window.location.pathname+(params.size?'?'+params:'')+window.location.hash);
    }
    setResultsPath(safeResultsPath(params.get('from'),window.location.origin));
   }
  };
  restore();window.addEventListener('popstate',restore);return()=>window.removeEventListener('popstate',restore);
 },[isNew,defaultId,vehicle]);
 const selected=variants.find(v=>v.id===variantId),unlisted=isNew&&Boolean(variantId)&&!selected;
 // A version owns its facts. Unknown/partial records never inherit another trim.
 const year=unlisted?'':selected?selected.year:vehicle.year;
 const powertrain=unlisted?'To confirm':selected?selected.powertrain:vehicle.powertrain;
 const specs=unlisted?[]:selected?selected.specs:vehicle.specs??[];
 const seats=unlisted?null:selected?selected.seats:vehicle.seats;
 const official=isNew&&selected?.id===modelReference?.variantId?modelReference:undefined;
 const displayedSpecs=selected?.technicalReference?.status!=='documented'&&official?official.specs:specs;
 const metrics=isNew?summaryMetrics(displayedSpecs,powertrain,seats,year):usedSummaryMetrics(vehicle);
 const compareOptions=variants.filter(v=>v.id!==selected?.id);
 const other=compareOptions.find(v=>v.id===comparisonId)??compareOptions.find(v=>v.technicalReference?.status==='documented'&&v.powertrain!==selected?.powertrain)??compareOptions.find(v=>v.technicalReference?.status==='documented')??compareOptions[0];
 const quoteParams=new URLSearchParams({model:vehicle.name,kind:vehicle.kind,brand:vehicle.brand,year,powertrain,variant:variantId,trim:selected?.name??'',source:sourcePath});
 if(vehicle.usedRecord){
  quoteParams.set('variant',vehicle.usedRecord.reference);
  quoteParams.set('trim',vehicle.usedRecord.trim);
  if(year==='To confirm')quoteParams.delete('year');
  if(powertrain==='To confirm')quoteParams.delete('powertrain');
 }
 if(vehicleCategory(vehicle))quoteParams.set('category',vehicleCategory(vehicle));
 const quoteHref='/quote/?'+quoteParams.toString();
 const modelName=vehicle.modelName&&!/^[79]$/.test(vehicle.modelName)?vehicle.modelName:vehicle.name;
 const category=vehicleCategory(vehicle),known=(value:string)=>value&&value!=='To confirm'?value:'';
 const subtitle=(isNew||!vehicle.usedRecord?.trim?[known(year),category&&vehicleCategoryLabel(category),known(powertrain)&&powertrainLabel(powertrain)]:[vehicle.usedRecord.trim]).filter(Boolean).join(' · ');
 const whatsappHref=company.whatsapp+'?text='+encodeURIComponent(`Hello KEEYAK, I'm interested in the ${vehicle.kind==='used'?'used ':''}${vehicle.name}${selected?.name?` (${selected.name})`:''}.`);
 function chooseVariant(id:string){setVariantId(id);const url=new URL(window.location.href);url.searchParams.set('variant',id);window.history.pushState({},'',url.pathname+url.search+url.hash);}
 return <div className={'vehicle-design vehicle-design--'+vehicle.kind}>
  <section id="model-overview" className="vd-overview" data-core-module="overview" aria-labelledby="vd-model-title">
   <Gallery vehicle={vehicle}/>
   <div className="vd-summary">
    <div className="vd-heading">
     <h1 id="vd-model-title" className="vd-title brand-title brand-title--page"><BrandLogo slug={vehicle.brandSlug} name={vehicle.brand}/><span>{vehicle.name}</span></h1>
     {subtitle&&<p className="vd-subtitle">{subtitle}</p>}
    </div>
    {isNew&&variants.length>0&&<label className="vd-version" htmlFor="vehicle-source-version">Select version<VersionSelect id="vehicle-source-version" value={variantId} onChange={chooseVariant} variants={variants} unlisted={unlisted}/></label>}
    <dl className="vd-metrics" aria-live="polite" aria-label="Selected model details">
     {metrics.map(metric=>{
      const LabelIcon=isNew&&metric.field?newMetricIcons[metric.field]:usedMetricIcons[metric.label];
      return <div key={metric.field??metric.label} className={metric.value.length>17?'vd-metric--long':undefined}>
       <dt>
        {LabelIcon?<span className="vd-metric-label"><LabelIcon size={16} strokeWidth={1.6} aria-hidden="true"/>{metric.label}</span>:metric.label}
        {metric.note&&<span className="vd-metric-note">{metric.note}</span>}
       </dt>
       <dd><MetricValue value={metric.label==='Powertrain'?powertrainLabel(metric.value):metric.value}/></dd>
      </div>;
     })}
    </dl>
    {unlisted&&<p className="vd-caution" role="status">This version is not listed. Choose a listed version or include the original version reference in your inquiry.</p>}
    <div className="vd-summary-actions"><a className="vd-action" href={quoteHref}>{'Request a quote'}</a><a className="vd-action vd-action--whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer"><img src="/images/brand/whatsapp.svg" width={18} height={18} alt=""/>Ask on WhatsApp</a></div>
    {!isNew&&!vehicle.usedRecord&&<p className="vd-summary-footnote">This past third-party listing does not confirm KEEYAK stock. Ask for the VIN, current mileage and condition records for each car offered.</p>}
   </div>
  </section>
  <SectionNav name={vehicle.name} links={sectionLinks[vehicle.kind]} quoteHref={quoteHref} quoteLabel="Request a quote"/>
  <Specifications vehicle={vehicle} selected={selected} other={isNew?other:undefined} options={compareOptions} onCompare={setComparisonId} unlisted={unlisted}/>
  <ProductGuide vehicle={vehicle} selected={selected} unlisted={unlisted} focus={editorialFocus}/>
  <BuyerChecks vehicle={vehicle} selected={selected} unlisted={unlisted}/>
  <OrderFAQ vehicle={vehicle} selected={selected} unlisted={unlisted} focus={editorialFocus}/>
  <Inquiry modelName={modelName} version={isNew?(selected?.name||(unlisted?'Linked version to confirm':'')):vehicle.usedRecord?.trim||''} params={quoteParams} isNew={isNew} backHref={resultsPath||brandHref(vehicle.kind,vehicle.brandSlug)} backLabel={resultsPath?'Back to your results':'Browse '+vehicle.brand}/>
  {related.length>0&&<RelatedModels models={related}/>}
  <noscript><style>{`.vd-select-control>.vd-select-value,.vd-select-chevron{display:none}.vd-select-control select{position:static;opacity:1;height:52px}.vd-select-control{padding:0}`}</style></noscript>
 </div>;
}
function MetricValue({value}:{value:string}){
 const [main,...qualifiers]=value.split(' · '),unit=main.match(/^(.+?)\s+(L\/100 km|L|kWh|kW|N·m|km|min|PS)$/);
 return <><span className="vd-metric-number">{unit?<>{unit[1]} <span className="vd-metric-unit">{unit[2]}</span></>:main}</span>{qualifiers.length>0&&<span className="vd-metric-qualifier">{qualifiers.join(' · ')}</span>}</>;
}
