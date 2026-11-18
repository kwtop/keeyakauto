import fs from 'node:fs';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root=path.resolve('..');
const data=JSON.parse(fs.readFileSync(path.join(root,'docs/nest-site-20261019/AFTER-CAPTURE.json'),'utf8'));
const all=JSON.parse(fs.readFileSync(path.join(root,'docs/nest-site-20261019/URL-INVENTORY-BEFORE.json'),'utf8')).pages.filter(p=>['catalog','brand-index','brand-family','vehicle-detail'].includes(p.type));
const folder=path.join(root,'checkpoints/nest-site-20261019/catalog-review');await mkdir(folder,{recursive:true});
const manifest=[];
for(const p of all){
 const captured=data.pages.find(v=>v.url===p.url);
 if(!captured){manifest.push({url:p.url,type:p.type,status:'awaiting-final-capture'});continue;}
 const panels=[];
 for(const v of captured.viewports){
  const source=path.join(root,v.screenshot);const meta=await sharp(source).metadata();
  const end=Math.min(meta.height,Math.ceil(Math.max(...v.modules.map(m=>m.y+m.height)))+24);
  const width=v.viewport.width;
  const span=width===1440?1900:1500;
  const desired=width===1440?900:390;
  const entries=[];
  for(let top=0;top<end;top+=span){
   const h=Math.min(span,end-top);
   const {data,info}=await sharp(source).extract({left:0,top,width,height:h}).resize({width:desired}).png().toBuffer({resolveWithObject:true});
   entries.push({data,width:info.width,height:info.height,sourceCssTop:top,sourceCssHeight:h});
  }
  const group=width===1440?2:4;
  for(let start=0;start<entries.length;start+=group){
   const pieces=entries.slice(start,start+group);const gap=16;const labelH=40;
   const canvasW=pieces.length*(desired+gap)-gap;
   const canvasH=Math.max(...pieces.map(p=>p.height))+labelH;
   const slug=p.url.replace(/^\//,'').replace(/\/$/,'').replaceAll('/','__');
   const file=path.join(folder,`${slug}--${width}--${Math.floor(start/group)+1}.png`);
   const stamp=JSON.stringify({source,width,end,start,sourceModified:fs.statSync(source).mtimeMs});
   if(!fs.existsSync(file)||!fs.existsSync(file+'.json')||fs.readFileSync(file+'.json','utf8')!==stamp){
    const safe=p.url.replaceAll('&','&amp;').replaceAll('<','&lt;');
    const label=Buffer.from(`<svg width="${canvasW}" height="${labelH}"><rect width="100%" height="100%" fill="white"/>${pieces.map((piece,i)=>`<text x="${i*(desired+gap)+6}" y="26" font-family="Arial" font-size="17" fill="#222">${safe} · ${width}px · y=${piece.sourceCssTop}</text>`).join('')}</svg>`);
    await sharp({create:{width:canvasW,height:canvasH,channels:3,background:'#eee'}}).composite([{input:label,left:0,top:0},...pieces.map((piece,i)=>({input:piece.data,left:i*(desired+gap),top:labelH}))]).png().toFile(file);
    fs.writeFileSync(file+'.json',stamp);
   }
   panels.push({file:path.relative(root,file).replaceAll('\\','/'),viewportWidth:width,source:v.screenshot,displayScale:desired/width,cssRanges:pieces.map(x=>[x.sourceCssTop,x.sourceCssTop+x.sourceCssHeight])});
  }
 }
 manifest.push({url:p.url,type:p.type,status:'ready',panels,metadata:{moduleCount:captured.viewports[0].modules.length,uniqueImages:captured.viewports[0].uniqueImageCount,overflow:captured.viewports.some(v=>v.overflow),broken:captured.viewports.some(v=>v.images.some(i=>!i.loaded)),errors:captured.viewports.flatMap(v=>v.errors),h1:captured.viewports[0].h1[0]?.text}});
}
await writeFile(path.join(folder,'MANIFEST.json'),JSON.stringify(manifest,null,2));
console.log(JSON.stringify({total:all.length,ready:manifest.filter(x=>x.status==='ready').length,first:manifest.filter(x=>x.status==='ready').slice(0,5)}));
