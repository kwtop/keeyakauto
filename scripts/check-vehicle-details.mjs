import assert from 'node:assert/strict';
import {readFile,readdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {build} from 'esbuild';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const load=async path=>JSON.parse(await readFile(resolve(root,path),'utf8'));
const source=await load('src/data/vehicle-detailed-source.json');
const data=await load('src/data/vehicle-detail-data.json');
const base=await load('src/data/vehicle-public-data.json');
const built=await build({stdin:{contents:"export {assembleVehicleDetails} from './src/data/vehicleDetailAssembly'; export {keySpecifications} from './src/data/keySpecifications'; export {manufacturerReferences} from './src/data/manufacturerReferences';",resolveDir:root,sourcefile:'detail-regression.ts'},bundle:true,platform:'node',format:'esm',write:false,logLevel:'silent'});
const {assembleVehicleDetails,keySpecifications,manufacturerReferences}=await import('data:text/javascript;base64,'+Buffer.from(built.outputFiles[0].text).toString('base64'));
const assembled=base.records.map(assembleVehicleDetails);
const defaultIds=new Set(base.records.map(vehicle=>vehicle.defaultVariantId));
const byKey=key=>assembled.find(v=>`${v.brandSlug}/${v.slug}`===key);
const documented=key=>byKey(key).variants.filter(v=>v.technicalReference.status==='documented');
const fact=(variant,field,cycle)=>variant.specs.find(s=>s.field===field&&(!cycle||s.testCycle===cycle));
const result={summary:data.summary,sourceHashes:0,checkedVariants:0,checkedPages:0,listingPages:0,checkedSummaryCards:0,synchronizedModels:0,payload:{},defaultChanges:[],unmatchedDefaults:[],excludedColumns:[],missingChargeIntervals:[],missingPriorityFields:[]};
assert.equal(source.tables.length,64);
assert.equal(Object.keys(data.records).length,63);
assert.equal(assembled.length,63);
assert.equal(data.records['byd/sea-lion-07-dm-i'],undefined);

for(const table of source.tables){
 const image=await readFile(resolve(root,'..',table.sourceFile));
 assert.equal(createHash('sha256').update(image).digest('hex'),table.sha256,`Source image changed: ${table.key}`);
 result.sourceHashes++;
 for(const excluded of table.excludedColumns??[])result.excludedColumns.push({key:table.key,...excluded});
 for(const c of table.columns){
  const get=field=>Array.isArray(table.fields[field])?table.fields[field][c.column-1]:table.fields[field];
  if(get('fastHours')&&!/^\d+-\d+$/.test(get('fastInterval')??''))result.missingChargeIntervals.push({key:table.key,column:c.column});
 }
}
for(let index=0;index<assembled.length;index++){
 const v=assembled[index],original=base.records[index],key=`${v.brandSlug}/${v.slug}`;
 assert.equal(v.variants[0].id,original.variants[0].id,`Original option ID changed: ${key}`);
 assert.equal(v.variants[0].name,original.variants[0].name,`Original option name changed: ${key}`);
 assert.equal(new Set(v.variants.map(v=>v.id)).size,v.variants.length,`Duplicate version ID: ${key}`);
 const preferred=v.variants.find(variant=>variant.id===v.defaultVariantId);
 assert.equal(preferred?.technicalReference.status,'documented',`Default has no comparison data: ${key}`);
 assert.equal(v.year,preferred.year);
 assert.equal(v.powertrain,preferred.powertrain);
 assert.equal(v.seats,preferred.seats);
 for(const field of ['defaultVariantId','defaultVariantName','year','powertrain','seats']){
  assert.equal(original[field],v[field],`Catalog/detail ${field} mismatch: ${key}`);
 }
 assert.equal(assembleVehicleDetails({...original,defaultVariantId:original.variants[0].id}).defaultVariantId,v.defaultVariantId,`Default selection policy changed: ${key}`);
 result.synchronizedModels++;
 if(v.variants[0].technicalReference.status==='catalog-only'){
  assert.deepEqual(v.variants[0].specs,original.variants[0].specs);
  assert.equal(v.variants[0].seats,original.variants[0].seats);
  result.unmatchedDefaults.push({key,id:v.variants[0].id,name:v.variants[0].name});
  assert.notEqual(v.defaultVariantId,original.variants[0].id);
  result.defaultChanges.push({key,oldId:original.variants[0].id,oldName:original.variants[0].name,id:preferred.id,name:preferred.name});
 }else{
  assert.equal(v.defaultVariantId,original.variants[0].id,`An already documented default changed: ${key}`);
 }
 const allowed=new Set(v.variants.map(v=>v.id));
 for(const variant of v.variants){
  const keys=keySpecifications(variant.specs,variant.powertrain,variant.seats);
  assert.ok(keys.length<=(['PHEV','EREV'].includes(variant.powertrain)?8:6));
  if(['PHEV','EREV'].includes(variant.powertrain))assert.ok(!keys.some(s=>s.field==='fuelConsumption'),'Weighted fuel used in PHEV summary');
  if(variant.powertrain==='Pure Electric')assert.ok(!keys.some(s=>s.field==='engine'),'Engine leaked into EV summary');
  for(const s of variant.specs){
   assert.ok(s.value&&!/^[-—–]+$/.test(s.value),`Empty parameter: ${key}`);
   assert.ok(!/price|MSRP|dealer|指导价|报价/i.test(s.label),`Price leaked: ${key}`);
   if(s.field==='fastCharging')assert.match(s.chargeRange,/^\d+–\d+%$/);
   if(s.field==='electricRange')assert.ok(['CLTC','WLTC','NEDC'].includes(s.testCycle));
   if(s.field==='dimensions')assert.match(s.value,/^\d{4} × \d{4} × \d{4}$/);
   if(s.field==='seats')assert.equal(Number(s.value),variant.seats);
   if(s.field==='power'&&['Hybrid','PHEV','EREV'].includes(variant.powertrain))assert.ok(!/engine|motor|system/i.test(s.label));
  }
  if(variant.technicalReference.status==='documented'){
   assert.ok(variant.specs.every(s=>s.source.includes(`column ${variant.technicalReference.column}`)),`Mixed columns: ${key}`);
   assert.ok(!Object.hasOwn(variant,'matchesDefaultId'));
   const range=keys.find(s=>s.field==='electricRange');
   if(fact(variant,'electricRange','WLTC'))assert.equal(range?.testCycle,'WLTC');
   if(keys.length<6)result.missingPriorityFields.push({key,variant:variant.name,keyFacts:keys.length});
  }
  result.checkedVariants++;
 }
 const html=await readFile(resolve(root,`dist/new-cars/${key}/index.html`),'utf8');
 assert.equal((html.match(/<h1(?:\s|>)/g)??[]).length,1);
 assert.ok(html.includes('Key specifications'));
 assert.ok(html.includes(`<option value="${preferred.id}" selected="">`),`SSR selected option differs: ${key}`);
 const primaryAction=html.slice(html.indexOf('class="content-actions detail-main-actions"')).split('</div>')[0];
 assert.ok(primaryAction.includes(`variant=${preferred.id}`),`SSR inquiry does not use default: ${key}`);
 assert.ok(html.includes(`name="description" content="${v.name} ${preferred.year} model reference.`),`Description year differs: ${key}`);
 const second=html.slice(html.indexOf('<section class="detail-section detail-purchase detail-specifications"'),html.indexOf('<section class="detail-section detail-ordering"'));
 assert.ok(second.includes('View all technical specifications'));
 assert.ok(!second.includes('<img'),'Image in specifications section');
 assert.match(html,/<meta name="robots" content="noindex,nofollow"/);
 assert.ok(second.includes('<table')&&second.includes('scope="row"'));
 for(const match of html.matchAll(/spec-20\d{2}-[a-f0-9]{12}/g))assert.ok(allowed.has(match[0])||defaultIds.has(match[0]),`Other model details leaked into ${key}`);
 result.checkedPages++;
}
// Independent source examples catch the specific cross-version failures that
// matter to buyers: powertrain, range, seating and consumption basis.
const corolla=documented('toyota/corolla');
assert.equal(result.defaultChanges.length,40);
assert.equal(byKey('toyota/corolla').variants.find(v=>v.id===byKey('toyota/corolla').defaultVariantId).name,'2026 1.2T Pioneer');
assert.equal(byKey('toyota/bz3x').variants.find(v=>v.id===byKey('toyota/bz3x').defaultVariantId).name,'2026 430 Air');
assert.equal(byKey('mg/mg7').variants.find(v=>v.id===byKey('mg/mg7').defaultVariantId).name,'2026 2.0T 405 AT Luxury');
assert.equal(byKey('fangchengbao/bao-8').defaultVariantId,'2026-3641cd15c5');
assert.equal(corolla.length,4);
assert.deepEqual(corolla.map(v=>v.powertrain),['Hybrid','Hybrid','Hybrid','Gasoline']);
assert.deepEqual(corolla.map(v=>fact(v,'fuelConsumption','WLTC').value),['4.13','4.17','4.45','6.09']);
assert.equal(fact(corolla[3],'dimensions').value,'4635 × 1780 × 1455');
assert.equal(fact(corolla[0],'dimensions').value,'4710 × 1780 × 1435');
assert.equal(byKey('toyota/corolla').variants[0].id,'2026-9600497f03');
const bz3x=documented('toyota/bz3x');
assert.deepEqual(bz3x.map(v=>fact(v,'electricRange','CLTC').value),['430','430','520','520']);
assert.ok(bz3x.every(v=>!fact(v,'batteryEnergy')));
assert.ok(bz3x.every(v=>fact(v,'power').value==='150'&&fact(v,'dimensions').value.endsWith('1660')));
assert.equal(manufacturerReferences['toyota/bz3x'].variantId,byKey('toyota/bz3x').variants[0].id);
assert.ok(!bz3x.some(v=>v.id===manufacturerReferences['toyota/bz3x'].variantId));
const bao8=documented('fangchengbao/bao-8');
assert.deepEqual(bao8.map(v=>v.seats),[5,7,6]);
assert.ok(bao8.every(v=>fact(v,'depletedFuel','WLTC').value==='8.45'));
assert.ok(bao8.every(v=>fact(v,'fastCharging').value==='9'&&fact(v,'fastCharging').chargeRange==='10–97%'));
const han=documented('byd/han-l');
assert.equal(han[3].powertrain,'Pure Electric');
assert.equal(fact(han[2],'electricRange','WLTC').value,'145');
assert.equal(fact(han[3],'power').value,'500');
assert.ok(!fact(han[3],'depletedFuel'));
assert.equal(fact(documented('deepal/s07')[0],'engine').value,'98 PS');
assert.equal(fact(documented('deepal/g318')[0],'engine').value,'150 PS');
const publicText=await readFile(resolve(root,'src/data/vehicle-public-data.json'),'utf8');
result.payload.summaryBytes=Buffer.byteLength(publicText);
result.payload.summarySha256=createHash('sha256').update(publicText).digest('hex');
const list=await readFile(resolve(root,'dist/new-cars/index.html'),'utf8');
assert.ok(!list.includes('technicalReference'));
result.payload.catalogHtmlBytes=Buffer.byteLength(list);
const assertSummaryPayload=(text,path,html=true)=>{
 // A default ID is a small summary field, not permission to bundle all versions.
 for(const match of text.matchAll(/spec-20\d{2}-[a-f0-9]{12}/g))assert.ok(defaultIds.has(match[0]),`Non-default detail version in ${path}`);
 // Component code may read this property; listing HTML must not contain its data.
 if(html)assert.ok(!text.includes('technicalReference'),`Detailed metadata in ${path}`);
 assert.ok(!text.includes('Supplied specification comparison, column'),`Comparison fields in ${path}`);
};
const modelsWithCards=new Set();
const detailPaths=new Set(base.records.map(v=>`${v.brandSlug}/${v.slug}/index.html`));
for(const page of await readdir(resolve(root,'dist/new-cars'),{recursive:true})){
 const path=page.replaceAll('\\','/');
 if(!path.endsWith('index.html')||detailPaths.has(path))continue;
 const html=await readFile(resolve(root,'dist/new-cars',page),'utf8');
 assertSummaryPayload(html,path);
 for(const card of html.matchAll(/<article class="vehicle-card"[\s\S]*?<\/article>/g)){
  const href=card[0].match(/href="\/new-cars\/([^"?]+)\/?(?:\?[^\"]*)?"/)?.[1]?.replace(/\/$/,'');
  if(!href)continue;
  const model=base.records.find(v=>`${v.brandSlug}/${v.slug}`===href);
  assert.ok(model,`Unknown model card in ${path}: ${href}`);
  const meta=card[0].match(/<p class="vehicle-meta">([\s\S]*?)<\/p>/)?.[1]?.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ');
  assert.ok(meta?.includes(model.year)&&meta.includes(model.powertrain)&&meta.includes(`${model.seats} seats`),`Incorrect summary card in ${path}: ${href}: ${meta}`);
  modelsWithCards.add(href);
  result.checkedSummaryCards++;
 }
 result.listingPages++;
}
assert.equal(modelsWithCards.size,63,'Missing model in SSR listing/brand cards');
for(const name of await readdir(resolve(root,'dist/_astro'))){
 if(!name.endsWith('.js'))continue;
 const js=await readFile(resolve(root,'dist/_astro',name),'utf8');
 assertSummaryPayload(js,`client bundle ${name}`,false);
}
const reportFlag=process.argv.indexOf('--report');
if(reportFlag!==-1)await writeFile(resolve(process.argv[reportFlag+1]),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({sourceImages:result.sourceHashes,variants:result.checkedVariants,pages:result.checkedPages,listingPages:result.listingPages,synchronizedModels:result.synchronizedModels,checkedSummaryCards:result.checkedSummaryCards,defaultChanges:result.defaultChanges.length,summary:data.summary,payload:result.payload,excludedColumns:result.excludedColumns,unmatchedOriginalOptions:result.unmatchedDefaults.length,missingChargeIntervals:result.missingChargeIntervals.length},null,2));
