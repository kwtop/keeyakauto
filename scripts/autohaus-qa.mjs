import {createRequire} from 'node:module';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin=process.env.AUTOHAUS_ORIGIN||'http://127.0.0.1:4353/';
const task=path.resolve(import.meta.dirname,'../../docs/autohaus-home-20261019');
const phase=process.argv[2]||'qa-dev';const out=path.join(task,phase);await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Administrator/.agent-browser/browsers/chrome-152.0.7977.64/chrome.exe'});
const report={origin,phase,checks:[],errors:[],viewports:[]};
const check=(name,data=true)=>{report.checks.push({name,passed:true,data});};
try{
 for(const [width,height] of [[1440,900],[1024,768],[768,1024],[390,844],[320,844]]){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);assert.equal(await page.locator('.ah-home>section').count(),10);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.equal(await page.locator('main h1').count(),1);
  const font=await page.locator('h1').evaluate(e=>({family:getComputedStyle(e).fontFamily,weight:getComputedStyle(e).fontWeight,size:getComputedStyle(e).fontSize,line:getComputedStyle(e).lineHeight}));assert.equal(font.weight,'500');assert.ok(font.family.includes('KEEYAK Display'));
  assert.equal(await page.locator('.ah-header').getAttribute('data-solid'),'false');await page.evaluate(()=>scrollTo({top:500,behavior:'instant'}));await page.waitForTimeout(300);assert.equal(await page.locator('.ah-header').getAttribute('data-solid'),'true');assert.equal(await page.locator('.car-search-trigger').evaluate(e=>getComputedStyle(e).color),'rgb(33, 33, 33)');await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(300);assert.equal(await page.locator('.ah-header').getAttribute('data-solid'),'false');
  const navLinks=await page.locator('.ah-header a[href]').evaluateAll(els=>[...new Set(els.map(e=>e.getAttribute('href')))].sort());
  const baseline=JSON.parse(await readFile(path.join(task,'before/capture.json'),'utf8')).captures.find(c=>c.viewport.width===(width===320?390:width));
  assert.deepEqual(navLinks,[...new Set(baseline.navLinks.map(e=>e.href))].sort());
  if(width<810){
   await page.getByRole('button',{name:'Open navigation',exact:true}).click();assert.equal(await page.locator('.ah-navigation').getAttribute('aria-modal'),'true');assert.equal(await page.locator('main').evaluate(e=>e.inert),true);
   await page.getByRole('button',{name:'Show New Cars menu',exact:true}).click();assert.equal(await page.locator('#autohaus-menu-0').isVisible(),true);
   await page.screenshot({path:path.join(out,`${width}-menu.png`)});
   for(let n=0;n<30;n++){await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.querySelector('.ah-header').contains(document.activeElement)),true);}
   await page.keyboard.press('Escape');assert.equal(await page.locator('.ah-navigation').isVisible(),false);assert.equal(await page.locator('main').evaluate(e=>e.inert),false);assert.equal(await page.getByRole('button',{name:'Open navigation',exact:true}).evaluate(e=>document.activeElement===e),true);
  }else{
   const disclosure=page.getByRole('button',{name:'Show New Cars menu',exact:true});await disclosure.focus();await page.keyboard.press('Enter');assert.equal(await disclosure.getAttribute('aria-expanded'),'true');await page.screenshot({path:path.join(out,`${width}-menu.png`)});await page.keyboard.press('Escape');assert.equal(await disclosure.getAttribute('aria-expanded'),'false');
   const newLink=page.locator('.ah-nav-top>a[href="/new-cars/"]');await newLink.focus();await page.keyboard.press('ArrowDown');assert.equal(await page.locator('#autohaus-menu-0 .ah-mega-all').evaluate(e=>e===document.activeElement),true);await page.keyboard.press('Escape');
  }
  await page.getByRole('button',{name:'Search cars',exact:true}).click();await page.locator('#car-search-input').fill('Camry');assert.ok(await page.locator('.car-search-results a:visible').count()>0);assert.ok((await page.locator('.car-search-results a:visible').allTextContents()).every(t=>t.includes('Camry')));
  await page.locator('#car-search-input').fill('model-that-does-not-exist');assert.equal(await page.locator('.car-search-results a:visible').count(),0);assert.ok((await page.locator('.car-search-count').innerText()).includes('0 matching models'));await page.keyboard.press('Escape');assert.equal(await page.locator('.car-search').evaluate(e=>e.open),false);
  if(width<810){await page.locator('[data-story-dot="1"]').click();await page.waitForTimeout(600);assert.equal(await page.locator('[data-story-dot="1"]').getAttribute('aria-pressed'),'true');await page.locator('.ah-story-gallery').focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(600);assert.equal(await page.locator('[data-story-dot="2"]').getAttribute('aria-pressed'),'true');}
  const form=page.locator('.ah-inquiry-form');await form.locator('button[type=submit]').click();assert.equal(new URL(page.url()).pathname,'/');assert.equal(await form.evaluate(e=>e.checkValidity()),false);
  await form.locator('[name=model]').fill('Toyota Camry');await form.locator('[name=country]').fill('Kenya');await form.locator('[name=quantity]').fill('0');assert.equal(await form.locator('[name=quantity]').evaluate(e=>e.validity.rangeUnderflow),true);
  await form.locator('[name=quantity]').fill('1000000000');assert.equal(await form.locator('[name=quantity]').evaluate(e=>e.validity.rangeOverflow),true);
  await form.locator('[name=quantity]').fill('3');await form.locator('button[type=submit]').click();await page.waitForURL('**/quote/**');
  assert.equal(new URL(page.url()).searchParams.get('model'),'Toyota Camry');assert.equal(new URL(page.url()).searchParams.get('quantity'),'3');assert.equal(new URL(page.url()).searchParams.get('country'),'Kenya');
  await page.getByRole('textbox',{name:'Model or vehicle requirement *',exact:true}).waitFor();await page.waitForFunction(()=>document.querySelector('input[aria-label="Model or vehicle requirement *"]')?.value==='Toyota Camry');
  assert.equal(await page.getByRole('textbox',{name:'Quantity *',exact:true}).inputValue(),'3');assert.equal(await page.getByRole('textbox',{name:'Destination country *',exact:true}).inputValue(),'Kenya');
  await page.getByRole('textbox',{name:'Email',exact:true}).fill('visual-qa@example.invalid');await page.getByRole('button',{name:'Review inquiry',exact:true}).click();await page.getByRole('link',{name:'Open in email',exact:true}).waitFor();
  const email=await page.getByRole('link',{name:'Open in email',exact:true}).getAttribute('href'),wa=await page.getByRole('link',{name:'Open in WhatsApp',exact:true}).getAttribute('href');assert.ok(email.startsWith('mailto:contact@keeyak.com'));assert.ok(decodeURIComponent(email).includes('Toyota Camry'));assert.ok(wa.startsWith('https://wa.me/8617357146027'));
  assert.deepEqual(errors,[]);report.viewports.push({width,height,sections:10,overflow:0,navLinks:navLinks.length,font,search:'match + empty + Escape',menu:'keyboard, Escape, mobile focus confinement',story:width<810?'dots + ArrowRight verified':'sticky desktop',form:'required + quantity min + GET + quote prefill + review draft + channel href verified',errors});await context.close();console.log(`Verified interactions at ${width}px`);
 }
 const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage();await page.goto(origin,{waitUntil:'networkidle'});
 const rawLinks=await page.locator('a[href]').evaluateAll(els=>[...new Set(els.map(e=>e.getAttribute('href')))].filter(h=>h.startsWith('/')));
 const urls=[...new Set(rawLinks.map(h=>new URL(h,locationPlaceholder()).pathname+new URL(h,locationPlaceholder()).search))];
 const linkResults=[];for(let i=0;i<urls.length;i+=8){const group=await Promise.all(urls.slice(i,i+8).map(async url=>{const r=await page.request.get(new URL(url,origin).href,{timeout:15000});return{url,status:r.status()};}));linkResults.push(...group);console.log(`Checked ${linkResults.length}/${urls.length} local link destinations`);}
 assert.ok(linkResults.every(r=>r.status===200));check('All homepage local links including hidden navigation/search/footer',linkResults);
 const anchorLinks=rawLinks.filter(h=>h.includes('#'));const anchors=[];for(const href of anchorLinks){const u=new URL(href,origin),r=await page.request.get(u.origin+u.pathname),html=await r.text(),id=decodeURIComponent(u.hash.slice(1));anchors.push({href,found:html.includes(`id="${id}"`)});}assert.ok(anchors.every(a=>a.found));check('Cross-page anchors',anchors);
 await page.locator('.ah-footer-directory summary').click();assert.equal(await page.locator('.ah-footer-groups').isVisible(),true);check('Footer directory expands');
 const fontLoaded=await page.evaluate(()=>document.fonts.check('500 70px "KEEYAK Display"'));assert.equal(fontLoaded,true);check('Inter Display medium font loaded');
 await context.close();
 const reduce=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),rp=await reduce.newPage();await rp.goto(origin,{waitUntil:'networkidle'});assert.equal(await rp.locator('.ah-brand-track').evaluate(e=>getComputedStyle(e).animationName),'none');check('Reduced motion respected');await reduce.close();
 report.passed=true;
}catch(error){report.passed=false;report.errors.push(String(error.stack||error));console.error(String(error.stack||error));process.exitCode=1;}finally{await browser.close();await writeFile(path.join(out,'qa.json'),JSON.stringify(report,null,2)+'\n');}
function locationPlaceholder(){return 'http://keeyak.local/';}
