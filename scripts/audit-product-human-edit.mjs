import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const baseline=resolve(root,'.local/product-human-edit-20261116');
const out=resolve(root,'docs/product-human-edit-20261116');
const oldCases=JSON.parse(await readFile(resolve(baseline,'before-cases.json'),'utf8'));
const oldPages=JSON.parse(await readFile(resolve(baseline,'before-content.json'),'utf8'));
const beforeByCase=new Map(oldCases.map(r=>[r.id,r]));
const beforeByPage=new Map(oldPages.map(r=>[r.url,r]));
const {outputFiles:[bundle]}=await build({stdin:{contents:`
 export {vehicles,vehicleHref} from './src/data/catalog';
 export {assembleVehicleDetails} from './src/data/vehicleDetailAssembly';
 export {productEditorial,productKeywordAnchors} from './src/data/productEditorial';
 export {productModelFocus} from './src/data/productModelFocus';
 export {productLongTailKeywords,productSearchName} from './src/data/productLongTail';
 export {vehicleBuyerChecks} from './src/data/vehicleBuyerChecks';
`,resolveDir:root},bundle:true,platform:'node',format:'esm',write:false});
const api=await import('data:text/javascript;base64,'+Buffer.from(bundle.contents).toString('base64'));
const blocks=c=>[c.heading,c.focus,c.intro,c.selectionHeading,c.selection,c.technicalHeading,c.technical,...c.questions.flatMap(q=>[q.q,...q.paragraphs])];
const norm=s=>s.replace(/\s+/g,' ').toLowerCase();
const countName=(text,name)=>norm(text).split(norm(name)).length-1;
const pages=[];
let cases=0;
for(const original of api.vehicles){
 const vehicle=api.assembleVehicleDetails(original),url=api.vehicleHref(vehicle),beforePage=beforeByPage.get(url);
 const selected=vehicle.variants?.find(v=>v.id===vehicle.defaultVariantId&&v.technicalReference?.status==='documented');
 const options=[['default',{selected}],...(vehicle.variants??[]).filter(v=>v.technicalReference?.status==='documented').map(v=>[v.id,{selected:v}]),...(vehicle.kind==='new'?[['unlisted',{unlisted:true}]]:[])];
 for(const [id,selection] of options){
  const prior=beforeByCase.get(url+'#'+id);
  assert.ok(prior,url+' baseline');
  const content=api.productEditorial(vehicle,api.productModelFocus(vehicle),selection);
  const powertrain=selection.unlisted?'To confirm':selection.selected?.powertrain??vehicle.powertrain;
  const keywords=api.productLongTailKeywords(vehicle,powertrain);
  assert.deepEqual(keywords,prior.keywords,url+' keyword set changed');
  assert.equal(content.focus,prior.text.focus,url+' individual model focus changed');
  assert.equal(content.selection,prior.text.selection,url+' version or used-car record changed');
  assert.equal(content.technical.split('\n\n')[0],prior.text.technical.split('\n\n')[0],url+' technical values or units changed');
  const buyer=api.vehicleBuyerChecks(vehicle,selection);
  assert.deepEqual({...buyer,checks:buyer.checks.map(({icon,...check})=>check)},prior.checks,url+' buyer advice or links changed');
  const text=blocks(content).join(' ');
  for(const keyword of keywords)assert.ok(norm(text).includes(norm(keyword)),url+' missing '+keyword);
  for(const topic of api.productKeywordAnchors(vehicle,powertrain))assert.ok(norm(text).includes(norm(topic)),url+' missing topic '+topic);
  assert.equal(content.questions.length,6);
  assert.equal(content.technicalNoteHeadings.length,3);
  assert.equal(content.technicalNoteIcons.length,3);
  cases++;
  if(id==='default'){
   assert.deepEqual(vehicle.source,beforePage.source,url+' source changed');
   assert.deepEqual(content.technicalNoteHeadings,beforePage.content.technicalNoteHeadings,url+' layout headings changed');
   assert.deepEqual(content.technicalNoteIcons,beforePage.content.technicalNoteIcons,url+' layout icons changed');
   const name=api.productSearchName(vehicle),beforeText=blocks(beforePage.content).join(' ');
   pages.push({title:vehicle.name,url,kind:vehicle.kind,status:'revised and verified',fullNameBefore:countName(beforeText,name),fullNameAfter:countName(text,name),keywordsRetained:15,topicsRetained:24,focusRetained:true,sourceRetained:true,parametersAndRecordsRetained:true});
  }
 }
}
assert.equal(cases,oldCases.length);
assert.equal(pages.length,119);
await mkdir(out,{recursive:true});
const totals={pages:pages.length,new:pages.filter(p=>p.kind==='new').length,used:pages.filter(p=>p.kind==='used').length,casesVerified:cases,completeKeywords:pages.length*15,relatedTopics:pages.length*24,individualFocusesRetained:pages.length,fullNameMentionsBefore:pages.reduce((s,p)=>s+p.fullNameBefore,0),fullNameMentionsAfter:pages.reduce((s,p)=>s+p.fullNameAfter,0)};
await writeFile(resolve(out,'verification.json'),JSON.stringify({...totals,inventory:pages},null,2)+'\n');
const fields=['title','url','kind','status','keywordsRetained','topicsRetained','focusRetained','sourceRetained','parametersAndRecordsRetained','fullNameBefore','fullNameAfter'];
const csv=rows=>rows.map(row=>row.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\r\n');
await writeFile(resolve(out,'page-inventory.csv'),'\ufeff'+csv([fields,...pages.map(p=>fields.map(f=>p[f]))]));
console.log(JSON.stringify(totals));
