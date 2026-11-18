import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {chromePath,origin} from './volta-local-capture.mjs';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const out=path.resolve(import.meta.dirname,'../../docs/volta-home-20261019');await mkdir(path.join(out,'qa'),{recursive:true});
const checks=[],errors=[];let links=[];
const record=(name,condition,detail={})=>{checks.push({name,pass:!!condition,...detail});if(!condition)console.log('FAIL '+name+' '+JSON.stringify(detail));};
const browser=await chromium.launch({headless:true,executablePath:chromePath});
try{
 for(const width of [1440,1024,768,390,320]){
  const context=await browser.newContext({viewport:{width,height:width===768?1024:width<=390?844:900},deviceScaleFactor:1});
  const page=await context.newPage();page.on('pageerror',e=>errors.push({width,error:e.message}));await page.goto(origin+'/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  const base=await page.evaluate(()=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth,modules:document.querySelectorAll('[data-v-section]').length,h1:document.querySelectorAll('h1').length,robots:document.querySelector('meta[name=robots]')?.content,newCount:document.querySelectorAll('.v-product-rail-new article').length,usedCount:document.querySelectorAll('.v-product-rail-used article').length}));
  record(`${width}: baseline`,base.pageWidth===width&&base.modules===14&&base.h1===1&&base.robots==='noindex,nofollow'&&base.newCount===8&&base.usedCount===7,base);
  if(width===1440)links=await page.locator('a[href]').evaluateAll(nodes=>[...new Set(nodes.map(a=>a.getAttribute('href')).filter(h=>h.startsWith('/')||h.startsWith('#')))]);
  await page.locator('#v-hero-search').fill('Camry');await page.locator('.v-search button').click();await page.locator('dialog.car-search[open]').waitFor();
  record(`${width}: hero search`,await page.locator('.car-search-results a:visible').count()>0,{status:await page.locator('.car-search-count').textContent()});
  await page.locator('#car-search-input').fill('zzzz-no-model-found');record(`${width}: empty search`,await page.locator('.car-search-results a:visible').count()===0,{status:await page.locator('.car-search-count').textContent()});
  await page.keyboard.press('Escape');record(`${width}: search Escape and focus`,await page.locator('dialog.car-search[open]').count()===0&&await page.locator('.car-search-trigger').evaluate(e=>e===document.activeElement));
  if(width>=1024){
   for(let i=0;i<4;i++){
    const group=page.locator('.v-nav-group').nth(i);await group.hover();await page.waitForTimeout(220);
    record(`${width}: desktop submenu ${i}`,await group.locator('[data-v-disclosure]').getAttribute('aria-expanded')==='true'&&await group.locator('.v-mega').isVisible());
    if(i===0&&width===1440)await page.screenshot({path:path.join(out,'qa','desktop-menu.png'),fullPage:false});
    await page.keyboard.press('Escape');record(`${width}: submenu Escape ${i}`,!await group.locator('.v-mega').isVisible());
   }
   const first=page.locator('.v-nav-top>a').first();await first.focus();await page.keyboard.press('ArrowDown');record(`${width}: submenu keyboard`,await page.locator('.v-mega-links a').first().evaluate(e=>e===document.activeElement));await page.keyboard.press('Escape');
  }else{
   const toggle=page.locator('.v-menu-toggle');await toggle.click();record(`${width}: mobile menu open`,await toggle.getAttribute('aria-expanded')==='true'&&await page.locator('main').evaluate(e=>e.inert));
   await page.getByRole('button',{name:'Show New Cars menu',exact:true}).click();record(`${width}: mobile subnavigation`,await page.locator('#volta-menu-0').isVisible());
   if(width===390)await page.screenshot({path:path.join(out,'qa','mobile-menu.png'),fullPage:false});
   record(`${width}: menu width`,await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
   await page.keyboard.press('Escape');record(`${width}: menu Escape and focus`,await toggle.getAttribute('aria-expanded')==='false'&&await toggle.evaluate(e=>e===document.activeElement)&&!await page.locator('main').evaluate(e=>e.inert));
   await toggle.click();await toggle.focus();await page.keyboard.press('Tab');record(`${width}: menu focus loop`,await page.locator('.v-wordmark').evaluate(e=>e===document.activeElement));await page.keyboard.press('Escape');
  }
  await page.evaluate(()=>scrollTo({top:220,behavior:'instant'}));await page.waitForTimeout(250);record(`${width}: solid scroll header`,await page.locator('.v-header').getAttribute('data-solid')==='true');
  for(const kind of ['new','used']){
   const rail=page.locator(`.v-product-rail-${kind}`);await rail.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(350);
   record(`${width}: ${kind} rail keyboard`,await rail.evaluate(e=>e.scrollLeft>0));
   await rail.locator('article:last-child h3 a').focus();record(`${width}: ${kind} final model reachable`,await rail.locator('article:last-child h3 a').evaluate(e=>{const r=e.getBoundingClientRect(),p=e.closest('.v-product-rail').getBoundingClientRect();return r.left>=p.left-1&&r.right<=p.right+1;}));
  }
  const summaries=page.locator('.v-faq summary');await summaries.nth(0).click();await summaries.nth(1).click();record(`${width}: FAQ multi-open`,await page.locator('.v-faq details[open]').count()===2);await summaries.nth(0).click();await summaries.nth(1).click();
  const form=page.locator('.v-inquiry-form');record(`${width}: required fields`,!await form.evaluate(e=>e.checkValidity()));
  await form.locator('[name=model]').fill('Toyota Camry');await form.locator('[name=country]').fill('United Arab Emirates');await form.locator('[name=quantity]').fill('0');record(`${width}: quantity zero rejected`,!await form.evaluate(e=>e.checkValidity()));
  await form.locator('[name=quantity]').fill('1.5');record(`${width}: fractional quantity rejected`,!await form.evaluate(e=>e.checkValidity()));
  await form.locator('[name=quantity]').fill('3');await Promise.all([page.waitForURL('**/quote/?**'),form.locator('button').click()]);
  await page.locator('.quote-fields:not([disabled])').waitFor({timeout:12000});const u=new URL(page.url()),values=await page.locator('input').evaluateAll(es=>es.map(e=>e.value));record(`${width}: inquiry parameters and prefill`,u.searchParams.get('model')==='Toyota Camry'&&u.searchParams.get('quantity')==='3'&&u.searchParams.get('country')==='United Arab Emirates'&&values.includes('Toyota Camry')&&values.includes('United Arab Emirates'),{url:u.pathname+u.search,prefilled:values.filter(v=>['Toyota Camry','United Arab Emirates','3'].includes(v))});
  await page.goto(origin+'/',{waitUntil:'networkidle'});if(width===320){await page.evaluate(()=>document.querySelectorAll('img').forEach(i=>i.loading='eager'));await page.evaluate(()=>Promise.allSettled([...document.images].map(i=>i.decode())));await page.screenshot({path:path.join(out,'qa','320-full.png'),fullPage:true,animations:'disabled'});await page.screenshot({path:path.join(out,'qa','320-first.png'),fullPage:false,animations:'disabled'});}
  record(`${width}: final no overflow`,await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));await context.close();
 }
 const context=await browser.newContext(),page=await context.newPage();
 for(const href of links){const u=new URL(href,origin);const response=await context.request.get(u.href);record('Link '+href,response.ok(),{status:response.status()});if(u.hash&&response.ok()){const body=await response.text(),id=decodeURIComponent(u.hash.slice(1));record('Anchor '+href,new RegExp(`id=["']${id}["']`).test(body));}}
 for(const route of ['/new-cars/','/new-cars/toyota/camry/','/export-services/','/contact/','/quote/']){
  await page.goto(origin+route,{waitUntil:'networkidle'});record('Inner-page isolation '+route,await page.locator('body.site-nest').count()===1&&await page.locator('body.volta-site').count()===0&&await page.locator('h1').count()===1);
 }
 await page.goto(origin+'/new-cars/?body=SUV',{waitUntil:'networkidle'});await page.waitForTimeout(450);record('Category filter reaches catalog',await page.locator('select').evaluateAll(es=>es.some(e=>e.value==='SUV')));
 await context.close();
}finally{await browser.close();}
const report={origin,checkedAt:new Date().toISOString(),checks,errors,summary:{checks:checks.length,passed:checks.filter(c=>c.pass).length,failed:checks.filter(c=>!c.pass).length,pageErrors:errors.length},notPerformed:['No emails or WhatsApp messages sent','No production deployment','No external account or payment actions']};
await writeFile(path.join(out,'QA.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.summary));if(report.summary.failed||errors.length)process.exitCode=1;
