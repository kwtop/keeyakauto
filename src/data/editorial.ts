export type EditorialSection = {
  id: string; title: string; body: string;
  paragraphs?: string[]; points?: string[];
  columns?: string[]; rows?: string[][];
  links?: {label:string;href:string}[];
};
export type EditorialPage = {
  slug: string; title: string; subtitle: string; label: string; intro: string;
  sections: EditorialSection[]; cta: string; service: string;
};

export const buyingFaqs = [
  {question:'Are the listed cars currently available?',answer:'Availability needs to be checked for your chosen model, version and quantity. These pages do not show live inventory or current prices. Ask for a dated offer before ordering.'},
  {question:'Can you help source a model outside the catalog?',answer:'Yes. Include the brand, model, preferred version, quantity and destination in your inquiry.'},
  {question:'Can I request several models in one inquiry?',answer:'Yes. List each model with the quantity you need. If you want several similar used cars, each car will need its own vehicle details and condition report.'},
  {question:'How do model year and registration year differ?',answer:'The model year is the manufacturer’s designation for a vehicle model. It can differ from the production year and the year of first registration. Ask for all three and check them against the documents for the car.'},
  {question:'Will the manufacturer’s warranty apply in my country?',answer:'Coverage depends on the version and destination, as well as the manufacturer’s terms. Ask for written confirmation of the coverage and exclusions for your car, including the support available locally.'},
  {question:'Does an inquiry reserve a car?',answer:'No. Sending an inquiry does not reserve a car or lock in a price. Any reservation needs current availability confirmation and written terms agreed with the seller.'}
];

