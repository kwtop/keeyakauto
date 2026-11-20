import type {Vehicle,VehicleVariant} from './catalog';
import {vehicleCategory} from './vehicleCategories';
import {findSpec} from '../components/vehicle-detail/presentation';
import {specificationText} from './keySpecifications';
import {productPowertrainCopy,productSearchName} from './productLongTail';
import {isNewCorolla} from './corollaKeywordTargets';
import {corollaProductEditorial} from './corollaProductEditorial';
import {productGuideTopics,type ProductGuideIcon} from './productGuideTopics';

export type ProductQuestion={q:string;paragraphs:string[]};
export type ProductEditorial={heading:string;intro:string;focus:string;selectionHeading:string;technicalHeading:string;technicalNoteHeadings?:string[];technicalNoteIcons?:ProductGuideIcon[];selection:string;technical:string;logistics:string;questions:ProductQuestion[]};
export type EditorialSelection={selected?:VehicleVariant;unlisted?:boolean};
const topicAnchors:Record<string,string[]>={
 "Pure Electric": [
  "battery capacity",
  "electric range",
  "test cycle",
  "charging inlet",
  "AC charging",
  "DC charging",
  "charging accessories",
  "battery diagnostics"
 ],
 "PHEV": [
  "electric-only range",
  "depleted-battery fuel consumption",
  "test cycle",
  "battery capacity",
  "charging inlet",
  "charging capability",
  "engine specification",
  "battery diagnostics"
 ],
 "EREV": [
  "electric-only range",
  "range extender",
  "battery capacity",
  "test cycle",
  "charging inlet",
  "charging capability",
  "fuel requirements",
  "battery diagnostics"
 ],
 "Hybrid": [
  "hybrid system",
  "hybrid battery",
  "engine specification",
  "fuel consumption",
  "test cycle",
  "drive configuration",
  "diagnostic support",
  "service schedule"
 ],
 "Gasoline": [
  "engine specification",
  "engine displacement",
  "fuel consumption",
  "test cycle",
  "drive configuration",
  "emissions documents",
  "diagnostic support",
  "service schedule"
 ],
 "Diesel": [
  "diesel engine",
  "engine displacement",
  "fuel consumption",
  "test cycle",
  "drive configuration",
  "emissions documents",
  "diagnostic support",
  "service schedule"
 ],
 "Gasoline + CNG": [
  "CNG system",
  "engine displacement",
  "fuel consumption",
  "fuel specification",
  "cylinder documentation",
  "refuelling access",
  "diagnostic support",
  "service schedule"
 ],
 "To confirm": [
  "powertrain identification",
  "configuration file",
  "technical documents",
  "vehicle identification",
  "inspection scope",
  "equipment verification",
  "service information",
  "source records"
 ]
};

export function productKeywordAnchors(vehicle:Vehicle,powertrain=vehicle.powertrain){
 return [vehicle.kind==='new'?'version comparison':'vehicle history','price','export quote','sourcing from China','pre-shipment inspection','shipping dimensions','import documents','spare parts','maintenance','warranty','equipment list','delivery terms',...(vehicle.kind==='new'?['model year','seating layout','transmission','vehicle specifications']:['recorded mileage','first registration','VIN','condition report']),...(topicAnchors[powertrain]??topicAnchors['To confirm'])];
}

function specSummary(vehicle:Vehicle,selected?:VehicleVariant,unlisted=false){
 if(unlisted)return 'This linked version is not listed. Resolve the version reference before using figures from another configuration.';
 const specs=selected?.specs??vehicle.specs??[];
 const get=(field:string)=>findSpec(specs,field);
 const engine=get('engine'),gearbox=get('transmission'),range=get('electricRange'),energy=get('batteryEnergy'),fuel=get('fuelConsumption'),depleted=get('depletedFuel'),dimensions=get('dimensions');
 const sentences:string[]=[];
 if(engine)sentences.push(`The engine is listed as ${engine.value}${gearbox?`, paired with ${gearbox.value} transmission`:''}.`);
 else if(gearbox)sentences.push(`This version lists ${gearbox.value} transmission.`);
 if(range)sentences.push(`Its listed electric range is ${specificationText(range)}${energy?`, with battery energy of ${specificationText(energy)}`:''}.`);
 else if(energy)sentences.push(`Battery energy is listed at ${specificationText(energy)}.`);
 if(fuel)sentences.push(`The fuel consumption reference is ${specificationText(fuel)}.`);
 if(depleted)sentences.push(`Depleted-battery fuel consumption is listed at ${specificationText(depleted)}.`);
 if(!sentences.length&&dimensions)sentences.push(`The listed dimensions are ${specificationText(dimensions)}.`);
 return sentences.length?sentences.join(' '):'A complete technical sheet is needed before comparing performance or consumption for the proposed version.';
}

