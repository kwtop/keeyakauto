import { company, companyProfile } from './company';

export type TrustIconName = 'car' | 'search' | 'inspection' | 'ship' | 'support' | 'document' | 'wallet' | 'globe' | 'battery' | 'settings' | 'pin' | 'calendar' | 'camera' | 'key' | 'truck' | 'package' | 'shield' | 'check' | 'building' | 'users' | 'mail' | 'phone' | 'message' | 'clock' | 'wrench' | 'software' | 'fingerprint' | 'list';
export type TrustItem = { title: string; body: string; output?: string; href?: string; action?: string; icon?: TrustIconName; image?: string; meta?: string };
export type TrustBlock = {
  id: string;
  title: string;
  body: string;
  image?: string;
  paragraphs?: string[];
  kind?: 'steps' | 'checklist' | 'table' | 'faq' | 'facts' | 'action' | 'contact' | 'services' | 'deliverables' | 'comparison' | 'records' | 'brief' | 'report' | 'transport' | 'gallery' | 'identity' | 'office' | 'contact-options';
  items?: TrustItem[];
  columns?: string[];
  rows?: string[][];
  links?: { label: string; href: string }[];
  form?: boolean;
  credentials?: boolean;
  aliases?: string[];
  takeaway?: {title: string; body: string};
};
export type TrustPageContent = {
  slug: string;
  label: string;
  group: 'export' | 'about' | 'contact';
  title: string;
  description: string;
  opening: TrustBlock & {image:string};
  blocks: TrustBlock[];
};
const support = '/export-services/after-sales/';

