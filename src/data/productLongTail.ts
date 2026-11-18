import type {Vehicle} from './catalog';
import {corollaCoreKeywords,isNewCorolla} from './corollaKeywordTargets';

const technicalTopics:Record<string,string[]>={
 'Pure Electric':['electric range','battery capacity','charging compatibility','charging accessories','battery diagnostics'],
 PHEV:['electric-only range','depleted-battery fuel consumption','battery capacity','charging compatibility','battery diagnostics'],
 EREV:['electric-only range','range extender','battery capacity','charging compatibility','battery diagnostics'],
 Hybrid:['fuel consumption','hybrid system','hybrid battery','engine specifications','transmission'],
 Gasoline:['fuel consumption','engine specifications','engine displacement','transmission','service schedule'],
 Diesel:['fuel consumption','engine specifications','engine displacement','transmission','service schedule'],
 'Gasoline + CNG':['CNG system','fuel consumption','fuel specification','cylinder documentation','service schedule'],
 'To confirm':['powertrain identification','equipment list','technical documents','inspection scope','service information'],
};

export function productSearchName(vehicle:Pick<Vehicle,'kind'|'name'>){
 return (vehicle.kind==='used'?'used ':'')+vehicle.name;
}

// These are editorial targets, not search-volume estimates. Every complete phrase
// must occur in the reader-facing guide or FAQ with an answer in the same block.
export function productLongTailKeywords(vehicle:Pick<Vehicle,'kind'|'name'|'powertrain'>,powertrain=vehicle.powertrain){
 if(isNewCorolla(vehicle)&&powertrain!=='To confirm')return [...corollaCoreKeywords];
 const name=productSearchName(vehicle);
 const topics=['specifications',vehicle.kind==='used'?'vehicle history':'version comparison','price','export quote','pre-shipment inspection','shipping dimensions','import documents','spare parts','maintenance','warranty',...(technicalTopics[powertrain]??technicalTopics['To confirm'])];
 return topics.map(topic=>`${name} ${topic}`);
}

export function productPowertrainCopy(name:string,powertrain:string):{heading:string;text:string}{
 switch(powertrain){
  case 'Pure Electric':return {
   heading:`${name} electric range and charging`,
   text:`Read the ${name} battery capacity and electric range for the same version, with the test cycle beside the range figure. Capacity is normally expressed in kWh; charging power is measured in kW. One describes stored energy, the other the charging rate.\n\nFor ${name} charging compatibility, your charging provider needs photographs of the fitted charging inlet and its AC charging specification. Have DC charging checked separately. List the included ${name} charging accessories on the quotation, with their ratings and connector types.\n\nA ${name} battery diagnostics report needs to identify the individual car, test method and date. Use that evidence to assess remaining capacity; the catalogue range describes the model.`,
  };
  case 'PHEV':return {
   heading:`${name} electric-only range and fuel use`,
   text:`The ${name} depleted-battery fuel consumption figure describes a different operating condition from electric-only range or combined range. Keep the test cycle with each comparison. The engine specification and ${name} battery capacity also need to match the version on the quote.\n\nYour local charging provider can review ${name} charging compatibility using the fitted charging inlet details and charging capability. Get the included cables and charging equipment listed on the offer.\n\nFor an individual car, request ${name} battery diagnostics showing the vehicle identity, test date and method. Review the results with the engine maintenance records and charging checks before accepting it.`,
  };
  case 'EREV':return {
   heading:`${name} electric-only range and charging`,
   text:`Compare ${name} battery capacity and electric-only range for the same version and stated test cycle. If a supplier also quotes combined range, ask which conditions that figure describes before comparing it with another offer.\n\nA service plan for the ${name} range extender needs to cover its fuel requirements as well as maintenance. To review ${name} charging compatibility, give your provider the actual charging inlet details, charging capability and specifications for any supplied accessories.\n\nThe ${name} battery diagnostics should identify the car, test date and method. Consider the battery findings together with evidence of range-extender operation and maintenance.`,
  };
  case 'Hybrid':return {
   heading:`${name} fuel consumption and drivetrain`,
   text:`For the ${name} hybrid system, keep the engine specification, hybrid battery and drive configuration under one complete version reference. Compare fuel consumption measured under the same test cycle; figures from another edition may describe a different configuration.\n\nRead the ${name} engine specifications alongside the motor data. An output figure needs to say whether it describes the engine, motor or combined system. The ${name} transmission designation should identify that same version.\n\nTo assess the ${name} hybrid battery in an individual car, request dated test evidence. Your receiving workshop also needs diagnostic support, battery-service information and the appropriate service schedule. A model-level consumption figure does not establish battery condition.`,
  };
  case 'Gasoline':case 'Diesel':return {
   heading:`${name} fuel consumption and drivetrain`,
   text:`Use the ${name} engine specifications for the quoted version, including its drive configuration. The ${name} engine displacement helps identify the ${powertrain==='Diesel'?'diesel engine':'engine'}, while output and equipment still need the full version name. Keep the test cycle with the fuel consumption figure when comparing offers.\n\nSpecify the ${name} transmission on the offer, down to the exact manual or automatic designation. The receiving team will also need the emissions documents to review against its import route.\n\nYour workshop needs the ${name} service schedule for the proposed engine, along with diagnostic support and parts access. Confirm the required fuel specification before planning local use.`,
  };
  case 'Gasoline + CNG':return {
   heading:`${name} CNG system and fuel use`,
   text:`Read the ${name} fuel consumption figure with its fuel type and test conditions. The ${name} fuel specification and fitted CNG system need separate identification; engine displacement alone cannot describe the complete dual-fuel configuration.\n\nBefore accepting the vehicle, have your importer review the ${name} cylinder documentation and local refuelling access. The documents must identify the equipment fitted to the vehicle being offered.\n\nThe ${name} service schedule should cover both fuel systems. Your receiving workshop needs diagnostic support and the relevant parts information. Resolve missing cylinder or fuel-system details before payment.`,
  };
  default:return {
   heading:`${name} powertrain identification`,
   text:`Use the original trim designation and ${name} technical documents to identify the drivetrain. Put the source records and vehicle identification evidence in one configuration file, then resolve conflicting fuel-type or drivetrain entries.\n\nAn accurate ${name} equipment list describes the proposed car, including its engine or battery where fitted. Use it to agree the ${name} inspection scope with the provider and specify the equipment verification required.\n\nObtain ${name} service information for the confirmed configuration before planning maintenance. Resolve missing drivetrain details first so the engine, battery or charging tests suit the vehicle being offered.`,
  };
 }
}
