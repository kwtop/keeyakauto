import type {Vehicle,VehicleVariant} from './catalog';
import {keySpecifications} from './keySpecifications.ts';

export function resolveVariantId(vehicle:Pick<Vehicle,'variantAliases'>,id:string){
  return vehicle.variantAliases?.[id]??id;
}

/** A catalog designation alone is not a configuration option. */
export function selectableVehicleVariants(vehicle:Pick<Vehicle,'variants'>,referenceVariantId?:string){
  return (vehicle.variants??[]).filter(variant=>
    variant.technicalReference?.status==='documented'||variant.id===referenceVariantId);
}

export function resolveSelectableVariantId(
  vehicle:Pick<Vehicle,'variants'|'variantAliases'|'defaultVariantId'>,
  selectable:VehicleVariant[],
  id:string,
){
  const resolved=resolveVariantId(vehicle,id);
  if(selectable.some(variant=>variant.id===resolved))return resolved;
  // Retired catalog-only options fall back explicitly. Unknown incoming IDs
  // remain unknown, so an inquiry never silently changes an unrecognized trim.
  if(vehicle.variants?.some(variant=>variant.id===resolved)){
    const preferred=resolveVariantId(vehicle,vehicle.defaultVariantId??'');
    return selectable.find(variant=>variant.id===preferred)?.id??selectable[0]?.id??'';
  }
  return resolved;
}

function completeness(variant:VehicleVariant) {
  const plugin=variant.powertrain==='PHEV'||variant.powertrain==='EREV';
  const primaryFields=new Set(['electricRange','engine','depletedFuel','fastCharging','dimensions','seats']);
  const core=keySpecifications(variant.specs,variant.powertrain,variant.seats)
    .filter(spec=>!plugin||primaryFields.has(spec.field??'')).length;
  const metadata=new Set(['modelYear','powertrain','body','seats']);
  const technical=new Set(variant.specs
    .filter(spec=>spec.value.trim()&&!/^[-—–]+$/.test(spec.value)&&!metadata.has(spec.field??''))
    .map(spec=>`${spec.field||spec.label}|${spec.testCycle??''}`)).size;
  return {core,technical};
}

// Shared by data preparation and detail assembly; no detailed dataset is imported.
export function selectDefaultVariant(variants:VehicleVariant[],original:VehicleVariant|undefined) {
  if(original?.technicalReference?.status==='documented')return original;
  const candidates=variants.filter(variant=>variant.technicalReference?.status==='documented')
    .map((variant,index)=>({variant,index,...completeness(variant)}));
  candidates.sort((a,b)=>b.core-a.core||b.technical-a.technical
    ||Number(b.variant.powertrain===original?.powertrain)-Number(a.variant.powertrain===original?.powertrain)
    ||Number(b.variant.year===original?.year)-Number(a.variant.year===original?.year)
    ||a.index-b.index);
  return candidates[0]?.variant??original;
}
