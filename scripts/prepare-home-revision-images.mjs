import sharp from 'sharp';
import {copyFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(process.cwd(),'..');
const generated='C:/Users/Administrator/.codex/generated_images/01a13833-da6f-7712-95d1-525883e33855';
const archive=path.join(root,'checkpoints/home-revision-20261019/imagegen-originals');
const publicDir=path.resolve('public/images/home-revision-20261019');
await mkdir(archive,{recursive:true});await mkdir(publicDir,{recursive:true});
const assets=[
 {name:'camry-hero-wide',file:'exec-74cd9124-50f5-4cb7-b9d6-fc84c703a5a6.png',widths:[960,1440,1983]},
 {name:'facility-wide',file:'exec-3a433f60-7ddd-4938-945b-15f45077a2d6.png',widths:[960,1440,1672]},
 {name:'facility-mobile',file:'exec-9c06d021-3a35-44d2-89eb-e2ae063b65ea.png',widths:[640,960,1448]}
];
const report=[];
for(const a of assets){
 const source=path.join(generated,a.file);await copyFile(source,path.join(archive,a.name+'.png'));
 const meta=await sharp(source).metadata();
 for(const width of a.widths){const target=path.join(publicDir,`${a.name}-${width}.webp`);await sharp(source).resize({width,withoutEnlargement:true}).webp({quality:88,effort:6}).toFile(target);}
 report.push({name:a.name,original:path.relative(root,path.join(archive,a.name+'.png')),width:meta.width,height:meta.height,webpWidths:a.widths,processing:'Resize and WebP compression only; composition from built-in ImageGen'});
}
await writeFile(path.join(root,'docs/home-revision-20261019/GENERATED-ASSETS.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
