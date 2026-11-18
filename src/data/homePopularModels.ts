import {vehicles,vehicleHref} from './catalog';
import {vehicleCardPhoto} from './modelVisuals';
import {vehicleCategory} from './vehicleCategories';
import {popularVehicleModels} from './popularVehicleModels';

type PopularModel = {
  key:string;
  name:string;
  category:string;
  href:string;
  linkLabel:string;
  image:{src:string;srcSet?:string;alt:string};
};

function catalogModel(key:string):PopularModel {
  const vehicle=vehicles.find(item=>`${item.kind}/${item.brandSlug}/${item.slug}`===key);
  if(!vehicle)throw new Error(`Missing popular homepage model: ${key}`);
  const category=vehicleCategory(vehicle);
  return {
    key,
    name:vehicle.name,
    category:category==='MPV'?'Van':category,
    href:vehicleHref(vehicle),
    linkLabel:`View ${vehicle.name} details`,
    image:{...vehicleCardPhoto(vehicle),alt:`${vehicle.name} model reference`}
  };
}

// Owner-selected models with matching catalog detail pages.
export const homePopularModels = popularVehicleModels.map(catalogModel);
