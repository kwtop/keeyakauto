import {mkdir,copyFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const project=process.cwd();
const root=path.resolve(project,'..');
const generated='C:/Users/Administrator/.codex/generated_images/01a13833-da6f-7712-95d1-525883e33855';
const archive=path.join(root,'checkpoints/nest-home-20261018/imagegen-originals');
const output=path.join(project,'public/images/nest-home-20261018');
const docs=path.join(root,'docs/nest-home-20261018');
await Promise.all([mkdir(archive,{recursive:true}),mkdir(output,{recursive:true}),mkdir(docs,{recursive:true})]);
const assets=[
 {name:'camry-courtyard',file:'exec-c3819fd6-b2c8-498b-a239-ba3b4a540987.png',treatment:'ImageGen background edit',reference:'/images/catalog/toyota/camry/toyota-camry-front-three-quarter-left.webp',module:'Homepage hero',constraints:'Model reference in an illustrative setting. Catalog original remains untouched. Preserve vehicle shape, components, badges and plate; no documentary claim.'},
 {name:'rav4-courtyard',file:'exec-17444907-4771-4dab-8c43-132147f4e677.png',treatment:'ImageGen background edit',reference:'/images/catalog/toyota/rav4/toyota-rav4-front-three-quarter-01.webp',module:'New-car category',constraints:'Model reference in an illustrative setting. Original product mapping unchanged. Preserve structural features; no stock claim.'},
 {name:'purchasing-desk',file:'exec-68b63159-e4bb-44f0-9313-801f3f37f55d.png',treatment:'ImageGen new conceptual still life',reference:null,module:'Export-services category',constraints:'Blank documents and unbranded key. No certificate, customer, signature or real-order claim.'},
 {name:'transport-editorial',file:'exec-14fcb8e3-193f-4825-861e-9e1d9fd573e8.png',treatment:'ImageGen recompose and lighting edit of existing illustration',reference:'/images/home-a1-preview-20261018/transport.webp',module:'Transport feature',constraints:'Illustration only. Does not document an actual shipment, carrier, customer or facility.'},
 {name:'transport-mobile',file:'exec-c79276a7-b9fc-4382-89fc-d5cda12f83b0.png',treatment:'ImageGen portrait recompose',reference:'/images/nest-home-20261018/transport-editorial.webp',module:'Mobile transport feature',constraints:'Separately composed 9:16 illustration; preserve whole loading ramp instead of a narrow landscape crop. No actual shipment claim.'},
 {name:'cabin-detail',file:'exec-9213147b-674d-44e1-a859-934d3be4c3dc.png',treatment:'ImageGen new conceptual cabin detail',reference:null,module:'Specification-checking guide',constraints:'Generic unbranded cabin. Explicitly illustrative; not a depiction or promise of a specific vehicle or trim.'}
];
const inventory=[];
for(const asset of assets){
 const source=path.join(generated,asset.file);
 await copyFile(source,path.join(archive,asset.name+'.png'));
 const inputMeta=await sharp(source).metadata();
 const target=path.join(output,asset.name+'.webp');
 await sharp(source).resize({width:1536,withoutEnlargement:true}).webp({quality:90,effort:5}).toFile(target);
 await sharp(source).resize({width:960,withoutEnlargement:true}).webp({quality:88,effort:5}).toFile(path.join(output,asset.name+'-960.webp'));
 const meta=await sharp(target).metadata();
 inventory.push({...asset,tool:'built-in image_gen',originalDimensions:{width:inputMeta.width,height:inputMeta.height},publicPath:'/images/nest-home-20261018/'+asset.name+'.webp',width:meta.width,height:meta.height,sha256:createHash('sha256').update(readFileSync(target)).digest('hex'),optimization:'Format conversion and responsive resizing only; no content retouching outside ImageGen.'});
}
await writeFile(path.join(docs,'IMAGE-INVENTORY.json'),JSON.stringify(inventory,null,2)+'\n');
console.log(JSON.stringify(inventory.map(({name,width,height,publicPath})=>({name,width,height,publicPath})),null,2));
