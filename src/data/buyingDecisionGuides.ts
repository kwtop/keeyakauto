import {destinationPath, countryGuidePath, purchaseGuidePath as guide, type GuideEditorial, type GuideSource} from './guideEditorial';

const reviewed = '2026-11-06';
const usedExport: GuideSource = {id:'used-export',label:'China MOFCOM and four departments, Announcement No. 6 of 2024 on used vehicle exports',href:'https://wms.mofcom.gov.cn/zcfb/wmgl/art/2024/art_52f62edf8132411fa206542d851edfc7.html'};
const recentRegistration: GuideSource = {id:'recent-registration',label:'China MOFCOM and three departments, additional requirements for recently registered used vehicle exports',href:'https://wms.mofcom.gov.cn/zcfb/wmzc/art/2025/art_fba9bd229a2b467b91b303bc05736612.html'};
const icc: GuideSource = {id:'icc',label:'ICC Incoterms® 2020, allocation of cost, risk and obligations',href:'https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/'};
const documents: GuideSource = {id:'documents',label:'International Trade Administration, common export documents and their purposes',href:'https://www.trade.gov/common-export-documents'};
const payments: GuideSource = {id:'payments',label:'International Trade Administration, Trade Finance Guide',href:'https://www.trade.gov/report/trade-finance-guide'};
const fraud: GuideSource = {id:'fraud',label:'FBI IC3, business email compromise and verification of account changes',href:'https://www.ic3.gov/CrimeInfo/BEC'};
const carrier: GuideSource = {id:'carrier',label:'Höegh Autoliners, customer guidelines and cargo claims handling process',href:'https://www.hoeghautoliners.com/customer-centre'};
const warranty: GuideSource = {id:'warranty',label:'Toyota Ireland, warranty eligibility for vehicles originating outside the Pan-European market',href:'https://www.toyota.ie/faq'};

