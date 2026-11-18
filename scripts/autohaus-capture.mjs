import {execFileSync} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';

const cli='D:/software/nvm/nodejs/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const session='autohaus-home-20261019';
const phase=process.argv[2]||'reference';
const origin=phase==='reference'?'https://autohaus.framer.website/':(process.env.AUTOHAUS_ORIGIN||'http://127.0.0.1:4322/');
const out=path.resolve(import.meta.dirname,'../../docs/autohaus-home-20261019',phase);
await mkdir(out,{recursive:true});
function cmd(...args){return execFileSync(cli,['--session',session,...args],{encoding:'utf8',maxBuffer:12*1024*1024,timeout:90000});}
function evaluate(fn){const code=typeof fn==='function'?`(${fn.toString()})()`:fn;return JSON.parse(cmd('eval',`eval(atob('${Buffer.from(code).toString('base64')}'))`,'--json')).data.result;}
const report={phase,origin,runtime:'agent-browser 0.35.2',conditions:{dpr:1,zoom:1,fullPage:true,screenshotScale:'css',video:'paused at zero where possible',animations:'finite finished; infinite paused at zero after full scroll'},captures:[]};
for(const [width,height] of [[1440,900],[1024,768],[768,1024],[390,844]]){
 cmd('set','viewport',String(width),String(height));cmd('open',origin);
 await evaluate(async()=>{
  await document.fonts.ready;
  document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');
  await Promise.allSettled([...document.images].map(i=>i.decode()));
  for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,120));}
  await new Promise(r=>setTimeout(r,700));scrollTo({top:0,behavior:'instant'});await new Promise(r=>setTimeout(r,900));
  for(const v of document.querySelectorAll('video')){v.pause();try{v.currentTime=0}catch{}}
  for(const a of document.getAnimations()){try{const timing=a.effect.getTiming();if(timing.iterations===Infinity){a.pause();a.currentTime=0;}else a.finish();}catch{}}
 });
 const data=evaluate(()=>{
  const box=e=>{if(!e)return null;const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{x:r.x,y:r.y+scrollY,w:r.width,h:r.height,font:s.font,fontFamily:s.fontFamily,size:s.fontSize,weight:s.fontWeight,line:s.lineHeight,tracking:s.letterSpacing,features:s.fontFeatureSettings,color:s.color,bg:s.backgroundColor,padding:s.padding,gap:s.gap,radius:s.borderRadius,shadow:s.boxShadow,grid:s.gridTemplateColumns,position:s.position,fit:s.objectFit,objectPosition:s.objectPosition,opacity:s.opacity};};
  const visible=e=>e.getBoundingClientRect().width>0&&e.getBoundingClientRect().height>0&&!e.closest('[hidden]');
  const source=!document.body.classList.contains('autohaus-home');
  const headings=[...document.querySelectorAll('main h1,main h2,main h3')].filter(visible);
  const sections=[...document.querySelectorAll('main>section,main>.ah-home>section,main>.v-home>section')];
  const nav=document.querySelector('.ah-header')||document.querySelector('header')||[...document.querySelectorAll('nav')].find(visible);
  const firstCard=source?document.querySelector('a[href="./vehicles/porsche-911-gt3-rs"]'):document.querySelector('.ah-featured .ah-vehicle-card');
  const mediaQueries=[];const css=[];let blockedSheets=0;function walk(rs,media=''){for(const r of rs){if(r.type===1||r.type===5)css.push({selector:r.selectorText,media,css:r.cssText});if(r.cssRules?.length){if(r.conditionText)mediaQueries.push(r.conditionText);walk(r.cssRules,media+' '+(r.conditionText||''));}}}
  for(const sheet of document.styleSheets)try{walk(sheet.cssRules)}catch{blockedSheets++}
  const vars=Object.fromEntries([...getComputedStyle(document.body)].filter(p=>p.startsWith('--')).map(p=>[p,getComputedStyle(document.body).getPropertyValue(p)]));
  return{url:location.href,title:document.title,viewport:{width:innerWidth,height:innerHeight},dpr:devicePixelRatio,userAgent:navigator.userAgent,zoom:getComputedStyle(document.documentElement).zoom,pageWidth:document.documentElement.scrollWidth,pageHeight:document.documentElement.scrollHeight,fontsReady:document.fonts.status==='loaded',fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>({family:f.family,weight:f.weight,style:f.style})),header:box(nav),hero:box(document.querySelector('main section')),h1:box(document.querySelector('h1')),h1Text:document.querySelector('h1')?.textContent,firstCard:box(firstCard),headings:headings.map(e=>({tag:e.tagName,text:e.textContent,...box(e)})),sections:sections.map((e,index)=>({index,name:e.getAttribute('data-ah-section')||e.getAttribute('data-v-section')||e.getAttribute('data-framer-name'),title:e.querySelector('h2')?.textContent,...box(e),children:[...e.children].filter(visible).map(c=>({name:c.getAttribute('data-framer-name')||c.className,...box(c)}))})),footer:box(document.querySelector('footer')),images:[...document.images].filter(visible).map(i=>({src:i.currentSrc,alt:i.alt,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,loaded:i.complete&&i.naturalWidth>0,...box(i)})),links:[...document.querySelectorAll('a[href]')].filter(visible).map(a=>({text:a.innerText,href:a.getAttribute('href')})),navLinks:[...nav?.querySelectorAll('a[href]')||[]].map(a=>({text:a.textContent,href:a.getAttribute('href')})),vars,css:source?css:[],mediaQueries:[...new Set(mediaQueries)],blockedSheets,seo:{description:document.querySelector('meta[name=description]')?.content,robots:document.querySelector('meta[name=robots]')?.content},text:document.querySelector('main')?.innerText};
 });
 if(data.viewport.width!==width||data.viewport.height!==height||data.dpr!==1)throw Error('Screenshot conditions mismatch');
 cmd('screenshot',path.join(out,`${width}-full.png`),'--full');
 cmd('screenshot',path.join(out,`${width}-first.png`));
 report.captures.push(data);await writeFile(path.join(out,'capture.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({phase,width,height: data.pageHeight,sections:data.sections.length,broken:data.images.filter(i=>!i.loaded).length}));
}
