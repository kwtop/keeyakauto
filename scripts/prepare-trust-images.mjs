import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import sharp from 'sharp';

const root=resolve(import.meta.dirname,'..');
const manifestPath=process.argv[2]?resolve(root,process.argv[2]):join(root,'docs/trust-implementation-20261021/imagegen-manifest.json');
const task=dirname(manifestPath);
const manifest=JSON.parse(await readFile(manifestPath,'utf8'));
const directory=manifest.outputDirectory||'trust-20261021';
if(!/^[a-z0-9-]+$/.test(directory))throw new Error('Invalid trust image directory');
const output=join(root,'public/images',directory);
const originals=join(task,'generated-originals');
await mkdir(output,{recursive:true});
await mkdir(originals,{recursive:true});
const assets=manifest.preserveExisting?JSON.parse(await readFile(join(root,'src/data/trustMedia.json'),'utf8')):{};
for(const [key,asset] of Object.entries(manifest.assets)){
 const bytes=await readFile(asset.generated);
 const metadata=await sharp(bytes).metadata();
 const widths=[480,960,1440].filter(width=>width<metadata.width);
 widths.push(Math.min(1440,metadata.width));
 const unique=[...new Set(widths)].sort((a,b)=>a-b);
 await copyFile(asset.generated,join(originals,`${key}.png`));
 for(const width of unique){
  await sharp(bytes).resize({width,withoutEnlargement:true}).webp({quality:86,effort:5}).toFile(join(output,`${key}-${width}.webp`));
 }
 const width=unique.at(-1);
 assets[key]={src:`/images/${directory}/${key}-${width}.webp`,srcset:unique.map(size=>`/images/${directory}/${key}-${size}.webp ${size}w`).join(', '),width,height:Math.round(metadata.height*width/metadata.width),kind:asset.original?'refined':'concept',...(asset.original?{original:asset.original}:{})};
 asset.sha256=createHash('sha256').update(bytes).digest('hex');
 asset.generatedSize={width:metadata.width,height:metadata.height};
}
await writeFile(join(root,'src/data/trustMedia.json'),JSON.stringify(assets,null,2)+'\n');
await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log(`Prepared ${Object.keys(manifest.assets).length} imagegen assets; ${Object.keys(assets).length} registered assets in total.`);
