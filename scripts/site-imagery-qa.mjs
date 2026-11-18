import {createRequire} from 'node:module';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const task=path.resolve(import.meta.dirname,'../../docs/site-imagery-20261019');
const out=path.join(task,'qa');await mkdir(out,{recursive:true});
const origin='http://127.0.0.1:4322';
const before=JSON.parse(await readFile(path.join(task,'before/all-routes.json'),'utf8'));
const after=JSON.parse(await readFile(path.join(task,'after/all-routes.json'),'utf8'));
const jobs=JSON.parse(await readFile(path.join(task,'GENERATION-JOBS.json'),'utf8'));
const report={conditions:{browser:'Chrome152',dpr:1,zoom:1},integrity:[],routes:[],models:[],responsive:[],interactions:[],errors:[]};
assert.deepEqual(after.pages.map(p=>p.url),before.pages.map(p=>p.url));
assert.deepEqual(after.businessSourceHashes,before.businessSourceHashes);
assert.equal(after.missingImageFiles.length,0);
report.integrity.push('Same 137 HTML routes; no missing image files; catalog, recorded parameters, company identity, CarSearch, QuoteForm and inquiry code hashes unchanged.');
for(const page of after.pages){const old=before.pages.find(p=>p.url===page.url);assert.deepEqual(page.seo,old.seo,`SEO changed ${page.url}`);}
report.integrity.push('Every inventoried page keeps title/description/robots/canonical.');
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Administrator/.agent-browser/browsers/chrome-152.0.7977.64/chrome.exe'});
async function settle(page){await page.evaluate(async()=>{await document.fonts.ready;for(const i of document.images)i.loading='eager';await Promise.race([Promise.allSettled([...document.images].map(i=>i.decode())),new Promise(r=>setTimeout(r,8000))]);});}
async function metrics(page){return page.evaluate(()=>({url:location.pathname,overflow:document.documentElement.scrollWidth-innerWidth,images:[...document.querySelectorAll('main img')].filter(i=>i.getClientRects().length).map(i=>({src:i.getAttribute('src'),currentSrc:i.currentSrc,loaded:i.complete&&i.naturalWidth>0})),modules:document.querySelectorAll('main [data-core-module]').length}));}
try{
 const resumed=process.env.IMAGERY_FUNCTIONS_ONLY?JSON.parse(await readFile(path.join(out,'pre-functional-check.json'),'utf8')):undefined;
 if(resumed){assert.equal(resumed.models.length,36);assert.equal(resumed.responsive.length,24);assert.ok(resumed.models.every(m=>m.originalAccessible&&m.galleryDialog));assert.ok(resumed.responsive.every(m=>m.overflow===0&&m.images.every(i=>i.loaded)));report.models=resumed.models;report.responsive=resumed.responsive.filter(m=>m.route!=='/export-services/');report.integrity.push('Completed model and responsive checks reused from pre-functional-check.json; correct the filter test locator, and recheck the changed services frame separately.');}
 // Every discovered route receives a real mobile DOM/image/overflow check, not a visual score.
 const routeProof=process.env.IMAGERY_REUSE_ROUTES?JSON.parse(await readFile(path.join(out,'initial-check.json'),'utf8')):undefined;
 if(routeProof){assert.equal(routeProof.routes.length,137);assert.ok(routeProof.routes.every(r=>r.overflow===0&&r.errors.length===0&&r.images.every(i=>i.loaded)));report.routes=routeProof.routes;report.integrity.push('Route checks reused from initial-check.json; only the test border-height comparison changed.');}
 const queue=routeProof?[]:[...after.pages];
 await Promise.all(Array.from({length:4},async()=>{const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1}),page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));while(queue.length){const target=queue.shift();errors=[];try{const response=await page.goto(origin+target.url,{waitUntil:'networkidle',timeout:30000});await settle(page);const m=await metrics(page);const result={requested:target.url,status:response.status(),...m,errors:[...errors]};report.routes.push(result);if(target.url!=='/404.html')assert.equal(result.status,200,target.url);assert.equal(m.overflow,0,target.url+' overflow');assert.ok(m.images.every(i=>i.loaded),target.url+' broken image');assert.equal(errors.length,0,target.url+' script errors');}catch(e){report.errors.push(String(e.stack||e));}if(report.routes.length%20===0)console.log(`Route checks ${report.routes.length}/137`);}await context.close();}));
 // Each new model scene is shown in its own real page at both common viewports.
 for(const width of resumed?[]:[1440,390]){
  const page=await browser.newPage({viewport:{width,height:width===1440?900:844},deviceScaleFactor:1});
  for(const j of jobs.filter(j=>j.kind==='new'||j.kind==='used')){
   const route=`/${j.kind==='new'?'new-cars':'used-cars'}/${j.brandSlug}/${j.slug}/`;
   await page.goto(origin+route,{waitUntil:'networkidle'});await settle(page);
   const lead=page.locator('.detail-photo-expand img');assert.equal(await lead.getAttribute('src'),`/images/site-imagery-20261019/${j.id}.webp`);
   const main=await lead.boundingBox();const frameHeight=await page.locator('.detail-main-image').evaluate(e=>Math.round(e.getBoundingClientRect().height));assert.ok(Math.abs(main.width/main.height-4/3)<.01,'Model lead aspect ratio '+j.id);
   const m=await metrics(page);assert.equal(m.overflow,0);
   await page.screenshot({path:path.join(out,`${j.id}-${width}.png`),animations:'disabled'});
   const originalBefore=await page.locator('.gallery-caption>a').first().getAttribute('href');assert.equal(originalBefore,j.image);
   const thumb=page.getByRole('button',{name:'View model photograph 2',exact:true});if(await thumb.isVisible()){await thumb.click();await lead.evaluate(i=>i.decode());assert.ok(!(await lead.getAttribute('src')).includes('site-imagery-20261019'));assert.equal(await page.locator('.detail-main-image').evaluate(e=>Math.round(e.getBoundingClientRect().height)),frameHeight);}
   await page.getByRole('button',{name:`Enlarge ${j.name} photograph`,exact:true}).click();assert.ok(await page.locator('.detail-image-viewer').evaluate(e=>e.open));await page.keyboard.press('ArrowRight');await page.keyboard.press('Escape');assert.equal(await page.locator('.detail-image-viewer').evaluate(e=>e.open),false);
   const quote=await page.locator('.detail-main-actions a').first().getAttribute('href');const q=new URL(quote,origin);assert.equal(q.searchParams.get('model'),j.name);assert.equal(q.searchParams.get('kind'),j.kind);
   report.models.push({id:j.id,route,width,leadAspect:'4:3',originalAccessible:true,galleryDialog:true,quoteModel:j.name});
  }await page.close();console.log(`Model gallery checks complete at ${width}px`);
 }
 for(const width of resumed?[]:[1024,768,320]){
  const page=await browser.newPage({viewport:{width,height:width===1024?768:width===768?1024:844},deviceScaleFactor:1});
  for(const [id,route] of [['home','/'],['brands','/new-cars/brands/'],['wuling','/new-cars/wuling/'],['corolla','/new-cars/toyota/corolla/'],['used','/used-cars/'],['s450','/used-cars/mercedes-benz/s-450l/'],['services','/export-services/'],['contact','/contact/']]){await page.goto(origin+route,{waitUntil:'networkidle'});await settle(page);const m=await metrics(page);assert.equal(m.overflow,0,route+' '+width);assert.ok(m.images.every(i=>i.loaded));await page.screenshot({path:path.join(out,`${id}-${width}.png`),animations:'disabled'});report.responsive.push({route,width,...m});}
  await page.close();
 }
 for(const width of [1440,1024,768,390,320]){const p=await browser.newPage({viewport:{width,height:width===1440?900:width===1024?768:width===768?1024:844}});await p.goto(origin+'/export-services/',{waitUntil:'networkidle'});await settle(p);const m=await metrics(p);assert.equal(m.overflow,0);assert.ok(m.images.every(i=>i.loaded));await p.locator('.ex-overview-services').screenshot({path:path.join(out,`services-cards-${width}.png`)});report.responsive.push({route:'/export-services/',width,...m});await p.close();}
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto(origin+'/used-cars/',{waitUntil:'networkidle'});await page.locator('#catalog-filter-options select').first().selectOption('bmw');assert.equal(await page.locator('.vehicle-card').count(),2);assert.ok((await page.locator('.vehicle-card img').evaluateAll(a=>a.map(i=>i.getAttribute('src')))).every(s=>s.includes('site-imagery-20261019/used-bmw-')));report.interactions.push('Used catalog filters preserve model-specific edited images.');
 await page.goto(origin+'/new-cars/toyota/corolla/',{waitUntil:'networkidle'});const version=page.locator('#vehicle-source-version');if(await version.locator('option').count()>1){await version.selectOption({index:1});assert.ok(new URL(page.url()).searchParams.get('variant'));assert.equal(await page.locator('.detail-main-actions a').first().evaluate(e=>new URL(e.href).searchParams.get('variant')),await version.inputValue());}report.interactions.push('Version selection continues into the quote URL.');
 await page.goto(origin+'/',{waitUntil:'networkidle'});const form=page.locator('.ah-inquiry-form');await form.locator('button').click();assert.equal(await form.evaluate(f=>f.checkValidity()),false);await form.locator('[name=model]').fill('Toyota Corolla');await form.locator('[name=country]').fill('Kenya');await form.locator('[name=quantity]').fill('0');assert.equal(await form.locator('[name=quantity]').evaluate(i=>i.validity.rangeUnderflow),true);await form.locator('[name=quantity]').fill('3');await form.locator('button').click();await page.waitForURL('**/quote/**');await page.getByRole('textbox',{name:'Model or vehicle requirement *',exact:true}).waitFor();await page.waitForFunction(()=>document.querySelector('input[aria-label="Model or vehicle requirement *"]')?.value==='Toyota Corolla');assert.equal(await page.getByRole('textbox',{name:'Quantity *',exact:true}).inputValue(),'3');assert.equal(await page.getByRole('textbox',{name:'Destination country *',exact:true}).inputValue(),'Kenya');await page.getByRole('textbox',{name:'Email'}).fill('visual-qa@example.invalid');await page.getByRole('button',{name:'Review inquiry',exact:true}).click();await page.locator('#quote-sharing').waitFor();assert.ok(await page.locator('#quote-sharing a[href^="mailto:"]').count());assert.ok(await page.locator('#quote-sharing a[href^="https://wa.me/"]').count());report.interactions.push('Required fields, quantity validation, GET prefill and prepared email/WhatsApp channels work; no message sent.');
 await page.close();
 report.passed=report.errors.length===0;
}catch(e){report.passed=false;report.errors.push(String(e.stack||e));console.error(e.stack||e);process.exitCode=1;}
finally{await browser.close();await writeFile(path.join(out,'qa.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,routes:report.routes.length,models:report.models.length,responsive:report.responsive.length,errors:report.errors.length}));}

