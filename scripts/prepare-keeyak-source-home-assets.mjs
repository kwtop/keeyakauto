// Public KEEYAK photos selected after inspecting the live source and original pixels.
// Resize/encode only: do not retouch documentary people, logos, products or backgrounds.
import sharp from 'sharp';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';

const root=path.resolve(process.cwd(),'..');
const source=path.join(root,'checkpoints/keeyak-source-home-20261019/source-candidates');
const target=path.join(root,'workspace/public/images/keeyak-home-source-20261019');
const docs=path.join(root,'docs/keeyak-source-home-20261019');
await Promise.all([mkdir(target,{recursive:true}),mkdir(docs,{recursive:true})]);
const assets=[
 {file:'office-visitor-group',sourcePage:'https://www.keeyak.com/',sourceImage:'https://www.keeyak.com/generated/images/d824b43fd2b8487c6aed-1920.webp',sourceAlt:'KEEYAK team and visitors taking a group photo at the KEEYAK office',use:'Homepage company records; office visitor meeting',maxWidth:1600,date:'Not specified by the source; no year is added to the page',crop:'4:3, complete group and KEEYAK wall logo, identical desktop/mobile composition'},
 {file:'vietnam-category-discussion-2026',sourcePage:'https://www.keeyak.com/news/news/vietnam-exhibition-booth-specialty-vehicle-selection/',sourceImage:'https://www.keeyak.com/generated/images/54112f1974593c72ac9a-1125.webp',sourceAlt:'Matching the vehicle category to the job',use:'Homepage company records; special-vehicle exhibition consultation',maxWidth:1125,date:'May 2026, verified in the source article',crop:'Source 3:4; CSS 4:3 with object-position 50% 45%. Keep all three faces, the catalogue and discussion visible. Not a passenger-car order record.'}
];
const manifest={checkedOn:'2026-10-19',scope:'Homepage only; local, not deployed',editing:'No ImageGen used on documentary photos. Original source files retained; responsive resize/encoding and CSS cropping only, without scene or content edits.',assets:[],rejected:[
 {file:'team-chongqing-2025.webp',reason:'Team trip is genuine, but the office visitor photo has clearer brand context and larger faces.'},
 {file:'vietnam-record-2026.webp',reason:'Posed overview puts more weight on booth signage; the consultation image better shows a real conversation.'},
 {file:'workspace/public/images/company/export-loading.webp',reason:'Special trucks and a low loader do not illustrate passenger-car shipping; not used in the passenger-car export module.'}
]};
for(const asset of assets){
 const input=path.join(source,asset.file+'.webp');
 const meta=await sharp(input).metadata();
 const outputs=[];
 for(const width of [...new Set([asset.maxWidth,960,640])]){
  const filename=asset.file+(width===asset.maxWidth?'':`-${width}`)+'.webp';
  const out=path.join(target,filename);
  await sharp(input).rotate().resize({width,withoutEnlargement:true}).webp({quality:88}).toFile(out);
  const bytes=await readFile(out),m=await sharp(out).metadata();
  outputs.push({path:'/images/keeyak-home-source-20261019/'+filename,width:m.width,height:m.height,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
 }
 manifest.assets.push({...asset,sourceFile:path.relative(root,input).replaceAll('\\','/'),sourceSize:{width:meta.width,height:meta.height},sourceSha256:createHash('sha256').update(await readFile(input)).digest('hex'),outputs});
}
await writeFile(path.join(docs,'IMAGE-INVENTORY.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify(manifest.assets.map(a=>({file:a.file,sourceSize:a.sourceSize,outputs:a.outputs.map(o=>({path:o.path,width:o.width,height:o.height,bytes:o.bytes}))})),null,2));
