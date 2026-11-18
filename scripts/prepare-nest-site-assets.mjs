import sharp from 'sharp';
import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const root=path.resolve(process.cwd(),'..');
const docs=path.join(root,'docs/nest-site-20261019');
const images=path.join(root,'workspace/public/images/nest-site-20261019');
const originals=path.join(root,'checkpoints/nest-site-20261019/imagegen-originals');
await Promise.all([mkdir(images,{recursive:true}),mkdir(originals,{recursive:true})]);
const jobs=JSON.parse(await readFile(path.join(docs,'IMAGE-PROMPTS.json'),'utf8'));
const assets=[];
for(const job of jobs){
 const meta=await sharp(job.source).metadata();
 const original=path.join(originals,job.key+'.png');await copyFile(job.source,original);
 const target=job.target||(job.key==='inspection-editorial'?[1536,1024]:job.key==='support-editorial'?[1448,1086]:[1536,864]);
 const outputs=[];
 for(const width of [target[0],960,640]){
  const filename=job.key+(width===target[0]?'':`-${width}`)+'.webp';
  const file=path.join(images,filename);
  await sharp(original).resize({width,height:Math.round(width*target[1]/target[0]),fit:'cover',position:'centre'}).webp({quality:86}).toFile(file);
  const bytes=await readFile(file),m=await sharp(file).metadata();
  outputs.push({path:'/images/nest-site-20261019/'+filename,width:m.width,height:m.height,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
 }
 assets.push({key:job.key,tool:'Built-in ImageGen',type:job.type||'New non-evidence editorial illustration',reference:job.reference,source:job.source,original:path.relative(root,original).replaceAll('\\','/'),originalSize:{width:meta.width,height:meta.height},outputs});
}
await writeFile(path.join(docs,'IMAGE-INVENTORY.json'),JSON.stringify({createdOn:'2026-10-19',factualBoundary:'No generated image proves inventory, actual inspections, shipments, factory capability or a specific model configuration.',assets},null,2)+'\n');
console.log(JSON.stringify(assets.map(a=>({key:a.key,outputs:a.outputs.map(o=>({path:o.path,width:o.width,height:o.height}))})),null,2));