export const buyingGuide: EditorialPage = {
  slug:'buying-guide',title:'How to buy cars from China',
  subtitle:'A guide to choosing a car, reviewing an offer and preparing for delivery.',
  label:'Buying guide',
  intro:'Buying for resale or a fleet? Work through the vehicle details and written offer before agreeing the order. This guide also covers the documents and handover.',
  cta:'Prepare a vehicle request',service:'buying',
  sections:[
    {id:'process',title:'The purchase process',
      body:'Start by describing the car you need. As the purchase progresses, check that the offer and supporting documents still refer to the version or individual vehicle you agreed on.',
      columns:['Stage','What to confirm','Record to keep'],
      rows:[
        ['Specify your vehicle requirements','Models, versions, quantities, destination and intended use. State which alternatives you would accept.','A model-by-model purchasing brief'],
        ['Confirm the exact vehicle','For new cars: market version, trim and supply basis. For used cars: the exact unit, identifiers, condition and current status.','A vehicle or batch confirmation'],
        ['Verify destination requirements','Match the actual vehicle specification and document availability with the destination review.','Vehicle facts and destination checks'],
        ['Review the written quotation','Price basis, included and excluded items, currency, quantity, handover place and validity.','An itemised written quotation'],
        ['Agree the purchase terms','Contracting and payment parties, inspection scope, payment stages, changes and acceptance.','The contract and agreed evidence requirements'],
        ['Prepare for vehicle handover','Export and transport documents, loading or release records, receiving contact and outstanding issues.','An order-specific handover file']
      ]},
    {id:'destination-check',title:'Check the car against local requirements',
      body:'Versions of the same model can differ between markets. Check the car being offered against your country’s import requirements and the features you need for everyday use.',
      columns:['Vehicle information','Destination review'],
      rows:[
        ['Steering side, production and registration information','Permitted vehicle types, age rules and the eligible importer'],
        ['Powertrain, technical specification and available vehicle documents','Approval, inspection, emissions or EV requirements'],
        ['Charging connector and electrical specification, where applicable','Local charging infrastructure and practical use'],
        ['Language, maps, apps, connectivity and software availability','Which features can be used locally and under what conditions'],
        ['Manufacturer warranty and any separately agreed support','Local repair options, registration, taxes and receiving arrangements']
      ],
      paragraphs:['Ask the seller or exporter for the vehicle documents they can provide. Check local import, tax and registration requirements with a suitable adviser in the destination country, and resolve any gaps before committing.']},
    {id:'quotation',title:'Compare quotations',
      body:'A lower vehicle price may leave out costs included in another offer. Compare the same version and quantity, with delivery to the same agreed point.',
      points:['Vehicle identity and exact configuration','Currency, quantity, agreed handover point and offer validity','Domestic handling, inspection and document charges','Transport, insurance and any estimated items','Destination handling, clearance, tax and registration: included, excluded or still to be confirmed'],
      paragraphs:['For an estimated charge, ask how it was calculated and when it may change. A price to the destination port may still exclude taxes, registration or delivery to your address. Catalog pages do not quote current vehicle prices.']},
    {id:'payment',title:'Payment and changes to the order',
      body:'Before paying, confirm who is selling the car, who receives the payment and who handles export. The contract should identify the vehicle and the checks required before each payment or release.',
      paragraphs:['Ask for the payment schedule and inspection timing in writing, together with the cancellation and refund terms. Deposit amounts must be agreed for your order.','The agreement should also cover changes or delays, including a car being sold before the order is confirmed. If the seller proposes a replacement, check its specification and documents before accepting it.']},
    {id:'documents',title:'Documents for your purchase',
      body:'Agree who will provide each document and when it will be available. Check the order and vehicle details across the records before payment and handover.',
      columns:['Record group','Purpose','Provider to identify'],
      rows:[
        ['Quotation, contract and payment records','Vehicle, quantity, currency, commercial scope and agreed stages','The contracting parties and payment recipient'],
        ['Vehicle and registration records','Exact version, vehicle identifiers and applicable registration history','The seller or company that holds the vehicle'],
        ['Inspection evidence','Dated findings, photos, readings, exceptions and unchecked items','The person or company carrying out the inspection'],
        ['Export and commercial records','Documents required for this vehicle, transaction and destination','The company handling export'],
        ['Transport and handover file','Transport reference, condition at release, receiving contact and handover record','Transport and handover parties']
      ],
      paragraphs:['Check that the company names and vehicle identifiers match across the documents. Compare the order details too, including the version, quantity, destination and dates. Documents for another vehicle or company cannot verify your purchase.','Some documents may arrive after payment or release. Agree the timing in advance and name a contact for missing or inconsistent records. Check whether your destination requires originals or translations.','Company documents can help with supplier checks. Ask separately for the records that apply to your vehicle and order.'],
      links:[{label:'Inspection evidence',href:'/export-services/sourcing-inspection/#scope'},{label:'Shipping & handover',href:'/export-services/shipping-support/'},{label:'Company documents',href:'/about/company-profile/#company-documents'}]},
    {id:'warranty',title:'Warranty and after-sales support',
      body:'A manufacturer’s warranty may not cover a car exported to another market. Confirm the coverage for your version and destination, then agree any separate support from the seller.',
      columns:['Support question','What to put in the agreement'],
      rows:[
        ['Manufacturer warranty','Applicable version and territory, provider, coverage and exclusions'],
        ['Seller or separately agreed support','Technical information, parts or software assistance actually available; named contact and costs'],
        ['Local diagnosis and repair','Who can inspect or repair locally, approval requirements and responsibility for costs']
      ],
      paragraphs:['Before ordering, check access to parts and software support, including any charges.','If a problem occurs, contact the person named in your agreement with the order reference and vehicle identifier. Describe when it happened and the symptoms, adding photographs or readings where useful. Keep any relevant inspection and transport records.','Agree the next action with that contact under your order terms. Before repairs begin, confirm authorisation and who will pay. Warranty exclusions and transport damage may be handled differently.'],
      links:[{label:'After-sales support',href:'/export-services/after-sales/#coverage'},{label:'Contact about an existing order',href:'/contact/#existing-order'},{label:'Payment & order changes',href:'#payment'}]}
  ]
};

