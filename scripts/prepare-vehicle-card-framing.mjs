// Read the exact images used in the built new-car catalog; never edit image files.
// Run after building: node scripts/prepare-vehicle-card-framing.mjs
import {readFile,readdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,sep} from 'node:path';
import sharp from 'sharp';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const publicRoot=resolve(root,'public');
const pages=[resolve(root,'dist/new-cars/index.html')];
for(const entry of await readdir(resolve(root,'dist/new-cars/page'),{withFileTypes:true})){
 if(entry.isDirectory())pages.push(resolve(root,'dist/new-cars/page',entry.name,'index.html'));
}
const allSources=new Set(),sources=new Set();
for(const page of pages){
 const html=await readFile(page,'utf8');
 for(const match of html.matchAll(/<article\b[^>]*class="vehicle-card"[^>]*data-kind="new"[^>]*>([\s\S]*?)<\/article>/g)){
  const source=match[1].match(/<img\b[^>]*\bsrc="([^"]+)"/)?.[1];
  if(source){allSources.add(source);if(!match[1].includes('vehicle-media--editorial'))sources.add(source);}
 }
}
const expected=JSON.parse(await readFile(resolve(root,'src/data/vehicle-public-data.json'),'utf8')).records.length;
if(allSources.size!==expected)throw new Error(`Expected ${expected} catalog cover images, found ${allSources.size}. Build the catalog first.`);
// Scenes keep their full composition; white source photos alone need body-bound framing.
const frames=JSON.parse(await readFile(resolve(root,'src/data/vehicleCardFraming.json'),'utf8'));
for(const source of sources){
 if(!source.startsWith('/images/'))throw new Error(`Unexpected image URL: ${source}`);
 const path=resolve(publicRoot,source.slice(1));
 if(!path.startsWith(publicRoot+sep))throw new Error(`Image outside public: ${source}`);
 const {data,info}=await sharp(path).removeAlpha().toColourspace('srgb').raw().toBuffer({resolveWithObject:true});
 const {width,height,channels}=info;
 // Dark tyre pixels establish ground contact, avoiding the soft floor shadow.
 const darkRows=new Uint32Array(height);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const i=(y*width+x)*channels;
  if(Math.min(data[i],data[i+1],data[i+2])<110)darkRows[y]++;
 }
 let bottom=height;
 while(bottom>0&&darkRows[bottom-1]<=Math.max(3,width*.003))bottom--;
 const columns=new Uint32Array(width),rows=new Uint32Array(bottom);
 for(let y=0;y<bottom;y++)for(let x=0;x<width;x++){
  const i=(y*width+x)*channels;
  if(Math.min(data[i],data[i+1],data[i+2])<225){columns[x]++;rows[y]++;}
 }
 let left=0,right=width,top=0;
 while(left<width&&columns[left]<=Math.max(3,height*.005))left++;
 while(right>left&&columns[right-1]<=Math.max(3,height*.005))right--;
 while(top<bottom&&rows[top]<=Math.max(3,width*.003))top++;
 const bodyWidth=(right-left)/width,bodyHeight=(bottom-top)/height;
 if(left<5||top<5||right>width-5||bottom>height-5||bodyWidth<.5||bodyWidth>.98||bodyHeight<.15||bodyHeight>.85){
  throw new Error(`Review the vehicle bounds before applying: ${source}`);
 }
 frames[source]={width,height,bounds:[left,top,right,bottom]};
}
await writeFile(resolve(root,'src/data/vehicleCardFraming.json'),JSON.stringify(frames,null,2)+'\n');
console.log(`Prepared ${sources.size} source-matched white-photo frames; ${allSources.size-sources.size} editorial scenes retain their composition. Original photographs unchanged.`);
