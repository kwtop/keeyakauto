import type {Vehicle,VehicleVariant} from './catalog';
import {countryGuidePath,purchaseGuidePath,type GuideLink} from './guideEditorial';
import {vehicleCategory} from './vehicleCategories';
export type BuyerCheck={title:string;body:string;icon?:'layout'|'battery'|'engine'|'inspection'|'quote'|'load'};
export type BuyerChecks={heading:string;intro:string;checks:BuyerCheck[];links:GuideLink[]};
type Selection={selected?:VehicleVariant;unlisted?:boolean};
const guide=purchaseGuidePath;
const content:Record<string,BuyerChecks>={
 'new/byd/seal-07-dm-i':{
  heading:'Buying the BYD Seal 07 DM-i for your market',
  intro:'Compare the exact DM-i version, its test figures and the charging equipment you will use after arrival.',
  checks:[
   {title:'Compare range on the same basis',icon:'battery',body:'Keep electric-only range, combined range and depleted-battery fuel consumption separate. Match WLTC figures with WLTC and CLTC with CLTC. A range number in a trim name is not a substitute for the labelled specification.'},
   {title:'Confirm the charging setup',icon:'battery',body:'Request photographs and specifications for the AC and DC inlets fitted to the offered version. Give the local charger operator the connector, protocol and electrical requirements before relying on an adapter.'},
   {title:'Put the version on the offer',icon:'quote',body:'Record the model year, engine, battery version and included equipment together. Ask which manuals, diagnostic support and parts arrangements cover that configuration at your destination.'},
  ],links:[{label:'Check charging compatibility',href:guide('chinese-ev-charging-standards')},{label:'Compare FOB and CIF costs',href:guide('exw-fob-cif-car-shipping')},{label:'Bolivia: review the vehicle requirements',href:countryGuidePath('bolivia')}],
 },
 'new/toyota/corolla':{
  heading:'Choosing a Toyota Corolla version for an import order',
  intro:'Use the gasoline or hybrid configuration in the version selector as the starting point for your written requirements.',
  checks:[
   {title:'Match the drivetrain and equipment',icon:'layout',body:'Two cars can both be called Corolla and look alike but carry different engines and equipment. Confirm the production year and full trim name, then check the engine, transmission and equipment for that exact version.'},
   {title:'Plan maintenance at the destination',icon:'engine',body:'Ask your workshop at home whether it can get parts, service information and diagnostic tools for this drivetrain. For the hybrid, check they can test the battery too.'},
   {title:'Compare quotations on equal terms',icon:'quote',body:'Give every supplier the same version, quantity and delivery point. Ask for inspection, transport and documents as separate lines, so nothing is quietly left out of the price.'},
  ],links:[{label:'Prepare a wholesale quote request',href:guide('request-wholesale-car-quote')},{label:'Review the document checklist',href:guide('car-import-documents-checklist')},{label:'Bolivia: check the import file',href:countryGuidePath('bolivia')}],
 },
 'new/jetour/traveler':{
  heading:'Check the Jetour Traveler configuration before ordering',
  intro:'The Traveler range includes different engines and drivetrains. Match the selected version to the work and support available in your market.',
  checks:[
   {title:'Identify 2WD or 4WD precisely',icon:'layout',body:'Check the selected engine, transmission and drive system. Confirm any drive modes or traction equipment in the written offer rather than inferring them from the model badge or photography.'},
   {title:'Specify the intended use',icon:'load',body:'Describe road conditions, passenger and luggage needs, climate and expected mileage. Ask the supplier to confirm the offered tyres, cooling equipment, manuals and relevant operating limits for that version.'},
   {title:'Agree transport and local support',icon:'quote',body:'Give the forwarder the actual dimensions and vehicle list for the shipping quote. Before accepting a batch, identify who will supply parts, diagnose faults and review any arrival discrepancy.'},
  ],links:[{label:'Compare RoRo and container shipping',href:guide('container-vs-roro-car-shipping')},{label:'Confirm warranty and support',href:guide('car-warranty-and-after-sales')},{label:'Algeria: identify the correct import route',href:countryGuidePath('algeria')}],
 },
};
export function vehicleBuyerChecks(vehicle:Vehicle,selection:Selection={}):BuyerChecks{
 if(vehicle.kind==='new'&&selection.unlisted)return {
  heading:`Confirm the ${vehicle.name} version before ordering`,
  intro:'The linked version is not listed. Resolve its original designation before using another version’s specifications.',
  checks:[
   {title:'Identify the version',body:'Send the original trim designation and manufacturer information with your request. Ask the supplier to identify the engine, battery if fitted, drivetrain and equipment for that exact configuration.',icon:'layout'},
   {title:'Get matching evidence',body:'Request a specification sheet and current photographs for the proposed version. Keep its vehicle documents and any test-cycle figures with the same configuration file.',icon:'inspection'},
   {title:'Define the order',body:'State your quantity, receiving market and delivery point. Obtain a written configuration and itemized offer before accepting a substitute version.',icon:'quote'},
  ],links:[{label:'Prepare a wholesale quote request',href:guide('request-wholesale-car-quote')},{label:'Check import and registration requirements',href:guide('check-car-import-eligibility')},{label:'Review the document checklist',href:guide('car-import-documents-checklist')}],
 };
 if(vehicle.kind==='used'&&vehicle.brandSlug==='byd'&&vehicle.slug==='seagull'&&vehicle.powertrain==='Pure Electric'&&vehicle.usedRecord&&!vehicle.usedRecord.needsReview){
  const record=vehicle.usedRecord;
  return {heading:'Check this used BYD Seagull offer',intro:`The supplied record lists ${record.mileageKm.toLocaleString('en-US')} km and first registration in ${record.registrationMonth}. Current availability and condition need a dated offer for the individual car.`,checks:[
   {title:'Match the record to the car',icon:'layout',body:'Request the VIN, current odometer reading, registration record and dated exterior and interior photographs. Match them to the offered trim and resolve any difference from the supplied record before payment.'},
   {title:'Ask for useful battery evidence',icon:'battery',body:'Request a report linked to the VIN and odometer, with its date, provider and test method. Check available repair history, fault codes and charging results; the brochure range says nothing about this battery today.'},
   {title:'Confirm charging and delivery condition',icon:'quote',body:'Have the local charging provider review the actual AC and DC equipment. Agree the inspection scope, any repairs, included keys and accessories, and who records and resolves differences at arrival.'},
  ],links:[{label:'Read the battery-report checklist',href:guide('used-ev-battery-report')},{label:'Verify a used car before payment',href:guide('verify-chinese-used-car-before-payment')},{label:'Algeria: check the resident and dealer routes',href:countryGuidePath('algeria')}]};
 }
 if(vehicle.kind==='used')return usedBuyerChecks(vehicle);
 return content[`${vehicle.kind}/${vehicle.brandSlug}/${vehicle.slug}`]??newBuyerChecks(vehicle,selection.selected);
}

