import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(process.cwd(),'..');
const phase=process.env.HOME_PHASE||'before';
const origin=process.env.HOME_ORIGIN||'http://127.0.0.1:4322';
if(new URL(origin).hostname!=='127.0.0.1')throw Error('Local app only');
const out=path.join(root,'checkpoints/home-revision-20261019',phase);
await mkdir(out,{recursive:true});
const report={phase,origin,conditions:{dpr:1,zoom:1,fullPage:true},captures:[]};
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
try{
 for(const [width,height] of [[1440,900],[1024,768],[768,1024],[390,844],[320,844]]){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  await context.route('**/*',r=>{const u=new URL(r.request().url());return u.origin===origin||['data:','blob:'].includes(u.protocol)?r.continue():r.abort();});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(origin+'/',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('img[loading=lazy]').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
  const states=process.env.HOME_STATES?.split(',')||(phase==='before'?['new']:['new','used']);
  for(const state of states){
   if(state==='used')await page.getByRole('tab',{name:'Used Cars',exact:true}).click();
   await page.waitForFunction(()=>[...document.querySelectorAll('main img')].filter(i=>i.getClientRects().length).every(i=>i.complete),null,{timeout:15000}).catch(()=>{});
   await page.locator('main img').evaluateAll(async imgs=>Promise.allSettled(imgs.map(i=>i.decode())));
   // A real scroll pass also lets Chrome paint asynchronously decoded offscreen photos.
   const pageHeight=await page.evaluate(()=>document.documentElement.scrollHeight);
   for(let y=0;y<pageHeight;y+=height){await page.evaluate(top=>window.scrollTo({top,behavior:'instant'}),y);await page.waitForTimeout(35);}
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
   await page.waitForTimeout(400);
   const data=await page.evaluate(()=>{
    const main=document.querySelector('main'),box=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height};};
    const visible=e=>e.getClientRects().length>0&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('[hidden]');
    return{title:document.title,description:document.querySelector('meta[name=description]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href,robots:document.querySelector('meta[name=robots]')?.content,viewport:{width:innerWidth,height:innerHeight},pageHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,header:box(document.querySelector('header')),modules:[...main.querySelectorAll('[data-core-module]')].map(e=>({name:e.dataset.coreModule,...box(e)})),h1:[...main.querySelectorAll('h1')].map(e=>({text:e.textContent,font:getComputedStyle(e).font,...box(e)})),images:[...main.querySelectorAll('img')].filter(visible).map(i=>({src:i.currentSrc,alt:i.alt,loaded:i.complete&&i.naturalWidth>0,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,fit:getComputedStyle(i).objectFit,position:getComputedStyle(i).objectPosition,...box(i)})),tabs:[...main.querySelectorAll('[role=tab]')].map(e=>({name:e.textContent,selected:e.getAttribute('aria-selected')})),links:[...new Set([...main.querySelectorAll('a[href]')].filter(visible).map(a=>a.getAttribute('href')))]};
   });
   const filename=`home-${state}--${width}.png`;
   await page.screenshot({path:path.join(out,filename),fullPage:true,animations:'disabled'});
   await page.screenshot({path:path.join(out,`home-${state}--${width}-first.png`),fullPage:false,animations:'disabled'});
   report.captures.push({state,status:response.status(),...data,errors,screenshot:path.relative(root,path.join(out,filename)).replaceAll('\\','/')});
  }
  await context.close();
  console.log(`${phase}: ${width} captured`);
 }
}finally{await browser.close();}
await writeFile(path.join(root,'docs/home-revision-20261019',`${phase.toUpperCase()}-CAPTURE.json`),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({captures:report.captures.length,overflow:report.captures.filter(c=>c.overflow).map(c=>[c.viewport.width,c.state]),errors:report.captures.flatMap(c=>c.errors),broken:report.captures.flatMap(c=>c.images.filter(i=>!i.loaded).map(i=>i.src))}));
