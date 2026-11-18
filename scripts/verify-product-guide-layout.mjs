import {build} from 'esbuild';
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {parseHTML} from 'linkedom';

const root=resolve(import.meta.dirname,'..');
const archive=resolve(root,'.local/product-guide-rollout-20261116');
const delivery=resolve(root,'docs/product-guide-rollout-20261116');
const baseline=resolve(archive,'before.json');
const {outputFiles:[bundle]}=await build({stdin:{contents:`
 export {vehicles,vehicleHref} from './src/data/catalog';
 export {assembleVehicleDetails} from './src/data/vehicleDetailAssembly';
 export {productEditorial} from './src/data/productEditorial';
 export {productModelFocus} from './src/data/productModelFocus';
 export {productLongTailKeywords} from './src/data/productLongTail';
 export {vehicleBuyerChecks} from './src/data/vehicleBuyerChecks';
`,resolveDir:root},bundle:true,platform:'node',format:'esm',write:false});
const api=await import('data:text/javascript;base64,'+Buffer.from(bundle.contents).toString('base64'));
const records=[];
const pages=[];
const snapshot=process.argv.includes('--snapshot');
for(const original of api.vehicles){
 const vehicle=api.assembleVehicleDetails(original),url=api.vehicleHref(vehicle);
 const selected=vehicle.variants?.find(v=>v.id===vehicle.defaultVariantId&&v.technicalReference?.status==='documented');
 const cases=[['default',{selected}],...(vehicle.variants??[]).filter(v=>v.technicalReference?.status==='documented').map(v=>[v.id,{selected:v}]),...(vehicle.kind==='new'?[['unlisted',{unlisted:true}]]:[])];
 for(const [key,selection] of cases){
  const editorial=api.productEditorial(vehicle,api.productModelFocus(vehicle),selection);
  const {technicalNoteHeadings,technicalNoteIcons,...text}=editorial;
  const checks=api.vehicleBuyerChecks(vehicle,selection);
  const notes=editorial.technical.split('\n\n').slice(1);
  records.push({id:url+'#'+key,text,checks:{...checks,checks:checks.checks.map(({icon,...check})=>check)},keywords:api.productLongTailKeywords(vehicle,selection.unlisted?'To confirm':selection.selected?.powertrain??vehicle.powertrain)});
  if(!snapshot){
   assert.equal(technicalNoteHeadings?.length,notes.length,url+' topic headings');
   assert.equal(technicalNoteIcons?.length,notes.length,url+' topic icons');
   assert.ok(checks.checks.every(check=>check.icon),url+' buyer-check icons');
  }
 }
 if(!snapshot){
  const {document}=parseHTML(await readFile(resolve(root,'dist',url.slice(1),'index.html'),'utf8'));
  const guide=document.querySelector('.vd-product-guide--reading');
  assert.ok(guide,url+' reading layout');
  assert.equal(guide.querySelectorAll('.vd-product-topic').length,3,url+' rendered topics');
  assert.equal(guide.querySelectorAll('.vd-product-topic-icon svg').length,3,url+' rendered icons');
  assert.ok(!guide.querySelector('.vd-product-notes>p'),url+' old three-column paragraphs');
  const entry=records.find(r=>r.id===url+'#default');
  for(const paragraph of [entry.text.focus,entry.text.intro,entry.text.selection,...entry.text.technical.split('\n\n')])assert.ok(guide.textContent.includes(paragraph),url+' rendered paragraph retained');
  pages.push({title:vehicle.name,url,kind:vehicle.kind,topics:3,icons:3,bodyRetained:true});
 }
}
if(snapshot){
 await mkdir(archive,{recursive:true});
 await writeFile(baseline,JSON.stringify(records,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify({snapshot:baseline,cases:records.length}));
}else{
 assert.deepEqual(records,JSON.parse(await readFile(baseline,'utf8')),'Original copy, buyer checks, links and keywords must remain identical in every case');
 await mkdir(delivery,{recursive:true});
 const result={pages:pages.length,new:pages.filter(p=>p.kind==='new').length,used:pages.filter(p=>p.kind==='used').length,casesCompared:records.length,allOriginalTextAndKeywordsRetained:true,allPagesRenderedWithTopicIcons:true};
 await writeFile(resolve(delivery,'verification.json'),JSON.stringify({...result,inventory:pages},null,2)+'\n');
 console.log(JSON.stringify(result));
}
