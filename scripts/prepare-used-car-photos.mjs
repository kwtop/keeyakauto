import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';
import {resolve,dirname,extname} from 'node:path';
import sharp from 'sharp';

const root=resolve(import.meta.dirname,'..');
const data=JSON.parse(await readFile(resolve(root,'src/data/used-vehicle-data.json'),'utf8'));
const presentations=JSON.parse(await readFile(resolve(root,'src/data/used-car-presentations.json'),'utf8'));
const images={};
let sourceBytes=0,deliveryBytes=0;
const sources=new Set([...data.records.flatMap(vehicle=>vehicle.gallery.map(photo=>photo.src)),...Object.values(presentations).map(photo=>photo.src)]);
for(const src of sources){
    const input=resolve(root,'public'+src),info=await sharp(input).metadata();
    const extension=extname(src),base=src.slice(0,-extension.length);
    const paths=[];
    for(const size of [480,960,1600]){
      const targetSrc=base+`-${size}.webp`,target=resolve(root,'public'+targetSrc);
      await mkdir(dirname(target),{recursive:true});
      const inputStat=await stat(input);
      const exists=await stat(target).catch(()=>null);
      if(!exists||exists.mtimeMs<inputStat.mtimeMs){
        await sharp(input).autoOrient().resize({width:size,height:size,fit:'inside',withoutEnlargement:true}).webp({quality:86}).toFile(target);
      }
      const metadata=await sharp(target).metadata();
      paths.push({src:targetSrc,width:metadata.width,height:metadata.height});
    }
    images[src]={src:paths.at(-1).src,srcSet:paths.filter((item,index,all)=>all.findIndex(other=>other.width===item.width)===index).map(item=>`${item.src} ${item.width}w`).join(', '),width:paths.at(-1).width,height:paths.at(-1).height};
    sourceBytes+=(await stat(input)).size;
    deliveryBytes+=(await stat(resolve(root,'public'+paths.at(-1).src))).size;
    if(!info.width||!info.height)throw new Error('Unreadable supplied image '+src);
}
await writeFile(resolve(root,'src/data/used-car-photo-delivery.json'),JSON.stringify(images,null,2)+'\n');
console.log(JSON.stringify({images:Object.keys(images).length,sourceBytes,deliveryBytes,originalsUnchanged:true}));
