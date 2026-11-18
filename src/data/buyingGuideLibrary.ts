import {trustPages, type TrustBlock, type TrustIconName} from './trustContent';
import type {GuideEditorial} from './guideEditorial';
import {procurementGuides} from './procurementGuides';

export const buyingGuidePath = '/export-services/buying-guide/';
export const buyingGuideUpdated = '2026-11-06';
export const buyingGuideInquiry = '/quote/?service=buying-guide';
export const guideArticlePath = (slug: string) => buyingGuidePath + slug + '/';

type GuideEntry = {
  slug: string;
  title: string;
  description: string;
  anchors?: string[];
  href?: string;
  block?: TrustBlock;
};

type GuideCategory = {
  id: string;
  name: string;
  icon: TrustIconName;
  entries: GuideEntry[];
};

function newGuide(slug: string): GuideEntry {
  const {title, description} = procurementGuides[slug];
  return {slug, title, description};
}

function existingBlock(id: string): TrustBlock {
  const block = trustPages['buying-guide'].blocks.find(item => item.id === id);
  if (!block) throw new Error('Missing buying guide content: ' + id);
  return block;
}

const categories: GuideCategory[] = [
  {
    id: 'getting-started', name: 'Getting started', icon: 'car',
    entries: [
      {
        slug: 'how-to-buy-cars-from-china', title: 'How to buy cars from China in six steps',
        description: 'Follow a vehicle order from the first sourcing brief to arrival. See what records to review before moving to the next step.',
        anchors: ['process'], block: existingBlock('process'),
      },
      {
        slug: 'new-vs-used-cars', title: 'New or used cars for your import order?',
        description: 'Compare the evidence, preparation and costs behind a new-car offer and an offer for a specific used car.',
        block: {
          id: 'compare-new-used', title: 'What to request for each type of offer',
          body: 'Use the same destination, quantity and delivery point for both options. Then compare what your team still has to verify or arrange.',
          kind: 'comparison', columns: ['New cars', 'Used cars'],
          rows: [
            ['Ask for the exact trim, production timing and which equipment is included. Confirm how the seller will identify each car before release.', 'Ask for the VIN, registration date and current odometer reading for the individual car. Check whether it is still available.'],
            ['Check the market version against your local equipment, documentation and registration needs.', 'Review dated photos and the inspection findings. Allow for any agreed repairs and ask who pays for them.'],
            ['Ask which warranty, software and parts support apply in your market, and who provides them.', 'Check the usable life of wear items and any remaining coverage. Price parts, diagnosis and preparation separately.'],
          ],
          paragraphs: ['If either option depends on a vehicle substitution, put the acceptable changes in writing before comparing the offers. A substitute with a different model year, charging connector or trim can change both the cost and whether the car suits your destination.'],
          links: [{label: 'Browse new cars', href: '/new-cars/'}, {label: 'Browse used cars', href: '/used-cars/'}],
        },
      },
    ],
  },
  {
    id: 'vehicle-and-destination', name: 'Vehicle and destination', icon: 'globe',
    entries: [
      {
        slug: 'check-car-import-eligibility', title: 'Can you import and register this version?',
        description: 'Check a China-market car against local requirements for registration, equipment, charging and connected features.',
        anchors: ['destination', 'destination-check'], block: existingBlock('destination'),
      },
      {
        slug: 'compare-car-specifications', title: 'How to compare car specifications',
        description: 'Compare exact versions using the same units, equipment scope and test conditions.',
        href: '/guides/comparisons/',
      },
      newGuide('chinese-ev-charging-standards'),
    ],
  },
  {
    id: 'pricing-and-payment', name: 'Quotes, costs and payment', icon: 'wallet',
    entries: [
      {
        slug: 'compare-car-export-quotes', title: 'How to compare car export quotes',
        description: 'Review the vehicle, seller, price, inspection terms and handover details on competing written offers.',
        anchors: ['quotation'], block: existingBlock('quotation'),
      },
      newGuide('request-wholesale-car-quote'),
      {
        slug: 'exw-fob-cif-car-shipping', title: 'EXW, FOB and CIF for car shipping',
        description: 'Compare where delivery takes place, when risk passes and which transport costs each trade term covers.',
        anchors: ['trade-terms'], block: existingBlock('trade-terms'),
      },
      {
        slug: 'calculate-car-landed-cost', title: 'How to calculate a car’s landed cost',
        description: 'Build a per-vehicle estimate that accounts for freight, duties, port charges, registration and local delivery.',
        block: {
          id: 'cost-worksheet', title: 'Build a per-car cost worksheet',
          body: 'Compare the same version at the same destination. Use one currency and record the date and source of each estimate.',
          kind: 'records', columns: ['Cost', 'What to enter'],
          rows: [
            ['Vehicle and origin costs', 'Start with the dated offer. Record the vehicle price, preparation and any origin handling or inland transport charged separately.'],
            ['Freight and insurance', 'Use the forwarder’s price for the named route. Split a batch charge across the vehicles on the same basis in every comparison. Note the cover and deductible.'],
            ['Import duties and taxes', 'Ask your destination broker which valuation basis, classification and charges apply to the exact vehicle. Record the answer and mark figures awaiting confirmation.'],
            ['Port and broker charges', 'Ask for terminal handling, customs brokerage and release charges. Note the collection deadline and what storage would cost if you miss it.'],
            ['Registration and local delivery', 'Add any required inspection, registration, plates and transport from the collection point to your premises.'],
          ],
          paragraphs: ['A freight charge already included in an offer belongs in the worksheet once. Keep a separate subtotal for estimated or unconfirmed costs so you can see how much of the final number may still change.'],
          links: [{label: 'Download the purchase checklist', href: '/downloads/vehicle-purchase-checklist.txt'}],
        },
      },
      {
        slug: 'car-order-payment-and-changes', title: 'Payment stages and changes to a car order',
        description: 'Confirm the beneficiary, the evidence due at each payment stage and what happens when a vehicle or schedule changes.',
        anchors: ['payment'],
        block: {
          id: 'payment-checks', title: 'What to agree before transferring money',
          body: 'Put each payment milestone next to the evidence you expect to receive. Use the terms in your written order to decide whether a milestone has been met.',
          kind: 'brief',
          items: [
            {title: 'Identify the seller and payee', body: 'Compare the name on the offer, contract and payment instructions. If the beneficiary differs, ask the seller to document the arrangement. Verify any account change with an established contact using a number you already know.', icon: 'fingerprint'},
            {title: 'Tie each payment to evidence', body: 'For each instalment, record the amount, currency and what must happen first. Examples include identifying the car or batch, receiving the agreed inspection findings or obtaining the transport record specified in the order.', icon: 'document'},
            {title: 'Approve changes in writing', body: 'If a seller proposes a different trim, price or dispatch date, ask for a revised offer showing the effect on cost and timing. Refer to the agreed cancellation and refund terms before approving the change.', icon: 'check'},
          ],
        },
      },
    ],
  },
  {
    id: 'used-car-inspection', name: 'Used car inspection', icon: 'inspection',
    entries: [
      {
        slug: 'inspect-a-used-car-from-china', title: 'Used car checks before you accept the vehicle',
        description: 'Match VIN and registration records, review mileage evidence and agree what the inspection should cover.',
        anchors: ['used-car-checks'], block: existingBlock('used-car-checks'),
      },
      newGuide('verify-chinese-used-car-before-payment'),
      {
        slug: 'used-ev-battery-report', title: 'How to read a used EV battery report',
        description: 'Check what a battery reading measures, whether it belongs to the car on offer and what a follow-up test should cover.',
        block: {
          id: 'battery-report', title: 'Three checks for the battery evidence',
          body: 'Ask for a dated report for the exact vehicle. A dashboard range estimate can help start a conversation about condition, but it depends on how the vehicle has been used.',
          kind: 'brief',
          items: [
            {title: 'Match the report to the car', body: 'Check the VIN, report date, odometer reading and who carried out the check. Ask whether the battery has been repaired or replaced and request the available records.', icon: 'fingerprint'},
            {title: 'Ask what the percentage measures', body: 'If the report gives a state-of-health percentage, ask how it was produced, what it was compared with and whether it is a diagnostic estimate or the result of a capacity test.', icon: 'battery'},
            {title: 'Check operation and open questions', body: 'Agree which charging functions and warning codes the provider will check. For damage, unresolved faults or an unexplained reading, agree what further evidence you need before accepting the car.', icon: 'inspection'},
          ],
          links: [{label: 'UNECE background on battery durability', href: 'https://unece.org/sites/default/files/2023-01/ECE_TRANS_180a22app1e.pdf'}],
        },
      },
    ],
  },
  {
    id: 'shipping-and-documents', name: 'Shipping and documents', icon: 'ship',
    entries: [
      {
        slug: 'car-import-documents-checklist', title: 'Car import documents checklist',
        description: 'Know which records to request at order, inspection, loading, release and arrival.',
        anchors: ['documents'], block: existingBlock('documents'),
      },
      {
        slug: 'container-vs-roro-car-shipping', title: 'Container or RoRo shipping for cars?',
        description: 'Compare two transport offers by route, vehicle acceptance, handover responsibilities and total cost.',
        block: {
          id: 'shipping-options', title: 'Compare the same order on both services',
          body: 'Give each forwarder the same vehicle list, dimensions, condition and destination. Ask them to confirm whether they can take the cars as described and what the quoted service includes.',
          kind: 'comparison', columns: ['Container', 'Roll-on/roll-off (RoRo)'],
          rows: [
            ['Ask what container or loading plan is proposed for your mix of vehicles and who is responsible for loading and securing them.', 'Ask which sailings accept your vehicle types and dimensions, and what running condition the carrier requires.'],
            ['Confirm where loading takes place, how the load will be documented and which handling fees are included.', 'Confirm the receiving terminal, when vehicles must be delivered to it and when they can be collected at destination.'],
            ['Ask the carrier how it handles electric, hybrid or damaged vehicles and what it needs at booking.', 'Ask the carrier whether the cars’ powertrain, condition or included equipment affects acceptance.'],
          ],
          paragraphs: ['Ask both forwarders to identify the named ports, any transfers, the collection window and the cost of services left out. Use the same vehicle list and destination charges before comparing the total.'],
          links: [{label: 'Review shipping and handover services', href: '/export-services/shipping-support/'}],
        },
      },
    ],
  },
  {
    id: 'arrival-and-support', name: 'Arrival and after-sales', icon: 'support',
    entries: [
      {
        slug: 'vehicle-arrival-checklist', title: 'What to check when your cars arrive',
        description: 'Prepare for collection, compare the cars with the departure records and document any discrepancies.',
        block: {
          id: 'arrival-checks', title: 'A checklist for the receiving team',
          body: 'Send the receiving party the vehicle list and departure evidence before collection. Agree who will record the condition and who receives a discrepancy report.',
          kind: 'brief',
          items: [
            {title: 'Prepare for release', body: 'Confirm the collection deadline and release instructions with the forwarder. Give your broker the documents they asked for and make sure the collecting party knows who to contact at the terminal.', icon: 'document'},
            {title: 'Check the vehicles against the file', body: 'Match vehicle identifiers and quantities, then compare visible condition with the departure photos. Check the agreed keys, tools and accessories. Keep a dated record of anything missing or different.', icon: 'inspection'},
            {title: 'Report discrepancies promptly', body: 'Photograph the affected area and the vehicle reference. Keep the transport and condition records together, follow the applicable notice process and confirm who will review the issue.', icon: 'camera'},
          ],
        },
      },
      {
        slug: 'car-warranty-and-after-sales', title: 'Warranty and after-sales support',
        description: 'Find out what support applies in your destination and who handles diagnosis, repair approvals and costs.',
        anchors: ['warranty'], block: existingBlock('warranty'),
      },
    ],
  },
];

export const buyingGuideCategories = categories.map(category => ({
  ...category,
  entries: category.entries.map(entry => {
    const editorial = procurementGuides[entry.slug];
    return editorial ? {...entry, title: editorial.title, description: editorial.description} : entry;
  }),
}));

export function guideEntryHref(entry: GuideEntry) {
  return entry.href ?? guideArticlePath(entry.slug);
}

type BuyingGuideArticle = GuideEntry & {category: GuideCategory; editorial?: GuideEditorial};
export const buyingGuideArticles = buyingGuideCategories.flatMap(category =>
  category.entries.flatMap((entry): BuyingGuideArticle[] => {
    const editorial = procurementGuides[entry.slug];
    return editorial || entry.block ? [{...entry, editorial, category}] : [];
  }),
);
