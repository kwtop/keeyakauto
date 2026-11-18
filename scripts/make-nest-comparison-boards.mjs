// Actual before/after screenshot excerpts; no page content is reconstructed.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root=path.resolve(process.cwd(),'..'),docs=path.join(root,'docs/nest-site-20261019');
const before=JSON.parse(await readFile(path.join(docs,'BEFORE-CAPTURE.json'),'utf8'));
const after=JSON.parse(await readFile(path.join(docs,'FINAL-CAPTURE.json'),'utf8'));
const folder=path.join(root,'checkpoints/nest-site-20261019/delivery');await mkdir(folder,{recursive:true});
const urls=['/','/new-cars/','/new-cars/aion/','/new-cars/changan/','/new-cars/brands/','/new-cars/toyota/camry/','/used-cars/mercedes-benz/s-450l/','/export-services/','/export-services/buying-guide/','/export-services/faq/','/guides/comparisons/','/about/','/about/news/','/about/news/vietnam-exhibition-2026/','/contact/','/quote/','/terms/'];
const records=[];
for(const url of urls)for(const width of [1440,390]){
 const a=before.pages.find(p=>p.url===url)?.viewports.find(v=>v.viewport.width===width),b=after.pages.find(p=>p.url===url)?.viewports.find(v=>v.viewport.width===width);if(!a||!b)throw Error('Missing actual capture '+url+' '+width);
 const displayWidth=width===1440?720:390,cropHeight=width===1440?1800:2100,padding=24,gap=24,top=80;
 const composites=[],heights=[];
 for(const [i,v]of[a,b].entries()){
  const file=path.join(root,v.screenshot),m=await sharp(file).metadata(),height=Math.min(m.height,cropHeight),scaledHeight=Math.round(height*displayWidth/m.width);
  const bytes=await sharp(file).extract({left:0,top:0,width:m.width,height}).resize({width:displayWidth}).png().toBuffer();
  composites.push({input:bytes,left:padding+i*(displayWidth+gap),top});heights.push(scaledHeight);
 }
 const totalWidth=padding*2+displayWidth*2+gap,totalHeight=top+Math.max(...heights)+padding;
 const title='<svg width="'+totalWidth+'" height="80"><g fill="#2b2b2b" font-family="Arial,sans-serif"><text x="24" y="26" font-size="17">'+url+' | actual viewport '+width+'px | first '+cropHeight+'px excerpt</text><text x="24" y="61" font-size="18">BEFORE</text><text x="'+(padding+displayWidth+gap)+'" y="61" font-size="18">AFTER</text></g></svg>';
 const slug=url==='/'?'home':url.replace(/^\//,'').replace(/\/$/,'').replaceAll('/','__');
 const file=path.join(folder,slug+'--'+width+'-comparison.png');
 await sharp({create:{width:totalWidth,height:totalHeight,channels:3,background:'#f4f4f2'}}).composite([{input:Buffer.from(title),left:0,top:0},...composites]).png({compressionLevel:8}).toFile(file);
 records.push({url,width,before:a.screenshot,after:b.screenshot,board:path.relative(root,file).replaceAll('\\','/'),cropHeight,displayWidth,kind:'Actual screenshot excerpt comparison; complete page retained at source links'});
}
await writeFile(path.join(docs,'COMPARISONS.json'),JSON.stringify({conditions:'Same viewport, DPR1, 100% browser zoom. Boards resize actual pixel screenshots for presentation; no page content is recreated.',oldFooterCaptureLimitation:'Some before full-page captures may not preload footer lazy icons. Do not interpret that as a missing site function.',records},null,2)+'\n');
console.log('Created '+records.length+' actual desktop/mobile before-after excerpt boards.');
