// Measure the preserved white-background source, then verify its footprint against
// the scene in the rendered contact sheet. This changes presentation, not pixels.
import {readFile,writeFile} from 'node:fs/promises';
import {build} from 'esbuild';
import sharp from 'sharp';
const bundle=await build({stdin:{contents:"import {vehicles} from './src/data/catalog'; import {modelScene} from './src/data/modelVisuals'; export const rows=vehicles.filter(v=>v.kind==='new').map(v=>({key:v.brandSlug+'/'+v.slug,scene:modelScene(v)}));",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node'});
const {rows}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
if(rows.length!==63||rows.some(r=>!r.scene))throw new Error('All 63 models need a scene.');
const originals=JSON.parse(await readFile('src/data/vehicleCardFraming.json','utf8'));
const frames={};
for(const row of rows){
 const source=row.scene.original;
 let frame=originals[source];
 if(!frame){
  const {data,info}=await sharp('public'+source).removeAlpha().toColourspace('srgb').raw().toBuffer({resolveWithObject:true});
  const {width,height,channels}=info, darkRows=new Uint32Array(height);
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){const i=(y*width+x)*channels;if(Math.min(data[i],data[i+1],data[i+2])<110)darkRows[y]++;}
  let bottom=height;while(bottom>0&&darkRows[bottom-1]<=Math.max(3,width*.003))bottom--;
  const columns=new Uint32Array(width),lines=new Uint32Array(bottom);
  for(let y=0;y<bottom;y++)for(let x=0;x<width;x++){const i=(y*width+x)*channels;if(Math.min(data[i],data[i+1],data[i+2])<225){columns[x]++;lines[y]++;}}
  let left=0,right=width,top=0;
  while(left<width&&columns[left]<=Math.max(3,height*.005))left++;
  while(right>left&&columns[right-1]<=Math.max(3,height*.005))right--;
  while(top<bottom&&lines[top]<=Math.max(3,width*.003))top++;
  if(left<4||top<4||right>width-4||bottom>height-4)throw new Error('Inspect source bounds '+row.key);
  frame={width,height,bounds:[left,top,right,bottom]};
 }
 frames[row.scene.src]={...frame,model:row.key,source,calibration:'source footprint; visually verified against generated scene'};
}
await writeFile('src/data/catalogSceneFraming.json',JSON.stringify(frames,null,2)+'\n');
console.log('Prepared '+Object.keys(frames).length+' scene frame references.');
