// Real local UI screenshots for privacy/terms explanations, not generated UI images.
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(process.cwd(),'..'),origin=process.env.NEST_UI_ORIGIN||'http://127.0.0.1:4330';
if(new URL(origin).hostname!=='127.0.0.1')throw Error('Local only');
const target=path.join(root,'workspace/public/images/nest-site-20261019/ui');await mkdir(target,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const context=await browser.newContext({viewport:{width:1280,height:1000},deviceScaleFactor:2});
await context.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
const page=await context.newPage(),shots=[];
async function capture(selector,name){
 const locator=page.locator(selector);await locator.scrollIntoViewIfNeeded();
 const box=await locator.boundingBox(),file=path.join(target,name+'.png');
 await locator.screenshot({path:file,animations:'disabled'});const m=await sharp(file).metadata();
 shots.push({name,path:'/images/nest-site-20261019/ui/'+name+'.png',url:page.url(),viewport:{...page.viewportSize(),dpr:2},cssBounds:box,pixels:{width:m.width,height:m.height}});
}
try{
 await page.setViewportSize({width:390,height:1000});
 await page.goto(origin+'/',{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);await capture('.nest-brief-form','inquiry-fields');
 await page.setViewportSize({width:1280,height:1000});
 await page.goto(origin+'/quote/?model=Toyota%20Camry&quantity=3&country=Kenya',{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>document.querySelector('#vehicle-1-model')?.value==='Toyota Camry'&&!document.querySelector('#vehicle-1-model').disabled);
 await page.evaluate(()=>document.fonts.ready);await capture('.quote-clear-draft','draft-controls');
 await page.getByLabel('Email',{exact:true}).fill('preview@example.test');
 await page.getByRole('button',{name:'Review inquiry',exact:true}).click();
 await page.getByRole('heading',{name:'Ready to share',exact:true}).waitFor({state:'visible'});
 await capture('.quote-ready','sharing-controls');
 await page.setViewportSize({width:320,height:1000});
 await page.goto(origin+'/export-services/buying-guide/#quotation',{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);
 await capture('.ex-commercial-grid article:first-child .ex-check-list','quotation-topics');
 await writeFile(path.join(root,'docs/nest-site-20261019/UI-REFERENCES.json'),JSON.stringify({method:'Actual browser element screenshots, not ImageGen',noSending:true,shots},null,2)+'\n');
 console.log(JSON.stringify(shots.map(s=>({name:s.name,pixels:s.pixels})),null,2));
}finally{await context.close();await browser.close();}
