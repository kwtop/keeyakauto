// Preserve route/SEO/content contracts and verify local links in the built app.
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(process.cwd(),'..'),dist=path.join(root,'workspace/dist');
const docs=path.join(root,'docs/nest-site-20261019'),origin='http://127.0.0.1:4322';
const before=JSON.parse(await readFile(path.join(docs,'URL-INVENTORY-BEFORE.json'),'utf8'));
const result={origin,pages:[],links:[],anchors:[],errors:[],numericReview:[]};
const cache=new Map(),requests=new Map();
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#39;',"'").replaceAll('&quot;','"');
const strip=s=>s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
async function htmlFor(url){
 const pathname=new URL(url,origin).pathname;if(cache.has(pathname))return cache.get(pathname);
 const item=before.pages.find(p=>p.url===pathname);if(!item)return '';
 const html=await readFile(path.join(dist,item.file),'utf8');cache.set(pathname,html);return html;
}
const allLinks=new Map();
for(const previous of before.pages){
 const html=await htmlFor(previous.url),main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]||'';
 const title=strip(html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]||'');
 const description=html.match(/<meta\b(?=[^>]*name=["']description["'])[^>]*content=["']([^"']*)/i)?.[1]||'';
 const robots=html.match(/<meta\b(?=[^>]*name=["']robots["'])[^>]*content=["']([^"']*)/i)?.[1]||'';
 const checks={titlePreserved:title===previous.title,descriptionPreserved:description===previous.description,robotsPreserved:robots===previous.robots,formalTheme:previous.scope!=='redesign'||/<body[^>]*class="[^"]*\bsite-nest\b/.test(html),singleH1:previous.scope!=='redesign'||([...main.matchAll(/<h1\b/g)].length===1)};
 result.pages.push({url:previous.url,type:previous.type,scope:previous.scope,checks});
 for(const [key,passed]of Object.entries(checks))if(!passed)result.errors.push({url:previous.url,check:key});
 if(previous.scope==='redesign'){
  const oldNumbers=[...new Set(previous.content.match(/\b\d+(?:[.,]\d+)*(?:\s?(?:km|miles|mm|kWh|kW|kg|V|Ah|L|%))?\b/g)||[])];
  const text=strip(main),missing=oldNumbers.filter(n=>!text.includes(n));
  if(missing.length)result.numericReview.push({url:previous.url,missingFromPage:missing,requiresContextReview:true});
 }
 for(const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)){
  const href=decode(m[1]);if(!href.startsWith('/')&&!href.startsWith('#'))continue;if(href.startsWith('//'))continue;
  const url=new URL(href,origin+previous.url);if(url.origin!==origin)continue;
  const key=url.pathname+url.search+url.hash;
  if(!allLinks.has(key))allLinks.set(key,{href:key,sources:[]});allLinks.get(key).sources.push(previous.url);
 }
}
async function statusOf(url){const target=new URL(url,origin);target.hash='';const key=target.pathname+target.search;if(!requests.has(key))requests.set(key,fetch(target,{method:'HEAD'}).then(r=>r.status));return requests.get(key);}
const queue=[...allLinks.values()];
async function worker(){while(queue.length){const item=queue.shift();const target=new URL(item.href,origin);let status;try{status=await statusOf(item.href);}catch(e){status=0;result.errors.push({href:item.href,error:String(e)});}
 result.links.push({href:item.href,status,sourceCount:item.sources.length});
 if(status<200||status>=400)result.errors.push({href:item.href,status,sources:item.sources});
 if(target.hash){
  const html=await htmlFor(target.pathname);if(html){const id=decodeURIComponent(target.hash.slice(1));const found=[...html.matchAll(/\bid="([^"]+)"/g)].some(m=>decode(m[1])===id);
   result.anchors.push({href:item.href,found});if(!found)result.errors.push({href:item.href,check:'Missing built target id',sources:item.sources});
  }
 }
}}
await Promise.all(Array.from({length:6},worker));
result.links.sort((a,b)=>a.href.localeCompare(b.href));
await writeFile(path.join(docs,'CONTRACT-LINK-QA.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({pages:result.pages.length,links:result.links.length,anchors:result.anchors.length,errors:result.errors,numericReview:result.numericReview},null,2));
