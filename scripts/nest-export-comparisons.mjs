import sharp from 'sharp';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(process.cwd(),'../checkpoints/nest-site-20261019/export');
const before=JSON.parse(await readFile(path.join(root,'before/QA.json'),'utf8'));
const after=JSON.parse(await readFile(path.join(root,'final/QA.json'),'utf8'));
const folder=path.join(root,'delivery');await mkdir(folder,{recursive:true});
const comparisons=[];
const core=['/export-services/','/export-services/buying-guide/','/export-services/faq/','/guides/countries/'];
for(const current of after.pages){
 const previous=before.pages.find(p=>p.url===current.url&&p.viewport.width===current.viewport.width);
 if(!previous)continue;
 const file=current.screenshot.replace(/\.png$/,'');
 const width=current.viewport.width,height=current.viewport.height;
 const label=Buffer.from('<svg width="'+(width*2+24)+'" height="48"><rect width="100%" height="100%" fill="white"/><g fill="#2b2b2b" font-family="Arial,sans-serif" font-size="16"><text x="16" y="28">Before - '+width+' x '+height+'</text><text x="'+(width+40)+'" y="28">Nest rollout - '+width+' x '+height+'</text></g></svg>');
 const firsts=await Promise.all([sharp(path.join(root,'before',file+'-first.png')).toBuffer(),sharp(path.join(root,'final',file+'-first.png')).toBuffer()]);
 const name='first-before-after-'+file+'.png';
 await sharp({create:{width:width*2+24,height:height+48,channels:3,background:'#fff'}}).composite([{input:label,left:0,top:0},{input:firsts[0],left:0,top:48},{input:firsts[1],left:width+24,top:48}]).png().toFile(path.join(folder,name));
 const item={url:current.url,viewport:current.viewport,first:name};
 if(core.includes(current.url)){
  const fullName='full-before-after-'+file+'.png';
  const maxHeight=Math.max(previous.height,current.height);
  await sharp({create:{width:width*2+24,height:maxHeight+48,channels:3,background:'#fff'}}).composite([{input:label,left:0,top:0},{input:path.join(root,'before',previous.screenshot),left:0,top:48},{input:path.join(root,'final',current.screenshot),left:width+24,top:48}]).png().toFile(path.join(folder,fullName));
  item.full=fullName;
 }
 comparisons.push(item);
}
await writeFile(path.join(folder,'COMPARISONS.json'),JSON.stringify(comparisons,null,2)+'\n');
console.log(JSON.stringify({pages:comparisons.length,folder},null,2));
