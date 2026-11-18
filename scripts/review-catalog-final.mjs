import fs from 'node:fs';
const original = fs.readFileSync(new URL('./review-catalog-evidence.mjs', import.meta.url), 'utf8');
const source = original
  .replace('AFTER-CAPTURE.json', 'FINAL-CAPTURE.json')
  .replace("'checkpoints/nest-site-20261019/catalog-review'", "'checkpoints/nest-site-20261019/catalog-review-final'")
  .replace('const manifest=[];', 'const selectedUrls=process.argv.slice(2);const manifest=[];')
  .replace('for(const p of all){', 'for(const p of all){if(selectedUrls.length && !selectedUrls.includes(p.url))continue;');
const temporary = new URL('./.catalog-final-runtime.mjs', import.meta.url);
fs.writeFileSync(temporary, source);
try { await import(temporary.href + '?t=' + Date.now()); }
finally { fs.unlinkSync(temporary); }
