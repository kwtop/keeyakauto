import {purchaseGuidePath as guide, type GuideEditorial, type GuideSection} from './guideEditorial';

// Keyword scope, trend windows and source checks: docs/country-guide-keywords-20261105.
// Country-specific rules stay with their own jurisdiction; cost estimates are not tax determinations.
const additions: Record<string, GuideSection[]> = {
  bolivia: [
    {heading:'Choosing a Chinese electric car, hybrid or pickup for Bolivia',paragraphs:[
        "When comparing Chinese electric cars for Bolivia, put the vehicle classification and model year beside the exact version. These determine the questions for Customs and IBMETRO. A pickup needs its own classification review rather than approval borrowed from a passenger SUV.",
        "The technical file should identify the fuel and drive system and the applicable acceptance or emissions test evidence. IBMETRO publishes a process for flex-fuel and hybrid vehicles under RM 119/2025. Have the responsible provider identify the evidence for the configuration on the offer.",
        "Specify AC charging and DC fast charging separately for an EV, with inlet photographs and the intended equipment in Bolivia. Confirm the manuals and support for the supplied version before relying on a familiar model name."
      ],sources:['ibmetro','hybrid'],links:[{label:'Check GB/T and CCS2 charging compatibility',href:guide('chinese-ev-charging-standards')}]},
    {heading:'Car import costs in Bolivia: include the transit leg',paragraphs:[
        "A car import tax estimate in Bolivia needs the broker's customs valuation and classification for the actual vehicle. Obtain a dated breakdown, then add the sea leg and inland transit through to the Bolivian receiving point. A foreign destination port can leave border handling and onward transport outside the quoted price.",
        "The transport offer should name the sea port, transit provider and Bolivian clearance point. Check freight insurance for that whole intended journey and identify any storage or collection charges. Registration and final delivery remain separate lines where the budget includes them."
      ],items:[
      'Name the sea port, transit provider, Bolivian clearance point and final receiving address.',
      'Confirm the document handoff and any collection or storage charges at the transit port.',
      'Recheck the budget when the vehicle class, model year or route changes.',
    ],links:[{label:'Build the full landed-cost worksheet',href:guide('calculate-car-landed-cost')},{label:'Compare RoRo and container shipping',href:guide('container-vs-roro-car-shipping')}]},
    {heading:'Questions before importing a car to Bolivia',questions:[
      {question:'Does very low mileage make an older-model car eligible in Bolivia?',answer:'Check the model year and vehicle class under the current Bolivian rule. Low mileage does not change the year shown in the technical and registration records. Have the broker resolve the applicable age calculation before the seller identifies the car for shipment.'},
      {question:'Can the car travel through a port in Chile or Peru?',answer:'Ask the forwarder to quote the actual sea and transit route and confirm who handles each customs movement. Arrival at a foreign sea port is not final delivery in Bolivia. Include the onward transport, documents and charges in the written scope.'},
      {question:'What should I send when requesting a Bolivia car import quote?',answer:'Provide the exact model, year, vehicle class, powertrain, quantity and final destination. Include the registration history for a used unit and ask which IBMETRO and customs evidence remains outstanding. Request the vehicle and transport prices on a consistent delivery basis.'},
    ],sources:['customs'],links:[{label:'Prepare a supplier RFQ',href:guide('request-wholesale-car-quote')}]},
  ],
  peru: [
    {heading:'New vs used Chinese cars for Peru',paragraphs:[
        "For used car imports to Peru, establish the category before applying a limit. The SUNAT checks above concern M1 vehicles under the ordinary used passenger-car route. The age and mileage limits are part of a larger file that also covers condition, left-hand steering, emissions and technical inspection.",
        "Keep vehicle mileage evidence with the VIN, model year, first registration and fuel type. Used diesel passenger cars in M1 are excluded under that ordinary route; the cited heavy-vehicle exceptions do not create an M1 permission. Review a substitute car under its own records.",
        "For a new vehicle, establish its new-car import and registration file separately. Match the technical sheet and exact market version to the proposed procedure before comparing its price with a used unit."
      ],sources:['sunat','mileage'],links:[{label:'Verify a used car before payment',href:guide('verify-chinese-used-car-before-payment')}]},
    {heading:'What determines the cost of importing a car to Peru?',paragraphs:[
        "The car import tax estimate for Peru starts with the actual classification and customs valuation. Obtain the broker's dated calculation for the car and route, then add inspection, terminal handling, clearance and registration work outside the vehicle offer.",
        "Use the same delivery point for the seller and forwarder quotes. Keep freight and insurance in the budget once. EV charging equipment or local work belongs in the total when needed for the version you intend to use."
      ],links:[{label:'Use the landed-cost calculator',href:guide('calculate-car-landed-cost')},{label:'Compare FOB and CIF prices',href:guide('exw-fob-cif-car-shipping')}]},
    {heading:'Importing an electric or hybrid car to Peru',paragraphs:[
      'Specify whether the car is battery-electric, a plug-in hybrid or another hybrid configuration. Ask the importer to check the applicable category and supporting documents. A description such as “new energy” is not precise enough for a technical or customs review.',
      'For a used EV, request the battery report and charging evidence linked to the actual VIN. For any EV, check the AC and DC inlet against the intended local equipment. Price the inspection and support you need instead of treating a dashboard range photograph as the full battery assessment.',
    ],links:[{label:'Read a used EV battery report',href:guide('used-ev-battery-report')},{label:'Check the charging setup',href:guide('chinese-ev-charging-standards')}]},
    {heading:'Questions about car imports to Peru',questions:[
      {question:'Can a used diesel passenger car be imported to Peru?',answer:'SUNAT’s ordinary used-vehicle guidance excludes used M1 diesel passenger cars. Exceptions listed for certain heavy categories do not establish an M1 route. Check the precise category and any claimed exception with the Peruvian broker before purchase.'},
      {question:'Is an odometer photo sufficient for Peru’s mileage requirement?',answer:'Ask the importer which vehicle or inspection records it must present for the mileage condition. Keep the dated reading, VIN and supporting documents together. A seller’s photograph alone does not explain the provenance or acceptance of the record.'},
      {question:'Can a car sold locally under the same model name be imported from China?',answer:'Match the exact trim, technical identifiers and available documents with the proposed Peruvian route. A local model name does not confirm that the offered China-market version has the same equipment or registration evidence.'},
    ],sources:['sunat','mileage']},
  ],
  chile: [
    {heading:'Chinese electric cars in Chile: match the approved version',paragraphs:[
      'If a Chinese model is already sold in Chile, ask whether the approval evidence covers the configuration you are importing. Compare the technical identifiers, drive system and equipment, not just the badge and model name. Obtain the importer’s explanation of the certificate path for the actual units.',
      'For an EV or plug-in hybrid, include the charging inlets, onboard charging specification and intended local equipment in the purchase brief. Check essential software, language and service arrangements for the supplied market version. Keep those checks alongside the homologation file.',
    ],sources:['3cv'],links:[{label:'Check GB/T, Type 2 and CCS2 charging',href:guide('chinese-ev-charging-standards')},{label:'Confirm imported-car support',href:guide('car-warranty-and-after-sales')}]},
    {heading:'Build the Chile car import cost before comparing prices',paragraphs:[
        "For a car import tax estimate in Chile, provide the invoice basis, vehicle details, manufacturing origin and named receiving point. Have the broker identify the customs valuation, applicable duty and import VAT treatment for that transaction. Keep the dated assumptions with the offer.",
        "Establish which certificate of origin or other origin evidence is required for any treatment being claimed. Shipment from China does not by itself establish manufacturing origin. Add customs clearance, registration and transport work outside the seller's scope.",
        "For Chinese electric cars, complete the local charging compatibility review alongside approval and cost checks. Obtain the specifications for the actual inlets and the equipment you intend to use in Chile."
      ],links:[{label:'Compare export quotations',href:guide('compare-car-export-quotes')},{label:'Calculate landed cost',href:guide('calculate-car-landed-cost')}]},
    {heading:'Questions about importing cars from China to Chile',questions:[
      {question:'Can I import a used car from China for normal dealer resale in Chile?',answer:'Chile’s ordinary used-car restriction makes this a different question from sourcing a new vehicle. Do not assume a low-mileage car qualifies. Have Customs confirm the specific legal exception if one is proposed before paying for a used unit.'},
      {question:'What is the CHI or CHI-e for an imported car?',answer:'It is the individual homologation certificate associated with the applicable Chilean approval process. Ask the importer how the exact vehicle will obtain its required certificate and match the vehicle details to the approved configuration.'},
      {question:'Is the shipping quote enough to start a Chile order?',answer:'Complete the new/used status, version and approval review first. The shipping quote prices a transport service; it does not establish the car’s registration route. Put the remaining documents and acceptance conditions into the order.'},
    ],sources:['customs','3cv'],links:[{label:'Prepare the car import documents',href:guide('car-import-documents-checklist')}]},
  ],
  colombia: [
    {heading:'Electric vs hybrid cars: prepare a Colombia version file',paragraphs:[
      'When comparing Chinese electric cars in Colombia, state the actual powertrain rather than a broad “new energy” label. Give the importer the battery-electric, plug-in hybrid or other hybrid specification and the intended use. Ask it to review classification and required approvals for each proposed configuration.',
      'Confirm the exact market version before ordering a batch. Include the charging inlets, essential equipment, manuals and available service information. If a supplier proposes another trim, check the effect on the import file and local use before accepting the substitution.',
    ],sources:['mincit'],links:[{label:'Check Chinese EV charging standards',href:guide('chinese-ev-charging-standards')},{label:'Compare exact model specifications',href:'/guides/comparisons/'}]},
    {heading:'Car import tax in Colombia: compare the full transaction',paragraphs:[
        "A car import tax estimate in Colombia needs the exact tariff classification and customs valuation. MinCIT's process starts with identifying the subheading and applicable requirements. Give the broker the actual battery-electric or plug-in hybrid specification and request a dated calculation for that case.",
        "Include the invoice, vehicle list and bill of lading information needed by the importer. Establish whether an import license, registration or other approval is required for this transaction through VUCE; do not treat a powertrain label as an exemption from the file review.",
        "Add handling, brokerage, vehicle registration and delivery outside the supplier's price. For Chinese electric cars, charging compatibility and local support also belong in the version decision, even when their cost is outside the customs calculation."
      ],sources:['mincit'],links:[{label:'Build a landed-cost estimate',href:guide('calculate-car-landed-cost')}]},
    {heading:'Coordinate the importer, VUCE file and shipment',paragraphs:[
      'Name the Colombian importer and the person handling the required VUCE procedure before approving dispatch. Ask them which vehicle documents and approvals need to be ready at each stage. Share the same technical file with the exporter so it can confirm what it will supply.',
      'Before booking, have the forwarder identify the arrival port, release arrangements and transport assumptions. Give the receiving team the VIN list and departure condition record. An estimated sailing date should not conceal an outstanding import requirement.',
    ],sources:['mincit'],links:[{label:'Prepare the export and import documents',href:guide('car-import-documents-checklist')},{label:'Plan the arrival inspection',href:guide('vehicle-arrival-checklist')}]},
    {heading:'Questions about importing a Chinese car to Colombia',questions:[
      {question:'Can a business use a personal exception to import used cars into Colombia?',answer:'Have the importer identify a legal route for the actual buyer and purpose. The Ministry of Transport treats used-car exceptions separately from ordinary commercial sourcing. An exception for a qualifying individual does not establish a dealer’s resale route.'},
      {question:'Does importing an electric car remove the VUCE and document checks?',answer:'Ask the importer which registrations, approvals or licences apply to that specific vehicle. Its powertrain is part of the classification file; it does not replace the importer, documentation and local-use review.'},
      {question:'What should a Colombian dealer include in the first supplier request?',answer:'State the exact model and powertrain, quantity, intended use, destination and required vehicle documents. Add charging and support requirements for an EV. Ask the supplier to identify available units separately from cars still to be sourced.'},
    ],sources:['mincit','used'],links:[{label:'Copy the wholesale car RFQ',href:guide('request-wholesale-car-quote')}]},
  ],
  ecuador: [
    {heading:'Check model year against the Ecuador shipment plan',paragraphs:[
      'Have the importer review the model year and planned shipment date together. The ordinary new-vehicle rule cited above ties the model-year check to the import year and uses the shipment date in that determination. A price agreed before a year-end delay may therefore need a fresh eligibility review.',
      'Ask the seller to supply the relevant vehicle identifiers and manufacturer information. If a version or production plan changes, send the revised file to the importer before dispatch. Keep the current COMEX and vehicle-control check with the order rather than relying on a model’s local sales name.',
    ],sources:['comex'],links:[{label:'Check the vehicle’s import eligibility',href:guide('check-car-import-eligibility')}]},
    {heading:'Electric cars in Ecuador: separate approval, taxes and charging',paragraphs:[
        "For Chinese electric cars, establish the exact powertrain and category before requesting a car import tax estimate in Ecuador. The broker's classification and the applicable treatment should refer to the actual version and transaction.",
        "Keep vehicle registration and charging compatibility in the local-use review. Obtain the inlet photographs and vehicle documents, then confirm the intended local charging equipment. Price any equipment or support work left outside the supplier's offer."
      ],links:[{label:'Review GB/T and CCS2 compatibility',href:guide('chinese-ev-charging-standards')},{label:'Estimate total landed cost',href:guide('calculate-car-landed-cost')}]},
    {heading:'Shipping a car to Ecuador: keep the ECUAPASS file consistent',paragraphs:[
        "The importer should check the invoice, vehicle list and transport drafts against one approved set of identifiers. Assign the customs declaration and any required origin or control evidence to the responsible parties. Keep the RUC, digital signature and ECUAPASS setup consistent with the legal importer.",
        "Confirm the departure and arrival points, included handling and collection conditions with the forwarder. Review the model year and shipment date again if the schedule changes. COMEX and vehicle-control requirements should be resolved before the car is dispatched under an incomplete file."
      ],sources:['senae'],links:[{label:'Use the document checklist',href:guide('car-import-documents-checklist')},{label:'Compare shipping services',href:guide('container-vs-roro-car-shipping')}]},
    {heading:'Questions about importing cars from China to Ecuador',questions:[
      {question:'Can I import a used car under Ecuador’s ordinary dealer route?',answer:'The cited ordinary rule covers new vehicles subject to its model-year conditions. Ask the importer to identify a valid exception before considering a used unit. Returning-resident household goods provisions have their own buyer and vehicle requirements.'},
      {question:'Can a foreign company simply ship a car to my name in Ecuador?',answer:'Confirm the importer setup and applicable procedure before shipment. SENAE describes RUC, digital-signature and ECUAPASS registration steps for the import process. The buyer and vehicle must have a workable clearance and local-use file.'},
      {question:'What happens if a quoted car is replaced with another model year?',answer:'Have the importer repeat the year, classification and control review. Update the commercial offer and vehicle list, then confirm the effect on price, documents and timing before accepting the replacement.'},
    ],sources:['senae','comex','migrants']},
  ],
  mexico: [
    {heading:'Chinese cars in Mexico and cars sourced directly from China',paragraphs:[
        "Chinese electric cars advertised by a Mexican distributor can have different equipment from a directly sourced China-market unit. Check the actual version, charging compatibility and available vehicle documents before choosing a trim. Establish the importer and intended registration route for those units.",
        "For used car imports, have the broker identify the legal procedure for the actual country of origin and vehicle. Provisions discussed for cars made or assembled in North America do not become a route for a China-made car simply because it passes through another country."
      ],sources:['sat','used'],links:[{label:'Check the exact import requirements',href:guide('check-car-import-eligibility')}]},
    {heading:'Mexico car import tax: what a calculator needs',paragraphs:[
        "The Mexico car import tax calculation should name the current TIGIE fraction, NICO where applicable, customs value and date used. Provide the actual new or used status, powertrain and origin evidence. The broker should check later amendments and the applicable NOM requirements for that configuration.",
        "Obtain separate calculations for a battery-electric car and a hybrid when comparing those offers. Any claimed preferential treatment or relief needs its own conditions and supporting origin file.",
        "Add terminal handling, brokerage, conformity work, registration fees and inland delivery outside the vehicle price. Keep the supporting information consistent with the pedimento file. The landed-cost calculator adds your estimates; it does not establish a tariff or approve a car."
      ],sources:['tariff','snice'],links:[{label:'Use the landed-cost calculator',href:guide('calculate-car-landed-cost')}]},
    {heading:'Shipping cars to Mexico: confirm the import file before loading',paragraphs:[
      'Give the exporter and forwarder the same approved vehicle list and importer details. Ask the broker to review the invoice, transport and other supporting information it needs for the pedimento. Resolve version or consignee changes before they create different records in the shipment file.',
      'Compare transport offers to the same Mexican port or final receiving point. Request the charges left outside the freight line, the release arrangements and the receiving inspection record. Keep any technical or NOM review distinct from the carrier’s acceptance of the cars.',
    ],links:[{label:'Prepare the car import documents',href:guide('car-import-documents-checklist')},{label:'Compare FOB and CIF offers',href:guide('exw-fob-cif-car-shipping')}]},
    {heading:'Questions about importing a car from China to Mexico',questions:[
      {question:'Can I use a US used-car import guide for a China-made car?',answer:'Have the broker check manufacturing origin, VIN and the legal provision being claimed. The North American origin conditions in some used-vehicle schemes do not establish eligibility for a China-made vehicle.'},
      {question:'Does a CIF car price include Mexican clearance and registration?',answer:'Ask the seller to itemize any additional services. Under the standard CIF allocation, the buyer handles import clearance and its costs. Confirm the broker, technical review, registration and local delivery budget separately.'},
      {question:'Can the local Mexican brand dealer honor the original warranty?',answer:'Request written confirmation for the actual VIN, market version, ownership and use. A familiar brand or model name is not evidence that local distributor or manufacturer coverage applies to a directly sourced China-market car.'},
    ],links:[{label:'Confirm the warranty and support scope',href:guide('car-warranty-and-after-sales')}]},
  ],
  algeria: [
    {heading:'What to include in an Algeria car import cost estimate',paragraphs:[
        "For a car import tax estimate in Algeria, give the local broker the invoice, vehicle age, powertrain, importer and intended regime. Request the applicable duties, taxes and clearance charges for that case. Add origin handling, freight and the work needed to reach the named receiving point.",
        "Keep the customs declaration, conformity and registration requirements with the dated estimate. For Chinese electric cars, check charging compatibility and support for the actual version before choosing it on price. Price any equipment and local work outside the transport offer."
      ],links:[{label:'Calculate the full landed cost',href:guide('calculate-car-landed-cost')},{label:'Compare car export prices',href:guide('compare-car-export-quotes')}]},
    {heading:'Electric and hybrid cars: check local use before choosing a version',paragraphs:[
      'Confirm the actual charging inlets, supported charging equipment and service arrangements in Algeria for the version being offered. A car’s battery condition, customs category and local charging compatibility are separate checks. Resolve each before treating the car as ready for use.',
      'For a used EV, request the dated VIN-linked battery evidence and agree how any unresolved findings will be handled. For every order, identify the documents the exporter will supply and the person who will review the file before loading.',
    ],links:[{label:'Read a used EV battery report',href:guide('used-ev-battery-report')},{label:'Check charging compatibility',href:guide('chinese-ev-charging-standards')}]},
    {heading:'Questions about importing cars from China to Algeria',questions:[
      {question:'Does Algeria’s recent used-car route cover a diesel passenger car?',answer:'The referenced passenger-car definition lists electric, spark-ignition gasoline and gasoline-electric hybrid vehicles. Do not assume a diesel version qualifies under that route. Ask Customs or the broker to confirm the current category for the actual car.'},
      {question:'Can an Algerian company use a resident individual’s import procedure?',answer:'Identify the legal importer and purpose first. New-car dealer activity has its own framework, separate from the resident individual route. Have the local business confirm its authorization and vehicle approval before requesting batch pricing.'},
      {question:'Is model year enough to check the recent used-car age condition?',answer:'Obtain the first-circulation evidence and the date used for the declaration review. Ask the broker to apply the current rule to those dates. The model year or date of a supplier photograph does not replace that record.'},
    ],sources:['dealers','used']},
  ],
  morocco: [
    {heading:'Morocco car import tax calculator: use MCV and ADIL for the right questions',paragraphs:[
        "Start with MCV, the vehicle customs service linked from Morocco's official MRE portal. Record the version, age, value, origin and regime entered, then have the broker confirm the customs valuation and treatment for the actual transaction. ADII is the customs administration; ADIL provides tariff and trade-measure information.",
        "Keep the assumptions and result with the invoice and technical file. Add handling, brokerage, vehicle registration and delivery outside that estimate. A calculation for another buyer or version does not establish your final bill."
      ],sources:['mcv','adil'],links:[{label:'Build a complete landed-cost worksheet',href:guide('calculate-car-landed-cost')}]},
    {heading:'New or used Chinese cars: confirm the Moroccan registration path',paragraphs:[
        "Establish the NARSA identification and approval procedure for the exact version before buying a new or used unit. If a certificate of conformity or individual approval record is requested, identify the issuer and accepted scope rather than assuming an EU document accompanies every car.",
        "For a used unit, provide its first-registration and ownership file. Keep personal MRE relief separate from technical approval and a dealer's commercial calculation. Chinese electric cars and hybrid cars also need their own powertrain information and local-use review."
      ],sources:['registration','mre'],links:[{label:'Prepare the import document file',href:guide('car-import-documents-checklist')}]},
    {heading:'Electric and hybrid cars in Morocco: budget for the actual setup',paragraphs:[
      'Give the broker the exact BEV, plug-in hybrid or other hybrid specification when requesting tax and registration estimates. Ask it to identify any treatment or conditions it is relying on. Do not treat “electric” as a complete description of the import charges.',
      'Separately check the charging inlets and the local equipment you will use. Ask the supplier which manuals, software functions, parts and written support apply to the quoted version. Price any charging equipment, diagnosis or local work still needed after delivery.',
    ],links:[{label:'Check GB/T and CCS2 before ordering',href:guide('chinese-ev-charging-standards')},{label:'Confirm warranty and after-sales terms',href:guide('car-warranty-and-after-sales')}]},
    {heading:'Questions about importing a car from China to Morocco',questions:[
      {question:'Is the MCV customs estimate my final cost in Morocco?',answer:'Use it within its stated scope and confirm the vehicle details and regime with the broker. Add the remaining terminal, handling, approval, registration and delivery charges. The final budget needs both the customs calculation and the work outside it.'},
      {question:'Can a dealer use a personal MRE customs allowance for a batch order?',answer:'Confirm the actual buyer and regime. Relief published for qualifying Moroccans residing abroad has personal eligibility and vehicle conditions. Ask the commercial importer for its regular route and calculation rather than applying someone else’s allowance.'},
      {question:'Can I import a Chinese model already advertised in Morocco?',answer:'Have the importer check the offered version, origin, documents and registration process. Local advertising for a model does not confirm approval or support for a directly sourced China-market unit.'},
    ],sources:['mcv','registration','mre']},
  ],
  tunisia: [
    {heading:'Car import tax in Tunisia: select the correct regime',paragraphs:[
        "For a car import tax estimate in Tunisia, select the actual customs regime and enter the vehicle data in the official estimator. FCR concerns qualifying returning residents. Full relief and partial relief have different conditions, so retain the selected option and its written requirements with the buyer's file.",
        "Vehicle age under that route uses first circulation and entry into Tunisia. The buyer's eligibility and the car's eligibility need review together. A commercial importer must establish its own approval and calculation instead of carrying a personal FCR estimate into a dealer order.",
        "Add freight, insurance, terminal release, vehicle registration and delivery outside the estimate. For Chinese electric cars, complete the charging compatibility and support checks for the version being purchased. Keep outstanding costs and eligibility decisions visible before payment."
      ],sources:['calculator','fcr'],links:[{label:'Add the complete landed costs',href:guide('calculate-car-landed-cost')}]},
    {heading:'Choosing a Chinese electric or hybrid car for Tunisia',paragraphs:[
      'Provide the exact powertrain, vehicle category and version when checking eligibility and tax treatment. Ask the broker to confirm the actual regime instead of assuming that an electric or hybrid badge creates an exemption.',
      'Check the charging equipment and local support plan before committing to a China-market EV. Request the inlet photographs, manual and compatibility evidence for the intended local equipment. For a used unit, keep the battery report and any unresolved inspection findings with the purchase conditions.',
    ],links:[{label:'Review Chinese EV charging compatibility',href:guide('chinese-ev-charging-standards')},{label:'Read the used EV battery report',href:guide('used-ev-battery-report')}]},
    {heading:'Questions about importing a car from China to Tunisia',questions:[
      {question:'Can any Tunisian buyer use FCR to import a car?',answer:'FCR concerns qualifying returning residents and has its own personal and vehicle conditions. Have Customs confirm the buyer’s circumstances and previous benefits where relevant. Do not assume that choosing a qualifying car establishes personal eligibility.'},
      {question:'Is Tunisia’s FCR age check based only on the model year?',answer:'The official guidance uses first circulation and the vehicle’s entry into Tunisia for the age check. Get those records and have the applicable dates confirmed before shipment. A model-year label alone is not the complete calculation.'},
      {question:'What should the quote say if FCR eligibility is still pending?',answer:'Identify the pending decision and the documents needed, then agree what happens if the buyer or car fails a condition. Keep the quoted payment, shipment and cancellation terms consistent with that unresolved step.'},
    ],sources:['fcr','age'],links:[{label:'Agree payment and order changes',href:guide('car-order-payment-and-changes')}]},
  ],
  egypt: [
    {heading:'Importing Chinese electric and hybrid cars to Egypt',paragraphs:[
      'Start with the importer and the proposed new or used vehicle route. Send the exact BEV, plug-in hybrid or other hybrid specification, manufacturing origin and intended use to the broker. Ask it to confirm the classification, required vehicle evidence and current treatment before comparing prices.',
      'For an EV, review the actual charging inlets and intended local equipment separately from customs eligibility. Confirm essential language, connected features and support for the market version. A car listed by an exporter is not evidence that these functions or local warranty coverage have been checked.',
    ],links:[{label:'Check the EV charging arrangement',href:guide('chinese-ev-charging-standards')},{label:'Confirm imported-car support',href:guide('car-warranty-and-after-sales')}]},
    {heading:'Egypt car import tax: obtain a vehicle-specific breakdown',paragraphs:[
        "For an Egypt car import tax estimate, provide the actual specification, origin, invoice basis, importer of record and intended regime. Obtain a dated calculation with the customs valuation and the duties, taxes and fees in scope. The GOEIC importer review and vehicle eligibility should match the commercial transaction.",
        "Add document handling, terminal release, brokerage, approvals, vehicle registration and inland delivery outside the seller's offer. For Chinese electric cars, identify the exact powertrain and charging equipment in the same version file. Recalculate affected costs if the car, price or importer changes."
      ],links:[{label:'Use the landed-cost worksheet',href:guide('calculate-car-landed-cost')},{label:'Compare export quotation scopes',href:guide('compare-car-export-quotes')}]},
    {heading:'Shipping cars to Egypt: reconcile ACID and vehicle records',paragraphs:[
        "For a sea shipment subject to ACI, coordinate the Egyptian importer, exporter and forwarder before dispatch. Reconcile Nafeza data and the ACID with the commercial invoice, bill of lading information and approved vehicle list. Establish the required acceptance before loading.",
        "ACID identifies the shipment in the advance-information process; the VIN identifies the individual vehicle. Retain both where required and resolve an importer, exporter or vehicle change through the applicable procedure before it creates conflicting records.",
        "Agree who receives arrival notices and handles release. Give the collecting team the departure condition file and vehicle list so it can record the receiving inspection against the same units."
      ],sources:['nafeza','aci'],links:[{label:'Prepare the car import documents',href:guide('car-import-documents-checklist')},{label:'Use the arrival inspection checklist',href:guide('vehicle-arrival-checklist')}]},
    {heading:'Questions about importing a car from China to Egypt',questions:[
      {question:'Do commercial and personal car imports use the same Egypt checklist?',answer:'Check the importer and vehicle under the actual route. The commercial register, personal-use provisions and expatriate arrangements address different circumstances. Approval or relief for one buyer does not establish eligibility for a dealer’s order.'},
      {question:'Can the Egyptian importer arrange ACI after the car has shipped?',answer:'Plan the applicable advance-information process before dispatch and confirm the required acceptance with the importer and carrier. Do not treat a shipment subject to ACI as ready to load while its ACID or required data remains unresolved.'},
      {question:'Does a China EV supplier’s price include Egyptian registration?',answer:'Ask for the exact delivery endpoint and services in writing. Obtain the local clearance, approval, registration and delivery scope from the relevant providers. A vehicle-only or destination-port price does not state those arrangements by itself.'},
    ],sources:['goeic','personal','expats','nafeza','aci']},
  ],
};

