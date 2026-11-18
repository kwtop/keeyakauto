import type {VehicleVariant} from '../../data/catalog';
/** Native selection and keyboard behaviour, with a wrapping visible value. */
export default function VersionSelect({id,value,onChange,variants,unlisted=false}:{id:string;value:string;onChange:(value:string)=>void;variants:VehicleVariant[];unlisted?:boolean}){
 const current=variants.find(v=>v.id===value);
 const label=current?current.name+(current.technicalReference?.status==='catalog-only'?' (catalog reference)':''):'Linked version (please confirm)';
 return <span className="vd-select-control"><span className="vd-select-value" aria-hidden="true">{label}</span><span className="vd-select-chevron" aria-hidden="true">⌄</span><select id={id} value={value} onChange={e=>onChange(e.target.value)}>{unlisted&&<option value={value}>Linked version (please confirm)</option>}{variants.map(v=><option key={v.id} value={v.id}>{v.name}{v.technicalReference?.status==='catalog-only'?' (catalog reference)':''}</option>)}</select></span>;
}
