import {vehicles,type Vehicle} from './catalog';
import {vehicleCategory} from './vehicleCategories';
export type DetailRecommendation=Pick<Vehicle,'kind'|'brandSlug'|'slug'|'name'|'image'|'body'|'powertrain'|'year'|'presentationImage'>&{mileageKm?:number};

// These records include the trim in the model name.
const usedModelAliases:Partial<Record<string,string>>={
 'haval/h6-pro':'h6',
 'haval/h6-guochao':'h6',
 'fangchengbao/tai-7-awd-ultra':'tai 7',
 'fangchengbao/tai-7-2wd-max':'tai 7',
};
function usedModelKey(vehicle:Vehicle){
 const alias=usedModelAliases[vehicle.brandSlug+'/'+vehicle.slug];
 return vehicle.brandSlug+'/'+(alias||vehicle.modelName||vehicle.slug).trim().toLowerCase();
}

export function detailRecommendations(vehicle:Vehicle):DetailRecommendation[]{
 if(vehicle.kind==='used'){
  const model=usedModelKey(vehicle);
  const reference=vehicle.usedRecord?.reference;
  const body=vehicleCategory(vehicle)||vehicle.body;
  const candidates=vehicles.filter(v=>v.kind==='used'
   &&(v.brandSlug!==vehicle.brandSlug||v.slug!==vehicle.slug)
   &&(!reference||v.usedRecord?.reference!==reference));
  const sameBody=candidates.filter(v=>(vehicleCategory(v)||v.body)===body);
  sameBody.sort((a,b)=>Number(usedModelKey(b)===model)-Number(usedModelKey(a)===model));
  const sameBrand=candidates.filter(v=>v.brandSlug===vehicle.brandSlug&&!sameBody.includes(v));
  return [...sameBody,...sameBrand]
   .slice(0,3)
   .map(({kind,brandSlug,slug,name,image,body,powertrain,year,presentationImage,usedRecord})=>({kind,brandSlug,slug,name,image,body,powertrain,year,presentationImage,mileageKm:usedRecord?.mileageKm}));
 }
 const candidates=vehicles.filter(v=>v.kind==='new'&&v.body===vehicle.body&&v.brandSlug!==vehicle.brandSlug);
 if(vehicle.powertrain!=='To confirm'){
  candidates.sort((a,b)=>Number(b.powertrain===vehicle.powertrain)-Number(a.powertrain===vehicle.powertrain));
 }
 const brands=new Set<string>();
 const recommendations:DetailRecommendation[]=[];
 for(const {kind,brandSlug,slug,name,image,body,powertrain,year,presentationImage} of candidates){
  if(brands.has(brandSlug)) continue;
  brands.add(brandSlug);
  recommendations.push({kind,brandSlug,slug,name,image,body,powertrain,year,presentationImage});
  if(recommendations.length===4) break;
 }
 return recommendations;
}
