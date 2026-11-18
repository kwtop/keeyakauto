import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root=path.resolve('public/images/company');
const output=path.resolve('public/images/about-redesign');
await fs.mkdir(output,{recursive:true});
const sources=(await fs.readdir(root,{recursive:true})).filter(file=>file.endsWith('.webp')).map(file=>({file:path.join(root,file),src:'/images/company/'+file.replaceAll('\\','/')}));
sources.push({file:path.resolve('design-exploration/about-redesign-20261014/passenger-car-port-concept-original.png'),src:'/images/about-redesign/passenger-car-port-concept.webp'});
sources.push({file:path.resolve('public/images/catalog/toyota/camry/toyota-camry-front-three-quarter-left.webp'),src:'/images/catalog/toyota/camry/toyota-camry-front-three-quarter-left.webp'});
let map={};
if(process.argv.includes('--incremental'))map=JSON.parse(await fs.readFile('src/data/aboutMedia.json','utf8'));
for(const source of sources){
 if(map[source.src])continue;
 const meta=await sharp(source.file).metadata();
 const name=path.basename(source.file,path.extname(source.file)).replace('-original','');
 const variants=[];
 for(const limit of [640,1440]){
  const width=Math.min(limit,meta.width);
  if(variants.some(v=>v.width===width))continue;
  const filename=`${name}-${width}.webp`;
  await sharp(source.file).rotate().resize({width,withoutEnlargement:true}).webp({quality:name.includes('certificate')||name.includes('assessment')?92:84,effort:5}).toFile(path.join(output,filename));
  variants.push({src:'/images/about-redesign/'+filename,width});
 }
 map[source.src]={width:meta.width,height:meta.height,src:variants.at(-1).src,srcset:variants.map(v=>`${v.src} ${v.width}w`).join(', ')};
}
await fs.writeFile(path.resolve('src/data/aboutMedia.json'),JSON.stringify(map,null,2)+'\n');
console.log(`Prepared responsive derivatives for ${sources.length} About images. Originals preserved.`);
