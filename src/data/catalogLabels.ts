import {vehicleCategoryLabel} from './vehicleCategories';

// Display a natural label without changing catalog values or filter URLs.
export function powertrainLabel(powertrain:string) {
 return powertrain==='Pure Electric'?'Electric':powertrain;
}

// The source folder called Sedan includes both saloons and hatchbacks.
// Keep the existing category/query key; do not present it as a verified body specification.
export function bodyGroupLabel(body:string,_kind:'new'|'used'='new') {
 return body==='Sedan'||body==='MPV'?vehicleCategoryLabel(body):body;
}
