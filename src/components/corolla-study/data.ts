import {vehicles,vehicleHref} from '../../data/catalog';
import {assembleVehicleDetails} from '../../data/vehicleDetailAssembly';
import {modelScene} from '../../data/modelVisuals';
import {vehicleDisplayImage} from '../../data/imageDelivery';

export const corolla=assembleVehicleDetails(vehicles.find(v=>v.kind==='new'&&v.brandSlug==='toyota'&&v.slug==='corolla')!);
export const scene=modelScene(corolla)!;
export const alternatives=['toyota/camry','mg/mg5','mg/mg7','changan/uni-v'].map(key=>{
 const recorded=vehicles.find(v=>v.kind==='new'&&v.brandSlug+'/'+v.slug===key)!;
 const vehicle=assembleVehicleDetails(recorded);
 return {name:vehicle.name,year:vehicle.year,powertrain:vehicle.powertrain,href:vehicleHref(vehicle),image:vehicleDisplayImage(recorded.image),srcSet:undefined};
});
export type Alternative=(typeof alternatives)[number];
