import fs from 'node:fs';
const manifest=JSON.parse(fs.readFileSync('../checkpoints/nest-site-20261019/catalog-review/MANIFEST.json','utf8'));
const selected=manifest.filter(p=>process.argv.slice(2).includes(p.url));
console.log(JSON.stringify(selected.flatMap(p=>(p.panels||[]).map(panel=>({url:p.url,...panel})))));
