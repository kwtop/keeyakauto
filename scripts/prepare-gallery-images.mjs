import {mkdir, readFile, stat, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {build} from 'esbuild';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
// Use the same photo selection as the detail page, including its reviewed scene.
const {outputFiles: [bundle]} = await build({
  stdin: {
    contents: 'export {vehicles} from "./src/data/catalog"; export {vehicleGalleryPhotos, galleryThumbnailPath} from "./src/data/vehicleGallery";',
    resolveDir: root,
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  write: false,
});
const {vehicles, vehicleGalleryPhotos, galleryThumbnailPath} = await import(
  'data:text/javascript;base64,' + Buffer.from(bundle.contents).toString('base64')
);
const thumbnails = new Set(vehicles.flatMap(vehicle => {
  const photos = vehicleGalleryPhotos(vehicle);
  return photos.length > 1 ? photos.map(photo => photo.src) : [];
}));
const pathFor = url => resolve(root, 'public', url.slice(1));

async function prepareImage(source, target, width, options) {
  const input = pathFor(source);
  const output = pathFor(target);
  const inputInfo = await stat(input);
  const outputInfo = await stat(output).catch(error => {
    if (error.code !== 'ENOENT') throw error;
  });
  if (outputInfo?.mtimeMs >= inputInfo.mtimeMs) return;
  const bytes = await sharp(await readFile(input)).autoOrient()
    .resize({width, withoutEnlargement: true}).webp(options).toBuffer();
  await mkdir(dirname(output), {recursive: true});
  await writeFile(output, bytes);
}

const tasks = [
  ...Array.from(thumbnails, source => [source, galleryThumbnailPath(source), 240, {quality: 79}]),
  ...[360, 720].map(width => ['/images/brand/keeyak-wordmark.png', `/images/brand/keeyak-wordmark-${width}.webp`, width, {lossless: true}]),
];
let next = 0;
await Promise.all(Array.from({length: 4}, async () => {
  while (next < tasks.length) await prepareImage(...tasks[next++]);
}));
console.log(`Prepared ${thumbnails.size} gallery thumbnails and 2 wordmark sizes.`);
