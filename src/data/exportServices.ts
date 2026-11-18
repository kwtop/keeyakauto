import { buyingGuide, servicePages, afterSalesPage, type EditorialPage, type EditorialSection } from './editorial';

export const exportLinks = [
  { label: 'Buying Guide', href: '/export-services/buying-guide/' },
  { label: 'Sourcing & Inspection', href: '/export-services/sourcing-inspection/' },
  { label: 'Shipping & Delivery', href: '/export-services/shipping-support/' },
  { label: 'After-sales Support', href: '/export-services/after-sales/' },
  { label: 'FAQ', href: '/export-services/faq/' }
];

export type ServiceSection = EditorialSection & { aliases?: string[] };
export type ServicePage = Omit<EditorialPage, 'sections'> & { sections: ServiceSection[] };
const sourcing = servicePages.find(page => page.slug === 'vehicle-sourcing')!;
const inspection = servicePages.find(page => page.slug === 'inspection-quality')!;
const shipping = servicePages.find(page => page.slug === 'shipping-delivery')!;
function section(page: EditorialPage, id: string): EditorialSection {
  const value = page.sections.find(item => item.id === id);
  if (!value) throw new Error(`Missing service section: ${page.slug}#${id}`);
  return value;
}

export const exportBuyingGuide: ServicePage = {
  ...buyingGuide,
  label: 'Buying Guide',
  intro: 'Plan your purchase from the first requirement to the written order. Compare the offer, confirm payment terms and prepare the documents for your destination.',
  sections: buyingGuide.sections.map(item => item.id === 'warranty' ? {
    id: 'warranty', title: 'Agree support before you order',
    body: 'Confirm the warranty and after-sales arrangements for your exact vehicle and destination before agreeing the purchase.',
    points: ['Applicable territory, coverage and exclusions', 'The named support contact and available local repair options', 'Approval requirements and responsibility for diagnosis, repairs and parts costs'],
    paragraphs: ['A manufacturer warranty in the original market may not apply after export. Keep any separately agreed seller support with the order documents.'],
    links: [{ label: 'After-sales Support', href: '/export-services/after-sales/#coverage' }]
  } : item)
};

export const sourcingInspection: ServicePage = {
  slug: 'sourcing-inspection', label: 'Sourcing & Inspection', title: 'Vehicle Sourcing & Inspection',
  subtitle: 'From your vehicle requirements to confirmed availability, inspection findings and acceptance.',
  intro: 'Find the right vehicle, confirm the offer and review its condition before acceptance. Keep the requirement, vehicle details and inspection findings together.',
  cta: 'Discuss sourcing & inspection', service: 'sourcing-inspection',
  sections: [
    section(sourcing, 'requirement'),
    { ...section(sourcing, 'supply'), title: 'Confirm the vehicle and availability', aliases: ['review'],
      paragraphs: [...(section(sourcing, 'supply').paragraphs || []), section(sourcing, 'review').body],
      links: [{ label: 'Quotation checklist', href: '/export-services/buying-guide/compare-car-export-quotes/' }] },
    { ...section(inspection, 'scope'), title: 'Agree the inspection scope' },
    section(inspection, 'new-used'),
    section(inspection, 'evidence'),
    { ...section(inspection, 'exceptions'), title: 'Resolve findings before acceptance',
      paragraphs: ['Use the vehicle or order reference when requesting further records. Record agreed changes, accepted exceptions and any further checks needed.', 'If a vehicle fails an agreed check, follow the contract terms before authorising payment or release.'],
      links: [{ label: 'Payment & order changes', href: '/export-services/buying-guide/car-order-payment-and-changes/' }, { label: 'Plan shipping & handover', href: '/export-services/shipping-support/' }] }
  ]
};

export const shippingSupport: ServicePage = {
  slug: 'shipping-support', label: 'Shipping & Support', title: 'Vehicle Shipping & After-sales Support',
  subtitle: 'Plan transport, prepare handover records and find the right support after delivery.',
  intro: 'Agree how the vehicles will travel, who handles each stage and what happens at handover. Keep the same order records available if you need help after delivery.',
  cta: 'Discuss shipping & support', service: 'shipping-support',
  sections: [
    section(shipping, 'route'),
    section(shipping, 'cost'),
    section(shipping, 'pre-departure'),
    { ...section(shipping, 'handover'), title: 'Receive the vehicles and report differences',
      paragraphs: ['Compare the arrival condition with the dated photographs and inspection records. Record missing items, damage or document differences promptly and contact the person named in the order.', 'Keep the transport reference, release records and photographs. Follow the agreed insurance and claims procedure; transport damage may be handled separately from a vehicle warranty issue.'] },
    { ...section(afterSalesPage, 'coverage'), title: 'Warranty and support arrangements' },
    { ...section(afterSalesPage, 'report'), title: 'Report an issue and agree the next step', aliases: ['diagnosis', 'follow-up'],
      paragraphs: [
        'Describe any checks or repairs already carried out. Keep original photographs, readings and reports so the support contact can compare them with the inspection and handover records.',
        'Agree any local diagnosis or repair before work begins: who will carry it out, what evidence is needed, who approves it and who pays. A local diagnosis does not by itself establish warranty coverage or reimbursement.',
        'Keep the agreed action under the order reference. Ask who handles the next step and when to expect an update. Retain repair or replacement records and confirm any unresolved issues.'
      ] },
    section(afterSalesPage, 'parts')
  ]
};

