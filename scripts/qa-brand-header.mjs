import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';
import {parseHTML} from 'linkedom';
import assert from 'node:assert/strict';
const out='docs/brand-header-20261117';
await mkdir(out,{recursive:true});
const pages=[];
for(const kind of ['new-cars','used-cars']){
 for(const entry of await readdir(`dist/${kind}`,{withFileTypes:true})){
  if(!entry.isDirectory())continue;
  let html;try{html=await readFile(`dist/${kind}/${entry.name}/index.html`,'utf8')}catch{continue}
  const {document:d}=parseHTML(html);
  if(!d.querySelector('.brand-model-results'))continue;
  const header=d.querySelector('.catalog-heading--brand');
  pages.push({url:`/${kind}/${entry.name}/`,title:d.title,h1:[...d.querySelectorAll('h1')].map(e=>e.textContent),canonical:d.querySelector('link[rel=canonical]')?.getAttribute('href'),cards:[...d.querySelectorAll('.brand-model-results .vehicle-card')].map(e=>e.textContent.replace(/\s+/g,' ').trim()),links:[...d.querySelectorAll('.brand-model-results a[href]')].map(e=>e.getAttribute('href')),compact:header?.classList.contains('catalog-heading--brand-compact')||false,heroImages:header?.querySelectorAll('.catalog-heading-visual').length,heroActions:header?.querySelectorAll('.brand-hero-action').length});
 }
}
if(process.argv.includes('--baseline')){
 await writeFile(`${out}/baseline.json`,JSON.stringify(pages,null,2));
 console.log(`Saved baseline for ${pages.length} brand pages`);
}else{
 const baseline=JSON.parse(await readFile(`${out}/baseline.json`,'utf8'));
 assert.equal(pages.length,baseline.length);
 for(const p of pages){
  const before=baseline.find(b=>b.url===p.url);assert.ok(before,p.url);
  for(const key of ['title','h1','canonical','cards','links'])assert.deepEqual(p[key],before[key],`${p.url}: ${key}`);
  assert.ok(p.compact,p.url);assert.equal(p.heroImages,0,p.url);assert.equal(p.heroActions,0,p.url);
 }
 await writeFile(`${out}/verification.json`,JSON.stringify({checkedAt:new Date().toISOString(),count:pages.length,checks:['Title, H1 and canonical unchanged','SSR model card content and links unchanged','All populated brand pages use compact identity without hero photo or jump CTA'],pages:pages.map(p=>p.url)},null,2));
 console.log(`PASS: ${pages.length} brand pages retain metadata, model content and links with compact headings.`);
}
