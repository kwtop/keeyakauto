import type {Vehicle,VehicleVariant,VehicleSpecification} from '../../data/catalog';
import {useEffect,useRef} from 'react';
import {BatteryCharging,CarFront,ChevronDown,ClipboardList,FileText,Fuel,Gauge} from 'lucide-react';
import {specificationText} from '../../data/keySpecifications';
import {manufacturerReferences} from '../../data/manufacturerReferences';
import {findSpec,groupSpecifications,specField} from './presentation';
import {normalizeCategory,vehicleCategoryLabel} from '../../data/vehicleCategories';
import {powertrainLabel} from '../../data/catalogLabels';
import VersionSelect from './VersionSelect';

const groupIcons={general:CarFront,performance:Gauge,battery:BatteryCharging,consumption:Fuel,additional:ClipboardList};

function dimensionsInMillimetres(spec:VehicleSpecification){
 return specField(spec)==='dimensions' &&
  (spec.unit?.trim().toLowerCase()==='mm'||/\d\s*mm$/i.test(spec.value.trim()));
}

function specLabel(spec:VehicleSpecification){
 if(dimensionsInMillimetres(spec))return 'Dimensions (L × W × H, mm)';
 return spec.label==='Source body category'?'Catalog body group':spec.label;
}
function displaySpecValue(spec:VehicleSpecification){
 if(dimensionsInMillimetres(spec))return spec.value.trim().replace(/\s*mm$/i,'');
 const category=spec.label==='Source body category'?normalizeCategory(spec.value):'';
 const value=category?vehicleCategoryLabel(category):specificationText(spec);
 return specField(spec)==='powertrain'?powertrainLabel(value):value;
}
function versionSpecs(vehicle:Vehicle,version?:VehicleVariant){
 const specs=version?version.specs:vehicle.specs??[];
 const facts=[...specs];
 const powertrain=version?version.powertrain:vehicle.powertrain;
 const seats=version?version.seats:vehicle.seats;
 const source=version?.source??vehicle.source;
 if(powertrain&&!findSpec(specs,'powertrain')) facts.unshift({field:'powertrain',label:'Powertrain',value:powertrain,source});
 if(seats&&!findSpec(specs,'seats')) facts.push({field:'seats',label:'Seats',value:String(seats),source});
 return facts;
}

// Each row keeps the data from its own version, including repeated source fields.
function indexedSpecs(specs:VehicleSpecification[]){
 const occurrences=new Map<string,number>();
 return new Map(specs.map(spec=>{
  const field=specField(spec);
  const occurrence=occurrences.get(field)??0;
  occurrences.set(field,occurrence+1);
  return [field+'-'+occurrence,spec] as const;
 }));
}

