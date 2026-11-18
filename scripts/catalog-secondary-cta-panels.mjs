import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
const root=path.resolve('..');
const assignment=JSON.parse(fs.readFileSync(path.join(root,'docs/nest-site-20261019/REVIEW-CATALOG-ASSIGNMENT.json'),'utf8'));
const capture=JSON.parse(fs.readFileSync(path.join(root,'docs/nest-site-20261019/FINAL-CAPTURE.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'checkpoints/nest-site-20261019/catalog-secondary-final/MANIFEST.json'),'utf8'));
const urls=assignment.urls.filter(url=>url.startsWith('/new-cars/')&&manifest.find(p=>p.url===url)?.type==='vehicle-detail');
const folder=path.join(root,'checkpoints/nest-site-20261019/catalog-secondary-final/cta-recheck');fs.mkdirSync(folder,{recursive:true});
const boards=[];
for(const width of [1440,390]){
 const pieces=[];const target=width===1440?720:390;const group=width===1440?6:8;const columns=width===1440?2:4;
 for(const url of urls){
  const v=capture.pages.find(p=>p.url===url).viewports.find(v=>v.viewport.width===width);const m=v.modules.find(m=>m.name==='inquiry');
  const top=Math.floor(m.y),h=Math.ceil(m.y+m.height)-top;
  const {data,info}=await sharp(path.join(root,v.screenshot)).extract({left:0,top,width,height:h}).resize({width:target}).png().toBuffer({resolveWithObject:true});
  pieces.push({url,source:v.screenshot,data,width:info.width,height:info.height,range:[top,top+h]});
 }
 for(let start=0;start<pieces.length;start+=group){
  const sub=pieces.slice(start,start+group);const ncols=Math.min(columns,sub.length);const cellH=Math.max(...sub.map(p=>p.height))+42;const gap=16;const cw=ncols*(target+gap)-gap;const ch=Math.ceil(sub.length/ncols)*(cellH+gap)-gap;
  const label=Buffer.from(`<svg width="${cw}" height="${ch}">${sub.map((p,i)=>`<text x="${(i%ncols)*(target+gap)+4}" y="${Math.floor(i/ncols)*(cellH+gap)+23}" font-family="Arial" font-size="15" fill="#222">${p.url}</text>`).join('')}</svg>`);
  const file=path.join(folder,`cta-${width}-${Math.floor(start/group)+1}.png`);
  await sharp({create:{width:cw,height:ch,channels:3,background:'#fff'}}).composite([{input:label,left:0,top:0},...sub.map((p,i)=>({input:p.data,left:(i%ncols)*(target+gap),top:Math.floor(i/ncols)*(cellH+gap)+38}))]).png().toFile(file);
  boards.push({file:path.relative(root,file).replaceAll('\\','/'),width,displayScale:target/width,urls:sub.map(p=>p.url),sources:sub.map(p=>({url:p.url,source:p.source,range:p.range}))});
 }
}
fs.writeFileSync(path.join(folder,'MANIFEST.json'),JSON.stringify({urls,boards},null,2));console.log(JSON.stringify({urls:urls.length,boards:boards.length,files:boards.map(p=>p.file)}));
