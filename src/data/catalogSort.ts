import {popularVehicleModels} from './popularVehicleModels';

type SortableVehicle = {
  name: string;
  year: string;
  brandSlug?: string;
  slug?: string;
  usedRecord?: {registrationMonth?: string; mileageKm?: number};
};

const popularRanks = new Map<string, number>(popularVehicleModels.map((key, index) => [key, index]));
function newModelRank(vehicle: SortableVehicle) {
  return popularRanks.get(`new/${vehicle.brandSlug}/${vehicle.slug}`) ?? popularRanks.size;
}

function registrationMonth(vehicle: SortableVehicle) {
  const value = vehicle.usedRecord?.registrationMonth;
  return value && /^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(value) ? Number(value.replace('-', '')) : 0;
}

function mileage(vehicle: SortableVehicle) {
  const value = vehicle.usedRecord?.mileageKm;
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : Infinity;
}

/** Sort before pagination, keeping the source catalog and unknown records intact. */
export function sortCatalogVehicles<T extends SortableVehicle>(items: T[], sort: string, kind: 'new' | 'used'): T[] {
  const result = [...items];
  if (sort === 'name') return result.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'year') return result.sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0) || a.name.localeCompare(b.name));
  if (kind === 'used') {
    if (sort === 'mileage') return result.sort((a, b) => mileage(a) - mileage(b) || registrationMonth(b) - registrationMonth(a) || a.name.localeCompare(b.name));
    return result.sort((a, b) => registrationMonth(b) - registrationMonth(a) || a.name.localeCompare(b.name));
  }
  return result.sort((a, b) => newModelRank(a) - newModelRank(b));
}