export const trustPages: Record<string, TrustPageContent> = {
  "overview": {
    "slug": "overview",
    "label": "Export Services",
    "group": "export",
    "title": "Car sourcing and export services from China",
    "description": "KEEYAK coordinates car sourcing, inspection and export from China. See the work we handle, the records you receive and how to start a new or used car inquiry.",
    "opening": {
      "id": "E1-01",
      "title": "Car sourcing and export from China",
      "body": "KEEYAK helps dealers, importers and fleets source new and used cars from China. We review your vehicle requirements, contact suppliers and coordinate inspection and transport with the providers handling your order.\nStart with the models, quantity and destination. We use those details to prepare the vehicle search and price the services you need.",
      "image": "vehicle-offer-review",
      "links": [
        {
          "label": "Discuss your vehicle requirements",
          "href": "/quote/?service=export-services"
        },
        {
          "label": "See how we can help",
          "href": "#services"
        }
      ]
    },
    "blocks": [
      {
        "id": "services",
        "title": "What we handle for you",
        "body": "Choose the services you need. The quotation lists their costs, the work included and the providers responsible.",
        "kind": "deliverables",
        "items": [
          {
            "title": "Find suitable cars",
            "body": "We check versions, equipment and availability with suppliers, then compare the options with your budget and destination requirements.",
            "output": "A vehicle proposal with the specification, quantity, price and availability at the time of quotation.",
            "icon": "car",
            "href": "/export-services/sourcing-inspection/",
            "action": "Compare sourcing options"
          },
          {
            "title": "Arrange an inspection",
            "body": "We coordinate access and the requested checks with the inspection provider, then follow up on findings that need an answer.",
            "output": "The provider's report for the identified cars, with photographs, findings and any checks not completed.",
            "icon": "inspection",
            "href": "/export-services/sourcing-inspection/#scope",
            "action": "See the inspection process"
          },
          {
            "title": "Coordinate shipping",
            "body": "We work with export and transport providers on the route, charges, documents and handover arrangements.",
            "output": "A route and cost proposal, followed by the booking reference and applicable documents once arranged.",
            "icon": "ship",
            "href": "/export-services/shipping-support/",
            "action": "Explore shipping services"
          },
          {
            "title": "Help after delivery",
            "body": "We send vehicle issues and parts requests to the provider responsible under your order terms and follow up on their response.",
            "output": "A response on the issue, any further evidence needed and the proposed action and costs for approval.",
            "icon": "support",
            "href": "/export-services/after-sales/",
            "action": "Contact after-sales support"
          }
        ]
      },
      {
        "id": "records",
        "title": "Your order documents",
        "body": "Your quotation, vehicle records and handover file identify the cars and the work carried out. Which documents you receive depends on the services in your order.",
        "kind": "records",
        "columns": [
          "You receive",
          "What it contains",
          "Stage"
        ],
        "items": [
          {
            "title": "Vehicle offer",
            "body": "Which cars are being offered, in what version and quantity, with a dated availability update.",
            "icon": "car",
            "meta": "Vehicle selection"
          },
          {
            "title": "Commercial agreement",
            "body": "Who sells and receives payment, what the price includes, and the payment and release conditions.",
            "icon": "document",
            "meta": "Placing the order"
          },
          {
            "title": "Inspection findings",
            "body": "Which cars were checked, the findings, supporting evidence and any unresolved questions.",
            "icon": "inspection",
            "meta": "Inspection completed"
          },
          {
            "title": "Handover file",
            "body": "Departure condition, supplied items, applicable documents and transport references for the receiving party.",
            "icon": "package",
            "meta": "Dispatch and handover"
          }
        ],
        "links": [
          {
            "label": "Download the purchase checklist",
            "href": "/downloads/vehicle-purchase-checklist.txt"
          }
        ]
      },
      {
        "id": "responsibilities",
        "title": "From your first inquiry to handover",
        "body": "Your KEEYAK contact coordinates the work across the order. The seller, inspector and transport provider remain responsible for their respective services.",
        "kind": "steps",
        "items": [
          {
            "title": "Review the proposal",
            "body": "We collect the vehicle details and service costs. You decide which cars to buy and which services to use.",
            "output": "Vehicle proposal and service quotation",
            "icon": "document"
          },
          {
            "title": "Follow the order",
            "body": "We coordinate supplier updates, inspection arrangements and questions raised by the findings. You approve changes and vehicle release.",
            "output": "Vehicle records and inspection findings",
            "icon": "inspection"
          },
          {
            "title": "Prepare for delivery",
            "body": "We coordinate the document and transport requirements, then pass on the references needed by the receiving party.",
            "output": "Transport references and handover documents",
            "icon": "ship"
          }
        ],
        "links": [
          {
            "label": "Payment, responsibilities and buying steps",
            "href": "/export-services/buying-guide/"
          }
        ]
      },
      {
        "id": "company-records",
        "title": "KEEYAK company records",
        "image": "office-original",
        "body": "KEEYAK is operated by Zhejiang Jingyan Technology Co., Ltd. You can view the original SGS supplier assessment, office details and dated company records in our company profile.",
        "kind": "brief",
        "items": [
          {
            "title": "SGS supplier assessment",
            "body": "Assessment 489102251_T names Zhejiang Jingyan Technology Co., Ltd. and gives the assessment date and printed validity period.",
            "icon": "document",
            "href": "/about/company-profile/#company-documents",
            "action": "View the assessment and its scope"
          },
          {
            "title": "People and company history",
            "body": "Original office, team and exhibition photographs show the wider KEEYAK business, with dates and context.",
            "icon": "users",
            "href": "/about/",
            "action": "Meet KEEYAK"
          }
        ]
      },
      {
        "id": "buying-help",
        "title": "Questions at the start of a purchase",
        "body": "You can inquire about a specific model or ask for help choosing one.",
        "kind": "faq",
        "items": [
          {
            "title": "Are the cars on the website in stock?",
            "body": "We check current availability when you inquire. The catalog shows models, not live stock, and a listing does not reserve a car."
          },
          {
            "title": "Can I compare several models in one inquiry?",
            "body": "Yes. Give a quantity for each model and tell us which requirements are essential. If your total budget is fixed, say whether that budget covers the cars alone or also transport and destination costs."
          },
          {
            "title": "What will you need first?",
            "body": "Send the model or type of car, new or used, quantity and destination. For used cars, add your year and mileage limits. A preferred delivery period and acceptable alternatives help with the search."
          }
        ],
        "links": [
          {
            "label": "More car export questions",
            "href": "/export-services/faq/"
          }
        ]
      },
      {
        "id": "inquiry",
        "title": "Tell us what you are looking for",
        "body": "Send the models, quantities and destination. Include any essential equipment, acceptable alternatives or inspection requirements.",
        "kind": "action",
        "form": true,
        "links": [
          {
            "label": "Support for an existing order",
            "href": "/export-services/after-sales/"
          }
        ]
      }
    ]
  },
  "buying-guide": {
    "slug": "buying-guide",
    "label": "Buying Guide",
    "group": "export",
    "title": "How to buy cars from China",
    "description": "Learn how to compare car offers from China, check destination requirements and agree payment, inspection, documents and delivery before ordering.",
    "opening": {
      "id": "E2-01",
      "title": "How to buy cars from China",
      "body": "KEEYAK helps you obtain a priced offer and arrange inspection and export. You decide whether to accept the offer, the cars and any proposed changes.\nYour local importer advises on import and registration requirements for the exact vehicle. We use those requirements when discussing the cars and documents with suppliers.",
      "image": "buying-guide-multibrand",
      "links": [
        {
          "label": "Follow the buying steps",
          "href": "#process"
        },
        {
          "label": "Discuss a purchase",
          "href": "/quote/?service=buying-guide"
        }
      ]
    },
    "blocks": [
      {
        "id": "process",
        "title": "Buying a car in six steps",
        "body": "Review the records at each stage before deciding how to proceed. Payment and vehicle release follow the terms of your order.",
        "kind": "steps",
        "items": [
          {
            "title": "Describe the cars you need",
            "body": "You send the models, quantities, destination and timing. We review the essential equipment and any alternatives you would accept.",
            "output": "A sourcing brief for the supplier search",
            "icon": "search"
          },
          {
            "title": "Review the offer",
            "body": "We collect the proposed specification, availability and service costs. You compare the options on the same delivery basis.",
            "output": "A dated quotation with its validity and exclusions",
            "icon": "document"
          },
          {
            "title": "Place the order",
            "body": "The seller sets out the vehicle supply and payment terms. We coordinate the services included and the contacts for each stage.",
            "output": "Order terms naming the seller, beneficiary and providers",
            "icon": "wallet"
          },
          {
            "title": "Review the cars",
            "body": "We arrange the requested inspection with the provider and follow up on questions. You decide whether to accept the cars or request further work.",
            "output": "Inspection findings and an acceptance decision",
            "icon": "inspection"
          },
          {
            "title": "Arrange dispatch",
            "body": "We coordinate vehicle identifiers, required documents and transport references with the exporter and forwarder. When container and roll-on/roll-off quotes are both available, compare them for the same vehicles and destination, including transfer and terminal charges.",
            "output": "Departure records and collection instructions",
            "icon": "ship"
          },
          {
            "title": "Receive the cars",
            "body": "Your receiving party checks the cars against the departure file. We help direct any discrepancy to the responsible provider.",
            "output": "An arrival record and follow-up contact",
            "icon": "check"
          }
        ]
      },
      {
        "id": "destination",
        "aliases": [
          "destination-check"
        ],
        "title": "Will this version work in your country?",
        "body": "Check the exact vehicle with your destination importer or registration adviser before paying. A model sold under the same name elsewhere can have different equipment, software or documentation.",
        "image": "market-compatibility",
        "kind": "checklist",
        "items": [
          {
            "title": "Import and registration",
            "body": "Check steering side, age limits, registration status and the documents required for the exact vehicle. Request the current requirements from your local adviser.",
            "icon": "globe"
          },
          {
            "title": "Equipment and specification",
            "body": "Match the market version, safety equipment and technical records. Ask which differences affect local approval or everyday use.",
            "icon": "settings"
          },
          {
            "title": "Charging and connected features",
            "body": "For an EV or plug-in hybrid, check the connector and charging functions. Ask separately about language, apps, maps and connected-service access.",
            "icon": "battery"
          },
          {
            "title": "Costs at destination",
            "body": "Get a local estimate for clearance, tax, handling, registration and onward transport. Ask how much time you have to collect the cars before storage charges begin.",
            "icon": "wallet"
          }
        ],
        "links": [
          {
            "label": "Prepare destination questions",
            "href": "/export-services/buying-guide/#country-guides"
          }
        ]
      },
      {
        "id": "quotation",
        "aliases": [
          "payment"
        ],
        "title": "How to compare quotes",
        "body": "Compare quotations for the same version, equipment and delivery point. Have the seller price any missing items and identify exclusions so you can compare the total cost.",
        "kind": "records",
        "columns": [
          "Check",
          "What to look for"
        ],
        "rows": [
          [
            "Vehicle specification",
            "Exact version, model year, equipment, colors, quantity and vehicle or batch reference. Record any proposed substitution."
          ],
          [
            "Price and delivery basis",
            "Currency, validity, named handover point and a breakdown of vehicle, inspection, document, handling and transport charges."
          ],
          [
            "Parties and payment",
            "Contracting seller and payment beneficiary, deposit and later stages, plus the conditions for vehicle release."
          ],
          [
            "Inspection decision",
            "Who inspects, when you receive the findings, and what happens if further checks or repairs are needed."
          ],
          [
            "Changes and cancellation",
            "How a change affects price and timing, who must approve it, and the applicable cancellation or refund terms."
          ]
        ],
        "paragraphs": [
          "To compare what each car will cost by the time it is registered, add the vehicle and origin charges, freight and insurance, destination duties and taxes, port and broker fees, and any registration or onward delivery costs. Mark each charge as included, extra or still to be confirmed. Ask your broker which local charges apply and count each cost once."
        ],
        "links": [
          {
            "label": "Compare EXW, FOB and CIF",
            "href": "/export-services/buying-guide/exw-fob-cif-car-shipping/"
          }
        ],
        "takeaway": {
          "title": "Before sending a payment",
          "body": "Check the beneficiary against your order documents. If payment instructions change, verify them with your established contact through a known channel before proceeding."
        }
      },
      {
        "id": "trade-terms",
        "title": "EXW, FOB and CIF compared",
        "body": "Ask the seller to name the place or port and specify the Incoterms® edition on the quote.",
        "kind": "records",
        "columns": ["Trade term", "What to check in the offer"],
        "rows": [
          [
            "EXW · Ex Works",
            "The seller makes the cars available at the named place. Check who will load and collect them, and whether your side can arrange export clearance."
          ],
          [
            "FOB · Free On Board",
            "The seller clears the cars for export and delivers them on board at the named port of shipment. Risk passes on board. Check your forwarder's freight and insurance quote separately."
          ],
          [
            "CIF · Cost, Insurance and Freight",
            "The seller pays for freight and arranges insurance to the named destination port. Risk still passes when the cars are on board at departure. Check the insurance cover and ask your broker which destination charges are separate."
          ]
        ],
        "paragraphs": [
          "Ask the seller to name the place or port and specify the Incoterms® edition on the quote. If the cars are handed to a carrier at a container terminal before loading, ask whether FCA fits that handover."
        ],
        "links": [
          {
            "label": "Read the ICC Incoterms® guidance",
            "href": "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/"
          }
        ]
      },
      {
        "id": "used-car-checks",
        "title": "What to check before accepting a used car",
        "body": "Review dated evidence for the specific car on offer before accepting it.",
        "kind": "brief",
        "items": [
          {
            "title": "Identity and registration",
            "body": "Match the VIN on the car, the offer and the registration record where available. Confirm the first registration date with your broker if the destination uses it to assess age eligibility.",
            "icon": "fingerprint"
          },
          {
            "title": "Mileage and history",
            "body": "Ask for a dated odometer photo and any available service records. Check whether the readings follow a plausible sequence. Record gaps or conflicting readings as unverified.",
            "icon": "camera"
          },
          {
            "title": "Condition and acceptance",
            "body": "Agree which checks the provider will perform. Ask the report to identify previous repairs, visible damage and areas the inspector could not examine. Confirm any follow-up work in writing before accepting the car.",
            "icon": "inspection"
          }
        ],
        "links": [
          {
            "label": "See what a vehicle inspection can cover",
            "href": "/export-services/sourcing-inspection/#scope"
          }
        ]
      },
      {
        "id": "documents",
        "title": "Which documents should you receive?",
        "body": "Your destination importer can identify the documents required. Work with the seller and exporter to establish who supplies each one and when. Availability depends on the vehicles and route; a sample from another order is not proof that the same document is available for yours.",
        "kind": "records",
        "columns": [
          "Record",
          "Why you need it",
          "When to check"
        ],
        "rows": [
          [
            "Offer and order",
            "Vehicle details, scope, commercial terms and authorized changes.",
            "Before payment"
          ],
          [
            "Payment records",
            "Instructions, receipts and confirmation against the same order.",
            "At each payment stage"
          ],
          [
            "Vehicle records",
            "Identifiers, specification, registration or other available vehicle documents.",
            "Before acceptance"
          ],
          [
            "Inspection and acceptance",
            "Findings, unchecked items and your written decision on the cars.",
            "Before release"
          ],
          [
            "Commercial and export file",
            "Review the commercial invoice and packing list. Confirm whether proof of origin, conformity documents or other records are required for your shipment, who provides them and when.",
            "Before loading"
          ],
          [
            "Transport and release file",
            "Review the bill of lading or sea waybill with your broker. Check the buyer and consignee details and match vehicle references where listed. Ask the forwarder how the carrier will release the cars.",
            "Check drafts before dispatch and final records before collection"
          ],
          [
            "Receiving record",
            "Vehicle identity, arrival condition, supplied items and any differences.",
            "At arrival"
          ]
        ],
        "links": [
          {
            "label": "Download the purchase checklist",
            "href": "/downloads/vehicle-purchase-checklist.txt"
          },
          {
            "label": "Shipping documents explained",
            "href": "/export-services/shipping-support/#documents"
          }
        ]
      },
      {
        "id": "warranty",
        "title": "Support after delivery",
        "body": "The order should name your support contact and describe coverage in the destination country. Review exclusions and any approval needed for diagnosis, labor or freight before purchasing.",
        "kind": "brief",
        "items": [
          {
            "title": "Coverage in writing",
            "body": "Keep the coverage period and its start event with the order. Ask how the terms apply in the country where the cars will be used.",
            "icon": "shield"
          },
          {
            "title": "A named contact",
            "body": "Know where to send the VIN, symptoms and evidence. Agree how repair approvals and updates will be handled.",
            "icon": "support",
            "href": "/export-services/after-sales/#coverage",
            "action": "Read the support guide"
          }
        ],
        "links": [
          {
            "label": "Prepare your purchase inquiry",
            "href": "/quote/?service=buying-guide"
          }
        ]
      }
    ]
  },
  "sourcing-inspection": {
    "slug": "sourcing-inspection",
    "label": "Sourcing & Inspection",
    "group": "export",
    "title": "Vehicle sourcing and inspection in China",
    "description": "KEEYAK helps source new and used cars in China and coordinate vehicle inspections. Review the sourcing process, inspection scope and report contents.",
    "opening": {
      "id": "E3-01",
      "title": "Vehicle sourcing and inspection",
      "body": "We search suppliers for cars that meet your requirements, review their offers and coordinate the inspection you request. You receive the proposed vehicle details before choosing which cars to inspect.\nThe inspection provider carries out the booked checks and issues the findings. KEEYAK follows up on questions with the supplier before you decide whether to accept the cars.",
      "image": "sourcing-branded",
      "links": [
        {
          "label": "Share your sourcing brief",
          "href": "/quote/?service=sourcing-inspection"
        },
        {
          "label": "Understand the checks",
          "href": "#scope"
        }
      ]
    },
    "blocks": [
      {
        "id": "sourcing-process",
        "title": "How we source and inspect cars",
        "body": "We find cars that match your brief and arrange the inspection you request. You decide which cars to inspect and whether to proceed.",
        "kind": "steps",
        "items": [
          {
            "title": "Find cars that match your brief",
            "body": "We check the model, version and availability with suppliers against your requirements.",
            "output": "Vehicle options with specification, quantity and price",
            "icon": "search"
          },
          {
            "title": "Arrange the checks",
            "body": "We coordinate the location, access, inspection date and requested tests with the provider.",
            "output": "An inspection scope, provider and quoted cost",
            "icon": "inspection"
          },
          {
            "title": "Read the inspection report",
            "body": "We pass on the provider's report and follow up on missing information, repairs or alternative cars.",
            "output": "Vehicle-specific findings and responses to outstanding questions",
            "icon": "document"
          }
        ]
      },
      {
        "id": "requirement",
        "title": "Your vehicle requirements",
        "body": "Tell us which features are essential and which alternatives you would consider. We use these details to narrow the search if your preferred version is unavailable.",
        "kind": "brief",
        "items": [
          {
            "title": "Model and essential equipment",
            "body": "Give the brand, model, market version and powertrain. List the equipment you need; a trim name alone may not identify it.",
            "icon": "car"
          },
          {
            "title": "Quantity and destination",
            "body": "Number of cars, destination country and port if known. Include whether you need one batch or separate deliveries.",
            "icon": "globe"
          },
          {
            "title": "Condition and budget",
            "body": "For used cars, state the year range, mileage limit and condition requirements. Explain whether your budget includes transport.",
            "icon": "inspection"
          },
          {
            "title": "Acceptable alternatives",
            "body": "Colors, versions or models you would consider, and your preferred timing. Mark any requirement that is still being checked.",
            "icon": "list"
          }
        ]
      },
      {
        "id": "supply",
        "aliases": [
          "review"
        ],
        "title": "New and used vehicle records",
        "body": "We collect the proposed vehicle details from the supplier so you can compare the offer with your brief. New-car batches and individual used cars need different records.",
        "kind": "comparison",
        "columns": [
          "New-car batch",
          "Individual used car"
        ],
        "rows": [
          [
            "Exact market version, model year and equipment.",
            "VIN or other vehicle identifier, year and registration details."
          ],
          [
            "Quantity, colors and available production information.",
            "Mileage, dated photographs and visible condition."
          ],
          [
            "Current availability and a proposed release schedule.",
            "Current availability and the history documents that can be supplied."
          ],
          [
            "Included documents and a batch or offer reference.",
            "Known gaps, inspection findings and the individual offer reference."
          ]
        ],
        "links": [
          {
            "label": "Review the quotation",
            "href": "/export-services/buying-guide/compare-car-export-quotes/"
          }
        ]
      },
      {
        "id": "scope",
        "title": "What the inspection covers",
        "body": "Set the location, date and checks with the inspection provider before booking. Vehicle access, equipment and the seller's permission can limit testing. The inspector should list any tests they could not perform.",
        "image": "vehicle-inspection-evidence",
        "kind": "comparison",
        "columns": [
          "New cars",
          "Used cars"
        ],
        "rows": [
          [
            "Identity, version, equipment and quantity against the offer.",
            "Identity and available registration, service and repair records."
          ],
          [
            "Exterior, interior, supplied keys and accessories.",
            "Body, paintwork and signs that need further investigation."
          ],
          [
            "Agreed functional checks and available system readings.",
            "Agreed mechanical and functional checks, with available diagnostic data."
          ],
          [
            "Any transport or storage damage visible at inspection.",
            "Mileage evidence and available battery data for electrified cars."
          ]
        ],
        "paragraphs": [
          "Paint-thickness readings need a location, unit and test method. An unusual reading can call for further checks, but cannot show the extent of a repair on its own. Fault codes and battery readings also need the test conditions and the inspector's explanation."
        ]
      },
      {
        "id": "evidence",
        "aliases": [
          "new-used"
        ],
        "title": "What to look for in an inspection report",
        "body": "If we arrange the inspection, we share the provider’s findings for the cars inspected. Use the checklist below to agree what the report should include before you book.",
        "kind": "report",
        "items": [
          {
            "title": "Vehicle and inspection details",
            "body": "Vehicle identifier, inspection date and location, with the name of the inspector or provider.",
            "icon": "fingerprint"
          },
          {
            "title": "Findings and supporting images",
            "body": "Item-by-item findings with photographs, readings or records tied to the car. Measurements include the method and test conditions.",
            "icon": "camera"
          },
          {
            "title": "Checks not completed",
            "body": "Inaccessible areas, omitted tests and unavailable records, so you can see what remains unresolved.",
            "icon": "list"
          },
          {
            "title": "Follow-up and acceptance",
            "body": "Questions for the supplier, proposed repairs and your decision on accepted exceptions or further work.",
            "icon": "document"
          }
        ],
        "takeaway": {
          "title": "For a used EV or plug-in hybrid",
          "body": "Ask for the battery reading date, method and test conditions. The brochure's range or battery capacity does not establish the health of the battery in the car being offered."
        }
      },
      {
        "id": "exceptions",
        "title": "Resolve findings before release",
        "body": "If the findings differ from your requirements, we take the questions back to the supplier or inspector. You decide on further checks, a revised offer or acceptance before release.",
        "kind": "steps",
        "items": [
          {
            "title": "Ask about the finding",
            "body": "We ask the supplier or inspector to address the specific photo, reading or missing record you have flagged.",
            "icon": "inspection"
          },
          {
            "title": "Decide whether to check again",
            "body": "We request further evidence or arrange another inspection where access and testing are available.",
            "icon": "message"
          },
          {
            "title": "Record the resolution",
            "body": "The seller records any proposed repairs, replacement vehicle or changes to price and timing for your review.",
            "icon": "document"
          },
          {
            "title": "Authorize release",
            "body": "Follow the acceptance and release conditions in the order, with any unresolved issues recorded.",
            "icon": "check"
          }
        ],
        "links": [
          {
            "label": "Order and payment decisions",
            "href": "/export-services/buying-guide/car-order-payment-and-changes/"
          }
        ]
      },
      {
        "id": "inquiry",
        "title": "Start a vehicle search",
        "body": "Send the models, quantities and destination, along with essential equipment and inspection requirements. For used cars, add your year, mileage and condition limits.",
        "kind": "action",
        "form": true,
        "links": [
          {
            "label": "Plan shipping after acceptance",
            "href": "/export-services/shipping-support/"
          }
        ]
      }
    ]
  },
  "shipping-support": {
    "slug": "shipping-support",
    "label": "Shipping & Delivery",
    "group": "export",
    "title": "Vehicle shipping and delivery from China",
    "description": "Compare Ro-Ro, container and overland car shipping from China. Understand costs, transport documents, dispatch records and vehicle checks on arrival.",
    "opening": {
      "id": "E4-01",
      "title": "Car shipping from China",
      "body": "KEEYAK coordinates your vehicle shipping requirements with the exporter and transport providers. We collect the route proposal, charges, document requirements and handover contacts.\nYou receive a cost proposal first. Booking references and departure updates follow once the transport is arranged.",
      "image": "shipping",
      "links": [
        {
          "label": "Discuss a shipping plan",
          "href": "/quote/?service=shipping-support"
        },
        {
          "label": "Compare the options",
          "href": "#route"
        }
      ]
    },
    "blocks": [
      {
        "id": "shipping-process",
        "title": "How we coordinate your shipment",
        "body": "The vehicles, destination and available carrier services determine the plan. Your order sets the handover point and the work included.",
        "kind": "steps",
        "items": [
          {
            "title": "Find a route",
            "body": "We request options from transport providers using the vehicle dimensions, quantity and destination.",
            "output": "A route proposal with quoted charges and estimated dates",
            "icon": "ship"
          },
          {
            "title": "Get the shipping documents ready",
            "body": "We coordinate the required documents and vehicle details with the exporter and your receiving party.",
            "output": "Document drafts to review and the applicable final records",
            "icon": "document"
          },
          {
            "title": "Track dispatch and delivery",
            "body": "We pass on booking and dispatch updates from the provider and coordinate receiving instructions.",
            "output": "Transport references, collection instructions and a follow-up contact",
            "icon": "package"
          }
        ]
      },
      {
        "id": "route",
        "title": "Compare transport options",
        "body": "Start with the destination, vehicle dimensions and quantity. Carrier acceptance, handling arrangements and available services determine which options can be quoted.",
        "kind": "transport",
        "items": [
          {
            "title": "Roll-on / roll-off",
            "body": "Cars are driven on and off a vehicle carrier. Check the carrier's acceptance rules, operating-condition requirements, ports and arrangements for loose items.",
            "image": "transport-roro",
            "meta": "Drive-on vehicle transport"
          },
          {
            "title": "Container",
            "body": "Cars travel in a container with an agreed loading and securing plan. Check usable space, vehicles per container and handling at both ends before comparing the price.",
            "image": "transport-container",
            "meta": "Loading plan required"
          },
          {
            "title": "Overland",
            "body": "A road or other land route can be considered where a service is available. Check border transfers, documents and the final handover point for the proposed route.",
            "image": "transport-overland",
            "meta": "Route and border checks"
          }
        ]
      },
      {
        "id": "cost",
        "title": "What shipping costs cover",
        "body": "We ask the transport provider to list freight, handling and destination charges separately. The quote totals the costs up to your chosen handover point.",
        "kind": "records",
        "columns": [
          "Cost group",
          "What the proposal covers"
        ],
        "rows": [
          [
            "Before departure",
            "Domestic movement, storage, port handling, preparation and loading, with any charges that depend on actual handling identified."
          ],
          [
            "Main transport",
            "Proposed route and service, quoted rate, validity and booking conditions."
          ],
          [
            "Insurance",
            "Whether cover is included or separately arranged, the risks covered and the contact and evidence needed for a claim."
          ],
          [
            "At destination",
            "The handover point and responsibility for terminal handling and onward transport. Your importer or agent supplies local clearance, tax and registration estimates."
          ]
        ],
        "paragraphs": [
          "Dispatch, carrier departure, arrival and collection have separate dates. The schedule should distinguish estimates from confirmed dates and name the contact for transport or clearance updates."
        ]
      },
      {
        "id": "documents",
        "title": "Shipping documents",
        "body": "We coordinate the document list with the exporter and destination importer, then pass on the applicable records from the issuing parties. Review consignee and vehicle details on the drafts before they are finalized.",
        "kind": "records",
        "columns": [
          "Record",
          "Contents and source"
        ],
        "rows": [
          [
            "Commercial invoice and packing list",
            "Issued for the order by the relevant seller or exporter, identifying the parties, vehicles, quantities and supplied items."
          ],
          [
            "Transport document",
            "Issued by the transport provider. Sea shipments normally use a bill of lading; the route determines the document and release method."
          ],
          [
            "Origin or conformity records",
            "Supplied where required and available for the exact vehicles. Your destination importer establishes which records are accepted locally."
          ],
          [
            "Departure and handover file",
            "Vehicle identifiers, dated condition photos, supplied-item list and transport references from the parties handling dispatch."
          ]
        ],
        "links": [
          {
            "label": "Purchase document checklist",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          }
        ],
        "paragraphs": [
          "This is a document checklist, not a record of a completed shipment. Order-specific documents and photographs identify the actual vehicles and transport movement."
        ]
      },
      {
        "id": "pre-departure",
        "title": "Before departure",
        "body": "We coordinate the departure record with the party handling dispatch. It identifies each car and lists its condition photos, keys and supplied items for the receiving party to check on arrival.",
        "kind": "checklist",
        "items": [
          {
            "title": "Vehicle identity",
            "body": "Identifiers, market version and quantity should match the order and relevant transport documents.",
            "icon": "fingerprint"
          },
          {
            "title": "Condition photographs",
            "body": "Keep dated exterior and interior views. Record any existing marks with enough context to locate them on the car.",
            "icon": "camera"
          },
          {
            "title": "Keys and supplied items",
            "body": "List the keys, accessories and accompanying documents. Agree how loose items will be packed and handed over.",
            "icon": "key"
          },
          {
            "title": "Release instructions",
            "body": "Keep loading or securing evidence where provided, the transport reference and the named receiving contact.",
            "icon": "ship"
          }
        ]
      },
      {
        "id": "handover",
        "title": "What to check at delivery",
        "body": "Compare arrival condition with the departure file while the receiving records are being completed. If you find a difference, follow the shipment's reporting procedure and preserve the evidence.",
        "kind": "steps",
        "items": [
          {
            "title": "Match the vehicles",
            "body": "Check identifiers and quantity, then compare the visible condition, keys and other supplied items.",
            "icon": "inspection"
          },
          {
            "title": "Document any differences",
            "body": "Take dated overview and detail photographs. Record missing items or document discrepancies in the receiving record.",
            "icon": "camera"
          },
          {
            "title": "Contact the claims handler",
            "body": "Contact the carrier, claims contact or order contact specified for the shipment. Check the applicable reporting deadlines.",
            "icon": "message"
          },
          {
            "title": "Keep your shipping records",
            "body": "Retain transport references, condition photos and correspondence. A transport-damage claim and a warranty issue may follow different routes.",
            "icon": "document"
          }
        ],
        "links": [
          {
            "label": "Get help after delivery",
            "href": "/export-services/after-sales/"
          }
        ]
      },
      {
        "id": "inquiry",
        "title": "Request a route and cost proposal",
        "body": "Include the vehicles, quantity, destination country or port and preferred timing. Tell us where you expect the handover to take place and whether you need onward transport.",
        "kind": "action",
        "form": true
      }
    ]
  },
  "after-sales": {
    "slug": "after-sales",
    "label": "After-sales Support",
    "group": "export",
    "title": "After-sales support for your KEEYAK order",
    "description": "Get help with a KEEYAK order. Prepare the details for vehicle faults, parts, software or arrival damage, and understand warranty and repair approvals.",
    "opening": {
      "id": "E5-01",
      "title": "After-sales support for your order",
      "body": "KEEYAK checks your order records and sends your request to the provider responsible for support. We pass on the issue, follow up on missing information and relay the provider's proposed action.\nContact your order representative, or email KEEYAK with the order reference, VIN and a description of the problem.",
      "image": "support-branded",
      "links": [
        {
          "label": "Email KEEYAK",
          "href": "mailto:contact@keeyak.com?subject=Existing%20order%20support"
        },
        {
          "label": "Prepare the details",
          "href": "#report"
        }
      ],
      "items": [
        {
          "title": "Vehicle problem",
          "body": "Symptoms, warnings and when they started."
        },
        {
          "title": "Parts request",
          "body": "VIN, part number and photographs."
        },
        {
          "title": "Software",
          "body": "Version, feature and country of use."
        },
        {
          "title": "Arrival damage",
          "body": "Departure and receiving records."
        }
      ]
    },
    "blocks": [
      {
        "id": "follow-up",
        "aliases": [
          "diagnosis"
        ],
        "title": "How we handle a support request",
        "body": "Your KEEYAK contact passes the request to the provider named in your order. That provider reviews the findings, checks coverage and decides whether to approve the repair.",
        "kind": "steps",
        "items": [
          {
            "title": "Locate your order",
            "body": "We use your order reference and VIN to identify the vehicle, purchase terms and support contact.",
            "output": "Your request sent to the responsible provider",
            "icon": "document"
          },
          {
            "title": "Review the issue",
            "body": "We pass on your symptoms and evidence. The provider identifies any missing information or further checks.",
            "output": "A response listing any information or checks still needed",
            "icon": "inspection"
          },
          {
            "title": "Agree the next action",
            "body": "We follow up on the provider's proposal for diagnosis, parts or repair. You review the approvals and costs before work starts.",
            "output": "A proposed action and cost responsibility",
            "icon": "message"
          },
          {
            "title": "Follow up on the result",
            "body": "We send the provider the work records and results, along with any issues still open.",
            "output": "A record of the response and any remaining action",
            "icon": "check"
          }
        ]
      },
      {
        "id": "coverage",
        "title": "Coverage and repair approvals",
        "body": "Support depends on the terms for your vehicle and destination. Original-market manufacturer coverage may not continue after export; the order identifies the provider and coverage that apply.",
        "kind": "brief",
        "items": [
          {
            "title": "Provider and territory",
            "body": "The named provider and the countries where the support applies.",
            "icon": "shield"
          },
          {
            "title": "Period and exclusions",
            "body": "Coverage start, duration, covered components and excluded costs.",
            "icon": "calendar"
          },
          {
            "title": "Diagnosis and repair approval",
            "body": "The checks that can be commissioned and the approval needed before a repair starts.",
            "icon": "wrench"
          },
          {
            "title": "Labor, parts and freight",
            "body": "Approval for parts, workshop labor and freight, including the evidence needed for any reimbursement.",
            "icon": "wallet"
          }
        ]
      },
      {
        "id": "report",
        "title": "What to send when you ask for help",
        "image": "support-issue-report",
        "body": "Put the vehicle details and symptoms in one message under the order reference. Keep the original photos, readings and reports so the provider can examine the evidence.",
        "kind": "brief",
        "items": [
          {
            "title": "Order and delivery",
            "body": "Order reference, delivery date and your named contact.",
            "icon": "document"
          },
          {
            "title": "Vehicle identity",
            "body": "VIN, model and exact version. Use photographs of the relevant labels where needed.",
            "icon": "car"
          },
          {
            "title": "Location and mileage",
            "body": "Country, current mileage and when the issue first appeared.",
            "icon": "pin"
          },
          {
            "title": "What happens",
            "body": "Describe the symptom, when it occurs and any warning message or fault code.",
            "icon": "settings"
          },
          {
            "title": "Supporting evidence",
            "body": "Clear photos, video, diagnostic readings or the workshop report. Include the date and context.",
            "icon": "camera"
          },
          {
            "title": "Work already carried out",
            "body": "Recent checks, software changes, replaced parts or repairs, including who performed them.",
            "icon": "wrench"
          }
        ],
        "paragraphs": [
          "For a charging problem, include the charger and connector used, any error message, when the problem began and whether another charging session worked. Photos of the connector and warning screen can help the provider investigate."
        ],
        "links": [
          {
            "label": "Email the support details",
            "href": "mailto:contact@keeyak.com?subject=Existing%20order%20support"
          }
        ]
      },
      {
        "id": "parts",
        "title": "Identify the part before you order it",
        "body": "Parts that look similar can have different connectors, mounting points or software requirements. Use the vehicle identity and the part's own details to request a match.",
        "image": "vehicle-parts-identification",
        "kind": "checklist",
        "items": [
          {
            "title": "Parts",
            "body": "Send the VIN, version, photos, part number if known, quantity and destination. The supplier needs these details to check fit, availability and cost.",
            "icon": "package"
          },
          {
            "title": "Software",
            "body": "Name the feature, current software version, error and country of use. Connected services, languages and updates can differ by market version.",
            "icon": "software"
          },
          {
            "title": "Local work",
            "body": "Agree the workshop, evidence, approvals and costs before commissioning diagnosis or repair. Keep removed-part and work records where requested.",
            "icon": "wrench"
          }
        ]
      },
      {
        "id": "arrival",
        "title": "Is it damage from transport or a vehicle issue?",
        "body": "If the difference was found at collection, begin with the departure and receiving records. The shipment's claims process may be separate from the vehicle's warranty arrangements.",
        "kind": "faq",
        "items": [
          {
            "title": "What should I send for arrival damage?",
            "body": "Provide the order and transport references, receiving date, dated overview and detail photographs, and any damage noted on the receiving record. Keep packaging or other evidence where the claims procedure requires it."
          },
          {
            "title": "Can I repair the car first and claim later?",
            "body": "Check the applicable procedure before authorizing work. Ask the responsible party what evidence and approval are needed, and who pays for diagnosis, labor, parts and transport."
          }
        ],
        "links": [
          {
            "label": "Arrival inspection steps",
            "href": "/export-services/shipping-support/#handover"
          }
        ]
      },
      {
        "id": "contact",
        "title": "Contact us about an existing order",
        "body": "Email or message KEEYAK with your order reference and the details above. If you cannot reach your original contact, the team can help direct the request.",
        "kind": "contact",
        "links": [
          {
            "label": "Email KEEYAK",
            "href": "mailto:contact@keeyak.com?subject=Existing%20order%20support"
          },
          {
            "label": "WhatsApp",
            "href": company.whatsapp
          },
          {
            "label": "Contact details",
            "href": "/contact/"
          }
        ]
      }
    ]
  },
  "company": {
    "slug": "company",
    "label": "Company Profile",
    "group": "about",
    "title": "KEEYAK company profile",
    "description": companyProfile.description,
    "opening": {
      "id": "A1-01",
      "title": "About KEEYAK",
      "body": companyProfile.paragraphs[0],
      "paragraphs": companyProfile.paragraphs,
      "image": "office-original",
      "links": [
        {
          "label": "Talk to the team",
          "href": "/contact/"
        },
        {
          "label": "Review company records",
          "href": "#company-documents"
        }
      ],
      "items": [
        {
          "title": "Company established",
          "body": "2009",
          "icon": "calendar"
        },
        {
          "title": "Export reach",
          "body": "80+ countries · across the vehicle business",
          "icon": "globe"
        },
        {
          "title": "Office",
          "body": "Hangzhou, Zhejiang, China",
          "icon": "pin"
        },
        {
          "title": "Passenger-car services",
          "body": "New and used passenger cars",
          "icon": "car"
        }
      ]
    },
    "blocks": [
      {
        "id": "company-documents",
        "credentials": true,
        "title": "SGS supplier assessment",
        "body": "The original assessment names our operating company, Zhejiang Jingyan Technology Co., Ltd. Open the full-size certificate to read the holder, assessment number and printed validity dates.",
        "kind": "identity",
        "items": [
          {
            "title": "Certificate holder",
            "body": "Zhejiang Jingyan Technology Co., Ltd.",
            "icon": "building"
          },
          {
            "title": "Assessment",
            "body": "SGS Gold Plus Supplier Assessment Certificate",
            "icon": "document"
          },
          {
            "title": "Record number",
            "body": "489102251_T",
            "icon": "fingerprint"
          },
          {
            "title": "Printed dates",
            "body": "Assessed 25 June 2026. Valid 26 June 2026–25 June 2027.",
            "icon": "calendar"
          }
        ],
        "takeaway": {
          "title": "Assessment scope",
          "body": "This assessment covers the supplier. Manufacturer authorization, vehicle condition and destination registration approval require separate evidence."
        }
      },
      {
        "id": "company-services",
        "title": "Our passenger-car services",
        "body": "For passenger cars, our work covers vehicle sourcing and export coordination. We work with the supplier, inspector and transport provider involved in your order.",
        "kind": "services",
        "items": [
          {
            "title": "New-car selection",
            "body": "Compare models in the catalog, then contact us about the version and equipment you need. We check availability and pricing for your requested quantity.",
            "image": "new-car-configuration",
            "icon": "car",
            "meta": "Models and versions",
            "href": "/new-cars/",
            "action": "Explore new cars"
          },
          {
            "title": "Used-car sourcing",
            "body": "We use your budget, age and mileage limits to search for individual cars and collect the available condition records for your review.",
            "image": "used-car-record-check",
            "icon": "search",
            "meta": "A vehicle-specific search",
            "href": "/used-cars/",
            "action": "Explore used cars"
          },
          {
            "title": "Export coordination",
            "body": "We coordinate inspection and export requirements with the providers named for your order, including documents, transport and handover.",
            "image": "export-dispatch-handover",
            "icon": "ship",
            "meta": "From offer to handover",
            "href": "/export-services/",
            "action": "Read the export services guide"
          }
        ],
        "aliases": [
          "background"
        ],
        "paragraphs": [
          "The wider KEEYAK business also covers special vehicles for cargo transport, sanitation, recovery and other uses. The company history and export reach above refer to that wider vehicle business."
        ],
        "links": [
          {
            "label": "Read our company news",
            "href": "/about/news/"
          }
        ]
      },
      {
        "id": "company-background",
        "title": "Meeting buyers overseas",
        "body": "At our special-vehicle exhibitions, buyers discuss the vehicles and equipment needed for their work. These reports cover our visits to Vietnam and Indonesia.",
        "kind": "gallery",
        "items": [
          {
            "title": "Vietnam: starting with the job",
            "body": "Visitors discussed cargo, tanker, sanitation, recovery and aerial-work vehicles, then the operating requirements needed for follow-up.",
            "image": "vietnam-original",
            "meta": "Vietnam · May 2026",
            "href": "/about/news/vietnam-exhibition-2026/",
            "action": "Read the exhibition report"
          },
          {
            "title": "Indonesia: chassis and body choices",
            "body": "At the May 2024 exhibition, discussions centered on chassis preferences, body functions and equipment requirements.",
            "image": "indonesia-original",
            "meta": "Indonesia · May 2024",
            "href": "/about/news/indonesia-exhibition-2024/",
            "action": "Read the exhibition report"
          }
        ],
        "links": [
          {
            "label": "Browse all news and events",
            "href": "/about/news/"
          }
        ]
      },
      {
        "id": "team",
        "title": "Team life at KEEYAK",
        "body": "Away from inquiries and vehicle projects, colleagues meet at annual gatherings and join team trips. These updates include photographs and dates from those events.",
        "kind": "gallery",
        "items": [
          {
            "title": "Annual company gathering",
            "body": "Colleagues came together at the office in January 2026 to review the year's work and share updates.",
            "image": "team-original",
            "meta": "January 2026",
            "href": "/about/news/annual-gathering-2026/",
            "action": "Read the company update"
          },
          {
            "title": "A day together in Chongqing",
            "body": "The September 2025 team trip included group activities and a shared meal away from the usual work schedule.",
            "image": "chongqing-original",
            "meta": "September 2025",
            "href": "/about/news/chongqing-team-day-2025/",
            "action": "See the team trip"
          }
        ],
        "links": [
          {
            "label": "More team stories",
            "href": "/about/news/?type=team"
          }
        ]
      },
      {
        "id": "hangzhou-office",
        "title": "Talk to our Hangzhou office",
        "kind": "office",
        "body": "Building 1, Future Center, Yuhang District, Hangzhou, Zhejiang, China",
        "items": [
          {
            "title": "A vehicle inquiry",
            "body": "Send the model, quantity and destination. Our team reviews the requirements and coordinates supplier or service-provider input.",
            "icon": "car"
          },
          {
            "title": "An office visit",
            "body": "Email your preferred date and what you would like to discuss so we can arrange the meeting.",
            "icon": "calendar"
          }
        ],
        "links": [
          {
            "label": "Start a vehicle inquiry",
            "href": "/quote/"
          },
          {
            "label": "contact@keeyak.com",
            "href": "mailto:contact@keeyak.com"
          },
          {
            "label": "WhatsApp",
            "href": company.whatsapp
          },
          {
            "label": "All contact details",
            "href": "/contact/"
          }
        ],
        "aliases": [
          "company-inquiry"
        ]
      }
    ]
  },
  contact: {
    slug: 'contact', label: 'Contact Us', group: 'contact', title: 'Contact KEEYAK',
    description: 'Contact the KEEYAK team in Hangzhou by email, WhatsApp or phone about new cars, used-car sourcing, an existing order or an office visit.',
    opening: { id: 'C1-01', title: 'Contact KEEYAK', body: `${company.legalName}\nNew cars, used-car sourcing and existing orders.\nHangzhou, China / UTC+8.`, image: 'office-original', kind: 'contact', links: [{ label: company.email, href: `mailto:${company.email}` }, { label: company.phone, href: company.whatsapp }, { label: company.phone, href: `tel:${company.phone}` }] },
    blocks: [
      { id: 'existing-order', title: 'Choose a contact option', body: 'Include the purchase or order details listed below when you contact us.', kind: 'contact-options', items: [
        { title: 'New cars', body: 'Models, versions, quantities and destination. Several models can go in one inquiry.', icon:'car',meta:'A new purchase',href: '/quote/?kind=new', action: 'Start a new-car inquiry' },
        { title: 'Used cars', body: 'Model, year range, mileage limit, condition requirements and budget priorities.', icon:'search',meta:'A vehicle-specific search',href: '/quote/?kind=used-sourcing', action: 'Start a used-car inquiry' },
        { title: 'An existing order', body: 'Use the order reference and your named contact. Email or WhatsApp us if you need help reaching them.', icon:'support',meta:'Follow-up and support',href: `mailto:${company.email}?subject=Existing%20order%20support`, action: 'Email about your order' }
      ] },
      { id: 'office', title: 'Our Hangzhou office', body: company.officeAddress, kind: 'office', items: [
        { title: 'Arrange your visit', body: 'Send your preferred date and meeting topic. Confirm the time, directions and office access with the team before traveling.', icon:'calendar' },
        { title: 'China Standard Time', body: 'UTC+8. Include your time zone when suggesting a call.', icon:'clock' }
      ], links: [{ label: 'Arrange a visit by email', href: `mailto:${company.email}?subject=Hangzhou%20office%20visit` }] },
      { id: 'next', title: 'After you contact us', body: 'The team reviews your message, asks for missing details and discusses the vehicles or order support you need.', kind: 'steps', items: [
        { title: 'Review your message', body: 'We check the purchase requirements or order reference and ask for missing details.', icon:'mail' },
        { title: 'Discuss the options', body: 'We discuss proposed vehicles, requested documents or order support.', icon:'message' },
        { title: 'Agree what happens next', body: 'We confirm the next checks or records and who will handle them.', icon:'check' }
      ] },
      { id: 'answers', title: 'Prepare your vehicle inquiry', body: 'Questions about the form and your first request.', kind: 'faq', items: [
        { title: 'How do I know my inquiry was received?', body: 'After you choose Send inquiry, the form displays a reference only when it has saved your inquiry. Reviewing a draft or opening email or WhatsApp does not submit the website form.' },
        { title: 'Does an inquiry reserve a car?', body: 'No. Availability, pricing and any reservation are agreed separately in writing.' },
        { title: 'What if I have not chosen a version?', body: 'Tell us the type of car, quantity and destination. Include your priorities and any alternatives you would accept.' }
      ], links: [{ label: 'Start an inquiry', href: '/quote/' }, { label: 'After-sales support', href: support }] }
    ]
  }
};
