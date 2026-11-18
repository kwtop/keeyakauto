// Server-only assembly. Import this at the individual Astro detail route, never
// in catalog.ts, a list page or a hydrated component.
import detailData from './vehicle-detail-data.json';
import type {Vehicle,VehicleVariant} from './catalog';
import {selectDefaultVariant} from './vehicleDefaultVariant';

type DocumentedVariant=VehicleVariant&{matchesDefaultId?:string};
const records=detailData.records as Record<string,{variants:DocumentedVariant[]}>;
// MG4's workbook says "revised" with a different Chinese word from the
// comparison. The year, 437 Free Choice trim and powertrain agree; retain its ID as an alias.
const catalogAliases:Record<string,Record<string,string>>={
  'mg/mg4':{'2026-954b3df540':'spec-2026-44292f8f88da'},
};

export function assembleVehicleDetails(vehicle:Vehicle):Vehicle {
  if(vehicle.kind!=='new')return vehicle;
  const key=vehicle.brandSlug+'/'+vehicle.slug;
  const entry=records[key];
  if(!entry)return vehicle;
  const original=vehicle.variants??[];
  const aliases=catalogAliases[key]??{};
  const variants:VehicleVariant[]=original.flatMap(variant=>{
    if(aliases[variant.id]){
      const target=entry.variants.find(item=>item.id===aliases[variant.id]);
      if(!target||target.name!==variant.name||target.year!==variant.year||target.powertrain!==variant.powertrain)throw new Error('Catalog alias no longer matches '+key);
      return [];
    }
    const match=entry.variants.find(item=>item.matchesDefaultId===variant.id);
    if(match){
      const {matchesDefaultId,...details}=match;
      // A matched source can add facts without renaming existing inbound links.
      return [{...details,id:variant.id,name:variant.name}];
    }
    return [{...variant,technicalReference:{status:'catalog-only' as const,label:'Catalog specification reference'}}];
  });
  const existingIds=new Set(original.map(variant=>variant.id));
  for(const {matchesDefaultId,...variant} of entry.variants){
    if(!existingIds.has(variant.id))variants.push(variant);
  }
  const originalId=vehicle.defaultVariantId??original[0]?.id??'';
  const preferred=selectDefaultVariant(variants,variants.find(variant=>variant.id===(aliases[originalId]??originalId)));
  // Existing version links resolve through aliases; an unqualified URL uses the default.
  return {...vehicle,variants,...(Object.keys(aliases).length?{variantAliases:aliases}:{}),...(preferred?{
    defaultVariantId:preferred.id,
    defaultVariantName:preferred.name,
    year:preferred.year,
    powertrain:preferred.powertrain,
    seats:preferred.seats,
  }:{})};
}
