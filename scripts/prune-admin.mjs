import {spawnSync} from 'node:child_process';
// Customer inquiries and notes are deliberately not deleted by this maintenance job.
const sql=`DELETE FROM events WHERE created_at < ${Date.now()-180*86400000}; DELETE FROM rate_limits WHERE expires_at < ${Date.now()}; DELETE FROM admin_sessions WHERE expires_at < ${Date.now()}; DELETE FROM admin_audit WHERE created_at < ${Date.now()-365*86400000};`;
const result=spawnSync(process.execPath,['node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--command',sql],{cwd:new URL('..',import.meta.url),stdio:'inherit'});
process.exitCode=result.status||0;