export const servicePages: EditorialPage[] = [
  {slug:'vehicle-sourcing',title:'Vehicle sourcing from China',
    subtitle:'Describe the car you need, including any alternatives you would consider.',
    label:'Vehicle sourcing',
    intro:'Choose a model from the catalog or tell us about a car you cannot find here. Include the version, quantity and destination so we can discuss the request.',
    cta:'Share a sourcing brief',service:'vehicle-sourcing',
    sections:[
      {id:'requirement',title:'Your requirements',
        body:'Tell us which details are essential and where you can be flexible. For a used car, include the maximum mileage and any condition requirements.',
        columns:['Essential information','Useful preferences'],
        rows:[
          ['New or used; brand and model, or the intended vehicle type','A preferred trim, powertrain, seating layout or colour'],
          ['Quantity for each model','An acceptable alternative model or version'],
          ['Destination country and intended use','Destination port, timing and budget currency'],
          ['For used cars: year and mileage requirements','A maximum mileage, condition priorities and report requests']
        ]},
      {id:'supply',title:'Confirm availability',
        body:'A catalog model helps describe your request. Before ordering, ask for confirmation of the cars actually available.',
        points:['New car: market version, model year, trim, configuration and supply basis','Batch request: the proposed versions, quantities and timing, with a confirmation date','Used car: one identified vehicle, its condition evidence and current status'],
        paragraphs:['Ask who is supplying the car and when availability was last checked. Request a current quotation; a photograph or listing does not reserve the vehicle.']},
      {id:'review',title:'Alternative models and versions',
        body:'If your requested version is unavailable, compare any proposed alternative with your original requirements. Check the specification and destination suitability, then review changes to the price or timing and ask for supporting records.',
        paragraphs:['Record accepted changes in the order. If a vehicle fails an agreed check, follow the contract terms before authorising payment or release.']}
    ]},
  {slug:'inspection-quality',title:'Vehicle inspection',
    subtitle:'Agree the checks and request a dated report for the car you are buying.',
    label:'Vehicle inspection',
    intro:'Agree when the car will be inspected and which checks are needed. Ask for a dated report that identifies the vehicle and includes supporting photographs or readings.',
    cta:'Request inspection information',service:'inspection',
    sections:[
      {id:'scope',title:'Arrange the inspection',
        body:'Agree who will inspect the vehicle or batch and at which stage. Specify the report you need, including any independent inspection, and confirm that it can be arranged.',
        points:['Vehicle identifiers and the documents to be matched','The inspection date, location and person or company carrying it out','Checks to be performed and items outside the agreed scope','Photos, video, readings or reports expected before acceptance']},
      {id:'new-used',title:'Checks for new and used cars',
        body:'For a new car, check that the version and condition match the order. A used car also needs an individual review of its history, wear and known faults.',
        columns:['New cars','Used cars'],
        rows:[
          ['Version, configuration and equipment match','Vehicle identity, production and registration information'],
          ['Exterior, cabin and delivery condition','Exterior, interior, underbody and visible defects'],
          ['Documents, keys and included accessories','Mileage evidence, keys, accessories and available history'],
          ['Applicable operation or diagnostic checks','Applicable mechanical, diagnostic and EV battery checks'],
          ['Agreed exceptions before handover','Findings, unchecked items and unresolved questions']
        ]},
      {id:'evidence',title:'Read the inspection report',
        body:'Check that the report identifies your car and the inspection date. Significant findings should include a photograph, reading or document you can review.',
        paragraphs:['“Not checked”, “record unavailable” and “checked with no issue found” describe different situations. Missing history does not establish that a vehicle has had no accident or repair.','For an EV battery reading, ask for the date, method and conditions of the measurement. A generic model specification cannot establish the battery health of a used car.']},
      {id:'exceptions',title:'Resolve outstanding questions',
        body:'Ask about any significant issue before accepting the vehicle. The report can only address the checks included in the inspection.',
        paragraphs:['Use the vehicle or order reference when requesting further records. Agree how any unresolved findings will be handled.']}
    ]},
  {slug:'shipping-delivery',title:'Shipping and delivery',
    subtitle:'Review transport options and agree the handover point for your order.',
    label:'Shipping & delivery',
    intro:'Shipping options depend on the cars and their destination. Ask for a proposal with the route, cost and estimated timing, then agree the documents and handover arrangements.',
    cta:'Discuss your destination',service:'shipping',
    sections:[
      {id:'route',title:'Transport options',
        body:'Ask the transport provider or exporter which services can carry your vehicles on the proposed route.',
        columns:['Decision','Information to establish'],
        rows:[
          ['Vehicle and quantity','Finished dimensions, powertrain, handling requirements and number of cars'],
          ['Route and receiving point','Departure point, destination country, port or border, and receiving contact'],
          ['Transport method','Suitable service, securing or loading approach and any route restrictions'],
          ['Handover','The agreed release point and the party responsible at each stage']
        ],paragraphs:['Roll-on/roll-off shipping depends on an operating service that accepts your vehicles. Container transport needs a suitable loading and securing plan. For an overland route, check the border arrangements and onward transport. Confirm the available option for your order.'],links:[{label:'Vehicle sourcing',href:'/export-services/sourcing-inspection/'}]},
      {id:'pre-departure',title:'Before departure',body:'Before the vehicles leave, check their identifiers against the order and record their condition at handover.',points:['Match vehicle identifiers, version, quantity and receiving details','Keep dated exterior and cabin photographs with any inspection findings','Record keys, accessories and agreed exceptions','Check the required commercial, export and transport records and who provides outstanding items'],links:[{label:'Vehicle inspection',href:'/export-services/sourcing-inspection/#scope'},{label:'Document checklist',href:'/export-services/buying-guide/car-import-documents-checklist/'}]},
      {id:'cost',title:'Shipping costs and timing',
        body:'Check the route and handover point in the shipping proposal, along with its currency, quantity and validity. Ask which charges are estimates and which costs you will pay separately.',
        points:['Domestic handling and export-side charges','Main transport and any insurance arrangement','Destination handling, storage or onward transport','Import clearance, tax and registration responsibility'],
        paragraphs:['Ask when rates may change and whether the estimate needs updating before booking. Transit times depend on the confirmed service and route.']},
      {id:'handover',title:'Receiving the vehicles',
        body:'Keep the transport reference and release records with the vehicle documents. Dated photographs taken before departure help you compare the condition on arrival.',
        paragraphs:['On arrival, follow the agreed checks and record any differences promptly. If there is a problem, contact the person named in the order and keep the photographs and transport records.','Before shipment, agree the insurance cover and claims procedure. The order should also explain how transport damage or document errors will be handled, and any support available after delivery.']}
    ]}
];

