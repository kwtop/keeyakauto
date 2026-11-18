import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {newCarVariantNames} from '../src/data/newCarVariantNames.ts';
import {selectDefaultVariant} from '../src/data/vehicleDefaultVariant.ts';
import {engineDisplacementLitres, trimEngineDisplacementLitres} from '../src/data/engineDisplacement.ts';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const source = JSON.parse(await readFile(resolve(root, 'src/data/vehicle-source-data.json'), 'utf8'));
const commercial = JSON.parse(await readFile(resolve(root, 'src/data/commercial-vehicle-source.json'), 'utf8'));
const supplied = JSON.parse(await readFile(resolve(root, 'src/data/supplied-vehicle-source.json'), 'utf8'));
const suppliedKeys = new Set(supplied.records.map(record => `${record.brandSlug}/${record.slug}`));
const {documentedRecords} = await import('./prepare-vehicle-details.mjs');
const cjk = /[\u3400-\u9fff]/;

const englishSource = (value) => {
  if (value.startsWith('Supplied pickup and van comparison') || value.startsWith('User-supplied Tiggo 8 comparison')) return value;
  const row = value.match(/row (\d+)/i)?.[1];
  return `User-supplied new-car specification workbook${row ? `, row ${row}` : ''}`;
};
const publicSpecs = (specs) => specs.map(spec => ({...spec, source: englishSource(spec.source)}));
const versionSpecs = (variant, name) => {
  const specs = publicSpecs(variant.specs);
  const drive = name.match(/\b(AWD|RWD|FWD|2WD|4WD)\b/);
  const transmission = name.match(/\b(DSG|DCT|CVT|Automatic|Manual)\b/);
  const source = englishSource(variant.source);
  const row = variant.source.match(/row (\d+)/i)?.[1];
  const reference = {source, ...(row ? {cell:`D${row}`} : {}), note:'Designation in the listed trim; match the actual vehicle configuration to the offer.'};
  if (drive) specs.push({label:'Listed drive designation',value:drive[1],...reference});
  if (transmission) specs.push({label:'Listed transmission',value:transmission[1],...reference});
  return specs;
};

const records = [...source.records, ...commercial.records, ...supplied.records].filter(record => record.publishable).map(record => {
  const key = `${record.brandSlug}/${record.slug}`;
  const isCommercial = record.importBatch === 'commercial-20261030';
  const isStandalone = isCommercial || suppliedKeys.has(key);
  const name = isStandalone ? record.defaultVariantName : newCarVariantNames[key];
  if (!name) throw new Error(`Missing English variant name for ${key}`);
  const original = record.variants.find(variant => variant.id === (record.defaultVariantId ?? record.variants[0]?.id));
  const documented = documentedRecords[key]?.variants;
  if (!documented) throw new Error(`Missing detailed reference for ${key}`);
  const reference = documented.find(variant => variant.matchesDefaultId === original?.id) ?? original;
  const preferred = selectDefaultVariant(documented, reference);
  if (!preferred || preferred.technicalReference?.status !== 'documented') throw new Error(`Missing documented default for ${key}`);
  const {publishable, rawSource, internalIssues, sourceModelName, ...publicRecord} = record;
  return {
    ...publicRecord,
    // Summary facts follow the same default as the detail page. Keep the original
    // variants intact for inbound links; full comparisons remain detail-only.
    defaultVariantId: preferred.id,
    defaultVariantName: preferred.id === original?.id ? name : preferred.name,
    year: preferred.year,
    powertrain: preferred.powertrain,
    seats: preferred.seats,
    engineSizeLitres: preferred.powertrain === 'Pure Electric' ? undefined :
      engineDisplacementLitres(preferred.specs.find(spec => spec.field === 'engine')?.value) ??
      trimEngineDisplacementLitres(preferred.name),
    sourceLabel: 'Catalog specification reference',
    gallery: record.gallery.map(({src, original, alt, treatment, evidenceType, note}) => ({src, ...(original ? {original} : {}), alt, treatment, evidenceType, note: isStandalone ? note : evidenceType==='model-reference' ? 'Model reference photo. Confirm the exact version; not a stock vehicle.' : note})),
    specs: publicSpecs(record.specs),
    variants: (isStandalone ? record.variants.filter(variant => variant.id === record.defaultVariantId) : record.variants).map(variant => ({
      ...variant,
      name: isStandalone ? variant.name : name,
      source: englishSource(variant.source),
      specs: isStandalone ? publicSpecs(variant.specs) : versionSpecs(variant, name),
    })),
  };
});

const output = {records, summary: {...source.summary,
  models: source.records.length + commercial.records.length + supplied.records.length,
  publishedModels: records.length,
  brands: new Set(records.map(record => record.brandSlug)).size,
  variants: source.summary.variants + commercial.summary.variants + supplied.summary.variants,
  images: source.summary.images + commercial.summary.photos + supplied.summary.photos,
  publishedImages: records.reduce((count, record) => count + record.gallery.length, 0),
  emptyCategories: [],
}};
const serialized = JSON.stringify(output);
if (cjk.test(serialized)) throw new Error('Chinese text found in public vehicle data');
await writeFile(resolve(root, 'src/data/vehicle-public-data.json'), JSON.stringify(output, null, 2) + '\n');
console.log(`Prepared ${records.length} English public vehicle records.`);
