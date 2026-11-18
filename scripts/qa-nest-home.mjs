// Rendered checks for this homepage change. Every network request is restricted to the local app.
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin=process.env.NEST_QA_ORIGIN || 'http://127.0.0.1:4322';
assert.equal(new URL(origin).hostname,'127.0.0.1','Only the explicitly local app is supported.');
const root=path.resolve(process.cwd(),'..');
const output=path.join(root,'docs/nest-home-20261018');
const evidence=path.join(root,'checkpoints/nest-home-20261018/functional');
await Promise.all([mkdir(output,{recursive:true}),mkdir(evidence,{recursive:true})]);
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const result={origin,referenceNetworkAccess:false,viewports:[],functional:[],links:[],errors:[]};
const sizes=[[1440,900],[1280,900],[1024,768],[768,1024],[390,844],[320,844]];
const localHrefs=new Set();
try {
 for(const [width,height] of sizes){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  await context.route('**/*',route=>{const url=new URL(route.request().url());return url.origin===origin||['data:','blob:'].includes(url.protocol)?route.continue():route.abort();});
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/',{waitUntil:'networkidle',timeout:60000});
  await page.evaluate(()=>document.fonts.ready);
  // Visit every lazy image, including product cards beyond the first horizontal page.
  for(const image of await page.locator('main img').all())await image.scrollIntoViewIfNeeded();
  await page.locator('.nest-model-card').first().scrollIntoViewIfNeeded();
  await page.keyboard.press('Control+Home');
  await page.waitForFunction(()=>scrollY<2);
  await page.waitForFunction(()=>document.querySelector('header').getBoundingClientRect().top>-.5);
  await page.waitForFunction(()=>[...document.querySelectorAll('main img')].every(image=>image.complete&&image.naturalWidth>0));
  const metrics=await page.evaluate(()=>{
   const box=e=>{const r=e.getBoundingClientRect();const c=getComputedStyle(e);return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height,font:c.font,fontFamily:c.fontFamily,fontSize:c.fontSize,lineHeight:c.lineHeight,letterSpacing:c.letterSpacing,padding:c.padding,background:c.backgroundColor};};
   return {url:location.href,title:document.title,viewport:{width:innerWidth,height:innerHeight,clientWidth:document.documentElement.clientWidth,dpr:devicePixelRatio},height:document.documentElement.scrollHeight,fontsReady:document.fonts.status==='loaded',overflow:document.documentElement.scrollWidth>innerWidth,header:box(document.querySelector('header')),heroTitle:box(document.querySelector('h1')),container:box(document.querySelector('.nest-container')),sections:[...document.querySelectorAll('[data-core-module]')].map(e=>({name:e.dataset.coreModule,...box(e)})),images:[...document.querySelectorAll('main img')].map(e=>({src:e.currentSrc,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight,fit:getComputedStyle(e).objectFit,position:getComputedStyle(e).objectPosition,...box(e)})),robots:document.querySelector('meta[name=robots]')?.content,description:document.querySelector('meta[name=description]')?.content,ogImage:document.querySelector('meta[property="og:image"]')?.content};
  });
  result.viewports.push({...metrics,errors});
  assert.equal(metrics.overflow,false,`Overflow at ${width}`);
  assert.equal(metrics.sections.length,6);
  assert.equal(metrics.images.length,17);
  assert.equal(new Set(metrics.images.map(i=>i.src)).size,17);
  assert.equal(metrics.robots,'noindex,nofollow');
  assert.equal(errors.length,0,errors.join('\n'));
  assert.equal(Math.round(metrics.heroTitle.height/Number.parseFloat(metrics.heroTitle.lineHeight)),2,`Hero title should have two lines at ${width}`);
  for(const href of await page.locator('a[href]').evaluateAll(elements=>elements.map(e=>e.getAttribute('href')).filter(h=>h?.startsWith('/')&&!h.startsWith('//'))))localHrefs.add(href);
  if(width===1024||width===1440){
   await page.mouse.wheel(0,700);await page.waitForFunction(()=>document.querySelector('header').dataset.scrollHidden==='true');
   await page.mouse.wheel(0,-250);await page.waitForFunction(()=>!document.querySelector('header').dataset.scrollHidden);
   await page.keyboard.press('Control+Home');await page.waitForFunction(()=>scrollY<2&&document.querySelector('header').getBoundingClientRect().top>-.5);
   result.functional.push({viewport:width,check:'Header hides on downward scroll and returns on upward scroll',passed:true});
   assert.equal(await page.getByRole('button',{name:'Open navigation',exact:true}).isVisible(),false);
   const disclosure=page.getByRole('button',{name:'Show New Cars menu',exact:true});await disclosure.click();
   const panel=page.locator('#navigation-panel-0');assert.equal(await panel.isVisible(),true);
   const bounds=await panel.boundingBox();assert(bounds.x>=0&&bounds.x+bounds.width<=width);
   await page.keyboard.press('Escape');assert.equal(await panel.isVisible(),false);
   result.functional.push({viewport:width,check:'Desktop navigation, bounded brand panel and Escape',passed:true});
  }
  if(width===390){
   await page.getByRole('button',{name:'Open navigation',exact:true}).click();
   assert.equal(await page.getByRole('navigation',{name:'Main navigation',exact:true}).isVisible(),true);
   await page.getByRole('button',{name:'Show New Cars menu',exact:true}).click();
   assert.equal(await page.locator('#navigation-panel-0').isVisible(),true);
   await page.keyboard.press('Escape');
   assert.equal(await page.getByRole('button',{name:'Open navigation',exact:true}).getAttribute('aria-expanded'),'false');
   assert.equal(await page.locator('html').evaluate(e=>e.classList.contains('navigation-open')),false);
   const footerToggle=page.locator('.nest-footer-toggle').filter({hasText:'Export Services'});
   assert.equal(await footerToggle.getAttribute('aria-expanded'),'false');await footerToggle.click();assert.equal(await footerToggle.getAttribute('aria-expanded'),'true');
   await footerToggle.click();assert.equal(await footerToggle.getAttribute('aria-expanded'),'false');
   result.functional.push({viewport:width,check:'Mobile menu, brand submenu, Escape, scroll unlock and footer accordion',passed:true});
  }
  if(width===1440){
   await page.getByRole('button',{name:'Search cars',exact:true}).click();
   await page.getByRole('searchbox',{name:'Model or brand',exact:true}).fill('Camry');
   assert.equal(await page.locator('.car-search-results a:not([hidden])').count(),1);
   assert.equal(await page.locator('.car-search-results a:not([hidden])').getAttribute('href'),'/new-cars/toyota/camry/');
   await page.screenshot({path:path.join(evidence,'search-desktop.png')});await page.keyboard.press('Escape');
   assert.equal(await page.locator('dialog.car-search').getAttribute('open'),null);
   await page.getByRole('button',{name:'Next models',exact:true}).click();
   await page.waitForFunction(()=>document.querySelector('.nest-model-track').scrollLeft>100);
   assert.equal(await page.getByRole('button',{name:'Previous models',exact:true}).isEnabled(),true);
   result.functional.push({viewport:width,check:'Car search and scrollable product rail',passed:true});
   await page.locator('.nest-brief-form button').click();assert.equal(new URL(page.url()).pathname,'/');
   assert.equal(await page.locator('.nest-brief-form [name=model]').evaluate(e=>e.validity.valid),false);
   await page.getByLabel('Model / requirement *',{exact:true}).fill('Toyota Camry');await page.getByLabel('Quantity *',{exact:true}).fill('3');await page.getByLabel('Destination country *',{exact:true}).fill('Kenya');
   await page.locator('.nest-brief-form button').click();
   await page.waitForURL('**/quote/?**');await page.waitForFunction(()=>document.querySelector('#vehicle-1-model')?.value==='Toyota Camry'&&!document.querySelector('#vehicle-1-model').disabled);
   assert.equal(await page.locator('#vehicle-1-model').inputValue(),'Toyota Camry');assert.equal(await page.locator('#vehicle-1-quantity').inputValue(),'3');assert.equal(await page.locator('#country').inputValue(),'Kenya');
   assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('home-nest')),false);
   await page.screenshot({path:path.join(evidence,'quote-handoff-desktop.png')});
   result.functional.push({viewport:width,check:'Required-field validation, GET handoff and hydrated inquiry values; no sending',passed:true});
   assert.equal(errors.length,0,errors.join('\n'));
  }
  await context.close();
 }
 for(const href of localHrefs){
  const url=new URL(href,origin);url.hash='';
  const response=await fetch(url,{redirect:'manual'});
  result.links.push({href,status:response.status});
  assert(response.status>=200&&response.status<400,`Broken local link ${href}: ${response.status}`);
 }
} catch(error){result.errors.push(error.stack||String(error));}
finally{await browser.close();await writeFile(path.join(output,'LOCAL-QA.json'),JSON.stringify(result,null,2)+'\n');}
console.log(JSON.stringify({viewports:result.viewports.length,checks:result.functional,links:result.links.length,errors:result.errors},null,2));
if(result.errors.length)process.exitCode=1;
