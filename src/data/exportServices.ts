import { buyingGuide, servicePages, afterSalesPage, type EditorialPage, type EditorialSection } from './editorial';

export const exportLinks = [
  { label: 'Buying Guide', href: '/export-services/buying-guide/', summary: 'Compare offers and see what to check before placing an order.' },
  { label: 'Sourcing & Inspection', href: '/export-services/sourcing-inspection/', summary: 'See how we find cars and arrange inspections before release.' },
  { label: 'Shipping & Delivery', href: '/export-services/shipping-support/', summary: 'Plan the route, shipping documents and vehicle handover.' },
  { label: 'After-sales Support', href: '/export-services/after-sales/', summary: 'Get help with a vehicle issue or parts request after delivery.' },
  { label: 'FAQ', href: '/export-services/faq/', summary: 'Get answers about stock, payment, inspections and shipping.' }
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
        'Agree any local diagnosis or repair before work begins: who will carry it out, what evidence is needed, who approves it and who pays. A local diagnosis on its own doesn’t mean the repair is covered or will be reimbursed.',
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
        "answer": "Finding the cars, arranging inspection and getting them exported. Tell us which cars you need, how many and where they’re going. Your quote will show who sells the cars, who you pay and who handles each service."
      },
      {
        "question": "Are the cars in the catalog in stock?",
        "answer": "Not necessarily. The catalog shows the models you can ask about, and we check stock and price when you do. Before you buy, ask us for a dated quote for the exact version and quantity you need."
      },
      {
        "question": "Can I include different models in one inquiry?",
        "answer": "Yes. List each model with the quantity and the equipment it must have, plus any alternatives you’d accept. Also tell us whether your budget is for the cars only or includes inspection, transport and destination costs."
      },
      {
        "question": "What if I have not chosen a model or version?",
        "answer": "That’s fine. Tell us how the cars will be used, the body type and powertrain you prefer, how many you need, where they’re going, your budget and your timing. We’ll narrow the options from there, and the quote will spell out the exact version and equipment."
      },
      {
        "question": "Is there a minimum order quantity?",
        "answer": "It depends on the model, version and supplier. Tell us how many of each model you need and we’ll check what’s available."
      },
      {
        "question": "Will a China-market EV work in my country?",
        "answer": "It depends on the version and your country. Before you order, check the charging connector and charging functions, plus languages, apps, maps and connected services. Your importer or adviser also needs to confirm the car can be imported and registered. Don’t assume it matches a similar model sold locally; features can differ."
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
        "answer": "The model and version if you know them, the quantity, destination and when you need the cars. For used cars, add your limits on year, mileage and condition. When the quote comes back, check it lists the vehicles or batch, the currency, how long it’s valid, the delivery point and what’s included."
      },
      {
        "question": "Why can two quotes for the same model differ?",
        "answer": "Usually because they aren’t quoting the same thing. Version, year, equipment, condition and included services all move the price. One quote may cover only the car, while another includes inspection or delivery to port. Match the specification and add any missing charges before you compare totals."
      },
      {
        "question": "What deposit and payment schedule apply?",
        "answer": "Payment terms are agreed for each order and written into it: who you pay, the currency, the deposit, when the balance is due and when the cars are released. If anyone sends you new bank details, call your KEEYAK contact before you pay."
      },
      {
        "question": "How long will sourcing and delivery take?",
        "answer": "It depends on whether the cars are available, plus inspection, release, transport and clearance at your end. Ask us for a schedule for your cars and route. It should show which dates are confirmed, which are estimates and when each stage starts."
      },
      {
        "question": "What happens if a vehicle or the order changes?",
        "answer": "Your contract covers changes, cancellations and refunds. If a replacement car is offered, check its specification, condition, records, price and timing before you say yes. Keep the approved change with your order."
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
        "answer": "Yes, you can ask for one. Tell us which inspector you want and what they should check, and we’ll look at access, location and whether the seller agrees. Settle the date, cost and what the report must include with the inspector before you book."
      },
      {
        "question": "What should the inspection report contain?",
        "answer": "At minimum, the VIN, where and when the car was inspected, and who inspected it. Each finding should come with photos, readings or records showing what was checked and how. The report should also say which tests weren’t done, which records are missing and what’s still open."
      },
      {
        "question": "Does a paint reading prove that a car had an accident?",
        "answer": "No. A high reading tells you a panel may have been repainted, not why or how much. We ask the inspector to check the area and send photos before you decide."
      },
      {
        "question": "What if some of the car’s history is missing?",
        "answer": "Then some accident and repair questions can’t be answered. Look at the records you do have and the inspection findings before you accept the car, and ask for more evidence or checks if you need them. If you go ahead anyway, write down what you’re accepting before the car is released."
      },
      {
        "question": "What should I check in a used EV battery report?",
        "answer": "Start with the VIN, the test date, and how and in what conditions the test was run. Ask the inspector what the figure measures and what it doesn’t. The model’s advertised range or battery capacity tells you nothing about this particular battery."
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
        "answer": "Ro-Ro, container, and overland transport where that route exists. Which one suits you depends on the route, the size and number of cars, and the carrier’s rules and handling needs. Check the route proposal and loading plan before you book."
      },
      {
        "question": "What is included in a shipping quote?",
        "answer": "It varies, so read it line by line. It should show where the cars are handed over and which charges are included, excluded or only estimated. Check domestic transport, handling, freight, insurance and destination costs one by one, and ask when the rate expires and what could change it."
      },
      {
        "question": "Which documents will I need to collect the cars?",
        "answer": "It depends on the cars and the route. Your exporter, forwarder and importer agree the list. It may include a commercial invoice, packing list, transport document, and origin or conformity records where needed. Before the cars ship, check the drafts, when each document will be ready and how the cars will be released."
      },
      {
        "question": "Who handles customs clearance and registration?",
        "answer": "Check your order and shipping plan; they say who does each part. Your importer or adviser at destination can tell you who handles clearance, taxes, collection, registration and onward transport. None of this is automatically included in the freight price."
      },
      {
        "question": "What should I do if a car arrives damaged?",
        "answer": "Record it on arrival and compare it with the departure photos. Take dated wide shots and close-ups, and keep the transport references and the list of supplied items. Contact the claims handler named for the shipment quickly: claims have deadlines and evidence rules."
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
        "answer": "Not necessarily. Manufacturer coverage in the home market may end once the car is exported. Before you order, check what cover your car will have in your country. If separate seller support is offered, check how long it lasts, what it excludes and how claims are approved."
      },
      {
        "question": "What details should I send for a vehicle problem?",
        "answer": "Send the order reference, VIN, version, delivery date, location and mileage. Tell us what’s happening, when it started and any warning message. Add photos, diagnostic readings or workshop reports, and tell us what has already been checked, changed or repaired."
      },
      {
        "question": "Can I arrange a local repair and request reimbursement?",
        "answer": "Only with approval first. Talk to your support contact before you authorize any paid work, and agree the workshop, the diagnosis or repair, the evidence needed and who pays for what. A local repair on its own doesn’t guarantee reimbursement."
      },
      {
        "question": "How do I request the correct replacement part?",
        "answer": "Send us the VIN, version, photos of the part, the part number if you have it, quantity and destination. The supplier checks fit, availability, price and delivery. Parts that look alike can have different connectors or mounting points."
      },
      {
        "question": "Can you help with software or connected-service questions?",
        "answer": "Yes. Send us the VIN, market version, country of use, current software version and what the feature or error is. The provider has to check compatibility and access, because apps, languages and updates vary by market."
      }
    ]
  }
];