export const standaloneAfterSales: ServicePage = { ...afterSalesPage, slug: 'after-sales', label: 'After-sales Support', service: 'after-sales' };
export const consolidatedServicePages = [exportBuyingGuide, sourcingInspection, shippingSupport, standaloneAfterSales];

export const legacyServiceRoutes = [
  { slug: 'about', to: '/about/' },
  { slug: 'vehicle-sourcing', to: '/export-services/sourcing-inspection/' },
  { slug: 'inspection-quality', to: '/export-services/sourcing-inspection/#scope' },
  { slug: 'shipping-delivery', to: '/export-services/shipping-support/' }
];

type FaqGroup = { id: string; title: string; intro: string; href: string; linkLabel: string; questions: { question: string; answer: string }[] };
export const exportFaqGroups: FaqGroup[] = [
  {
    "id": "choosing",
    "title": "Models and availability",
    "intro": "Choosing a model, checking stock and requesting alternatives.",
    "href": "/export-services/sourcing-inspection/",
    "linkLabel": "Vehicle sourcing and inspection",
    "questions": [
      {
        "question": "What can KEEYAK help me with when I buy a car?",
        "answer": "Tell us which cars you need, how many and where they’re going. We can help find them and arrange inspection and export. The quote names the seller, who gets paid and who provides each service."
      },
      {
        "question": "Are the cars in the catalog in stock?",
        "answer": "We check stock and price when you ask. The catalog shows which models you can inquire about. Before you buy, ask for a dated quote for the version and quantity you need."
      },
      {
        "question": "Can I include different models in one inquiry?",
        "answer": "Yes. List the quantity and essential equipment for each model, plus any alternatives you would consider. Tell us whether your budget includes inspection, transport and destination costs or just the cars."
      },
      {
        "question": "What if I have not chosen a model or version?",
        "answer": "Tell us how the cars will be used, your preferred body type and powertrain, quantity, destination and budget. Include your timing. We can use those details to narrow the search, then review the exact version and equipment in the quotation."
      },
      {
        "question": "Is there a minimum order quantity?",
        "answer": "Minimum quantities vary by model, version and supplier. Tell us how many of each model you need and we’ll check what’s available."
      },
      {
        "question": "Will a China-market EV work in my country?",
        "answer": "Compatibility depends on the version and country. Review the charging connector and functions, languages, apps, maps and connected services before ordering. Your destination adviser also needs to check import and registration eligibility; a similar model sold locally can have different features."
      }
    ]
  },
  {
    "id": "ordering",
    "title": "Pricing, orders and payment",
    "intro": "Prices, payment stages and changes to an order.",
    "href": "/export-services/buying-guide/compare-car-export-quotes/",
    "linkLabel": "Quotation and payment guide",
    "questions": [
      {
        "question": "What should I send to get a quote?",
        "answer": "Send the model and version if known, quantity, destination and preferred timing. For used cars, add your year, mileage and condition limits. Ask for a quotation that identifies the vehicles or batch, currency, validity, delivery point and included charges."
      },
      {
        "question": "Why can two quotes for the same model differ?",
        "answer": "The version, year, equipment, condition and included services can all affect the price. For example, one quote may cover only the car while another includes inspection or delivery to port. Compare the same specification and add any missing charges before comparing totals."
      },
      {
        "question": "What deposit and payment schedule apply?",
        "answer": "Your order sets the payment schedule. It should name the payment recipient and currency, deposit, later payments and vehicle-release conditions. Verify any changed payment instructions with your established contact through a known channel before sending funds."
      },
      {
        "question": "How long will sourcing and delivery take?",
        "answer": "Timing depends on vehicle availability, inspection, release, transport and destination clearance. Request a schedule for your cars and route that distinguishes confirmed dates from estimates and explains when each stage starts."
      },
      {
        "question": "What happens if a vehicle or the order changes?",
        "answer": "The contract sets the change, cancellation and refund terms. Review any replacement vehicle's specification, condition, records, price and timing before accepting it, and keep the approved change with your order."
      }
    ]
  },
  {
    "id": "inspection",
    "title": "Inspections and vehicle history",
    "intro": "Inspection reports, vehicle history and battery checks.",
    "href": "/export-services/sourcing-inspection/#scope",
    "linkLabel": "Read the inspection guide",
    "questions": [
      {
        "question": "Can I request an independent inspection?",
        "answer": "You can request one. Tell us the provider and checks you have in mind so we can review access, location and the seller's permission. Before booking, settle the date, cost and report requirements with the inspection provider."
      },
      {
        "question": "What should the inspection report contain?",
        "answer": "Look for the vehicle identifier, inspection date and location, and inspector's name. Findings need photographs, readings or records that identify what was checked and how. The report should list any omitted tests, missing records and unresolved issues."
      },
      {
        "question": "Does a paint reading prove that a car had an accident?",
        "answer": "No. A single paint-thickness reading cannot establish the cause or extent of a repair. Review the measurement location, unit, method and other evidence with the inspector, who can advise on further checks."
      },
      {
        "question": "What if some of the car’s history is missing?",
        "answer": "Review the remaining records and inspection findings before accepting the car. Missing history leaves accident and repair questions unresolved. You can request more evidence or further checks; record any exceptions you accept before release."
      },
      {
        "question": "What should I check in a used EV battery report?",
        "answer": "Check the vehicle identifier, test date, method and conditions. Ask the inspector to explain what the figure measures and its limits. The model's advertised range or battery capacity does not tell you the condition of this particular battery."
      }
    ]
  },
  {
    "id": "shipping",
    "title": "Shipping, documents and delivery",
    "intro": "Transport options, paperwork and arrival checks.",
    "href": "/export-services/shipping-support/",
    "linkLabel": "Plan shipping and handover",
    "questions": [
      {
        "question": "What are the shipping options?",
        "answer": "Options include Ro-Ro, container and overland transport where available. The route, vehicle dimensions, quantity, carrier rules and handling requirements determine which suits your shipment. Review the route proposal and loading plan before booking."
      },
      {
        "question": "What is included in a shipping quote?",
        "answer": "Each proposal should specify the handover point and which charges are included, excluded or estimated. Review domestic transport, handling, freight, insurance and destination costs separately, along with the rate's expiry and possible changes before booking."
      },
      {
        "question": "Which documents will I need to collect the cars?",
        "answer": "Your exporter, forwarder and destination importer establish the checklist for the cars and route. Documents may include a commercial invoice, packing list, transport document and applicable origin or conformity records. Review availability, drafts and the release method before dispatch."
      },
      {
        "question": "Who handles customs clearance and registration?",
        "answer": "Your order and shipping plan name the responsible parties. Your destination importer or adviser can explain who handles clearance, taxes, collection, registration and onward transport. These services are not automatically included in the freight price."
      },
      {
        "question": "What should I do if a car arrives damaged?",
        "answer": "Record the damage on arrival and compare it with the departure photos. Keep dated wide shots and close-ups, transport references and the supplied-item list. Contact the named claims handler promptly and follow the shipment's reporting deadlines and evidence requirements."
      }
    ]
  },
  {
    "id": "support",
    "title": "Warranty and after-sales support",
    "intro": "Coverage, repairs, parts and software for an existing order.",
    "href": "/export-services/after-sales/#coverage",
    "linkLabel": "Find after-sales guidance",
    "questions": [
      {
        "question": "Does the manufacturer's warranty continue after export?",
        "answer": "Not necessarily. Manufacturer coverage in the original market may end after export. Before ordering, review coverage for the vehicle and destination, including any separate seller support, its duration, exclusions and approval process."
      },
      {
        "question": "What details should I send for a vehicle problem?",
        "answer": "Send the order reference, VIN, version, delivery date, location and mileage. Describe the symptom, when it began and any warning message. Add photos, diagnostic readings or workshop reports, plus the checks, changes or repairs already carried out."
      },
      {
        "question": "Can I arrange a local repair and request reimbursement?",
        "answer": "Get approval from the responsible support provider before authorizing paid work. Establish the workshop, diagnosis or repair, evidence required and who pays each cost. Completing a repair locally does not guarantee reimbursement."
      },
      {
        "question": "How do I request the correct replacement part?",
        "answer": "Send the VIN, version, part photos, part number if known, quantity and destination. The supplier needs to check fit, availability, price and delivery; similar-looking parts can have different connectors or mounting points."
      },
      {
        "question": "Can you help with software or connected-service questions?",
        "answer": "Send us the VIN, market version, country of use and details of the feature or error, including the current software version. The provider needs to check compatibility and access because apps, languages and updates vary by market."
      }
    ]
  }
];
