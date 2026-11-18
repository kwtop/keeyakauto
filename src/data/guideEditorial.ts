export type GuideLink = {label: string; href: string};
export type GuideSource = GuideLink & {id: string};
export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  table?: {caption: string; headers: string[]; rows: string[][]};
  template?: string;
  calculator?: boolean;
  sources?: string[];
  links?: GuideLink[];
  questions?: {question: string; answer: string}[];
};
export type GuideImage = 'quote' | 'inspection' | 'battery' | 'charging' | 'ports' | 'documents';
export type GuideEditorial = {
  title: string;
  description: string;
  answer: string;
  image: GuideImage;
  sections: GuideSection[];
  sources?: GuideSource[];
  links: GuideLink[];
  reviewed: string;
};

export const destinationPath = '/export-services/buying-guide/#country-guides';
export const countryGuideRoot = '/export-services/buying-guide/countries/';
export const countryGuidePath = (slug: string) => countryGuideRoot + slug + '/';
export const purchaseGuidePath = (slug: string) => '/export-services/buying-guide/' + slug + '/';
export const guideImageRoot = '/images/procurement-guides-20261105/';
export const guideImageAlt: Record<GuideImage, string> = {
  quote: 'Quotation sheets, a calculator and a car key on a desk',
  inspection: 'A technician checking the driver-side door opening of a car',
  battery: 'A technician using a diagnostic tablet beside a car',
  charging: 'A vehicle charging flap and a separate cable',
  ports: 'Passenger cars seen from the side at a freight terminal',
  documents: 'Vehicle documents and a car key on a desk',
};
