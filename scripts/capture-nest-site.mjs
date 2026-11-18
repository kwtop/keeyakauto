// Screenshot and DOM evidence. Only the explicitly local Astro app may be requested.
import {createRequire} from 'node:module';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(process.cwd(),'..');
const phase=process.env.NEST_CAPTURE_PHASE||'before';
const origin=process.env.NEST_CAPTURE_ORIGIN||'http://127.0.0.1:4322';
if(new URL(origin).hostname!=='127.0.0.1')throw Error('Local app only');
const inventory=JSON.parse(await readFile(path.join(root,'docs/nest-site-20261019/URL-INVENTORY-BEFORE.json'),'utf8'));
const selected=process.env.NEST_CAPTURE_URLS?.split(',');
const pages=inventory.pages.filter(p=>p.scope==='redesign'&&(!selected||selected.includes(p.url)));
const folder=path.join(root,'checkpoints/nest-site-20261019',phase);
const reportFile=path.join(root,'docs/nest-site-20261019',`${phase.toUpperCase()}-CAPTURE.json`);
await mkdir(folder,{recursive:true});
const report={phase,origin,conditions:{desktop:'1440x900',mobile:'390x844',dpr:1,scale:1,fullPage:true},pages:[],errors:[]};
// Targeted recaptures replace only those URLs, retaining the complete site ledger.
if(selected){try{const previous=JSON.parse(await readFile(reportFile,'utf8'));report.pages=previous.pages.filter(p=>!selected.includes(p.url));report.errors=previous.errors.filter(p=>!selected.includes(p.url));}catch(error){if(error.code!=='ENOENT')throw error;}}
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const tasks=[...pages];let finished=0;
async function worker(){
 while(tasks.length){
  const item=tasks.shift();if(!item)break;
  const record={url:item.url,type:item.type,scope:item.scope,viewports:[]};
  for(const [width,height] of [[1440,900],[390,844]]){
   const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
   await context.route('**/*',route=>{const u=new URL(route.request().url());return u.origin===origin||['data:','blob:'].includes(u.protocol)?route.continue():route.abort();});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   try{
    const response=await page.goto(origin+item.url,{waitUntil:'networkidle',timeout:45000});
    await page.evaluate(()=>document.fonts.ready);
    // Load photos for the actual full-page capture; no content or layout is substituted.
    await page.locator('img[loading="lazy"]').evaluateAll(images=>images.forEach(i=>i.loading='eager'));
    await page.waitForFunction(()=>[...document.querySelectorAll('img')].filter(i=>i.getBoundingClientRect().width>0).every(i=>i.complete),null,{timeout:15000}).catch(()=>{});
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.waitForTimeout(450);
    const data=await page.evaluate(()=>{
     const main=document.querySelector('main');
     const box=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height}};
     const photos=[...main?.querySelectorAll('img')||[]].filter(i=>i.getBoundingClientRect().width>0).map(i=>({src:i.currentSrc||i.src,alt:i.alt,loaded:i.complete&&i.naturalWidth>0,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,fit:getComputedStyle(i).objectFit,position:getComputedStyle(i).objectPosition,...box(i)}));
     return {url:location.href,title:document.title,viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},pageHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,h1:[...main?.querySelectorAll('h1')||[]].map(e=>({text:e.textContent,...box(e),font:getComputedStyle(e).font})),modules:[...main?.querySelectorAll('[data-core-module]')||[]].map(e=>({name:e.getAttribute('data-core-module')||e.getAttribute('data-module')||e.tagName,...box(e),imageCount:new Set([...e.querySelectorAll('img')].filter(i=>i.getBoundingClientRect().width>0).map(i=>i.currentSrc||i.src)).size,hasReadableText:!!e.textContent.trim()})),images:photos,uniqueImageCount:new Set(photos.map(i=>i.src)).size,links:[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h?.startsWith('/')&&!h.startsWith('//')))],robots:document.querySelector('meta[name=robots]')?.content,description:document.querySelector('meta[name=description]')?.content,siteNest:document.body.classList.contains('site-nest')};
    });
    const slug=item.url==='/'?'home':item.url.replace(/^\//,'').replace(/\/$/,'').replaceAll('/','__').replaceAll('.','-');
    const filename=`${slug}--${width}.png`;
    await page.screenshot({path:path.join(folder,filename),fullPage:true,animations:'disabled'});
    record.viewports.push({...data,status:response?.status(),errors,screenshot:path.relative(root,path.join(folder,filename)).replaceAll('\\','/')});
   }catch(error){record.viewports.push({viewport:{width,height},errors:[String(error)]});report.errors.push({url:item.url,width,error:String(error)});}
   finally{await context.close();}
  }
  report.pages.push(record);finished++;
  if(finished%5===0||finished===pages.length){await writeFile(reportFile,JSON.stringify(report,null,2)+'\n');console.log(`${phase}: ${finished}/${pages.length} pages captured`);}
 }
}
try{await Promise.all([worker(),worker()]);}finally{await browser.close();report.pages.sort((a,b)=>a.url.localeCompare(b.url));await writeFile(reportFile,JSON.stringify(report,null,2)+'\n');}
console.log(JSON.stringify({phase,pages:report.pages.length,captureErrors:report.errors.length,overflow:report.pages.flatMap(p=>p.viewports.filter(v=>v.overflow).map(v=>({url:p.url,width:v.viewport.width}))),scriptErrors:report.pages.flatMap(p=>p.viewports.filter(v=>v.errors?.length).map(v=>({url:p.url,width:v.viewport.width,errors:v.errors})))},null,2));