const isPlugIn=(powertrain:string)=>['Pure Electric','PHEV','EREV'].includes(powertrain);

function powertrainCheck(powertrain:string):BuyerCheck{
 switch(powertrain){
  case 'Pure Electric':return {title:'Confirm range and charging',body:'Compare range figures under the same test cycle. Ask for the battery version, supported charging modes and inlet photographs. Have the charger operator at your destination review the offered vehicle’s compatibility.',icon:'battery'};
  case 'PHEV':return {title:'Check the plug-in hybrid configuration',body:'Keep electric-only range and depleted-battery fuel consumption separate, with the test cycle for each figure. Confirm the offered engine, battery version, charging modes and inlet before comparing quotations.',icon:'battery'};
  case 'EREV':return {title:'Plan battery and fuel use',body:'Request electric-only range and any extended-range figure with their stated test cycles. Confirm charging equipment, fuel requirements and the maintenance support for the offered range-extender configuration.',icon:'battery'};
  case 'Hybrid':return {title:'Check the hybrid system and support',body:'Confirm the engine, hybrid battery and transmission for the offered version, including whether external charging applies. Ask your receiving workshop about diagnostics, battery service and parts for that drivetrain.',icon:'engine'};
  case 'Gasoline + CNG':return {title:'Review the dual-fuel equipment',body:'Confirm the engine, CNG system and tank specifications in the offer. Ask your receiving workshop to review refuelling access, cylinder documentation and maintenance requirements for the proposed configuration.',icon:'engine'};
  case 'Gasoline':case 'Diesel':return {title:'Check the engine and service requirements',body:`Confirm the ${powertrain.toLowerCase()} engine, transmission, drive system and emissions documents for the offered version. Ask for its fuel specification and maintenance schedule, and check local diagnostic tools and parts access.`,icon:'engine'};
  default:return {title:'Resolve the powertrain first',body:'Ask for the engine, fuel type, battery if fitted and drivetrain on the written offer. Resolve any missing or conflicting source details before relying on range, consumption or service assumptions.',icon:'inspection'};
 }
}

function useCheck(vehicle:Vehicle):BuyerCheck{
 switch(vehicleCategory(vehicle)){
  case 'Pickup':return {title:'Match the cab, bed and intended load',body:'Confirm the cab and bed layout, drive system and quoted payload rating for the exact version. Describe the passengers, cargo and roads it will serve; ask which load and operating limits apply to the offered configuration.',icon:'load'};
  case 'MPV':return {title:'Confirm the passenger or cargo layout',body:'Check the seat layout, access doors, cargo dimensions and any quoted load limit for the offered version. Give the receiving importer the intended passenger or goods use together with the vehicle documents.',icon:'load'};
  case 'SUV':return {title:'Match the drive system to your use',body:'Confirm 2WD or 4WD and any traction equipment on the written offer. Describe your roads, passenger and luggage needs, climate and expected mileage so the supplier can confirm the relevant equipment and operating limits.',icon:'layout'};
  default:return {title:'Check the equipment you will use',body:'Confirm the seating and luggage layout, steering side, language and connectivity for the offered version. List essential equipment in the order brief and ask for photographs or documentation where a feature matters to your decision.',icon:'layout'};
 }
}

