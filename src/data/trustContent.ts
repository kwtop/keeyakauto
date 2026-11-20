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
          "label": "Request a quote",
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
      "body": "We go through our suppliers to find cars that fit your brief, then send you the details. You choose which ones get inspected.\nThe inspector does the checks you booked and writes up what they find. If anything is unclear, we take it back to the supplier before you decide whether to accept the cars.",
      "image": "sourcing-branded",
      "links": [
        {
          "label": "Request a quote",
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
        "body": "We find the cars and set up the inspection. You make the calls: which cars get inspected, and whether to go ahead.",
        "kind": "steps",
        "items": [
          {
            "title": "Find cars that match your brief",
            "body": "We ask suppliers what they actually have in the model and version you want.",
            "output": "A shortlist of cars with specs, quantities and prices",
            "icon": "search"
          },
          {
            "title": "Arrange the checks",
            "body": "We agree a date and place with the inspector, make sure they can get to the cars and confirm which tests you want.",
            "output": "An agreed inspection plan and its cost",
            "icon": "inspection"
          },
          {
            "title": "Read the inspection report",
            "body": "We send you the report. If something is missing or a car needs work, we go back to the supplier for answers or other options.",
            "output": "Findings for each car, plus answers to your open questions",
            "icon": "document"
          }
        ]
      },
      {
        "id": "requirement",
        "title": "Define your requirements",
        "body": "Tell us what you must have and what you could live without. If your first-choice version isn't available, that tells us where to look next.",
        "kind": "brief",
        "items": [
          {
            "title": "Model and essential equipment",
            "body": "Brand, model, market version and powertrain. Spell out the equipment you need too: a trim name alone doesn't always tell us what's fitted.",
            "icon": "car"
          },
          {
            "title": "Quantity and destination",
            "body": "How many cars, which country, and the port if you know it. Let us know if they should go as one batch or in separate deliveries.",
            "icon": "globe"
          },
          {
            "title": "Condition and budget",
            "body": "For used cars, give us a year range, a mileage limit and the condition you'll accept. Tell us whether your budget has to cover transport too.",
            "icon": "inspection"
          },
          {
            "title": "Acceptable alternatives",
            "body": "Other colors, versions or models you'd take, and when you need the cars. If you're still confirming a requirement, say so.",
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
        "body": "We get the details from the supplier so you can hold each offer up against your brief. What we ask for depends on whether it's a batch of new cars or a single used one.",
        "kind": "comparison",
        "columns": [
          "New-car batch",
          "Individual used car"
        ],
        "rows": [
          [
            "Exact market version, model year and equipment.",
            "The VIN, year and registration details."
          ],
          [
            "Quantities, colors and any production details the supplier can share.",
            "Mileage, and dated photos showing the car's condition."
          ],
          [
            "What's available now and when it can be released.",
            "Whether it's still available, and which history documents come with it."
          ],
          [
            "The documents included, and a reference for the batch or offer.",
            "Anything missing from its records, any inspection findings, and the offer reference."
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
        "body": "We agree the place, date and checks with the inspector before booking. Some tests may not be possible if the car is hard to reach, the right equipment isn't there or the seller says no. The inspector should note anything they couldn't do.",
        "image": "vehicle-inspection-evidence",
        "kind": "comparison",
        "columns": [
          "New cars",
          "Used cars"
        ],
        "rows": [
          [
            "That the cars, version, equipment and quantity match the offer.",
            "That it's the right car, plus whatever registration, service and repair records exist."
          ],
          [
            "Exterior, interior, keys and accessories.",
            "Bodywork and paint, and anything that needs a closer look."
          ],
          [
            "The functional checks you asked for, and any system readings available.",
            "The mechanical and functional checks you asked for, plus diagnostic data if it can be read."
          ],
          [
            "Any visible damage from transport or storage.",
            "Proof of mileage, and battery data for hybrids and EVs where it can be read."
          ]
        ],
        "paragraphs": [
          "A high paint reading tells you a panel may have been repainted, not why. When we see one, we ask the inspector to look closer and photograph the area. Fault codes and battery figures are the same: they mean little without the inspector's note on how they were taken."
        ]
      },
      {
        "id": "evidence",
        "aliases": [
          "new-used"
        ],
        "title": "What to look for in an inspection report",
        "body": "When we arrange the inspection, you get the inspector's findings for every car checked. Use this list to agree what the report should cover before anything is booked.",
        "kind": "report",
        "items": [
          {
            "title": "Vehicle and inspection details",
            "body": "The VIN, when and where the inspection took place, and who did it.",
            "icon": "fingerprint"
          },
          {
            "title": "Findings and supporting images",
            "body": "Findings item by item, each backed by a photo, reading or record from that car. Any measurement should say how it was taken.",
            "icon": "camera"
          },
          {
            "title": "Checks not completed",
            "body": "Anything the inspector couldn't reach, test or find records for. That way you know exactly what's still open.",
            "icon": "list"
          },
          {
            "title": "Follow-up and acceptance",
            "body": "Open questions for the supplier, any repairs they offer, and your decision: accept the issue as it is or ask for more work.",
            "icon": "document"
          }
        ],
        "takeaway": {
          "title": "For a used EV or plug-in hybrid",
          "body": "The brochure range tells you nothing about the battery in this particular car. Ask for an actual battery reading, and when and how it was taken."
        }
      },
      {
        "id": "exceptions",
        "title": "Resolve findings before release",
        "body": "If the report shows something you didn't ask for, we take it back to the supplier or the inspector. Before the cars are released, you decide whether to check further, ask for a revised offer or accept them.",
        "kind": "steps",
        "items": [
          {
            "title": "Ask about the finding",
            "body": "Point us to the photo, reading or missing record that worries you. We put that exact question to the supplier or inspector.",
            "icon": "inspection"
          },
          {
            "title": "Decide whether to check again",
            "body": "We can ask for more evidence or book a second inspection, as long as the car can be reached and tested.",
            "icon": "message"
          },
          {
            "title": "Record the resolution",
            "body": "If the seller offers a repair, a different car, or a new price or date, they put it in writing for you to review.",
            "icon": "document"
          },
          {
            "title": "Authorize release",
            "body": "You release the cars on the terms in your order. Anything still unresolved is written down first.",
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
        "body": "Tell us the models, how many and where they're going. Add the equipment you can't do without and what you want inspected. For used cars, include your year, mileage and condition limits.",
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
      "body": "We work with the exporter and the transport companies to get your cars shipped. We pull together the route, the costs, the paperwork and who to contact at handover.\nYou see the cost first. Once transport is booked, we send you the booking references and keep you posted on departure.",
      "image": "shipping",
      "links": [
        {
          "label": "Request a quote",
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
        "body": "The plan depends on the cars, where they're going and which carriers serve that route. Your order decides where the handover happens and what's included.",
        "kind": "steps",
        "items": [
          {
            "title": "Find a route",
            "body": "We send the car sizes, quantity and destination to transport providers and ask what they can offer.",
            "output": "A proposed route with quoted costs and estimated dates",
            "icon": "ship"
          },
          {
            "title": "Get the shipping documents ready",
            "body": "We work through the paperwork with the exporter and whoever is receiving the cars at your end.",
            "output": "Drafts for you to check, then the final documents",
            "icon": "document"
          },
          {
            "title": "Track dispatch and delivery",
            "body": "We pass on booking and departure updates as they come in, and line up collection at the other end.",
            "output": "Transport references, collection instructions and a follow-up contact",
            "icon": "package"
          }
        ]
      },
      {
        "id": "route",
        "title": "Compare transport options",
        "body": "It starts with where the cars are going, how big they are and how many. What we can quote then depends on which carriers will take them and what runs on that route.",
        "kind": "transport",
        "items": [
          {
            "title": "Roll-on / roll-off",
            "body": "Ro-Ro is usually the simplest way to ship running cars. They drive straight onto the ship, so loose items and spare parts need to be packed and listed separately.",
            "image": "transport-roro",
            "meta": "Drive-on vehicle transport"
          },
          {
            "title": "Container",
            "body": "Cars are loaded and secured in a container to an agreed plan. Before comparing prices, check how many cars fit in each container and what handling costs at both ends.",
            "image": "transport-container",
            "meta": "Loading plan required"
          },
          {
            "title": "Overland",
            "body": "If a land route serves your destination, it's worth a look. Ask how the border crossings work, what paperwork travels with the cars and where they'll be handed over.",
            "image": "transport-overland",
            "meta": "Route and border checks"
          }
        ]
      },
      {
        "id": "cost",
        "title": "What the shipping quote includes",
        "body": "We ask the transport provider to break the charges out instead of giving one number. The total covers everything up to the handover point you chose.",
        "kind": "records",
        "columns": [
          "Cost group",
          "What the proposal covers"
        ],
        "rows": [
          [
            "Before departure",
            "Getting the cars to the port, storing, preparing and loading them. Any charge that depends on the actual handling is flagged."
          ],
          [
            "Main transport",
            "The route and service, the rate, how long the quote holds and the booking terms."
          ],
          [
            "Insurance",
            "Whether insurance is included or arranged separately, what it covers, and who to contact and what to send if you need to claim."
          ],
          [
            "At destination",
            "Where the handover happens, and who handles terminal charges and onward transport. Your importer or agent gives you the local figures for clearance, tax and registration."
          ]
        ],
        "paragraphs": [
          "The cars leave the yard, the carrier departs, it arrives, you collect: each step has its own date. The schedule shows which dates are confirmed and which are still estimates, and who to ask for updates."
        ]
      },
      {
        "id": "documents",
        "title": "Shipping documents",
        "body": "We agree the document list with the exporter and your importer, then pass each document on to you as it's issued. Check the consignee and vehicle details on the drafts before anything is finalized.",
        "kind": "records",
        "columns": [
          "Record",
          "Contents and source"
        ],
        "rows": [
          [
            "Commercial invoice and packing list",
            "Issued by the seller or exporter for your order. They show who's buying and selling, which cars, how many and what comes with them."
          ],
          [
            "Transport document",
            "Issued by the carrier. By sea this is usually a bill of lading. Other routes use different documents and release the cars differently."
          ],
          [
            "Origin or conformity records",
            "Provided for your exact cars if your market needs them and they can be issued. Your importer should confirm which ones are accepted locally."
          ],
          [
            "Departure and handover file",
            "VINs, dated condition photos, a list of what goes with each car and the transport references, put together by whoever handles dispatch."
          ]
        ],
        "links": [
          {
            "label": "Purchase document checklist",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          }
        ],
        "paragraphs": [
          "This is a checklist, not a real shipment. The documents and photos for your order will show your actual cars and how they were moved."
        ]
      },
      {
        "id": "pre-departure",
        "title": "Pre-shipment checks",
        "body": "Before the cars leave, we work with whoever handles dispatch on a departure record. It lists each car with its photos, keys and extras, so your team can check them off on arrival.",
        "kind": "checklist",
        "items": [
          {
            "title": "Vehicle identity",
            "body": "VINs, market version and quantity should match the order and the transport documents.",
            "icon": "fingerprint"
          },
          {
            "title": "Condition photographs",
            "body": "Dated photos inside and out. Any existing mark is shot wide enough that you can find it on the car.",
            "icon": "camera"
          },
          {
            "title": "Keys and supplied items",
            "body": "A list of the keys, accessories and papers going with each car. Agree how loose items will be packed and handed over.",
            "icon": "key"
          },
          {
            "title": "Release instructions",
            "body": "The transport reference, the name of the person receiving the cars, and loading photos if the carrier provides them.",
            "icon": "ship"
          }
        ]
      },
      {
        "id": "handover",
        "title": "Delivery inspection",
        "body": "When the cars arrive, check them against the departure file while the receiving paperwork is still being done. If something's different, report it the way your shipment requires and keep the evidence.",
        "kind": "steps",
        "items": [
          {
            "title": "Match the vehicles",
            "body": "Check the VINs and count the cars. Then compare condition, keys and extras with the departure file.",
            "icon": "inspection"
          },
          {
            "title": "Document any differences",
            "body": "Photograph the whole car, then the problem close up, with dates. Note anything missing or wrong on the receiving record.",
            "icon": "camera"
          },
          {
            "title": "Contact the claims handler",
            "body": "Get in touch with the carrier, the claims contact or the order contact named for your shipment. Claims have deadlines, so check them straight away.",
            "icon": "message"
          },
          {
            "title": "Keep your shipping records",
            "body": "Hold on to the transport references, photos and emails. Transport damage and a warranty problem may be handled by different people.",
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
        "body": "Tell us which cars, how many, where they're going and when. Let us know where you'd like to take over the cars and whether you need transport onward from there.",
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
      "body": "We look up your order and send your request to whoever provides support for your car. We chase any missing details and come back to you with what they propose.\nContact your order representative, or email us with your order reference, the VIN and what's going wrong.",
      "image": "support-branded",
      "links": [
        {
          "label": "Email the support team",
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
          "body": "VIN, part number and photos."
        },
        {
          "title": "Software",
          "body": "Software version, the feature affected and where the car is used."
        },
        {
          "title": "Arrival damage",
          "body": "Your departure and arrival records."
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
        "body": "Your KEEYAK contact sends the request to the support provider named in your order. They look at the evidence, check what's covered and decide whether to approve a repair.",
        "kind": "steps",
        "items": [
          {
            "title": "Locate your order",
            "body": "Your order reference and VIN tell us which car it is, the terms it was sold on and who supports it.",
            "output": "Your request with the right support provider",
            "icon": "document"
          },
          {
            "title": "Review the issue",
            "body": "We send them your description and evidence. They tell us if they need anything else or want more checks done.",
            "output": "A list of anything else they need",
            "icon": "inspection"
          },
          {
            "title": "Agree the next action",
            "body": "The provider proposes a diagnosis, parts or a repair, and we follow it up. You see what's approved and what it costs before any work starts.",
            "output": "A plan, and who pays for what",
            "icon": "message"
          },
          {
            "title": "Follow up on the result",
            "body": "Once the work is done, we send the provider the records and results, and flag anything still unresolved.",
            "output": "A record of what was done and what's still open",
            "icon": "check"
          }
        ]
      },
      {
        "id": "coverage",
        "title": "Warranty coverage and repair approval",
        "body": "What's covered depends on your car's terms and where it's going. The manufacturer's warranty from the original market may not carry over after export, so check your order: it names your support provider and what they cover.",
        "kind": "brief",
        "items": [
          {
            "title": "Provider and territory",
            "body": "Who provides support, and in which countries.",
            "icon": "shield"
          },
          {
            "title": "Period and exclusions",
            "body": "When cover starts, how long it lasts, which parts it includes and what it doesn't pay for.",
            "icon": "calendar"
          },
          {
            "title": "Diagnosis and repair approval",
            "body": "Which checks can be ordered, and who has to approve a repair before it starts.",
            "icon": "wrench"
          },
          {
            "title": "Labor, parts and freight",
            "body": "Who approves parts, labor and freight, and what proof is needed if costs are to be reimbursed.",
            "icon": "wallet"
          }
        ]
      },
      {
        "id": "report",
        "title": "What to send when you ask for help",
        "image": "support-issue-report",
        "body": "Send the car details and the problem in one message, quoting your order reference. Keep the original photos, readings and reports in case the provider asks for them.",
        "kind": "brief",
        "items": [
          {
            "title": "Order and delivery",
            "body": "Order reference, delivery date and who we should talk to.",
            "icon": "document"
          },
          {
            "title": "Vehicle identity",
            "body": "VIN, model and exact version. A photo of the label helps if you're not sure.",
            "icon": "car"
          },
          {
            "title": "Location and mileage",
            "body": "Where the car is, its mileage today and when the problem started.",
            "icon": "pin"
          },
          {
            "title": "What happens",
            "body": "What the car does, when it happens, and any warning message or fault code.",
            "icon": "settings"
          },
          {
            "title": "Supporting evidence",
            "body": "Clear photos or video, diagnostic readings or the workshop report. Say when each was taken and what it shows.",
            "icon": "camera"
          },
          {
            "title": "Work already carried out",
            "body": "Anything already checked, updated, replaced or repaired, and who did it.",
            "icon": "wrench"
          }
        ],
        "paragraphs": [
          "Charging problem? Tell us which charger and connector you used, any error message, when it started and whether the car has charged normally since. Photos of the connector and the warning screen help a lot."
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
        "body": "Two parts can look the same and still have different connectors, mounts or software. Send the car's details and the part's own markings so the supplier can match it.",
        "image": "vehicle-parts-identification",
        "kind": "checklist",
        "items": [
          {
            "title": "Parts",
            "body": "Send the VIN, version and photos, the part number if you have it, how many you need and where they're going. The supplier uses this to check fit, stock and price.",
            "icon": "package"
          },
          {
            "title": "Software",
            "body": "Tell us the feature, the current software version, the error and the country you're in. Connected services, languages and updates can differ from one market version to another.",
            "icon": "software"
          },
          {
            "title": "Local work",
            "body": "Before a local workshop starts diagnosis or repairs, agree who does it, what evidence is needed, who approves it and what it costs. If asked, keep the removed parts and work records.",
            "icon": "wrench"
          }
        ]
      },
      {
        "id": "arrival",
        "title": "Transport damage or vehicle fault?",
        "body": "If you spotted the problem when you collected the car, start with the departure and receiving records. A shipping claim and a warranty claim may go through different channels.",
        "kind": "faq",
        "items": [
          {
            "title": "What should I send for arrival damage?",
            "body": "Send your order and transport references, the date you received the car, dated photos (wide shots and close-ups) and any damage noted on the receiving record. If the claims process asks you to keep packaging or other evidence, keep it."
          },
          {
            "title": "Can I repair the car first and claim later?",
            "body": "Check first. Before any work starts, ask whoever handles the claim what evidence and approval they need, and who pays for diagnosis, labor, parts and transport."
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
        "body": "Email or message us with your order reference and the details above. Can't reach your usual contact? The team can pass your request to the right person.",
        "kind": "contact",
        "links": [
          {
            "label": "Email the support team",
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
            "label": "Request a quote",
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
      ], links: [{ label: 'Request a quote', href: '/quote/' }, { label: 'After-sales support', href: support }] }
    ]
  }
};
