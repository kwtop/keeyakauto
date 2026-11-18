/** URL helpers shared with hydrated components, without importing the catalog. */
type Kind = 'new' | 'used';
export const vehicleHref = (vehicle: {kind:Kind;brandSlug:string;slug:string}) =>
  `/${vehicle.kind === 'new' ? 'new-cars' : 'used-cars'}/${vehicle.brandSlug}/${vehicle.slug}/`;
export const brandHref = (kind:Kind, slug:string) => `/${kind === 'new' ? 'new-cars' : 'used-cars'}/${slug}/`;
