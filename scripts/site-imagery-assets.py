import json,hashlib,shutil
from pathlib import Path
from PIL import Image,ImageDraw,ImageOps

ROOT=Path(__file__).resolve().parents[2]
TASK=ROOT/'docs/site-imagery-20261019'
PUBLIC=ROOT/'workspace/public/images/site-imagery-20261019'
ARCHIVE=TASK/'generated-originals'
PUBLIC.mkdir(parents=True,exist_ok=True);ARCHIVE.mkdir(parents=True,exist_ok=True)
jobs={j['id']:j for j in json.loads((TASK/'GENERATION-JOBS.json').read_text(encoding='utf-8'))}
assets={}
for f in sorted((TASK/'outputs').glob('*.json')):
 meta=json.loads(f.read_text(encoding='utf-8'));key=meta['id'];job=jobs[key];source=Path(meta['path'])
 original=ARCHIVE/(key+'.png')
 if not original.is_file():shutil.copy2(source,original)
 with Image.open(original) as im:
  im=im.convert('RGB');w,h=im.size
  widths=sorted(set([x for x in [480,800,1200] if x<w]+[w]))
  for x in widths:
   out=PUBLIC/(key+('' if x==w else '-'+str(x))+'.webp')
   if not out.is_file():
    target=im if x==w else im.resize((x,round(h*x/w)),Image.Resampling.LANCZOS)
    target.save(out,'WEBP',quality=87,method=6)
  assets[key]={'src':'/images/site-imagery-20261019/'+key+'.webp','width':w,'height':h,'widths':widths,'srcSet':', '.join('/images/site-imagery-20261019/'+key+('' if x==w else '-'+str(x))+'.webp '+str(x)+'w' for x in widths),'small':'/images/site-imagery-20261019/'+key+'-800.webp','sourceOriginal':job.get('image'),'reference':job.get('reference'),'prompt':job['prompt'],'generatedFile':str(source),'archive':str(original.relative_to(ROOT)),'sha256':hashlib.sha256(original.read_bytes()).hexdigest(),'adopted':True,'review':'pending rendered review'}
(TASK/'IMAGE-MANIFEST.json').write_text(json.dumps(assets,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'workspace/src/data/siteImagerySizes.json').write_text(json.dumps({k:{x:v[x] for x in ['src','width','height','widths','srcSet','small']} for k,v in assets.items()},indent=2)+'\n',encoding='utf-8')
scenes={}
for key,a in assets.items():
 job=jobs[key]
 if job['kind'] not in ('new','used'):continue
 modelkey=('used/' if job['kind']=='used' else '')+job['brandSlug']+'/'+job['slug']
 scenes[modelkey]={'src':a['src'],'srcSet':a['srcSet'],'original':job['image'],'alt':job['name']+' in an AI-edited architectural setting','note':'AI-edited setting. Original model photograph available below; confirm the offered version.' if job['kind']=='new' else 'AI-edited setting based on a historical model photograph. Request current vehicle and condition records.'}
(ROOT/'workspace/src/data/siteModelScenes.json').write_text(json.dumps(scenes,indent=2)+'\n',encoding='utf-8')
thumbs=[]
for key,a in assets.items():
 with Image.open(PUBLIC/(key+'.webp')) as im:
  tile=Image.new('RGB',(440,360),'#f5f5f5');pic=ImageOps.contain(im,(440,320));tile.paste(pic,((440-pic.width)//2,(320-pic.height)//2));ImageDraw.Draw(tile).text((12,333),key,fill='#111');thumbs.append(tile)
if thumbs:
 sheet=Image.new('RGB',(440*4,360*((len(thumbs)+3)//4)),'white')
 for i,t in enumerate(thumbs):sheet.paste(t,((i%4)*440,(i//4)*360))
 sheet.save(TASK/'IMAGE-CONTACT-SHEET.jpg',quality=92)
print(json.dumps({'prepared':len(assets),'responsiveWebps':sum(len(a['widths']) for a in assets.values())}))
