import assets from './trustMedia.json';
import refinementMedia from './editorialRefinementMedia.json';
import exportGuideMedia from './exportGuideMedia.json';

export type TrustMedia = { src: string; srcset: string; width: number; height: number; original?: string; kind: 'concept' | 'refined' | 'original'; alt: string; caption?: string };
const descriptions: Record<string, string> = {
  'new-car-configuration': 'AI-generated illustration of a buyer and adviser comparing seat controls and interior equipment in a new passenger car',
  'used-car-record-check': 'AI-generated illustration of an inspector checking a used car identification label against the vehicle photograph',
  'export-dispatch-handover': 'AI-generated illustration of a coordinator reviewing a dispatch checklist beside a car and road transporter',
  'vehicle-request-planning': 'AI-generated illustration of a buyer comparing a yellow BYD Dolphin hatchback and a white Zeekr 009 van; not company inventory or an exact configuration',
  'support-coverage-review': 'AI-generated illustration of an adviser and technician reviewing support responsibilities and repair approval',
  'vehicle-search-brief': 'AI-generated illustration of an adviser and buyer comparing a white Zeekr 009 van and a grey Geely Monjaro SUV in a sunlit pavilion; not company premises or inventory',
  'destination-compatibility-check': 'AI-generated illustration of a technician comparing charging connectors with an electric car socket',
  'vehicle-quotation-review': 'AI-generated illustration of an adviser comparing two itemised vehicle offers with a buyer',
  'vehicle-records-review': 'AI-generated illustration comparing a vehicle identification photograph with the matching car record',
  'inspection-scope-check': 'AI-generated illustration of an inspector measuring tyre tread depth on a parked passenger car',
  'inspection-report-review': 'AI-generated illustration of colleagues reviewing inspection findings and supporting vehicle photographs',
  'acceptance-check': 'AI-generated illustration of an inspector and supplier representative examining a marked car-body area before acceptance',
  'shipping-route-coordination': 'AI-generated illustration of a coordinator reviewing a transport route beside cars and a road transporter',
  'departure-condition-record': 'AI-generated illustration of a worker photographing a passenger car wheel and body panel before transport',
  'arrival-item-check': 'AI-generated illustration of a receiver checking car keys, a charging cable and documents against a supplied-item list',
  'support-order-review': 'AI-generated illustration of an adviser reviewing a vehicle order folder during a support call',
  'parts-reference-match': 'AI-generated illustration comparing a headlamp connector with a vehicle-part reference photograph',
  'support-issue-report': 'AI illustration of an owner photographing an amber dashboard warning light and mileage for an after-sales issue report',
  'shipping-document-review': 'AI illustration of a coordinator comparing a vehicle identification sheet and transport documents beside a car key, with a sedan at the dispatch bay',
  'vehicle-offer-review': 'AI-generated illustration of a navy BYD Seal sedan, white Volkswagen ID.4 SUV and graphite Zeekr 009 van on a sunlit terrace; not company premises or inventory',
  'buying-guide-multibrand': 'AI-generated illustration of a green Geely Monjaro SUV and white GWM Poer pickup beside a purchase-planning desk; not a vehicle offer or company inventory',
  'vehicle-inspection-evidence': 'AI illustration of a technician taking a paint-thickness reading on a silver car body panel',
  'vehicle-handover-record': 'AI illustration of a receiver photographing a car at handover, with keys and a checklist nearby',
  'vehicle-parts-identification': 'AI illustration comparing two headlamp assemblies with different electrical connectors',
  'transport-roro': 'AI-generated illustration of a grey Volkswagen ID.4 SUV at a roll-on/roll-off terminal; not a shipment record',
  'transport-container': 'AI-generated illustration of a blue BYD Seal sedan inside an open container; not a loading instruction or shipment record',
  'transport-overland': 'AI-generated illustration of a Mercedes-Benz Actros road transporter with its three-pointed-star grille emblem, carrying a GWM Poer pickup, Geely Monjaro SUV and Volkswagen ID.4 SUV; not evidence of a specific route or delivery',
  'market-compatibility': 'AI-created illustration of a red Volkswagen ID.3 with its genuine VW emblem beside a charging pedestal; not a claim of local charging compatibility',
  'parts-review': 'AI-created illustration of a Toyota Camry and example parts on a workshop bench; not evidence of a repair or part compatibility',
  'office-original': 'Original company photograph of KEEYAK colleagues and visitors at the office',
  'team-original': 'Original company photograph of KEEYAK colleagues at the January 2026 annual gathering',
  'vietnam-original': 'Original company photograph of the KEEYAK special-vehicle exhibition stand in Vietnam in May 2026',
  'indonesia-original': 'Original company photograph of the KEEYAK stand at INAPA Indonesia in May 2024',
  'algeria-original': 'Original company photograph of a KEEYAK colleague and visitor at the Algeria special-vehicle exhibition',
  'mexico-original': 'Original company photograph of KEEYAK colleagues and visitors at the February 2026 Mexico exhibition',
  'spring2025-original': 'Original company photograph of the KEEYAK Spring Festival office gathering in January 2025',
  'spring2023-original': 'Original company photograph of the KEEYAK Spring Festival gathering in January 2023',
  'lake-overview': 'Illustration of a silver Toyota Camry and red Volkswagen ID.3 beside a mountain lake, retaining their genuine Toyota and Volkswagen emblems',
  'mountain-guide': 'Illustration of a white Toyota RAV4 with its Toyota emblem at a mountain and lake viewpoint',
  'support-branded': 'AI-generated illustration of a technician reviewing a tablet beside a pale-blue AION Y electric crossover; not a workshop record or diagnosis',
  'loading-check': 'Illustration of a pre-departure condition photograph of a white Toyota RAV4 with its Toyota grille emblem at a harbor',
  'chongqing-original': 'Original company photograph of KEEYAK colleagues in Chongqing in September 2025, without AI retouching',
  'sourcing-branded': 'AI-generated illustration of a blue BMW 3 Series sedan and a white BYD Song Plus SUV in a sunlit stone pavilion; not company premises or inventory',
  shipping: 'AI-generated illustration of a silver BYD Seal sedan and a blue Volkswagen ID.4 SUV at a coastal vehicle terminal; not a shipment record',
  handover: 'Illustration of a Toyota Camry and a key at a vehicle receiving bay',
  inspection: 'Illustration of a paintwork check on a silver Toyota Camry using a thickness gauge',
  records: 'Illustrative vehicle purchasing workspace with blank document sheets, a key and a Toyota Camry',
  planning: 'Illustrative purchase planning workspace with a map, key and a Toyota Camry scale model retaining its Toyota emblem',
  support: 'Illustrative diagnostic tablet and technician at a passenger car',
  parts: 'Illustrative parts review workspace with a Toyota Camry behind the bench',
  office: 'AI-refined photograph of KEEYAK colleagues and visitors at the office; original available',
  vietnam: 'AI-refined photograph of the KEEYAK special-vehicle exhibition stand in Vietnam in May 2026',
  algeria: 'AI-refined photograph of a KEEYAK colleague and visitor at the Algeria special-vehicle exhibition',
  team: 'AI-refined photograph of the KEEYAK team at the 2026 annual gathering',
  indonesia: 'AI-refined photograph of a discussion at the KEEYAK INAPA Indonesia stand in 2024',
  mexico: 'AI-refined photograph of KEEYAK colleagues and visitors at the Mexico exhibition in 2026',
  chongqing: 'AI-refined photograph of the KEEYAK team in Chongqing in September 2025',
  spring2025: 'AI-refined photograph of the KEEYAK Spring Festival office gathering in 2025',
  spring2023: 'AI-refined photograph of the KEEYAK Spring Festival gathering in 2023'
};
export const storyMedia: Record<string, string> = {
  'vietnam-exhibition-2026': 'vietnam-original',
  'algeria-exhibition-2026': 'algeria-original',
  'annual-gathering-2026': 'team-original',
  'indonesia-exhibition-2024': 'indonesia-original',
  'mexico-exhibition-2026': 'mexico-original',
  'chongqing-team-day-2025': 'chongqing-original',
  'spring-festival-2025': 'spring2025-original',
  'spring-festival-2023': 'spring2023-original'
};
const originalSizes: Record<string, [number, number]> = {
  office:[1600,1200],team:[1800,1350],vietnam:[1707,1280],indonesia:[1800,1350],
  algeria:[1800,2400],mexico:[1706,1279],spring2025:[2400,1730],spring2023:[1800,1350]
};
const captions: Record<string, string> = {
  'support-issue-report': 'Photograph the warning, record the mileage and describe when the issue appears.',
  'shipping-document-review': 'Match the vehicle identifiers and receiving party across the order and shipping documents.',
  'vehicle-offer-review': 'Compare the exact version and included services before comparing totals.',
  'vehicle-inspection-evidence': 'A paint reading needs its location, method and context in the inspection report.',
  'vehicle-handover-record': 'Dated condition photos and a supplied-item list help with the arrival check.',
  'vehicle-parts-identification': 'Similar-looking parts can have different connectors. Match the vehicle and part details.'
};
export function trustMedia(key: string): TrustMedia {
  const guideImage=(exportGuideMedia as Record<string,TrustMedia>)[key];
  if(guideImage)return guideImage;
  const refined=(refinementMedia as Record<string,TrustMedia>)[key];
  if(refined)return refined;
  if(key==='chongqing-original')return {src:'/images/company/team-chongqing-2025.webp',srcset:'/images/company/team-chongqing-2025.webp 2400w',width:2400,height:1800,original:'/images/company/team-chongqing-2025.webp',kind:'original',alt:descriptions[key]};
  if(key.endsWith('-original')){
    const base=key.slice(0,-9);
    const original=(assets as Record<string, Omit<TrustMedia, 'alt'>>)[base]?.original;
    const size=originalSizes[base];
    if(!original||!size)throw new Error(`Missing original company image: ${key}`);
    return {src:original,srcset:`${original} ${size[0]}w`,width:size[0],height:size[1],original,kind:'original',alt:descriptions[key]};
  }
  const asset = (assets as Record<string, Omit<TrustMedia, 'alt'>>)[key];
  if (!asset) throw new Error(`Missing generated trust image: ${key}`);
  return { ...asset, alt: descriptions[key] || 'Illustrative passenger-car purchasing scene', ...(captions[key]?{caption:captions[key]}:{}) };
}
