import {countryGuidePath, purchaseGuidePath as guide, type GuideEditorial, type GuideSection, type GuideSource} from './guideEditorial';

// Editorial decisions and keyword evidence are recorded in docs/buying-guide-cluster-20261105.
// Preserve the existing worked examples, calculator and RFQ template when extending a guide.
const documentGuide: GuideSource = {id:'export-documents',label:'International Trade Administration, common export documents and their purposes',href:'https://www.trade.gov/common-export-documents'};
const fraudGuide: GuideSource = {id:'payment-verification',label:'FBI IC3, verifying changes to payment account information',href:'https://www.ic3.gov/CrimeInfo/BEC'};
const chargingGuide: GuideSource = {id:'charging-compatibility',label:'CharIN, charging interfaces and communication compatibility',href:'https://www.charin.global/faq-section/'};
const batteryMetrics: GuideSource = {id:'battery-metrics',label:'Analog Devices, state of charge and state of health estimation techniques',href:'https://www.analog.com/en/resources/technical-articles/2023/03/30/06/27/a-closer-look-at-state-of-charge-and-state-health-estimation-tech.html'};

const additions: Record<string, GuideSection[]> = {
  'exw-fob-cif-car-shipping': [
    {heading:'EXW vs FOB: what happens before the car reaches the ship?',paragraphs:[
      'An EXW vehicle price starts at the named premises. Ask your forwarder to price collection, loading, inland movement and the export work left to your side. An apparently cheaper showroom price can leave several unpriced steps before shipment. Confirm who can perform those steps for this order.',
      'FOB names a port of shipment and places delivery on board the vessel. It is a sea or inland-waterway rule. For a container handed to a carrier at a yard or terminal, ask whether FCA describes the actual handover more accurately. Write the rule, named point and “Incoterms® 2020” together.',
    ],sources:['icc'],links:[{label:'Compare the complete written offers',href:guide('compare-car-export-quotes')}]},
    {heading:'Ask for the freight and insurance behind a CIF price',paragraphs:[
      'Send the seller the destination port you actually intend to use. Request the carrier or forwarding arrangement, routing assumptions, quote expiry and the charges payable on arrival. A CIF offer to one port cannot be compared with FOB plus freight to a different port without adding the remaining journey.',
      'Keep the insurance evidence with the quote. Check the insured value, covered journey, deductible, exclusions and the person who handles a claim. If you need wider cover, obtain its price before accepting the offer. The party paying freight and the point where risk transfers are separate parts of the comparison.',
    ],links:[{label:'Estimate costs beyond the destination port',href:guide('calculate-car-landed-cost')}]},
    {heading:'Questions about EXW, FOB and CIF car quotes',questions:[
      {question:'Does CIF include car import duty and registration?',answer:'Under the standard CIF allocation, the buyer handles import clearance and its costs. Ask for a separate destination estimate covering duties, taxes, terminal release, local delivery and registration where required. A seller’s extra service should be listed explicitly.'},
      {question:'Is FOB always cheaper than CIF?',answer:'No. Compare freight, insurance and handling for the same route and vehicle list. The worked example above shows one comparison, not a current shipping rate. A buyer with a different forwarder or insurance requirement can reach a different result.'},
    ],sources:['icc']},
  ],
  'calculate-car-landed-cost': [
    {heading:'What changes the car shipping cost from China?',paragraphs:[
      'Give the forwarder the departure point, destination, vehicle count, dimensions, powertrain and condition. Request a dated RoRo or container quote with the booking assumptions. Ask whether inland collection, loading, terminal handling, documents and destination release are included. A freight-only estimate leaves those lines open.',
      'For a mixed batch, request the actual allocation method. Dividing every charge equally can hide a larger vehicle’s space or handling cost. Keep both a total shipment budget and a per-vehicle worksheet, and reconcile them before comparing the expected resale margin.',
    ],links:[{label:'Compare RoRo and container services',href:guide('container-vs-roro-car-shipping')}]},
    {heading:'Import duty and tax: what the calculator needs from your broker',paragraphs:[
      'This car import cost calculator adds the amounts you enter. It does not determine a tariff classification or calculate a country’s tax automatically. Ask the destination broker for the applicable classification, customs value, rates, fees and calculation date for the exact new or used vehicle.',
      'Keep the broker’s tax worksheet beside the supplier’s quote. Record whether the broker has included freight and insurance in the valuation and which exchange rate it used. When a tariff, version, price or destination changes, obtain a revised calculation instead of carrying the old tax line into the new order.',
      'Use the destination guides to organize the next conversation. They do not replace a shipment-specific clearance estimate. An exemption or personal import route described for one buyer may not apply to a dealer’s commercial batch.',
    ],links:[{label:'Mexico import planning',href:countryGuidePath('mexico')},{label:'Egypt import planning',href:countryGuidePath('egypt')}]},
    {heading:'Questions about the landed-cost estimate',questions:[
      {question:'What should I enter when a charge is still unknown?',answer:'Mark it as missing in your purchasing worksheet and request the quote. A zero in the calculator contributes nothing to the total; it does not mean the service is free. Treat a total with missing items as an incomplete budget.'},
      {question:'Does a low vehicle price mean a better import margin?',answer:'Compare the cost at the same endpoint, including preparation, inspection and support you must arrange. Keep expected resale proceeds separate from confirmed costs, and test the margin again if the route, exchange rate or tax estimate changes.'},
    ]},
  ],
  'inspect-a-used-car-from-china': [
    {heading:'Pre-purchase inspection or pre-shipment inspection?',paragraphs:[
      'A used car pre-purchase inspection helps you decide whether to accept a specific car and what repairs or price changes to request. A pre-shipment inspection checks the identified car against the agreed condition and release requirements near dispatch. State which decision the inspection must support when booking it.',
      'If the same report will serve both purposes, record its date and what happens between inspection and loading. A car can be moved, repaired or substituted during that interval. Ask for updated identity and condition photos at handover and a targeted re-check for any agreed work.',
    ]},
    {sources:["used-export","inspection-scope"], heading:'Ask for findings you can act on',paragraphs:[
        "Start with VIN verification and an odometer check against the records available for that car. Record the identifier photographed, the reading, the date and any inconsistency. The inspector should distinguish the observation from a conclusion about the car's history.",
        "For paint thickness, request panel locations and measurements with photographs. Suspected accident damage needs an explanation of the physical evidence and access limits. An underbody inspection and OBD diagnostics should be included only when the provider has the equipment, permission and agreed scope; neither a clean scan nor one paint reading establishes a complete repair history.",
        "Use the findings to make a decision: accept the recorded condition, agree repairs and a re-check, commission another test, or review a replacement. Keep the road test result and every unperformed check in that decision file."
      ],items:[
      'For a road test, record whether it took place and any restrictions on route or speed.',
      'For a used EV, specify the battery diagnostics and charging checks separately from the general walkaround.',
      'For a batch, identify which checks apply to every VIN. A report for one sample car does not describe the condition of every unit.',
    ],links:[{label:'Check the used EV battery evidence',href:guide('used-ev-battery-report')}]},
    {heading:'Questions before booking a car inspection',questions:[
      {question:'Can an inspection guarantee the mileage is genuine?',answer:'Ask for an odometer photo and the accessible dated records used to compare it. An inspector should identify gaps or conflicting entries. A current reading alone cannot prove the vehicle’s complete mileage history.'},
      {question:'How much does a pre-shipment car inspection cost?',answer:'Request a quote for the location, vehicle count, access, tests, report language and any re-inspection. Compare those scopes before comparing fees. Battery diagnostics, a lift inspection and a road test should be named if they are needed.'},
    ],links:[{label:'Verify the seller, VIN and mileage records',href:guide('verify-chinese-used-car-before-payment')}]},
  ],
  'container-vs-roro-car-shipping': [
    {heading:'How many cars fit in a container?',paragraphs:[
      'Ask the loading provider for a plan using the actual length, width, height, weight and ground clearance of each model. Include the proposed container, securing equipment, access for loading and unloading, and any restrictions on stacking or racking. Do not price an order around a generic cars-per-container claim.',
      'For a mix of SUVs, sedans or vans, confirm which VINs are assigned to each load. Ask for the loading photographs and the agreed securing record. The receiving party also needs an unloading plan and responsibility for returning the empty equipment.',
    ],sources:['ctu']},
    {heading:'Shipping electric cars and non-running vehicles',paragraphs:[
      'Get written carrier acceptance for the precise powertrain and condition before committing to a route. Supply the battery and damage information requested at booking. Ask about the required state of charge, keys, isolation or other preparation instructions for that service; do not transfer a rule from another carrier or sailing.',
      'A car that cannot be driven may need a different handling arrangement or may be refused by the proposed service. Disclose the condition when asking for a rate. Record any extra handling price and the acceptance decision, rather than assuming that a container or RoRo booking covers it.',
    ]},
    {heading:'Questions about RoRo and container car shipping',questions:[
      {question:'Which option is cheaper for cars from China?',answer:'Compare complete quotes for the same vehicle list, handover points and dates. RoRo and container offers can include different terminal, packing, securing and unpacking costs. Use the landed-cost worksheet after filling those gaps.'},
      {question:'How long will car shipping from China take?',answer:'Ask for the proposed sailing, cutoffs, any transshipment and estimated arrival. Add preparation, inspection, release and collection time separately. Confirm which dates are bookings and which are estimates, and what happens if a sailing changes.'},
      {question:'Can spare parts travel inside the car?',answer:'Ask the carrier and customs broker before including any items. Record the permitted inventory, packing and declaration requirements. Do not place unlisted goods in a car and assume the vehicle booking covers them.'},
    ],links:[{label:'Build the full shipping budget',href:guide('calculate-car-landed-cost')},{label:'Prepare for vehicle arrival',href:guide('vehicle-arrival-checklist')}]},
  ],
  'car-import-documents-checklist': [
    {heading:'Commercial invoice, vehicle list and bill of lading',paragraphs:[
        "The commercial invoice records the sale, while the packing list or vehicle list identifies what is shipped. The bill of lading or sea waybill records the transport arrangement. Reconcile the legal party names, quantities, ports and vehicle identification number for each unit before approving the drafts. Keep consignee details consistent with the release arrangement.",
        "A certificate of origin supports an origin claim where that evidence is required. It serves a different purpose from ownership documents, an export declaration or an import declaration. The exporter and destination broker should identify the issuer and accepted form of each record needed for this transaction.",
        "If a car is replaced, update its order, inspection and shipment records together. Customs clearance and road registration can call for different technical evidence. Where a certificate of conformity is requested, establish exactly which document and vehicle version the authority will accept; an EU certificate is not a standard inclusion with every China-market car."
      ],sources:['export-documents'],links:[{label:'Receiving checks after shipment',href:guide('vehicle-arrival-checklist')}]},
    {heading:'Is an export certificate enough to register the car?',paragraphs:[
      'Ask the seller to name the document it calls an “export certificate,” its issuer and the purpose it serves. A translated label may refer to registration, a licence, inspection or another record. Match it to the requirement identified by the destination authority or broker.',
      'Customs clearance and road registration can require different evidence. Obtain the destination checklist for the exact version and importer before paying for the car. If conformity or technical approval evidence is required, ask who can issue it and whether the quoted vehicle is covered. Do not assume every car has an EU Certificate of Conformity.',
    ],links:[{label:'Check import and registration eligibility',href:guide('check-car-import-eligibility')}]},
    {heading:'Questions about car import documents',questions:[
      {question:'Do I need originals or are scans enough?',answer:'Have the broker, carrier and any payment provider confirm their requirements for each document. Record the accepted format, delivery method and deadline before shipment. A scan that helps check a draft may not satisfy the final release procedure.'},
      {question:'Who corrects a wrong VIN or consignee name?',answer:'Contact the issuer through the seller or forwarder and follow its amendment procedure. Tell the broker which related documents contain the same detail. Keep the corrected approved set together and confirm the effect on release before arrival.'},
    ]},
  ],
  'verify-chinese-used-car-before-payment': [
    {heading:'What a VIN check can tell you',paragraphs:[
      'For a used car VIN check, start with a readable photograph of the identifier on the actual vehicle and compare it with the registration, inspection and written offer. Ask the seller to explain any inconsistency before using a model name or a decoder result as confirmation.',
      'A VIN decoder describes encoded identity information. It does not, by itself, confirm ownership, current condition, accident history or mileage. Ask which history records are available for that specific car, who supplied them and the date range they cover. An empty history result is an evidence gap, not proof that nothing happened.',
    ]},
    {heading:'Build a mileage and condition timeline',paragraphs:[
        "A vehicle history report is useful only within the records and dates it covers. Put available service, registration, inspection and repair entries in order, keeping originals with any translation. Compare successive odometer readings with a current photograph. An inconsistency can justify further inquiry into odometer fraud. Keep unexplained gaps on the exception list until the records and inspection provide an explanation.",
        "Review previous damage against an independent inspection and the seller's written description. The file should identify what evidence supports accident, flood or mileage claims and what remains unavailable. Ownership documents and the seller's business registration establish different parts of the transaction; retain both.",
        "Confirm which export license and related vehicle records the named exporter will obtain under the actual export route. Bank account verification remains a separate finance check, especially if the beneficiary changes. Agree the next step for each unresolved item before money is due."
      ],links:[{label:'Use the physical inspection checklist',href:guide('inspect-a-used-car-from-china')}]},
    {heading:'Verify bank instructions outside the payment message',paragraphs:[
      'Before the first transfer, reconcile the legal seller, contract reference and beneficiary. If instructions change, call an established contact using a number already held in your records. Ask that person to confirm the change and document the relationship if the payee differs from the seller. IC3 recommends verifying account changes through a separate channel.',
    ],sources:['payment-verification']},
    {heading:'Questions about buying used cars from China',questions:[
      {question:'Is a zero-mileage used car the same as a new car?',answer:'Ask for the registration history and export route. The description refers to mileage; it does not settle the legal status or destination eligibility. Check the current recently registered vehicle requirements with the exporter and compare the car’s support terms with a new-car offer.'},
      {question:'What if the quoted car is sold before I pay?',answer:'Have the seller identify the replacement and issue a revised offer. Repeat the VIN, record and inspection checks for that unit. Approval of the original car should not automatically apply to a substitute.'},
    ],links:[{label:'Compare new and used import orders',href:guide('new-vs-used-cars')},{label:'Agree payment milestones',href:guide('car-order-payment-and-changes')}]},
  ],
  'used-ev-battery-report': [
    {heading:'State of charge, battery health and range are different readings',paragraphs:[
      'State of charge describes how much charge is available now. A battery state-of-health figure describes condition against a reference chosen by the reporting method. A nearly full charge does not establish that the battery retains nearly all its original usable capacity.',
      'Ask whether the EV battery health check reports usable energy, another capacity measure or a diagnostic estimate. Request the baseline and units. If two reports use different definitions, have the testing provider explain whether the figures can be compared before ranking the cars by percentage.',
      'Use dashboard remaining range as an observation recorded under its conditions. For your purchasing decision, separately request the evidence for battery condition and the operating range you need. A manufacturer’s range figure and the range displayed after a recent drive answer different questions.',
    ],sources:['battery-metrics']},
    {sources:["battery-metrics"], heading:'Agree the next test before accepting an unexplained result',paragraphs:[
        "A battery diagnostic report should identify the installed pack and explain the measurements it provides. Where the method reports battery cycle count, battery temperature or cell voltage imbalance, retain the units and test conditions. The provider should explain which limits apply to that pack and method. Leave unavailable fields marked unavailable; a single diagnostic value does not predict remaining life.",
        "To investigate battery degradation, compare usable battery capacity only against a stated reference and a compatible method. If a result is unexplained, the qualified testing provider should specify the next suitable check. A dashboard photograph and a measured capacity test have different scopes; obtain comparable evidence before choosing between cars.",
        "Record the outcome of DC fast charging separately from the health estimate, including the charger and any limits observed. Battery warranty eligibility comes from the provider's written terms for that VIN and market. Keep the report, charging result and warranty response together when approving the purchase."
      ],links:[{label:'Agree the wider vehicle inspection',href:guide('inspect-a-used-car-from-china')}]},
    {heading:'Questions about used EV battery health',questions:[
      {question:'What battery SOH percentage is good enough to buy?',answer:'Set an acceptance requirement for your intended use and the agreed test method. Consider the result alongside faults, damage, repair history, charging operation and support. A single percentage is not a universal pass mark or a prediction of remaining life.'},
      {question:'Does a battery health report prove that a warranty applies?',answer:'No. Ask the warranty provider to confirm coverage for the VIN, market, ownership, use and maintenance history. The report describes evidence about condition; warranty eligibility and any capacity threshold come from the applicable written terms.'},
      {question:'Can a healthy used EV charge at my destination?',answer:'Check its actual AC and DC inlets against the equipment you intend to use. Battery condition and charging compatibility are separate purchasing checks. Save the verified charger pairing with the vehicle file.'},
    ],links:[{label:'Check GB/T, CCS2 and adapters',href:guide('chinese-ev-charging-standards')},{label:'Confirm imported car warranty terms',href:guide('car-warranty-and-after-sales')}]},
  ],
  'request-wholesale-car-quote': [
    {heading:'Describe the batch a supplier can actually quote',paragraphs:[
      'When requesting wholesale cars from China, split the required quantity by exact model and version. State which colors, equipment and alternatives you will accept. Give each supplier the same destination and target handover window. If the quantity is provisional, say what your first order needs and what is only a later possibility.',
      'Ask the China car exporter to identify the contracting seller, exporter of record and the role it will perform. Request a response that distinguishes units currently identified from cars still to be sourced. A showroom photograph or catalog entry does not establish stock for the quantity you need.',
      'For used cars, provide limits for registration age, mileage and condition. Ask for a proposed VIN list and records for each unit. For EVs, include charging compatibility and the battery evidence required; “electric” by itself is not a complete purchasing specification.',
    ],links:[{label:'Choose between new and used cars',href:guide('new-vs-used-cars')}]},
    {heading:'Put the destination and delivery point in the first request',paragraphs:[
        "Name the importer and intended use, then include the destination port and any inland delivery. Set the inspection requirements and payment terms you want suppliers to respond to. A target price should state the currency and whether it covers the vehicle only or the full destination cost.",
        "For EXW, FOB and CIF alternatives, request separate prices with their named places and quote validity. Keep the vehicle specification unchanged between options. Establish the minimum order quantity for that particular version and availability; a batch price does not automatically apply to one car."
      ],sources:['icc'],links:[{label:'Compare car export quotations',href:guide('compare-car-export-quotes')},{label:'Choose an Incoterms quotation basis',href:guide('exw-fob-cif-car-shipping')}]},
    {heading:'Questions about wholesale car quote requests',questions:[
      {question:'Is there a standard minimum order quantity?',answer:'Request the minimum quantity and pricing basis for the particular model, availability and shipment. Do not assume that a price shown for a batch applies to one car. Separate a proposed first order from a possible future volume.'},
      {question:'Should I include a budget in the RFQ?',answer:'State the currency and whether the budget is for the vehicle only or the full cost at destination. Ask the supplier to quote the requested specification and identify alternatives separately. This keeps a lower price from silently changing the car or service scope.'},
    ]},
  ],
  'chinese-ev-charging-standards': [
    {heading:'GB/T vs CCS2, and Type 2 vs CCS2',paragraphs:[
        "List AC charging and DC fast charging separately in the order. GB/T charging has distinct AC and DC interfaces. Type 2 charging and CCS2 charging also describe different arrangements: specify the actual inlet, supported mode and equipment for the vehicle you are buying.",
        "Connector compatibility includes the charging protocol and electrical interface. The onboard charger specification matters for AC use; the intended DC setup needs its own vehicle and station review. Have the charger operator or qualified equipment provider review the exact pairing before the order depends on it."
      ],sources:['gb-ac','gb-dc','charging-compatibility']},
    {heading:'Buying a GB/T to CCS2 adapter: what must be verified?',paragraphs:[
        "Describe the direction before ordering a GB/T to CCS2 adapter: the station connector on one side and the car's inlet on the other. Obtain the supported vehicle list, charging mode, voltage and current limits, approvals and operating instructions for the actual product.",
        "A charging test should identify the car, station, any approved adapter and what completed. Retain the result and restrictions with the order. An online product listing or a test on another model leaves this pairing unverified; resolve it with the vehicle manufacturer and equipment provider before committing to a batch."
      ],sources:['charging-compatibility']},
    {heading:'Questions about importing and charging a Chinese EV',questions:[
      {question:'Will a China-market EV work at every CCS2 station?',answer:'No such assumption is safe for purchasing. Check the inlet, communication, electrical limits and operator acceptance for the actual version. A single successful session establishes the result for that setup and test, not universal network compatibility.'},
      {question:'Will the car reach its advertised charging power?',answer:'Ask which conditions the quoted figure assumes and which limits apply to the vehicle, charger and any approved equipment. Request a test record relevant to your intended setup rather than treating a charger’s nameplate rating as the car’s charging result.'},
      {question:'Can I change the charging inlet after delivery?',answer:'Do not budget on a simple connector replacement. Ask the manufacturer or an authorized technical provider about compatibility, approval, warranty and local requirements for the exact vehicle. Resolve the charging arrangement before choosing the version.'},
    ],links:[{label:'Check the EV before importing',href:guide('check-car-import-eligibility')},{label:'Compare used EV battery reports',href:guide('used-ev-battery-report')}]},
  ],
};

