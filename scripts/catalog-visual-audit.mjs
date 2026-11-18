import {createRequire} from 'node:module';
import {mkdir,readdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {settle,chromePath} from './volta-local-capture.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const dist=path.resolve(import.meta.dirname,'../dist'),out=path.resolve(import.meta.dirname,'../../docs/catalog-visual-upgrade-20261019',process.argv[2]||'audit');
async function walk(folder){let files=[];for(const e of await readdir(folder,{withFileTypes:true})){const f=path.join(folder,e.name);if(e.isDirectory())files.push(...await walk(f));else if(e.name.endsWith('.html'))files.push(f);}return files;}
const all=(await walk(dist)).filter(f=>path.basename(f)==='index.html').map(f=>'/'+path.relative(dist,path.dirname(f)).split(path.sep).filter(s=>s&&s!=='.').join('/')+'/').map(r=>r==='//'?'/':r).sort();
const routes=all.filter(r=>!/^\/design(?:-preview)?\//.test(r)&&!/^\/export\//.test(r)&&!['/guides/buying/','/quote/thank-you/'].includes(r));
const productRoutes=routes.filter(r=>/^\/(new|used)-cars\//.test(r));
const report={origin:'http://127.0.0.1:4322',capturedAt:new Date().toISOString(),discovered:all.length,excluded:all.filter(r=>!routes.includes(r)),routes:routes.length,productRoutes:productRoutes.length,checks:[]};
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:chromePath});
const jobs=routes.flatMap(route=>[1440,390].map(width=>({route,width})));let cursor=0,completed=0;
async function worker(){
 while(cursor<jobs.length){const job=jobs[cursor++],name=job.route==='/'?'home':job.route.slice(1,-1).replaceAll('/','--');let context;
  try{
   context=await browser.newContext({viewport:{width:job.width,height:job.width===1440?900:844},deviceScaleFactor:1});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto(report.origin+job.route,{waitUntil:'networkidle',timeout:30000});await settle(page);
   const data=await page.evaluate(()=>({actualPath:location.pathname,title:document.title,pageWidth:document.documentElement.scrollWidth,pageHeight:document.documentElement.scrollHeight,h1:[...document.querySelectorAll('main h1')].map(e=>e.textContent),modules:document.querySelectorAll('[data-core-module]').length,headerHeight:document.querySelector('.v-header')?.getBoundingClientRect().height,headingFonts:[...new Set([...document.querySelectorAll('main h1,main h2,main h3')].map(e=>getComputedStyle(e).fontFamily))],footerHeadingSizes:[...new Set([...document.querySelectorAll('.v-footer-directory h2')].map(e=>getComputedStyle(e).fontSize))],images:[...document.querySelectorAll('main img')].filter(i=>i.getClientRects().length).map(i=>({src:i.currentSrc,loaded:i.complete&&i.naturalWidth>0})),robots:document.querySelector('meta[name=robots]')?.content}));
   const product=/^\/(new|used)-cars\//.test(job.route);const screenshot=`${name}-${job.width}.jpg`;
   if(product||['/','/about/','/contact/','/quote/','/export-services/'].includes(job.route))await page.screenshot({path:path.join(out,screenshot),fullPage:true,type:'jpeg',quality:85,animations:'disabled'});
   const check={...job,...data,status:response?.status(),errors,product,screenshot:product||['/','/about/','/contact/','/quote/','/export-services/'].includes(job.route)?screenshot:null};
   check.pass=check.status===200&&check.pageWidth===job.width&&check.h1.length===1&&!errors.length&&check.images.every(i=>i.loaded)&&check.footerHeadingSizes.every(s=>s==='14px')&&(!product||(check.modules>=4&&check.modules<=7&&new Set(check.images.map(i=>i.src)).size>=3));
   report.checks.push(check);
  }catch(e){report.checks.push({...job,pass:false,error:String(e)});}finally{await context?.close();}
  completed++;if(completed%10===0||report.checks.at(-1).pass===false){await writeFile(path.join(out,'URL-AUDIT.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({completed,total:jobs.length,failures:report.checks.filter(c=>!c.pass).length,last:job.route}));}
 }
}
try{await Promise.all([worker(),worker()]);}finally{await browser.close();}
report.summary={checks:report.checks.length,passed:report.checks.filter(c=>c.pass).length,failed:report.checks.filter(c=>!c.pass).length};await writeFile(path.join(out,'URL-AUDIT.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.summary));if(report.summary.failed)process.exitCode=1;
