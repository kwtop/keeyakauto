from pathlib import Path
from PIL import Image, ImageDraw
import json

root=Path(__file__).resolve().parents[2]/'docs/volta-home-20261019'
out=root/'comparisons';out.mkdir(exist_ok=True)
ref=json.loads((root/'reference/capture.json').read_text())
final=json.loads((root/'final/capture.json').read_text())
for width in [1440,1024,768,390]:
    a=Image.open(root/f'reference/{width}-first.png').convert('RGB')
    b=Image.open(root/f'final/{width}-first.png').convert('RGB')
    old=Image.open(root/f'before/{width}-first.png').convert('RGB')
    for label,left in [('hero-reference-vs-home',a),('hero-before-vs-after',old)]:
        sheet=Image.new('RGB',(width*2,max(left.height,b.height)), 'white')
        sheet.paste(left,(0,0));sheet.paste(b,(width,0));sheet.save(out/f'{label}-{width}.jpg',quality=94)
    Image.blend(a,b,.5).save(out/f'hero-overlay-{width}.png')
    images=[Image.open(root/f'{folder}/{width}-full.png').convert('RGB') for folder in ['reference','final']]
    cell=min(640,width);scale=cell/width
    images=[im.resize((cell,round(im.height*scale)),Image.Resampling.LANCZOS) for im in images]
    sheet=Image.new('RGB',(cell*2,max(i.height for i in images)), '#e8eaeb')
    for j,im in enumerate(images):sheet.paste(im,(cell*j,0))
    sheet.save(out/f'full-reference-vs-home-{width}.jpg',quality=92)
    r=next(i for i in ref['captures'] if i['viewport']['width']==width)
    c=next(i for i in final['captures'] if i['viewport']['width']==width)
    source=Image.open(root/f'reference/{width}-full.png').convert('RGB')
    candidate=Image.open(root/f'final/{width}-full.png').convert('RGB')
    for label,indices in [('catalog',[1,2,3]),('middle',[4,5,6,7,8]),('closing',[9,10,11,12,13])]:
        parts=[]
        for image,data in [(source,r),(candidate,c)]:
            start=round(data['sections'][indices[0]]['y']);end=round(data['sections'][indices[-1]]['y']+data['sections'][indices[-1]]['height'])
            part=image.crop((0,start,width,end));parts.append(part.resize((cell,round(part.height*scale)),Image.Resampling.LANCZOS))
        sheet=Image.new('RGB',(cell*2,max(p.height for p in parts)),'#e8eaeb')
        for j,p in enumerate(parts):sheet.paste(p,(cell*j,0))
        sheet.save(out/f'{label}-{width}.jpg',quality=92)
    print('Comparisons:',width)