export function productEditorial(vehicle:Vehicle,focus:string,selection:EditorialSelection={}):ProductEditorial{
 const {selected,unlisted}=selection;
 const used=vehicle.kind==='used',name=productSearchName(vehicle);
 const aionUt=!used&&vehicle.brandSlug==='aion'&&vehicle.slug==='ut';
 const powertrain=unlisted?'To confirm':selected?.powertrain??vehicle.powertrain;
 const technical=productPowertrainCopy(name,powertrain);
 const guideTopics=productGuideTopics(powertrain);
 const variants=(vehicle.variants??[]).filter(v=>v.technicalReference?.status==='documented');
 const category=vehicleCategory(vehicle);
 const seating=selected?.seats??vehicle.seats;
 const intro=used
  ? `With a used car, the history matters more than the brochure. Before comparing a ${name} price, check the car’s records and a recent condition report, then use the ${name} specifications below to confirm it’s the version you think it is. Listings go out of date quickly, so ask us for a current offer.`
  : unlisted?`Send us the original version reference with your ${name} price enquiry. We need to pin down the exact version before the ${name} specifications or any price comparison mean much.`
  : aionUt?'To compare the AION UT price fairly, ask every supplier to quote the same model year, version and equipment list, and check the AION UT specifications on each offer. Ask for preparation and delivery as separate lines.'
  : `A ${name} price is only worth comparing if every quote describes the same car. Give every supplier the same model year, drivetrain and equipment list, and make sure the ${name} specifications are written on the quote. Ask for preparation and delivery as separate lines.`;
 const selectedText=specSummary(vehicle,selected,unlisted);
 const differences=['powertrain','engine','transmission','electricRange','dimensions','seats'].flatMap(field=>{
  const values=[...new Set(variants.flatMap(variant=>{const spec=findSpec(variant.specs,field);return spec?[specificationText(spec)]:[];}))];
  if(values.length<2)return [];
  const listed=values.join('; ');
  switch(field){
   case 'powertrain':return [`The versions shown cover ${values.join(' and ')} powertrains.`];
   case 'engine':return [`Their engine specifications are ${listed}.`];
   case 'transmission':return [`Transmission choices include ${listed}.`];
   case 'electricRange':return [`The labelled electric range figures are ${listed}.`];
   case 'dimensions':return [`Body dimensions vary across the versions shown: ${listed}.`];
   default:return [`The seating options shown are ${listed}.`];
  }
 }).slice(0,2);
 const record=vehicle.usedRecord;
 const selectionText=used
  ? record?`The supplied record shows ${record.mileageKm.toLocaleString('en-US')} km, with first registration in ${record.registrationMonth}. To check the recorded mileage, request a current odometer photo and a condition report bearing the same VIN.${record.needsReview?' Some source details are flagged for review; resolve them against the vehicle documents before payment.':''}`:'No unit-specific recorded mileage or first registration is supplied for this past listing. Ask for the VIN and a dated condition report for the car now being proposed.'
  : unlisted?'The linked version is not listed; its model year, seating layout and transmission must be resolved from the original version reference. Do not substitute the default version’s specification.'
  : aionUt?`${selected?`For the ${selected.name}, ask`:'For the version you choose, ask'} the supplier to match the vehicle specifications in the table, including transmission and seating layout. Have the supplier list the battery version and any included charging cable on the offer.`
  : `${selected?`The version shown is ${selected.name}. `:''}${seating?`The reference lists ${seating} seats. `:''}Check the transmission and seating layout against the supplier’s equipment list. If a feature is essential to your purchase, have it named on the quote for that model year.`;
 const logistics=`Freight is priced on size and weight, so your forwarder needs the ${name} shipping dimensions as the car will actually travel, including anything fitted to it.${category==='Pickup'?' Identify the cab, cargo bed and accessories, with load ratings from the vehicle documents.':category==='MPV'?' Identify the passenger or cargo body and any interior conversion.':''} Agree the delivery terms and handover point before booking. Your importer or broker should check the ${name} import documents against your country’s rules for this configuration.`;
 const questions:ProductQuestion[]=[
  used?{q:'How do I match the documents to the car?',paragraphs:[`Match the VIN on the registration and vehicle history documents to the dated offer and a current odometer photo. Recent exterior, interior and underbody photographs help you decide what to include in the inspection.`,record?.needsReview?'Resolve the flagged source details with the seller before paying a deposit.':'The seller should explain any difference between the earlier record and the car now offered.']}
   :{q:'Which version should I choose?',paragraphs:unlisted?[selectionText]:differences.length?[differences.join(' '),'Ask for a trim-specific equipment schedule before choosing between versions.']:['For equipment differences outside the documented technical details, request a trim-specific schedule. Put the chosen version name on the enquiry so suppliers quote for the same configuration.']},
  {q:used?'What needs to be in the condition report?':'Which performance figures can I compare?',paragraphs:used?[`A useful condition report identifies the drivetrain, previous repairs and warning codes, then explains the tests and their limits. ${['Pure Electric','Hybrid','PHEV','EREV'].includes(powertrain)?'Battery findings need the test method, date and odometer reading; catalogue range cannot establish the car’s remaining capacity.':'Read the engine and transmission operating checks alongside the maintenance history.'}`,'Agree the inspection tests and acceptance criteria before payment, including how the inspector will record any areas that could not be verified.']:(unlisted||powertrain==='To confirm')?['Identify the drivetrain from the original technical documents before comparing range, fuel consumption or output. Another version’s figures cannot fill a gap in the offer.','Have the supplier resolve the missing version details and state the test cycle and output basis on the supporting specification.']:[powertrain==='Pure Electric'?'Compare electric range measured under the same test cycle. Keep motor output in kW and battery energy in kWh; they answer different questions.':['PHEV','EREV'].includes(powertrain)?'Electric-only range, combined range and depleted-battery consumption describe different operating conditions. Compare each figure under its own test cycle and operating basis.':'Use the same test cycle when comparing fuel consumption. An output figure also needs to say whether it describes the engine, motor or combined system.','Use figures for the selected version. If a range or output figure has no label, get its basis explained before using it to choose between offers.']},
  {q:`What should a ${name} export quote include?`,paragraphs:[`Send us ${used?'the VIN or trim, the equipment list and the condition you need':'the model year, full version name, colour and equipment list'}, plus quantity and destination. A proper export quote gives the vehicle price, the currency and how long the price holds.`, 'It should also name the term, EXW, FOB or CIF, and the port or pickup point. We list inspection, inland transport, freight and insurance separately so you can see exactly what’s covered and what you still need to arrange.']},
  {q:`What should a ${name} pre-shipment inspection cover?`,paragraphs:[`Agree what counts as acceptable before the inspector goes out. A good report ties the findings to the car’s VIN, checks the equipment against the offer and covers the exterior, interior and how everything works.${category==='Pickup'?' Include the cab, bed, underbody and fitted cargo-body equipment.':category==='MPV'?' Include the access doors and actual seat or cargo layout.':''}`,'The report should also say when the car was checked and what wasn’t tested. If something turns up, agree with the seller what gets fixed before the car is released.']},
  {q:'What does the forwarder need before shipment?',paragraphs:[logistics,'Ask your importer to confirm the car meets local requirements before it ships. A model appearing on our site doesn’t mean it can be registered in your country.']},
  {q:`How do I arrange ${name} spare parts and support?`,paragraphs:[`Before you commit, ask your workshop whether it can handle ${name} maintenance: give them the ${used?'VIN and drivetrain':'exact version and drivetrain'} and check they can get parts and diagnostic tools. The offer should say who fixes agreed repairs or problems found on arrival.`, `If the seller offers a ${name} warranty, get it in writing: what it covers, what it excludes, which countries it applies in and who to contact. A Chinese factory warranty often doesn’t follow the car abroad, so check before you rely on it.`]},
 ];
 const content:ProductEditorial={heading:`${used?'Used '+vehicle.name:vehicle.name} buying guide`,intro,focus,selectionHeading:`${used?'Used '+vehicle.name:name} ${used?'vehicle history':'version comparison'}`,technicalHeading:technical.heading.replace(/^used /,'Used '),technicalNoteHeadings:guideTopics.map(topic=>topic.heading),technicalNoteIcons:guideTopics.map(topic=>topic.icon),selection:selectionText,technical:selectedText+'\n\n'+technical.text,logistics,questions};
 return isNewCorolla(vehicle)&&!unlisted?corollaProductEditorial(content,vehicle,selected):content;
}
