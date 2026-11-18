import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import path from 'node:path';

const phase=process.argv[2]||'reference';
const root=path.resolve(import.meta.dirname,'../..');
const out=path.join(root,'docs/volta-home-20261019',phase);
mkdirSync(out,{recursive:true});
const binary='D:/software/nvm/nodejs/node_modules/agent-browser/bin/agent-browser-win32-x64.exe';
const reference=phase==='reference';
const session=reference?'reference':'local';
const url=reference?'https://www.voltayachts.com/en':(process.env.VOLTA_ORIGIN||'http://127.0.0.1:4353/');
const cli=(...args)=>{
 let raw;
 try{raw=execFileSync(binary,['--namespace','volta-home-20261019','--session',session,...args,'--json'],{encoding:'utf8',timeout:60000,maxBuffer:12*1024*1024});}
 catch(error){if(error.stdout?.trim().startsWith('{"success":true'))raw=error.stdout;else throw error;}
 const data=JSON.parse(raw); if(!data.success)throw Error(JSON.stringify(data.error));return data.data;
};
const evaluate=code=>cli('eval',`eval(atob('${Buffer.from(code).toString('base64')}'))`).result;
cli('open',url);
if(!reference&&phase!=='before'&&!evaluate('!!document.querySelector(".v-home")'))throw Error('Rejected capture: the served page is not the new Volta homepage.');
const report={phase,url,conditions:{dpr:1,zoom:1,fullPage:true,screenshotScale:'css',referenceVideoTime:3,animations:'frozen after full scroll'},captures:[]};
for(const [width,height] of [[1440,900],[1024,768],[768,1024],[390,844]]){
 cli('set','viewport',String(width),String(height));
 evaluate(`(async()=>{
  await document.fonts.ready;
  document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager');
  if(!document.querySelector('#volta-capture-freeze')){const s=document.createElement('style');s.id='volta-capture-freeze';s.textContent='html{scroll-behavior:auto!important} .homepage-render-shell>*,html:has(.homepage-render-shell) footer{content-visibility:visible!important}';document.head.append(s);}
  for(let y=0;y<document.documentElement.scrollHeight;y+=innerHeight*.7){scrollTo(0,y);await new Promise(r=>setTimeout(r,110));}
  await Promise.race([Promise.allSettled([...document.images].map(i=>i.decode())),new Promise(r=>setTimeout(r,12000))]);
  for(const v of document.querySelectorAll('video')){v.pause();if(v.readyState>=2)v.currentTime=3;}
  document.querySelectorAll('main [class*="translate-y-8"]').forEach(e=>{e.style.opacity='1';e.style.transform='none';});
  scrollTo(0,0);await new Promise(r=>setTimeout(r,550));
  return {ready:document.fonts.status};
 })()`);
 const data=evaluate(`(()=>{
  const box=e=>{if(!e)return null;const r=e.getBoundingClientRect();const c=getComputedStyle(e);return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height,font:c.font,fontFamily:c.fontFamily,fontSize:c.fontSize,lineHeight:c.lineHeight,weight:c.fontWeight,tracking:c.letterSpacing,color:c.color,background:c.backgroundColor,padding:c.padding,gap:c.gap,radius:c.borderRadius,grid:c.gridTemplateColumns,display:c.display};};
  const sections=[...document.querySelectorAll('main section')];
  const visible=e=>!!e.getClientRects().length&&!e.closest('[hidden]');
  return {url:location.href,title:document.title,viewport:{width:innerWidth,height:innerHeight},dpr:devicePixelRatio,zoom:getComputedStyle(document.documentElement).zoom,pageHeight:document.documentElement.scrollHeight,pageWidth:document.documentElement.scrollWidth,fontsReady:document.fonts.status==='loaded',header:box(document.querySelector('header')),hero:box(sections[0]),h1:box(document.querySelector('h1')),h1Text:document.querySelector('h1')?.textContent,container:box(document.querySelector('main .container-custom,main .v-container,main .nest-container')),sections:sections.map((s,i)=>({index:i,id:s.id,title:s.querySelector('h2')?.textContent,...box(s)})),footer:box(document.querySelector('footer')),images:[...document.images].filter(visible).map(i=>({src:i.currentSrc,alt:i.alt,loaded:i.complete&&i.naturalWidth>0,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,fit:getComputedStyle(i).objectFit,position:getComputedStyle(i).objectPosition,...box(i)})),links:[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')))],seo:{description:document.querySelector('meta[name=description]')?.content,robots:document.querySelector('meta[name=robots]')?.content},video:[...document.querySelectorAll('video')].map(v=>({paused:v.paused,ready:v.readyState,time:v.currentTime}))};
 })()`);
 cli('screenshot',path.join(out,`${width}-full.png`),'--full');
 cli('screenshot',path.join(out,`${width}-first.png`));
 report.captures.push(data);
 writeFileSync(path.join(out,'capture.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({phase,width,height,pageWidth:data.pageWidth,pageHeight:data.pageHeight,sections:data.sections.length,broken:data.images.filter(i=>!i.loaded).length}));
}
