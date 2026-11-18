import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const phase=process.argv[2]||'before',task=path.resolve(import.meta.dirname,'../../docs/home-hero-refine-20261019'),out=path.join(task,phase);await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Administrator/.agent-browser/browsers/chrome-152.0.7977.64/chrome.exe'}),report={phase,captures:[]};
async function settle(p){await p.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.allSettled([...document.images].map(i=>i.decode()));});await p.waitForTimeout(800);}
try{
 for(const [width,height] of [[1440,900],[1024,768],[768,1024],[390,844],[320,844]]){
  const p=await browser.newPage({viewport:{width,height},deviceScaleFactor:1}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:4322/',{waitUntil:'networkidle'});await settle(p);
  const data=await p.evaluate(()=>{const box=e=>{if(!e)return null;const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:r.x,y:r.y,w:r.width,h:r.height,font:s.font,color:s.color,background:s.backgroundColor};};return{width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth-innerWidth,hero:box(document.querySelector('.ah-hero')),title:box(document.querySelector('h1')),cta:box(document.querySelector('.ah-hero .ah-action')),header:box(document.querySelector('.ah-header')),headerClass:document.querySelector('.ah-header').className,nav:box(document.querySelector('.ah-nav-top>a')),image:{src:document.querySelector('.ah-hero img').currentSrc,loaded:document.querySelector('.ah-hero img').naturalWidth>0,naturalWidth:document.querySelector('.ah-hero img').naturalWidth,naturalHeight:document.querySelector('.ah-hero img').naturalHeight}};});
  await p.screenshot({path:path.join(out,`${width}-first.png`),animations:'disabled'});const cdp=await p.context().newCDPSession(p),image=await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:Math.ceil(data.hero.h),scale:1}});await writeFile(path.join(out,`${width}-hero.png`),Buffer.from(image.data,'base64'));await cdp.detach();
  report.captures.push({...data,errors});await p.close();console.log(`${phase} ${width} hero=${data.hero.h} overflow=${data.overflow}`);
 }
 if(phase==='before'){
  report.innerPages=[];
  for(const [name,route] of [['catalog','/new-cars/'],['camry','/new-cars/toyota/camry/'],['services','/export-services/'],['quote','/quote/']])for(const [width,height] of [[1440,900],[390,844]]){
   const p=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});await p.goto('http://127.0.0.1:4322'+route,{waitUntil:'networkidle'});await settle(p);await p.screenshot({path:path.join(out,`${name}-${width}-first.png`),animations:'disabled'});
   const styles=await p.evaluate(()=>{const style=e=>{const s=getComputedStyle(e);return{font:s.font,color:s.color,background:s.backgroundColor,width:e.getBoundingClientRect().width};};return{h1:style(document.querySelector('h1')),body:style(document.body),button:style(document.querySelector('main .button')||document.querySelector('main .ex-button')),container:style(document.querySelector('main .shell')||document.querySelector('main .ex-wrap')),headings:[...document.querySelectorAll('main h2')].map(e=>e.textContent)};});report.innerPages.push({name,route,width,...styles});await p.close();
  }
 }
}finally{await browser.close();await writeFile(path.join(out,'capture.json'),JSON.stringify(report,null,2));}