export function expandBuyingGuides(base: Record<string, GuideEditorial>): Record<string, GuideEditorial> {
  const updates: Record<string, Partial<GuideEditorial>> = {
    'exw-fob-cif-car-shipping':{title:'EXW, FOB and CIF Car Shipping: Costs and Responsibilities',description:'Compare EXW, FOB and CIF car quotes from China, with a FOB vs CIF cost example, insurance checks and the handover points to confirm.'},
    'calculate-car-landed-cost':{title:'Car Import Cost Calculator: Landed Cost from China',description:'Estimate landed cost per car or batch. Use a worked example and calculator for vehicle price, freight, insurance, import duties and local costs.'},
    'inspect-a-used-car-from-china':{title:'Used Car Inspection Checklist: Before Buying and Shipping',description:'Book a used car pre-purchase or pre-shipment inspection in China. Check VIN, mileage, damage, operation and the evidence needed before release.'},
    'container-vs-roro-car-shipping':{title:'RoRo vs Container Car Shipping from China',description:'Compare RoRo and container car shipping costs, loading plans, electric vehicle acceptance, booking dates and arrival responsibilities.'},
    'car-import-documents-checklist':{title:'Car Import Documents Checklist: China Export to Arrival',description:'Prepare car import documents, from invoice and VIN list to bill of lading, export records and the destination clearance and registration file.',sources:[...(base['car-import-documents-checklist'].sources??[]),documentGuide]},
    'verify-chinese-used-car-before-payment':{title:'Buying Used Cars from China: VIN, Mileage and Seller Checks',description:'Verify a used car from China before payment. Match the VIN, mileage history, seller, exporter and bank instructions to the car you plan to buy.',sources:[...(base['verify-chinese-used-car-before-payment'].sources??[]),fraudGuide]},
    'used-ev-battery-report':{title:'Used EV Battery Health Check: How to Read the Report',description:'Understand a used EV battery report: SOH, charge level, test method, capacity evidence, faults, charging checks and warranty questions.',sources:[...(base['used-ev-battery-report'].sources??[]),batteryMetrics]},
    'request-wholesale-car-quote':{title:'Wholesale Cars from China: RFQ and Quote Request Template',description:'Copy a car RFQ template for wholesale sourcing in China. Specify models, quantities, new or used condition, destination, inspection and delivery terms.',sources:[{id:'icc',label:'ICC Incoterms® 2020, allocation of cost, risk and obligations',href:'https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/'}]},
    'chinese-ev-charging-standards':{title:'Chinese EV Charging: GB/T, CCS2 and Adapter Checks',description:'Check GB/T vs CCS2 and Type 2 charging before importing a Chinese EV. Review vehicle inlets, adapter direction, protocols and local charger compatibility.',sources:[...(base['chinese-ev-charging-standards'].sources??[]),chargingGuide]},
  };
  return Object.fromEntries(Object.entries(base).map(([slug, article]) => [slug, additions[slug] ? {
    ...article, ...updates[slug], sections:[...article.sections,...additions[slug]],
  } : article]));
}
