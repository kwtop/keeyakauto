import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {settle,chromePath} from './volta-local-capture.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const phase=process.argv[2]||'before';
const root=path.resolve(import.meta.dirname,'../../docs/catalog-visual-upgrade-20261019',phase);
const origin=process.env.CATALOG_ORIGIN||'http://127.0.0.1:4322';
const routes=[['new-cars','/new-cars/'],['camry','/new-cars/toyota/camry/'],['id3','/new-cars/volkswagen/id-3/'],['toyota','/new-cars/toyota/'],['wuling','/new-cars/wuling/'],['brands','/new-cars/brands/'],['used-cars','/used-cars/'],['x5','/used-cars/bmw/x5-xdrive-30li/'],['s450l','/used-cars/mercedes-benz/s-450l/'],['services','/export-services/'],['about','/about/'],['contact','/contact/'],['quote','/quote/']];
const browser=await chromium.launch({headless:true,executablePath:chromePath});
const report={phase,origin,engine:browser.version(),conditions:{dpr:1,zoom:1,fullPage:true},captures:[]};
await mkdir(root,{recursive:true});
try {
 for(const [width,height] of [[1440,900],[390,844]])for(const [name,route] of routes){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+route,{waitUntil:'networkidle'});await settle(page);
  const data=await page.evaluate(()=>{const box=e=>{if(!e)return null;const b=e.getBoundingClientRect();return{x:b.x,y:b.y+scrollY,width:b.width,height:b.height};};return{title:document.title,pageWidth:document.documentElement.scrollWidth,pageHeight:document.documentElement.scrollHeight,h1:[...document.querySelectorAll('h1')].map(e=>({text:e.textContent,...box(e)})),modules:[...document.querySelectorAll('[data-core-module]')].map(e=>({name:e.getAttribute('data-core-module'),...box(e)})),images:[...document.images].filter(e=>e.getClientRects().length).map(i=>({src:i.currentSrc,alt:i.alt,loaded:i.complete&&i.naturalWidth>0,...box(i)})),links:[...new Set([...document.querySelectorAll('main a[href]')].map(a=>a.getAttribute('href')))],seo:{description:document.querySelector('meta[name=description]')?.content,robots:document.querySelector('meta[name=robots]')?.content},text:document.querySelector('main')?.innerText};});
  await page.screenshot({path:path.join(root,`${name}-${width}-full.png`),fullPage:true,animations:'disabled'});await page.screenshot({path:path.join(root,`${name}-${width}-first.png`),animations:'disabled'});
  report.captures.push({name,route,viewport:{width,height},...data,errors});await writeFile(path.join(root,'capture.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({phase,name,width,pageWidth:data.pageWidth,modules:data.modules.length,errors}));await page.close();
 }
}finally{await browser.close();}