export const buyingDecisionGuides: Record<string, GuideEditorial> = {
  'new-vs-used-cars': {
    title:'New vs Used Cars from China: Which Should You Import?',
    description:'Compare new and used cars from China by specification, condition, registration history, preparation, import eligibility and support at destination.',
    answer:"Compare new vs used cars after establishing import eligibility and the total cost of ownership for the exact offers. New cars from China need a clear version and equipment list. Used cars from China also need a VIN check, first registration date, odometer reading and inspection report.",
    image:'inspection',reviewed,sources:[usedExport,recentRegistration],
    sections:[
      {heading:'Compare the two offers at the same destination',paragraphs:[
        'Start with the model, intended use, quantity and delivery point your business needs. Ask suppliers to quote both options on that basis. A new sedan for a fleet and a used SUV for resale solve different needs; their starting prices alone do not make a useful comparison.',
        'Then identify the exact cars behind the prices. A new-car offer should name the model year, trim, market version and equipment. A used-car offer should identify the unit and its available records. Confirm which details remain provisional and when the seller will identify the vehicles for your order.',
      ],table:{caption:'New vs used car import comparison',headers:['Decision','New-car offer','Used-car offer'],rows:[
        ['What are you buying?','Exact version, equipment, production information and identification before release.','Specific VIN, registration date, current mileage and availability.'],
        ['What must be inspected?','Match the supplied vehicle and equipment to the offer; agree condition and operation checks.','Review identity, records, damage, repairs, wear and the tests agreed for that car.'],
        ['What preparation is priced?','State any accessories, software setup or delivery preparation in the quote.','Price agreed repairs, tyres, servicing, missing items and re-inspection separately.'],
        ['What support will you have?','Confirm the written coverage for the version, destination and use.','Check the applicable coverage and the local repair and parts plan for the individual vehicle.'],
      ]}},
      {heading:'Check registration status before choosing a zero-mileage offer',paragraphs:[
        '“Zero mileage” or “nearly new” does not establish the export category. China’s used-vehicle framework defines used cars by registration and transfer of ownership, rather than an odometer threshold. Ask for the registration history and the exporter’s proposed route.',
        'A recently registered car can also need additional export evidence under the current Chinese requirements. Have the exporter confirm applicability and the documents it will obtain before treating a low-mileage offer as ready to ship.',
      ],sources:['used-export','recent-registration'],links:[{label:'Verify the used car and its seller',href:guide('verify-chinese-used-car-before-payment')}]},
      {heading:'For a new or used electric car, check the charging plan',paragraphs:[
        'Compare the actual charging inlets, supported equipment and battery evidence. A model sold in your market may have different charging hardware or software from a China-market version with the same name. Obtain the specification for the quoted car.',
        'For a used EV, add the installed battery’s report, repairs and charging test results to the comparison. Ask what the health metric measures and how it was obtained. Keep this condition assessment separate from the manufacturer’s published range figure or the percentage of charge shown on the dashboard.',
      ],links:[{label:'Read a used EV battery report',href:guide('used-ev-battery-report')},{label:'Check GB/T and CCS2 compatibility',href:guide('chinese-ev-charging-standards')}]},
      {heading:'Compare the cost of getting each car ready for use',paragraphs:[
        "For a used car, price the work needed to reach your required condition: inspection, agreed repairs, preparation and any re-check. Add freight, destination charges and registration work on the same basis as the new-car offer. Keep confirmed amounts separate from estimates and missing charges.",
        "Vehicle depreciation is one part of ownership cost, not a fixed saving to assume from a used-car price. For your intended holding period, compare the purchase cost, required work and the support you can actually obtain. Battery health and warranty coverage need their own evidence for a used EV.",
        "For a fleet, specify which equipment must remain consistent across the batch. For resale, consider the records you can pass to the next owner. Document acceptable substitutions and recheck the affected destination requirements before accepting another version."
      ],links:[{label:'Build the landed-cost estimate',href:guide('calculate-car-landed-cost')}]},
      {heading:'Questions when choosing new or used cars',questions:[
        {question:'Are used cars from China always cheaper to import?',answer:'The quoted vehicle price may be lower, but compare the full destination cost and preparation for each car. Inspection findings, parts, transport and registration requirements can change the result. Use the same delivery endpoint for both calculations.'},
        {question:'Can a low-mileage car be imported wherever new cars are allowed?',answer:'Check the destination’s definition and route for that vehicle. Low mileage does not establish eligibility, and approval of a new version does not automatically cover a registered used unit. Ask the broker to review its actual registration history.'},
        {question:'Which option is better for a first order?',answer:'Choose the offer for which you can verify eligibility, specification or condition, full costs and support. If either offer has unresolved requirements, ask for the missing evidence before selecting it. A smaller first order still needs those checks.'},
      ],links:[{label:'Check import and registration eligibility',href:guide('check-car-import-eligibility')},{label:'Browse new cars',href:'/new-cars/'},{label:'Browse used cars',href:'/used-cars/'}]},
    ],
    links:[{label:'Prepare a wholesale quote request',href:guide('request-wholesale-car-quote')},{label:'Use the inspection checklist',href:guide('inspect-a-used-car-from-china')}],
  },
  'check-car-import-eligibility': {
    title:'Car Import Requirements: Can You Import This China-Market Car?',
    description:'Check car import requirements before ordering from China: importer status, new or used route, exact version, conformity, registration and EV charging.',
    answer:'Check the exact vehicle and importer against the destination’s import and registration requirements before payment. Give your broker the manufacturing origin, version, powertrain, registration history and intended use. Export permission from China and permission to register at destination are separate checks.',
    image:'documents',reviewed,sources:[usedExport],
    sections:[
      {heading:'Send the broker a vehicle file, not just a model name',paragraphs:[
        "Car import requirements follow the actual vehicle and importing route. Start with the model year, country of origin, registration history, powertrain and intended use. Include left-hand drive or other steering information and the technical evidence requested for applicable emissions standards.",
        "The legal importer also matters. A dealer batch, private purchase and returning-resident scheme can have different conditions. The broker's review should identify any import license, approval or registration requirement that applies to this buyer and exact configuration."
      ],table:{caption:'Information for the destination eligibility check',headers:['Item','What to provide','What to get back'],rows:[
        ['Importer and use','Legal importer, commercial or personal route, resale or fleet use.','Applicable importer registration, permits and limits for that route.'],
        ['Vehicle identity','Make, exact version, model year, VIN when available and manufacturing origin.','Written confirmation of the vehicle category and information still needed.'],
        ['Registration history','New or previously registered status, first registration and relevant records.','Applicable new/used classification and age or other vehicle restrictions.'],
        ['Technical evidence','Powertrain, steering side, emissions or conformity documents and charging inlets for an EV.','Required approval evidence and who can issue or validate it.'],
        ['Arrival and registration','Port or border, final use location and proposed timing.','Clearance, inspection and registration steps, with the responsible parties.'],
      ]}},
      {heading:'Check import clearance and road registration separately',paragraphs:[
        "Vehicle homologation or type approval addresses a technical approval process. Customs entry and vehicle registration may require other records as well. Establish which authority reviews each part of the file and which decisions must be obtained before shipment.",
        "Where a certificate of conformity is requested, match its issuer and scope to the offered version. Do not assume every China-market car has an EU certificate. Used car import rules can also depend on age, condition and registration history; a low odometer reading does not settle that review.",
        "For an EV, add charging compatibility for the actual inlets and local equipment. Keep software, language and service requirements in the same purchasing brief so a substitution triggers a review of the affected checks."
      ],links:[{label:'Prepare the document checklist',href:guide('car-import-documents-checklist')}]},
      {heading:'Resolve the China export side with the named exporter',paragraphs:[
        'Ask who will be the exporter of record and which export category applies to the car. For a used vehicle, request the relevant registration, licensing and inspection file. Check that the exporter can connect those records to the individual VINs in your order.',
        'Keep the China export check and destination approval in the same purchasing file, with a person responsible for each. If the vehicle’s registration status, model or exporter changes, have the affected party review the route again before payment or dispatch.',
      ],sources:['used-export']},
      {heading:'Importing an electric car from China: add local-use checks',paragraphs:[
        'Confirm the actual AC and DC charging arrangements, supported equipment and planned charging sites. Ask whether the local provider can support the exact version. Verify essential software, language, connected features and parts support that your use depends on.',
        'Make the supplier identify what it has verified and what is awaiting confirmation. A feature working in China does not establish that its account, network or service will operate in your destination. If it is essential to the purchase, agree the acceptance evidence before the order.',
      ],links:[{label:'Check Chinese EV charging standards',href:guide('chinese-ev-charging-standards')},{label:'Confirm warranty and local support',href:guide('car-warranty-and-after-sales')}]},
      {heading:'Use country guidance for the route you actually need',paragraphs:[
        'Latin America and North Africa are not single import regimes. Start with the destination guide, then ask the local broker to check current requirements for your importer and vehicle. Keep the date, official reference and any remaining conditions in its written response.',
      ],links:[{label:'Mexico',href:countryGuidePath('mexico')},{label:'Egypt',href:countryGuidePath('egypt')},{label:'Algeria',href:countryGuidePath('algeria')},{label:'All destination guides',href:destinationPath}]},
      {heading:'Questions about car import eligibility',questions:[
        {question:'Can I import any car advertised by an exporter?',answer:'An advertisement does not establish eligibility for your destination or importer. Ask for the exact vehicle file and have the local route checked before committing. Record any permits, conformity evidence or registration conditions still outstanding.'},
        {question:'Does shipping from China prove the car was made in China?',answer:'Record manufacturing origin and shipment origin separately. Give the broker the relevant evidence for the actual vehicle, especially where tariff treatment or an import route depends on origin.'},
        {question:'What should I do if eligibility is not yet confirmed?',answer:'Keep the quote provisional and identify the missing document or decision, its owner and the next review date. Do not treat an estimate of freight or tax as confirmation that the vehicle can be imported and registered.'},
      ]},
    ],
    links:[{label:'Compare new and used orders',href:guide('new-vs-used-cars')},{label:'Request a quote with the right specifications',href:guide('request-wholesale-car-quote')}],
  },
  'compare-car-export-quotes': {
    title:'How to Compare Car Export Quotes from China',
    description:'Compare car import quotes using the same version, condition, quantity and delivery point. Check exclusions, payment milestones and supplier evidence.',
    answer:"A useful car export quote identifies the vehicle, quantity, quote validity and delivery point. Compare the wholesale car price with its inspection cost, shipping cost and excluded charges, then review payment terms and the work still left to your business.",
    image:'quote',reviewed,sources:[icc],
    sections:[
      {heading:'Make the vehicle and quantity comparable first',paragraphs:[
        "Give every supplier one specification brief. Compare model year, trim, powertrain and equipment, and record the quantity at the stated unit price. Vehicle availability should say which units are identified and which are still to be sourced.",
        "Name the contracting seller and exporter of record. For a used car, compare the actual VIN, registration and condition file, including preparation and repairs in the offer. Price a proposed alternative as a separate option so a lower total cannot conceal a different car."
      ],table:{caption:'Car export quotation comparison sheet',headers:['Line to compare','Offer A','Offer B'],rows:[
        ['Car or batch','Record exact specification or VIN list.','Record differences from the same brief.'],
        ['Price basis','Unit price, currency, quantity and validity.','Match currency and quantity; record expiry.'],
        ['Delivery','Trade rule, named place and included services.','Identify the same endpoint and services.'],
        ['Extra costs','List exclusions and amounts awaiting a quote.','Price the same missing work before comparing.'],
        ['Inspection and preparation','Checks, repairs, re-checks and release decision.','Match scope and record unresolved items.'],
        ['Payment and schedule','Milestones, evidence due and proposed dates.','Compare conditions, changes and refund terms.'],
        ['After-sales','Provider, destination scope and costs covered.','Record the support actually offered in writing.'],
      ]}},
      {heading:'Bring EXW, FOB and CIF offers to the same endpoint',paragraphs:[
        "Write the selected trade rule, named place and edition beside each price. An FOB car price and a CIF car price cover different transport scopes. Add the freight and insurance outside the FOB offer and check both offers for destination handling before comparing totals.",
        "Use the same port, yard or registration endpoint for the local estimate. The worked Incoterms example shows the arithmetic; actual freight, insurance and destination charges need current quotations for your vehicle list."
      ],sources:['icc'],links:[{label:'See the EXW, FOB and CIF comparison',href:guide('exw-fob-cif-car-shipping')},{label:'Use the landed-cost calculator',href:guide('calculate-car-landed-cost')}]},
      {heading:'Check the conditions behind a low car import quote',paragraphs:[
        'Read the exclusions and provisional items. A lower number may depend on a different trim, another loading point, a larger quantity or work the buyer still has to arrange. Ask the seller to price your original requirement as well as any proposed alternative.',
        'Keep uncertainty visible. “Freight to follow,” “subject to inspection” and “documents to be confirmed” are open items, not zero-cost inclusions. Request the person responsible, expected evidence and the point at which the price or order can be revised.',
      ],items:[
        'Confirm the contracting seller and the entity that will export the cars.',
        'Separate current availability from an estimated sourcing or production window.',
        'Identify the inspection provider, scope and authority to approve release.',
        'Check the exact support terms instead of comparing a general warranty headline.',
      ]},
      {heading:'Ask for a revised written offer before choosing',paragraphs:[
        'Send each seller the unresolved differences and ask for an updated version of its quotation. Keep the quote date, reference and validity with your comparison so your team does not approve an expired price or a superseded specification.',
        'When a substitution, route or schedule changes, update the affected costs and destination check. Confirm payment milestones against the revised order. The comparison is complete when the selected offer describes the car and work you intend to buy, including what remains your responsibility.',
      ],links:[{label:'Agree payment and order changes',href:guide('car-order-payment-and-changes')}]},
      {heading:'Questions about comparing export prices',questions:[
        {question:'How many supplier quotes should I request?',answer:'Request enough comparable offers to understand the specification, service scope and unresolved costs. More offers help only when suppliers receive the same brief. Use the RFQ template to keep the responses comparable.'},
        {question:'Can I compare an online car price with a written export offer?',answer:'Check what the online price actually covers, including version, condition, quantity, currency and validity. Ask for a written offer to your named delivery point before treating it as a purchasing alternative.'},
        {question:'Should I choose the cheapest supplier?',answer:'Compare the confirmed total together with the vehicle evidence and services you need. Resolve material gaps before approval. A quote with missing inspection, preparation or destination costs is not yet a complete comparison.'},
      ]},
    ],
    links:[{label:'Copy the wholesale RFQ template',href:guide('request-wholesale-car-quote')},{label:'Verify a used car before paying',href:guide('verify-chinese-used-car-before-payment')}],
  },
  'car-order-payment-and-changes': {
    title:'Car Export Payment Terms: Deposits, Transfers and Order Changes',
    description:'Agree car export payment milestones, verify bank instructions and document substitutions, delays and refunds before sending a deposit or balance.',
    answer:"Agree car import payment terms in the signed order: deposit payment, balance payment, currency, beneficiary and the evidence due at each stage. Complete supplier verification and beneficiary verification before the transfer. The order should also state cancellation terms, refund terms and how a change is approved.",
    image:'quote',reviewed,sources:[payments,fraud,documents,
      {"id":"credit","label":"International Trade Administration: letter of credit documentation and bank review","href":"https://www.trade.gov/letter-credit"}
    ],
    sections:[
      {heading:'Tie the car deposit and balance to agreed evidence',paragraphs:[
        "Set payment milestones against decisions your team can actually verify. For an identified used car, that may include the VIN and agreed inspection findings. For a batch being sourced, define when individual cars will be proposed, inspected and approved. There is no single deposit percentage to apply to every order.",
        "Each milestone should show the amount, responsible approver and evidence still due. Keep the seller's acknowledgement and transfer reference with the order, then reconcile the remaining balance before the next request."
      ],table:{caption:'Details to complete for each payment milestone',headers:['Record','What to agree'],rows:[
        ['Amount and reference','Currency, instalment amount, contract reference and any bank charges.'],
        ['Recipient','Contracting seller, beneficiary and documented role of any different payee.'],
        ['Evidence due first','Vehicle identification, inspection, preparation or shipping record specified for that stage.'],
        ['Approval','Who checks the evidence and authorizes the transfer.'],
        ['If the condition is not met','Review, correction, postponement or other action under the agreed terms.'],
        ['Changes and cancellation','Written amendment, cost allocation and applicable refund procedure.'],
      ]}},
      {heading:'Understand the proposed international payment method',paragraphs:[
        "A bank transfer, letter of credit, documentary collection or open-account arrangement creates different payment conditions. The seller and your bank should confirm what is available, the fees and the documents involved before those terms enter the order.",
        "For a letter of credit, obtain the bank's review of the documentary requirements. A bank's examination of presented documents does not replace your agreed physical inspection and acceptance of the car. Keep both processes consistent with the contract."
      ],sources:[
        "payments",
        "credit"
      ]},
      {heading:'Verify a bank transfer and any changed payment instructions',paragraphs:[
        'Compare the beneficiary and account details with the signed instructions held by your finance team. For a new or changed account, contact the seller through an established channel, using a number obtained independently of the payment message. Keep a record of the verification.',
        'IC3 warns that legitimate email accounts can be compromised. A familiar email thread is not sufficient confirmation of a bank change. If instructions conflict, pause the transfer until the seller and your finance team resolve them. If a suspicious transfer has already been made, contact the originating bank promptly.',
      ],sources:['fraud']},
      {heading:'Approve substitutions and delays as contract changes',paragraphs:[
        "Use a written contract amendment or revised offer for a substitute vehicle, revised price or changed dispatch date. Identify the old and proposed details. A replacement used car needs its own VIN and condition review; a different EV version can require another charging and destination check.",
        "Record the buyer's decision and the effect on amounts already paid. Resolve the cancellation terms and refund terms in the actual agreement before the next transfer, including who acts and what evidence is needed."
      ],links:[{label:'Check the revised export quote',href:guide('compare-car-export-quotes')},{label:'Verify a replacement used car',href:guide('verify-chinese-used-car-before-payment')}]},
      {heading:'Questions before paying for a car from China',sources:['documents'],questions:[
        {question:'Is a car deposit refundable?',answer:'Check the written terms for your order, including what happens if the car is unavailable, fails an agreed inspection or cannot meet a condition. Ask the seller to resolve unclear wording before payment. Do not assume one refund policy applies to every supplier.'},
        {question:'Does a pro forma invoice prove the car is ready to ship?',answer:'Treat it as part of the proposed commercial terms. Request the vehicle identification, preparation, inspection and booking evidence required by your order before approving the relevant stage. Check the status of each item separately.'},
        {question:'What should I retain after a transfer?',answer:'Keep the approved instructions, verification record, bank reference and seller’s acknowledgement with the contract. Reconcile the amount received, fees and remaining balance before the next payment request.'},
      ]},
    ],
    links:[{label:'Plan the order-to-arrival stages',href:guide('how-to-buy-cars-from-china')},{label:'Prepare the shipment document file',href:guide('car-import-documents-checklist')}],
  },
  'vehicle-arrival-checklist': {
    title:'Car Delivery Checklist: Arrival Inspection After Import',
    description:'Prepare a vehicle arrival inspection after shipping: release documents, VINs, condition photos, keys, missing items and a shipment damage record.',
    answer:"Use a vehicle arrival inspection to match each VIN and its condition to the departure file before onward handover. Give the receiving team a delivery inspection checklist, release instructions and accessory inventory. Preserve a shipping damage report for any discrepancy and follow the applicable claims procedure.",
    image:'ports',reviewed,sources:[carrier,documents],
    sections:[
      {heading:'Prepare the receiving file before the cars arrive',paragraphs:[
        "The receiving file should include the bill of lading or transport reference, VIN list, departure photographs, accepted findings and supplied-item inventory. Confirm customs release, collection authority and terminal access with the responsible parties before arranging the collection.",
        "Set the collection window and identify outstanding charges, including possible port storage charges. A VIN check and a record of missing accessories should be completed at the earliest permitted handover. Note any access limits so the next inspector knows what remains unchecked."
      ],sources:['documents'],table:{caption:'Vehicle arrival inspection checklist',headers:['Check','Record at collection'],rows:[
        ['Identity and count','VIN for each unit, model, quantity, collection location, date and time.'],
        ['Visible condition','Walkaround photographs, affected panels, glass, wheels and any accessible concerns.'],
        ['Mileage and indicators','Displayed odometer and warning messages where access and operation are permitted.'],
        ['Supplied items','Agreed keys, tools, charging equipment, manuals and other listed accessories.'],
        ['Handover','Receiving party, transport reference and any discrepancy noted through the required process.'],
        ['Next action','Who receives the report and whether a further inspection or other instruction is needed.'],
      ]}},
      {heading:'Match each car with its departure condition record',paragraphs:[
        "Photograph both the vehicle reference and the area being assessed. Compare the arrival views with the departure record, then retain the proof of delivery and any recorded exceptions. State if the underside, cabin or a test function could not be checked at that location.",
        "For a container, have the responsible party record the container seal and reference as applicable, along with opening and unloading evidence. Follow the terminal and packing provider's instructions. Vehicle collection and return of empty equipment can involve separate deadlines and charges."
      ],links:[{label:'Review the chosen shipping arrangement',href:guide('container-vs-roro-car-shipping')}]},
      {heading:'What to do about transport damage or a missing item',paragraphs:[
        "Send a notice of claim or initial damage notification through the procedure required by the actual carrier and marine cargo insurance policy. Include the VIN, shipment reference, discovery time and photographs, with the departure and receiving records. Establish whether a survey or further inspection is needed before repair or onward movement.",
        "Höegh Autoliners publishes its own claims guidance; another carrier or insurer can require a different process. Use the instructions and deadlines for your shipment. Keep transport damage, a vehicle fault and missing sales-order items separately identified so each reaches the appropriate provider. Leave an unresolved cause recorded as unresolved."
      ],sources:['carrier'],links:[{label:'Prepare an after-sales request',href:guide('car-warranty-and-after-sales')}]},
      {heading:'Finish the local handover and registration work',paragraphs:[
        'Have the broker confirm the remaining clearance and registration steps. Keep the final invoice, vehicle list, transport documents and local records together by VIN. Clearance from a terminal does not, by itself, establish that the car is ready for road use.',
        'For an EV, arrange the agreed commissioning and charging check with the appropriate provider. Give the next owner or fleet team the manuals, verified equipment information, maintenance records and support contact supplied for that vehicle. Record anything still outstanding before closing the purchase file.',
      ],links:[{label:'Check the destination registration route',href:guide('check-car-import-eligibility')},{label:'Review the charging setup',href:guide('chinese-ev-charging-standards')}]},
      {heading:'Questions about collecting imported cars',questions:[
        {question:'Should I wait until the car reaches my showroom to check it?',answer:'Arrange the earliest permitted receiving inspection and record where the condition was checked. A later showroom inspection may still be needed, but preserve the evidence from each handover. Ask the carrier or insurer how to record an issue discovered later.'},
        {question:'What if the car cannot be started at collection?',answer:'Record the condition and notify the responsible party. Ask for handling and diagnostic instructions from the appropriate provider rather than assuming the cause. Confirm any additional movement or inspection before it is arranged.'},
        {question:'Is every arrival problem covered by shipping insurance?',answer:'Check the policy, exclusions, insured journey and evidence requirements. Report the facts and let the relevant provider review the issue. Keep any sales-order or warranty request distinct so it reaches the right contact.'},
      ]},
    ],
    links:[{label:'Review the import document file',href:guide('car-import-documents-checklist')},{label:'Shipping and delivery services',href:'/export-services/shipping-support/'}],
  },
  'car-warranty-and-after-sales': {
    title:'Imported Car Warranty and After-Sales Support: What to Confirm',
    description:'Check warranty coverage for a car imported from China: destination, VIN, EV battery terms, repair approval, parts, labour and support costs.',
    answer:"An imported car warranty needs a named provider and written eligibility for the exact VIN, destination and use. Separate manufacturer warranty, seller warranty and any local after-sales support. Establish the repair process and costs before choosing an offer.",
    image:'battery',reviewed,sources:[warranty,carrier,
      {"id":"recall","label":"NHTSA: VIN recall lookup scope and exclusions, including international vehicles","href":"https://www.nhtsa.gov/recalls"}
    ],
    sections:[
      {heading:'Who will support the imported car in your market?',paragraphs:[
        "The support file should name the provider, applicable terms and contact for the version being supplied. Record coverage eligibility for its origin, registration history and intended use, along with the local workshop or diagnostic provider.",
        "Parts availability is only one part of the arrangement. Establish access to suitable diagnostic software, the repair authorization process and who pays labour costs, testing and transport. A parts-only commitment needs a budget for the work your business will arrange locally."
      ],table:{caption:'Imported car warranty and support checklist',headers:['Question','Written confirmation to request'],rows:[
        ['Eligibility','Covered vehicle, destination, owner or use restrictions and required maintenance history.'],
        ['Coverage period','Start date, time and mileage limits, and any separate component terms.'],
        ['Covered costs','Diagnosis, parts, labour, shipping, duties, travel or other charges actually included.'],
        ['Local repair','Workshop, required approval, evidence to submit and permitted repair process.'],
        ['Parts supply','Correct part identification, availability, quote, freight and return conditions.'],
        ['Claims','Named provider, contact, reference process and decisions required before work.'],
      ]}},
      {heading:'Do Chinese car warranties apply overseas?',paragraphs:[
        'Check the terms for the actual car and market. Manufacturer distribution and warranty arrangements can be territorial. As one specific example, Toyota Ireland states that vehicles originating outside the Pan-European market do not have its manufacturer warranty cover in Ireland. That is an Ireland policy example, not a rule for every brand or destination.',
        'Ask the relevant provider to confirm your own case in writing. Keep separate any manufacturer coverage, seller commitment and local support you arrange yourself. If the offer uses the word “warranty” without identifying the provider or scope, request those details before comparing it with another car.',
      ],sources:['warranty']},
      {heading:'For an EV battery warranty, read the component terms',paragraphs:[
        'Ask whether the traction battery has separate coverage, a capacity condition, a test method or restrictions on use and maintenance. Confirm the start date and eligibility for the individual vehicle. Do not assume that a headline battery term quoted for a local-market new car transfers to a China-market used unit.',
        'Keep the purchase-time battery report with the warranty evidence. If a later issue arises, the provider will need the vehicle reference, symptoms and the records it requests. A battery state-of-health estimate describes a measurement; it does not itself establish the provider’s coverage decision.',
      ],links:[{label:'Read the battery health report',href:guide('used-ev-battery-report')}]},
      {sources:["recall"], heading:'Send a support request that can be assessed',paragraphs:[
        "Provide the VIN, order reference, mileage, location and a dated description of the symptoms. Include warning messages, photographs and the qualified diagnostic report available, plus any relevant repairs or modifications since delivery.",
        "For a VIN lookup, recall check or service campaign inquiry, use the manufacturer or provider responsible for that vehicle's market version. Confirm whether the tool or provider covers international vehicles. An empty result in a database with a limited market scope does not establish a complete campaign history.",
        "Obtain the provider's next instruction and repair authorization before committing to reimbursable work. For a parts quote, match the part number to the actual car and identify freight, duties and local fitting costs. Keep the battery warranty response separate where it has its own component terms."
      ],items:[
        'Keep each request under one reference with the provider’s response and agreed next action.',
        'Retain service and repair records, including work carried out at destination.',
        'Confirm any return, freight or reimbursement conditions before authorizing the work.',
      ],links:[{label:'Contact the after-sales team',href:'/export-services/after-sales/'}]},
      {heading:'Separate an arrival discrepancy from a vehicle warranty issue',paragraphs:[
        'If damage is found at collection, preserve the receiving and departure records and follow the applicable carrier and insurance process. A transport claim and a vehicle warranty request may have different contacts and conditions. Ask the relevant parties to assess the evidence rather than assuming one route covers everything.',
      ],sources:['carrier'],links:[{label:'Use the arrival inspection checklist',href:guide('vehicle-arrival-checklist')}]},
      {heading:'Questions about after-sales support for an imported car',questions:[
        {question:'Can a dealer repair the car and claim the cost later?',answer:'Confirm the approval and reimbursement process with the provider before arranging work. Ask which evidence, workshop and cost authorization are required. Keep urgent handling or safety instructions from the qualified provider with the case record.'},
        {question:'What if the seller only offers spare parts?',answer:'Ask which parts, how they are identified, who pays freight and duties, and who handles local diagnosis and fitting. Record those boundaries and budget for the work left to your business.'},
        {question:'Does a used car keep its remaining original warranty?',answer:'Have the provider check the VIN, origin, ownership, destination, use and maintenance records. Transferability and territorial eligibility come from the applicable terms. Treat unconfirmed remaining coverage as an open purchasing question.'},
      ]},
    ],
    links:[{label:'Compare the support in export quotes',href:guide('compare-car-export-quotes')},{label:'Browse destination guides',href:destinationPath}],
  },
};
