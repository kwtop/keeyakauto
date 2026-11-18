// Local-only rendered evidence for the two documentary photo replacements.
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(process.cwd(),'..');
const folder=path.join(root,'checkpoints/keeyak-source-home-20261019');
const output=path.join(root,'docs/keeyak-source-home-20261019');
const origin='http://127.0.0.1:4322';
await Promise.all([mkdir(path.join(folder,'after'),{recursive:true}),mkdir(path.join(folder,'delivery'),{recursive:true}),mkdir(output,{recursive:true})]);
const result={origin,date:'2026-10-19',scope:'Two homepage documentary photos; no source-reference fidelity acceptance',screenshots:[],links:[],errors:[]};
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const sizes=[[1440,900],[1024,768],[768,1024],[390,844],[320,844]];
try{
 for(const [width,height] of sizes){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  for(const img of await page.locator('main img').all())await img.scrollIntoViewIfNeeded();
  await page.locator('.nest-model-card').first().scrollIntoViewIfNeeded();
  await page.keyboard.press('Control+Home');
  await page.waitForFunction(()=>scrollY<2&&document.querySelector('header').getBoundingClientRect().top>-.5);
  await page.waitForFunction(()=>[...document.querySelectorAll('main img')].every(i=>i.complete&&i.naturalWidth>0));
  const metrics=await page.evaluate(()=>{
   const box=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height}};
   return {viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},pageHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,modules:document.querySelectorAll('[data-core-module]').length,imageCount:document.querySelectorAll('main img').length,company:box(document.querySelector('.nest-company')),photos:[...document.querySelectorAll('.nest-company img')].map(i=>({src:i.currentSrc,alt:i.alt,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,position:getComputedStyle(i).objectPosition,...box(i)})),captions:[...document.querySelectorAll('.nest-company figcaption')].map(e=>e.innerText),links:[...document.querySelectorAll('.nest-company a')].map(a=>a.getAttribute('href'))};
  });
  assert.equal(metrics.overflow,false,`Horizontal overflow at ${width}`);
  assert.equal(metrics.modules,6);assert.equal(metrics.imageCount,17);assert.equal(errors.length,0);
  for(const photo of metrics.photos){assert(photo.naturalWidth>0);assert(Math.abs(photo.width/photo.height-4/3)<.01);}
  assert(metrics.captions[1].includes('Special-vehicle'));assert(metrics.captions[1].includes('May 2026'));
  const full=path.join(folder,'after',`page-${width}x${height}.png`);
  await page.screenshot({path:full,fullPage:true,animations:'disabled'});
  const company=metrics.company;
  const region={left:Math.floor(company.x),top:Math.floor(company.y),width:Math.floor(company.width),height:Math.ceil(company.height)};
  const current=path.join(folder,'after',`company-${width}.png`);
  await sharp(full).extract(region).png().toFile(current);
  if(width!==320){
   const baseline=path.join(folder,'before',`page-${width}x${height}.png`),meta=await sharp(baseline).metadata();
   assert.equal(meta.height,metrics.pageHeight,'Image replacement should preserve the established page geometry');
   const old=await sharp(baseline).extract(region).png().toBuffer();
   const targetWidth=width<500?width:720,gap=24,labelHeight=48;
   const oldImage=await sharp(old).resize({width:targetWidth}).png().toBuffer();
   const newImage=await sharp(current).resize({width:targetWidth}).png().toBuffer();
   const oldMeta=await sharp(oldImage).metadata(),newMeta=await sharp(newImage).metadata();
   const label=Buffer.from(`<svg width="${targetWidth*2+gap}" height="48"><rect width="100%" height="100%" fill="white"/><g font-family="Arial,sans-serif" font-size="16" fill="#2b2b2b"><text x="0" y="30">Before · ${width}px</text><text x="${targetWidth+gap}" y="30">After · ${width}px</text></g></svg>`);
   await sharp({create:{width:targetWidth*2+gap,height:Math.max(oldMeta.height,newMeta.height)+labelHeight,channels:3,background:'#fff'}}).composite([{input:label,left:0,top:0},{input:oldImage,left:0,top:labelHeight},{input:newImage,left:targetWidth+gap,top:labelHeight}]).png().toFile(path.join(folder,'delivery',`company-before-after-${width}.png`));
  }
  result.screenshots.push({...metrics,errors,fullPage:path.relative(root,full).replaceAll('\\','/'),company:path.relative(root,current).replaceAll('\\','/'),companyBounds:company});
  console.log(`${width}px: ${metrics.modules} modules, ${metrics.imageCount} images, both photos loaded, no overflow or script errors`);
  await context.close();
 }
 for(const href of new Set(result.screenshots.flatMap(s=>s.links))){
  const target=new URL(href,origin);assert.equal(target.origin,origin);
  const response=await fetch(target);assert(response.ok,`${href}: ${response.status}`);result.links.push({href,status:response.status});
 }
}catch(error){result.errors.push(error.stack||String(error));process.exitCode=1;}
finally{await browser.close();await writeFile(path.join(output,'LOCAL-QA.json'),JSON.stringify(result,null,2)+'\n');}
if(result.errors.length)console.error(result.errors.join('\n'));else console.log('Photo links and all five viewport checks passed. No inquiry was sent.');