export default function Specifications({vehicle,selected,other,options,onCompare,unlisted}:{vehicle:Vehicle;selected?:VehicleVariant;other?:VehicleVariant;options:VehicleVariant[];onCompare:(id:string)=>void;unlisted:boolean}){
 const groupsRef=useRef<HTMLDivElement>(null);
 const comparisonId=other?.id;
 const previousComparisonId=useRef(comparisonId);
 useEffect(()=>{
  const changed=previousComparisonId.current!==comparisonId;
  previousComparisonId.current=comparisonId;
  if(!changed||!comparisonId||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const values=groupsRef.current?.querySelectorAll('.vd-spec-group[open] .vd-compared-value');
  const animations=Array.from(values??[],(value,index)=>value.animate(
   [{opacity:.2,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],
   {duration:360,delay:Math.min(index,5)*22,fill:'backwards',easing:'cubic-bezier(.2,.75,.2,1)'},
  ));
  return ()=>animations.forEach(animation=>animation.cancel());
 },[comparisonId]);
 const reference=manufacturerReferences[vehicle.brandSlug+'/'+vehicle.slug];
 const official=reference&&selected?.id===reference.variantId?reference:undefined;
 const comparedOfficial=reference&&other?.id===reference.variantId?reference:undefined;
 const isUsed=vehicle.kind==='used';
 const documented=selected?.technicalReference?.status==='documented';
 const name=selected?.name??vehicle.defaultVariantName??vehicle.name;
 const firstSpecs=isUsed
  ? (vehicle.specs??[]).filter(spec=>specField(spec)==='dimensions'&&spec.value.trim()&&!/^[-—–]+$/.test(spec.value.trim()))
  : versionSpecs(vehicle,selected);
 if(isUsed&&!firstSpecs.length)return null;
 const secondSpecs=other?versionSpecs(vehicle,other):[];
 const firstGroups=groupSpecifications(firstSpecs);
 const secondGroups=groupSpecifications(secondSpecs);
 const visibleGroups=(Object.keys(groupIcons) as (keyof typeof groupIcons)[]).filter(id=>
  firstGroups.some(group=>group.id===id)||secondGroups.some(group=>group.id===id)
 );
 const cycles=[firstSpecs,secondSpecs].map(specs=>findSpec(specs,'electricRange')?.testCycle);
 const differentCycles=cycles[0]&&cycles[1]&&cycles[0]!==cycles[1];
 return <section id="specifications" className="vd-section vd-specifications" data-core-module="specifications" aria-labelledby="key-specifications-title">
  <div className="vd-section-heading"><h2 id="key-specifications-title">Model specifications</h2></div>
   {unlisted?<p className="vd-data-gap" role="status">The linked version is not listed. Choose a listed version to see its specifications. Your inquiry keeps the original version reference.</p>:<>
    {!isUsed&&!documented&&<p className="vd-data-gap">{official?`Manufacturer figures below apply to the ${official.variantName}; their source does not specify a model year.`:'We have limited specifications for this version. Request a configuration sheet for equipment and any missing details.'}{vehicle.publicCaution&&<> {vehicle.publicCaution}</>}</p>}
    {documented&&vehicle.publicCaution&&<p className="vd-data-gap">{vehicle.publicCaution}</p>}
    <div className="vd-comparison vd-spec-matrix" data-columns={other?2:1}>
     {!isUsed&&<div className="vd-compare-head">
      <div className="vd-compare-config"><div><span className="vd-selected-label">Selected version</span><strong>{name}</strong></div></div>
      {other&&<div className="vd-compare-config"><label htmlFor="vd-compare-version">Compare with<VersionSelect id="vd-compare-version" value={other.id} onChange={onCompare} variants={options}/></label></div>}
     </div>}
     {other&&<span className="vd-sr-only" role="status">{`Comparing with ${other.name}`}</span>}
     {differentCycles&&<p className="vd-cycle-note">Range figures use different test cycles ({cycles.join(' / ')}); they are not directly comparable.</p>}
     <div className="vd-spec-groups" ref={groupsRef}>
      {visibleGroups.map((id,index)=>{
       const first=firstGroups.find(group=>group.id===id);
       const second=secondGroups.find(group=>group.id===id);
       const group=first??second;
       if(!group) return null;
       const Icon=groupIcons[id];
       const left=indexedSpecs(first?.specs??[]);
       const right=indexedSpecs(second?.specs??[]);
       const keys=new Set([...left.keys(),...right.keys()]);
       return <details className="vd-spec-group" data-spec-group={id} key={id} open={index===0}>
        <summary><Icon size={21} aria-hidden="true"/><span>{group.label}</span><ChevronDown className="vd-spec-group-chevron" size={19} aria-hidden="true"/></summary>
        <table>
         <caption className="vd-sr-only">{group.label} for {vehicle.name}</caption>
         <thead><tr><th scope="col">Specification</th><th scope="col">{name}</th>{other&&<th scope="col">{other.name}</th>}</tr></thead>
         <tbody>{[...keys].map(key=>{
          const a=left.get(key),b=right.get(key);
          const label=specLabel((a??b)!);
          const selectedValue=a?displaySpecValue(a):missingSpec(selected,key);
          const comparedValue=b?displaySpecValue(b):missingSpec(other,key);
          const differs=Boolean(a&&b&&selectedValue.trim().toLowerCase()!==comparedValue.trim().toLowerCase());
          return <tr key={key}><th scope="row">{label}</th>
           <td>{selectedValue}</td>
           {other&&<td className={differs?'vd-spec-difference':undefined}>
            {differs&&<span className="vd-sr-only">Differs from selected version: </span>}
            <span className="vd-compared-value">
             {b&&specLabel(b)!==label&&<span className="vd-spec-cell-label">{specLabel(b)}</span>}
             {comparedValue}
            </span>
           </td>}
          </tr>;
         })}</tbody>
        </table>
       </details>;
      })}
      {(official||comparedOfficial)&&<details className="vd-spec-group" data-spec-group="manufacturer" open={visibleGroups.length===0}>
       <summary><FileText size={21} aria-hidden="true"/><span>Manufacturer reference</span><ChevronDown className="vd-spec-group-chevron" size={19} aria-hidden="true"/></summary>
       <div className="vd-spec-source-copy"><p>{reference.applicability}</p><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.label}</a></div>
       <dl className="vd-specification-grid">{reference.specs.map((spec,index)=><div key={index}><dt>{specLabel(spec)}</dt><dd>{displaySpecValue(spec)}</dd></div>)}</dl>
      </details>}
     </div>
    </div>
   </>}
 </section>;
}

function missingSpec(version:VehicleVariant|undefined,key:string){
 const field=key.slice(0,key.lastIndexOf('-'));
 if(version?.powertrain==='Pure Electric'&&['engine','fuelConsumption','depletedFuel'].includes(field))return 'Not applicable';
 if(version?.powertrain==='Gasoline'&&['electricRange','batteryEnergy','fastCharging'].includes(field))return 'Not applicable';
 return 'To confirm';
}
