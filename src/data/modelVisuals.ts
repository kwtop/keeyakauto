import scenes from './modelScenes.json';
import upgradedScenes from './siteModelScenes.json';
import completedScenes from './catalogColourScenes.json';
import commercialScenes from './commercialVehicleScenes.json';
import suppliedScenes from './suppliedModelScenes.json';
import catalogLeftPhotos from './catalogLeftPhotos.json';
import {vehicleDisplayImage} from './imageDelivery';
import usedPhotoDelivery from './used-car-photo-delivery.json';
import usedShowroomCovers from './used-car-showroom-covers.json';
import type {Vehicle} from './catalog';
export type ModelScene={src:string;srcSet:string;original:string;alt:string;note:string};
type CardPhoto = {src: string; srcSet?: string; 'data-ai-showroom'?: 'true'};
const showroomCovers = usedShowroomCovers as Record<string, {src: string; srcSet: string}>;
export const modelScene=(vehicle:Pick<Vehicle,'kind'|'brandSlug'|'slug'>):ModelScene|undefined=>
  vehicle.kind==='used'?undefined:(suppliedScenes as Record<string,ModelScene>)[vehicle.brandSlug+'/'+vehicle.slug]??(commercialScenes as Record<string,ModelScene>)[vehicle.brandSlug+'/'+vehicle.slug]??(completedScenes as Record<string,ModelScene>)[vehicle.brandSlug+'/'+vehicle.slug]??(upgradedScenes as Record<string,ModelScene>)[vehicle.brandSlug+'/'+vehicle.slug]??(scenes as Record<string,ModelScene>)[vehicle.brandSlug+'/'+vehicle.slug];

/** The legacy UNI-V scene depicts a crossover, not the recorded sedan. */
export function detailModelScene(vehicle:Pick<Vehicle,'kind'|'brandSlug'|'slug'>){
 const scene=modelScene(vehicle);
 return scene?.src==='/images/catalog-left-scenes-20261021/changan-uni-v-left.webp'?undefined:scene;
}

/** Cover imagery is separate from the vehicle's original photo gallery. */
export function vehicleCardPhoto(vehicle:Pick<Vehicle,'kind'|'brandSlug'|'slug'|'image'|'presentationImage'>): CardPhoto {
 if(vehicle.kind==='used'){
  const showroom = showroomCovers[`${vehicle.brandSlug}/${vehicle.slug}`];
  if (showroom) return {src: showroom.src, srcSet: showroom.srcSet, 'data-ai-showroom': 'true'};
  const src=vehicle.presentationImage?.src||vehicle.image;
  const delivery=(usedPhotoDelivery as Record<string,{src:string;srcSet:string}>)[src];
  return {src:delivery?.src||vehicleDisplayImage(src),srcSet:delivery?.srcSet};
 }
 const scene=modelScene(vehicle);
 const leftSource=vehicle.kind==='new'?(catalogLeftPhotos as Record<string,string>)[vehicle.brandSlug+'/'+vehicle.slug]:undefined;
 return {src:scene?.src||vehicleDisplayImage(leftSource||vehicle.image),srcSet:scene?.srcSet};
}
/** Editorial entry points can use a reviewed scene; original views stay in galleries. */
export function modelCoverPhoto(vehicle:Vehicle): CardPhoto {
 if(vehicle.kind==='used')return vehicleCardPhoto(vehicle);
 const scene=modelScene(vehicle);
 return {src:scene?.src||vehicleDisplayImage(vehicle.image),srcSet:scene?.srcSet};
}
