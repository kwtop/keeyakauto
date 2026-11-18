// Local rendered acceptance for the approved homepage; no external messages are sent.
import {createRequire} from 'node:module';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(process.cwd(),'..'),origin=process.env.HOME_ORIGIN||'http://127.0.0.1:4330';
if(new URL(origin).hostname!=='127.0.0.1')throw Error('Local app only');
const output=process.env.HOME_QA_FILE||'QA.json';
const expected={
 new:{models:['toyota/camry','byd/yuan-plus','jetour/traveler','toyota/rav4','volkswagen/id-3','geely/boyue','toyota/corolla','wuling/bingo'],brands:['toyota','byd','volkswagen','geely','jetour','wuling']},
 used:{models:['audi/q5l','bmw/x5-xdrive-30li','toyota/crown-vellfire-hybrid','lexus/rz','audi/sq5','bmw/x4-m','mercedes-benz/s-450l'],brands:['lexus','mercedes-benz','audi','bmw','toyota']}
};
const results=[],links=new Set();
const check=(name,pass,detail={})=>results.push({name,pass:!!pass,...detail});
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
try{
 for(const [width,height,font] of [[1440,900,72],[1024,768,60],[768,1024,48],[390,844,40],[320,844,40]]){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  await context.route('**/*',r=>{const u=new URL(r.request().url());return u.origin===origin||['data:','blob:'].includes(u.protocol)?r.continue():r.abort();});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  check(`${width}: five core modules`,await page.locator('main [data-core-module]').count()===5);
  check(`${width}: single h1`,await page.locator('main h1').count()===1);
  const hero=await page.locator('.nest-hero h1').evaluate(e=>({size:parseFloat(getComputedStyle(e).fontSize),weight:getComputedStyle(e).fontWeight}));
  check(`${width}: approved hero type`,hero.size===font&&hero.weight==='400',{actual:hero});
  const headerHeight=await page.locator('.primary-header').evaluate(e=>e.offsetHeight);
  check(`${width}: homepage header and placeholder`,headerHeight===(width>=1024?119:width>=768?81:73)&&await page.locator('.navigation-placeholder').evaluate(e=>e.offsetHeight)===headerHeight,{headerHeight});
  check(`${width}: redundant promo removed`,!await page.locator('.nest-information-bar').isVisible());
  const factoryBefore=await page.locator('.nest-facility').evaluate(e=>e.getBoundingClientRect().top+scrollY);
  const initialUrl=page.url();
  for(const state of ['new','used']){
   await page.getByRole('tab',{name:state==='new'?'New Cars':'Used Cars',exact:true}).click();
   const panel=page.locator(`[data-model-panel=${state}]`),inactive=page.locator(`[data-model-panel=${state==='new'?'used':'new'}]`);
   const detail=await panel.evaluate(e=>({hidden:e.hidden,inert:e.inert,aria:e.getAttribute('aria-hidden'),visibility:getComputedStyle(e).visibility}));
   check(`${width}/${state}: active panel exposed`,!detail.hidden&&!detail.inert&&detail.aria==='false'&&detail.visibility==='visible',{detail});
   const list=await panel.locator('.nest-model-card').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
   check(`${width}/${state}: exact model order`,JSON.stringify(list)===JSON.stringify(expected[state].models.map(p=>`/${state}-cars/${p}/`)),{actual:list});
   const brandLinks=await panel.locator('.nest-model-brand-link').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
   check(`${width}/${state}: corresponding brand routes`,JSON.stringify(brandLinks)===JSON.stringify(expected[state].brands.map(p=>`/${state}-cars/${p}/`)),{actual:brandLinks});
   const grid=await panel.locator('.nest-model-track').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length);
   check(`${width}/${state}: 4/3/2 columns`,grid===(width>=1024?4:width>=768?3:2),{columns:grid});
   const metadata=await panel.locator('.nest-model-card').evaluateAll(es=>es.map(e=>({name:e.querySelector('h3')?.textContent.trim(),year:e.querySelector('.nest-model-year')?.textContent.trim(),power:e.querySelector('.nest-model-meta')?.textContent.trim(),fit:getComputedStyle(e.querySelector('img')).objectFit})));
   check(`${width}/${state}: readable identity year powertrain and complete-body fit`,metadata.every(m=>m.name&&/\d{4}/.test(m.year)&&m.power&&m.fit==='contain'),{models:metadata});
   await panel.locator('img').evaluateAll(async es=>{es.forEach(i=>i.loading='eager');await Promise.allSettled(es.map(i=>i.decode()));});
   const images=await panel.locator('img').evaluateAll(es=>es.map(i=>({src:i.currentSrc,loaded:i.complete&&i.naturalWidth>0})));
   check(`${width}/${state}: logos and model photos load locally`,images.every(i=>i.loaded&&new URL(i.src).origin===origin),{images});
   check(`${width}/${state}: view all synchronized`,await page.locator('[data-model-view-all]').getAttribute('href')===`/${state}-cars/`);
   check(`${width}/${state}: inactive panel inert`,await inactive.evaluate(e=>e.hidden&&e.inert&&e.getAttribute('aria-hidden')==='true'));
   await inactive.locator('a').first().evaluate(e=>e.focus());
   check(`${width}/${state}: inactive links cannot take focus`,await inactive.evaluate(e=>!e.contains(document.activeElement)));
   const factoryAfter=await page.locator('.nest-facility').evaluate(e=>e.getBoundingClientRect().top+scrollY);
   check(`${width}/${state}: switch keeps downstream layout stable`,Math.abs(factoryAfter-factoryBefore)<1,{before:factoryBefore,after:factoryAfter});
   check(`${width}/${state}: no page refresh or URL change`,page.url()===initialUrl);
   check(`${width}/${state}: no horizontal overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   for(const url of [...list,...brandLinks])links.add(url);
  }
  check(`${width}: used historical boundary`,/Historical third-party.*not verified KEEYAK stock/.test(await page.locator('[data-model-panel=used] .nest-rail-bottom').innerText()));
  await page.getByRole('tab',{name:'New Cars',exact:true}).focus();
  for(const [key,name] of [['ArrowRight','Used Cars'],['ArrowRight','New Cars'],['End','Used Cars'],['Home','New Cars'],['ArrowLeft','Used Cars']]){
   await page.keyboard.press(key);
   check(`${width}: keyboard ${key} -> ${name}`,await page.getByRole('tab',{name,exact:true}).evaluate(e=>e===document.activeElement&&e.getAttribute('aria-selected')==='true'));
  }
  check(`${width}: facility disclosure visible`,await page.getByText('AI-generated facility concept',{exact:true}).isVisible());
  const evidence=await page.locator('.nest-company-grid img').evaluateAll(es=>es.map(i=>({src:i.getAttribute('src'),ratio:i.getBoundingClientRect().width/i.getBoundingClientRect().height,fit:getComputedStyle(i).objectFit})));
  check(`${width}: original documentary photos uncut`,evidence.length===2&&evidence[0].src.includes('office-visitor-group')&&evidence[1].src.includes('vietnam-category-discussion-2026')&&Math.abs(evidence[0].ratio-4/3)<.01&&Math.abs(evidence[1].ratio-3/4)<.01&&evidence.every(i=>i.fit==='contain'),{evidence});
  if(width<1024){
   await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
   await page.getByRole('button',{name:'Open navigation',exact:true}).click();
   check(`${width}: mobile menu opens`,await page.getByRole('button',{name:'Close navigation',exact:true}).getAttribute('aria-expanded')==='true');
   const menu=await page.locator('.header-navigation').evaluate(e=>({height:e.getBoundingClientRect().height,top:e.getBoundingClientRect().top}));
   check(`${width}: mobile menu fits viewport`,Math.abs(menu.height+headerHeight-height)<2&&Math.abs(menu.top-headerHeight)<2,{menu});
   await page.getByRole('button',{name:'Show New Cars menu',exact:true}).click();
   check(`${width}: submenu opens`,await page.locator('#navigation-panel-0').isVisible());
   await page.keyboard.press('Escape');await page.keyboard.press('Escape');
   check(`${width}: Escape closes menu`,await page.getByRole('button',{name:'Open navigation',exact:true}).getAttribute('aria-expanded')==='false');
  }else{
   await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
   await page.getByRole('button',{name:'Show New Cars menu',exact:true}).click();
   check(`${width}: desktop dropdown opens`,await page.locator('#navigation-panel-0').isVisible());await page.keyboard.press('Escape');
  }
  await page.getByRole('button',{name:'Search cars',exact:true}).click();
  await page.getByRole('searchbox').fill('Camry');
  check(`${width}: shared car search returns Camry`,await page.locator('.car-search-results a:not([hidden])').count()>0);
  await page.keyboard.press('Escape');
  check(`${width}: search closes and returns focus`,await page.getByRole('button',{name:'Search cars',exact:true}).evaluate(e=>e===document.activeElement));
  const form=page.locator('.nest-brief-form');
  check(`${width}: empty inquiry rejected`,!await form.evaluate(e=>e.checkValidity()));
  await form.locator('[name=model]').fill('Toyota Camry');await form.locator('[name=country]').fill('Vietnam');
  await form.locator('[name=quantity]').fill('0');check(`${width}: zero quantity rejected`,!await form.evaluate(e=>e.checkValidity()));
  await form.locator('[name=quantity]').fill('1.5');check(`${width}: fractional quantity rejected`,!await form.evaluate(e=>e.checkValidity()));
  await form.locator('[name=quantity]').fill('3');check(`${width}: valid inquiry accepted`,await form.evaluate(e=>e.checkValidity()));
  await Promise.all([page.waitForURL('**/quote/?**'),form.getByRole('button',{name:'Prepare inquiry',exact:true}).click()]);
  const query=new URL(page.url()).searchParams;
  check(`${width}: inquiry GET transfers all fields`,query.get('model')==='Toyota Camry'&&query.get('quantity')==='3'&&query.get('country')==='Vietnam',{url:page.url()});
  await page.getByRole('textbox',{name:'Model or vehicle requirement *',exact:true}).waitFor();
  await page.waitForFunction(()=>document.querySelector('input[aria-label="Model or vehicle requirement *"]')?.value==='Toyota Camry');
  check(`${width}: quote prefill retains model quantity destination`,await page.getByRole('textbox',{name:'Model or vehicle requirement *',exact:true}).inputValue()==='Toyota Camry'&&await page.getByRole('textbox',{name:'Quantity *',exact:true}).inputValue()==='3'&&await page.getByRole('textbox',{name:'Destination country *',exact:true}).inputValue()==='Vietnam');
  check(`${width}: no page script errors`,errors.length===0,{errors});
  await context.close();console.log(`QA ${width} complete`);
 }
 const context=await browser.newContext();
 for(const url of [...links,'/export-services/','/about/','/about/news/vietnam-exhibition-2026/','/quote/','/contact/']){
  const r=await context.request.get(origin+url);check(`local route ${url}`,r.status()===200,{status:r.status()});
 }
 for(const url of ['/new-cars/','/contact/']){
  const page=await context.newPage();await page.goto(origin+url,{waitUntil:'networkidle'});
  check(`inner page untouched header ${url}`,await page.locator('.primary-header').evaluate(e=>e.offsetHeight)===151&&!await page.locator('body').evaluate(e=>e.classList.contains('home-nest')));
  await page.close();
 }
 const page=await context.newPage();await page.goto(origin+'/',{waitUntil:'networkidle'});
 const before=JSON.parse(await readFile(path.join(root,'docs/home-revision-20261019/BEFORE-CAPTURE.json'),'utf8')).captures[0];
 const meta=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name=description]')?.content,robots:document.querySelector('meta[name=robots]')?.content}));
 check('Homepage SEO title description robots preserved',meta.title===before.title&&meta.description===before.description&&meta.robots===before.robots,{meta});
 await context.close();
}finally{await browser.close();}
const report={origin,checkedAt:new Date().toISOString(),total:results.length,passed:results.filter(r=>r.pass).length,failed:results.filter(r=>!r.pass),results};
await writeFile(path.join(root,'docs/home-revision-20261019',output),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({total:report.total,passed:report.passed,failed:report.failed}));
if(report.failed.length)process.exitCode=1;
