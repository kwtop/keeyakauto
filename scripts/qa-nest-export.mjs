// Local rendered evidence for the export-service and buyer-resource rollout.
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin=process.argv[2] || 'http://127.0.0.1:4322';
const stage=process.argv[3] || 'after';
if(new URL(origin).hostname!=='127.0.0.1')throw new Error('Only the local app is allowed');
const routes=process.env.EXPORT_QA_ROUTES?.split(',')||['/export-services/','/export-services/buying-guide/','/export-services/sourcing-inspection/','/export-services/shipping-support/','/export-services/faq/','/guides/','/guides/comparisons/','/export-services/buying-guide/countries/mexico/','/guides/buying/','/export/','/export/projects/'];
const root=path.resolve(process.cwd(),'..');
const output=path.join(root,'checkpoints/nest-site-20261019/export',stage);
await mkdir(output,{recursive:true});
const result={stage,origin,createdAt:new Date().toISOString(),pages:[],functional:[],errors:[]};
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
try{
 const sizes=process.env.EXPORT_QA_SIZES?.split(',').map(value=>value.split('x').map(Number))||[[1440,900],[390,844]];
 for(const [width,height] of sizes){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  await context.route('**/*',route=>{const u=new URL(route.request().url());return u.origin===origin||['data:','blob:'].includes(u.protocol)?route.continue():route.abort();});
  const page=await context.newPage();
  for(const url of routes){
   const errors=[];const onError=e=>errors.push(e.message);page.on('pageerror',onError);
   await page.goto(origin+url,{waitUntil:'networkidle',timeout:60000});
   await page.evaluate(()=>document.fonts.ready);
   for(const img of await page.locator('main img').all()){
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(image=>image.decode()).catch(()=>{});
   }
   await page.waitForFunction(()=>[...document.querySelectorAll('main img')].every(i=>i.complete),{timeout:20000}).catch(()=>{});
   await page.keyboard.press('Control+Home');
   await page.waitForTimeout(900);
   const metrics=await page.evaluate(()=>{
    const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height};};
    const modules=[...document.querySelectorAll('main [data-core-module]')];
    return{url:location.pathname,title:document.title,viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,h1:[...document.querySelectorAll('main h1')].map(e=>({text:e.textContent,font:getComputedStyle(e).font,...rect(e)})),modules:modules.map(e=>({id:e.dataset.coreModule,withImage:!!e.querySelector('img'),...rect(e)})),images:[...document.querySelectorAll('main img')].map(e=>({src:e.currentSrc,loaded:e.complete&&e.naturalWidth>0,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight,fit:getComputedStyle(e).objectFit,position:getComputedStyle(e).objectPosition,...rect(e)})),anchors:[...document.querySelectorAll('main a[href^="#"]')].map(a=>({href:a.getAttribute('href'),exists:!!document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)))})),robots:document.querySelector('meta[name=robots]')?.content};
   });
   const name=url.replace(/^\/|\/$/g,'').replaceAll('/','__')||'home';
   await page.screenshot({path:path.join(output,name+'-'+width+'.png'),fullPage:true,animations:'disabled'});
   await page.screenshot({path:path.join(output,name+'-'+width+'-first.png'),fullPage:false,animations:'disabled'});
   result.pages.push({...metrics,errors,screenshot:name+'-'+width+'.png'});
   if(metrics.overflow||metrics.h1.length!==1||metrics.images.some(i=>!i.loaded)||metrics.anchors.some(a=>!a.exists)||errors.length)result.errors.push({url,width,overflow:metrics.overflow,h1:metrics.h1.length,badImages:metrics.images.filter(i=>!i.loaded),badAnchors:metrics.anchors.filter(a=>!a.exists),errors});
   page.off('pageerror',onError);
  }
  if(stage!=='before'){
   await page.goto(origin+'/export-services/shipping-support/',{waitUntil:'networkidle'});
   const tab=page.getByRole('tab',{name:'Container',exact:true});await tab.click();
   const container=await page.locator('#route-panel-container').isVisible();await tab.press('ArrowRight');
   const overland=await page.locator('#route-panel-overland').isVisible();
   result.functional.push({width,check:'Transport tabs click and keyboard arrows',passed:container&&overland});
   await page.goto(origin+'/export-services/faq/',{waitUntil:'networkidle'});
   await page.getByRole('searchbox',{name:'Search questions and answers'}).fill('battery');
   const visible=await page.locator('.ex-faq-items details:visible').count();
   const opened=await page.locator('.ex-faq-items details[open]:visible').count();
   await page.getByRole('button',{name:'Clear',exact:true}).click();
   const restored=await page.locator('.ex-faq-items details:visible').count();
   result.functional.push({width,check:'FAQ searches answers, opens matches and restores all questions',passed:visible>0&&visible===opened&&restored>visible,matches:visible,total:restored});
   await page.goto(origin+'/export-services/',{waitUntil:'networkidle'});
   const form=page.locator('.ex-request-form');
   const invalid=await form.evaluate(e=>!e.checkValidity());
   await form.getByLabel('Model or vehicle requirement').fill('Toyota Camry');
   await form.getByLabel('Vehicle type').selectOption('new');
   await form.getByLabel('Quantity',{exact:true}).fill('3');
   await form.getByLabel('Destination country').fill('Kenya');
   const valid=await form.evaluate(e=>e.checkValidity());
   result.functional.push({width,check:'Required inquiry fields and native quantity validation',passed:invalid&&valid,action:await form.getAttribute('action'),method:await form.getAttribute('method')});
   await Promise.all([page.waitForURL(url=>url.pathname==='/quote/'&&url.searchParams.get('model')==='Toyota Camry'),form.getByRole('button',{name:'Review vehicle request',exact:true}).click()]);
   const parameters=new URL(page.url()).searchParams;
   result.functional.push({width,check:'Inquiry GET navigation preserves model, quantity, country and service',passed:parameters.get('quantity')==='3'&&parameters.get('country')==='Kenya'&&parameters.get('service')==='export-services'&&parameters.get('kind')==='new'});
  }
  await context.close();
 }
}finally{await browser.close();await writeFile(path.join(output,'QA.json'),JSON.stringify(result,null,2)+'\n');}
console.log(JSON.stringify({stage,pages:result.pages.length,errors:result.errors,functional:result.functional,output},null,2));
