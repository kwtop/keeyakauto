import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const phase=process.argv[2]||'before';
const out=path.resolve(import.meta.dirname,'../../docs/site-imagery-20261019',phase);
const origin=process.env.IMAGERY_ORIGIN||'http://127.0.0.1:4322';
const routes=[['home','/'],['new-cars','/new-cars/'],['corolla','/new-cars/toyota/corolla/'],['wuling','/new-cars/wuling/'],['used-cars','/used-cars/'],['q5l','/used-cars/audi/q5l/'],['services','/export-services/'],['inspection','/export-services/sourcing-inspection/'],['shipping','/export-services/shipping-support/'],['about','/about/'],['contact','/contact/'],['quote','/quote/']];
const widths=process.env.IMAGERY_WIDTH?[Number(process.env.IMAGERY_WIDTH)]:[1440,390];
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Administrator/.agent-browser/browsers/chrome-152.0.7977.64/chrome.exe'});
const report={phase,origin,engine:browser.version(),conditions:{dpr:1,zoom:1,lazyImages:'eager',finiteAnimations:'finished',infiniteAnimations:'paused'},captures:[]};
try{
 for(const width of widths)for(const [name,route] of routes.filter(([name])=>!process.env.IMAGERY_PAGE||process.env.IMAGERY_PAGE===name)){
  const height=width===1440?900:width===1024?768:width===768?1024:844;
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(origin+route,{waitUntil:'networkidle',timeout:45000});
  if(response.status()!==200)throw Error(`${route}: HTTP ${response.status()}`);
  await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');await Promise.allSettled([...document.images].map(i=>i.decode()));});
  const pageHeight=await page.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<pageHeight;y+=900){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(45);}
  await page.evaluate(()=>{scrollTo({top:0,behavior:'instant'});for(const a of document.getAnimations())try{if(a.effect.getTiming().iterations===Infinity){a.pause();a.currentTime=0;}else a.finish();}catch{}});
  await page.waitForTimeout(300);
  const data=await page.evaluate(()=>({title:document.title,pageWidth:document.documentElement.scrollWidth,pageHeight:document.documentElement.scrollHeight,modules:[...document.querySelectorAll('main [data-core-module]')].map(e=>e.getAttribute('data-core-module')),images:[...document.querySelectorAll('main img')].filter(i=>i.getClientRects().length).map(i=>({src:i.getAttribute('src'),currentSrc:i.currentSrc,alt:i.alt,loaded:i.complete&&i.naturalWidth>0,box:{w:Math.round(i.getBoundingClientRect().width),h:Math.round(i.getBoundingClientRect().height)},fit:getComputedStyle(i).objectFit,position:getComputedStyle(i).objectPosition})),links:[...new Set([...document.querySelectorAll('main a[href]')].map(a=>a.getAttribute('href')))],seo:{title:document.title,description:document.querySelector('meta[name=description]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href},text:document.querySelector('main')?.innerText}));
  await page.screenshot({path:path.join(out,`${name}-${width}-first.png`),animations:'disabled'});
  if(data.pageHeight<16000)await page.screenshot({path:path.join(out,`${name}-${width}-full.png`),fullPage:true,animations:'disabled'});
  else{const cdp=await page.context().newCDPSession(page);for(let y=0;y<data.pageHeight;y+=4000){const shot=await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y,width,height:Math.min(4000,data.pageHeight-y),scale:1}});await writeFile(path.join(out,`${name}-${width}-band-${y}.png`),Buffer.from(shot.data,'base64'));}await cdp.detach();}
  report.captures.push({name,route,viewport:{width,height},...data,errors});
  await writeFile(path.join(out,'capture.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({phase,name,width,overflow:data.pageWidth-width,broken:data.images.filter(i=>!i.loaded).length,errors}));
  await page.close();
 }
}finally{await browser.close();}
