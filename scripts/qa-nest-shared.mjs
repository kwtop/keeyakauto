// Final local responsive and shared interaction checks. No messages are sent.
import {createRequire} from 'node:module';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(process.cwd(),'..'),origin='http://127.0.0.1:4322';
const folder=path.join(root,'checkpoints/nest-site-20261019/shared-final');await mkdir(folder,{recursive:true});
const inventory=JSON.parse(await readFile(path.join(root,'docs/nest-site-20261019/URL-INVENTORY-BEFORE.json'),'utf8'));
const report={origin,scope:'Local responsive layouts, shared UI and existing redirects',sentMessages:false,responsive:[],interactions:[],redirects:[],errors:[]};
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const context=await browser.newContext({deviceScaleFactor:1});
await context.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
const page=await context.newPage();page.on('pageerror',e=>report.errors.push({kind:'pageerror',message:e.message,url:page.url()}));
const expect=(condition,name,extra={})=>{const item={name,pass:!!condition,...extra};report.interactions.push(item);if(!condition)report.errors.push(item);};
try{
 const urls=['/','/new-cars/','/new-cars/changan/','/new-cars/brands/','/new-cars/byd/sea-lion-06-dm-i/','/used-cars/mercedes-benz/s-450l/','/export-services/','/export-services/faq/','/guides/comparisons/','/about/','/about/news/annual-gathering-2026/','/contact/','/quote/','/privacy/','/terms/'];
 for(const width of [1024,768,320]){
  await page.setViewportSize({width,height:width===768?1024:844});
  for(const url of urls){
   await page.goto(origin+url,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
   const data=await page.evaluate(()=>({width:innerWidth,height:innerHeight,pageHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,headerHeight:document.querySelector('header').getBoundingClientRect().height,broken:[...document.querySelectorAll('main img')].filter(i=>i.getBoundingClientRect().width>0&&i.complete&&!i.naturalWidth).map(i=>i.src),oversizedCards:[...document.querySelectorAll('.brand-model-results .vehicle-card')].filter(e=>innerWidth>=1024&&e.getBoundingClientRect().width>innerWidth*.7).length}));
   report.responsive.push({url,...data});if(data.overflow||data.broken.length||data.oversizedCards)report.errors.push({url,...data});
  }
 }
 for(const width of [1440,1024,768,390,320]){
  await page.setViewportSize({width,height:900});await page.goto(origin+'/',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Search cars',exact:true}).click();
  await page.locator('#car-search-input').fill('Camry');
  expect(await page.locator('.car-search-results a:not([hidden])').count()>0,'search-model',{width});
  await page.locator('#car-search-input').fill('NoSuchModelQAZ987');expect((await page.locator('.car-search-count').textContent()).startsWith('0 matching'),'search-empty',{width});
  await page.locator('#car-search-input').press('Escape');expect(!(await page.locator('dialog.car-search').evaluate(e=>e.open)),'search-escape',{width});
  expect(await page.locator('.car-search-trigger').evaluate(e=>e===document.activeElement),'search-focus-restored',{width});
  if(width<1024)await page.getByRole('button',{name:'Open navigation',exact:true}).click();
  await page.getByRole('button',{name:'Show New Cars menu',exact:true}).click();
  const panel=page.locator('#navigation-panel-0');const bounds=await panel.boundingBox();
  expect(await panel.isVisible()&&bounds.x>=-.5&&bounds.x+bounds.width<=width+.5,'brand-menu-contained',{width,bounds});
  await page.keyboard.press('Escape');if(width<1024)await page.keyboard.press('Escape');
  expect(!(await panel.isVisible()),'brand-menu-escape',{width});
  await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,750)});await page.waitForTimeout(400);
  expect(await page.locator('header').getAttribute('data-scroll-hidden')==='true','scroll-down-hides-header',{width});
  await page.evaluate(()=>window.scrollTo(0,550));await page.waitForTimeout(400);
  expect(await page.locator('header').getAttribute('data-scroll-hidden')===null,'scroll-up-reveals-header',{width});
  if(width<768){const toggle=page.locator('.nest-footer-toggle').first();await toggle.click();expect(await toggle.getAttribute('aria-expanded')==='true','footer-expand',{width});await toggle.click();expect(await toggle.getAttribute('aria-expanded')==='false','footer-collapse',{width});}
  await page.screenshot({path:path.join(folder,'shared-'+width+'.png'),fullPage:false,animations:'disabled'});
 }
 for(const item of inventory.pages.filter(p=>p.scope==='preserve-redirect')){
  const html=await readFile(path.join(root,'workspace/dist',item.file),'utf8');const target=html.match(/<a href="([^"]+)"/)?.[1];if(!target)throw Error('Missing redirect '+item.url);
  await page.goto(origin+item.url+'?review=nest');await page.waitForURL(u=>u.pathname===new URL(target,origin).pathname,{waitUntil:'networkidle'});
  const actual=new URL(page.url()),expected=new URL(target,origin);const pass=actual.pathname===expected.pathname&&actual.hash===expected.hash&&actual.search==='?review=nest';
  report.redirects.push({url:item.url,target,actual:page.url(),pass});if(!pass)report.errors.push({kind:'redirect',url:item.url,target,actual:page.url()});
 }
}finally{await context.close();await browser.close();await writeFile(path.join(root,'docs/nest-site-20261019/SHARED-FINAL-QA.json'),JSON.stringify(report,null,2)+'\n');}
console.log(JSON.stringify({responsiveCases:report.responsive.length,interactions:report.interactions.length,redirects:report.redirects.length,errors:report.errors},null,2));
