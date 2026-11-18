// Public identity and company records; passenger-car order roles remain order-specific.
const phone = '+8617357146027';

export const company = {
  legalName: 'Zhejiang Jingyan Technology Co., Ltd.',
  brand: 'KEEYAK',
  officeAddress: 'Building 1, Future Center, Yuhang District, Hangzhou, Zhejiang, China',
  email: 'contact@keeyak.com',
  phone,
  whatsapp: `https://wa.me/${phone.slice(1)}`
};

export const companyProfile = {
  modified: '2026-11-16',
  description: 'KEEYAK has worked in vehicle exports since 2009, with a 110,000 m² conversion plant in Suizhou and services from vehicle sourcing to sea freight.',
  paragraphs: [
    'Zhejiang Jingyan Technology Co., Ltd. (KEEYAK) has worked in passenger car exports and automotive trade since 2009. Headquartered in Zhejiang, China, we own a vehicle conversion plant in Suizhou, Hubei, covering approximately 110,000 square metres. Our work includes research and development, vehicle conversions and exports for passenger cars and special-purpose vehicles.',
    "We are registered with China's Ministry of Commerce (MOFCOM) for used vehicle exports. With more than a decade in overseas markets, we serve customers across Africa, the Middle East, Central and South America, and Russia.",
    'Our service covers vehicle sourcing, inspection and conversions, customs clearance and sea freight. We work with customers worldwide to supply quality vehicles that suit their requirements and offer good value.'
  ]
};

export const aboutLinks = [
  { label: 'Company Profile', href: '/about/company-profile/' },
  { label: 'News & Events', href: '/about/news/' }
];

// Public category roles retained; passenger-car contacts are assigned on inquiry.
export const people = [
  {name:'Isa',image:'/images/company/records/isa.webp',role:'Vehicle Category Lead',scope:'Emergency & rescue vehicles'},
  {name:'Alicia June',image:'/images/company/records/alicia-june.webp',role:'Vehicle Category Lead',scope:'Sanitation & tanker vehicles'},
  {name:'Frank Pan',image:'/images/company/records/frank-pan.webp',role:'Vehicle Category Lead',scope:'Construction & special-purpose vehicles'},
  {name:'Mia Fu',image:'/images/company/records/mia-fu.webp',role:'Vehicle Category Lead',scope:'Logistics & cargo vehicles'}
];

export const companyDocuments = [
  {name:'INAPA 2024 participation',image:'inapa-2024',holder:'Zhejiang Jingyan Technology Co., Ltd.',description:'Participation recognition for the Indonesia automotive-industry exhibition.'},
  {name:'ExpoMecánica Perú 2024',image:'peru-exhibition-2024',holder:'KEEYAK Special Automobile',description:'Exhibitor participation record under the KEEYAK brand name.'},
  {name:'Ashgabat exhibition 2024',image:'ashgabat-2024',holder:'ZHENJIANG JINGYAN TECHNOLOGY CO., LTD. (KEEYAK, as printed)',description:'Exhibition participation diploma.'},
  {name:'UZTECH TRANS EXPO 2023',image:'uztech-2023',holder:'Zhejiang Jingyan Keeyak Technology Co., Ltd. (as printed)',description:'Exhibition certificate with the holder name shown as printed.'},
  {name:'Automechanika Astana 2023',image:'astana-2023',holder:'KEEYAK',description:'Participant diploma under the brand name.'},
  {name:'Alibaba FY26 recognition',image:'alibaba-fy26-recognition',holder:'Zhejiang Jingyan Technology Co., Ltd.',description:'Platform merchant recognition, distinct from vehicle certification.'},
  {name:'Supplier certificate 2026',image:'supplier-certificate-2026',holder:'Zhejiang Jingyan Technology Co., Ltd.',description:'Supplier-assessment certificate from the company document archive.'}
];
