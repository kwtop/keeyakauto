import {homeBrandAssets} from './homeBrandAssets';

// Standard mark sizes for placements outside compact brand grids.
const markSizes: Record<string, [number, number]> = {
  aion:[62,26], audi:[44,20], bmw:[30,30], byd:[48,24],
  changan:[88,44], 'changan-qiyuan':[38,18], chery:[44,16],
  chevrolet:[40,18], deepal:[44,33], dfsk:[54,20],
  fangchengbao:[52,20], 'gac-trumpchi':[42,22], geely:[40,19],
  gwm:[34,24], haval:[66,22], honda:[64,18], hyundai:[40,18],
  jetour:[68,22], leapmotor:[28,24], lexus:[48,28], 'li-auto':[34,18],
  lifan:[36,21], livan:[28,32], 'mercedes-benz':[28,28], mg:[24,24],
  roewe:[58,20], ruichi:[36,20], tank:[28,30], toyota:[40,22],
  volkswagen:[25,25], wuling:[44,21], xiaomi:[23,23],
  isuzu:[66,20], jac:[50,18], jmc:[62,24], maxus:[52,33], foton:[36,36]
};

export function catalogBrandMarkStyle(slug: string) {
  const [width,height] = markSizes[slug] || [56,24];
  return {width:`${width}px`,height:`${height}px`,maxWidth:'none',maxHeight:'none',flexShrink:0,
    ...(['jac','foton'].includes(slug) ? {filter:'brightness(0)'} : {})};
}

// Fit the visible artwork, accounting for padding, shape and weight in the source marks.
const compactMarkSizes: Record<string, [number, number]> = {
  aion:[64,24], byd:[39,24], changan:[42,30], 'changan-qiyuan':[29,17],
  chery:[43,15], chevrolet:[42,16], deepal:[36,31], dfsk:[48,16],
  fangchengbao:[49,14], foton:[32,32], 'gac-trumpchi':[36,24], geely:[34,20],
  gwm:[34,24], haval:[59,16], honda:[59,16], hyundai:[35,19],
  isuzu:[50,16], jac:[45,18], jetour:[64,13], jmc:[43,16],
  leapmotor:[23,26], 'li-auto':[34,15], lifan:[31,23], livan:[16,32],
  maxus:[37,25], mg:[25,25], roewe:[56,16], ruichi:[32,22],
  tank:[22,29], toyota:[36,24], volkswagen:[26,26], wuling:[41,23], xiaomi:[22,22],
};

export function compactCatalogBrandMarkStyle(slug:string) {
  const [width, height] = compactMarkSizes[slug] ?? [42, 25];
  return {...catalogBrandMarkStyle(slug),width:`${width}px`,height:`${height}px`,maxWidth:'100%',maxHeight:'100%'};
}

// Skip captions for marks that already include the brand name.
const readableWordmarks = new Set([
  'aion', 'byd', 'changan', 'deepal', 'dfsk', 'geely', 'haval', 'honda',
  'isuzu', 'jac', 'jetour', 'jmc', 'mg', 'roewe',
]);
const shortBrandCaptions: Record<string, string> = {
  'changan-qiyuan': 'Qiyuan',
  'gac-trumpchi': 'Trumpchi',
};

export function catalogBrandCaption(slug: string, name: string) {
  if (readableWordmarks.has(slug)) return null;
  return shortBrandCaptions[slug] ?? name;
}

