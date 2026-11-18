import {createRequire} from 'node:module';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {settle,chromePath,origin} from './volta-local-capture.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const phase=process.argv[2],folder=path.resolve(import.meta.dirname,'../../docs/volta-home-20261019',phase,'calibration-1440');
const browser=await chromium.launch({headless:true,executablePath:chromePath});
try{
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});await page.goto(origin+'/',{waitUntil:'networkidle'});await settle(page);
 const data=await page.evaluate(await readFile(path.join(folder,'collect.js'),'utf8'));
 data.full_page=true;data.screenshot_scale='css';await writeFile(path.join(folder,'capture.json'),JSON.stringify(data,null,2)+'\n');await page.screenshot({path:path.join(folder,'candidate.png'),fullPage:true,animations:'disabled'});
 console.log(JSON.stringify({phase,url:data.url,viewport:data.viewport,regions:data.elements.map(e=>[e.name,e.status])}));
}finally{await browser.close();}
