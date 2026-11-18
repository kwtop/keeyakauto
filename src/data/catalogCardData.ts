import type {Vehicle} from './catalog';
import {vehicleCardPhoto} from './modelVisuals';

/** Only list/filter facts cross the catalog island boundary. */
export type CatalogCardData = Pick<Vehicle,'kind'|'brand'|'brandSlug'|'slug'|'name'|'year'|'body'|'category'|'powertrain'|'modelName'|'seats'|'engineSizeLitres'|'defaultVariantName'|'photoVersionNote'|'imagePosition'> & {
  photo: ReturnType<typeof vehicleCardPhoto>;
  variants?: {name:string}[];
  specs?: {field?:string;value:string}[];
  usedRecord?: Pick<NonNullable<Vehicle['usedRecord']>,'reference'|'trim'|'registrationMonth'|'mileageKm'>;
};

export function catalogCardData(vehicle:Vehicle):CatalogCardData {
  const {kind,brand,brandSlug,slug,name,year,body,category,powertrain,modelName,seats,engineSizeLitres,defaultVariantName,photoVersionNote,imagePosition,usedRecord}=vehicle;
  const engine=kind==='used'?vehicle.specs?.find(spec=>spec.field==='engine'):undefined;
  return {
    kind,brand,brandSlug,slug,name,year,body,category,powertrain,modelName,seats,defaultVariantName,photoVersionNote,imagePosition,
    photo:vehicleCardPhoto(vehicle),
    ...(engineSizeLitres !== undefined ? {engineSizeLitres} : {}),
    ...(vehicle.variants?.[0]?{variants:[{name:vehicle.variants[0].name}]}:{}),
    ...(engine?{specs:[{field:engine.field,value:engine.value}]}:{}),
    ...(usedRecord?{usedRecord:{reference:usedRecord.reference,trim:usedRecord.trim,registrationMonth:usedRecord.registrationMonth,mileageKm:usedRecord.mileageKm}}:{}),
  };
}