const additionalAssets = [
  {slug:'isuzu',src:'/images/catalog-brand-emblems/isuzu-official.png',source:'https://www.isuzu.co.jp/world/app-files/img/cmn_logo01.png'},
  {slug:'jac',src:'/images/catalog-brand-emblems/jac-wordmark.png',originalSrc:'/images/catalog-brand-emblems/jac-official.png',source:'https://jacen.jac.com.cn/_nuxt/img/logo-nav-pc.fb0453d.png'},
  {slug:'jmc',src:'/images/catalog-brand-emblems/jmc-official.png',source:'https://www.jmcglobal.com/images/logo.gif'},
  {slug:'maxus',src:'/images/catalog-brand-emblems/maxus-symbol.svg',originalSrc:'/images/catalog-brand-emblems/maxus-official.png',source:'https://cdn3.maxuscloud.com/common/static/img/logo/m.png'},
  {slug:'foton',src:'/images/catalog-brand-emblems/foton-official.png',source:'https://www.foton.com.cn/images/logo_95c72e61f147a3ea0bf90904.png'},
  {slug: 'haval', src: '/images/catalog-brand-emblems/haval-official.png', source: 'https://www.haval.com.cn/dist/site/images/home/2023/header_img/logo.png'},
  {slug: 'leapmotor', src: '/images/catalog-brand-emblems/leapmotor-official.png', source: 'https://www.leapmotor.net/images/default-source/accessories/logo-small.png?sfvrsn=f67d8281_41'},
  {slug: 'roewe', src: '/images/catalog-brand-emblems/roewe-wordmark.svg', originalSrc: '/images/catalog-brand-emblems/roewe-official.png', source: 'https://oss.roewe.com.cn/wp-content/uploads/sites/3/2023/06/logo0608.png'},
  {slug: 'li-auto', src: '/images/catalog-brand-emblems/li-auto-official.svg', source: 'https://p.ampmake.com/fed/tmp/egg-multipart-tmp/fed-server-api/2025/07/10/09/92d2ec5c-dbab-4ebc-9229-a3ca185cc967.svg'},
  {slug: 'gwm', src: '/images/catalog-brand-emblems/gwm-symbol.png', originalSrc:'/images/catalog-brand-emblems/gwm-official.png', source: 'https://www.gwm-global.com/dist/images/home-page/cc_logo-20250120.png'},
  {slug: 'mg', src: '/images/catalog-brand-emblems/mg.svg', source: 'https://media-hub-prod.mgmotor.me/assets_static/MG-logo.svg'},
  {slug: 'livan', src: '/images/catalog-brand-emblems/livan.svg', source: 'https://en.livanauto.com/static/js/app.b75fb7ee.js'},
  {slug: 'gac-trumpchi', src: '/images/catalog-brand-emblems/gac-trumpchi.svg', source: 'https://www.gacmotor.com/static/assets/imgs/logo.png?t=20260723'},
  {slug: 'changan-qiyuan', src: '/images/catalog-brand-emblems/changan-qiyuan.svg', source: 'https://www.changan.com.cn/qiyuan/img/logo_blue-2050b6af.png'},
  {slug: 'fangchengbao', src: '/images/catalog-brand-emblems/fangchengbao.svg', source: 'https://www.bydglobal.com/material/group-official-website/cn/brand/fangchengbao4.png'},
  {slug: 'aion', src: '/images/catalog-brands/aion-wordmark.svg', originalSrc: '/images/catalog-brands/aion.png', source: 'https://www.aion.com.cn/web/pc/images/change-logo-img/hd-logo.png?v=1776396748111'},
  {slug: 'changan', src: '/images/catalog-brands/changan.png', source: 'https://www.globalchangan.com/static/clientlibs/changancms/images/header/changan-auto-logo.png'},
  {slug: 'deepal', src: '/images/catalog-brands/deepal.png', source: 'https://www.globalchangan.com/static/clientlibs/changancms/images/header/deepal-logo.png'},
  {slug: 'chery', src: '/images/catalog-brand-emblems/chery.svg', source: 'https://www.cheryinternational.com/data/tms/website/html/images/header/logo-new-black.png'},
  {slug: 'hyundai', src: '/images/catalog-brand-emblems/hyundai.svg', source: 'https://www.hyundai.com/etc/designs/hyundai/ww/en/images/common/logo.png'},
  {slug: 'honda', src: '/images/catalog-brand-emblems/honda-wordmark.svg', originalSrc:'/images/catalog-brand-emblems/honda.svg', source: 'https://www.honda.com.cn/static/home/images/logo.svg'},
  {slug: 'chevrolet', src: '/images/catalog-brand-emblems/chevrolet.svg', source: 'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/primary-navigation-icons/chevrolet-logo-v2.png'},
  {slug: 'dfsk', src: '/images/catalog-brand-emblems/dfsk.svg', source: 'https://www.dfsk.com/#top-logo-fly-inline-svg'},
  {slug: 'ruichi', src: '/images/catalog-brand-emblems/ruichi-symbol.svg', originalSrc: '/images/catalog-brand-emblems/ruichi.svg', source: 'https://www.rc-ev.com/uploads/20240819/342d9bb51b4a1e8d5e20cb5cb239442c.png'},
  {slug: 'xiaomi', src: '/images/catalog-brand-emblems/xiaomi.svg', source: 'https://www.xiaomiev.com/#header-inline-svg'},
  {slug: 'tank', src: '/images/catalog-brand-emblems/tank.svg', source: 'https://res.gwm.com.cn/tank/tanksite/assets/common/images/logo.png'},
  {slug: 'lifan', src: '/images/catalog-brand-emblems/lifan.svg', source: 'https://res5.servision.com.cn/tis/home/img/logo_lifan.png'},
];

/** Shared public-site identity source: use compact emblems wherever available. */
export const catalogBrandAsset = (slug: string) => {
  const asset = homeBrandAssets.find(asset => asset.slug === slug) || additionalAssets.find(asset => asset.slug === slug);
  return asset && ['toyota', 'wuling'].includes(slug)
    ? {...asset, src: `/images/catalog-brand-emblems/${slug}.svg`}
    : asset;
};
