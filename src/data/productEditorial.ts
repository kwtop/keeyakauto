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
  ? `When comparing a ${name} price, start with the car’s vehicle history and dated condition records. Request a current offer before relying on an earlier listing.`
  : unlisted?`For a ${name} price enquiry, send the original version reference with your request. Identify that version before using any vehicle specifications to compare offers.`
  : aionUt?'To compare the AION UT price, ask each supplier to quote the same model year, version and equipment list. Ask for preparation and delivery as separate line items.'
  : `To compare a ${name} price fairly, give each supplier the same model year, drivetrain and equipment list. Keep those vehicle specifications on the quotation, with the preparation and delivery services priced separately.`;
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
 const logistics=`Your forwarder needs the ${name} shipping dimensions and weight for the vehicle as it will travel. Include fitted equipment in the length, width and height.${category==='Pickup'?' Identify the cab, cargo bed and accessories, with load ratings from the vehicle documents.':category==='MPV'?' Identify the passenger or cargo body and any interior conversion.':''} Set the delivery terms and named handover point before booking. Your importer or broker should review the ${name} import documents against the applicable import and registration route for that configuration.`;
 const questions:ProductQuestion[]=[
  used?{q:'How do I match the documents to the car?',paragraphs:[`Match the VIN on the registration and vehicle history documents to the dated offer and a current odometer photo. Recent exterior, interior and underbody photographs help you decide what to include in the inspection.`,record?.needsReview?'Resolve the flagged source details with the seller before paying a deposit.':'The seller should explain any difference between the earlier record and the car now offered.']}
   :{q:'Which version should I choose?',paragraphs:unlisted?[selectionText]:differences.length?[differences.join(' '),'Ask for a trim-specific equipment schedule before choosing between versions.']:['For equipment differences outside the documented technical details, request a trim-specific schedule. Put the chosen version name on the enquiry so suppliers quote for the same configuration.']},
  {q:used?'What needs to be in the condition report?':'Which performance figures can I compare?',paragraphs:used?[`A useful condition report identifies the drivetrain, previous repairs and warning codes, then explains the tests and their limits. ${['Pure Electric','Hybrid','PHEV','EREV'].includes(powertrain)?'Battery findings need the test method, date and odometer reading; catalogue range cannot establish the car’s remaining capacity.':'Read the engine and transmission operating checks alongside the maintenance history.'}`,'Agree the inspection tests and acceptance criteria before payment, including how the inspector will record any areas that could not be verified.']:(unlisted||powertrain==='To confirm')?['Identify the drivetrain from the original technical documents before comparing range, fuel consumption or output. Another version’s figures cannot fill a gap in the offer.','Have the supplier resolve the missing version details and state the test cycle and output basis on the supporting specification.']:[powertrain==='Pure Electric'?'Compare electric range measured under the same test cycle. Keep motor output in kW and battery energy in kWh; they answer different questions.':['PHEV','EREV'].includes(powertrain)?'Electric-only range, combined range and depleted-battery consumption describe different operating conditions. Compare each figure under its own test cycle and operating basis.':'Use the same test cycle when comparing fuel consumption. An output figure also needs to say whether it describes the engine, motor or combined system.','Use figures for the selected version. If a range or output figure has no label, get its basis explained before using it to choose between offers.']},
  {q:`What should a ${name} export quote include?`,paragraphs:[`When sourcing from China, send ${used?'the VIN or offered trim, equipment list and required condition':'the model year, full version name, colour and equipment list'}, together with your quantity and destination. A usable export quote states the vehicle price, currency and validity.`, 'The offer also needs an EXW, FOB or CIF term and a named collection point or port. Price preparation, inspection, inland transport, freight, insurance and destination charges separately so you can see what remains to be arranged.']},
  {q:`What should a ${name} pre-shipment inspection cover?`,paragraphs:[`Choose the provider and agree acceptance criteria before booking. The pre-shipment inspection report should identify the car, check its equipment against the offer and record exterior, interior and functional findings.${category==='Pickup'?' Include the cab, bed, underbody and fitted cargo-body equipment.':category==='MPV'?' Include the access doors and actual seat or cargo layout.':''}`,'Keep the inspection date, test conditions and exclusions in the report. Agree with the seller which faults or differences must be resolved before release.']},
  {q:'What does the forwarder need before shipment?',paragraphs:[logistics,'Before shipment, have the importer confirm that the actual offer meets the receiving market’s requirements. A model listing by itself is not import approval.']},
  {q:`How do I arrange ${name} spare parts and support?`,paragraphs:[`For ${name} maintenance, give the workshop the exact ${used?'VIN and drivetrain':'version and drivetrain'}. Check its parts access, diagnostic tools and service information. Name the party responsible for agreed repairs and arrival discrepancies on the offer.`, `If the seller offers a ${name} warranty, get its eligibility, exclusions, service territory and claims contact in writing. For a domestic manufacturer policy, confirm whether this export order is covered and where a claim would be handled.`]},
 ];
 const content:ProductEditorial={heading:`${used?'Used '+vehicle.name:vehicle.name} specifications and buying guide`,intro,focus,selectionHeading:`${used?'Used '+vehicle.name:name} ${used?'vehicle history':'version comparison'}`,technicalHeading:technical.heading.replace(/^used /,'Used '),technicalNoteHeadings:guideTopics.map(topic=>topic.heading),technicalNoteIcons:guideTopics.map(topic=>topic.icon),selection:selectionText,technical:selectedText+'\n\n'+technical.text,logistics,questions};
 return isNewCorolla(vehicle)&&!unlisted?corollaProductEditorial(content,vehicle,selected):content;
}