const updates: Record<string, Partial<GuideEditorial>> = {
  bolivia:{title:'Import Cars from China to Bolivia: Requirements and Costs',description:'Plan a Bolivia car import: model year, vehicle class, IBMETRO acceptance, EV charging, customs costs and inland transit from the arrival port.'},
  peru:{title:'Import Cars from China to Peru: New and Used Car Checks',description:'Compare new and used Chinese cars for Peru. Check SUNAT age, mileage, diesel and inspection rules, then plan import taxes, shipping and EV charging.'},
  chile:{title:'Import Cars from China to Chile: Approval, Costs and Shipping',description:'Check Chile’s new and used car routes, 3CV and CHI-e evidence, origin documents, import costs and charging for a China-market electric car.'},
  colombia:{title:'Import Chinese Cars to Colombia: EVs, Costs and Documents',description:'Plan a Chinese car or EV import to Colombia: importer and RUT checks, VUCE, powertrain classification, taxes, charging and arrival documents.',answer:"To import cars from China to Colombia, establish the importer, classification and any required VUCE procedure before approving the version. Check vehicle registration and the intended use with the local importer. Ordinary commercial passenger-car sourcing and a claimed used-car exception need separate reviews."},
  ecuador:{title:'Import Cars from China to Ecuador: Rules, Costs and ECUAPASS',description:'Prepare an Ecuador car import with model-year and shipment checks, RUC and ECUAPASS, vehicle documents, EV charging and a complete cost estimate.'},
  mexico:{title:'Import Cars from China to Mexico: Tariffs and Requirements',description:'Check Mexico car import requirements, current tariff classification, new or used eligibility, pedimento documents, EV support and shipping costs.'},
  algeria:{title:'Import Cars from China to Algeria: New and Used Car Routes',description:'Compare Algeria’s dealer and resident used-car routes. Check vehicle age, powertrain, conformity, customs costs, EV charging and shipping records.'},
  morocco:{title:'Import Cars from China to Morocco: Customs, Costs and Registration',description:'Plan a Morocco car import with MCV and ADIL estimates, ADII valuation, NARSA registration, new or used vehicle checks and EV charging.'},
  tunisia:{title:'Import Cars from China to Tunisia: FCR, Taxes and Requirements',description:'Check Tunisia’s FCR and commercial car import routes, buyer eligibility, vehicle age, official tax estimates, shipping documents and EV support.'},
  egypt:{title:'Import Cars from China to Egypt: Taxes, ACID and Documents',description:'Plan a car or EV import to Egypt: importer eligibility, tax estimates, Nafeza ACI and ACID, shipment documents, charging and local registration.'},
};

