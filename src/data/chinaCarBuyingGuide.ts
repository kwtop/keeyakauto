import {destinationPath, purchaseGuidePath as guide, type GuideEditorial} from './guideEditorial';

export const chinaCarBuyingGuide: GuideEditorial = {
  title: 'How to Buy Cars from China: Costs, Documents and Shipping',
  description: 'Learn how to buy and import new or used cars from China. Compare exporters, landed costs, EV charging, documents, inspection, payment and shipping.',
  answer: "To import cars from China, establish the car import requirements for your destination before choosing a vehicle. Verify the China car exporter, compare the landed cost of written offers, and agree on vehicle inspection, payment terms and document handover. New, used and electric cars need different evidence.",
  image: 'ports',
  reviewed: '2026-11-06',
  sources: [
    {id: 'used-export', label: 'China MOFCOM and four departments, 2024 used vehicle export requirements', href: 'https://wms.mofcom.gov.cn/zcfb/wmgl/art/2024/art_52f62edf8132411fa206542d851edfc7.html'},
    {id: 'recent-registration', label: 'China MOFCOM and three departments, additional used vehicle export requirements effective in 2026', href: 'https://wms.mofcom.gov.cn/zcfb/wmzc/art/2025/art_fba9bd229a2b467b91b303bc05736612.html'},
    {id: 'electric-export', label: 'China MOFCOM and three departments, Announcement No. 54 of 2025 on battery-electric passenger car export licensing', href: 'https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=103794'},
    {id: 'icc', label: 'ICC, Incoterms® 2020 and the allocation of costs, risks and obligations', href: 'https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/'},
  ],
  sections: [
    {
      heading: 'Buying a car from China, step by step',
      paragraphs: [
        "A buyer sourcing wholesale cars for a dealership needs an agreed version and a way to identify every unit in the batch. A private buyer needs an identified car and a workable registration route. In both cases, settle the destination requirements before paying to reserve a model.",
        "The six stages below give each decision a record. Keep the sourcing brief, quote revisions and approvals together so the person releasing payment can see what has actually been accepted."
      ],
      table: {
        caption: 'From the first inquiry to collection',
        headers: ['Stage', 'What to agree or check', 'Record to keep'],
        rows: [
          ['1. Vehicle brief', 'Model, version, new or used status, quantity, budget and destination.', 'A sourcing brief with acceptable alternatives.'],
          ['2. Offer', 'Seller, exact configuration, price basis, availability and included services.', 'A dated, itemised quote with its validity and named delivery point.'],
          ['3. Order and preparation', 'Vehicle identification, payment milestones, changes and the applicable export route.', 'The written order, vehicle list and payment instructions.'],
          ['4. Inspection and release', 'Inspection scope, findings, repairs and acceptance before release.', 'A dated report and photos linked to the VIN where available.'],
          ['5. Booking and departure', 'Carrier acceptance, loading plan, document drafts and schedule.', 'Booking confirmation, transport documents and a departure condition record.'],
          ['6. Arrival and collection', 'Customs release, final charges, supplied items and receiving inspection.', 'The clearance file and signed handover or discrepancy record.'],
        ],
      },
    },
    {
      heading: 'Choose a car that fits your destination',
      paragraphs: [
        'Start with the car you can register and use. Ask your broker which rules apply to the exact vehicle category, model year, steering side, emissions or powertrain and importer. Keep the answer with the offer so a later substitution does not undo the check.',
        'For new cars from China, compare the model year, trim, equipment, production timing and market version. For used cars from China, add the individual VIN, first registration, current mileage, condition and repair records. A familiar model name is not enough to establish the specification of the car being offered.',
        'This matters for a Chinese-brand car and for a China-market Toyota, Volkswagen or another international brand. Request the actual version details and confirm local software, language, parts and service support. Use the country guides as a starting checklist, then verify the current route with your destination broker.',
      ],
      links: [
        {label: 'Compare new and used car offers', href: guide('new-vs-used-cars')},
        {label: 'Check requirements by destination', href: destinationPath},
      ],
    },
    {
      heading: 'Find and verify a car exporter in China',
      paragraphs: [
        'When choosing a car exporter in China, establish who will sell the vehicle, receive payment and handle export. Ask for the registered legal name and company details, then match them to the offer, contract and payment instructions. Have the seller explain any different beneficiary or third-party role in writing.',
        'Ask which export licence and vehicle records apply to the order. China’s 2024 used vehicle export announcement sets out exporter, licensing and vehicle-document requirements. A company profile or exhibition certificate helps identify a business; ask separately for the evidence relevant to your car and export route.',
        'Registration timing also matters. From January 1, 2026, China’s additional rules require a manufacturer-issued after-sales service confirmation for used vehicles applying for export within 180 days of registration, including day 180. If a recently registered car is offered as used, resolve the required documentation before payment.',
      ],
      items: [
        'Request a dated offer identifying the car or the agreed method for allocating vehicles to the order.',
        'Verify an account change through an established contact using a number you already know.',
        'Agree on access for an inspection and what happens if the car does not match the offer.',
        'Keep the seller, exporter, inspector and forwarder contacts together with their responsibilities.',
      ],
      sources: ['used-export', 'recent-registration'],
      links: [{label: 'Verify a used car before payment', href: guide('verify-chinese-used-car-before-payment')}],
    },
    {
      heading: 'How much does it cost to import a car from China?',
      paragraphs: [
        'The cost to import a car from China is the vehicle price plus every charge needed to reach your chosen endpoint. That may be release at the destination port, delivery to your yard or a registered car ready for use. Compare offers using the same endpoint, currency, vehicle specification and quantity.',
        'List origin handling, freight, insurance, import duties and taxes, destination handling, brokerage and any local delivery or registration. Enter a cost once. Ask the seller which items are already included in the quoted Incoterms® rule and named place; these rules allocate costs, risks and obligations between the parties.',
        'The example below uses the same four-car assumptions as our landed-cost worksheet. These are illustrative USD amounts, not a vehicle offer, freight rate or tax calculation for a particular country.',
      ],
      table: {
        caption: 'Illustrative cost for one car in a four-car order, USD',
        headers: ['Cost group', 'Per car', 'Basis'],
        rows: [
          ['FOB vehicle price', '$11,000', 'Assumed unit price at the named loading port.'],
          ['Freight and insurance', '$1,190', '$4,400 freight and $360 insurance shared equally across four cars.'],
          ['Import and destination costs', '$2,310', '$1,540 assumed duties and taxes, $320 terminal and brokerage, $450 local delivery and registration.'],
          ['Total to the example’s endpoint', '$14,500', '$58,000 for the four-car order.'],
        ],
      },
      items: [
        'When comparing cheap electric cars from China, check whether the advertised price covers the exact trim, quantity and export arrangement you need.',
        'Keep your broker’s destination tax calculation separate and record the valuation basis, date and assumptions.',
        'Ask who pays for storage, document amendments or a delayed collection. Leave unconfirmed costs visible in your budget.',
      ],
      sources: ['icc'],
      links: [
        {label: 'Calculate your landed cost', href: guide('calculate-car-landed-cost')},
        {label: 'Compare FOB and CIF quotes', href: guide('exw-fob-cif-car-shipping')},
      ],
    },
    {
      heading: 'Chinese electric cars, hybrid SUVs and small city cars',
      paragraphs: [
        'Compare the powertrain against how the car will be used. For electric cars from China, ask for the battery and charging specification of the actual version. For Chinese hybrid cars, identify whether the offer is for a conventional hybrid, a plug-in hybrid or an extended-range vehicle, and confirm the equipment and maintenance support for that version.',
        'A Chinese EV SUV needs the same version checks as a smaller electric car, plus the passenger space, payload and equipment your intended use requires. For a small city car or mini EV from China, request the manufacturer’s vehicle category and technical data. Check registration eligibility and suitability for the roads where you intend to use it.',
        'For charging, obtain photos of the car’s actual AC and DC inlets where fitted, its manual and the onboard charging limits. Have the local equipment provider check the proposed car and charger pairing, including any adapter. For a used EV, request a dated battery report tied to the VIN, its test method and any unresolved faults.',
        'China’s Announcement No. 54 of 2025 introduced export licensing from January 1, 2026 for the battery-electric passenger vehicles within its stated scope. Have the exporter confirm the classification and licensing path for the quoted car alongside your destination checks.',
      ],
      sources: ['electric-export'],
      links: [
        {label: 'Check Chinese EV charging compatibility', href: guide('chinese-ev-charging-standards')},
        {label: 'Read a used EV battery report', href: guide('used-ev-battery-report')},
      ],
    },
    {
      heading: 'Documents to confirm before shipment',
      paragraphs: [
        'Build the car import documents checklist with the exporter, forwarder and destination broker before placing the order. The required file depends on the vehicle, export route and destination. Give each document an owner and an agreed handover date.',
        'Check the file again if the car, consignee, route or delivery point changes. A corrected invoice may also require changes elsewhere in the document pack.',
      ],
      items: [
        'Commercial invoice and order: match the parties, vehicle description, quantity, currency, price and agreed delivery term.',
        'Vehicle list and identity records: match the VINs, model details and any registration records for used cars.',
        'Applicable export licence and inspection evidence: ask the exporter which records apply to the individual car or batch.',
        'Transport record: check the shipper, receiving party, destination and vehicle or shipment identifiers before approving the draft.',
        'Destination documents: have the broker confirm any origin, conformity, technical, inspection or other evidence needed for clearance and registration.',
      ],
      links: [{label: 'Use the export document checklist', href: guide('car-import-documents-checklist')}],
    },
    {
      heading: 'Before you pay: verify the vehicle and the offer',
      paragraphs: [
        'For a used car inspection, agree on the VIN, location, access, checklist and report format. Request dated photos and findings for the checks in your order. A useful report records what was checked, what was found and what the inspector could not verify.',
        'Review the odometer evidence, body and structural observations, mechanical operation, cabin equipment and supplied items. For an electrified vehicle, agree on the battery and charging checks available at that location. Record any repair and the re-check you expect before authorising release.',
        'Put each payment milestone next to its amount, beneficiary and required evidence. Agree on the effect of a failed check, a substitute car or a revised dispatch date. Keep approved changes with the original order so the person authorising payment can see what was accepted.',
      ],
      links: [{label: 'Use the pre-shipment inspection checklist', href: guide('inspect-a-used-car-from-china')}],
    },
    {
      heading: 'Shipping from China: RoRo, container and timing',
      paragraphs: [
        'Car shipping from China depends on the loading and destination ports, vehicle readiness, carrier acceptance, space and the import arrangements. Ask the forwarder to quote the same vehicle list and delivery point for each option. Include dimensions, running condition, powertrain and any loading restrictions.',
        'For RoRo versus container car shipping, compare the service actually available on your route. Ask how the vehicle is received, secured and handed over, what items can travel with it and which charges are outside the freight quote. For an EV, confirm the carrier’s battery and acceptance requirements before relying on the booking.',
        'A shipping-time estimate should distinguish preparation in China, the booked transport and destination release. Get the assumptions behind each date instead of treating the sailing time as the full order-to-arrival timeline.',
      ],
      items: [
        'Before departure: allow for vehicle allocation, inspection, agreed repairs, export documents and the carrier’s booking cutoff.',
        'In transit: record the route, any transshipment, departure confirmation and the carrier’s current arrival estimate.',
        'At destination: confirm document availability, clearance, collection deadlines and onward delivery.',
        'If a date changes: name the contact who updates the buyer and record responsibility for any additional charges.',
      ],
      links: [{label: 'Compare RoRo and container shipping', href: guide('container-vs-roro-car-shipping')}],
    },
    {
      heading: 'Arrival checks and after-sales support',
      paragraphs: [
        'At collection, match the vehicle identity, condition and supplied items against the departure record and order. Photograph a discrepancy and notify the agreed contact within the relevant claims procedure. Keep receiving, transport and inspection records together by VIN.',
        'Before buying, ask who handles warranty questions, diagnosis, parts and repair approvals in your market. Get the scope, exclusions, provider, procedure and any transport or labour costs in writing. For a used car, ask what coverage, if any, applies to that individual vehicle.',
        'For software, apps, charging equipment and parts, name the actual version and destination when asking about support. Keep the written response with the offer so your purchasing decision includes what happens after handover.',
      ],
      links: [
        {label: 'Check the car on arrival', href: guide('vehicle-arrival-checklist')},
        {label: 'Confirm warranty and after-sales arrangements', href: guide('car-warranty-and-after-sales')},
      ],
    },
    {
      heading: 'Questions before you place an order',
      questions: [
        {
          question: 'Can I buy just one car from China?',
          answer: 'Ask for a single-car quote and confirm whether the unit price, preparation and freight arrangement apply to one vehicle. An advertised batch price may have a different quantity basis. Confirm availability, the export route and destination requirements for the exact car before committing.',
        },
        {
          question: 'Can I buy a car from China online?',
          answer: 'Use the online listing to identify a model and request an offer. Before placing the order, verify the seller, vehicle details, payment instructions and document handover. Agree on how the car will be inspected and accepted, and keep the written contract and supporting records.',
        },
        {
          question: 'What should I send for an accurate car price?',
          answer: 'Send the brand, model, model year, trim, new or used requirement, quantity and destination country and port. For used cars, add acceptable mileage and condition. For EVs and hybrids, include charging and equipment requirements. Name the delivery point so the quote has a clear scope.',
        },
      ],
    },
  ],
  links: [
    {label: 'Prepare a wholesale car RFQ', href: guide('request-wholesale-car-quote')},
    {label: 'Check the document handover', href: guide('car-import-documents-checklist')},
    {label: 'Plan shipping and collection', href: '/export-services/shipping-support/'},
  ],
};
