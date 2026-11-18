import {build} from 'esbuild';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
const folder=await mkdtemp(join(tmpdir(),'keeyak-seo-test-'));
try{
 const file=join(folder,'seo.test.mjs');await build({entryPoints:['tests/seo-geo.test.mjs'],outfile:file,bundle:true,platform:'node',format:'esm',target:'node22'});
 const result=spawnSync(process.execPath,['--test',file],{stdio:'inherit'});process.exitCode=result.status??1;
 const client=await build({entryPoints:['src/components/VehicleExplorer.tsx'],bundle:true,platform:'browser',format:'esm',write:false,metafile:true,loader:{'.css':'empty'}});
 const forbidden=Object.keys(client.metafile.inputs).filter(path=>/vehicle-(?:public|detail)-data\.json|used-vehicle-data\.json|\/catalog\.ts$/.test(path));
 if(forbidden.length)throw Error('Catalog data leaked into browser bundle: '+forbidden.join(', '));
 console.log('PASS browser dependency graph excludes full catalog and vehicle source records');
}finally{const actual=resolve(folder);if(actual.startsWith(resolve(tmpdir(),'keeyak-seo-test-')))await rm(actual,{recursive:true,force:true});}
