import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';
const folder=path.resolve('../docs/catalog-full-colour-20261021');
const manifestPath=path.join(folder,'GENERATIONS.json');
const manifest=JSON.parse(await readFile(manifestPath,'utf8'));
if(manifest.jobs.length!==47||manifest.jobs.some(j=>!j.raw||!j.reviewed))throw new Error('Complete and review all 47 originals first.');
const publicBase='/images/catalog-colour-scenes-20261021/';
await mkdir('public'+publicBase,{recursive:true});
await mkdir(path.join(folder,'generated'),{recursive:true});
const scenes={};
for(const job of manifest.jobs){
 const preserved=path.join(folder,'generated',job.id+'.png');
 await copyFile(job.raw,preserved);
 const meta=await sharp(preserved).metadata();
 if(Math.abs(meta.width/meta.height-4/3)>.02)throw new Error('Review image ratio '+job.key);
 const widths=[480,800,1200,meta.width].filter((w,i,a)=>w<=meta.width&&a.indexOf(w)===i);
 const outputs=[];
 for(const width of widths){
  const src=publicBase+job.id+(width===meta.width?'':'-'+width)+'.webp';
  await sharp(preserved).resize({width,withoutEnlargement:true}).webp({quality:87,effort:5}).toFile('public'+src);
  const info=await sharp('public'+src).metadata();outputs.push({src,width:info.width,height:info.height});
 }
 const main=outputs.at(-1),srcSet=outputs.map(o=>o.src+' '+o.width+'w').join(', ');
 scenes[job.key]={src:main.src,srcSet,original:job.original,alt:`${job.name} facing left in ${job.scene} — AI-edited illustration`,note:'AI-edited setting. Original model photograph available below; confirm the offered version.'};
 Object.assign(job,{adopted:{...main,srcSet},outputs,preservedOriginal:preserved.replaceAll('\\','/'),inputSha256:createHash('sha256').update(await readFile(job.reference)).digest('hex'),status:'adopted'});
}
await writeFile('src/data/catalogColourScenes.json',JSON.stringify(scenes,null,2)+'\n');
await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({scenes:Object.keys(scenes).length,responsiveFiles:manifest.jobs.reduce((n,j)=>n+j.outputs.length,0)}));
