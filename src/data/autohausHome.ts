import {model} from './voltaHome';
import imageSizes from './autohausImageSizes.json';
import sceneImages from './sceneDiversityHome.json';
import {siteImage} from './siteImagery';

export const artBase='/images/autohaus-home-20261019/';
export type ArtName=keyof typeof imageSizes;
export function art(name:ArtName){
 const reviewed=(sceneImages as Record<string,{src:string;width:number;height:number;srcSet:string}>)[name];
 if(reviewed)return {src:reviewed.src,width:reviewed.width,height:reviewed.height,srcset:reviewed.srcSet};
 const size=imageSizes[name];
 return {src:`${artBase}${name}.webp`,width:size.width,height:size.height,srcset:size.widths.map(w=>`${artBase}${name}${w===size.width?'':`-${w}`}.webp ${w}w`).join(', ')};
}
export const newSelection=[
 {vehicle:model('new','byd/seal-07-dm-i')},
 {vehicle:model('new','jetour/traveler')},
 {vehicle:model('new','gwm/poer')},
 {vehicle:model('new','wuling/yangguang')}
] as const;
export const usedSelection=['aion/s','byd/seagull','toyota/bz3x','wuling/starlight-730-ev'].map(key=>({vehicle:model('used',key)}));

export const editorial='/images/volta-editorial-20261019/';
export const services=[
 {title:'Find your model',text:'Compare models, versions and the details that matter for your market.',href:'/export-services/buying-guide/',image:siteImage('choose-coastal').src,alt:'Toyota Camry and model selection by the coast — editorial illustration'},
 {title:'Look a little closer',text:'Agree the inspection scope and the records you need before ordering.',href:'/export-services/sourcing-inspection/',image:siteImage('inspection-detail').src,alt:'Paintwork inspection detail — editorial illustration'},
 {title:'Plan the journey',text:'Discuss documents, transport and handover for your destination.',href:'/export-services/shipping-support/',image:siteImage('loading-path').src,alt:'Passenger-car transport planning — editorial illustration'}
];
export const storyPhotos=[
 {src:'/images/nest-home-20261018/cabin-detail.webp',alt:'Passenger-car cabin detail',href:'/new-cars/'},
 {src:artBase+'story-camry-detail.webp',alt:'Toyota Camry front wheel and paintwork — edited editorial detail',href:'/new-cars/toyota/camry/'},
 {src:siteImage('guide-support').src,alt:'Toyota Camry front detail and support planning — editorial illustration',href:'/export-services/after-sales/#coverage'},
 {src:siteImage('ship-harbor').src,alt:'Toyota Camry at a vehicle-carrier ramp — editorial illustration',href:'/export-services/shipping-support/'},
 {src:artBase+'story-car-pair.webp',alt:'Toyota Camry and RAV4 at a coastal viewpoint — editorial illustration',href:'/about/'}
];
