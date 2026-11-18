import type {Vehicle} from './catalog';

// Selected from the Google Keyword Planner historical query, 2026-11-16.
// Research evidence and volume ranges stay in docs/corolla-keyword-research-20261116.
export const corollaCoreKeywords=[
 'Toyota Corolla specifications',
 '2026 Toyota Corolla specs',
 'Toyota Corolla dimensions',
 'Toyota Corolla engine specifications',
 'Toyota Corolla engine size',
 'Toyota Corolla CVT transmission',
 'Toyota Corolla hybrid transmission',
 'Toyota Corolla fuel consumption',
 'Toyota Corolla hybrid specs',
 'Toyota Corolla hybrid fuel consumption',
 'Toyota Corolla 1.2 turbo',
 'Toyota Corolla 1.8 hybrid',
 'Toyota Corolla price in China',
 'Toyota Corolla left hand drive',
 'Toyota Corolla seating capacity',
];

export function isNewCorolla(vehicle:Pick<Vehicle,'kind'|'name'>){
 return vehicle.kind==='new'&&vehicle.name==='Toyota Corolla';
}
