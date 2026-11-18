import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';
const folder=path.resolve('../docs/catalog-scenes-left-20261021');
const manifestPath=path.join(folder,'GENERATIONS.json');
const manifest=JSON.parse(await readFile(manifestPath,'utf8'));
const readJson=async file=>JSON.parse(await readFile(file,'utf8'));
const maps=await Promise.all(['modelScenes','siteModelScenes','siteImagerySizes'].map(name=>readJson('src/data/'+name+'.json')));
const [scenes,expanded,sizes]=maps;
const publicBase='/images/catalog-left-scenes-20261021/';
await mkdir('public'+publicBase,{recursive:true});await mkdir(path.join(folder,'generated'),{recursive:true});
for(const job of manifest.jobs){
 if(!job.raw||!job.reviewed)throw new Error('Unreviewed image '+job.key);
 const name=job.id+'-left';
 const preserved=path.join(folder,'generated',name+'.png');
 await copyFile(job.raw,preserved);
 const meta=await sharp(preserved).metadata();
 const widths=[480,800,1200,meta.width].filter((v,i,a)=>v<=meta.width&&a.indexOf(v)===i);
 const outputs=[];
 for(const width of widths){
  const src=publicBase+name+(width===meta.width?'':'-'+width)+'.webp';
  await sharp(preserved).resize({width,withoutEnlargement:true}).webp({quality:87,effort:5}).toFile('public'+src);
  const info=await sharp('public'+src).metadata();outputs.push({src,width:info.width,height:info.height});
 }
 const main=outputs.at(-1),srcSet=outputs.map(o=>o.src+' '+o.width+'w').join(', ');
 const map=scenes[job.key]?scenes:expanded;
 map[job.key]={...map[job.key],src:main.src,srcSet,original:job.leftReference};
 const sizeKey=job.key.replaceAll('/','-');
 if(sizes[sizeKey])sizes[sizeKey]={...main,srcSet,widths,small:outputs.find(o=>o.width===800).src};
 job.adopted={...main,srcSet};job.outputs=outputs;job.preservedOriginal=preserved.replaceAll('\\','/');
 job.inputHashes=Object.fromEntries(await Promise.all(job.inputs.map(async file=>[file,createHash('sha256').update(await readFile(file)).digest('hex')])));
}
for(const [i,name] of ['modelScenes','siteModelScenes','siteImagerySizes'].entries())await writeFile('src/data/'+name+'.json',JSON.stringify(maps[i],null,2)+'\n');
await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({generated:manifest.jobs.length,responsiveFiles:manifest.jobs.reduce((n,j)=>n+j.outputs.length,0),sourcePhotosSelected:manifest.sourceChoices.length}));
