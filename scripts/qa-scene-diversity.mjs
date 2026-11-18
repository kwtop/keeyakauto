import {readFile,writeFile,readdir,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const root=process.cwd();
const records=path.resolve(root,'../docs/scene-diversity-20261020');
const manifest=JSON.parse(await readFile(path.join(records,'GENERATIONS.json'),'utf8'));
const hash=async file=>createHash('sha256').update(await readFile(file)).digest('hex');
const walk=async dir=>(await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat();
const checkpoint=path.resolve(root,'../checkpoints/scene-diversity-20261020/src');
const changed=[];
const checkpointFiles=await walk(checkpoint);
for(const file of checkpointFiles){
 const rel=path.relative(checkpoint,file);
 if(await hash(file)!==await hash(path.join(root,'src',rel)))changed.push(rel.replaceAll('\\','/'));
}
// Vehicle data, variants, routes, pricing and inquiry logic must remain untouched.
assert.ok(changed.every(p=>[
 'data/modelScenes.json','data/siteModelScenes.json','data/siteImagerySizes.json',
 'data/brandCorrectedImageSizes.json','data/autohausHome.ts','layouts/Base.astro',
 'data/exportServiceMedia.ts','components/export/exportStoryMedia.ts'
].includes(p)),JSON.stringify(changed));
const originalFiles=new Set(checkpointFiles.map(file=>path.relative(checkpoint,file).replaceAll('\\','/')));
const added=(await walk(path.join(root,'src'))).map(file=>path.relative(path.join(root,'src'),file).replaceAll('\\','/')).filter(file=>!originalFiles.has(file));
assert.deepEqual(added,['data/sceneDiversityHome.json']);
for(const [file,expected] of Object.entries(manifest.sourceHashes))assert.equal(await hash(file),expected,'Source photo changed: '+file);
for(const job of manifest.jobs)for(const asset of job.outputs){
 const file=path.join(root,'public',asset.src);
 const meta=await sharp(file).metadata();
 assert.equal(meta.width,asset.width);assert.equal(meta.height,asset.height);
 assert.ok(Math.abs(meta.width/meta.height-job.adopted.width/job.adopted.height)<0.003);
 assert.ok((await stat(file)).size>1000);
}
const oldScenes=manifest.jobs.filter(j=>j.oldSrc).map(j=>j.oldSrc.replace(/\.webp$/,''));
const adoptedSources=new Map(manifest.jobs.flatMap(j=>j.outputs.map(asset=>[asset.src,j.adopted.src])));
const pages=[],missing=[],stale=[],usage={};
for(const file of (await walk(path.join(root,'dist'))).filter(f=>f.endsWith('.html'))){
 const html=await readFile(file,'utf8');
 const route=path.relative(path.join(root,'dist'),file).replaceAll('\\','/').replace(/index\.html$/,'');
 if(/^(design|design-preview)(\/|$)/.test(route))continue;
 if(!/<body\b[^>]*class="[^"]*\binner-editorial\b/.test(html)&&!html.includes('class="ah-home"'))continue;
 pages.push('/'+route);
 for(const tag of html.matchAll(/<(?:img|source)\b[^>]*>/g)){
  const src=tag[0].match(/\ssrc="([^"]+)"/)?.[1];
  const srcSet=tag[0].match(/\ssrcset="([^"]+)"/)?.[1];
  const refs=[...(src?[src]:[]),...(srcSet?srcSet.split(',').map(p=>p.trim().split(/\s+/)[0]):[])];
  for(const ref of refs){
   if(!ref.startsWith('/'))continue;
   try{await stat(path.join(root,'dist',decodeURIComponent(ref.split('?')[0])));}catch{missing.push({route,ref});}
   if(oldScenes.some(old=>ref===old+'.webp'||ref.startsWith(old+'-')))stale.push({route,ref});
  }
  if(src&&adoptedSources.has(src))(usage[adoptedSources.get(src)]??=[]).push('/'+route);
 }
}
assert.equal(missing.length,0,JSON.stringify(missing));
assert.equal(stale.length,0,JSON.stringify(stale));
assert.equal(Object.keys(usage).length,33,'Every adopted image must occur on the public site');
const report={passed:true,pages:pages.length,adoptedImages:Object.keys(usage).length,responsiveImages:manifest.jobs.reduce((n,j)=>n+j.outputs.length,0),sourcePhotosVerified:Object.keys(manifest.sourceHashes).length,changedSource:changed,addedSource:added,missing,stale,usage};
await writeFile(path.join(records,'static-image-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,usage:undefined}));
