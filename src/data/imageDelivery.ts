import optimizedImages from './imageDeliveryMap.json';
import usedImages from './used-car-photo-delivery.json';

const smallerDeliveryImages: Record<string, string> = optimizedImages;

// Presentation-only background edits. Original photographs and model facts stay intact.
const editorialImages: Record<string, string> = {
  '/images/catalog/byd/sea-lion-06-dm-i/05.jpg': '/images/nest-site-20261019/sea-lion-06-dm-i-studio.webp',
};

export function hasEditedBackground(source: string): boolean {
  return source in editorialImages;
}

/** Choose an explicitly reviewed presentation edit or a smaller delivery copy. */
export function vehicleDisplayImage(source: string): string {
  return (usedImages as Record<string,{src:string}>)[source]?.src ?? editorialImages[source] ?? smallerDeliveryImages[source] ?? source;
}
