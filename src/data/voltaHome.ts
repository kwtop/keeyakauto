import {vehicles, type Vehicle} from './catalog';
import {vehicleDisplayImage} from './imageDelivery';
import {siteImage} from './siteImagery';

export const model = (kind:Vehicle['kind'],key:string) => {
  const item=vehicles.find(v=>v.kind===kind&&`${v.brandSlug}/${v.slug}`===key);
  if(!item)throw new Error(`Missing homepage model: ${kind}/${key}`);
  return item;
};
export const newModels=['toyota/camry','byd/yuan-plus','jetour/traveler','toyota/rav4','volkswagen/id-3','geely/boyue','toyota/corolla','wuling/bingo'].map(key=>model('new',key));
export const usedModels=['aion/s','byd/seagull','toyota/bz3x','wuling/starlight-730-ev','toyota/crown-vellfire-hybrid','jetour/traveler-c-dm','volkswagen/t-cross'].map(key=>model('used',key));
export const categories=[
 {title:'Sedans',detail:`${vehicles.filter(v=>v.kind==='new'&&v.body==='Sedan').length} model references`,href:'/new-cars/?body=Sedan',vehicle:newModels[0]},
 {title:'SUVs',detail:`${vehicles.filter(v=>v.kind==='new'&&v.body==='SUV').length} model references`,href:'/new-cars/?body=SUV',vehicle:newModels[2]},
 {title:'Electric cars',detail:`${vehicles.filter(v=>v.kind==='new'&&v.powertrain==='Pure Electric').length} model references`,href:'/new-cars/?power=Pure+Electric',vehicle:newModels[1]},
 {title:'Hybrid cars',detail:`${vehicles.filter(v=>v.kind==='new'&&v.powertrain==='Hybrid').length} model references`,href:'/new-cars/?power=Hybrid',vehicle:newModels[3]},
 {title:'New cars',detail:`${vehicles.filter(v=>v.kind==='new').length} model references`,href:'/new-cars/',vehicle:newModels[7]},
 {title:'Used cars',detail:`${vehicles.filter(v=>v.kind==='used').length} vehicle records`,href:'/used-cars/',vehicle:usedModels[0]},
];
export const imageFor=(vehicle:Vehicle)=>vehicleDisplayImage(vehicle.image);
export const media='/images/volta-home-20261019/';
export const editorialMedia='/images/volta-editorial-20261019/';
export const editorialSrcset=(src:string,width:number)=>src.startsWith(editorialMedia)
  ? [...[320,640,960].filter(w=>w<width).map(w=>`${src.replace('.webp',`-${w}.webp`)} ${w}w`),`${src} ${width}w`].join(', ')
  : undefined;
export const planning=[
 {title:'Buying guide',text:'Know what to confirm before agreeing an order.',href:'/export-services/buying-guide/',icon:'book'},
 {title:'Compare models',text:'Compare body style, powertrain and recorded specifications.',href:'/guides/comparisons/',icon:'compare'},
 {title:'Destination checks',text:'Review market requirements before choosing a version.',href:'/export-services/buying-guide/#country-guides',icon:'globe'},
 {title:'Sourcing & inspection',text:'Agree the search and the records you need for each car.',href:'/export-services/sourcing-inspection/',icon:'check'},
 {title:'Shipping & support',text:'Confirm the route, handover and support responsibilities.',href:'/export-services/shipping-support/',icon:'ship'},
 {title:'Your inquiry brief',text:'Keep your models, quantities and destination together.',href:'/quote/',icon:'file'},
];
export const journey=[
 {title:'Choose',text:'Find the model and version that fit your market.',label:'Browse cars',href:'/new-cars/',image:siteImage('choose-coastal').src,alt:'AI-edited editorial illustration of a person comparing cars beside a Toyota Camry, not a customer record',position:'50% 50%',color:'#14744F'},
 {title:'Check',text:'Agree the inspection scope and review the findings.',label:'Plan an inspection',href:'/export-services/sourcing-inspection/#scope',image:editorialMedia+'check-detail.webp',alt:'AI-edited illustration of a paint-thickness check, not a KEEYAK inspection record',position:'50% 50%',color:'#BA7517'},
 {title:'Ship',text:'Prepare documents, transport and handover together.',label:'Plan shipping',href:'/export-services/shipping-support/',image:siteImage('ship-harbor').src,alt:'AI-edited Toyota Camry roll-on roll-off transport illustration, not an actual shipment',position:'50% 50%',color:'#14744F'},
 {title:'Discuss',text:'Speak with KEEYAK about the requirement behind your order.',label:'Contact the team',href:'/contact/',image:'/images/keeyak-home-source-20261019/office-visitor-group.webp',alt:'Original KEEYAK office visitor photograph',position:'50% 50%',color:'#534AB7'},
];
