import publicData from './vehicle-public-data.json';
import usedData from './used-vehicle-data.json';
import usedPresentations from './used-car-presentations.json';
import {newCarPhotoOrder} from './newCarPhotoOrder';
import {vehicleCategory, type VehicleCategory} from './vehicleCategories';
import {newCarBrands} from './catalogBrands';
import {vehicleHref} from './catalogPaths';
export {vehicleHref,brandHref} from './catalogPaths';

export type VehicleSpecification = {
  field?: string;
  label: string;
  value: string;
  unit?: string;
  testCycle?: string;
  chargeRange?: string;
  source: string;
  cell?: string;
  note?: string;
};

export type VehicleImage = {
  src: string;
  original?: string;
  alt: string;
  treatment: 'original' | 'corrected' | 'generated';
  evidenceType: 'model-reference' | 'stock-unit' | 'concept';
  note: string;
};

export type VehicleVariant = {
  id: string;
  name: string;
  year: string;
  powertrain: string;
  specs: VehicleSpecification[];
  source: string;
  marketVersion: string;
  steering: string;
  seats: number | null;
  note: string;
  technicalReference?: {
    status: 'documented' | 'catalog-only';
    label: string;
    column?: number;
    reviewedAt?: string;
    referenceId?: string;
  };
};

export type Vehicle = {
  kind: 'new' | 'used';
  brand: string;
  brandSlug: string;
  slug: string;
  name: string;
  year: string;
  body: string;
  category?: VehicleCategory;
  powertrain: string;
  image: string;
  source: string;
  modelName?: string;
  seats?: number | null;
  engineSizeLitres?: number;
  gallery?: VehicleImage[];
  specs?: VehicleSpecification[];
  variants?: VehicleVariant[];
  defaultVariantId?: string;
  defaultVariantName?: string;
  variantAliases?: Record<string, string>;
  sourceLabel?: string;
  sourceNote?: string;
  sourceImportedAt?: string;
  verifiedAt?: string | null;
  supplyMethod?: string;
  availability?: 'Unverified' | 'Available' | 'Reserved' | 'Sold';
  referenceOnly?: boolean;
  publicCaution?: string | null;
  photoVersionNote?: string;
  imagePosition?: string;
  presentationImage?: {src:string;original:string;note:string};
  usedRecord?: {
    reference:string;
    trim:string;
    registrationMonth:string;
    mileageKm:number;
    productionMonth?:string|null;
    conditionNote?:string|null;
    keys?:number|null;
    needsReview:boolean;
    sourceRow:number;
  };
};

// Local new-car materials are the sole new-car source. Raw contradictions remain
// in the source JSON for internal review; only the prepared, bounded fields below
// are passed to page templates and browser filters.
const localNewVehicles = publicData.records
  .map(record => {
    const vehicle = record as Vehicle;
    const key = `${vehicle.brandSlug}/${vehicle.slug}`;
    const order = newCarPhotoOrder[key] ?? ('photoOrder' in record ? record.photoOrder as number[] : undefined);
    const photos = vehicle.gallery ?? [];
    if (!order || order.length !== photos.length || new Set(order).size !== photos.length || order.some(index => !photos[index])) {
      throw new Error(`Invalid photo order for ${vehicle.brandSlug}/${vehicle.slug}`);
    }
    const gallery = order.map((index, position) => ({
      src: photos[index].src,
      ...(photos[index].original ? {original:photos[index].original} : {}),
      alt: `${vehicle.name} model reference photograph ${position + 1}`,
      treatment: photos[index].treatment,
      evidenceType: photos[index].evidenceType,
      note: photos[index].note,
    }));
    return {...vehicle, category: vehicleCategory(vehicle) || undefined, image: gallery[0].src, gallery};
  });

// Legacy third-party used-model references, originally checked 2026-09-23.
// No individual stock unit, VIN, condition, mileage, price or current supply is asserted.
const usedReferences: Vehicle[] = [
  { kind:'used',brand:'Toyota',brandSlug:'toyota',slug:'crown-vellfire-hybrid',name:'Toyota Crown Vellfire Hybrid',year:'2021',body:'MPV',powertrain:'Hybrid',image:'/images/used-toyota-vellfire.webp',source:'https://www.zhejiangkaihe.com/en/usedcarshow.aspx?id=80' },
];

export const vehicles: Vehicle[] = [
  ...localNewVehicles,
  ...(usedData.records as Vehicle[]),
  ...usedReferences.map(vehicle => ({
    ...vehicle,
    category: vehicleCategory(vehicle) || undefined,
    referenceOnly: true,
    sourceLabel: 'Third-party model reference',
    sourceNote: 'Example from a past third-party listing, not confirmed KEEYAK stock. Request the VIN, current mileage and condition records for the individual car offered.',
    sourceImportedAt: '2026-09-23',
    verifiedAt: null,
    supplyMethod: 'Confirm sourcing scope',
    availability: 'Unverified' as const,
    gallery: [{
      src: vehicle.image,
      alt: `${vehicle.name} photograph from a past third-party listing`,
      treatment: 'original' as const,
      evidenceType: 'model-reference' as const,
      note: 'Photograph from a past third-party listing. It does not show a confirmed KEEYAK stock vehicle or its current condition.',
    }],
  })),
].map(vehicle => {
  const presentation = (usedPresentations as Record<string, Vehicle['presentationImage']>)[`${vehicle.brandSlug}/${vehicle.slug}`];
  return vehicle.kind === 'used' && presentation ? {...vehicle, presentationImage: presentation} : vehicle;
});

export const vehicleDataSummary = publicData.summary;

export const brands = (kind: Vehicle['kind']) =>
  kind === 'new' ? newCarBrands.map(brand => ({...brand})) :
    [...new Map(vehicles.filter(v => v.kind === kind).map(v => [v.brandSlug, { name:v.brand, slug:v.brandSlug }])).values()];

/** Similar recorded body/powertrain first; no price, stock or capability assumptions. */
export const relatedVehicles = (vehicle:Vehicle,limit=2) => vehicles
  .filter(item=>item.kind===vehicle.kind&&vehicleHref(item)!==vehicleHref(vehicle))
  .map(item=>({item,score:Number(item.body===vehicle.body)*4+Number(item.powertrain===vehicle.powertrain&&vehicle.powertrain!=='To confirm')*3+Number(item.brandSlug===vehicle.brandSlug)}))
  .filter(record=>record.score>=4)
  .sort((a,b)=>b.score-a.score)
  .slice(0,limit).map(record=>record.item);
