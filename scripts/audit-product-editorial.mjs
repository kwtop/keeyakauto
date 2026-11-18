import {build} from 'esbuild';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
const root=resolve(import.meta.dirname,'..');
const out=resolve(root,'docs/product-content-20261116');
const exactOut=resolve(root,'docs/product-longtail-20261116');
const corollaEvidence=JSON.parse(await readFile(resolve(root,'docs/corolla-keyword-research-20261116/selected-keywords.json'),'utf8'));
await mkdir(out,{recursive:true});
await mkdir(exactOut,{recursive:true});
const {outputFiles:[bundle]}=await build({stdin:{contents:'export {vehicles,vehicleHref} from "./src/data/catalog";export {assembleVehicleDetails} from "./src/data/vehicleDetailAssembly";export {productEditorial,productKeywordAnchors} from "./src/data/productEditorial";export {productModelFocus} from "./src/data/productModelFocus";export {productLongTailKeywords} from "./src/data/productLongTail";',resolveDir:root},bundle:true,platform:'node',format:'esm',write:false});
const {vehicles,vehicleHref,assembleVehicleDetails,productEditorial,productKeywordAnchors,productModelFocus,productLongTailKeywords}=await import('data:text/javascript;base64,'+Buffer.from(bundle.contents).toString('base64'));
const blocksOf=c=>[
 {location:'Guide heading and introduction',heading:c.heading,text:[c.heading,c.focus,c.intro].join(' ')},
 {location:'Versions / vehicle history',heading:c.selectionHeading,text:c.selectionHeading+' '+c.selection},
 {location:'Powertrain explanation',heading:c.technicalHeading,text:c.technicalHeading+' '+c.technical},
 ...c.questions.map(q=>({location:'Buying questions',heading:q.q,text:[q.q,...q.paragraphs].join(' ')})),
];
const normalize=s=>s.replace(/\s+/g,' ').toLowerCase();
function checkExact(vehicle,content,powertrain){
 const keywords=productLongTailKeywords(vehicle,powertrain),blocks=blocksOf(content);
 assert.equal(keywords.length,15);assert.equal(new Set(keywords).size,15);
 return keywords.map(query=>{
  const block=blocks.find(b=>normalize(b.text).includes(normalize(query)));
  assert.ok(block,vehicleHref(vehicle)+' missing complete phrase: '+query);
  const evidence=vehicle.kind==='new'&&vehicle.name==='Toyota Corolla'?corollaEvidence.targets.find(k=>normalize(k.query)===normalize(query)):undefined;
  return {query,location:block.location,heading:block.heading,excerpt:block.text,match:'complete phrase in reader-facing text; case and whitespace normalized',volume:evidence?evidence.globalRange:'not verified',volumeScope:evidence?'Google Keyword Planner; All locations; All languages; 2025-11-01 to 2026-10-31; range including close variants':undefined};
 });
}
const records=[];
for(const original of vehicles){
 const before=JSON.stringify(original);
 const vehicle=assembleVehicleDetails(original),focus=productModelFocus(vehicle);
 const selected=vehicle.variants?.find(v=>v.id===vehicle.defaultVariantId&&v.technicalReference?.status==='documented');
 const content=productEditorial(vehicle,focus,{selected});
 const text=blocksOf(content).map(b=>b.text).join(' ');
 const longTail=checkExact(vehicle,content,selected?.powertrain??vehicle.powertrain);
 const anchors=productKeywordAnchors(vehicle,selected?.powertrain??vehicle.powertrain);
 assert.equal(anchors.length,24,vehicleHref(vehicle));
 assert.equal(new Set(anchors).size,24);
 for(const anchor of anchors)assert.ok(text.toLowerCase().includes(anchor.toLowerCase()),vehicleHref(vehicle)+' missing '+anchor);
 assert.equal(new Set(content.questions.map(q=>q.q)).size,6);
 assert.equal(JSON.stringify(original),before,'Source mutation');
 const variants=vehicle.variants?.filter(v=>v.technicalReference?.status==='documented')??[];
 for(const variant of variants){
  const switched=productEditorial(vehicle,focus,{selected:variant});
  checkExact(vehicle,switched,variant.powertrain);
  assert.ok(switched.selection.includes(variant.name));
  const spec=variant.specs.find(s=>s.field==='engine');
  if(spec)assert.ok(switched.technical.includes(spec.value));
 }
 if(vehicle.kind==='new'){
  const unknown=productEditorial(vehicle,focus,{unlisted:true});
  checkExact(vehicle,unknown,'To confirm');
  assert.ok(!unknown.intro.includes('catalogue model year is'));
  assert.ok(unknown.technical.startsWith('This linked version is not listed.'));
 }
 if(vehicle.kind==='used'&&!vehicle.usedRecord)assert.ok(content.selection.includes('No unit-specific recorded mileage'));
 const path=vehicleHref(vehicle);
 let rendered=false;
 if(process.argv.includes('--built')){
  const {document}=parseHTML(await readFile(resolve(root,'dist',path.slice(1),'index.html'),'utf8'));
  const sections=[document.querySelector('[data-core-module="product-guide"]'),document.querySelector('[data-core-module="faq"]')];
  const visible=sections.map(x=>x?.textContent??'').join(' ').toLowerCase();
  for(const anchor of anchors)assert.ok(visible.includes(anchor.toLowerCase()),path+' HTML missing '+anchor);
  for(const keyword of longTail)assert.ok(normalize(visible).includes(normalize(keyword.query)),path+' HTML missing complete phrase '+keyword.query);
  assert.equal(document.querySelectorAll('h1').length,1);
  assert.equal(document.querySelectorAll('.vd-faq-list>details').length,6);
  assert.equal(document.querySelector('link[rel="canonical"]').getAttribute('href'),'https://keeyakauto.com'+path);
  const ids=[...document.querySelectorAll('[id]')].map(x=>x.id);assert.equal(ids.length,new Set(ids).size,path+' duplicate IDs');
  rendered=true;
 }
 records.push({title:vehicle.name,url:path,kind:vehicle.kind,status:rendered?'built HTML verified':'content verified',focus,source:vehicle.source,reviewedVariants:variants.length,longTail,keywords:anchors.map(anchor=>({query:(vehicle.kind==='used'?'used ':'')+vehicle.name+' '+anchor,topic:anchor,match:'visible topic in model context; not exact-query repetition',location:content.technical.toLowerCase().includes(anchor.toLowerCase())?'Powertrain interpretation':content.selection.toLowerCase().includes(anchor.toLowerCase())?'Versions / record':content.intro.toLowerCase().includes(anchor.toLowerCase())?'Model introduction':'Model-specific questions',volume:'not verified'})),content});
}
assert.equal(records.length,119);
assert.equal(new Set(records.map(r=>r.url)).size,119);
assert.equal(new Set(records.map(r=>r.focus)).size,119,'Every product needs its own editorial focus, including new and used versions of the same model');
const csv=(rows)=>rows.map(row=>row.map(value=>'"'+String(value??'').replaceAll('"','""')+'"').join(',')).join('\r\n');
await writeFile(resolve(out,'product-keyword-map.csv'),'\ufeff'+csv([['Product','URL','Kind','Candidate query','Visible topic','Content location','Evidence status','Search volume'],...records.flatMap(r=>r.keywords.map(k=>[r.title,r.url,r.kind,k.query,k.topic,k.location,'Existing model/variant source and procurement questions',k.volume]))]));
await writeFile(resolve(out,'page-inventory.csv'),'\ufeff'+csv([['Product','URL','Kind','Status','Keyword topics','Documented versions','Editorial focus'],...records.map(r=>[r.title,r.url,r.kind,r.status,r.keywords.length,r.reviewedVariants,r.focus])]));
await writeFile(resolve(out,'full-content.json'),JSON.stringify(records,null,2)+'\n');
await writeFile(resolve(exactOut,'exact-long-tail-keywords.csv'),'\ufeff'+csv([['Product','URL','Kind','Complete long-tail keyword','Location','Section heading','Actual text','Match','Search volume / range','Volume scope'],...records.flatMap(r=>r.longTail.map(k=>[r.title,r.url,r.kind,k.query,k.location,k.heading,k.excerpt,k.match,k.volume,k.volumeScope??'']))]));
await writeFile(resolve(exactOut,'page-inventory.csv'),'\ufeff'+csv([['Product','URL','Kind','Status','Complete phrases','Related topics','Documented versions'],...records.map(r=>[r.title,r.url,r.kind,r.status,r.longTail.length,r.keywords.length,r.reviewedVariants])]));
await writeFile(resolve(exactOut,'full-content.json'),JSON.stringify(records,null,2)+'\n');
console.log(JSON.stringify({pages:records.length,new:records.filter(r=>r.kind==='new').length,used:records.filter(r=>r.kind==='used').length,topicsPerPage:24,keywordMappings:records.length*24,completePhrasesPerPage:15,completePhrases:records.length*15,rendered:records.every(r=>r.status==='built HTML verified')}));
