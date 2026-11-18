import {spawnSync,spawn} from 'node:child_process';
import {resolve} from 'node:path';
import {createServer} from 'node:net';
const root=resolve(import.meta.dirname,'..');
function run(args){const child=spawnSync(process.execPath,args,{cwd:root,stdio:'inherit'});if(child.status!==0)process.exit(child.status||1);}
try{await new Promise((resolve,reject)=>{const server=createServer();server.once('error',reject);server.listen(8789,'127.0.0.1',()=>server.close(resolve));});}catch{console.error('Port 8789 is already in use. Keep the existing server running or choose another dedicated port and update the Astro API proxy before starting.');process.exit(1);}
run(['scripts/setup-local-admin.mjs']);
if(!process.argv.includes('--no-build')){
  run(['--experimental-strip-types','scripts/prepare-public-vehicles.mjs']);
  run(['scripts/prepare-gallery-images.mjs']);
  run(['node_modules/astro/bin/astro.mjs','build']);
  run(['scripts/generate-sitemap.mjs']);
  run(['scripts/generate-agent-markdown.mjs']);
}
run(['node_modules/wrangler/bin/wrangler.js','d1','migrations','apply','DB','--local']);
const child=spawn(process.execPath,['node_modules/wrangler/bin/wrangler.js','pages','dev','dist','--ip','127.0.0.1','--port','8789'],{cwd:root,stdio:'inherit'});
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code||0));
