import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const project=resolve(root,'..');
const evidence=resolve(project,'docs/pickup-van-covers-left45-20261030');
const generated=JSON.parse(await readFile(resolve(evidence,'cover-generation-manifest.json'),'utf8'));
const models=JSON.parse(await readFile(resolve(root,'src/data/commercial-vehicle-specifications.json'),'utf8')).models;
const source=JSON.parse(await readFile(resolve(root,'src/data/commercial-vehicle-source.json'),'utf8'));
const publicPrefix='/images/catalog-commercial-left45-20261030/';
const publicFolder=resolve(root,'public'+publicPrefix);
const scenes={};
await mkdir(publicFolder,{recursive:true});
await mkdir(resolve(evidence,'generated'),{recursive:true});
for(const asset of generated.images){
 const model=models.find(model=>model.key===asset.key);
 const vehicle=source.records.find(vehicle=>vehicle.brandSlug+'/'+vehicle.slug===asset.key);
 const stem=asset.key.replace('/','-')+'-cover';
 const metadata=await sharp(asset.generatedFile).metadata();
 if(!metadata.width||metadata.width<1200||!metadata.height)throw new Error('Insufficient cover size '+asset.key);
 await copyFile(asset.generatedFile,resolve(evidence,'generated',stem+'.png'));
 const localFolder=resolve(project,model.processedFolder,'封面');
 await mkdir(localFolder,{recursive:true});
 const targets=[];
 for(const width of [480,800,1200,1448]){
  const filename=stem+(width===1448?'':'-'+width)+'.webp';
  const output=resolve(publicFolder,filename);
  await sharp(asset.generatedFile).resize(width,Math.round(width*3/4),{fit:'contain',background:'#f5f4f0'}).webp({quality:86,effort:5}).toFile(output);
  if(width===1448)await copyFile(output,resolve(localFolder,filename));
  targets.push({width,src:publicPrefix+filename});
 }
 const src=targets.at(-1).src;
 scenes[asset.key]={src,srcSet:targets.map(target=>`${target.src} ${target.width}w`).join(', '),
  original:vehicle.gallery[0].original,
  alt:`${vehicle.name}, front three-quarter view facing left, in an AI-edited presentation scene; exact version appearance to confirm`,
  note:'AI-edited presentation scene. Body, cab, seating and equipment can vary by version. The supplied source photograph remains available.'};
}
if(Object.keys(scenes).length!==24)throw new Error('Incomplete commercial cover set');
await writeFile(resolve(root,'src/data/commercialVehicleScenes.json'),JSON.stringify(scenes,null,2)+'\n');
console.log(`Prepared ${Object.keys(scenes).length} covers and 96 responsive images.`);
