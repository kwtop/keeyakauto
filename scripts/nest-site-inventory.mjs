import {readdir,readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(process.cwd(),'..'),dist=path.join(root,'workspace/dist');
const out=path.join(root,'docs/nest-site-20261019');await mkdir(out,{recursive:true});
async function walk(dir){return(await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat();}
const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const pages=[];
for(const file of (await walk(dist)).filter(f=>f.endsWith('.html'))){
 const relative=path.relative(dist,file).replaceAll('\\','/');
 const url=relative==='index.html'?'/':relative==='404.html'?'/404.html':'/'+relative.replace(/index\.html$/,'');
 const html=await readFile(file,'utf8');
 const experimental=/^\/design(?:-preview)?\//.test(url);
 const refresh=html.match(/<meta\b(?=[^>]*http-equiv=["']refresh["'])[^>]*content=["']([^"']+)/i)?.[1]||'';
 const redirect=refresh.match(/url\s*=\s*(.*)/i)?.[1]?.replaceAll('&amp;','&')||'';
 let type='other';
 if(experimental)type='design-archive';else if(redirect)type='legacy-redirect';else if(url==='/')type='home';else if(url==='/404.html')type='not-found';
 else if(/^\/(new|used)-cars\/(?:page\/\d+\/)?$/.test(url))type='catalog';else if(/^\/(new|used)-cars\/brands\/$/.test(url))type='brand-index';
 else if(/^\/(new|used)-cars\/[^/]+\/[^/]+\/$/.test(url))type='vehicle-detail';else if(/^\/(new|used)-cars\/[^/]+\/$/.test(url))type='brand-family';
 else if(url.startsWith('/export-services/'))type=url.includes('/faq/')?'faq':url==='/export-services/'?'export-overview':'export-guide';
 else if(url.startsWith('/guides/'))type=url==='/guides/'?'guide-index':'procurement-resource';
 else if(url.startsWith('/about/news/'))type=url==='/about/news/'?'news-index':'company-record';
 else if(url.startsWith('/about/'))type='company';else if(url==='/contact/')type='contact';else if(url==='/quote/')type='inquiry';else if(url==='/quote/thank-you/')type='inquiry-result';else if(['/privacy/','/terms/'].includes(url))type='policy';
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]||'';
 pages.push({url,file:relative,type,scope:experimental?'preserve-archive':redirect?'preserve-redirect':'redesign',redirectTo:redirect||null,title:strip(html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]||''),h1:[...main.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m=>strip(m[1])),description:html.match(/<meta\b(?=[^>]*name=["']description["'])[^>]*content=["']([^"']*)/i)?.[1]||'',robots:html.match(/<meta\b(?=[^>]*name=["']robots["'])[^>]*content=["']([^"']*)/i)?.[1]||'',images:[...new Set([...main.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(m=>m[1]))],coreModules:(main.match(/data-core-module(?:="[^"]*")?/g)||[]).length,headings:[...main.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/g)].map(m=>({level:Number(m[1]),text:strip(m[2])})),links:[...new Set([...main.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')))],content:strip(main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,''))});
}
pages.sort((a,b)=>a.url.localeCompare(b.url));
const counts=Object.fromEntries([...new Set(pages.map(p=>p.type))].map(t=>[t,pages.filter(p=>p.type===t).length]));
await writeFile(path.join(out,'URL-INVENTORY-BEFORE.json'),JSON.stringify({generatedOn:'2026-10-19',origin:'http://127.0.0.1:4322',counts,total:pages.length,pages},null,2)+'\n');
console.log(JSON.stringify({total:pages.length,counts,redesign:pages.filter(p=>p.scope==='redesign').length},null,2));
