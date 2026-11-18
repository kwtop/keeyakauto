import type {VehicleSpecification} from './catalog';

export function specificationText(spec:VehicleSpecification):string {
  return [spec.value,spec.unit,spec.chargeRange?`· ${spec.chargeRange}`:undefined,spec.testCycle?`(${spec.testCycle})`:undefined].filter(Boolean).join(' ');
}

export function specificationNote(spec:VehicleSpecification):string|undefined {
  return spec.note==='The source table does not identify this figure as engine, motor or combined system output.'
    ?'Output type not specified: engine, motor or combined system.'
    :spec.note;
}

// Older workbook entries remain readable without inventing missing detail fields.
function fieldOf(spec:VehicleSpecification):string {
  if(spec.field)return spec.field;
  if(spec.label==='Engine designation')return 'engine';
  if(/transmission/i.test(spec.label))return 'transmission';
  if(/dimensions/i.test(spec.label))return 'dimensions';
  if(/seats/i.test(spec.label))return 'seats';
  if(/battery (energy|capacity)/i.test(spec.label))return 'batteryEnergy';
  if(/range/i.test(spec.label)&&spec.testCycle)return 'electricRange';
  if(/motor power/i.test(spec.label))return 'power';
  if(/motor torque/i.test(spec.label))return 'torque';
  if(/drive designation/i.test(spec.label))return 'drive';
  return '';
}

export function keySpecifications(specs:VehicleSpecification[],powertrain:string,seats?:number|null):VehicleSpecification[] {
  const find=(field:string,cycle?:string)=>specs.find(spec=>fieldOf(spec)===field&&(!cycle||spec.testCycle===cycle));
  const range=find('electricRange','WLTC')??find('electricRange','CLTC');
  const seatSpec=find('seats')??(seats?{field:'seats',label:'Seats',value:String(seats),source:'Selected version reference'}:undefined);
  const dimensionSpec=find('dimensions');
  const available=(items:(VehicleSpecification|undefined)[])=>items.filter((item):item is VehicleSpecification=>!!item&&item.value!==''&&!/^[-—–]+$/.test(item.value));
  if(powertrain==='Pure Electric'){
    const main=available([range,find('batteryEnergy'),find('power'),find('fastCharging')]);
    // Use supported drive/torque values only when a priority field is unavailable.
    for(const fallback of [find('torque'),find('drive')]){
      if(main.length<4&&fallback)main.push(fallback);
    }
    return [...main,...available([dimensionSpec,seatSpec])].slice(0,6);
  }
  if(powertrain==='PHEV'||powertrain==='EREV'){
    return available([range,find('engine'),find('depletedFuel','WLTC')??find('depletedFuel','NEDC')??find('depletedFuel'),find('fastCharging'),dimensionSpec,seatSpec,find('batteryEnergy'),find('drive')]).slice(0,8);
  }
  return available([find('engine'),find('transmission'),find('power'),find('fuelConsumption','WLTC'),dimensionSpec,seatSpec]).slice(0,6);
}
