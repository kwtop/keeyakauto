export const vehicleCategories = ['Sedan', 'SUV', 'MPV', 'Pickup'] as const;
export type VehicleCategory = typeof vehicleCategories[number];

export function vehicleCategoryLabel(category: VehicleCategory | ''): string {
  return category === 'MPV' ? 'Van' : category;
}

export function normalizeCategory(value: unknown): VehicleCategory | '' {
  if (typeof value !== 'string') return '';
  if (value.toLowerCase() === 'van') return 'MPV';
  return vehicleCategories.find(category => category.toLowerCase() === value.toLowerCase()) || '';
}

/** Catalog grouping is independent of the recorded physical body specification. */
export function vehicleCategory(vehicle: {category?: VehicleCategory; body: string}): VehicleCategory | '' {
  return vehicle.category || normalizeCategory(vehicle.body);
}

export function categoryHref(kind: 'new' | 'used', category: VehicleCategory) {
  return `/${kind}-cars/?category=${category}`;
}