export const afterSalesPage: EditorialPage = {
  slug:'after-sales',title:'After-sales support',
  subtitle:'Warranty questions, vehicle issue reports, repair arrangements and parts inquiries for cars purchased from China.',
  label:'After-sales',
  intro:'Have a question after delivery? Prepare the vehicle details and supporting records, then contact the person handling your order to agree the next step.',
  cta:'Contact us about your order',service:'after-sales',
  sections:[
    {id:'coverage',title:'Know your support arrangements',
      body:'Support depends on the vehicle, destination and terms agreed for your order. Before purchase, confirm the available warranty and after-sales arrangements in writing and keep a copy with your vehicle records.',
      columns:['Area','Details to confirm'],
      rows:[
        ['Manufacturer warranty','The covered version and territory, warranty provider, applicable period and exclusions.'],
        ['Seller support','The named contact, technical information or assistance available, and any charges.'],
        ['Local repair','Where the car can be diagnosed or repaired, who approves the work and who pays.']
      ],
      paragraphs:['A warranty offered in the original market may not apply after export. Confirm coverage for the actual vehicle and destination; do not assume the same model has identical coverage in every country.']},
    {id:'report',title:'Tell us about the issue',
      body:'Use the support contact agreed for your order. Include enough detail to identify the car and understand what happened. For a batch order, identify each affected vehicle separately.',
      points:['Order reference, vehicle identification number (VIN), model and version','Current location, mileage and delivery date','When the issue started, symptoms and any dashboard messages','Clear photos or video, diagnostic readings and any workshop report','Relevant inspection, handover and transport records'],
      paragraphs:['Describe any checks or repairs already carried out. Keep the original files so the support contact can compare the current condition with the inspection and handover records.'],
      links:[{label:'Contact about an existing order',href:'/contact/#existing-order'}]},
    {id:'diagnosis',title:'Agree diagnosis and repair',
      body:'A description or photograph may not be enough to establish the cause of a fault. Ask what further evidence is needed and whether a qualified local workshop should inspect the vehicle.',
      points:['Confirm the workshop and the checks to be carried out','Request findings and a repair estimate linked to the vehicle identifier','Agree approval, costs and any applicable warranty process before work begins','Keep diagnostic reports, invoices and records of the completed work'],
      paragraphs:['The next action should follow the support arrangements for your order. A local diagnosis does not by itself establish warranty coverage or approval to reimburse a repair.']},
    {id:'parts',title:'Parts and software inquiries',
      body:'Parts and software can vary between market versions of the same model. Identify the exact vehicle before requesting compatibility, availability or a price.',
      columns:['Request','Information to include'],
      rows:[
        ['Replacement part','VIN, part number if known, photographs of the part and its label, quantity and delivery destination.'],
        ['Software or connected feature','Vehicle version, current software version, the affected feature, error message and country of use.'],
        ['Supply and fitting','Compatibility confirmation, quotation, estimated lead time, delivery charges and local installation arrangements.']
      ],
      paragraphs:['Confirm what can be supplied or supported for your vehicle. Parts availability, software access and connected services need an individual check; any associated costs should be agreed before proceeding.']},
    {id:'follow-up',title:'Keep a record of the next step',
      body:'Keep the issue description, supporting evidence and agreed action together under the order reference. Ask who is handling the next step and when to expect an update.',
      paragraphs:['For damage noticed on arrival, keep dated photographs and the transport and handover records. Report the differences promptly to the contact named in the order; transport claims may follow a different process from a vehicle warranty issue.','When an action is completed, keep the repair or replacement record and confirm whether the reported issue is resolved. Record any remaining questions with the same contact.'],
      links:[{label:'Shipping & handover',href:'/export-services/shipping-support/#handover'}]}
  ]
};

