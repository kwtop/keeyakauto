import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('..');
const checkpoint=path.join(root,'checkpoints/nest-site-20261019');
const out=path.join(checkpoint,'company-delivery');await mkdir(out,{recursive:true});
const records=[];
for(const name of ['about','contact','quote']){
 for(const width of [1440,390]){
  const height=width===1440?900:844;
  const before=path.join(checkpoint,name==='about'?'company-before':`${name}-before`,`page-${width}x${height}.png`);
  const after=path.join(checkpoint,name==='about'?'company-final-company':name==='contact'?'company-final-updated':'company-round-02',`${name}-${width}.png`);
  const desired=width===1440?720:390;
  for(const mode of ['first','full']){
   const panels=[];let tallest=0;
   for(const [i,file] of [before,after].entries()){
    let img=sharp(file);if(mode==='first')img=img.extract({left:0,top:0,width,height});
    const {data,info}=await img.resize({width:desired}).png().toBuffer({resolveWithObject:true});
    tallest=Math.max(tallest,info.height);panels.push({input:data,left:i*(desired+20),top:42});
   }
   const label=Buffer.from(`<svg width="${desired*2+20}" height="42"><rect width="100%" height="100%" fill="white"/><text x="8" y="27" font-family="Arial" font-size="18" fill="#2b2b2b">Before · KEEYAK</text><text x="${desired+28}" y="27" font-family="Arial" font-size="18" fill="#2b2b2b">After · Nest system</text></svg>`);
   const file=path.join(out,`${name}-${mode}-before-after-${width}.png`);
   await sharp({create:{width:desired*2+20,height:tallest+42,channels:3,background:'#f1f1ef'}}).composite([{input:label,left:0,top:0},...panels]).png().toFile(file);
   records.push({name,viewport:{width,height},mode,before,after,file});
  }
 }
}
await writeFile(path.join(out,'COMPARISONS.json'),JSON.stringify(records,null,2));
console.log(out);
