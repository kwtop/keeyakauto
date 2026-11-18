"""Read-only verification of generated routes, local links, anchors and media."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
OUT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / 'design-exploration/quiet-editorial-20261013'
OUT.mkdir(parents=True, exist_ok=True)

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path=path; self.ids=set(); self.duplicate_ids=[]; self.links=[]; self.assets=[]; self.images=[]; self.h1=0; self.current=False; self.noindex=False; self.missing_alt=[]
        self.feed(path.read_text(encoding='utf-8'))
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids:self.duplicate_ids.append(a['id'])
            self.ids.add(a['id'])
        if tag=='header' and 'primary-header' in a.get('class',''):self.current=True
        if tag=='h1':self.h1+=1
        if tag=='meta' and a.get('name')=='robots':self.noindex='noindex' in a.get('content','')
        if tag=='a' and a.get('href'):self.links.append(a['href'])
        if tag in ['img','script','source'] and a.get('src'):self.assets.append(a['src'])
        if tag=='link' and a.get('rel') in ['stylesheet','preload','icon'] and a.get('href'):self.assets.append(a['href'])
        if tag in ['img','source'] and a.get('srcset'):
            self.assets.extend(part.strip().split()[0] for part in a['srcset'].split(',') if part.strip())
        if tag=='img':
            self.images.append(a)
            if 'alt' not in a:self.missing_alt.append(a.get('src'))

all_pages={p:Page(p) for p in DIST.rglob('*.html')}
pages={p:x for p,x in all_pages.items() if x.current}
def route(p):
    rel=p.relative_to(DIST).as_posix()
    return '/' if rel=='index.html' else '/'+rel[:-10] if rel.endswith('index.html') else '/'+rel

def resolve(path, base):
    parts=urlsplit(path)
    if parts.scheme or parts.netloc:return None,parts
    name=unquote(parts.path)
    if not name:target=base
    elif name.startswith('/'):target=DIST/name.lstrip('/')
    else:target=base.parent/name
    if name.endswith('/') or target.is_dir():target=target/'index.html'
    return target.resolve(),parts

issues=[]; local_links=0; media_refs=0
for file,p in pages.items():
    r=route(file)
    if p.h1!=1:issues.append({'route':r,'kind':'h1_count','value':p.h1})
    if not p.noindex:issues.append({'route':r,'kind':'missing_noindex'})
    for value in p.duplicate_ids:issues.append({'route':r,'kind':'duplicate_id','value':value})
    for value in p.missing_alt:issues.append({'route':r,'kind':'missing_alt','value':value})
    for value in p.links:
        target,parts=resolve(value,file)
        if target is None:continue
        local_links+=1
        if not target.exists():issues.append({'route':r,'kind':'missing_link','value':value});continue
        if parts.fragment and target.suffix=='.html':
            dest=all_pages.get(target)
            if dest and unquote(parts.fragment) not in dest.ids:issues.append({'route':r,'kind':'missing_anchor','value':value})
    for value in p.assets:
        target,parts=resolve(value,file)
        if target is None:continue
        media_refs+=1
        if not target.exists():issues.append({'route':r,'kind':'missing_asset','value':value})

result={'generated_html_files':len(all_pages),'current_site_pages':len(pages),'local_link_checks':local_links,'asset_reference_checks':media_refs,'issues':issues,'routes':sorted(route(p) for p in pages)}
OUT.mkdir(parents=True,exist_ok=True)
(OUT/'site-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
(OUT/'routes.json').write_text(json.dumps(result['routes'],indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in result.items() if k!='routes'},ensure_ascii=False,indent=2))
raise SystemExit(1 if issues else 0)
