import {normalizeCategory, vehicleCategory, type VehicleCategory} from './vehicleCategories';
import {engineDisplacementLitres, trimEngineDisplacementLitres} from './engineDisplacement';

type CatalogKind = 'new' | 'used';
type RangeKey = 'mileage' | 'age' | 'displacement';
export type CatalogFilters = Record<RangeKey, string> & {
  brands: string[]; category: VehicleCategory | ''; power: string; q: string; sort: string;
};

type RangeOption = {value: string; label: string; min: number; max?: number; includeMax?: boolean};
type CatalogRange = {key: RangeKey; label: string; anyLabel: string; options: RangeOption[]};
const engineSizeRange: CatalogRange = {key: 'displacement', label: 'Engine size', anyLabel: 'Any engine size', options: [
  {value: '1-1.5', label: '1–1.5 L', min: 1, max: 1.5, includeMax: true},
  {value: '1.5-2', label: '1.5–2 L', min: 1.5, max: 2},
  {value: '2+', label: '2 L+', min: 2},
]};
const newCatalogRanges = [engineSizeRange];
const usedCatalogRanges: CatalogRange[] = [
  {key: 'mileage', label: 'Mileage', anyLabel: 'Any mileage', options: [
    {value: '0-20000', label: '0–20,000 km', min: 0, max: 20000},
    {value: '20000-50000', label: '20,000–50,000 km', min: 20000, max: 50000},
    {value: '50000-100000', label: '50,000–100,000 km', min: 50000, max: 100000},
    {value: '100000+', label: '100,000 km+', min: 100000},
  ]},
  {key: 'age', label: 'Vehicle age', anyLabel: 'Any age', options: [
    {value: 'under-3', label: 'Under 3 years', min: 0, max: 36},
    {value: '3-5', label: '3–5 years', min: 36, max: 60},
    {value: '5-8', label: '5–8 years', min: 60, max: 96},
    {value: '8+', label: '8 years+', min: 96},
  ]},
  engineSizeRange,
];

export const catalogRanges = (kind: CatalogKind) => kind === 'used' ? usedCatalogRanges : newCatalogRanges;

export const blankCatalogFilters = (kind: CatalogKind = 'new'): CatalogFilters => ({
  brands: [], category: '', power: '', mileage: '', age: '', displacement: '', q: '', sort: kind === 'used' ? 'mileage' : 'featured',
});
export const selectCatalogBrand = (filters: CatalogFilters, brand: string): CatalogFilters => ({...filters, brands: [brand]});
const filterKeys = ['brand', 'body', 'category', 'power', 'q', 'sort', 'seats', 'viewpage', ...usedCatalogRanges.map(range => range.key)];

export function readCatalogFilters(search: string, kind: CatalogKind = 'new'): CatalogFilters {
  const parameters = new URLSearchParams(search);
  const defaults = blankCatalogFilters(kind);
  const sort = parameters.get('sort') || '';
  const filters: CatalogFilters = {
    ...defaults,
    brands: parameters.getAll('brand').map(brand => brand.trim()).filter(Boolean).slice(0, 1),
    category: normalizeCategory(parameters.get('category') || parameters.get('body')),
    power: kind === 'new' ? parameters.get('power') || '' : '',
    q: parameters.get('q') || '',
    sort: ['featured', 'name', 'year', 'mileage'].includes(sort) ? sort : defaults.sort,
  };
  for (const {key, options} of catalogRanges(kind)) {
    filters[key] = options.find(option => option.value === parameters.get(key))?.value || '';
  }
  return filters;
}

export function catalogParameters(filters: CatalogFilters, page = 1, initialPage = 1, existing = '', kind: CatalogKind = 'new') {
  const parameters = new URLSearchParams(existing);
  filterKeys.forEach(key => parameters.delete(key));
  filters.brands.slice(0, 1).forEach(brand => parameters.append('brand', brand));
  if (filters.category) parameters.set('category', filters.category);
  if (filters.power) parameters.set('power', filters.power);
  for (const {key} of catalogRanges(kind)) if (filters[key]) parameters.set(key, filters[key]);
  if (filters.q) parameters.set('q', filters.q);
  if (filters.sort !== blankCatalogFilters(kind).sort) parameters.set('sort', filters.sort);
  if (page !== initialPage) parameters.set('viewpage', String(page));
  return parameters;
}

export function hasCatalogFilters(filters: CatalogFilters, kind: CatalogKind = 'new') {
  return !!(filters.brands.length || filters.category || filters.power || filters.q ||
    catalogRanges(kind).some(({key}) => filters[key]) || filters.sort !== blankCatalogFilters(kind).sort);
}

type SearchableVehicle = {
  brandSlug: string; body: string; category?: VehicleCategory; powertrain: string; name: string;
  defaultVariantName?: string; variants?: {name: string}[];
  engineSizeLitres?: number;
  usedRecord?: {mileageKm?: number; registrationMonth?: string; trim?: string};
  specs?: {field?: string; value: string}[];
};

function rangeValue(vehicle: SearchableVehicle, key: RangeKey, today: Date) {
  if (key === 'mileage') return vehicle.usedRecord?.mileageKm;
  if (key === 'age') {
    const registration = vehicle.usedRecord?.registrationMonth?.match(/^([1-9]\d{3})-(0[1-9]|1[0-2])$/);
    if (registration) return (today.getUTCFullYear() - Number(registration[1])) * 12 + today.getUTCMonth() + 1 - Number(registration[2]);
    return;
  }
  if (vehicle.powertrain === 'Pure Electric') return;
  if (vehicle.engineSizeLitres !== undefined) return vehicle.engineSizeLitres;
  return engineDisplacementLitres(vehicle.specs?.find(spec => spec.field === 'engine')?.value) ??
    trimEngineDisplacementLitres(vehicle.usedRecord?.trim);
}

export function matchesCatalog(vehicle: SearchableVehicle, filters: CatalogFilters, today = new Date()) {
  const text = [vehicle.name, vehicle.defaultVariantName, vehicle.variants?.[0]?.name].join(' ').toLowerCase();
  return (!filters.brands.length || filters.brands[0] === vehicle.brandSlug) &&
    (!filters.category || vehicleCategory(vehicle) === filters.category) &&
    (!filters.power || vehicle.powertrain === filters.power) &&
    (!filters.q.trim() || text.includes(filters.q.trim().toLowerCase())) &&
    usedCatalogRanges.every(({key, options}) => {
      if (!filters[key]) return true;
      const range = options.find(option => option.value === filters[key]);
      const value = rangeValue(vehicle, key, today);
      return range && typeof value === 'number' && Number.isFinite(value) && value >= range.min &&
        (range.max === undefined || value < range.max || (range.includeMax === true && value === range.max));
    });
}
