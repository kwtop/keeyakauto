import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

// Delivery copies only: source pixels, people, documents and product details stay intact.
const root = process.cwd();
const candidates = JSON.parse(await fs.readFile(path.join(root, 'docs/content-plan-20261013/visual-shortlist.json'), 'utf8'));
const selected = {
  P01:'annual-gathering-2026', P05:'alicia-june', P06:'frank-pan', P07:'isa', P08:'mia-fu',
  E01:'algeria-2026-01', E03:'algeria-2026-02',
  E10:'indonesia-2024-01', E11:'indonesia-2024-02', E12:'indonesia-2024-03',
  E19:'vietnam-2026-01', E20:'vietnam-2026-02', E21:'vietnam-2026-03',
  C02:'peru-exhibition-2024', C03:'inapa-2024', C04:'ashgabat-2024', C05:'uztech-2023',
  C06:'alibaba-fy26-recognition', C07:'astana-2023', C08:'supplier-certificate-2026'
};
const records = [];
await fs.mkdir(path.join(root, 'public/images/company/records'), {recursive:true});
await fs.mkdir(path.join(root, 'public/images/content'), {recursive:true});
for (const [id,name] of Object.entries(selected)) {
  const candidate = candidates.find(item => item.id === id);
  if (!candidate) throw new Error(`Missing source ${id}`);
  const input = await fs.readFile(candidate.path);
  const output = `/images/company/records/${name}.webp`;
  const info = await sharp(input).rotate().resize({width:id.startsWith('C')?1100:1800,withoutEnlargement:true}).webp({quality:88}).toFile(path.join(root, 'public', output));
  let original;
  if (id.startsWith('C')) {
    original = `/images/company/records/${name}-original${path.extname(candidate.path).toLowerCase()}`;
    await fs.copyFile(candidate.path,path.join(root,'public',original));
  }
  records.push({id,source:candidate.path,sourceSha256:crypto.createHash('sha256').update(input).digest('hex'),src:output,original,width:info.width,height:info.height,treatment:'original',note:'EXIF orientation and web encoding only; no generative retouching.'});
}
for (const [name,file,treatment] of [
  ['sourcing-model','model-reference-background-refined.png','background-reconstructed'],
  ['inspection-concept','inspection-concept.png','generated-concept'],
  ['shipping-concept','shipping-concept.png','generated-concept']
]) {
  const source = `docs/content-blueprint-20261013/images/${file}`;
  const output = `/images/content/${name}.webp`;
  const input = await fs.readFile(path.join(root,source));
  const info = await sharp(input).webp({quality:88}).toFile(path.join(root,'public',output));
  records.push({id:name,source,src:output,width:info.width,height:info.height,treatment,sourceSha256:crypto.createHash('sha256').update(input).digest('hex'),note:'Imagegen source and prompt retained in docs/content-blueprint-20261013/imagegen-prompts.json.'});
}
await fs.writeFile(path.join(root,'src/data/site-media.json'),JSON.stringify(records,null,2)+'\n');
console.log(`${records.length} image delivery copies prepared; original records preserved.`);
