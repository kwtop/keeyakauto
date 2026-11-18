"""Import the supplied Pickup/Van workbook, reviewed comparisons and photo mapping.

The source trees stay intact. English public data is prepared by the normal build.
Run with the bundled Python runtime (openpyxl and Pillow).
"""
from pathlib import Path
import csv
import hashlib
import json
import re
import shutil
import openpyxl
from PIL import Image

WORKSPACE = Path(__file__).resolve().parents[1]
PROJECT = WORKSPACE.parent
DATA = WORKSPACE / 'src/data'
BOOK = PROJECT / '参考资料/独立站乘用车皮卡和面包素材.xlsx'
PROCESSED = PROJECT / '参考资料/独立站新车图片素材-已处理'
RAW = PROJECT / '参考资料/乘用车图片/乘用车图片'
DEFINITIONS = DATA / 'commercial-vehicle-specifications.json'

def digest(file):
    return hashlib.sha256(Path(file).read_bytes()).hexdigest()

def write_json(file, value):
    file.parent.mkdir(parents=True, exist_ok=True)
    file.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def main():
    definitions = json.loads(DEFINITIONS.read_text(encoding='utf-8'))
    workbook = openpyxl.load_workbook(BOOK, data_only=True, read_only=True)
    with (PROCESSED / '乘用车图片-处理清单.csv').open(encoding='utf-8-sig', newline='') as handle:
        photo_map = {row['output'].replace('\\', '/'): row for row in csv.DictReader(handle)}
    records, sources = [], []
    for model in definitions['models']:
        brand_slug, slug = model['key'].split('/')
        folder = PROJECT / model['processedFolder']
        category = 'Pickup' if model['index'] <= 15 else 'MPV'
        sheet_name = '新车皮卡' if category == 'Pickup' else '新车Van'
        cells = list(next(workbook[sheet_name].iter_rows(min_row=model['row'], max_row=model['row'], values_only=True)))
        name = model['brand'] + ' ' + model['modelName']
        parameter = PROJECT / model['parameterImage']
        if not cells[0] or not parameter.is_file():
            raise ValueError('Missing source for ' + model['key'])
        photos = sorted(folder.glob('*.webp'), key=lambda p: (p.name != model['leadFile'], 'front-three-quarter' not in p.name, p.name))
        gallery, provenance = [], []
        public_folder = WORKSPACE / 'public/images/catalog' / brand_slug / slug
        public_folder.mkdir(parents=True, exist_ok=True)
        for position, photo in enumerate(photos, 1):
            mapped = photo_map[photo.relative_to(PROCESSED).as_posix()]
            original = RAW / Path(mapped['source'].replace('\\', '/'))
            if not original.is_file():
                raise ValueError('Missing original ' + str(original))
            Image.open(photo).verify()
            shutil.copy2(photo, public_folder / photo.name)
            original_name = photo.stem + original.suffix.lower()
            original_target = public_folder / 'original' / original_name
            original_target.parent.mkdir(exist_ok=True)
            shutil.copy2(original, original_target)
            image_url = '/images/catalog/' + model['key'] + '/' + photo.name
            original_url = '/images/catalog/' + model['key'] + '/original/' + original_name
            gallery.append({'src': image_url, 'original': original_url,
                'alt': name + ' AI-edited model reference, ' + mapped['view'].replace('-', ' '),
                'treatment': 'corrected', 'evidenceType': 'model-reference',
                'note': 'AI-edited model-family reference. Body, cab, seating and exterior can differ by version; match the actual vehicle to its offer.'})
            provenance.append({'processed': str(photo.relative_to(PROJECT)).replace('\\', '/'),
                'source': str(original.relative_to(PROJECT)).replace('\\', '/'),
                'processedSha256': digest(photo), 'sourceSha256': digest(original),
                'public': image_url, 'originalPublic': original_url, 'view': mapped['view']})
        variants = []
        for column, title in enumerate(model['names']):
            def get(field):
                value = model.get(field)
                return value[column] if isinstance(value, list) else value
            source_label = f'Supplied pickup and van comparison, column {column + 1}'
            specs = []
            def put(field, label, value, unit=None, cycle=None, note=None, **extra):
                if value is None or value == '':
                    return
                spec = {'field': field, 'label': label, 'value': str(value), 'source': source_label,
                    'cell': f'Column {column + 1}: {label}'}
                if unit: spec['unit'] = unit
                if cycle: spec['testCycle'] = cycle
                if note: spec['note'] = note
                spec.update(extra)
                specs.append(spec)
            year = title[:4]
            if not re.fullmatch(r'20\d{2}', year): raise ValueError('Missing year ' + title)
            powertrain = get('powertrain')
            seats = get('seats')
            put('modelYear', 'Model year', year)
            put('powertrain', 'Powertrain', powertrain,
                note=model.get('columnNotes', {}).get(str(column + 1)))
            put('body', 'Body structure', get('bodyDescription') or model.get('body') or 'Pickup')
            put('seats', 'Seats', seats)
            if category == 'MPV' and seats is None and cells[3]:
                put('seatingOptions', 'Workbook seating options', str(cells[3]).replace('/', ' / '),
                    note='Model-level workbook options; confirm the exact seating layout for this version.')
            put('engine', 'Range extender' if powertrain == 'EREV' else 'Engine', get('engine'))
            put('transmission', 'Transmission', get('transmission'),
                note='The first version title says automatic, while its transmission row says 5-speed manual; confirm the offered transmission.' if model['index'] == 10 and column == 0 else None)
            put('power', 'Maximum motor power' if powertrain == 'Pure Electric' else 'Maximum power (as listed)', get('power'), 'kW', note=model.get('outputNote'))
            put('torque', 'Maximum motor torque' if powertrain == 'Pure Electric' else 'Maximum torque (as listed)', get('torque'), 'N·m', note=model.get('outputNote'))
            put('motorOutput', 'Motor output', get('motorOutput'), 'PS')
            put('dimensions', 'Dimensions (L × W × H)', get('dimensions'), 'mm')
            put('drive', 'Listed drive designation', get('drive'), note='Drive designation in the source version title or workbook.')
            put('maxSpeed', 'Maximum speed', get('maxSpeed'), 'km/h')
            put('acceleration', '0–100 km/h', get('acceleration'), 's')
            put('fuelConsumption', 'Fuel consumption', get('nedcFuel'), 'L/100 km', 'NEDC')
            put('depletedFuel', 'Depleted-battery fuel consumption', get('depletedFuel'), 'L/100 km', note='Test cycle is not stated in the supplied row.')
            put('equivalentFuel', 'Electricity-equivalent fuel consumption', get('equivalentFuel'), 'L/100 km', note='Energy-equivalent figure; this is not petrol consumption.')
            put('electricRange', 'Electric range', get('nedcRange'), 'km', 'NEDC')
            put('electricRange', 'Electric range', get('cltcRange'), 'km', 'CLTC')
            if get('fastCharging') is not None:
                interval = get('chargeRange')
                put('fastCharging', 'DC fast charging', get('fastCharging'), 'min',
                    note=None if interval else 'Charge interval is not supplied for this column.',
                    **({'chargeRange': interval} if interval else {}))
            if get('slowCharging') is not None:
                put('slowCharging', 'Slow charging', get('slowCharging'), 'h',
                    **({'chargeRange': get('slowChargeRange')} if get('slowChargeRange') else {}))
            if powertrain != 'Pure Electric':
                put('emissions', 'Listed emissions standard', 'China VI',
                    note='Source designation; confirm destination-specific compliance documents.')
            reference = hashlib.sha256((model['key'] + '|' + str(column + 1) + '|' + title).encode()).hexdigest()[:12]
            variants.append({'id': f'commercial-{year}-{reference}', 'name': title, 'year': year,
                'powertrain': powertrain, 'specs': specs, 'source': source_label,
                'marketVersion': 'China-market specification reference; confirm the offered vehicle',
                'steering': 'To confirm', 'seats': seats,
                'note': model.get('columnNotes', {}).get(str(column + 1), 'Supplied comparison reference. Photos can show another cab, body or equipment version.'),
                'technicalReference': {'status': 'documented', 'label': 'Supplied pickup and van specification comparison',
                    'column': column + 1, 'reviewedAt': definitions['reviewedAt'], 'referenceId': reference}})
        chosen = variants[model['default']]
        body = model.get('body') or ('Pickup' if category == 'Pickup' else 'Van')
        caution = model.get('publicCaution')
        record = {'publishable': True, 'importBatch': 'commercial-20261030', 'kind': 'new',
            'brand': model['brand'], 'brandSlug': brand_slug, 'slug': slug, 'name': name, 'modelName': model['modelName'],
            'year': chosen['year'], 'body': body, 'category': category, 'powertrain': chosen['powertrain'], 'seats': chosen['seats'],
            'image': gallery[0]['src'], 'gallery': gallery, 'photoOrder': list(range(len(gallery))),
            'source': 'user-supplied-pickup-and-van-materials', 'sourceLabel': 'Supplied specification comparison',
            'sourceNote': 'Model reference; confirm the exact version, availability, destination compatibility and written offer.',
            'sourceImportedAt': definitions['reviewedAt'], 'verifiedAt': None,
            'supplyMethod': 'Confirm on request', 'availability': 'Unverified', 'referenceOnly': True,
            'specs': chosen['specs'], 'variants': variants, 'defaultVariantId': chosen['id'], 'defaultVariantName': chosen['name'],
            'publicCaution': caution, 'rawSource': {'workbook': str(BOOK.relative_to(PROJECT)).replace('\\', '/'),
                'worksheet': sheet_name, 'row': model['row'], 'cells': cells, 'comparison': model['parameterImage'],
                'comparisonSha256': digest(parameter), 'photoMapping': provenance},
            'internalIssues': model.get('conflicts', [])}
        photo_notes = {7: 'Photos show a double cab', 8: 'Photos show a double cab',
            19: 'Photos show another exterior generation', 23: 'Photos show the panel cargo version'}
        if model['index'] in photo_notes:
            record['photoVersionNote'] = photo_notes[model['index']]
        records.append(record)
        local_parameters = folder / '参数'
        local_parameters.mkdir(exist_ok=True)
        shutil.copy2(parameter, local_parameters / 'comparison-source.png')
        write_json(local_parameters / 'specifications.json', {'model': model['key'], 'source': record['rawSource'],
            'defaultVariantId': chosen['id'], 'variants': variants, 'issues': model.get('conflicts', [])})
        sources.append({'key': model['key'], 'processedFolder': model['processedFolder'], 'source': record['rawSource'],
            'variants': len(variants), 'galleryPhotos': len(gallery), 'issues': model.get('conflicts', [])})
    workbook.close()
    if len(records) != 24 or sum(len(r['gallery']) for r in records) != 152:
        raise ValueError('Unexpected import coverage')
    output = {'schemaVersion': 1, 'sourceWorkbook': str(BOOK.relative_to(PROJECT)).replace('\\', '/'),
        'sourceWorkbookSha256': digest(BOOK), 'importedAt': definitions['reviewedAt'], 'records': records,
        'summary': {'models': len(records), 'variants': sum(len(r['variants']) for r in records),
            'photos': sum(len(r['gallery']) for r in records), 'pickup': 15, 'van': 9}}
    write_json(DATA / 'commercial-vehicle-source.json', output)
    write_json(PROJECT / 'docs/pickup-van-import-20261030/import-manifest.json', {'summary': output['summary'], 'models': sources})
    print(json.dumps(output['summary']))

if __name__ == '__main__':
    main()
