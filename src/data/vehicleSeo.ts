import type {Vehicle} from './catalog';
import {vehicleCategory} from './vehicleCategories';

export function vehicleTitle(vehicle:Vehicle) {
  return vehicle.kind==='new'
    ? `${vehicle.name} Specs & Sourcing`
    : `Used ${vehicle.name} from China`;
}

export function vehicleDescription(vehicle:Vehicle) {
  const key=`${vehicle.kind}/${vehicle.brandSlug}/${vehicle.slug}`;
  if(key==='new/chery/tiggo-8')return 'Compare Chery Tiggo 8 Tiger and Leopard 1.6T DCT versions, dimensions and WLTC fuel consumption. Request a quote for your exact configuration and destination.';
  if(key==='new/byd/seal-07-dm-i')return 'Compare BYD Seal 07 DM-i versions, labelled range figures and charging requirements. Request a configuration-specific sourcing quote for your destination.';
  if(key==='new/toyota/corolla')return 'Compare Toyota Corolla gasoline and hybrid specifications, equipment and buyer checks. Request a sourcing quote for your version, quantity and destination.';
  if(key==='new/jetour/traveler')return 'Compare Jetour Traveler engine and drivetrain versions. Check transport, parts and local support before requesting a configuration-specific sourcing quote.';
  if(vehicle.usedRecord)return `${vehicle.name}: supplied photos, recorded mileage: ${vehicle.usedRecord.mileageKm.toLocaleString('en-US')} km; first registration: ${vehicle.usedRecord.registrationMonth}. Ask about current availability and condition.`;
  if(vehicle.kind==='used')return `See the ${vehicle.name} past model reference. Request a dated offer with VIN, current mileage, registration and condition records before confirming availability.`;
  const category=vehicleCategory(vehicle);
  const focus=category==='Pickup'?'cab, bed, drivetrain and load documentation':category==='MPV'?'passenger or cargo layout, equipment and transport':({
    'Pure Electric':'range test cycles, charging and local support',
    PHEV:'electric range, engine and charging requirements',
    EREV:'range, charging and range-extender support',
    Hybrid:'hybrid configurations and maintenance support',
    Gasoline:'engine, equipment and local maintenance support',
    Diesel:'diesel configuration, documents and service support',
    'Gasoline + CNG':'dual-fuel equipment and maintenance requirements',
  } as Record<string,string>)[vehicle.powertrain]??'configuration, documents and local support';
  return `Compare ${vehicle.name} specifications and buyer checks for ${focus}. Request a sourcing quote for your version, quantity and destination.`;
}

export function vehicleStructuredData(vehicle:Vehicle, origin?:string) {
  const section=vehicle.kind==='new'?'new-cars':'used-cars';
  const label=vehicle.kind==='new'?'New Cars':'Used Cars';
  const url=(path:string)=>origin?new URL(path,origin).href:path;
  return {
    '@context':'https://schema.org',
    '@graph':[
      {
        '@type':'BreadcrumbList',
        itemListElement:[
          {'@type':'ListItem',position:1,name:'Home',item:url('/')},
          {'@type':'ListItem',position:2,name:label,item:url(`/${section}/`)},
          {'@type':'ListItem',position:3,name:vehicle.brand,item:url(`/${section}/${vehicle.brandSlug}/`)},
          {'@type':'ListItem',position:4,name:vehicle.name,item:url(`/${section}/${vehicle.brandSlug}/${vehicle.slug}/`)},
        ],
      },
      {
        '@type':'WebPage',name:vehicle.name,description:vehicleDescription(vehicle),
        about:{'@type':'Car',name:vehicle.name,brand:{'@type':'Brand',name:vehicle.brand},model:vehicle.modelName||vehicle.name},
        inLanguage:'en',
      },
    ],
  };
}
