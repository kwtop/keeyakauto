import {readFile,writeFile,mkdir,copyFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';

// Mechanical image delivery only: preserve generated originals, resize proportionally,
// encode WebP and update the existing image maps. Background edits use ImageGen.
const root=process.cwd();
const records=path.resolve(root,'../docs/scene-diversity-20261020');
const publicDir=path.join(root,'public/images/scene-diversity-20261020');
const publicBase='/images/scene-diversity-20261020/';
const readJson=async file=>JSON.parse(await readFile(file,'utf8'));
const writeJson=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+'\n');
const manifest=await readJson(path.join(records,'GENERATIONS.json'));
const slugs=[
 'toyota-camry-business-district','toyota-rav4-residential-street','byd-yuan-plus-charging-forecourt',
 'volkswagen-id3-terracotta-museum','jetour-traveler-grassland-track','aion-ut-neighbourhood',
 'changan-qiyuan-a06-civic-plaza','changan-uni-v-urban-underpass','deepal-g318-pine-forest',
 'fangchengbao-bao5-sandstone-trail','gac-trumpchi-gs3-retail-courtyard','geely-boyue-apartment-courtyard',
 'livan-lanqiqiu-city-evening','mg-mg4-urban-parking','toyota-corolla-neighbourhood-street',
 'used-audi-q5l-hotel-entrance','used-audi-sq5-paddock','used-bmw-x4m-city-tunnel',
 'used-bmw-x5-vineyard-lane','used-lexus-rz-cultural-plaza','used-mercedes-s450l-city-hotel',
 'used-toyota-vellfire-airport','wuling-bingo-colourful-quarter',
 'home-camry-business-district','home-rav4-residential-street','home-yuan-plus-charging-forecourt',
 'home-audi-q5l-hotel','home-bmw-x5-vineyard','home-vellfire-airport',
 'export-port-staging-apron','export-carrier-ramp','purchasing-meeting-room','quotation-urban-workspace',
 'volkswagen-id3-museum-banner-desktop-v2','volkswagen-id3-museum-banner-mobile-v2'
];
if(manifest.jobs.length!==slugs.length)throw new Error('Unexpected generation count');
await mkdir(publicDir,{recursive:true});
await mkdir(path.join(records,'generated'),{recursive:true});
const sourceHashes={};
for(const [i,job] of manifest.jobs.entries()){
 if(!job.raw||!job.reviewed)throw new Error('Unreviewed image: '+job.id);
 const hash=createHash('sha256').update(await readFile(job.input)).digest('hex');
 sourceHashes[job.input]=hash;
 const name=slugs[i];
 const preserved=path.join(records,'generated',name+'.png');
 await copyFile(job.raw,preserved);
 const meta=await sharp(preserved).metadata();
 if(!meta.width||!meta.height)throw new Error('Invalid image '+job.id);
 const widths=[...new Set([480,800,1200,meta.width].filter(w=>w<=meta.width))].sort((a,b)=>a-b);
 const assets=[];
 for(const width of widths){
  const file=name+(width===meta.width?'':'-'+width)+'.webp';
  const output=path.join(publicDir,file);
  await sharp(preserved).resize({width,withoutEnlargement:true}).webp({quality:87,effort:5}).toFile(output);
  const dimensions=await sharp(output).metadata();
  assets.push({src:publicBase+file,width:dimensions.width,height:dimensions.height,bytes:(await stat(output)).size});
 }
 const full=assets.at(-1);
 job.adopted={...full,srcSet:assets.map(a=>`${a.src} ${a.width}w`).join(', '),small:assets.find(a=>a.width===800)?.src??full.src,widths};
 job.outputs=assets;
 job.preservedOriginal=preserved.replaceAll('\\','/');
 job.adoption=job.kind==='banner'?'reviewed draft; not a new page layout':'applied to the existing website image mapping';
}

const modelPath=path.join(root,'src/data/modelScenes.json');
const expandedModelPath=path.join(root,'src/data/siteModelScenes.json');
const sizesPath=path.join(root,'src/data/siteImagerySizes.json');
const correctedPath=path.join(root,'src/data/brandCorrectedImageSizes.json');
const models=await readJson(modelPath),expanded=await readJson(expandedModelPath);
const sizes=await readJson(sizesPath),corrected=await readJson(correctedPath);
const home={};
for(const job of manifest.jobs){
 const {src,srcSet,width,height,widths,small}=job.adopted;
 const dimensions={src,width,height,widths,srcSet,small};
 if(job.kind==='model'){
  const map=models[job.key]?models:expanded;
  const old=map[job.key];
  if(!old)throw new Error('Unknown model key: '+job.key);
  const label=old.alt.replace(/\s+(?:source model in|in an AI-edited).*$/,'');
  map[job.key]={...old,src,srcSet,alt:`${label} in ${job.setting.split(';')[0]} — AI-edited illustration`};
  const sizeKey=job.key.replaceAll('/','-');
  if(sizes[sizeKey])sizes[sizeKey]=dimensions;
 }
 if(job.kind==='shared')corrected[job.key]=dimensions;
 if(job.kind==='home')home[job.art]=dimensions;
}
await writeJson(modelPath,models);
await writeJson(expandedModelPath,expanded);
await writeJson(sizesPath,sizes);
await writeJson(correctedPath,corrected);
await writeJson(path.join(root,'src/data/sceneDiversityHome.json'),home);
manifest.sourceHashes=sourceHashes;
manifest.delivery={date:'2026-10-20',format:'WebP',quality:87,resize:'proportional; no crop or enlargement',originals:'preserved separately',deployed:false};
await writeJson(path.join(records,'GENERATIONS.json'),manifest);
console.log(JSON.stringify({reviewed:manifest.jobs.length,adopted:manifest.jobs.filter(j=>j.kind!=='banner').length,bannerDrafts:2,responsiveFiles:manifest.jobs.reduce((n,j)=>n+j.outputs.length,0),totalBytes:manifest.jobs.flatMap(j=>j.outputs).reduce((n,j)=>n+j.bytes,0)}));
