import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const source=JSON.parse(await readFile(resolve(root,'src/data/vehicle-detailed-source.json'),'utf8'));
const catalog=JSON.parse(await readFile(resolve(root,'src/data/vehicle-source-data.json'),'utf8'));
const commercial=JSON.parse(await readFile(resolve(root,'src/data/commercial-vehicle-source.json'),'utf8'));
const supplied=JSON.parse(await readFile(resolve(root,'src/data/supplied-vehicle-source.json'),'utf8'));
const normalize=value=>value.normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'');
const sourceRows=source.rowLabels;
const transmissions={'E-CVT无级变速':'E-CVT','电动车单速变速箱':'Single-speed electric','CVT无级变速':'CVT','CVT无级变速(模拟8挡)':'CVT (8 simulated ratios)','CVT无级变速(模拟10挡)':'CVT (10 simulated ratios)','1挡DHT':'Single-speed DHT','5挡手动':'5-speed manual','6挡手动':'6-speed manual','6挡湿式双离合':'6-speed wet DCT','7挡湿式双离合':'7-speed wet DCT','7挡干式双离合':'7-speed dry DCT','6挡手自一体':'6-speed automatic','8挡手自一体':'8-speed automatic','9挡手自一体':'9-speed automatic'};
const bodies={'三厢车':'sedan','两厢车':'hatchback','掀背车':'liftback','SUV':'SUV'};
function translateEngine(raw){
 if(/^增程器\s*\d+马力$/.test(raw))return raw.replace(/^增程器\s*(\d+)马力$/,'$1 PS');
 return raw.replace(/\s*(\d+)马力/,' · $1 PS').replace(/\s+L(\d)/,' · inline $1');
}
function translateBody(raw){
 const match=raw.match(/^(\d)门(\d)座(.+)$/);
 if(!match||!bodies[match[3]])throw new Error('Unrecognized body '+raw);
 return `${match[1]}-door, ${match[2]}-seat ${bodies[match[3]]}`;
}
const records={};
let added=0,matched=0;
for(const table of source.tables){
 const base=catalog.records.find(record=>`${record.brandSlug}/${record.slug}`===table.key);
 if(!base||table.publishable!==base.publishable)throw new Error('Publication mismatch '+table.key);
 if(table.columns.length<1||table.reviewStatus!=='visually-reviewed')throw new Error('Unreviewed table '+table.key);
 for(const [field,values] of Object.entries(table.fields)){
  if(!sourceRows[field])throw new Error('Unknown source field '+field);
  if(Array.isArray(values)&&values.length!==table.columns.length)throw new Error('Column count mismatch '+table.key+'/'+field);
 }
 const variants=[];
 for(const column of table.columns){
  if(table.excludedColumns?.some(item=>item.column===column.column))continue;
  const get=field=>{const values=table.fields[field];return (Array.isArray(values)?values[column.column-1]:values)??null;};
  const baseVariant=base.variants.find(item=>normalize(item.name)===normalize(column.title));
  const year=column.title.match(/^(20\d{2})款/)?.[1];
  if(!year)throw new Error('Missing year '+table.key+'/'+column.column);
  if(!['Gasoline','Hybrid','PHEV','EREV','Pure Electric'].includes(column.powertrain))throw new Error('Unknown powertrain');
  const referenceId=createHash('sha256').update(table.key+'|'+column.title.normalize('NFKC')).digest('hex').slice(0,12);
  const id=baseVariant?.id??`spec-${year}-${referenceId}`;
  const sourceLabel=`Supplied specification comparison, column ${column.column}`;
  const specs=[];
  const put=(field,label,value,unit,testCycle,extra={})=>{
   if(value===null||value===undefined||value==='')return;
   const raw=String(value);
   if(/^[-—–]+$/.test(raw))throw new Error('Unavailable value must be null');
   specs.push({field,label,value:raw,...(unit?{unit}:{}),...(testCycle?{testCycle}:{}),source:sourceLabel,cell:`Column ${column.column}: ${label}`,...extra});
  };
  put('modelYear','Model year',year);
  put('powertrain','Powertrain',column.powertrain);
  if(get('body'))put('body','Body structure',translateBody(get('body')));
  const seats=get('body')?.match(/(\d)座/)?.[1];
  if(seats)put('seats','Seats',seats,undefined,undefined,{cell:`Column ${column.column}: Body structure`});
  if(get('engine'))put('engine',column.powertrain==='EREV'?'Range extender':'Engine',translateEngine(get('engine')));
  if(get('transmission')){
   const translated=transmissions[get('transmission')];
   if(!translated)throw new Error('Unknown transmission '+get('transmission'));
   put('transmission','Transmission',translated);
  }
  for(const [field,cycle] of [['wltcRange','WLTC'],['cltcRange','CLTC'],['nedcRange','NEDC']])put('electricRange','Electric range',get(field),'km',cycle);
  const hybrid=column.powertrain==='Hybrid'||column.powertrain==='PHEV'||column.powertrain==='EREV';
  put('power',column.powertrain==='Pure Electric'?'Maximum motor power':'Maximum power (as listed)',get('power'),'kW',undefined,hybrid?{note:'The source table does not identify this figure as engine, motor or combined system output.'}:{});
  put('torque',column.powertrain==='Pure Electric'?'Maximum motor torque':'Maximum torque (as listed)',get('torque'),'N·m',undefined,hybrid?{note:'The source table does not identify the output basis.'}:{});
  put('motorOutput','Motor output',get('motorPs'),'PS');
  put('dimensions','Dimensions (L × W × H)',get('dimensions')?.replaceAll('*',' × '),'mm');
  if(get('fastHours')&&/^\d{1,3}-\d{1,3}$/.test(get('fastInterval')??'')){
   const minutes=Number((Number(get('fastHours'))*60).toFixed(2));
   put('fastCharging','DC fast charging',minutes,'min',undefined,{chargeRange:get('fastInterval').replace('-','–')+'%',cell:`Column ${column.column}: Fast charging time + charge interval`});
  }
  if(get('slowHours'))put('slowCharging','Slow charging',get('slowHours'),'h',undefined,get('slowInterval')?{chargeRange:get('slowInterval').replace('-','–')+'%'}:{});
  const plugin=column.powertrain==='PHEV'||column.powertrain==='EREV';
  put('fuelConsumption',plugin?'Weighted combined fuel consumption':'Fuel consumption',get('wltcFuel'),'L/100 km','WLTC');
  put('fuelConsumption','Fuel consumption',get('nedcFuel'),'L/100 km','NEDC');
  put('depletedFuel','Depleted-battery fuel consumption',get('depletedWltcFuel'),'L/100 km','WLTC');
  put('depletedFuel','Depleted-battery fuel consumption',get('depletedNedcFuel'),'L/100 km','NEDC');
  put('depletedFuel','Depleted-battery fuel consumption',get('depletedFuel'),'L/100 km',undefined,{note:'Test cycle is not stated for this row.'});
  put('equivalentFuel','Electricity-equivalent fuel consumption',get('equivalentFuel'),'L/100 km',undefined,{note:'Energy-equivalent figure; this is not petrol consumption.'});
  put('oilElectricFuel','Fuel + electricity equivalent consumption',get('oilElectricFuel'),'L/100 km',undefined,{note:'Source table gives no test cycle or calculation basis for this row.'});
  put('acceleration','0–100 km/h',get('acceleration'),'s');
  put('acceleration50','0–50 km/h',get('acceleration50'),'s');
  put('maxSpeed','Maximum speed',get('maxSpeed'),'km/h');
  put('emissions','Listed emissions standard',get('emissions')==='国VI'?'China VI':get('emissions'),undefined,undefined,{note:'Source designation; confirm destination-specific compliance documents.'});
  put('drive','Listed drive designation',get('driveDesignation'),undefined,undefined,{cell:`Column ${column.column}: Version title`});
  variants.push({id,name:column.name,year,powertrain:column.powertrain,specs,source:sourceLabel,marketVersion:'China-market specification reference; confirm the offered vehicle',steering:'To confirm',seats:seats?Number(seats):null,note:'Supplied comparison reference. Photos are model-family references; confirm the exact export configuration.',technicalReference:{status:'documented',label:'Supplied specification comparison',column:column.column,reviewedAt:source.reviewedAt,referenceId},...(baseVariant?{matchesDefaultId:baseVariant.id}:{})});
  if(base.publishable){if(baseVariant)matched++;else added++;}
 }
 if(base.publishable)records[table.key]={variants};
}
for(const model of [...commercial.records,...supplied.records].filter(model=>model.publishable)){
 const key=model.brandSlug+'/'+model.slug;
 if(records[key])throw new Error('Duplicate standalone model '+key);
 records[key]={variants:model.variants.map(variant=>({...variant,...(variant.id===model.defaultVariantId?{matchesDefaultId:variant.id}:{})}))};
}
if(Object.keys(records).length!==catalog.records.filter(record=>record.publishable).length+commercial.records.filter(record=>record.publishable).length+supplied.records.filter(record=>record.publishable).length)throw new Error('Incomplete public coverage');
const standaloneCount=commercial.records.length+supplied.records.length;
const standaloneVariants=commercial.summary.variants+supplied.summary.variants;
const output={schemaVersion:1,records,summary:{sourceImages:source.tables.length+standaloneCount,publicModels:Object.keys(records).length,reviewedColumns:source.tables.reduce((n,t)=>n+t.columns.length,0)+standaloneVariants,excludedColumns:source.tables.reduce((n,t)=>n+(t.excludedColumns?.length??0),0),addedVariants:added+standaloneVariants-standaloneCount,matchedDefaults:matched+standaloneCount,unmatchedDefaults:Object.keys(records).length-matched-standaloneCount}};
if(/[\u3400-\u9fff]/.test(JSON.stringify(output)))throw new Error('Chinese source data leaked into public details');
await writeFile(resolve(root,'src/data/vehicle-detail-data.json'),JSON.stringify(output,null,2)+'\n');
console.log(`Prepared detail-only data: ${output.summary.publicModels} models, ${output.summary.addedVariants} additional variants, ${output.summary.matchedDefaults} matched defaults.`);
export const documentedRecords=records;
