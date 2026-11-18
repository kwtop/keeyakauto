import sharp from 'sharp';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(process.argv[2]||'../checkpoints/nest-site-20261019/company-review');
const data=JSON.parse(await readFile(path.join(root,'QA.json'),'utf8'));
const folder=path.join(root,'readable');await mkdir(folder,{recursive:true});
const records=[];
for(const item of data.results){
 const name=path.basename(item.screenshot,'.png');
 const meta=await sharp(item.screenshot).metadata();
 if(item.width===390){
  for(let start=0,number=1;start<meta.height;start+=5600,number++){
   const cols=Math.min(4,Math.ceil((meta.height-start)/1400));
   const inputs=[];
   for(let i=0;i<cols;i++){
    const top=start+i*1400,height=Math.min(1400,meta.height-top);
    const input=await sharp(item.screenshot).extract({left:0,top,width:390,height}).png().toBuffer();
    inputs.push({input,left:i*406,top:26});
   }
   const filename=name+'-sheet-'+number+'.png';
   await sharp({create:{width:cols*406-16,height:1426,channels:3,background:'#fff'}}).composite(inputs).png().toFile(path.join(folder,filename));
   records.push({route:item.route,width:390,file:filename,sourceY:start,panelHeight:1400,readingOrder:'Left to right; original screenshot slices without UI mutation'});
  }
 }else{
  const top=Math.min(900,Math.max(0,meta.height-1200));
  const filename=name+'-body.png';
  await sharp(item.screenshot).extract({left:0,top,width:meta.width,height:Math.min(1200,meta.height-top)}).png().toFile(path.join(folder,filename));
  records.push({route:item.route,width:item.width,file:filename,sourceY:top});
 }
}
await writeFile(path.join(folder,'SHEETS.json'),JSON.stringify(records,null,2)+'\n');
console.log(JSON.stringify({sheets:records.length,folder},null,2));
