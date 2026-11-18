import {createRequire} from 'node:module';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const task=path.resolve(import.meta.dirname,'../../docs/site-imagery-20261019'),out=path.join(task,'delivery-qa');await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Administrator/.agent-browser/browsers/chrome-152.0.7977.64/chrome.exe'}),proof={errors:[],checks:[],crops:[]};
async function settle(p){await p.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.allSettled([...document.images].map(i=>i.decode()));});}
try{
 const p=await browser.newPage({viewport:{width:1600,height:1000}});p.on('pageerror',e=>proof.errors.push(e.message));
 await p.goto('http://127.0.0.1:4354/site-imagery-20261019/COMPARE.html?page=corolla&width=1440',{waitUntil:'networkidle'});await settle(p);for(const id of ['before','after'])assert.equal(await p.locator('#'+id).evaluate(i=>i.naturalWidth),1440);await p.screenshot({path:path.join(out,'compare-desktop.png')});await p.locator('#width').selectOption('390');await settle(p);for(const id of ['before','after'])assert.equal(await p.locator('#'+id).evaluate(i=>i.naturalWidth),390);await p.screenshot({path:path.join(out,'compare-mobile.png')});await p.locator('#toggle').click();await settle(p);assert.equal(await p.locator('#gallery img').count(),25);assert.ok(await p.locator('#gallery img').evaluateAll(a=>a.every(i=>i.complete&&i.naturalWidth>0)));await p.screenshot({path:path.join(out,'gallery.png')});proof.checks.push('Comparison page desktop/mobile controls and all 25 gallery images work.');await p.close();
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:width===1440?900:844}});await page.goto('file:///D:/keeyak/keeyakauto/DESIGN-preview.html',{waitUntil:'load'});await settle(page);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);await page.screenshot({path:path.join(out,`design-preview-${width}.png`)});proof.checks.push('DESIGN-preview.html rendered without overflow at '+width);
  for(const [name,route,selectors] of [['home','/',['.ah-service-grid','.ah-journal-grid']],['about','/about/',['.au-scope-grid']],['contact','/contact/',['.contact-purchase-grid']],['services','/export-services/',['.ex-overview-services']]]){
   await page.goto('http://127.0.0.1:4322'+route,{waitUntil:'networkidle'});await settle(page);
   for(let i=0;i<selectors.length;i++){const rect=await page.locator(selectors[i]).evaluate(e=>{const r=e.getBoundingClientRect();return {x:Math.floor(r.x),y:Math.floor(r.y+scrollY),w:Math.ceil(r.width),h:Math.ceil(r.height)};});proof.crops.push({name,width,index:i,rect,source:path.join(task,'after',`${name}-${width}-full.png`),output:path.join(out,`${name}-${width}-section-${i}.png`)});}
  }await page.close();
 }
 assert.equal(proof.errors.length,0);proof.passed=true;
}catch(e){proof.passed=false;proof.errors.push(String(e.stack||e));console.error(e.stack||e);process.exitCode=1;}
finally{await browser.close();await writeFile(path.join(out,'checks.json'),JSON.stringify(proof,null,2));}
if(proof.passed){execFileSync('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',['-c',`import json\nfrom PIL import Image\nfrom pathlib import Path\np=Path(r'${path.join(out,'checks.json')}')\ndata=json.loads(p.read_text(encoding='utf-8'))\nfor c in data['crops']:\n r=c['rect']\n with Image.open(c['source']) as im: im.crop((r['x'],r['y'],r['x']+r['w'],min(im.height,r['y']+r['h']))).save(c['output'])\nprint('Created',len(data['crops']),'section crops from original full-page screenshots; no sticky-header capture artifacts.')`],{stdio:'inherit'});}
console.log(JSON.stringify({passed:proof.passed,checks:proof.checks.length,crops:proof.crops.length,errors:proof.errors.length}));