// Replace brief versions of topics expanded above so the reader sees each topic once.
// The original country rule sections and every source-backed checklist table stay intact.
const replacedHeadings: Record<string, string[]> = {
  bolivia:['Price the full inland route'],
  peru:['Prepare the VIN and inspection evidence','What to ask your broker to price'],
  chile:['Plan a pilot before a mixed batch'],
  colombia:['Ask for a sample configuration before scaling'],
  ecuador:['Compare new cars after file review'],
  mexico:['Why a North American used-car rule is not a sourcing shortcut'],
  algeria:['Give the local importer a version-specific file'],
  morocco:['Check valuation and registration separately','Keep resident relief separate from a dealer quote'],
  tunisia:['Get the cost for the correct regime'],
  egypt:['Get a quote that includes the destination work'],
};

export function expandDestinationGuides<T extends GuideEditorial & {slug:string}>(countries:T[]):T[] {
  return countries.map(country=>additions[country.slug]?{
    ...country,...updates[country.slug],sections:[...country.sections.filter(section=>!replacedHeadings[country.slug]?.includes(section.heading)),...additions[country.slug]],
    sources:country.slug==='egypt'?[...(country.sources??[]),{id:'aci',label:'SCZONE: Advance Cargo Information and Nafeza shipment requirements',href:'https://sczone.eg/aci/'}]:country.sources,
  }:country);
}
