import {createRequire} from 'node:module';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {settle,metrics,chromePath} from './volta-local-capture.mjs';

const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(import.meta.dirname,'../../docs/volta-image-upgrade-20261019');
const before=JSON.parse(await readFile(path.join(root,'before/capture.json'),'utf8'));
const report={url:'http://127.0.0.1:4322/',capturedAt:new Date().toISOString(),pixelMeasurement:'Decoded ImageBitmap reports physical resource pixels; naturalWidth is density-corrected when srcset uses width descriptors.',checks:[]};
const browser=await chromium.launch({headless:true,executablePath:chromePath});
await mkdir(path.join(root,'qa'),{recursive:true});
try {
 for(const [width,height,dpr] of [[1440,900,1],[1024,768,1],[768,1024,1],[390,844,1],[320,844,1],[390,844,2]]){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:dpr});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(report.url,{waitUntil:'networkidle'});await settle(page);
  const data=await metrics(page),baseline=before.captures.find(c=>c.viewport.width===width);
  const extra=await page.evaluate(async()=>({
   pictures:await Promise.all([...document.querySelectorAll('img')].filter(i=>i.src.includes('/volta-editorial-20261019/')).map(async i=>{const bitmap=await createImageBitmap(await(await fetch(i.currentSrc)).blob());const result={src:i.currentSrc,alt:i.alt,renderedWidth:i.getBoundingClientRect().width,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,bitmapWidth:bitmap.width,bitmapHeight:bitmap.height,loaded:i.complete&&i.naturalWidth>0,srcset:i.srcset};bitmap.close();return result;})),
   evidence:[...document.querySelectorAll('.v-record-image img')].map(i=>i.getAttribute('src')),
   models:document.querySelectorAll('.v-product').length,
   inquiry:[...document.querySelectorAll('.v-inquiry-form input')].map(i=>({name:i.name,required:i.required,min:i.min,step:i.step})),
   note:[...document.querySelectorAll('.v-journey .v-image-note,.v-stories .v-image-note')].map(p=>p.textContent)
  }));
  const changedLinks=baseline?[...new Set([...data.links,...baseline.links])].filter(h=>data.links.includes(h)!==baseline.links.includes(h)):[];
  const check={width,height,dpr,pageWidth:data.pageWidth,sections:data.sections.length,errors,pictures:extra.pictures,evidence:extra.evidence,models:extra.models,inquiry:extra.inquiry,illustrativeNotes:extra.note,changedLinks,seoPreserved:baseline?JSON.stringify(data.seo)===JSON.stringify(baseline.seo):null,heroGeometryPreserved:baseline?['x','y','width','height'].every(k=>data.h1[k]===baseline.h1[k]):null};
  check.pass=data.pageWidth===width&&extra.pictures.length===6&&extra.pictures.every(i=>i.loaded&&i.srcset&&i.bitmapWidth>=i.renderedWidth*dpr*.95)&&extra.models===15&&!errors.length&&!changedLinks.length&&check.seoPreserved!==false&&check.heroGeometryPreserved!==false;
  report.checks.push(check);
  if(width===320){await page.screenshot({path:path.join(root,'qa/320-full.png'),fullPage:true,animations:'disabled'});}
  if(width===390&&dpr===1){
   for(const [selector,name] of [['.v-journey-rail','journey'],['.v-story-rail','guides']]){
    const rail=page.locator(selector),count=await rail.locator(':scope > article').count();
    for(let i=0;i<count;i++){
     await rail.evaluate((e,index)=>{const child=e.children[index];e.scrollTo({left:child.offsetLeft-e.children[0].offsetLeft,behavior:'instant'});},i);
     await page.waitForTimeout(100);
     await rail.locator('xpath=..').screenshot({path:path.join(root,`qa/${name}-mobile-card-${i+1}.png`),animations:'disabled'});
    }
   }
  }
  await context.close();console.log(JSON.stringify({width,dpr,pass:check.pass,images:extra.pictures.length,errors}));
 }
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto('http://127.0.0.1:4354/?scope=journey',{waitUntil:'networkidle'});
 report.viewer=await page.evaluate(()=>({selected:document.querySelector('#phase').value,scope:document.querySelector('#scope').value,images:[...document.images].map(i=>({src:i.currentSrc,loaded:i.complete&&i.naturalWidth>0}))}));
 report.pass=report.checks.every(c=>c.pass)&&report.viewer.images.every(i=>i.loaded)&&report.viewer.selected.includes('volta-image-upgrade');
 await writeFile(path.join(root,'QA.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({pass:report.pass,report:path.join(root,'QA.json')}));if(!report.pass)process.exitCode=1;
} finally {await browser.close();}
