import sizes from './homeHeroSizes.json';

const base = '/images/home-architectural-selected-20261019/';

export function homeHero(name: keyof typeof sizes) {
  const size = sizes[name];
  return {
    src: `${base}${name}.webp`,
    width: size.width,
    height: size.height,
    srcset: size.widths.map(width => `${base}${name}${width === size.width ? '' : `-${width}`}.webp ${width}w`).join(', '),
  };
}
