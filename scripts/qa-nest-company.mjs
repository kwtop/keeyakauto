import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:4330';
if(!['http://127.0.0.1:4330','http://127.0.0.1:4322'].includes(origin))throw Error('Local project origins only');
const suffix=process.argv[2]||'company-round-01';
const folder=path.resolve('../checkpoints/nest-site-20261019',suffix);
await mkdir(folder,{recursive:true});
const routes=process.argv[3]==='company'?['/about/']:process.argv[3]==='sample'?['/about/','/contact/','/quote/']:process.argv[3]==='updated'?['/about/','/contact/','/about/news/vietnam-exhibition-2026/','/404.html']:process.argv[3]==='variants'?['/about/','/about/news/','/about/news/algeria-exhibition-2026/','/about/news/annual-gathering-2026/','/contact/','/quote/']:['/about/','/about/news/','/about/news/vietnam-exhibition-2026/','/about/news/algeria-exhibition-2026/','/about/news/annual-gathering-2026/','/about/news/indonesia-exhibition-2024/','/about/news/mexico-exhibition-2026/','/about/news/chongqing-team-day-2025/','/about/news/spring-festival-2025/','/about/news/spring-festival-2023/','/contact/','/quote/','/quote/thank-you/','/privacy/','/terms/','/404.html'];
const widths=process.env.QA_WIDTHS?process.env.QA_WIDTHS.split(',').map(Number):[1440,390];
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const results=[];
try{
for(const route of routes){
 for(const width of widths){
  const context=await browser.newContext({viewport:{width,height:width===1440?900:width===1024?768:width===768?1024:844},deviceScaleFactor:1});
  const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await context.route('**/*',r=>r.request().url().startsWith(origin)||r.request().url().startsWith('data:')?r.continue():r.abort());
  const response=await page.goto(origin+route,{waitUntil:'domcontentloaded',timeout:60000});
  await page.locator('main h1').waitFor();await page.evaluate(()=>document.fonts.ready);
  if(route==='/quote/')await page.locator('.quote-fields').waitFor({state:'visible'});
  const imgs=page.locator('main img');
  for(let i=0;i<await imgs.count();i++){await imgs.nth(i).scrollIntoViewIfNeeded();await imgs.nth(i).evaluate(img=>img.complete?Promise.resolve():new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});setTimeout(resolve,6000)}));}
  await page.keyboard.press('Control+Home');await page.waitForTimeout(700);
  const data=await page.evaluate(()=>{
   const main=document.querySelector('main');const modules=[...main.querySelectorAll('[data-core-module]')];
   const h1=main.querySelector('h1');const style=getComputedStyle(h1);
   const images=[...main.querySelectorAll('img')].map(i=>({src:i.getAttribute('src'),currentSrc:i.currentSrc,loaded:i.complete&&i.naturalWidth>0,width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height,alt:i.alt}));
   const imageModules=modules.filter(m=>m.querySelector('img')).length;
   const overflow=[...main.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)}).map(e=>({tag:e.tagName,class:e.className})).slice(0,15);
   return {title:document.title,bodyClasses:document.body.className,h1:h1.textContent,font:style.fontFamily,fontSize:style.fontSize,modules:modules.map(m=>({name:m.getAttribute('data-module')||m.getAttribute('data-core-module'),images:m.querySelectorAll('img').length})),moduleCount:modules.length,imageModuleCount:imageModules,uniqueImageCount:new Set(images.map(i=>i.src)).size,images,overflow,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,links:[...main.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))};
  });
  const name=route==='/'?'home':route.replace(/^\//,'').replace(/\/$/,'').replaceAll('/','--').replace('.html','');
  const screenshot=path.join(folder,`${name}-${width}.png`);
  await page.screenshot({path:screenshot,fullPage:true});
  const item={route,width,status:response.status(),...data,errors,screenshot};results.push(item);
  console.log(JSON.stringify({route,width,status:item.status,modules:item.moduleCount,images:item.uniqueImageCount,broken:item.images.filter(i=>!i.loaded).length,overflow:item.overflow.length,errors}));
  await context.close();
 }
}
await writeFile(path.join(folder,'QA.json'),JSON.stringify({origin,checkedAt:new Date().toISOString(),results},null,2));
}finally{await browser.close();}
