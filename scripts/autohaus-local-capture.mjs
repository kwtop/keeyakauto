import {createRequire} from 'node:module';
import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const chromePath='C:/Users/Administrator/.agent-browser/browsers/chrome-152.0.7977.64/chrome.exe';
const phase=process.argv[2]||'round-02';
const reference=phase==='reference-confirmation';
const origin=reference?'https://autohaus.framer.website/':(process.env.AUTOHAUS_ORIGIN||'http://127.0.0.1:4353/');
const task=path.resolve(import.meta.dirname,'../../docs/autohaus-home-20261019');
const out=path.join(task,phase);await mkdir(out,{recursive:true});
// Reuse the exact read-only browser expression used for the native baseline.
const baselineScript=await readFile(new URL('./autohaus-capture.mjs',import.meta.url),'utf8');
const measurementExpression=baselineScript.split(' const data=evaluate(')[1].split(');\n if(data.viewport')[0];
export async function settle(page){
 await page.evaluate(async()=>{await Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,15000))]);document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');await Promise.race([Promise.allSettled([...document.images].map(i=>i.decode())),new Promise(r=>setTimeout(r,15000))]);});
 const height=await page.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<height;y+=600){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(100);}
 await page.waitForTimeout(700);await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(900);
 await page.evaluate(()=>{for(const v of document.querySelectorAll('video')){v.pause();try{v.currentTime=0}catch{}}for(const a of document.getAnimations())try{if(a.effect.getTiming().iterations===Infinity){a.pause();a.currentTime=0;}else a.finish();}catch{}});
}
const report={phase,origin,runtime:'Playwright; same Chrome152 executable as agent-browser baseline',conditions:{dpr:1,zoom:1,fullPage:true,screenshotScale:'css',video:'paused at zero where possible',animations:'finite finished; infinite paused at zero after full scroll'},captures:[]};
const browser=await chromium.launch({headless:true,executablePath:chromePath});
try{
 for(const [width,height] of [[1440,900],[1024,768],[768,1024],[390,844]].filter(([w])=>!process.env.AUTOHAUS_WIDTH||w===Number(process.env.AUTOHAUS_WIDTH))){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  console.log(`Opening ${phase} ${width}px`);const response=await page.goto(origin,{waitUntil:'networkidle',timeout:45000});if(response.status()!==200)throw Error(`Unexpected HTTP ${response.status()}`);
  if(!reference&&!await page.locator('body.autohaus-home .ah-home').count())throw Error('Wrong/stale homepage identity');
  await settle(page);console.log(`Settled ${width}px`);
  const data=await page.evaluate(`(${measurementExpression})()`);
  if(data.viewport.width!==width||data.viewport.height!==height||data.dpr!==1)throw Error('Capture conditions differ');
  let calibration;
  const calibrationPath=process.env.AUTOHAUS_CALIBRATION&&path.resolve(process.env.AUTOHAUS_CALIBRATION);
  if(width===1440&&calibrationPath){calibration=await page.evaluate(await readFile(path.join(calibrationPath,'collect.js'),'utf8'));calibration.full_page=true;calibration.screenshot_scale='css';}
  const fullPath=path.join(out,`${width}-full.png`);
  if(data.pageHeight>16000){
   const tileDir=path.join(out,`${width}-tiles`);await mkdir(tileDir,{recursive:true});const cdp=await context.newCDPSession(page),tiles=[];
   for(let y=0;y<data.pageHeight;y+=4000){const tile=path.join(tileDir,`${String(y).padStart(5,'0')}.png`);const shot=await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,fromSurface:true,clip:{x:0,y,width,height:Math.min(4000,data.pageHeight-y),scale:1}});await writeFile(tile,Buffer.from(shot.data,'base64'));tiles.push(tile);console.log(`Captured tile ${width} y=${y}`);}
   execFileSync('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',['-c','from PIL import Image;import sys;ims=[Image.open(p).convert("RGB") for p in sys.argv[2:]];out=Image.new("RGB",(ims[0].width,sum(i.height for i in ims)));y=0\nfor i in ims:out.paste(i,(0,y));y+=i.height\nout.save(sys.argv[1])',fullPath,...tiles]);data.fullPageMethod='CDP document-coordinate 4000px bands; joined without resizing; viewport and scroll unchanged';await cdp.detach();
  }else{await page.screenshot({path:fullPath,fullPage:true,scale:'css'});data.fullPageMethod='Playwright fullPage screenshot';}
  await page.screenshot({path:path.join(out,`${width}-first.png`),fullPage:false,scale:'css'});
  if(calibration){await writeFile(path.join(calibrationPath,'capture.json'),JSON.stringify(calibration,null,2));await copyFile(path.join(out,`${width}-full.png`),path.join(calibrationPath,'candidate.png'));}
  report.captures.push({...data,errors});await writeFile(path.join(out,'capture.json'),JSON.stringify(report,null,2)+'\n');await context.close();
  console.log(JSON.stringify({phase,width,height:data.pageHeight,sections:data.sections.length,overflow:data.pageWidth-width,broken:data.images.filter(i=>!i.loaded).length,errors}));
 }
}finally{await browser.close();}
