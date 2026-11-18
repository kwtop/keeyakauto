import type {Vehicle,VehicleSpecification,VehicleVariant} from '../../data/catalog';
import {bodyGroupLabel} from '../../data/catalogLabels';
import {specificationNote} from '../../data/keySpecifications';

export type NewMetricField='engine'|'power'|'fuelConsumption'|'depletedFuel'|'seats'|'electricRange'|'batteryEnergy'|'fastCharging'|'transmission'|'powertrain'|'year';
export type DetailMetric={label:string;value:string;note?:string;field?:NewMetricField};
function usedPowertrainMetric(vehicle:Vehicle):DetailMetric{
 const specs=vehicle.specs??[];
 const hasPlug=['Pure Electric','PHEV','EREV'].includes(vehicle.powertrain);
 const range=specs.find(spec=>spec.field==='sourceRange'&&spec.value.trim());
 if(hasPlug&&range){
  return {
   label:'Listed range',
   value:[range.value,range.unit].filter(Boolean).join(' '),
   note:range.testCycle?range.testCycle:vehicle.powertrain==='Pure Electric'?'Test cycle not supplied':'Range type and test cycle not supplied',
  };
 }
 const engine=specs.find(spec=>spec.field==='engine'&&spec.value.trim());
 if(engine&&vehicle.powertrain!=='Pure Electric'){
  const displacement=engine.value.trim().match(/^(\d+(?:\.\d+)?)\s*([LT])$/i);
  return displacement
   ? {label:'Engine displacement',value:displacement[1]+' L',note:displacement[2].toUpperCase()==='T'?'Turbocharged':undefined}
   : {label:'Engine',value:[engine.value,engine.unit].filter(Boolean).join(' ')};
 }
 return {label:hasPlug?'Range':'Engine displacement',value:'Not provided'};
}
export function usedSummaryMetrics(vehicle:Vehicle):DetailMetric[]{
 const record=vehicle.usedRecord;
 return [
  {label:record?'Model year':'Year in past listing',value:vehicle.year||'To confirm'},
  {label:'First registration',value:record?.registrationMonth||'Not provided'},
  {label:'Recorded mileage',value:record?record.mileageKm.toLocaleString('en-US')+' km':'Not provided'},
  {label:'Powertrain',value:vehicle.powertrain||'To confirm'},
  {label:'Body style',value:bodyGroupLabel(vehicle.body,'used')||'To confirm'},
  usedPowertrainMetric(vehicle),
 ];
}
export function specField(s:VehicleSpecification){
 if(s.field)return s.field;
 if(/^powertrain$/i.test(s.label))return 'powertrain';
 if(/engine designation/i.test(s.label))return 'engine';
 if(/transmission/i.test(s.label))return 'transmission';
 if(/dimensions/i.test(s.label))return 'dimensions';
 if(/seats/i.test(s.label))return 'seats';
 if(/battery (energy|capacity)/i.test(s.label))return 'batteryEnergy';
 if(/range/i.test(s.label)&&s.testCycle)return 'electricRange';
 if(/\bpower\b/i.test(s.label))return 'power';
 if(/torque/i.test(s.label))return 'torque';
 if(/drive designation/i.test(s.label))return 'drive';
 return s.label;
}
export function findSpec(specs:VehicleSpecification[],field:string){
 const found=specs.filter(s=>specField(s)===field);
 return found.find(s=>s.testCycle==='WLTC')??found[0];
}
export function groupSpecifications(specs:VehicleSpecification[]){
 const definitions=[
  {id:'general',label:'General information',fields:['modelYear','powertrain','body','seats','dimensions','wheelbase']},
  {id:'performance',label:'Power & performance',fields:['engine','transmission','power','torque','motorOutput','maxSpeed','acceleration','acceleration50','drive']},
  {id:'battery',label:'Battery & charging',fields:['electricRange','batteryEnergy','batteryType','fastCharging','slowCharging']},
  {id:'consumption',label:'Consumption & emissions',fields:['fuelConsumption','depletedFuel','equivalentFuel','oilElectricFuel','emissions']},
  {id:'additional',label:'Additional specifications',fields:[]},
 ];
 const groups=definitions.map(definition=>({...definition,specs:[] as VehicleSpecification[]}));
 for(const spec of specs){
  const field=specField(spec);
  const group=groups.find(group=>group.fields.includes(field))??groups[groups.length-1];
  group.specs.push(spec);
 }
 return groups.filter(group=>group.specs.length>0);
}
export function summaryMetrics(specs:VehicleSpecification[],powertrain:string,seats:number|null|undefined,year:string):DetailMetric[]{
 const fields:NewMetricField[]=powertrain==='Pure Electric'?['electricRange','batteryEnergy','power','fastCharging']:
  ['PHEV','EREV'].includes(powertrain)?['electricRange','engine','depletedFuel','fastCharging']:['engine','power','fuelConsumption','seats'];
 const result:DetailMetric[]=[];
 const added=new Set<string>();
 const append=(field:NewMetricField,metric:DetailMetric)=>{if(!added.has(field)){added.add(field);result.push({...metric,field});}};
 const add=(field:NewMetricField)=>{const s=findSpec(specs,field);if(s&&!/^[-—–]+$/.test(s.value)){
  const value=field==='engine'?s.value.split(' · ')[0]:[s.value,s.unit,s.chargeRange?'· '+s.chargeRange:undefined].filter(Boolean).join(' ');
  const label=field==='engine'?(/range extender/i.test(s.label)?s.label:'Engine'):s.testCycle?s.testCycle+' '+s.label.toLowerCase():s.label;
  append(field,{label,value,note:specificationNote(s)});
 }else if(field==='seats'&&seats)append(field,{label:'Seats',value:String(seats)});};
 fields.forEach(add);
 if(result.length<4&&!fields.includes('seats'))add('seats');
 if(result.length<4&&!fields.includes('transmission'))add('transmission');
 if(result.length<4)append('powertrain',{label:'Powertrain',value:powertrain||'To confirm'});
 if(result.length<4)append('year',{label:'Model year',value:year||'To confirm'});
 return result.slice(0,4);
}
export function comparisonFields(first:VehicleVariant,second:VehicleVariant){
 const electric=[first,second].some(v=>['Pure Electric','PHEV','EREV'].includes(v.powertrain));
 const preferred=electric?['electricRange','batteryEnergy','engine','power','depletedFuel','fastCharging','transmission','drive','seats']:['engine','transmission','power','torque','fuelConsumption','seats'];
 return preferred.filter(field=>findSpec(first.specs,field)||findSpec(second.specs,field)||(field==='seats'&&(first.seats||second.seats))).slice(0,6);
}
export const comparisonLabels:Record<string,string>={powertrain:'Powertrain',engine:'Engine',transmission:'Transmission',power:'Maximum power (as listed)',torque:'Maximum torque (as listed)',fuelConsumption:'Fuel consumption',depletedFuel:'Depleted-battery fuel consumption',electricRange:'Electric range',batteryEnergy:'Battery energy',fastCharging:'Fast charging',drive:'Drive configuration',seats:'Seats'};
