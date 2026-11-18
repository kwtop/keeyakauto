import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const folder=path.resolve(process.argv[2]);
const target=path.join(folder,'inspection');
await mkdir(target,{recursive:true});
const sizes=[[1440,900],[1024,768],[768,1024],[390,844]];
const info=[];
for(const [width,height] of sizes){
 const file=path.join(folder,`page-${width}x${height}.png`);
 const meta=await sharp(file).metadata();
 await sharp(file).extract({left:0,top:0,width:meta.width,height:Math.min(height,meta.height)}).png().toFile(path.join(target,`first-${width}.png`));
 await sharp(file).resize({width:width<500?390:720}).png().toFile(path.join(target,`overview-${width}.png`));
 const chunks=[];
 for(let top=height;top<meta.height;top+=1400){
  const name=`chunk-${width}-${top}.png`;
  await sharp(file).extract({left:0,top,width:meta.width,height:Math.min(1400,meta.height-top)}).resize({width:width<500?390:1000}).png().toFile(path.join(target,name));
  chunks.push(name);
 }
 info.push({viewport:{width,height},screenshot:{width:meta.width,height:meta.height},chunks});
}
await writeFile(path.join(target,'SCREENSHOT-METADATA.json'),JSON.stringify(info,null,2)+'\n');
console.log(JSON.stringify(info,null,2));
