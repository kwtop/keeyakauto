/** Official public-site brand assets for the approved homepage revision.
 * Source provenance: docs/home-revision-20261019/BRAND-SOURCES.json.
 * These assets identify catalog brands; they do not establish dealer status or brand authorization.
 * href is only the existing default route; generate brandHref(kind, slug) for a specific tab.
 */
export type HomeBrandAsset = {
  slug: string;
  name: string;
  href: string;
  src: string;
  width: number;
  height: number;
  /** Suggested visual width in px, preserving the original aspect ratio. */
  displayWidth: number;
  alt: string;
  sourcePage: string;
  sourceAsset: string;
  format: 'svg' | 'png';
};

export const homeBrandAssets: readonly HomeBrandAsset[] = [
  {
    "slug": "toyota",
    "name": "Toyota",
    "href": "/new-cars/toyota/",
    "src": "/images/home-revision-20261019/brands/toyota.svg",
    "width": 838,
    "height": 224,
    "displayWidth": 124,
    "alt": "Toyota logo",
    "sourcePage": "https://www.toyota.com/",
    "sourceAsset": "https://delivery.tcom.assetscs.toyota.com/adobe/assets/urn:aaid:aem:caee6520-2e75-4408-b632-247c747a3e53/as/VIS_toyota_logo_horiz_black_RGB_2023.svg",
    "format": "svg"
  },
  {
    "slug": "byd",
    "name": "BYD",
    "href": "/new-cars/byd/",
    "src": "/images/home-revision-20261019/brands/byd.png",
    "width": 118,
    "height": 72,
    "displayWidth": 60,
    "alt": "BYD logo",
    "sourcePage": "https://www.bydglobal.com/cn/media-resources",
    "sourceAsset": "https://www.bydglobal.com/material/group-official-website/common/logo.png",
    "format": "png"
  },
  {
    "slug": "volkswagen",
    "name": "Volkswagen",
    "href": "/new-cars/volkswagen/",
    "src": "/images/home-revision-20261019/brands/volkswagen.svg",
    "width": 24,
    "height": 24,
    "displayWidth": 48,
    "alt": "Volkswagen logo",
    "sourcePage": "https://www.vw.com.hk/zh.html",
    "sourceAsset": "https://www.vw.com.hk/zh.html#inline-svg-Volkswagen",
    "format": "svg"
  },
  {
    "slug": "geely",
    "name": "Geely",
    "href": "/new-cars/geely/",
    "src": "/images/home-revision-20261019/brands/geely.svg",
    "width": 109,
    "height": 59,
    "displayWidth": 78,
    "alt": "Geely logo",
    "sourcePage": "https://global.geely.com/",
    "sourceAsset": "https://global.geely.com/#__JSS_STATE__-footer-logo",
    "format": "svg"
  },
  {
    "slug": "jetour",
    "name": "Jetour",
    "href": "/new-cars/jetour/",
    "src": "/images/home-revision-20261019/brands/jetour.svg",
    "width": 212,
    "height": 20,
    "displayWidth": 124,
    "alt": "Jetour logo",
    "sourcePage": "https://jetourglobal.com/",
    "sourceAsset": "https://jetourglobal.com/#inline-css-i-jietu-logo",
    "format": "svg"
  },
  {
    "slug": "wuling",
    "name": "Wuling",
    "href": "/new-cars/wuling/",
    "src": "/images/home-revision-20261019/brands/wuling.svg",
    "width": 247,
    "height": 50,
    "displayWidth": 124,
    "alt": "Wuling logo",
    "sourcePage": "https://wuling.id/en",
    "sourceAsset": "https://wuling.id/assets/images/header/svg/wuling-logo-new-2026-black.svg",
    "format": "svg"
  },
  {
    "slug": "lexus",
    "name": "Lexus",
    "href": "/used-cars/lexus/",
    "src": "/images/home-revision-20261019/brands/lexus.svg",
    "width": 46,
    "height": 33,
    "displayWidth": 64,
    "alt": "Lexus logo",
    "sourcePage": "https://www.lexus.com/",
    "sourceAsset": "https://www.lexus.com/content/dam/lexus/content-fragments/navigation/global-nav-v2/assets/lexus-logo.svg",
    "format": "svg"
  },
  {
    "slug": "mercedes-benz",
    "name": "Mercedes-Benz",
    "href": "/used-cars/mercedes-benz/",
    "src": "/images/home-revision-20261019/brands/mercedes-benz.png",
    "width": 2050,
    "height": 2050,
    "displayWidth": 48,
    "alt": "Mercedes-Benz logo",
    "sourcePage": "https://www.mbusa.com/en/home",
    "sourceAsset": "https://www.mbusa.com/content/dam/mb-nafta/us/Homepage/MB-star_n_2D_3Cweb-dark.png",
    "format": "png"
  },
  {
    "slug": "audi",
    "name": "Audi",
    "href": "/used-cars/audi/",
    "src": "/images/home-revision-20261019/brands/audi.svg",
    "width": 52,
    "height": 18,
    "displayWidth": 108,
    "alt": "Audi logo",
    "sourcePage": "https://www.audi.com/en",
    "sourceAsset": "https://static.audi.com/assets/images/frontend/rings18-2GJCA2FU.svg",
    "format": "svg"
  },
  {
    "slug": "bmw",
    "name": "BMW",
    "href": "/used-cars/bmw/",
    "src": "/images/home-revision-20261019/brands/bmw.svg",
    "width": 340,
    "height": 340,
    "displayWidth": 48,
    "alt": "BMW logo",
    "sourcePage": "https://www.bmwhk.com/en/index.html",
    "sourceAsset": "https://www.bmwhk.com/content/dam/bmw/common/images/logo-icons/BMW/BMW_Grey-Colour_RGB.svg.asset.1756199978277.svg",
    "format": "svg"
  }
];
