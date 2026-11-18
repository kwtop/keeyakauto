import {readdir, readFile, mkdir, stat, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {SITE_URL} from '../site.config.mjs';
import {escapeXml} from '../src/scripts/escape-xml.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const dist=path.join(root,'dist');
const origin=new URL(SITE_URL).origin;
const excludedRoots=new Set(['_qa','design','design-preview','admin','api']);
const excludedPages=new Set(['/404.html','/quote/thank-you/']);
const decode=value=>value.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(match=>[match[1].toLowerCase(),decode(match[2]??match[3]) ]));
const publicUrl=file=>'/'+file.replaceAll(path.sep,'/').replace(/index\.html$/,'');

async function htmlFiles(directory,prefix=''){
  const result=[];
  for(const entry of await readdir(directory,{withFileTypes:true})){
    const relative=path.join(prefix,entry.name);
    if(excludedRoots.has(relative.split(path.sep)[0]))continue;
    if(entry.isDirectory())result.push(...await htmlFiles(path.join(directory,entry.name),relative));
    else if(entry.name.endsWith('.html'))result.push(relative);
  }
  return result;
}

const files=await htmlFiles(dist);
const knownPaths=new Set(files.map(publicUrl));
const urls=new Set(),redirects=[],omitted=[];
const pageImages=new Map(),checkedImages=new Set();
for(const file of files.sort()){
  const pathname=publicUrl(file);
  if(excludedPages.has(pathname)){omitted.push({path:pathname,reason:'error-or-inquiry-status'});continue;}
  const html=await readFile(path.join(dist,file),'utf8');
  const head=html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1]??'';
  const meta=[...head.matchAll(/<meta\b[^>]*>/gi)].map(match=>attrs(match[0]));
  const refresh=meta.find(tag=>tag['http-equiv']?.toLowerCase()==='refresh')?.content;
  if(refresh){
    const target=refresh.match(/^\s*[\d.]+\s*;\s*url\s*=\s*(.+)$/i)?.[1];
    if(!target)throw new Error(`Invalid redirect: ${pathname}`);
    const destination=new URL(target,origin);
    if(destination.origin!==origin||!knownPaths.has(destination.pathname))throw new Error(`Invalid redirect destination: ${pathname}`);
    redirects.push({from:pathname,to:destination.pathname+destination.search+destination.hash,status:301});
    omitted.push({path:pathname,reason:'redirect'});
    continue;
  }
  const robotValues=meta.filter(tag=>['robots','googlebot','bingbot'].includes(tag.name?.toLowerCase())).map(tag=>tag.content??'');
  if(robotValues.some(value=>/\b(?:noindex|nofollow|none)\b/i.test(value)))throw new Error(`Indexing is blocked: ${pathname}`);
  const canonicals=[...head.matchAll(/<link\b[^>]*>/gi)].map(match=>attrs(match[0])).filter(tag=>tag.rel?.toLowerCase()==='canonical');
  if(canonicals.length!==1)throw new Error(`Expected one canonical: ${pathname}`);
  const canonical=new URL(canonicals[0].href);
  if(canonical.origin!==origin||canonical.search||canonical.hash)throw new Error(`Invalid canonical: ${pathname}`);
  if(canonical.pathname!==pathname){omitted.push({path:pathname,reason:'canonical-alias'});continue;}
  urls.add(canonical.href);
  for(const [tag] of html.matchAll(/<img\b[^>]*\bdata-sitemap-image=[^>]*>/gi)){
    const {src: imageSrc, 'data-sitemap-image': sitemapSrc}=attrs(tag);
    // A thumbnail can nominate the corresponding full-size delivery image.
    const src=sitemapSrc || imageSrc;
    if(!src)throw new Error(`Missing image sitemap source: ${pathname}`);
    const image=new URL(src,canonical);
    if(image.origin!==origin||!image.pathname.startsWith('/images/')||image.search||image.hash){
      throw new Error(`Invalid image sitemap source on ${pathname}: ${src}`);
    }
    if(!checkedImages.has(image.href)){
      const asset=path.join(dist,decodeURIComponent(image.pathname.slice(1)));
      const assetInfo=await stat(asset).catch(error=>{if(error.code!=='ENOENT')throw error;});
      if(!assetInfo?.isFile())throw new Error(`Missing image sitemap asset on ${pathname}: ${src}`);
      checkedImages.add(image.href);
    }
    if(!pageImages.has(canonical.href))pageImages.set(canonical.href,new Set());
    pageImages.get(canonical.href).add(image.href);
  }
}
if(!urls.has(origin+'/'))throw new Error('Homepage missing from sitemap');
if(urls.size>50000)throw new Error('Split the sitemap before exceeding 50,000 URLs');
const locations=[...urls].sort();
const declaration='<?xml version="1.0" encoding="UTF-8"?>\n';
const sitemapNamespace='http://www.sitemaps.org/schemas/sitemap/0.9';
const xml=declaration+`<urlset xmlns="${sitemapNamespace}">\n`+locations.map(url=>`  <url><loc>${escapeXml(url)}</loc></url>`).join('\n')+'\n</urlset>\n';
await writeFile(path.join(dist,'sitemap.xml'),xml);

const imageEntries=locations.filter(url=>pageImages.has(url)).map(url=>[
  `  <url><loc>${escapeXml(url)}</loc>`,
  ...[...pageImages.get(url)].map(image=>`    <image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`),
  '  </url>',
].join('\n'));
const imageXml=declaration+`<urlset xmlns="${sitemapNamespace}" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`+imageEntries.join('\n')+'\n</urlset>\n';
await writeFile(path.join(dist,'sitemap-images.xml'),imageXml);

// Keep existing authored rules, then add server redirects for the old HTML redirects.
let authored='';
try{authored=await readFile(path.join(root,'public/_redirects'),'utf8');}catch(error){if(error.code!=='ENOENT')throw error;}
const rules=redirects.sort((a,b)=>a.from.localeCompare(b.from)).map(({from,to,status})=>`${from} ${to} ${status}`);
rules.push('/sitesmap.xml /sitemap.xml 301');
await writeFile(path.join(dist,'_redirects'),[authored.trim(),...rules].filter(Boolean).join('\n')+'\n');
const imageSitemap={url:origin+'/sitemap-images.xml',pages:pageImages.size,images:checkedImages.size};
const report={origin,sitemap:origin+'/sitemap.xml',imageSitemap,urls:locations,redirects,omitted};
await mkdir(path.join(root,'.local/seo'),{recursive:true});
await writeFile(path.join(root,'.local/seo/sitemap-build.json'),JSON.stringify(report,null,2)+'\n');
console.log(`Sitemap: ${locations.length} canonical URLs. Server redirects: ${redirects.length}.`);
console.log(`Image sitemap: ${imageSitemap.images} unique images across ${imageSitemap.pages} pages.`);
