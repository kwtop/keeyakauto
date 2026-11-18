import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const evidence=resolve(root,'../docs/inner-autohaus-refinement-20261030');
const manifest=JSON.parse(await readFile(resolve(evidence,'IMAGE-MANIFEST.json'),'utf8'));
const prefix='/images/editorial-refinement-20261030/';
const output=resolve(root,'public'+prefix);
const descriptions={
 'configuration-detail':'AI-edited illustration of a silver Geely Xingyue L with its door open for configuration review; not an exact equipment or inventory record',
 'inspection-detail':'AI-edited illustration of paint thickness measurement on a red Volkswagen ID.3; not a completed inspection or condition report',
 'handover-detail':'AI-edited illustration of keys and documents prepared beside a silver BYD Qin Plus; not a handover or shipment record'
};
await mkdir(output,{recursive:true});
const media={};
for(const asset of manifest.images){
 await copyFile(asset.generatedFile,resolve(evidence,'generated',asset.key+'.png'));
 const meta=await sharp(asset.generatedFile).metadata();
 const widths=[480,800,1200,1440].filter(width=>width<=meta.width);
 const variants=[];
 for(const width of widths){
  const name=asset.key+'-'+width+'.webp';
  await sharp(asset.generatedFile).resize({width}).webp({quality:85,effort:5}).toFile(resolve(output,name));
  variants.push({src:prefix+name,width});
 }
 const main=variants.at(-1);
 media['refined-'+asset.key.replace('-detail','')]={
  src:main.src,srcset:variants.map(item=>item.src+' '+item.width+'w').join(', '),
  width:main.width,height:Math.round(main.width*meta.height/meta.width),kind:'concept',alt:descriptions[asset.key]
 };
}
await writeFile(resolve(root,'src/data/editorialRefinementMedia.json'),JSON.stringify(media,null,2)+'\n');
console.log('Prepared '+manifest.images.length+' editorial images with responsive variants.');
