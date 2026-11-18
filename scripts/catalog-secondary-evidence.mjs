import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import crypto from 'node:crypto';
const root=path.resolve('..');
const assignment=JSON.parse(fs.readFileSync(path.join(root,'docs/nest-site-20261019/REVIEW-CATALOG-ASSIGNMENT.json'),'utf8'));
const data=JSON.parse(fs.readFileSync(path.join(root,'docs/nest-site-20261019/FINAL-CAPTURE.json'),'utf8'));
const types=JSON.parse(fs.readFileSync(path.join(root,'docs/nest-site-20261019/URL-INVENTORY-BEFORE.json'),'utf8')).pages;
const folder=path.join(root,'checkpoints/nest-site-20261019/catalog-secondary-final');
fs.mkdirSync(folder,{recursive:true});
const manifest=[];
for(const url of assignment.urls){
 const captured=data.pages.find(p=>p.url===url);if(!captured)throw new Error('Missing final '+url);
 const panels=[];const hashes=[];
 for(const v of captured.viewports){
  const source=path.join(root,v.screenshot);const meta=await sharp(source).metadata();
  const end=Math.min(meta.height,Math.ceil(Math.max(...v.modules.map(m=>m.y+m.height)))+24);
  const width=v.viewport.width;const span=width===1440?1900:1500;const desired=width===1440?900:390;
  const entries=[];
  for(let top=0;top<end;top+=span){const h=Math.min(span,end-top);const {data,info}=await sharp(source).extract({left:0,top,width,height:h}).resize({width:desired}).png().toBuffer({resolveWithObject:true});entries.push({data,width:info.width,height:info.height,sourceCssTop:top,sourceCssHeight:h});}
  const group=width===1440?2:4;
  for(let start=0;start<entries.length;start+=group){
   const pieces=entries.slice(start,start+group);const gap=16;const labelH=40;const canvasW=pieces.length*(desired+gap)-gap;const canvasH=Math.max(...pieces.map(p=>p.height))+labelH;
   const slug=url.replace(/^\//,'').replace(/\/$/,'').replaceAll('/','__');const file=path.join(folder,`${slug}--${width}--${Math.floor(start/group)+1}.png`);
   const safe=url.replaceAll('&','&amp;').replaceAll('<','&lt;');const label=Buffer.from(`<svg width="${canvasW}" height="${labelH}"><rect width="100%" height="100%" fill="white"/>${pieces.map((p,i)=>`<text x="${i*(desired+gap)+6}" y="26" font-family="Arial" font-size="17" fill="#222">${safe} · ${width}px · y=${p.sourceCssTop}</text>`).join('')}</svg>`);
   await sharp({create:{width:canvasW,height:canvasH,channels:3,background:'#eee'}}).composite([{input:label,left:0,top:0},...pieces.map((p,i)=>({input:p.data,left:i*(desired+gap),top:labelH}))]).png().toFile(file);
   panels.push({file:path.relative(root,file).replaceAll('\\','/'),viewportWidth:width,source:v.screenshot,displayScale:desired/width,cssRanges:pieces.map(p=>[p.sourceCssTop,p.sourceCssTop+p.sourceCssHeight])});
  }
  const finalHash=crypto.createHash('sha256').update(await sharp(source).extract({left:0,top:0,width,height:end}).raw().toBuffer()).digest('hex');
  const prev=source.replace(`${path.sep}final${path.sep}`,`${path.sep}after${path.sep}`);let samePreviousMain=false;
  if(fs.existsSync(prev)){const pm=await sharp(prev).metadata();if(pm.height>=end&&pm.width===width){samePreviousMain=finalHash===crypto.createHash('sha256').update(await sharp(prev).extract({left:0,top:0,width,height:end}).raw().toBuffer()).digest('hex');}}
  hashes.push({width,mainPixelSha256:finalHash,samePreviousMain});
 }
 manifest.push({url,type:types.find(p=>p.url===url)?.type,panels,hashes,metadata:{moduleCount:captured.viewports[0].modules.length,uniqueImages:captured.viewports[0].uniqueImageCount,overflow:captured.viewports.some(v=>v.overflow),broken:captured.viewports.some(v=>v.images.some(i=>!i.loaded)),errors:captured.viewports.flatMap(v=>v.errors),h1:captured.viewports[0].h1[0]?.text}});
}
fs.writeFileSync(path.join(folder,'MANIFEST.json'),JSON.stringify(manifest,null,2));
console.log(JSON.stringify({total:manifest.length,panels:manifest.reduce((s,p)=>s+p.panels.length,0),initialFour:manifest.slice(0,4).map(p=>({url:p.url,hashes:p.hashes}))}));