const projectsPage: EditorialPage = {
  slug:'projects',title:'KEEYAK special-vehicle project archive',
  subtitle:'Special-vehicle projects from the KEEYAK company archive.',
  label:'Company records',
  intro:'KEEYAK publishes project material for its special-vehicle business. Those records provide company background; they do not establish a completed passenger-car delivery.',
  cta:'Ask about passenger cars',service:'company-records',
  sections:[
    {id:'records',title:'Historical special-vehicle projects',body:'The official project-story archive describes special-vehicle work. Check the named vehicle, date, destination and documented stage when reading an individual record.',paragraphs:['For a passenger-car purchase, ask for the records that apply to that order.']},
    {id:'passenger-cars',title:'Documents for your passenger-car purchase',body:'For a passenger-car purchase, request vehicle, inspection and transaction records for your order. Historical company material cannot confirm current availability or the condition of a particular used car.'}
  ]
};

// Previous local paths remain readable; the Word-plan paths are the main routes.
export const exportPages: EditorialPage[] = [
  {...buyingGuide,slug:'how-to-buy'},
  {...servicePages[1],slug:'inspection'},
  {...servicePages[2],slug:'shipping'},
  projectsPage
];
export const serviceHref = (page:EditorialPage) => `/export-services/${page.slug}/`;
