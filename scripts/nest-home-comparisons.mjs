import sharp from 'sharp';
import path from 'node:path';
import {mkdir,writeFile} from 'node:fs/promises';
const root=path.resolve(process.cwd(),'..');
const task=path.join(root,'checkpoints/nest-home-20261018');
const output=path.join(task,'delivery');await mkdir(output,{recursive:true});
const sizes=[[1440,900],[1024,768],[768,1024],[390,844]];
const results=[];
for(const [width,height] of sizes){
 const before=path.join(task,'before-retry',`page-${width}x${height}.png`);
 const after=path.join(task,'final',`page-${width}x${height}.png`);
 const b=await sharp(before).metadata(),a=await sharp(after).metadata();
 if(b.width!==width||a.width!==width)throw new Error('Viewport/screenshot width mismatch');
 const gap=24,labelHeight=64,canvasWidth=width*2+gap;
 const labels=Buffer.from(`<svg width="${canvasWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f1f1ee"/><g font-family="Arial,sans-serif" font-size="${width<500?16:24}" fill="#2b2b2b"><text x="16" y="40">KEEYAK BEFORE · ${width} × ${height}</text><text x="${width+gap+16}" y="40">KEEYAK AFTER · ${width} × ${height}</text></g></svg>`);
 const firstBefore=await sharp(before).extract({left:0,top:0,width,height}).png().toBuffer();
 const firstAfter=await sharp(after).extract({left:0,top:0,width,height}).png().toBuffer();
 await sharp({create:{width:canvasWidth,height:height+labelHeight,channels:3,background:'#e2e2e2'}}).composite([{input:labels,left:0,top:0},{input:firstBefore,left:0,top:labelHeight},{input:firstAfter,left:width+gap,top:labelHeight}]).png().toFile(path.join(output,`first-before-after-${width}.png`));
 await sharp({create:{width:canvasWidth,height:Math.max(b.height,a.height)+labelHeight,channels:3,background:'#fff'}}).composite([{input:labels,left:0,top:0},{input:before,left:0,top:labelHeight},{input:after,left:width+gap,top:labelHeight}]).png().toFile(path.join(output,`full-before-after-${width}.png`));
 results.push({viewport:{width,height},dpr:1,scale:1,before:{file:before,width:b.width,height:b.height},after:{file:after,width:a.width,height:a.height},referenceSiteScreenshot:false});
}
// A real local iteration overlay, explicitly not a Nest comparison.
const localReference=path.join(task,'round-01/page-1024x768.png');
const candidate=path.join(task,'final/page-1024x768.png');
const {data:alpha,info}=await sharp(candidate).extract({left:0,top:0,width:1024,height:768}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
for(let index=3;index<alpha.length;index+=4)alpha[index]=Math.round(alpha[index]*.5);
await sharp(localReference).extract({left:0,top:0,width:1024,height:768}).composite([{input:alpha,raw:{width:info.width,height:info.height,channels:4},left:0,top:0}]).png().toFile(path.join(output,'local-round-01-vs-final-1024-overlay.png'));
await writeFile(path.join(output,'COMPARISON-METADATA.json'),JSON.stringify({referenceSiteAvailable:false,note:'KEEYAK before/after and local iteration overlay only. Nest access remains denied.',comparisons:results},null,2)+'\n');
console.log('Created four full-page and four first-screen before/after boards; one local-iteration overlay.');
