import {build} from 'esbuild';
import {mkdtemp,rm,rmdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
const folder=await mkdtemp(join(tmpdir(),'keeyak-admin-unit-')),file=join(folder,'admin.test.mjs');
try{await build({entryPoints:['tests/admin.test.mjs'],outfile:file,bundle:true,platform:'node',format:'esm',target:'node22'});const result=spawnSync(process.execPath,['--test',file],{stdio:'inherit'});process.exitCode=result.status??1;}finally{await rm(file,{force:true});await rmdir(folder);}
