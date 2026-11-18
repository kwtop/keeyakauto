import images from './innerGuideImages.json';

// Inner-page ImageGen illustrations are isolated from homepage/catalog imagery.
export function innerGuideImage(name: keyof typeof images) {
 return images[name];
}
