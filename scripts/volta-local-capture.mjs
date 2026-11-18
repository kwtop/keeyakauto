import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
export const chromePath='C:/Users/Administrator/.agent-browser/browsers/chrome-152.0.7977.64/chrome.exe';
export const origin=process.env.VOLTA_ORIGIN||'http://127.0.0.1:4353';
export async function settle(page){
 await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');await Promise.allSettled([...document.images].map(i=>i.decode()));});
 const height=await page.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<height;y+=700){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(35);}
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(350);
}
export async function metrics(page){return page.evaluate(()=>{
 const box=e=>{if(!e)return null;const r=e.getBoundingClientRect(),c=getComputedStyle(e);return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height,font:c.font,fontFamily:c.fontFamily,fontSize:c.fontSize,lineHeight:c.lineHeight,weight:c.fontWeight,tracking:c.letterSpacing,color:c.color,background:c.backgroundColor,padding:c.padding,gap:c.gap,radius:c.borderRadius,grid:c.gridTemplateColumns,display:c.display};};
 const sections=[...document.querySelectorAll('main section')],visible=e=>!!e.getClientRects().length&&!e.closest('[hidden]');
 return{url:location.href,title:document.title,viewport:{width:innerWidth,height:innerHeight},dpr:devicePixelRatio,zoom:getComputedStyle(document.documentElement).zoom,pageHeight:document.documentElement.scrollHeight,pageWidth:document.documentElement.scrollWidth,fontsReady:document.fonts.status==='loaded',header:box(document.querySelector('header')),hero:box(sections[0]),h1:box(document.querySelector('h1')),h1Text:document.querySelector('h1')?.textContent,container:box(document.querySelector('main .v-container')),sections:sections.map((s,i)=>({index:i,id:s.id,title:s.querySelector('h2')?.textContent,...box(s)})),footer:box(document.querySelector('footer')),images:[...document.images].filter(visible).map(i=>({src:i.currentSrc,alt:i.alt,loaded:i.complete&&i.naturalWidth>0,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,fit:getComputedStyle(i).objectFit,position:getComputedStyle(i).objectPosition,...box(i)})),links:[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')))],seo:{description:document.querySelector('meta[name=description]')?.content,robots:document.querySelector('meta[name=robots]')?.content}};
});}
if(process.argv[1]===import.meta.filename){
 const phase=process.argv[2]||'round-03',out=path.resolve(import.meta.dirname,'../../docs/volta-home-20261019',phase);await mkdir(out,{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:chromePath});
 const report={phase,url:origin+'/',engine:browser.version(),runtime:'Playwright with same Chrome 152 binary as reference',conditions:{dpr:1,zoom:1,fullPage:true,screenshotScale:'css',animations:'disabled after scroll'},captures:[]};
 try{for(const [width,height] of [[1440,900],[1024,768],[768,1024],[390,844]]){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/',{waitUntil:'networkidle'});if(!await page.locator('.v-home').count())throw Error('Rejected stale/wrong homepage');await settle(page);
  const data=await metrics(page);await page.screenshot({path:path.join(out,`${width}-full.png`),fullPage:true,animations:'disabled'});await page.screenshot({path:path.join(out,`${width}-first.png`),fullPage:false,animations:'disabled'});
  report.captures.push({...data,errors});await writeFile(path.join(out,'capture.json'),JSON.stringify(report,null,2)+'\n');await context.close();console.log(JSON.stringify({phase,width,pageWidth:data.pageWidth,pageHeight:data.pageHeight,sections:data.sections.length,broken:data.images.filter(i=>!i.loaded).length,errors}));
 }}finally{await browser.close();}
}
