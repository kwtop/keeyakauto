import type {Vehicle} from './catalog';
import {vehicleDisplayImage} from './imageDelivery';
import usedPhotoDelivery from './used-car-photo-delivery.json';

const delivery = usedPhotoDelivery as Record<string, {src: string; srcSet: string; width: number; height: number}>;

export function galleryThumbnailPath(src: string): string {
  return src.replace('/images/', '/images/gallery-thumbnails/') + '.webp';
}

export function vehicleGalleryPhotos(vehicle: Vehicle) {
  // Editorial scene covers belong to listing cards; details open on the model's own gallery.
  const references = vehicle.gallery?.length
    ? vehicle.gallery
    : [{src: vehicle.image, alt: vehicle.name + ' model reference', original: vehicle.image}];
  const photos = references.map(photo => {
    const asset = vehicle.kind === 'used' ? delivery[photo.src] : undefined;
    return {
      src: asset?.src ?? vehicleDisplayImage(photo.src),
      srcSet: asset?.srcSet,
      original: photo.original || photo.src,
      alt: photo.alt,
      scene: false,
      width: asset?.width ?? 1448,
      height: asset?.height ?? 1086,
    };
  });
  return photos;
}
