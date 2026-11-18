import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(process.cwd(),'..'),port=4350;
http.createServer(async(req,res)=>{
 try{
  const u=new URL(req.url,'http://127.0.0.1');let file,mime;
  if(u.pathname==='/'){file=path.join(root,'docs/home-revision-20261019/REVIEW.html');mime='text/html; charset=utf-8';}
  else{
   const match=u.pathname.match(/^\/image\/(before|after)\/(home-(?:new|used)--(?:1440|1024|768|390|320)(?:-first)?\.png)$/);
   if(!match){res.writeHead(404);res.end('Not found');return;}
   file=path.join(root,'checkpoints/home-revision-20261019',match[1],match[2]);mime='image/png';
  }
  const bytes=await readFile(file);res.writeHead(200,{'Content-Type':mime,'Cache-Control':'no-store'});res.end(bytes);
 }catch(error){res.writeHead(404);res.end('Capture not available');}
}).listen(port,'127.0.0.1',()=>console.log(`Homepage comparison: http://127.0.0.1:${port}/`));