function newBuyerChecks(vehicle:Vehicle,selected?:VehicleVariant):BuyerChecks{
 const powertrain=selected?.powertrain??vehicle.powertrain;
 const commercial=['Pickup','MPV'].includes(vehicleCategory(vehicle));
 const quote={label:'Prepare a wholesale quote request',href:guide('request-wholesale-car-quote')};
 return {
  heading:`Buying the ${vehicle.name} for your market`,
  intro:`Match the ${vehicle.name} version to its intended use, destination requirements and the support available after arrival.`,
  checks:[useCheck(vehicle),powertrainCheck(powertrain),{
   title:commercial?'Price the complete vehicle and transport':'Agree delivery and local support',
   body:commercial?'Give the forwarder the offered body’s dimensions and shipping weight. Request separate costs for preparation, inspection, transport and documents, then confirm parts, diagnostics and any warranty terms in writing.':'Request itemized preparation, inspection, freight and document costs to one named delivery point. Before accepting an order, identify who will supply parts, diagnose faults and handle any agreed warranty or arrival discrepancy.',
   icon:'quote',
  }],
  links:isPlugIn(powertrain)?[{label:'Check charging compatibility',href:guide('chinese-ev-charging-standards')},quote,{label:commercial?'Compare container and RoRo shipping':'Confirm warranty and support',href:guide(commercial?'container-vs-roro-car-shipping':'car-warranty-and-after-sales')}]:[quote,{label:'Review the document checklist',href:guide('car-import-documents-checklist')},{label:commercial?'Compare container and RoRo shipping':'Confirm warranty and support',href:guide(commercial?'container-vs-roro-car-shipping':'car-warranty-and-after-sales')}],
 };
}

function usedBuyerChecks(vehicle:Vehicle):BuyerChecks{
 const record=vehicle.usedRecord,powertrain=vehicle.powertrain;
 const battery=['Pure Electric','PHEV','EREV','Hybrid'].includes(powertrain);
 const identified=['Gasoline','Diesel','Gasoline + CNG'].includes(powertrain)||battery;
 const commercial=['Pickup','MPV'].includes(vehicleCategory(vehicle));
 return {
  heading:`Before buying a used ${vehicle.name}`,
  intro:record?`The supplied record lists ${record.mileageKm.toLocaleString('en-US')} km and first registration in ${record.registrationMonth}. Confirm current availability and condition in a dated offer for the individual car.`:`This ${vehicle.name} page is a past model reference without a current unit-specific mileage or registration record. Request a dated, VIN-linked offer before treating a car as available.`,
  checks:[
   {title:'Match the record to the offered car',body:'Request the VIN, current odometer reading, registration and ownership records, and dated exterior and interior photographs. Match them to the offered trim.'+(record?.needsReview?' Resolve the flagged source details against the vehicle documents before payment.':' Resolve any difference from the reference before payment.'),icon:'layout'},
   !identified?{title:'Resolve the drivetrain and condition',body:'Confirm the fuel type and drivetrain from the vehicle documents before choosing battery or engine tests. Request an inspection report covering repairs, damage, fault codes and anything the inspector could not verify.',icon:'inspection'}:battery?{title:powertrain==='Pure Electric'?'Review the battery evidence':'Review battery and drivetrain evidence',body:'Request a report tied to the VIN and odometer, with its date, provider and test method. Review repair history, fault codes and functional tests.'+(powertrain==='Pure Electric'?' The brochure range says nothing about the battery’s condition today.':' Include engine and transmission checks appropriate to the confirmed configuration.'),icon:'battery'}:{title:'Inspect condition and mechanical operation',body:'Request a VIN-linked inspection covering repairs, damage, engine and transmission operation, underbody condition and fault codes. Ask the provider to record its test conditions, exclusions and anything it could not verify.',icon:'inspection'},
   {title:commercial?'Confirm the layout and handover':'Agree the delivery condition',body:(commercial?'Confirm the offered seat or cargo layout, load documentation and dimensions for transport. ':isPlugIn(powertrain)?'Have your charging provider review the fitted interfaces and supported charging modes. ':'')+'Agree any repairs, included keys and accessories, payment and delivery terms. Name the party that records and resolves differences at arrival.',icon:'quote'},
  ],links:[{label:isPlugIn(powertrain)?'Read the battery-report checklist':'Review the used-car inspection checklist',href:guide(isPlugIn(powertrain)?'used-ev-battery-report':'inspect-a-used-car-from-china')},{label:'Verify a used car before payment',href:guide('verify-chinese-used-car-before-payment')},{label:'Compare written export offers',href:guide('compare-car-export-quotes')}],
 };
}
