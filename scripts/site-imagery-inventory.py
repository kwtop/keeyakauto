import sys,json,hashlib,re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote

ROOT=Path(__file__).resolve().parents[2]
WS=ROOT/'workspace'
TASK=ROOT/'docs/site-imagery-20261019'
phase=sys.argv[1] if len(sys.argv)>1 else 'before'

class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.main=False;self.text=[];self.images=[];self.links=[];self.modules=[];self.seo={};self.title=False;self.title_text=[]
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='main':self.main=True
  if t=='title':self.title=True
  if t=='meta' and d.get('name') in ('description','robots'):self.seo[d['name']]=d.get('content')
  if t=='link' and d.get('rel')=='canonical':self.seo['canonical']=d.get('href')
  if self.main:
   if 'data-core-module' in d:self.modules.append(d.get('data-core-module') or d.get('data-module') or t)
   elif 'data-ah-section' in d:self.modules.append(d.get('data-ah-section'))
   if t=='img':self.images.append({k:d[k] for k in ('src','srcset','alt','width','height') if k in d})
   if t=='a' and d.get('href'):self.links.append(d['href'])
 def handle_endtag(self,t):
  if t=='main':self.main=False
  if t=='title':self.title=False
 def handle_data(self,s):
  if self.main:self.text.append(s)
  if self.title:self.title_text.append(s)

pages=[]
for f in sorted((WS/'dist').rglob('*.html')):
 rel=f.relative_to(WS/'dist').as_posix()
 if rel.startswith(('design/','design-preview/')):continue
 route='/' if rel=='index.html' else '/'+(rel[:-10] if rel.endswith('index.html') else rel)
 p=Page();p.feed(f.read_text(encoding='utf-8'))
 images=list({i.get('src'):i for i in p.images}.values())
 pages.append({'url':route,'title':''.join(p.title_text),'moduleCount':len(p.modules),'modules':p.modules,'images':images,'uniqueImages':len(images),'links':list(dict.fromkeys(p.links)),'seo':p.seo,'textHash':hashlib.sha256(' '.join(p.text).encode()).hexdigest()})
missing=[]
for p in pages:
 for i in p['images']:
  for src in [i.get('src','')]+[s.strip().split(' ')[0] for s in i.get('srcset','').split(',') if s.strip()]:
   if src.startswith('/images/') and not (WS/'public'/unquote(urlsplit(src).path).lstrip('/')).is_file():missing.append({'url':p['url'],'src':src})
files=['src/data/catalog.ts','src/data/vehicle-public-data.json','src/data/newCarPhotoOrder.ts','src/data/vehicleDefaultVariant.ts','src/data/company.ts','src/components/QuoteForm.tsx','src/components/CarSearch.astro','src/data/inquiry.ts']
hashes={s:hashlib.sha256((WS/s).read_bytes()).hexdigest() for s in files}
out={'phase':phase,'pages':pages,'missingImageFiles':missing,'businessSourceHashes':hashes}
(TASK/phase).mkdir(parents=True,exist_ok=True)
(TASK/phase/'all-routes.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'phase':phase,'urls':len(pages),'missingImageFiles':len(missing)},ensure_ascii=False))
