"""Compose existing before/after captures; does not alter website image assets."""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[2] / 'docs/catalog-visual-upgrade-20261019'
out = root / 'comparisons'
out.mkdir(exist_ok=True)
captures = json.loads((root / 'final/capture.json').read_text(encoding='utf-8'))['captures']
font = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 22)
small = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 15)
for c in captures:
    stem = f"{c['name']}-{c['viewport']['width']}"
    for extent in ['first', 'full']:
        before = Image.open(root / 'before' / f'{stem}-{extent}.png').convert('RGB')
        after = Image.open(root / 'final' / f'{stem}-{extent}.png').convert('RGB')
        canvas = Image.new('RGB', (before.width + after.width + 20, max(before.height, after.height) + 60), '#e7ecf0')
        draw = ImageDraw.Draw(canvas)
        draw.text((16, 16), 'BEFORE', font=font, fill='#181b20')
        draw.text((before.width + 36, 16), 'AFTER', font=font, fill='#0d426e')
        canvas.paste(before, (0, 60))
        canvas.paste(after, (before.width + 20, 60))
        canvas.save(out / f'{stem}-{extent}.jpg', quality=88)

for width in [1440, 390]:
    rows = [c for c in captures if c['viewport']['width'] == width]
    tile_w, tile_h, cols = 370, 400 if width == 390 else 275, 4
    sheet = Image.new('RGB', (cols * tile_w, ((len(rows) + cols - 1) // cols) * tile_h), '#e7ecf0')
    for i, c in enumerate(rows):
        thumb = Image.open(root / 'final' / f"{c['name']}-{width}-first.png").convert('RGB')
        thumb.thumbnail((350, tile_h - 42), Image.Resampling.LANCZOS)
        x, y = (i % cols) * tile_w, (i // cols) * tile_h
        ImageDraw.Draw(sheet).text((x + 10, y + 8), c['name'], font=small, fill='#181b20')
        sheet.paste(thumb, (x + 10, y + 34))
    sheet.save(out / f'final-overview-{width}.jpg', quality=90)
print(f'Created {len(captures) * 2} comparisons and two overview sheets: {out}')
