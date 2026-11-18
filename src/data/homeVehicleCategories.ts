import type {VehicleCategory} from './vehicleCategories';

const imageRoot = '/images/home-category-showroom-aligned';
const categories: {category:VehicleCategory;slug:string;label:string;alt:string}[] = [
  {category:'Sedan',slug:'sedan',label:'Sedan',alt:'White four-door sedan in full side profile'},
  {category:'SUV',slug:'suv',label:'SUV',alt:'White SUV in full side profile'},
  {category:'Pickup',slug:'pickup',label:'Pickup',alt:'White double-cab pickup in full side profile'},
  {category:'MPV',slug:'van',label:'Van',alt:'White high-roof cargo van in full side profile'}
];

export const homeVehicleCategories = categories.map(category => ({
  ...category,
  src: `${imageRoot}/${category.slug}-640.webp`,
  srcSet: [320,480,640,960].map(width => `${imageRoot}/${category.slug}-${width}.webp ${width}w`).join(', ')
}));
