// Local-only screenshot comparison. No business route or production deployment.
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(process.cwd(),'..');
const types={'.html':'text/html; charset=utf-8','.png':'image/png','.json':'application/json; charset=utf-8','.md':'text/markdown; charset=utf-8'};
http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);const requested=pathname==='/'?'/docs/nest-site-20261019/REVIEW.html':pathname;const target=path.resolve(root,'.'+requested);const relative=path.relative(root,target).replaceAll('\\','/');const allowed=relative.startsWith('docs/nest-site-20261019/')||/^checkpoints\/nest-site-20261019\/(before|after|final|delivery)\//.test(relative);const type=types[path.extname(target)];if(!allowed||relative.startsWith('..')||!type){res.writeHead(404).end('Not found');return}const data=await readFile(target);res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data)}catch{res.writeHead(404).end('Not found')}}).listen(4349,'127.0.0.1',()=>console.log('Local comparison: http://127.0.0.1:4349/'));
