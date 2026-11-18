import type {VehicleCategory} from './vehicleCategories';

// One side-view family for menus, filters and vehicle cards, facing left.
// MPV remains the saved category key; its public label is Van.
export const vehicleCategoryViewBox = '0 0 32 24';
export const vehicleCategoryWheels = [
  {cx: 6.5, cy: 18.5, r: 2.5},
  {cx: 25.5, cy: 18.5, r: 2.5},
] as const;

export const vehicleCategoryPaths: Record<VehicleCategory, readonly string[]> = {
  Sedan: [
    'M4 18.5H2.5a1 1 0 0 1-1-1v-3a1.5 1.5 0 0 1 1.2-1.5l4.8-.9 4-4.5A2 2 0 0 1 13 7h5.7a2 2 0 0 1 1.4.6l4.4 4.4 4.8 1.3a1.5 1.5 0 0 1 1.2 1.5v3.7H28M9 18.5h14',
    'M7.5 12h17M15.5 7v5',
  ],
  SUV: [
    'M4 18.5H2.5a1 1 0 0 1-1-1v-5a1.5 1.5 0 0 1 1.2-1.5L7 10.5l3.4-4.7A2 2 0 0 1 12 5h14.5a2 2 0 0 1 1.9 1.4l2.1 6.1v6H28M9 18.5h14',
    'M7 11.5h21M15 5v6.5M22 5v6.5',
  ],
  MPV: [
    'M4 18.5H2.5a1 1 0 0 1-1-1v-4.8a3 3 0 0 1 .4-1.5L5.2 5A2 2 0 0 1 6.9 4h21.6a2 2 0 0 1 2 2v12.5H28M9 18.5h14',
    'M4.5 11.5 7 6.5h3v5zM13 6.5h6v5h-6zM22 6.5h6v5h-6z',
    'M11.5 13.5v3M18 14.5h2',
  ],
  Pickup: [
    'M4 18.5H2.5a1 1 0 0 1-1-1v-5a1.5 1.5 0 0 1 1.2-1.5L7 10l3-4h7a2 2 0 0 1 2 2v3h11.5v7.5H28M9 18.5h14',
    'M7 10h12M13 6v4M21.5 11v3.5h9',
  ],
};
