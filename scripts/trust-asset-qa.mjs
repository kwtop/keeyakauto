import {readFile,mkdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import sharp from 'sharp';

const root=resolve(import.meta.dirname,'..');
const task=join(root,'docs/trust-implementation-20261021');
const output=join(task,'qa');
const {assets}=JSON.parse(await readFile(join(task,'imagegen-manifest.json'),'utf8'));
await mkdir(output,{recursive:true});
const scenes=Object.entries(assets).filter(([,asset])=>!asset.original);
const photos=Object.entries(assets).filter(([,asset])=>asset.original);
const label=(text,width)=>Buffer.from(`<svg width="${width}" height="32"><rect width="100%" height="100%" fill="white"/><text x="12" y="22" fill="#222" font-family="Arial" font-size="17">${text}</text></svg>`);
for(let offset=0;offset<scenes.length;offset+=4){
 const tiles=[];
 for(const [index,[key,asset]] of scenes.slice(offset,offset+4).entries()){
  const left=index%2*720,top=Math.floor(index/2)*512;
  tiles.push({input:await sharp(asset.generated).resize(720,480,{fit:'contain',background:'#fff'}).png().toBuffer(),left,top:top+32},{input:label(key,720),left,top});
 }
 await sharp({create:{width:1440,height:1024,channels:3,background:'#fff'}}).composite(tiles).png().toFile(join(output,`scenes-${offset/4+1}.png`));
}
for(let offset=0;offset<photos.length;offset+=3){
 const tiles=[];
 for(const [index,[key,asset]] of photos.slice(offset,offset+3).entries()){
  const top=index*452;
  for(const [column,path] of [join(root,'public',asset.original),asset.generated].entries()){
   const left=column*720;
   tiles.push({input:await sharp(path).resize(720,420,{fit:'contain',background:'#fff'}).png().toBuffer(),left,top:top+32},{input:label(`${key} - ${column?'imagegen refinement':'original'}`,720),left,top});
  }
 }
 await sharp({create:{width:1440,height:1356,channels:3,background:'#fff'}}).composite(tiles).png().toFile(join(output,`photo-comparison-${offset/3+1}.png`));
}
console.log('Prepared two scene sheets and three original/refined comparison sheets.');
