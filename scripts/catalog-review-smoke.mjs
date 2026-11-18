import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {chromePath} from './volta-local-capture.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(import.meta.dirname,'../../docs/catalog-visual-upgrade-20261019'),checks=[],errors=[];
const browser=await chromium.launch({headless:true,executablePath:chromePath});
try{
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:width===1440?900:844},deviceScaleFactor:1});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4354/catalog-visual-upgrade-20261019/REVIEW.html#camry-'+width+'-first');
  await page.locator('#after').evaluate(img=>img.complete&&img.naturalWidth?null:new Promise(resolve=>img.addEventListener('load',resolve,{once:true})));
  const state=await page.evaluate(()=>({width:document.documentElement.scrollWidth,images:[...document.querySelectorAll('.pair img')].map(i=>({loaded:i.complete&&i.naturalWidth>0,width:i.naturalWidth})),live:document.querySelector('#live').getAttribute('href')}));
  checks.push({test:'Review controls and actual screenshot assets',width,...state,pass:state.width===width&&state.images.every(i=>i.loaded&&i.width===width)&&state.live.endsWith('/new-cars/toyota/camry/')});
  await page.screenshot({path:path.join(root,`review-${width}.png`),animations:'disabled'});
  for(const route of ['/quote/','/privacy/','/terms/']){
   await page.goto('http://127.0.0.1:4322'+route,{waitUntil:'networkidle'});
   const typography=await page.locator('main h1,main h2,main h3').evaluateAll(es=>es.map(e=>({text:e.textContent,font:getComputedStyle(e).fontFamily,size:getComputedStyle(e).fontSize})));
   const pageWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
   checks.push({test:'Final typography and page width',route,width,pageWidth,typography,pass:pageWidth===width&&typography.every(h=>h.font.includes('KEEYAK Inter'))});
  }
  await page.goto('file:///D:/keeyak/keeyakauto/DESIGN-preview.html');
  const preview=await page.evaluate(()=>({width:document.documentElement.scrollWidth,chapter:document.body.textContent.includes('正式内页与产品页应用')}));
  checks.push({test:'Updated design document rendered',width,...preview,pass:preview.width===width&&preview.chapter});
  await context.close();
 }
}finally{await browser.close();}
const summary={checks:checks.length,passed:checks.filter(c=>c.pass).length,failed:checks.filter(c=>!c.pass).length,pageErrors:errors.length};
await writeFile(path.join(root,'REVIEW-SMOKE.json'),JSON.stringify({checkedAt:new Date().toISOString(),checks,errors,summary},null,2)+'\n');
console.log(JSON.stringify(summary));if(summary.failed||errors.length)process.exitCode=1;
