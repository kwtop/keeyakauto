import type {GuideEditorial} from './guideEditorial';

// Buying Guide article text. Sources and section citations are maintained with each article.
export const procurementGuides: Record<string, GuideEditorial> = {
  "exw-fob-cif-car-shipping": {
    "title": "EXW, FOB and CIF Car Shipping: Costs and Responsibilities",
    "description": "Compare EXW, FOB and CIF car shipping from China: delivery and risk points, named ports, CIF insurance and a clearly qualified cost example.",
    "answer": "EXW makes the buyer arrange collection and most transport work; FOB includes delivery on board at the named shipment port; CIF also includes the seller’s freight and insurance to the named destination port. Under both FOB and CIF, transit risk passes when the car is on board at origin. Compare the same endpoint and insurance scope before choosing a price.",
    "image": "quote",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "icc",
        "label": "ICC, Incoterms® 2020 checklist, updated 2024",
        "href": "https://library.iccwbo.org/content/clp/Others/incoterms_2020_checklist_2024-update.pdf"
      }
    ],
    "sections": [
      {
        "heading": "Choose the handover before comparing the price",
        "paragraphs": [
          "Write the rule, named place or port, and edition together. “FOB China” leaves the loading port unclear; “CIF destination” leaves the receiving port unclear. Identify the terminal or collection address separately where it affects handling charges.",
          "For a buyer with an established forwarder, FOB may make freight control easier. CIF can suit a buyer who wants the seller to arrange the main sea carriage, provided the sailing, destination charges and insurance are acceptable. Neither rule sets payment terms, transfers ownership by itself or guarantees road registration.",
          "For containerized cars handed to a carrier at a terminal before loading, discuss FCA at the actual handover point. A seller can arrange the main carriage under a suitable C rule without moving risk to arrival; choose the rule to match the physical handover rather than the name printed on an old quotation."
        ],
        "sources": [
          "icc"
        ]
      },
      {
        "heading": "Which quote works out cheaper?",
        "paragraphs": [
          "Illustration only, in USD: the two offers below assume the same car, route, destination charges and hypothetical tax amount. This isolates the freight-and-insurance comparison. If the assessable value changes, duties and taxes may change too. Have the broker recalculate each actual offer."
        ],
        "table": {
          "caption": "Illustrative comparison per car, in USD",
          "headers": [
            "Cost to the same delivery point",
            "Offer A · FOB",
            "Offer B · CIF"
          ],
          "rows": [
            [
              "Supplier quote",
              "$12,000",
              "$13,200"
            ],
            [
              "Sea freight",
              "$950",
              "Included"
            ],
            [
              "Cargo insurance",
              "$125",
              "Included, check the cover"
            ],
            [
              "Subtotal at destination port",
              "$13,075",
              "$13,200"
            ],
            [
              "Terminal and broker charges",
              "$650",
              "$650"
            ],
            [
              "Duties and taxes, illustrative",
              "$1,350",
              "$1,350"
            ],
            [
              "Delivery from the terminal",
              "$300",
              "$300"
            ],
            [
              "Total to the same delivery point",
              "$15,375",
              "$15,500"
            ]
          ]
        },
        "items": [
          "The CIF price is $1,200 above FOB. That is the break-even amount for separately purchased freight and insurance, assuming the other charges and coverage match.",
          "If your forwarder cannot match the route or your policy excludes the damage you want covered, price the difference before using the $125 saving."
        ]
      },
      {
        "heading": "Who pays, and when does risk pass?",
        "table": {
          "caption": "Incoterms® 2020 allocation for FOB and CIF",
          "headers": [
            "Question",
            "FOB",
            "CIF"
          ],
          "rows": [
            [
              "Which port do you name?",
              "Port of shipment.",
              "Port of destination. Identify the port of shipment as well."
            ],
            [
              "Who arranges main carriage?",
              "Buyer.",
              "Seller arranges and pays freight to the named destination port."
            ],
            [
              "Who obtains cargo insurance?",
              "The term does not oblige either party to insure. The buyer can arrange cover.",
              "Seller obtains the default minimum cover, Institute Cargo Clauses (C) or similar, unless different cover is agreed."
            ],
            [
              "When does transit risk pass?",
              "When the vehicle is on board the vessel at the port of shipment.",
              "Also when it is on board at the port of shipment, even though the seller pays carriage farther."
            ],
            [
              "Who handles import clearance and tax?",
              "Buyer under the standard rule.",
              "Buyer under the standard rule. CIF stops short of door delivery."
            ]
          ]
        },
        "sources": [
          "icc"
        ]
      },
      {
        "heading": "When the container goes to a terminal first",
        "paragraphs": [
          "The named port and the actual handover point need to describe the same transaction. FOB shipping places delivery on board the vessel at the shipment port. Where a container is handed to a carrier at a terminal before vessel loading, discuss FCA for buyer-arranged carriage or CIP for seller-arranged carriage and insurance. Put the selected rule, precise place and Incoterms 2020 edition in the delivery terms.",
          "CIF shipping pays freight charges to the named destination port while risk transfer occurs at the shipment port under the standard rule. Review the marine cargo insurance evidence separately: the insured journey, exclusions, deductible and claims contact. The quote should also identify export clearance, unloading charges and the import clearance costs left to the buyer."
        ],
        "sources": [
          "icc"
        ]
      },
      {
        "heading": "EXW vs FOB: what happens before the car reaches the ship?",
        "paragraphs": [
          "An EXW vehicle price starts at the named premises. Ask your forwarder to price collection, loading, inland movement and the export work left to your side. An apparently cheaper showroom price can leave several unpriced steps before shipment. Confirm who can perform those steps for this order.",
          "FOB names a port of shipment and places delivery on board the vessel. It is a sea or inland-waterway rule. For a container handed to a carrier at a yard or terminal, ask whether FCA describes the actual handover more accurately. Write the rule, named point and “Incoterms® 2020” together."
        ],
        "sources": [
          "icc"
        ],
        "links": [
          {
            "label": "Compare the complete written offers",
            "href": "/export-services/buying-guide/compare-car-export-quotes/"
          }
        ]
      },
      {
        "heading": "Ask for the freight and insurance behind a CIF price",
        "paragraphs": [
          "Send the seller the destination port you actually intend to use. Request the carrier or forwarding arrangement, routing assumptions, quote expiry and the charges payable on arrival. A CIF offer to one port cannot be compared with FOB plus freight to a different port without adding the remaining journey.",
          "Keep the insurance evidence with the quote. Check the insured value, covered journey, deductible, exclusions and the person who handles a claim. If you need wider cover, obtain its price before accepting the offer. The party paying freight and the point where risk transfers are separate parts of the comparison."
        ],
        "links": [
          {
            "label": "Estimate costs beyond the destination port",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Write down the insurance and release terms",
        "paragraphs": [
          "CIF under Incoterms® 2020 normally calls for minimum cargo cover comparable to Institute Cargo Clauses (C), unless broader cover is agreed. That is not a promise to cover every scratch, mechanical fault or pre-existing defect. Request the policy or certificate, insured value, excess, exclusions, claims contact and the party entitled to claim.",
          "A usable quotation line might read: “CIF [named destination port], Incoterms® 2020; [specified vehicle and quantity]; freight and insurance included; destination terminal handling, customs clearance, duties and inland delivery [included/excluded].” Add the evidence and payment terms in the contract. The brackets must be completed for the actual shipment."
        ],
        "sources": [
          "icc"
        ],
        "links": [
          {
            "label": "Normalize the complete export offers",
            "href": "/export-services/buying-guide/compare-car-export-quotes/"
          }
        ]
      },
      {
        "heading": "Questions about EXW, FOB and CIF car quotes",
        "questions": [
          {
            "question": "Does CIF include car import duty and registration?",
            "answer": "Under the standard CIF allocation, the buyer handles import clearance and its costs. Ask for a separate destination estimate covering duties, taxes, terminal release, local delivery and registration where required. A seller’s extra service should be listed explicitly."
          },
          {
            "question": "Is FOB always cheaper than CIF?",
            "answer": "No. Compare freight, insurance and handling for the same route and vehicle list. The worked example above shows one comparison, not a current shipping rate. A buyer with a different forwarder or insurance requirement can reach a different result."
          }
        ],
        "sources": [
          "icc"
        ]
      }
    ],
    "links": [
      {
        "label": "Build a landed-cost estimate",
        "href": "/export-services/buying-guide/calculate-car-landed-cost/"
      },
      {
        "label": "Compare RoRo and container shipping",
        "href": "/export-services/buying-guide/container-vs-roro-car-shipping/"
      },
      {
        "label": "Send a wholesale quote request",
        "href": "/export-services/buying-guide/request-wholesale-car-quote/"
      }
    ]
  },
  "calculate-car-landed-cost": {
    "title": "Car Import Cost Calculator: Landed Cost from China",
    "description": "Calculate car import landed cost per unit or batch, with freight, insurance, broker-supplied taxes, local delivery, allocation and currency assumptions.",
    "answer": "Add the vehicle price and every cost needed to reach one named endpoint: origin work, freight, insurance, destination clearance, taxes and local preparation or delivery. Record each figure as confirmed, estimated or still missing. The calculator totals your inputs; it does not determine a country’s tax rate or confirm import eligibility.",
    "image": "quote",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "icc",
        "label": "ICC, Incoterms® 2020 checklist, updated 2024",
        "href": "https://library.iccwbo.org/content/clp/Others/incoterms_2020_checklist_2024-update.pdf"
      }
    ],
    "sections": [
      {
        "heading": "Choose the endpoint and currency",
        "paragraphs": [
          "Choose where the budget ends: customs release, delivery to your yard or completion of registration. Put the endpoint, quoted trade term and exchange rate date above the worksheet. A four-car batch delivered to a yard and a single registered vehicle need different cost lines.",
          "Landed cost per car = vehicle price + origin charges outside the quote + freight charges and marine cargo insurance outside the quote + applicable import duty and taxes + destination handling and customs broker fees + local work in scope.",
          "Keep import VAT or any other applicable tax on the broker's calculation, with its valuation basis and date. Registration fees and inland transport belong in the purchasing budget when your endpoint includes them. A seller's port price leaves these amounts to be established; they should remain visible as missing until quoted."
        ],
        "sources": [
          "icc"
        ]
      },
      {
        "heading": "Work through a four-car example",
        "paragraphs": [
          "The following figures are hypothetical budgeting inputs, not a supplier offer or a tax schedule. The USD 1,540 duty-and-tax allowance is an assumed amount supplied to the example, not a percentage to copy for another car or country.",
          "Assume four identical cars and equally shared freight and insurance. All figures are illustrative USD. The tax line represents an amount a broker would calculate under the destination’s rules. It is not derived by applying a universal rate to this subtotal."
        ],
        "table": {
          "caption": "Illustrative landed-cost worksheet",
          "headers": [
            "Line item",
            "Basis",
            "Per car"
          ],
          "rows": [
            [
              "FOB vehicle quote",
              "One car at the named loading port",
              "$11,000"
            ],
            [
              "Ocean freight",
              "$4,400 ÷ 4 cars",
              "$1,100"
            ],
            [
              "Insurance",
              "$360 ÷ 4 cars",
              "$90"
            ],
            [
              "Duties and taxes",
              "Illustrative broker estimate",
              "$1,540"
            ],
            [
              "Terminal and brokerage",
              "Per-car share",
              "$320"
            ],
            [
              "Local delivery and registration",
              "Included in this example’s endpoint",
              "$450"
            ],
            [
              "Total",
              "$14,500 × 4 = $58,000 for the batch",
              "$14,500"
            ]
          ]
        }
      },
      {
        "heading": "Calculate your own estimate",
        "paragraphs": [
          "Use one currency for all amounts. Freight and insurance are batch costs in this worksheet. Enter zero for an item already included in the unit price and use the duties and taxes your broker estimates."
        ],
        "calculator": true
      },
      {
        "heading": "Audit the numbers before ordering",
        "items": [
          "Attach the dated seller, carrier and broker offers. Mark each line confirmed, estimated or missing.",
          "If a CIF quote already includes freight and insurance, remove those duplicate entries while retaining any agreed additional cover.",
          "Ask the broker for the classification, valuation basis, currency conversion and tax assumptions. Verify registration and port charges separately.",
          "For mixed cars, allocate shared charges by the cost driver quoted by the forwarder, such as units, space or handling.",
          "Add a separate contingency line for items such as storage or currency movement. Keep it separate from the confirmed costs."
        ]
      },
      {
        "heading": "What changes the car shipping cost from China?",
        "paragraphs": [
          "Give the forwarder the departure point, destination, vehicle count, dimensions, powertrain and condition. Request a dated RoRo or container quote with the booking assumptions. Ask whether inland collection, loading, terminal handling, documents and destination release are included. A freight-only estimate leaves those lines open.",
          "For a mixed batch, request the actual allocation method. Dividing every charge equally can hide a larger vehicle’s space or handling cost. Keep both a total shipment budget and a per-vehicle worksheet, and reconcile them before comparing the expected resale margin."
        ],
        "links": [
          {
            "label": "Compare RoRo and container services",
            "href": "/export-services/buying-guide/container-vs-roro-car-shipping/"
          }
        ]
      },
      {
        "heading": "Import duty and tax: what the calculator needs from your broker",
        "paragraphs": [
          "This car import cost calculator adds the amounts you enter. It does not determine a tariff classification or calculate a country’s tax automatically. Ask the destination broker for the applicable classification, customs value, rates, fees and calculation date for the exact new or used vehicle.",
          "Keep the broker’s tax worksheet beside the supplier’s quote. Record whether the broker has included freight and insurance in the valuation and which exchange rate it used. When a tariff, version, price or destination changes, obtain a revised calculation instead of carrying the old tax line into the new order.",
          "Use the destination guides to organize the next conversation. They do not replace a shipment-specific clearance estimate. An exemption or personal import route described for one buyer may not apply to a dealer’s commercial batch."
        ],
        "links": [
          {
            "label": "Mexico import planning",
            "href": "/export-services/buying-guide/countries/mexico/"
          },
          {
            "label": "Egypt import planning",
            "href": "/export-services/buying-guide/countries/egypt/"
          }
        ]
      },
      {
        "heading": "Allocate shared costs without hiding expensive units",
        "paragraphs": [
          "Keep charges that belong to one VIN on that vehicle: a particular repair, inspection or registration fee should not disappear into a batch average. For genuinely shared freight, document the agreed allocation basis, such as the forwarder’s chargeable space or a disclosed equal split.",
          "Hypothetical mixed batch: shared freight is USD 2,400 for two sedans and one larger pickup. If the forwarder’s agreed chargeable-space weights are 1, 1 and 2, allocate USD 600, USD 600 and USD 1,200. An equal split would be USD 800 each. Both total USD 2,400, but they produce different unit margins. Use the basis that reflects your booking, and retain it when comparing resale costs."
        ]
      },
      {
        "heading": "Test the budget against freight and exchange-rate changes",
        "paragraphs": [
          "In the existing four-car example, an additional USD 300 freight per car increases the batch budget by USD 1,200, before any resulting tax change. If a hypothetical USD 58,000 payment is converted at 5.00 units of local currency per USD, it requires 290,000; at 5.20 it requires 301,600. The 11,600 difference excludes bank fees and changes to locally assessed taxes.",
          "Keep a cash-payment total that includes tax payable at clearance. If a local accountant confirms that an amount can later be credited or recovered, show that separately in a margin analysis, with timing and conditions. A possible future recovery does not fund the port release today.",
          "Before ordering, resolve the largest missing items and obtain the offer expiry, exchange-rate basis and quote owner for every estimate. Do not silently enter zero for an unquoted charge. Keep any contingency separate from confirmed supplier prices so it can be replaced as evidence arrives."
        ],
        "links": [
          {
            "label": "Check what each quotation leaves out",
            "href": "/export-services/buying-guide/compare-car-export-quotes/"
          }
        ]
      },
      {
        "heading": "Questions about the landed-cost estimate",
        "questions": [
          {
            "question": "What should I enter when a charge is still unknown?",
            "answer": "Mark it as missing in your purchasing worksheet and request the quote. A zero in the calculator contributes nothing to the total; it does not mean the service is free. Treat a total with missing items as an incomplete budget."
          },
          {
            "question": "Does a low vehicle price mean a better import margin?",
            "answer": "Compare the cost at the same endpoint, including preparation, inspection and support you must arrange. Keep expected resale proceeds separate from confirmed costs, and test the margin again if the route, exchange rate or tax estimate changes."
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Compare FOB and CIF quotes",
        "href": "/export-services/buying-guide/exw-fob-cif-car-shipping/"
      },
      {
        "label": "Check your destination",
        "href": "/export-services/buying-guide/#country-guides"
      },
      {
        "label": "Download the purchase checklist",
        "href": "/downloads/vehicle-purchase-checklist.txt"
      }
    ]
  },
  "inspect-a-used-car-from-china": {
    "title": "Used Car Inspection Checklist: Before Buying and Shipping",
    "description": "Inspect a used car from China before purchase or shipment. Define VIN-linked checks, report limitations, acceptance criteria, repair evidence and reinspection.",
    "answer": "Agree a written inspection scope for the actual VIN before booking. The report should show identity, mileage, condition, operation, findings and checks not completed, with dated evidence. Use the findings to decide whether to accept, require repair and reinspection, or decline the unit before the relevant payment or release milestone.",
    "image": "inspection",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "used-export",
        "label": "China MOFCOM and four departments, Announcement No. 6 of 2024 on used vehicle exports",
        "href": "https://www.mofcom.gov.cn/zfxxgk/gkml/art/2024/art_79f6d1fc5871472ea2ddae704b1173b2.html"
      },
      {
        "id": "inspection-scope",
        "label": "SGS: used vehicle inspection scope and condition reporting",
        "href": "https://www.sgs.com/en-us/services/used-vehicle-inspection"
      }
    ],
    "sections": [
      {
        "heading": "Send the inspector this checklist",
        "table": {
          "caption": "Pre-shipment inspection and evidence to request",
          "headers": [
            "Check",
            "Evidence",
            "Decision before release"
          ],
          "rows": [
            [
              "Identity",
              "VIN at the vehicle, registration and offer, plus dated photos.",
              "Resolve every mismatch with the seller and inspector."
            ],
            [
              "Odometer",
              "Dated reading and accessible maintenance, inspection or registration records.",
              "Ask about gaps, resets and records that conflict."
            ],
            [
              "Body and structure",
              "Walkaround, underbody access, repair observations and agreed paint readings.",
              "Agree acceptable repairs and get a price or replacement if needed."
            ],
            [
              "Mechanical operation",
              "Cold start, warning lamps, leaks, brakes, tyres and road test where permitted.",
              "Record what could not be checked and who will follow up."
            ],
            [
              "Cabin and equipment",
              "Keys, HVAC, locks, cameras, controls and the equipment in the offer.",
              "Record missing items before approving handover."
            ],
            [
              "Electrified vehicle",
              "Battery report or agreed diagnostics, charge test where available, visible damage and faults.",
              "Agree a further test or decline if material risks remain open."
            ]
          ]
        }
      },
      {
        "heading": "Agree on the inspection and release criteria",
        "paragraphs": [
          "Name the inspector, vehicle location, checklist and evidence format before paying for the inspection. Confirm what access is available, especially for an underbody check, battery diagnostics or a road test. A report can distinguish a pass, a finding and a check the inspector could not perform.",
          "China’s used vehicle export framework calls for a third-party product inspection report. Check the applicable export report with the exporter and agree any extra checks your own purchase needs. A report prepared for export does not decide whether the destination will register the car.",
          "For a batch, a sample inspection does not establish the condition of uninspected cars. Decide which identity, damage and operation checks apply to every VIN, which deeper tests may be sampled, and who approves an exception. The inspection provider’s service scope and the statutory export inspection are separate matters; confirm what each actually covers."
        ],
        "sources": [
          "used-export"
        ]
      },
      {
        "heading": "What to save at handover",
        "items": [
          "Keep the dated inspection, photos and written acceptance together by VIN.",
          "If repairs are agreed, request the repair record and the specific re-check before release.",
          "Ask for a fresh handover condition record if time passed between inspection and dispatch."
        ]
      },
      {
        "heading": "Pre-purchase inspection or pre-shipment inspection?",
        "paragraphs": [
          "A used car pre-purchase inspection helps you decide whether to accept a specific car and what repairs or price changes to request. A pre-shipment inspection checks the identified car against the agreed condition and release requirements near dispatch. State which decision the inspection must support when booking it.",
          "If the same report will serve both purposes, record its date and what happens between inspection and loading. A car can be moved, repaired or substituted during that interval. Ask for updated identity and condition photos at handover and a targeted re-check for any agreed work."
        ]
      },
      {
        "sources": [
          "used-export",
          "inspection-scope"
        ],
        "heading": "Ask for findings you can act on",
        "paragraphs": [
          "Start with VIN verification and an odometer check against the records available for that car. Record the identifier photographed, the reading, the date and any inconsistency. The inspector should distinguish the observation from a conclusion about the car's history.",
          "For paint thickness, request panel locations and measurements with photographs. Suspected accident damage needs an explanation of the physical evidence and access limits. An underbody inspection and OBD diagnostics should be included only when the provider has the equipment, permission and agreed scope; neither a clean scan nor one paint reading establishes a complete repair history.",
          "Use the findings to make a decision: accept the recorded condition, agree repairs and a re-check, commission another test, or review a replacement. Keep the road test result and every unperformed check in that decision file."
        ],
        "items": [
          "For a road test, record whether it took place and any restrictions on route or speed.",
          "For a used EV, specify the battery diagnostics and charging checks separately from the general walkaround.",
          "For a batch, identify which checks apply to every VIN. A report for one sample car does not describe the condition of every unit."
        ],
        "links": [
          {
            "label": "Check the used EV battery evidence",
            "href": "/export-services/buying-guide/used-ev-battery-report/"
          }
        ]
      },
      {
        "heading": "Turn each finding into an acceptance decision",
        "paragraphs": [
          "These are workflow examples, not universal mechanical pass limits. Set the actual standards with the inspector for the model, age, use and budget. A report can describe accessible evidence without establishing every hidden defect or the complete accident history.",
          "After rectification, keep the original finding, repair invoice or work record, new test result and buyer decision together. Before loading, compare the VIN, odometer and visible condition with that accepted file; explain additional mileage or damage rather than overwriting the earlier record."
        ],
        "table": {
          "caption": "Example decision record to agree before inspection",
          "headers": [
            "Finding",
            "Evidence and decision"
          ],
          "rows": [
            [
              "Cosmetic damage within the agreed limit",
              "Save a close-up, location and description; record the buyer’s acceptance or agreed price adjustment."
            ],
            [
              "Repair promised before shipment",
              "Name the repair, responsible party and completion date; request work evidence and an independent recheck of the affected function."
            ],
            [
              "Warning lamp, abnormal operation or suspected structural damage",
              "Pause approval; ask the qualified inspector to explain the significance, further test and limits. Do not treat a reset warning as proof of repair."
            ],
            [
              "Road test, lift inspection or diagnostic scan not completed",
              "Mark the field “not tested” and state why; arrange the missing check or obtain the buyer’s explicit acceptance of the remaining uncertainty."
            ],
            [
              "VIN or registration record mismatch",
              "Stop the release decision until the identity and documents have been reconciled for the proposed unit."
            ]
          ]
        },
        "sources": [
          "inspection-scope"
        ],
        "links": [
          {
            "label": "Use the same evidence when the car arrives",
            "href": "/export-services/buying-guide/vehicle-arrival-checklist/"
          }
        ]
      },
      {
        "heading": "Questions before booking a car inspection",
        "questions": [
          {
            "question": "Can an inspection guarantee the mileage is genuine?",
            "answer": "Ask for an odometer photo and the accessible dated records used to compare it. An inspector should identify gaps or conflicting entries. A current reading alone cannot prove the vehicle’s complete mileage history."
          },
          {
            "question": "How much does a pre-shipment car inspection cost?",
            "answer": "Request a quote for the location, vehicle count, access, tests, report language and any re-inspection. Compare those scopes before comparing fees. Battery diagnostics, a lift inspection and a road test should be named if they are needed."
          }
        ],
        "links": [
          {
            "label": "Verify the seller, VIN and mileage records",
            "href": "/export-services/buying-guide/verify-chinese-used-car-before-payment/"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Verify a used car before payment",
        "href": "/export-services/buying-guide/verify-chinese-used-car-before-payment/"
      },
      {
        "label": "Read a used EV battery report",
        "href": "/export-services/buying-guide/used-ev-battery-report/"
      },
      {
        "label": "Sourcing and inspection services",
        "href": "/export-services/sourcing-inspection/"
      },
      {
        "label": "Browse used car references",
        "href": "/used-cars/"
      }
    ]
  },
  "container-vs-roro-car-shipping": {
    "title": "RoRo vs Container Car Shipping from China",
    "description": "Compare RoRo and container car shipping by route, vehicle condition, loading plan, EV acceptance, booking cutoffs and the costs due at arrival.",
    "answer": "Choose between actual bookable services for the same route and endpoint. Compare vehicle acceptance, sailing options, loading and securing, destination handling and total cost. RoRo and container requirements vary by carrier and vehicle condition; obtain acceptance before treating a freight estimate as a confirmed shipment.",
    "image": "ports",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "ctu",
        "label": "IMO, ILO and UNECE Code of Practice for Packing of Cargo Transport Units",
        "href": "https://www.imo.org/en/ourwork/safety/pages/ctu-code.aspx"
      },
      {
        "id": "css",
        "label": "IMO Code of Safe Practice for Cargo Stowage and Securing",
        "href": "https://www.imo.org/en/ourwork/safety/pages/css-code.aspx"
      }
    ],
    "sections": [
      {
        "heading": "Compare the two services on the same basis",
        "table": {
          "caption": "Vehicle shipment planning comparison",
          "headers": [
            "Question",
            "RoRo",
            "Container"
          ],
          "rows": [
            [
              "Can the carrier take these cars?",
              "Confirm running condition, dimensions, EV or hybrid rules and any battery or damage restrictions.",
              "Confirm loading fit, condition and powertrain acceptance, plus the loading and securing plan."
            ],
            [
              "Where do you hand them over?",
              "Ask for the vehicle receiving terminal, cutoff and condition record.",
              "Ask who collects the cars, where they are packed and who provides the packing record."
            ],
            [
              "What is included in the rate?",
              "Get terminal, document, transfer and vehicle release charges.",
              "Get equipment, packing, securing, terminal and unpacking charges."
            ],
            [
              "What does the policy cover?",
              "Compare insured value, deductible, loading or unloading cover, and any exclusions.",
              "Check the same points, and check cover for the agreed packing and transport route."
            ],
            [
              "Who collects and when?",
              "Confirm collection authority, deadline and storage terms.",
              "Confirm release, free time, unpacking and empty equipment return responsibilities."
            ]
          ]
        },
        "sources": [
          "ctu",
          "css"
        ]
      },
      {
        "heading": "Give each forwarder the same booking brief",
        "items": [
          "Send the quantity, dimensions, weight, condition and powertrain for each vehicle. Disclose known battery damage, missing keys or non-running units.",
          "Ask for named ports, transshipment stops, booking validity and which charges can change.",
          "Ask whether a route carries your exact vehicle type and what the carrier needs on the booking date. A quote alone does not reserve space."
        ]
      },
      {
        "heading": "Keep a condition record for both options",
        "paragraphs": [
          "Keep dated departure photographs with the vehicle list and bill of lading or other transport reference. For a container, the loading plan should identify the assigned cars and vehicle lashing arrangements. Obtain the packing and securing records that the receiving team will need for unloading and comparison.",
          "Price terminal handling charges, packing or unpacking, and any port storage outside the freight offer. Review the cargo insurance for the same handover points and route. Electric vehicle shipping also needs the carrier's current instructions for the car's battery status and condition; a quotation alone does not establish acceptance."
        ],
        "sources": [
          "ctu",
          "css"
        ]
      },
      {
        "heading": "How many cars fit in a container?",
        "paragraphs": [
          "Ask the loading provider for a plan using the actual length, width, height, weight and ground clearance of each model. Include the proposed container, securing equipment, access for loading and unloading, and any restrictions on stacking or racking. Do not price an order around a generic cars-per-container claim.",
          "For a mix of SUVs, sedans or vans, confirm which VINs are assigned to each load. Ask for the loading photographs and the agreed securing record. The receiving party also needs an unloading plan and responsibility for returning the empty equipment."
        ],
        "sources": [
          "ctu"
        ]
      },
      {
        "heading": "Shipping electric cars and non-running vehicles",
        "paragraphs": [
          "Get written carrier acceptance for the precise powertrain and condition before committing to a route. Supply the battery and damage information requested at booking. Ask about the required state of charge, keys, isolation or other preparation instructions for that service; do not transfer a rule from another carrier or sailing.",
          "A car that cannot be driven may need a different handling arrangement or may be refused by the proposed service. Disclose the condition when asking for a rate. Record any extra handling price and the acceptance decision, rather than assuming that a container or RoRo booking covers it."
        ]
      },
      {
        "heading": "Move from a freight estimate to a confirmed booking",
        "items": [
          "Send the forwarder the exact dimensions, weight, running condition, ground clearance and powertrain. Identify any battery damage, faults or modifications rather than describing every unit simply as a car.",
          "Obtain the carrier’s acceptance for the specific condition and route, plus the documents and preparation it requires. Where battery test information is requested, confirm exactly which evidence applies. Do not apply one carrier’s battery charge limit to every EV shipment.",
          "Confirm the booking reference, receiving location, vehicle and document cutoffs, planned vessel and who reports a rollover or route change. A planned departure is not a guaranteed arrival date.",
          "For containers, have the competent loading provider approve the measured layout, access, securing points and equipment. The CTU and CSS guidance addresses safe packing and securing; it does not establish that a particular number of cars fits your container."
        ],
        "sources": [
          "ctu",
          "css"
        ]
      },
      {
        "heading": "Price the delay and receiving work before choosing",
        "paragraphs": [
          "Ask the quotation owner to identify origin storage, destination terminal storage, container detention or other time-related charges, their charging triggers and any free period. Terminology and tariffs differ, so request the applicable schedule rather than relying on a label alone.",
          "Allocate the cost of late documents, a missed receiving cutoff, an unaccepted vehicle and delayed customs release in the order and transport brief. For container delivery, confirm unloading equipment, safe access and empty-return arrangements. For RoRo, confirm collection authority, release conditions and the local movement from the terminal.",
          "Keep the departure condition photos, keys and accessory inventory with the booking. They help the receiving team distinguish a recorded pre-existing mark from a discrepancy requiring investigation at arrival."
        ],
        "links": [
          {
            "label": "Prepare the receiving and condition record",
            "href": "/export-services/buying-guide/vehicle-arrival-checklist/"
          },
          {
            "label": "Compare both routes to the same landed-cost endpoint",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Questions about RoRo and container car shipping",
        "questions": [
          {
            "question": "Which option is cheaper for cars from China?",
            "answer": "Compare complete quotes for the same vehicle list, handover points and dates. RoRo and container offers can include different terminal, packing, securing and unpacking costs. Use the landed-cost worksheet after filling those gaps."
          },
          {
            "question": "How long will car shipping from China take?",
            "answer": "Ask for the proposed sailing, cutoffs, any transshipment and estimated arrival. Add preparation, inspection, release and collection time separately. Confirm which dates are bookings and which are estimates, and what happens if a sailing changes."
          },
          {
            "question": "Can spare parts travel inside the car?",
            "answer": "Ask the carrier and customs broker before including any items. Record the permitted inventory, packing and declaration requirements. Do not place unlisted goods in a car and assume the vehicle booking covers them."
          }
        ],
        "links": [
          {
            "label": "Build the full shipping budget",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          },
          {
            "label": "Prepare for vehicle arrival",
            "href": "/export-services/buying-guide/vehicle-arrival-checklist/"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Shipping and delivery services",
        "href": "/export-services/shipping-support/"
      },
      {
        "label": "Check import and shipping documents",
        "href": "/export-services/buying-guide/car-import-documents-checklist/"
      },
      {
        "label": "Compare FOB and CIF",
        "href": "/export-services/buying-guide/exw-fob-cif-car-shipping/"
      },
      {
        "label": "Jetour Traveler: transport and configuration checks",
        "href": "/new-cars/jetour/traveler/"
      }
    ]
  },
  "car-import-documents-checklist": {
    "title": "Car Import Documents Checklist: China Export to Arrival",
    "description": "Prepare car import documents with a VIN register, invoice and bill of lading checks, export records, originals, release status and registration evidence.",
    "answer": "Build one vehicle register and check every invoice, transport and approval document against it. Assign an issuer, reviewer and due date, then track whether each item is a draft, issued copy, original or accepted release. The China export file, destination customs file and road-registration file have different purposes.",
    "image": "documents",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "used-export",
        "label": "China MOFCOM and four departments, Announcement No. 6 of 2024 on used vehicle exports",
        "href": "https://www.mofcom.gov.cn/zfxxgk/gkml/art/2024/art_79f6d1fc5871472ea2ddae704b1173b2.html"
      },
      {
        "id": "recent-registration",
        "label": "China MOFCOM and three departments, additional used vehicle export requirements",
        "href": "https://www.mofcom.gov.cn/zcfb/dwmygl/art/2025/art_543d1fcc6a1048d5bf301a8d59ed723e.html"
      },
      {
        "id": "electric-export",
        "label": "China MOFCOM and three departments, Announcement No. 54 of 2025 on battery-electric passenger car export licensing",
        "href": "https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=103794"
      },
      {
        "id": "export-documents",
        "label": "International Trade Administration, common export documents and their purposes",
        "href": "https://www.trade.gov/common-export-documents"
      }
    ],
    "sections": [
      {
        "heading": "Assign each document to a person and date",
        "table": {
          "caption": "Common documents to confirm with the seller, forwarder and broker",
          "headers": [
            "Record",
            "Usually prepared or checked by",
            "What the buyer should match"
          ],
          "rows": [
            [
              "Written offer and order",
              "Seller and buyer",
              "Seller identity, exact version, quantity, currency, Incoterms rule and named place."
            ],
            [
              "Commercial invoice and vehicle or packing list",
              "Seller or exporter",
              "Consignee, vehicle identifiers, quantity, description and contract references."
            ],
            [
              "Used vehicle registration and inspection file",
              "Exporter and inspection provider",
              "VIN, registration and applicable export inspection records."
            ],
            [
              "Export licence and customs declaration where required",
              "Exporter or its broker",
              "Exporting entity, vehicle category, declaration details and approval status."
            ],
            [
              "Bill of lading or sea waybill",
              "Carrier or forwarder",
              "Consignee, ports, booking references and release method."
            ],
            [
              "Origin or insurance evidence where needed",
              "Exporter, issuer or insurer",
              "Eligibility or policy scope, named parties, route and units covered."
            ],
            [
              "Import and registration file",
              "Importer and destination broker",
              "Local permits, taxes, conformity and registration evidence for the exact version."
            ]
          ]
        },
        "sources": [
          "used-export",
          "electric-export"
        ]
      },
      {
        "heading": "Check the Chinese export route early",
        "paragraphs": [
          "Ask who is the exporter of record and which licence and inspection requirements apply. China’s published measures include used car licensing and third-party inspection requirements. For used vehicles applying for export within 180 days of registration, including day 180, the current notice calls for a manufacturer-issued after-sales maintenance service confirmation. China also applies export licensing to pure-electric passenger cars covered by Announcement No. 54.",
          "Send the draft commercial and transport documents to the importer before issue. Agree where originals or authenticated copies are required and who handles corrections."
        ],
        "sources": [
          "used-export",
          "recent-registration",
          "electric-export"
        ]
      },
      {
        "heading": "Control the file from one VIN register",
        "paragraphs": [
          "Give every car a row containing the VIN, exact model and version, model year, first registration where applicable, powertrain, quantity, seller and consignee. Add document numbers and any approved alternative. For a new-car order without allocated VINs, mark allocation pending and set the point at which the final list must be accepted.",
          "Check spelling and legal-entity names as carefully as the vehicle data. An invoice addressed to one importer, transport release to another and approval held by a third can require more than a typographical correction. Ask the responsible issuer and receiving broker to resolve the discrepancy before the next cutoff."
        ],
        "table": {
          "caption": "Document status to keep in the shared register",
          "headers": [
            "Status",
            "What it means for the buyer"
          ],
          "rows": [
            [
              "Draft",
              "Review vehicle and party details; it is not proof that the final document has been issued."
            ],
            [
              "Issued copy",
              "Record number, date and issuer; confirm whether this copy is sufficient for the next procedure."
            ],
            [
              "Original or authenticated version required",
              "Name the recipient, delivery method and due date; allow for translation or authentication where the receiving authority requires it."
            ],
            [
              "Release or acceptance confirmed",
              "Save the issuer, carrier or broker’s confirmation, including any remaining conditions."
            ]
          ]
        },
        "links": [
          {
            "label": "Hand the accepted file to the receiving team",
            "href": "/export-services/buying-guide/vehicle-arrival-checklist/"
          }
        ]
      },
      {
        "heading": "Commercial invoice, vehicle list and bill of lading",
        "paragraphs": [
          "The commercial invoice records the sale, while the packing list or vehicle list identifies what is shipped. The bill of lading or sea waybill records the transport arrangement. Reconcile the legal party names, quantities, ports and vehicle identification number for each unit before approving the drafts. Keep consignee details consistent with the release arrangement.",
          "A certificate of origin supports an origin claim where that evidence is required. It serves a different purpose from ownership documents, an export declaration or an import declaration. The exporter and destination broker should identify the issuer and accepted form of each record needed for this transaction.",
          "If a car is replaced, update its order, inspection and shipment records together. Customs clearance and road registration can call for different technical evidence. Where a certificate of conformity is requested, establish exactly which document and vehicle version the authority will accept; an EU certificate is not a standard inclusion with every China-market car."
        ],
        "sources": [
          "export-documents"
        ],
        "links": [
          {
            "label": "Receiving checks after shipment",
            "href": "/export-services/buying-guide/vehicle-arrival-checklist/"
          }
        ]
      },
      {
        "heading": "Is an export certificate enough to register the car?",
        "paragraphs": [
          "Ask the seller to name the document it calls an “export certificate,” its issuer and the purpose it serves. A translated label may refer to registration, a licence, inspection or another record. Match it to the requirement identified by the destination authority or broker.",
          "Customs clearance and road registration can require different evidence. Obtain the destination checklist for the exact version and importer before paying for the car. If conformity or technical approval evidence is required, ask who can issue it and whether the quoted vehicle is covered. Do not assume every car has an EU Certificate of Conformity."
        ],
        "links": [
          {
            "label": "Check import and registration eligibility",
            "href": "/export-services/buying-guide/check-car-import-eligibility/"
          }
        ]
      },
      {
        "heading": "Check transport release separately from a document scan",
        "paragraphs": [
          "Agree the bill of lading arrangement with the carrier or authorized agent. Where negotiable originals are used, establish how they will be controlled and surrendered; where a sea waybill or an authorized electronic release is used, confirm the applicable process. A PDF emailed by the seller is not, by itself, confirmation that the carrier has authorized delivery.",
          "Review drafts before the carrier’s amendment cutoff. If a VIN, consignee or quantity changes, update all affected records and ask who bears amendment fees or delay costs. Do not alter an issued certificate yourself. Save the replacement or correction from its issuer and tell every party using the earlier version."
        ],
        "sources": [
          "export-documents"
        ]
      },
      {
        "heading": "Questions about car import documents",
        "questions": [
          {
            "question": "Do I need originals or are scans enough?",
            "answer": "Have the broker, carrier and any payment provider confirm their requirements for each document. Record the accepted format, delivery method and deadline before shipment. A scan that helps check a draft may not satisfy the final release procedure."
          },
          {
            "question": "Who corrects a wrong VIN or consignee name?",
            "answer": "Contact the issuer through the seller or forwarder and follow its amendment procedure. Tell the broker which related documents contain the same detail. Keep the corrected approved set together and confirm the effect on release before arrival."
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Look up destination requirements",
        "href": "/export-services/buying-guide/#country-guides"
      },
      {
        "label": "Follow the order-to-arrival timeline",
        "href": "/export-services/buying-guide/how-to-buy-cars-from-china/"
      },
      {
        "label": "Shipping and delivery services",
        "href": "/export-services/shipping-support/"
      }
    ]
  },
  "verify-chinese-used-car-before-payment": {
    "title": "Buying Used Cars from China: VIN, Mileage and Seller Checks",
    "description": "Verify a used car before paying: VIN and mileage evidence, ownership, seller and exporter identities, registration age and independently checked bank details.",
    "answer": "Verify the same VIN through the offer, registration and ownership evidence, inspection and proposed export documents. Separately identify the legal seller, exporter and bank beneficiary. Resolve unexplained differences before payment; a VIN lookup, video call or business licence alone does not establish the complete transaction.",
    "image": "inspection",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "used-export",
        "label": "China MOFCOM and four departments, Announcement No. 6 of 2024 on used vehicle exports",
        "href": "https://www.mofcom.gov.cn/zfxxgk/gkml/art/2024/art_79f6d1fc5871472ea2ddae704b1173b2.html"
      },
      {
        "id": "recent-registration",
        "label": "China MOFCOM and three departments, additional used vehicle export requirements",
        "href": "https://www.mofcom.gov.cn/zcfb/dwmygl/art/2025/art_543d1fcc6a1048d5bf301a8d59ed723e.html"
      },
      {
        "id": "payment-verification",
        "label": "FBI IC3, verifying changes to payment account information",
        "href": "https://www.ic3.gov/CrimeInfo/BEC"
      }
    ],
    "sections": [
      {
        "heading": "Verify the exact car on offer",
        "paragraphs": [
          "Ask for a dated vehicle file with a VIN photo at the car, registration details, an odometer reading and condition photos. Ask the seller to confirm whether the quoted car remains available and whether they may substitute another unit. If a car changes, repeat the identity and inspection checks on the new VIN.",
          "Use records lawfully available to the seller and inspector. A matching VIN establishes which car the records refer to. Condition, mileage history and authority to sell still require their own evidence."
        ]
      },
      {
        "heading": "Check the seller and the export route",
        "table": {
          "caption": "Payment verification checklist",
          "headers": [
            "Check",
            "Ask for",
            "When to pause"
          ],
          "rows": [
            [
              "Seller identity",
              "The legal entity on the offer and its business registration details.",
              "Company details change or the offer comes from a different entity without explanation."
            ],
            [
              "Authority over the car",
              "Registration or ownership evidence, or documented authority to sell.",
              "The seller cannot link the VIN and the legal owner to the offer."
            ],
            [
              "Exporter of record",
              "The exporting entity and the applicable licence or export file.",
              "The exporter cannot explain how it will obtain the relevant records."
            ],
            [
              "Bank beneficiary",
              "Payee information in the signed order. Confirm using an established contact.",
              "New instructions arrive through a different email, number or beneficiary."
            ],
            [
              "Payment milestone",
              "The evidence due before each instalment and cancellation terms.",
              "The requested payment falls outside the signed terms."
            ]
          ]
        },
        "sources": [
          "used-export",
          "recent-registration"
        ]
      },
      {
        "heading": "Connect the seller, owner, exporter and payee",
        "paragraphs": [
          "China’s used-vehicle export framework links the export application to vehicle and transaction records, including third-party inspection and contractual after-sales content. Ask the named exporter which records it will provide for the proposed car. A company registration check does not replace those vehicle-specific requirements."
        ],
        "table": {
          "caption": "Evidence chain for the proposed used-car purchase",
          "headers": [
            "Party or record",
            "Connection to establish"
          ],
          "rows": [
            [
              "Contract seller",
              "Legal name, registration details, contract authority and a reliable business contact. A trading name should be traceable to the legal entity."
            ],
            [
              "Registered owner and vehicle",
              "Ownership or transfer records linked to the VIN; explain how the seller is entitled to dispose of the unit."
            ],
            [
              "Named exporter",
              "Identity, applicable export qualification and responsibility for the vehicle’s export licence and paperwork. Establish any separate service arrangement."
            ],
            [
              "Bank beneficiary",
              "Match the approved contract instructions. If another entity collects payment, obtain the documented basis and independently verify it before the transfer."
            ]
          ]
        },
        "sources": [
          "used-export",
          "payment-verification"
        ]
      },
      {
        "heading": "Resolve recently registered cars before payment",
        "paragraphs": [
          "Ask the exporter for the registration date and planned export application date. For a used export application within 180 days of registration, including day 180, China’s current notice requires an additional confirmation from the vehicle manufacturer covering destination after-sales service. Check who will provide it before treating the order as ready for export."
        ],
        "sources": [
          "recent-registration"
        ]
      },
      {
        "heading": "What a VIN check can tell you",
        "paragraphs": [
          "For a used car VIN check, start with a readable photograph of the identifier on the actual vehicle and compare it with the registration, inspection and written offer. Ask the seller to explain any inconsistency before using a model name or a decoder result as confirmation.",
          "A VIN decoder describes encoded identity information. It does not, by itself, confirm ownership, current condition, accident history or mileage. Ask which history records are available for that specific car, who supplied them and the date range they cover. An empty history result is an evidence gap, not proof that nothing happened."
        ]
      },
      {
        "heading": "Build a mileage and condition timeline",
        "paragraphs": [
          "A vehicle history report is useful only within the records and dates it covers. Put available service, registration, inspection and repair entries in order, keeping originals with any translation. Compare successive odometer readings with a current photograph. An inconsistency can justify further inquiry into odometer fraud. Keep unexplained gaps on the exception list until the records and inspection provide an explanation.",
          "Review previous damage against an independent inspection and the seller's written description. The file should identify what evidence supports accident, flood or mileage claims and what remains unavailable. Ownership documents and the seller's business registration establish different parts of the transaction; retain both.",
          "Confirm which export license and related vehicle records the named exporter will obtain under the actual export route. Bank account verification remains a separate finance check, especially if the beneficiary changes. Agree the next step for each unresolved item before money is due."
        ],
        "links": [
          {
            "label": "Use the physical inspection checklist",
            "href": "/export-services/buying-guide/inspect-a-used-car-from-china/"
          }
        ]
      },
      {
        "heading": "Verify bank instructions outside the payment message",
        "paragraphs": [
          "Before the first transfer, reconcile the legal seller, contract reference and beneficiary. If instructions change, call an established contact using a number already held in your records. Ask that person to confirm the change and document the relationship if the payee differs from the seller. IC3 recommends verifying account changes through a separate channel."
        ],
        "sources": [
          "payment-verification"
        ]
      },
      {
        "heading": "Resolve a discrepancy without losing the earlier evidence",
        "paragraphs": [
          "A later odometer reading higher than an earlier one may reflect vehicle movement; request dates, units and the reason for the increase. A lower later reading, unexplained VIN difference or missing ownership link needs investigation. Retain both records instead of accepting a replacement image that removes the contradiction.",
          "Use three outcomes: accept an evidenced explanation and record it; require a specified document or independent check before proceeding; or decline the proposed unit. If the seller substitutes another car, repeat identity, condition and eligibility checks for its VIN rather than copying approval from the first car.",
          "For a unit registered 180 days or less before the relevant export application, establish the manufacturer-issued after-sales confirmation required under the notice effective 1 January 2026. This is an additional export-document condition, not proof that a nearly unused car qualifies as new in the destination market."
        ],
        "sources": [
          "recent-registration"
        ],
        "links": [
          {
            "label": "Define the independent inspection",
            "href": "/export-services/buying-guide/inspect-a-used-car-from-china/"
          },
          {
            "label": "Record payment and substitution conditions",
            "href": "/export-services/buying-guide/car-order-payment-and-changes/"
          }
        ]
      },
      {
        "heading": "Questions about buying used cars from China",
        "questions": [
          {
            "question": "Is a zero-mileage used car the same as a new car?",
            "answer": "Ask for the registration history and export route. The description refers to mileage; it does not settle the legal status or destination eligibility. Check the current recently registered vehicle requirements with the exporter and compare the car’s support terms with a new-car offer."
          },
          {
            "question": "What if the quoted car is sold before I pay?",
            "answer": "Have the seller identify the replacement and issue a revised offer. Repeat the VIN, record and inspection checks for that unit. Approval of the original car should not automatically apply to a substitute."
          }
        ],
        "links": [
          {
            "label": "Compare new and used import orders",
            "href": "/export-services/buying-guide/new-vs-used-cars/"
          },
          {
            "label": "Agree payment milestones",
            "href": "/export-services/buying-guide/car-order-payment-and-changes/"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Get the pre-shipment inspection checklist",
        "href": "/export-services/buying-guide/inspect-a-used-car-from-china/"
      },
      {
        "label": "Review order and payment milestones",
        "href": "/export-services/buying-guide/car-order-payment-and-changes/"
      },
      {
        "label": "Browse used car references",
        "href": "/used-cars/"
      },
      {
        "label": "Review the used BYD Seagull record",
        "href": "/used-cars/byd/seagull/"
      }
    ]
  },
  "used-ev-battery-report": {
    "title": "Used EV Battery Health Check: How to Read the Report",
    "description": "Read a used EV battery report: SOH vs SOC, usable capacity, test conditions, pack identity, charging results and a worked interpretation example.",
    "answer": "Read a used EV battery-health percentage only after identifying its method and reference. Match the report to the VIN and installed pack, then review usable capacity, faults, temperature and completed charging tests. A high charge level or dashboard range does not establish retained battery capacity, future life or warranty eligibility.",
    "image": "battery",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "unece",
        "label": "UNECE, UN GTR No. 22 on in-vehicle battery durability for electrified vehicles",
        "href": "https://unece.org/transport/documents/2022/04/standards/un-gtr-no22-vehicle-battery-durability-electrified-vehicles"
      },
      {
        "id": "battery-metrics",
        "label": "Analog Devices, SOC and SOH estimation methods and their limitations",
        "href": "https://www.analog.com/en/resources/technical-articles/a-closer-look-at-state-of-charge-and-state-health-estimation-tech.html"
      },
      {
        "id": "energy-metric",
        "label": "US Department of Energy / EU, 2023 recommendations on EV charging and certified battery energy",
        "href": "https://www.energy.gov/sites/default/files/2023-05/TTC4_WG2_Joint-Recommendations-EV-Charging-Infrastructure_vFINAL-2.pdf"
      }
    ],
    "sections": [
      {
        "heading": "What a battery report should tell you",
        "table": {
          "caption": "Questions to ask when reviewing a used EV battery report",
          "headers": [
            "Field",
            "What to verify"
          ],
          "rows": [
            [
              "Vehicle and pack",
              "VIN, odometer, test date, pack identifier if available, and any pack repair or replacement."
            ],
            [
              "SOH or capacity",
              "Name of the metric, baseline, data source and method. Identify a diagnostic estimate or a measured capacity test."
            ],
            [
              "Test conditions",
              "State of charge, relevant temperature, equipment and any limits on the check."
            ],
            [
              "Warnings or damage",
              "Diagnostic fault findings, visible underside or enclosure damage and areas outside the inspection."
            ],
            [
              "Charging",
              "AC and DC tests if agreed and available. Record the charger used and what actually completed."
            ]
          ]
        },
        "sources": [
          "unece"
        ]
      },
      {
        "heading": "Compare like with like",
        "paragraphs": [
          "A state-of-health value is easier to interpret when you know its reference and method. Dashboard remaining range can change with use and conditions. Compare two used EVs using consistent diagnostics or ask the inspector to explain how different methods affect the comparison.",
          "If a pack has been replaced, ask for the available service record and check that the report applies to the installed pack. For unresolved warnings, physical damage or a missing test, ask the provider what it can verify before you accept the unit."
        ]
      },
      {
        "heading": "Read a capacity result with its reference attached",
        "paragraphs": [
          "Hypothetical example: a qualified provider measures 55.2 kWh of usable energy and compares it with a 60.0 kWh usable-energy reference for the same pack and compatible test conditions. The ratio is 55.2 ÷ 60.0 × 100 = 92%. This explains that particular energy comparison; it does not establish 92% of the advertised driving range or a remaining service life.",
          "Ask where both numbers came from. A gross nameplate capacity, a usable-energy reference and an estimate reported by the battery-management system may differ in scope. A report labelled “92% SOH” without a baseline cannot be reconstructed from a dashboard photo.",
          "The government-hosted technical recommendations discuss a harmonized certified-energy metric under UN GTR No. 22. That context helps explain the importance of definitions. An individual seller’s diagnostic printout should still identify its own method and scope; a regulatory reference does not make it an independent certification of that used car."
        ],
        "sources": [
          "battery-metrics",
          "energy-metric",
          "unece"
        ]
      },
      {
        "heading": "Separate battery condition from local charging",
        "items": [
          "A successful test on one charger confirms operation in that test setup. Check the actual vehicle inlet against the chargers at your destination.",
          "Ask the carrier what it accepts for the vehicle’s condition and battery status before booking.",
          "Save the report and charging result by VIN alongside the other inspection evidence."
        ]
      },
      {
        "heading": "State of charge, battery health and range are different readings",
        "paragraphs": [
          "State of charge describes how much charge is available now. A battery state-of-health figure describes condition against a reference chosen by the reporting method. A nearly full charge does not establish that the battery retains nearly all its original usable capacity.",
          "Ask whether the EV battery health check reports usable energy, another capacity measure or a diagnostic estimate. Request the baseline and units. If two reports use different definitions, have the testing provider explain whether the figures can be compared before ranking the cars by percentage.",
          "Use dashboard remaining range as an observation recorded under its conditions. For your purchasing decision, separately request the evidence for battery condition and the operating range you need. A manufacturer’s range figure and the range displayed after a recent drive answer different questions."
        ],
        "sources": [
          "battery-metrics"
        ]
      },
      {
        "sources": [
          "battery-metrics"
        ],
        "heading": "Agree the next test before accepting an unexplained result",
        "paragraphs": [
          "A battery diagnostic report should identify the installed pack and explain the measurements it provides. Where the method reports battery cycle count, battery temperature or cell voltage imbalance, retain the units and test conditions. The provider should explain which limits apply to that pack and method. Leave unavailable fields marked unavailable; a single diagnostic value does not predict remaining life.",
          "To investigate battery degradation, compare usable battery capacity only against a stated reference and a compatible method. If a result is unexplained, the qualified testing provider should specify the next suitable check. A dashboard photograph and a measured capacity test have different scopes; obtain comparable evidence before choosing between cars.",
          "Record the outcome of DC fast charging separately from the health estimate, including the charger and any limits observed. Battery warranty eligibility comes from the provider's written terms for that VIN and market. Keep the report, charging result and warranty response together when approving the purchase."
        ],
        "links": [
          {
            "label": "Agree the wider vehicle inspection",
            "href": "/export-services/buying-guide/inspect-a-used-car-from-china/"
          }
        ]
      },
      {
        "heading": "Choose the next check from the missing evidence",
        "table": {
          "caption": "How to make two battery reports comparable",
          "headers": [
            "What differs or is missing",
            "Useful next action"
          ],
          "rows": [
            [
              "Different reporting tools or metric names",
              "Ask each provider for the metric definition and baseline; obtain a compatible method before ranking percentages."
            ],
            [
              "Unknown test temperature, SOC or date",
              "Request the original test record and its conditions; record the limitation if it cannot be recovered."
            ],
            [
              "Pack replacement or software change",
              "Match the installed pack and available service history to a new report; explain which earlier results remain relevant."
            ],
            [
              "Fault, enclosure damage or unexplained cell readings",
              "Have a qualified EV technician specify a safe further assessment. A buyer should not open or probe the high-voltage pack."
            ],
            [
              "Only a successful fast-charge session",
              "Keep the charger, time, starting/ending SOC and any restrictions as an operation record; request separate capacity evidence if that is needed for acceptance."
            ]
          ]
        },
        "links": [
          {
            "label": "Check the separate battery-warranty terms",
            "href": "/export-services/buying-guide/car-warranty-and-after-sales/"
          }
        ]
      },
      {
        "heading": "Questions about used EV battery health",
        "questions": [
          {
            "question": "What battery SOH percentage is good enough to buy?",
            "answer": "Set an acceptance requirement for your intended use and the agreed test method. Consider the result alongside faults, damage, repair history, charging operation and support. A single percentage is not a universal pass mark or a prediction of remaining life."
          },
          {
            "question": "Does a battery health report prove that a warranty applies?",
            "answer": "No. Ask the warranty provider to confirm coverage for the VIN, market, ownership, use and maintenance history. The report describes evidence about condition; warranty eligibility and any capacity threshold come from the applicable written terms."
          },
          {
            "question": "Can a healthy used EV charge at my destination?",
            "answer": "Check its actual AC and DC inlets against the equipment you intend to use. Battery condition and charging compatibility are separate purchasing checks. Save the verified charger pairing with the vehicle file."
          }
        ],
        "links": [
          {
            "label": "Check GB/T, CCS2 and adapters",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          },
          {
            "label": "Confirm imported car warranty terms",
            "href": "/export-services/buying-guide/car-warranty-and-after-sales/"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Check GB/T and CCS2 compatibility",
        "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
      },
      {
        "label": "Get the used car inspection checklist",
        "href": "/export-services/buying-guide/inspect-a-used-car-from-china/"
      },
      {
        "label": "Review carrier options",
        "href": "/export-services/buying-guide/container-vs-roro-car-shipping/"
      },
      {
        "label": "Used BYD Seagull: supplied record and battery checks",
        "href": "/used-cars/byd/seagull/"
      }
    ]
  },
  "request-wholesale-car-quote": {
    "title": "Wholesale Cars from China: RFQ and Quote Request Template",
    "description": "Copy a wholesale car RFQ template with exact trims, quantity, mandatory equipment, acceptable alternatives, destination, stock evidence and quote validity.",
    "answer": "Send one version-specific brief with quantities, destination, required equipment, new or used status and the named delivery point. Separate mandatory requirements from acceptable alternatives. Ask the supplier to identify available units, items still being sourced, quote validity and every cost or approval left for you to arrange.",
    "image": "quote",
    "reviewed": "2026-11-16",
    "sections": [
      {
        "heading": "Copy this RFQ template",
        "template": "Subject: Vehicle quote request for [destination country]\n\nModel and exact trim: [model, year, version, powertrain]\nQuantity by model: [units]\nVehicle type: [new or used]\nAcceptable alternatives: [versions, colors, equipment]\nUsed car limits: [first registration, mileage, condition]\nDestination: [country, port or border, onward delivery if needed]\nQuote basis: [Incoterms® 2020 rule and named place]\nRequested handover: [target window, must-have documents]\nInspection: [VIN evidence and checks required]\n\nPlease confirm the seller, available quantity or sourcing status,\nprice per unit, currency, quote validity, charges included and\nexcluded, payment milestones, estimated handover and support scope."
      },
      {
        "heading": "Separate fixed requirements from acceptable alternatives",
        "paragraphs": [
          "State what would make a car unusable for the order: an unaccepted import route, the wrong steering position, a missing safety feature, unsuitable charging equipment or a different seating layout. Put these requirements ahead of preferences such as paint colour. For used units, set the required condition evidence as well as age and mileage limits.",
          "Illustrative brief: “Three five-seat hybrid sedans in the specified trim and one gasoline four-wheel-drive SUV; left-hand drive required; two listed exterior colours acceptable; no drivetrain substitution; quote to the same named port.” This is a sample request, not a KEEYAK stock or minimum-order claim. The actual versions and quantities belong in your completed RFQ.",
          "If the receiving broker has not checked the exact version, identify the review as pending and state which documents the supplier must return. A request for price can proceed alongside that review, but it should not be mistaken for approval to ship."
        ],
        "links": [
          {
            "label": "Prepare the version file for destination review",
            "href": "/export-services/buying-guide/check-car-import-eligibility/"
          }
        ]
      },
      {
        "heading": "Ask for a usable supplier response",
        "table": {
          "caption": "What to look for in a wholesale offer",
          "headers": [
            "Line",
            "Response to request"
          ],
          "rows": [
            [
              "Vehicle and quantity",
              "Exact trim, model year, equipment and quantity by version. Ask which details remain subject to confirmation."
            ],
            [
              "Delivery basis",
              "Named place, included services, freight or insurance where applicable, and destination costs left to the buyer."
            ],
            [
              "Used vehicle evidence",
              "VIN-linked photos, first registration, mileage and agreed inspection evidence for each proposed unit."
            ],
            [
              "Schedule and payment",
              "Offer expiry, estimated handover, payee and the evidence due before each payment."
            ]
          ]
        },
        "paragraphs": [
          "Request an evidence status beside each response: allocated VIN and location; proposed unit awaiting inspection; or model being sourced with no unit allocated. Ask who can confirm the current position and when it will next be checked. A catalogue image or general model price does not establish a reserved unit."
        ]
      },
      {
        "heading": "Compare the same order before choosing",
        "paragraphs": [
          "If one quote allows a substitution and the other names an exact trim, price them after agreeing an acceptable version. When a supplier quotes a cheaper port or route, ask for the cost to the original handover point before comparing the totals."
        ]
      },
      {
        "heading": "Describe the batch a supplier can actually quote",
        "paragraphs": [
          "When requesting wholesale cars from China, split the required quantity by exact model and version. State which colors, equipment and alternatives you will accept. Give each supplier the same destination and target handover window. If the quantity is provisional, say what your first order needs and what is only a later possibility.",
          "Ask the China car exporter to identify the contracting seller, exporter of record and the role it will perform. Request a response that distinguishes units currently identified from cars still to be sourced. A showroom photograph or catalog entry does not establish stock for the quantity you need.",
          "For used cars, provide limits for registration age, mileage and condition. Ask for a proposed VIN list and records for each unit. For EVs, include charging compatibility and the battery evidence required; “electric” by itself is not a complete purchasing specification."
        ],
        "links": [
          {
            "label": "Choose between new and used cars",
            "href": "/export-services/buying-guide/new-vs-used-cars/"
          }
        ]
      },
      {
        "heading": "Put the destination and delivery point in the first request",
        "paragraphs": [
          "Name the importer and intended use, then include the destination port and any inland delivery. Set the inspection requirements and payment terms you want suppliers to respond to. A target price should state the currency and whether it covers the vehicle only or the full destination cost.",
          "For EXW, FOB and CIF alternatives, request separate prices with their named places and quote validity. Keep the vehicle specification unchanged between options. Establish the minimum order quantity for that particular version and availability; a batch price does not automatically apply to one car."
        ],
        "sources": [
          "icc"
        ],
        "links": [
          {
            "label": "Compare car export quotations",
            "href": "/export-services/buying-guide/compare-car-export-quotes/"
          },
          {
            "label": "Choose an Incoterms quotation basis",
            "href": "/export-services/buying-guide/exw-fob-cif-car-shipping/"
          }
        ]
      },
      {
        "heading": "Make the next supplier reply easy to evaluate",
        "items": [
          "Return a line for each requested trim and quantity, including any shortage or proposed alternative. Keep the original requirement beside the deviation.",
          "State unit price, currency, validity, named Incoterm endpoint and separately priced extras. Identify freight estimates that can change before booking.",
          "List the evidence available now and the evidence due before deposit, balance or release: version sheet, VIN allocation, inspection, ownership and export documents as applicable.",
          "Ask for an estimated readiness window with its dependencies, such as allocation, inspection or document review. Record it separately from a confirmed carrier booking."
        ],
        "links": [
          {
            "label": "Compare the completed supplier responses",
            "href": "/export-services/buying-guide/compare-car-export-quotes/"
          }
        ]
      },
      {
        "heading": "Questions about wholesale car quote requests",
        "questions": [
          {
            "question": "Is there a standard minimum order quantity?",
            "answer": "Request the minimum quantity and pricing basis for the particular model, availability and shipment. Do not assume that a price shown for a batch applies to one car. Separate a proposed first order from a possible future volume."
          },
          {
            "question": "Should I include a budget in the RFQ?",
            "answer": "State the currency and whether the budget is for the vehicle only or the full cost at destination. Ask the supplier to quote the requested specification and identify alternatives separately. This keeps a lower price from silently changing the car or service scope."
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Compare written export offers",
        "href": "/export-services/buying-guide/compare-car-export-quotes/"
      },
      {
        "label": "Check model specifications",
        "href": "/guides/comparisons/"
      },
      {
        "label": "Check destination requirements",
        "href": "/export-services/buying-guide/#country-guides"
      },
      {
        "label": "Toyota Corolla: compare the offered version",
        "href": "/new-cars/toyota/corolla/"
      }
    ],
    "sources": [
      {
        "id": "icc",
        "label": "ICC, Incoterms® 2020 checklist, updated 2024",
        "href": "https://library.iccwbo.org/content/clp/Others/incoterms_2020_checklist_2024-update.pdf"
      }
    ]
  },
  "chinese-ev-charging-standards": {
    "title": "Chinese EV Charging: GB/T, CCS2 and Adapter Checks",
    "description": "Check GB/T, Type 2 and CCS2 compatibility by exact EV, AC or DC mode, adapter direction, onboard-charger limits and a documented commissioning test.",
    "answer": "Match the actual vehicle inlet, charging mode and supported communication with the chargers you will use. Type 2 AC and CCS2 DC answer different questions, and a China-market version can differ from a same-name export model. Any proposed GB/T adapter needs verified direction, electrical limits and compatibility for that specific car-and-charger pairing.",
    "image": "charging",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "gb-ac",
        "label": "SAMR standard GB/T 20234.2-2015, AC charging interface",
        "href": "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=1CABFC2874B7A9C7089442BF8A90CDDA"
      },
      {
        "id": "gb-dc",
        "label": "China MIIT, publication of GB/T 20234.1-2023 and GB/T 20234.3-2023",
        "href": "https://www.miit.gov.cn/xwdt/gxdt/sjdt/art/2023/art_7b696012ab0a4d2bb506a0bc6358385b.html"
      },
      {
        "id": "ccs",
        "label": "CharIN Combined Charging System design guide",
        "href": "https://www.charin.global/media/pages/technology/ccs-specification/42a9d61e04-1626949173/design_guide_combined_charging_system_v7.pdf"
      },
      {
        "id": "charging-compatibility",
        "label": "CharIN, charging interfaces and communication compatibility",
        "href": "https://www.charin.global/faq-section/"
      }
    ],
    "sections": [
      {
        "heading": "Check the car and the charger side by side",
        "table": {
          "caption": "Charging compatibility checklist",
          "headers": [
            "Check",
            "Vehicle evidence",
            "What to confirm locally"
          ],
          "rows": [
            [
              "AC inlet",
              "Photo and manual for the actual trim, inlet standard and onboard charger limits.",
              "Plug, voltage, frequency, phases, available current and installation requirements."
            ],
            [
              "DC inlet",
              "Photo and manufacturer specification for the actual version, including supported protocol and voltage range.",
              "Connector, communication protocol, charger range, operator acceptance and service support."
            ],
            [
              "Cable or adapter",
              "Part number and written compatibility for the car and charging mode.",
              "Written confirmation from the equipment supplier or charger operator, including any restrictions."
            ],
            [
              "Commissioning",
              "Results from the agreed car and charger pairing.",
              "Who can inspect the installation, test operation and support it after delivery."
            ]
          ]
        },
        "sources": [
          "gb-ac",
          "gb-dc",
          "ccs"
        ]
      },
      {
        "heading": "Confirm the version from the actual vehicle",
        "paragraphs": [
          "Ask for separate photos of the AC and DC inlet if both are fitted. The exported version of a model may differ from a domestic version, so confirm the equipment on the quoted trim and VIN when available. Type 2 AC and CCS Combo 2 DC are separate checks even when a vehicle uses a combined inlet.",
          "A plug that fits does not establish that the car and charger will communicate. Before relying on an adapter, ask for written compatibility and a supervised test with the intended equipment. Do not plan a fleet order around an untested conversion."
        ],
        "sources": [
          "gb-ac",
          "gb-dc",
          "ccs"
        ]
      },
      {
        "heading": "Check the proposed charging pairing",
        "paragraphs": [
          "For AC charging, the supply, installed equipment, cable and vehicle onboard charger can each limit power. For example, a higher-rated wallbox does not establish that a lower-rated onboard charger can draw the wallbox’s full output. Ask for the supported phases, voltage, current and local installation assessment.",
          "The SAMR listing checked for this revision marks GB/T 20234.2-2015, the AC coupler standard, as current. MIIT’s 2023 publication covers the general and DC coupler parts. A standard number provides context; the installed inlet and vehicle documentation remain the evidence for the unit being purchased."
        ],
        "table": {
          "caption": "Evidence needed for each charging arrangement",
          "headers": [
            "Proposed use",
            "Checks before purchase"
          ],
          "rows": [
            [
              "GB/T AC vehicle at a local AC installation",
              "Identify the vehicle and equipment interfaces, supply characteristics, cable or adapter, protection requirements and onboard-charger rating. Obtain qualified installation advice."
            ],
            [
              "GB/T DC vehicle at a CCS2 public charger",
              "Identify charger-to-vehicle conversion direction, communication support, voltage/current range, operator acceptance and written compatibility for the exact equipment. A plug shape alone is insufficient."
            ],
            [
              "China-market and export-market cars with the same name",
              "Compare photos and manufacturer documents for both actual versions. Do not transfer a local model’s inlet specification to the quoted unit."
            ],
            [
              "Depot fleet with several charging sites",
              "List each charger/operator and hardware version. Test the intended pairings and define how untested combinations will be handled."
            ]
          ]
        },
        "sources": [
          "gb-ac",
          "gb-dc",
          "ccs",
          "charging-compatibility"
        ]
      },
      {
        "heading": "Put charging in the order brief",
        "items": [
          "List the charging sites, operator names and AC or DC use expected for the cars.",
          "Ask the supplier which vehicle documents, cable and local service information it can provide.",
          "For a batch, agree how you will verify a sample of the exact version before accepting the remaining cars."
        ]
      },
      {
        "heading": "GB/T vs CCS2, and Type 2 vs CCS2",
        "paragraphs": [
          "List AC charging and DC fast charging separately in the order. GB/T charging has distinct AC and DC interfaces. Type 2 charging and CCS2 charging also describe different arrangements: specify the actual inlet, supported mode and equipment for the vehicle you are buying.",
          "Connector compatibility includes the charging protocol and electrical interface. The onboard charger specification matters for AC use; the intended DC setup needs its own vehicle and station review. Have the charger operator or qualified equipment provider review the exact pairing before the order depends on it."
        ],
        "sources": [
          "gb-ac",
          "gb-dc",
          "charging-compatibility"
        ]
      },
      {
        "heading": "Buying a GB/T to CCS2 adapter: what must be verified?",
        "paragraphs": [
          "Describe the direction before ordering a GB/T to CCS2 adapter: the station connector on one side and the car's inlet on the other. Obtain the supported vehicle list, charging mode, voltage and current limits, approvals and operating instructions for the actual product.",
          "A charging test should identify the car, station, any approved adapter and what completed. Retain the result and restrictions with the order. An online product listing or a test on another model leaves this pairing unverified; resolve it with the vehicle manufacturer and equipment provider before committing to a batch."
        ],
        "sources": [
          "charging-compatibility"
        ]
      },
      {
        "heading": "Define a charging acceptance record",
        "paragraphs": [
          "Before a fleet commitment, arrange a supervised test with the intended equipment where feasible. Record VIN and trim, charger operator and model, adapter model and firmware if used, date, starting SOC, duration, energy delivered, observed limits and faults. Note any pairing that has not been tested.",
          "Have the responsible equipment provider and operator explain an unsuccessful session and any required correction. Preserve a successful result as evidence for that setup; it is not a guarantee for every public charger, future software release or battery condition. Confirm who provides support at destination and which modifications could affect warranty or approval."
        ],
        "links": [
          {
            "label": "Assess battery condition separately",
            "href": "/export-services/buying-guide/used-ev-battery-report/"
          },
          {
            "label": "Confirm local repair and software support",
            "href": "/export-services/buying-guide/car-warranty-and-after-sales/"
          }
        ]
      },
      {
        "heading": "Questions about importing and charging a Chinese EV",
        "questions": [
          {
            "question": "Will a China-market EV work at every CCS2 station?",
            "answer": "No such assumption is safe for purchasing. Check the inlet, communication, electrical limits and operator acceptance for the actual version. A single successful session establishes the result for that setup and test, not universal network compatibility."
          },
          {
            "question": "Will the car reach its advertised charging power?",
            "answer": "Ask which conditions the quoted figure assumes and which limits apply to the vehicle, charger and any approved equipment. Request a test record relevant to your intended setup rather than treating a charger’s nameplate rating as the car’s charging result."
          },
          {
            "question": "Can I change the charging inlet after delivery?",
            "answer": "Do not budget on a simple connector replacement. Ask the manufacturer or an authorized technical provider about compatibility, approval, warranty and local requirements for the exact vehicle. Resolve the charging arrangement before choosing the version."
          }
        ],
        "links": [
          {
            "label": "Check the EV before importing",
            "href": "/export-services/buying-guide/check-car-import-eligibility/"
          },
          {
            "label": "Compare used EV battery reports",
            "href": "/export-services/buying-guide/used-ev-battery-report/"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Check import and registration eligibility",
        "href": "/export-services/buying-guide/check-car-import-eligibility/"
      },
      {
        "label": "Read a used EV battery report",
        "href": "/export-services/buying-guide/used-ev-battery-report/"
      },
      {
        "label": "Browse new cars",
        "href": "/new-cars/"
      },
      {
        "label": "BYD Seal 07 DM-i: version and charging checks",
        "href": "/new-cars/byd/seal-07-dm-i/"
      }
    ]
  },
  "how-to-buy-cars-from-china": {
    "title": "How to Buy a Car from China",
    "description": "Buy new or used cars from China with a clear sequence: eligibility, exact version, supplier checks, comparable cost, inspection, payment, shipping and arrival.",
    "answer": "Check whether you can import and register the exact car at your destination. Before you pay, verify the seller and compare the full landed cost. Agree on inspection, shipping and the documents you’ll need before the car is released.",
    "image": "ports",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "used-export",
        "label": "China MOFCOM and four departments, 2024 used vehicle export requirements",
        "href": "https://www.mofcom.gov.cn/zfxxgk/gkml/art/2024/art_79f6d1fc5871472ea2ddae704b1173b2.html"
      },
      {
        "id": "recent-registration",
        "label": "China MOFCOM and three departments, additional used vehicle export requirements effective in 2026",
        "href": "https://www.mofcom.gov.cn/zcfb/dwmygl/art/2025/art_543d1fcc6a1048d5bf301a8d59ed723e.html"
      },
      {
        "id": "electric-export",
        "label": "China MOFCOM and three departments, Announcement No. 54 of 2025 on battery-electric passenger car export licensing",
        "href": "https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=103794"
      },
      {
        "id": "icc",
        "label": "ICC, Incoterms® 2020 checklist, updated 2024",
        "href": "https://library.iccwbo.org/content/clp/Others/incoterms_2020_checklist_2024-update.pdf"
      }
    ],
    "sections": [
      {
        "heading": "Buying a car from China, step by step",
        "paragraphs": [
          "A buyer sourcing wholesale cars for a dealership needs an agreed version and a way to identify every unit in the batch. A private buyer needs an identified car and a workable registration route. In both cases, settle the destination requirements before paying to reserve a model.",
          "The six stages below give each decision a record. Keep the sourcing brief, quote revisions and approvals together so the person releasing payment can see what has actually been accepted."
        ],
        "table": {
          "caption": "From the first inquiry to collection",
          "headers": [
            "Stage",
            "What to agree or check",
            "Record to keep"
          ],
          "rows": [
            [
              "1. Vehicle brief",
              "Model, version, new or used status, quantity, budget and destination.",
              "A sourcing brief with acceptable alternatives."
            ],
            [
              "2. Offer",
              "Seller, exact configuration, price basis, availability and included services.",
              "A dated, itemised quote with its validity and named delivery point."
            ],
            [
              "3. Order and preparation",
              "Vehicle identification, payment milestones, changes and the applicable export route.",
              "The written order, vehicle list and payment instructions."
            ],
            [
              "4. Inspection and release",
              "Inspection scope, findings, repairs and acceptance before release.",
              "A dated report and photos linked to the VIN where available."
            ],
            [
              "5. Booking and departure",
              "Carrier acceptance, loading plan, document drafts and schedule.",
              "Booking confirmation, transport documents and a departure condition record."
            ],
            [
              "6. Arrival and collection",
              "Customs release, final charges, supplied items and receiving inspection.",
              "The clearance file and signed handover or discrepancy record."
            ]
          ]
        }
      },
      {
        "heading": "Know what must be complete at each stage",
        "paragraphs": [
          "Give each unresolved item an owner and a due point. If a substituted trim changes the battery inlet or conformity evidence, return it to the relevant review before accepting the change. A paid invoice, an inspection result and a carrier booking establish different parts of the purchase."
        ],
        "table": {
          "caption": "Purchase stages and the evidence handed to the next person",
          "headers": [
            "Stage",
            "Output to retain"
          ],
          "rows": [
            [
              "Destination review",
              "Importer and route identified; exact version and available technical evidence reviewed by the local specialist. Record unresolved approvals."
            ],
            [
              "Vehicle and supplier selection",
              "Written specification, legal seller/exporter, current supply position and VIN allocation when available."
            ],
            [
              "Commercial agreement",
              "Comparable quote, named delivery point, exclusions, payment evidence, substitutions and remedies."
            ],
            [
              "Vehicle acceptance",
              "VIN-linked inspection and the buyer’s decision on repairs, exceptions or unperformed checks."
            ],
            [
              "Shipment release",
              "Accepted export and destination file, carrier booking/acceptance and agreed payment/release conditions."
            ],
            [
              "Arrival and use",
              "Release documents, receiving condition record, registration work and identified after-sales contacts."
            ]
          ]
        }
      },
      {
        "heading": "Choose a car that fits your destination",
        "paragraphs": [
          "Start with the car you can register and use. Ask your broker which rules apply to the exact vehicle category, model year, steering side, emissions or powertrain and importer. Keep the answer with the offer so a later substitution does not undo the check.",
          "For new cars from China, compare the model year, trim, equipment, production timing and market version. For used cars from China, add the individual VIN, first registration, current mileage, condition and repair records. A familiar model name is not enough to establish the specification of the car being offered.",
          "This matters for a Chinese-brand car and for a China-market Toyota, Volkswagen or another international brand. Request the actual version details and confirm local software, language, parts and service support. Use the country guides as a starting checklist, then verify the current route with your destination broker.",
          "Separate the model’s general specification from the proposed unit and its current supply status. A website model page is a reference for discussion. The written offer should identify the market version and equipment, and the supplier should state whether units are allocated, awaiting inspection or still being sourced. Local sale of the same model name does not establish that a China-market trim has identical approval, software or support."
        ],
        "links": [
          {
            "label": "Compare new and used car offers",
            "href": "/export-services/buying-guide/new-vs-used-cars/"
          },
          {
            "label": "Check requirements by destination",
            "href": "/export-services/buying-guide/#country-guides"
          }
        ]
      },
      {
        "heading": "Find and verify a car exporter in China",
        "paragraphs": [
          "When choosing a car exporter in China, establish who will sell the vehicle, receive payment and handle export. Ask for the registered legal name and company details, then match them to the offer, contract and payment instructions. Have the seller explain any different beneficiary or third-party role in writing.",
          "Ask which export licence and vehicle records apply to the order. China’s 2024 used vehicle export announcement sets out exporter, licensing and vehicle-document requirements. A company profile or exhibition certificate helps identify a business; ask separately for the evidence relevant to your car and export route.",
          "Registration timing also matters. From January 1, 2026, China’s additional rules require a manufacturer-issued after-sales service confirmation for used vehicles applying for export within 180 days of registration, including day 180. If a recently registered car is offered as used, resolve the required documentation before payment."
        ],
        "items": [
          "Request a dated offer identifying the car or the agreed method for allocating vehicles to the order.",
          "Verify an account change through an established contact using a number you already know.",
          "Agree on access for an inspection and what happens if the car does not match the offer.",
          "Keep the seller, exporter, inspector and forwarder contacts together with their responsibilities."
        ],
        "sources": [
          "used-export",
          "recent-registration"
        ],
        "links": [
          {
            "label": "Verify a used car before payment",
            "href": "/export-services/buying-guide/verify-chinese-used-car-before-payment/"
          }
        ]
      },
      {
        "heading": "How much does it cost to import a car from China?",
        "paragraphs": [
          "The cost example below is hypothetical and uses assumed freight, fees and taxes. It demonstrates addition to a common delivery endpoint, not a current offer or a country-specific tax rate. Obtain dated inputs for your vehicle and importer before using the estimate for a payment decision.",
          "The cost to import a car from China is the vehicle price plus every charge needed to reach your chosen endpoint. That may be release at the destination port, delivery to your yard or a registered car ready for use. Compare offers using the same endpoint, currency, vehicle specification and quantity.",
          "List origin handling, freight, insurance, import duties and taxes, destination handling, brokerage and any local delivery or registration. Enter a cost once. Ask the seller which items are already included in the quoted Incoterms® rule and named place; these rules allocate costs, risks and obligations between the parties.",
          "The example below uses the same four-car assumptions as our landed-cost worksheet. These are illustrative USD amounts, not a vehicle offer, freight rate or tax calculation for a particular country."
        ],
        "table": {
          "caption": "Illustrative cost for one car in a four-car order, USD",
          "headers": [
            "Cost group",
            "Per car",
            "Basis"
          ],
          "rows": [
            [
              "FOB vehicle price",
              "$11,000",
              "Assumed unit price at the named loading port."
            ],
            [
              "Freight and insurance",
              "$1,190",
              "$4,400 freight and $360 insurance shared equally across four cars."
            ],
            [
              "Import and destination costs",
              "$2,310",
              "$1,540 assumed duties and taxes, $320 terminal and brokerage, $450 local delivery and registration."
            ],
            [
              "Total to the example’s endpoint",
              "$14,500",
              "$58,000 for the four-car order."
            ]
          ]
        },
        "items": [
          "When comparing cheap electric cars from China, check whether the advertised price covers the exact trim, quantity and export arrangement you need.",
          "Keep your broker’s destination tax calculation separate and record the valuation basis, date and assumptions.",
          "Ask who pays for storage, document amendments or a delayed collection. Leave unconfirmed costs visible in your budget."
        ],
        "sources": [
          "icc"
        ],
        "links": [
          {
            "label": "Calculate your landed cost",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          },
          {
            "label": "Compare FOB and CIF quotes",
            "href": "/export-services/buying-guide/exw-fob-cif-car-shipping/"
          }
        ]
      },
      {
        "heading": "Chinese electric cars, hybrid SUVs and small city cars",
        "paragraphs": [
          "Compare the powertrain against how the car will be used. For electric cars from China, ask for the battery and charging specification of the actual version. For Chinese hybrid cars, identify whether the offer is for a conventional hybrid, a plug-in hybrid or an extended-range vehicle, and confirm the equipment and maintenance support for that version.",
          "A Chinese EV SUV needs the same version checks as a smaller electric car, plus the passenger space, payload and equipment your intended use requires. For a small city car or mini EV from China, request the manufacturer’s vehicle category and technical data. Check registration eligibility and suitability for the roads where you intend to use it.",
          "For charging, obtain photos of the car’s actual AC and DC inlets where fitted, its manual and the onboard charging limits. Have the local equipment provider check the proposed car and charger pairing, including any adapter. For a used EV, request a dated battery report tied to the VIN, its test method and any unresolved faults.",
          "China’s Announcement No. 54 of 2025 introduced export licensing from January 1, 2026 for the battery-electric passenger vehicles within its stated scope. Have the exporter confirm the classification and licensing path for the quoted car alongside your destination checks."
        ],
        "sources": [
          "electric-export"
        ],
        "links": [
          {
            "label": "Check Chinese EV charging compatibility",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          },
          {
            "label": "Read a used EV battery report",
            "href": "/export-services/buying-guide/used-ev-battery-report/"
          }
        ]
      },
      {
        "heading": "Documents to confirm before shipment",
        "paragraphs": [
          "Build the car import documents checklist with the exporter, forwarder and destination broker before placing the order. The required file depends on the vehicle, export route and destination. Give each document an owner and an agreed handover date.",
          "Check the file again if the car, consignee, route or delivery point changes. A corrected invoice may also require changes elsewhere in the document pack."
        ],
        "items": [
          "Commercial invoice and order: match the parties, vehicle description, quantity, currency, price and agreed delivery term.",
          "Vehicle list and identity records: match the VINs, model details and any registration records for used cars.",
          "Applicable export licence and inspection evidence: ask the exporter which records apply to the individual car or batch.",
          "Transport record: check the shipper, receiving party, destination and vehicle or shipment identifiers before approving the draft.",
          "Destination documents: have the broker confirm any origin, conformity, technical, inspection or other evidence needed for clearance and registration."
        ],
        "links": [
          {
            "label": "Use the export document checklist",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          }
        ]
      },
      {
        "heading": "Before you pay: verify the vehicle and the offer",
        "paragraphs": [
          "For a used car inspection, agree on the VIN, location, access, checklist and report format. Request dated photos and findings for the checks in your order. A useful report records what was checked, what was found and what the inspector could not verify.",
          "Review the odometer evidence, body and structural observations, mechanical operation, cabin equipment and supplied items. For an electrified vehicle, agree on the battery and charging checks available at that location. Record any repair and the re-check you expect before authorising release.",
          "Put each payment milestone next to its amount, beneficiary and required evidence. Agree on the effect of a failed check, a substitute car or a revised dispatch date. Keep approved changes with the original order so the person authorising payment can see what was accepted."
        ],
        "links": [
          {
            "label": "Use the pre-shipment inspection checklist",
            "href": "/export-services/buying-guide/inspect-a-used-car-from-china/"
          }
        ]
      },
      {
        "heading": "Shipping from China: RoRo, container and timing",
        "paragraphs": [
          "Car shipping from China depends on the loading and destination ports, vehicle readiness, carrier acceptance, space and the import arrangements. Ask the forwarder to quote the same vehicle list and delivery point for each option. Include dimensions, running condition, powertrain and any loading restrictions.",
          "For RoRo versus container car shipping, compare the service actually available on your route. Ask how the vehicle is received, secured and handed over, what items can travel with it and which charges are outside the freight quote. For an EV, confirm the carrier’s battery and acceptance requirements before relying on the booking.",
          "A shipping-time estimate should distinguish preparation in China, the booked transport and destination release. Get the assumptions behind each date instead of treating the sailing time as the full order-to-arrival timeline."
        ],
        "items": [
          "Before departure: allow for vehicle allocation, inspection, agreed repairs, export documents and the carrier’s booking cutoff.",
          "In transit: record the route, any transshipment, departure confirmation and the carrier’s current arrival estimate.",
          "At destination: confirm document availability, clearance, collection deadlines and onward delivery.",
          "If a date changes: name the contact who updates the buyer and record responsibility for any additional charges."
        ],
        "links": [
          {
            "label": "Compare RoRo and container shipping",
            "href": "/export-services/buying-guide/container-vs-roro-car-shipping/"
          }
        ]
      },
      {
        "heading": "Arrival checks and after-sales support",
        "paragraphs": [
          "At collection, match the vehicle identity, condition and supplied items against the departure record and order. Photograph a discrepancy and notify the agreed contact within the relevant claims procedure. Keep receiving, transport and inspection records together by VIN.",
          "Before buying, ask who handles warranty questions, diagnosis, parts and repair approvals in your market. Get the scope, exclusions, provider, procedure and any transport or labour costs in writing. For a used car, ask what coverage, if any, applies to that individual vehicle.",
          "For software, apps, charging equipment and parts, name the actual version and destination when asking about support. Keep the written response with the offer so your purchasing decision includes what happens after handover."
        ],
        "links": [
          {
            "label": "Check the car on arrival",
            "href": "/export-services/buying-guide/vehicle-arrival-checklist/"
          },
          {
            "label": "Confirm warranty and after-sales arrangements",
            "href": "/export-services/buying-guide/car-warranty-and-after-sales/"
          }
        ]
      },
      {
        "heading": "Questions before you place an order",
        "questions": [
          {
            "question": "Can I buy just one car from China?",
            "answer": "Ask for a single-car quote and confirm whether the unit price, preparation and freight arrangement apply to one vehicle. An advertised batch price may have a different quantity basis. Confirm availability, the export route and destination requirements for the exact car before committing."
          },
          {
            "question": "Can I buy a car from China online?",
            "answer": "Use the online listing to identify a model and request an offer. Before placing the order, verify the seller, vehicle details, payment instructions and document handover. Agree on how the car will be inspected and accepted, and keep the written contract and supporting records."
          },
          {
            "question": "What should I send for an accurate car price?",
            "answer": "Send the brand, model, model year, trim, new or used requirement, quantity and destination country and port. For used cars, add acceptable mileage and condition. For EVs and hybrids, include charging and equipment requirements. Name the delivery point so the quote has a clear scope."
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Prepare a wholesale car RFQ",
        "href": "/export-services/buying-guide/request-wholesale-car-quote/"
      },
      {
        "label": "Check the document handover",
        "href": "/export-services/buying-guide/car-import-documents-checklist/"
      },
      {
        "label": "Plan shipping and collection",
        "href": "/export-services/shipping-support/"
      }
    ]
  },
  "new-vs-used-cars": {
    "title": "New vs. Used Cars from China",
    "description": "Compare new and used car imports by legal status, exact specification, condition, preparation, fleet use, downtime exposure and support at destination.",
    "answer": "Compare new and used cars you can register at your destination, including the cost to get each one ready for use. For a new car, confirm the exact trim and equipment. For a used car, check the VIN, registration history and inspection report.",
    "image": "inspection",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "used-export",
        "label": "China MOFCOM and four departments, Announcement No. 6 of 2024 on used vehicle exports",
        "href": "https://www.mofcom.gov.cn/zfxxgk/gkml/art/2024/art_79f6d1fc5871472ea2ddae704b1173b2.html"
      },
      {
        "id": "recent-registration",
        "label": "China MOFCOM and three departments, additional requirements for recently registered used vehicle exports",
        "href": "https://www.mofcom.gov.cn/zcfb/dwmygl/art/2025/art_543d1fcc6a1048d5bf301a8d59ed723e.html"
      }
    ],
    "sections": [
      {
        "heading": "Compare the two offers at the same destination",
        "paragraphs": [
          "Start with the model, intended use, quantity and delivery point your business needs. Ask suppliers to quote both options on that basis. A new sedan for a fleet and a used SUV for resale solve different needs; their starting prices alone do not make a useful comparison.",
          "Then identify the exact cars behind the prices. A new-car offer should name the model year, trim, market version and equipment. A used-car offer should identify the unit and its available records. Confirm which details remain provisional and when the seller will identify the vehicles for your order."
        ],
        "table": {
          "caption": "New vs used car import comparison",
          "headers": [
            "Decision",
            "New-car offer",
            "Used-car offer"
          ],
          "rows": [
            [
              "What are you buying?",
              "Exact version, equipment, production information and identification before release.",
              "Specific VIN, registration date, current mileage and availability."
            ],
            [
              "What must be inspected?",
              "Match the supplied vehicle and equipment to the offer; agree condition and operation checks.",
              "Review identity, records, damage, repairs, wear and the tests agreed for that car."
            ],
            [
              "What preparation is priced?",
              "State any accessories, software setup or delivery preparation in the quote.",
              "Price agreed repairs, tyres, servicing, missing items and re-inspection separately."
            ],
            [
              "What support will you have?",
              "Confirm the written coverage for the version, destination and use.",
              "Check the applicable coverage and the local repair and parts plan for the individual vehicle."
            ]
          ]
        }
      },
      {
        "heading": "Match the choice to how the cars will earn their keep",
        "paragraphs": [
          "Use your own operating assumptions: intended holding period, distance, utilization and acceptable time out of service. Without comparable local evidence, do not turn a new/used label into a claim about depreciation, reliability or resale value."
        ],
        "table": {
          "caption": "Examples of buyer requirements to compare",
          "headers": [
            "Use case",
            "What matters in the two offers"
          ],
          "rows": [
            [
              "Fleet starting on a fixed date",
              "Required quantity in the same configuration, inspection and preparation completion, registration work, keys and service arrangements. Obtain evidence for readiness rather than assuming new means immediate."
            ],
            [
              "Dealer buying individually priced used cars",
              "Per-VIN condition and history, repair or cosmetic work, customer disclosure and locally supported equipment. Keep margins per unit."
            ],
            [
              "Longer planned ownership",
              "Maintenance plan, parts identification, qualified repair access and the written scope of any warranty. Request support for the exact market version."
            ],
            [
              "Electric or plug-in fleet",
              "Usable charging plan, battery evidence for used units, charging downtime assumptions and a support contact for faults."
            ]
          ]
        }
      },
      {
        "heading": "Check registration status before choosing a zero-mileage offer",
        "paragraphs": [
          "“Zero mileage” or “nearly new” does not establish the export category. China’s used-vehicle framework defines used cars by registration and transfer of ownership, rather than an odometer threshold. Ask for the registration history and the exporter’s proposed route.",
          "A recently registered car can also need additional export evidence under the current Chinese requirements. Have the exporter confirm applicability and the documents it will obtain before treating a low-mileage offer as ready to ship."
        ],
        "sources": [
          "used-export",
          "recent-registration"
        ],
        "links": [
          {
            "label": "Verify the used car and its seller",
            "href": "/export-services/buying-guide/verify-chinese-used-car-before-payment/"
          }
        ]
      },
      {
        "heading": "For a new or used electric car, check the charging plan",
        "paragraphs": [
          "Compare the actual charging inlets, supported equipment and battery evidence. A model sold in your market may have different charging hardware or software from a China-market version with the same name. Obtain the specification for the quoted car.",
          "For a used EV, add the installed battery’s report, repairs and charging test results to the comparison. Ask what the health metric measures and how it was obtained. Keep this condition assessment separate from the manufacturer’s published range figure or the percentage of charge shown on the dashboard."
        ],
        "links": [
          {
            "label": "Read a used EV battery report",
            "href": "/export-services/buying-guide/used-ev-battery-report/"
          },
          {
            "label": "Check GB/T and CCS2 compatibility",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          }
        ]
      },
      {
        "heading": "Compare the cost of getting each car ready for use",
        "paragraphs": [
          "For a used car, price the work needed to reach your required condition: inspection, agreed repairs, preparation and any re-check. Add freight, destination charges and registration work on the same basis as the new-car offer. Keep confirmed amounts separate from estimates and missing charges.",
          "Vehicle depreciation is one part of ownership cost, not a fixed saving to assume from a used-car price. For your intended holding period, compare the purchase cost, required work and the support you can actually obtain. Battery health and warranty coverage need their own evidence for a used EV.",
          "For a fleet, specify which equipment must remain consistent across the batch. For resale, consider the records you can pass to the next owner. Document acceptable substitutions and recheck the affected destination requirements before accepting another version."
        ],
        "links": [
          {
            "label": "Build the landed-cost estimate",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Screen exclusions before building the cost comparison",
        "paragraphs": [
          "First remove offers that fail a mandatory requirement: an unavailable import route, missing approval evidence, unsuitable seating or steering, unresolved structural damage, or charging that cannot be supported for the intended use. A price reduction does not solve these gaps.",
          "For the remaining cars, compare the same model year or explain the difference, engine or battery version, drivetrain, safety equipment and delivery point. Add inspection, repairs, tyres or other preparation identified for the unit, plus registration and local setup. Keep uncertain costs visible.",
          "For a recently registered used export from China, resolve the applicable manufacturer after-sales confirmation requirement. At destination, have the receiving specialist determine the car’s legal status from its records. “Zero-mileage” in an advertisement is not a substitute for that review."
        ],
        "sources": [
          "recent-registration"
        ],
        "links": [
          {
            "label": "Build the cost to the same ready-for-use endpoint",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          },
          {
            "label": "Check a used unit’s records",
            "href": "/export-services/buying-guide/verify-chinese-used-car-before-payment/"
          }
        ]
      },
      {
        "heading": "Questions when choosing new or used cars",
        "questions": [
          {
            "question": "Are used cars from China always cheaper to import?",
            "answer": "The quoted vehicle price may be lower, but compare the full destination cost and preparation for each car. Inspection findings, parts, transport and registration requirements can change the result. Use the same delivery endpoint for both calculations."
          },
          {
            "question": "Can a low-mileage car be imported wherever new cars are allowed?",
            "answer": "Check the destination’s definition and route for that vehicle. Low mileage does not establish eligibility, and approval of a new version does not automatically cover a registered used unit. Ask the broker to review its actual registration history."
          },
          {
            "question": "Which option is better for a first order?",
            "answer": "Choose the offer for which you can verify eligibility, specification or condition, full costs and support. If either offer has unresolved requirements, ask for the missing evidence before selecting it. A smaller first order still needs those checks."
          }
        ],
        "links": [
          {
            "label": "Check import and registration eligibility",
            "href": "/export-services/buying-guide/check-car-import-eligibility/"
          },
          {
            "label": "Browse new cars",
            "href": "/new-cars/"
          },
          {
            "label": "Browse used cars",
            "href": "/used-cars/"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Prepare a wholesale quote request",
        "href": "/export-services/buying-guide/request-wholesale-car-quote/"
      },
      {
        "label": "Use the inspection checklist",
        "href": "/export-services/buying-guide/inspect-a-used-car-from-china/"
      }
    ]
  },
  "check-car-import-eligibility": {
    "title": "Car Import Requirements: Can You Import This China-Market Car?",
    "description": "Check car import eligibility through four separate gates: China export, importer and customs route, technical conformity and local road registration.",
    "answer": "Confirm four separate gates for the exact vehicle and legal importer: China export, destination import clearance, technical conformity and road registration. Use the actual version and available documents, then record the evidence still needed before purchase or shipment. Success at one gate does not settle the others.",
    "image": "documents",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "used-export",
        "label": "China MOFCOM and four departments, Announcement No. 6 of 2024 on used vehicle exports",
        "href": "https://www.mofcom.gov.cn/zfxxgk/gkml/art/2024/art_79f6d1fc5871472ea2ddae704b1173b2.html"
      }
    ],
    "sections": [
      {
        "heading": "Send the broker a vehicle file, not just a model name",
        "paragraphs": [
          "Car import requirements follow the actual vehicle and importing route. Start with the model year, country of origin, registration history, powertrain and intended use. Include left-hand drive or other steering information and the technical evidence requested for applicable emissions standards.",
          "The legal importer also matters. A dealer batch, private purchase and returning-resident scheme can have different conditions. The broker's review should identify any import license, approval or registration requirement that applies to this buyer and exact configuration."
        ],
        "table": {
          "caption": "Information for the destination eligibility check",
          "headers": [
            "Item",
            "What to provide",
            "What to get back"
          ],
          "rows": [
            [
              "Importer and use",
              "Legal importer, commercial or personal route, resale or fleet use.",
              "Applicable importer registration, permits and limits for that route."
            ],
            [
              "Vehicle identity",
              "Make, exact version, model year, VIN when available and manufacturing origin.",
              "Written confirmation of the vehicle category and information still needed."
            ],
            [
              "Registration history",
              "New or previously registered status, first registration and relevant records.",
              "Applicable new/used classification and age or other vehicle restrictions."
            ],
            [
              "Technical evidence",
              "Powertrain, steering side, emissions or conformity documents and charging inlets for an EV.",
              "Required approval evidence and who can issue or validate it."
            ],
            [
              "Arrival and registration",
              "Port or border, final use location and proposed timing.",
              "Clearance, inspection and registration steps, with the responsible parties."
            ]
          ]
        }
      },
      {
        "heading": "Record a separate answer for each approval gate",
        "paragraphs": [
          "Keep each answer with its source, date and scope. A freight forwarder’s willingness to carry the car is a transport decision. A customs estimate is a cost calculation. Neither replaces a technical or registration decision."
        ],
        "table": {
          "caption": "Eligibility decisions to resolve for the proposed transaction",
          "headers": [
            "Gate",
            "Evidence and responsible reviewer"
          ],
          "rows": [
            [
              "China export",
              "Named exporter, vehicle status and applicable export documents or licence requirements. The exporter should identify its procedure for the actual unit."
            ],
            [
              "Destination import",
              "Importer of record, legal regime, new/used status, age, category and any licence or prior authorization. Obtain a country-specific review."
            ],
            [
              "Technical conformity",
              "Required emissions, safety, equipment or inspection evidence; issuing body, coverage and any accepted test or approval route."
            ],
            [
              "Road registration and intended use",
              "Accepted vehicle documents, identity, local checks and registration procedure, including conditions for the planned private or commercial use."
            ]
          ]
        }
      },
      {
        "heading": "Check import clearance and road registration separately",
        "paragraphs": [
          "Vehicle homologation or type approval addresses a technical approval process. Customs entry and vehicle registration may require other records as well. Establish which authority reviews each part of the file and which decisions must be obtained before shipment.",
          "Where a certificate of conformity is requested, match its issuer and scope to the offered version. Do not assume every China-market car has an EU certificate. Used car import rules can also depend on age, condition and registration history; a low odometer reading does not settle that review.",
          "For an EV, add charging compatibility for the actual inlets and local equipment. Keep software, language and service requirements in the same purchasing brief so a substitution triggers a review of the affected checks."
        ],
        "links": [
          {
            "label": "Prepare the document checklist",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          }
        ]
      },
      {
        "heading": "Resolve the China export side with the named exporter",
        "paragraphs": [
          "Ask who will be the exporter of record and which export category applies to the car. For a used vehicle, request the relevant registration, licensing and inspection file. Check that the exporter can connect those records to the individual VINs in your order.",
          "Keep the China export check and destination approval in the same purchasing file, with a person responsible for each. If the vehicle’s registration status, model or exporter changes, have the affected party review the route again before payment or dispatch."
        ],
        "sources": [
          "used-export"
        ]
      },
      {
        "heading": "Importing an electric car from China: add local-use checks",
        "paragraphs": [
          "Confirm the actual AC and DC charging arrangements, supported equipment and planned charging sites. Ask whether the local provider can support the exact version. Verify essential software, language, connected features and parts support that your use depends on.",
          "Make the supplier identify what it has verified and what is awaiting confirmation. A feature working in China does not establish that its account, network or service will operate in your destination. If it is essential to the purchase, agree the acceptance evidence before the order."
        ],
        "links": [
          {
            "label": "Check Chinese EV charging standards",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          },
          {
            "label": "Confirm warranty and local support",
            "href": "/export-services/buying-guide/car-warranty-and-after-sales/"
          }
        ]
      },
      {
        "heading": "Use country guidance for the route you actually need",
        "paragraphs": [
          "Latin America and North Africa are not single import regimes. Start with the destination guide, then ask the local broker to check current requirements for your importer and vehicle. Keep the date, official reference and any remaining conditions in its written response."
        ],
        "links": [
          {
            "label": "Mexico",
            "href": "/export-services/buying-guide/countries/mexico/"
          },
          {
            "label": "Egypt",
            "href": "/export-services/buying-guide/countries/egypt/"
          },
          {
            "label": "Algeria",
            "href": "/export-services/buying-guide/countries/algeria/"
          },
          {
            "label": "All destination guides",
            "href": "/export-services/buying-guide/#country-guides"
          }
        ]
      },
      {
        "heading": "Check what the certificate actually covers",
        "paragraphs": [
          "Read the document title, issuing organization, number, validity and vehicle identifiers. Determine whether it is a manufacturer technical sheet, a test report, an approval covering a vehicle type, a VIN-specific document or a destination authority’s acceptance. These documents can support different stages and are not interchangeable.",
          "Match the engine or battery configuration, drivetrain, body type and relevant equipment to the quoted version. Ask the local reviewer to identify any gap and the accepted way to close it. Translation or authentication may be required, but translating a document does not expand its technical coverage.",
          "Reopen the review if the importer, legal regime, VIN, model year, powertrain, steering, equipment affecting approval or shipment timing changes. Save the accepted revision before the order advances. For country examples, use the relevant guide to prepare the question, then obtain the case-specific decision."
        ],
        "links": [
          {
            "label": "Check the Bolivia vehicle and IBMETRO file",
            "href": "/export-services/buying-guide/countries/bolivia/"
          },
          {
            "label": "Separate Algeria’s import routes",
            "href": "/export-services/buying-guide/countries/algeria/"
          },
          {
            "label": "Control the supporting documents",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          }
        ]
      },
      {
        "heading": "Questions about car import eligibility",
        "questions": [
          {
            "question": "Can I import any car advertised by an exporter?",
            "answer": "An advertisement does not establish eligibility for your destination or importer. Ask for the exact vehicle file and have the local route checked before committing. Record any permits, conformity evidence or registration conditions still outstanding."
          },
          {
            "question": "Does shipping from China prove the car was made in China?",
            "answer": "Record manufacturing origin and shipment origin separately. Give the broker the relevant evidence for the actual vehicle, especially where tariff treatment or an import route depends on origin."
          },
          {
            "question": "What should I do if eligibility is not yet confirmed?",
            "answer": "Keep the quote provisional and identify the missing document or decision, its owner and the next review date. Do not treat an estimate of freight or tax as confirmation that the vehicle can be imported and registered."
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Compare new and used orders",
        "href": "/export-services/buying-guide/new-vs-used-cars/"
      },
      {
        "label": "Request a quote with the right specifications",
        "href": "/export-services/buying-guide/request-wholesale-car-quote/"
      }
    ]
  },
  "compare-car-export-quotes": {
    "title": "How to Compare Car Export Quotes from China",
    "description": "Compare car export quotations on the same vehicle, quantity and endpoint. Normalize excluded costs, examine conditions and request a revised written offer.",
    "answer": "Compare the same vehicle specification, condition, quantity, currency and delivery endpoint first. Then add the work excluded from each offer, identify unpriced items and review payment, supply and validity conditions. The lowest headline price can only be evaluated once the scope and unresolved evidence are visible.",
    "image": "quote",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "icc",
        "label": "ICC, Incoterms® 2020 checklist, updated 2024",
        "href": "https://library.iccwbo.org/content/clp/Others/incoterms_2020_checklist_2024-update.pdf"
      }
    ],
    "sections": [
      {
        "heading": "Make the vehicle and quantity comparable first",
        "paragraphs": [
          "Give every supplier one specification brief. Compare model year, trim, powertrain and equipment, and record the quantity at the stated unit price. Vehicle availability should say which units are identified and which are still to be sourced.",
          "Name the contracting seller and exporter of record. For a used car, compare the actual VIN, registration and condition file, including preparation and repairs in the offer. Price a proposed alternative as a separate option so a lower total cannot conceal a different car."
        ],
        "table": {
          "caption": "Car export quotation comparison sheet",
          "headers": [
            "Line to compare",
            "Offer A",
            "Offer B"
          ],
          "rows": [
            [
              "Car or batch",
              "Record exact specification or VIN list.",
              "Record differences from the same brief."
            ],
            [
              "Price basis",
              "Unit price, currency, quantity and validity.",
              "Match currency and quantity; record expiry."
            ],
            [
              "Delivery",
              "Trade rule, named place and included services.",
              "Identify the same endpoint and services."
            ],
            [
              "Extra costs",
              "List exclusions and amounts awaiting a quote.",
              "Price the same missing work before comparing."
            ],
            [
              "Inspection and preparation",
              "Checks, repairs, re-checks and release decision.",
              "Match scope and record unresolved items."
            ],
            [
              "Payment and schedule",
              "Milestones, evidence due and proposed dates.",
              "Compare conditions, changes and refund terms."
            ],
            [
              "After-sales",
              "Provider, destination scope and costs covered.",
              "Record the support actually offered in writing."
            ]
          ]
        }
      },
      {
        "heading": "Bring EXW, FOB and CIF offers to the same endpoint",
        "paragraphs": [
          "Write the selected trade rule, named place and edition beside each price. An FOB car price and a CIF car price cover different transport scopes. Add the freight and insurance outside the FOB offer and check both offers for destination handling before comparing totals.",
          "Use the same port, yard or registration endpoint for the local estimate. The worked Incoterms example shows the arithmetic; actual freight, insurance and destination charges need current quotations for your vehicle list."
        ],
        "sources": [
          "icc"
        ],
        "links": [
          {
            "label": "See the EXW, FOB and CIF comparison",
            "href": "/export-services/buying-guide/exw-fob-cif-car-shipping/"
          },
          {
            "label": "Use the landed-cost calculator",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Normalize two offers before ranking them",
        "paragraphs": [
          "These numbers are invented only to demonstrate the comparison. The FOB and CIF offers refer to the same shipment and destination port, with comparable freight and cover. Offer A has a lower headline price but a USD 850 higher subtotal after the specified additions. Customs valuation, local taxes and other charges must still be checked for each actual offer.",
          "If Offer B’s freight is only an estimate, retain that condition beside its price and obtain the validity date and booking basis. If either quote leaves terminal handling unpriced, keep it as missing rather than replacing it with zero or the other supplier’s number."
        ],
        "table": {
          "caption": "Hypothetical comparison per car in USD, before destination tax",
          "headers": [
            "Item",
            "Offer A",
            "Offer B"
          ],
          "rows": [
            [
              "Supplier headline quote: A FOB / B CIF",
              "12,000",
              "12,250"
            ],
            [
              "Freight and comparable insurance",
              "1,100",
              "Included"
            ],
            [
              "Agreed inspection",
              "200",
              "200"
            ],
            [
              "Destination handling quoted on the same basis",
              "650",
              "650"
            ],
            [
              "Comparable subtotal",
              "13,950",
              "13,100"
            ],
            [
              "Duties, taxes, registration and inland work",
              "Obtain case-specific figures",
              "Obtain case-specific figures"
            ]
          ]
        },
        "links": [
          {
            "label": "Complete the destination cost calculation",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Check the conditions behind a low car import quote",
        "paragraphs": [
          "Record whether a lower offer requires another trim, colour, loading point, a mixed or larger batch, earlier payment or work the buyer must arrange. Ask for your original requirement and any alternative to be priced separately. A missing mandatory safety feature or approval record needs resolution before a price comparison can be useful.",
          "Keep uncertainty visible. “Freight to follow,” “subject to inspection” and “documents to be confirmed” are open items, not zero-cost inclusions. Request the person responsible, expected evidence and the point at which the price or order can be revised."
        ],
        "items": [
          "Confirm the contracting seller and the entity that will export the cars.",
          "Separate current availability from an estimated sourcing or production window.",
          "Identify the inspection provider, scope and authority to approve release.",
          "Check the exact support terms instead of comparing a general warranty headline."
        ]
      },
      {
        "heading": "Ask for a revised written offer before choosing",
        "paragraphs": [
          "Send each seller the unresolved differences and ask for an updated version of its quotation. Keep the quote date, reference and validity with your comparison so your team does not approve an expired price or a superseded specification.",
          "When a substitution, route or schedule changes, update the affected costs and destination check. Confirm payment milestones against the revised order. The comparison is complete when the selected offer describes the car and work you intend to buy, including what remains your responsibility."
        ],
        "links": [
          {
            "label": "Agree payment and order changes",
            "href": "/export-services/buying-guide/car-order-payment-and-changes/"
          }
        ]
      },
      {
        "heading": "Questions about comparing export prices",
        "questions": [
          {
            "question": "How many supplier quotes should I request?",
            "answer": "Request enough comparable offers to understand the specification, service scope and unresolved costs. More offers help only when suppliers receive the same brief. Use the RFQ template to keep the responses comparable."
          },
          {
            "question": "Can I compare an online car price with a written export offer?",
            "answer": "Check what the online price actually covers, including version, condition, quantity, currency and validity. Ask for a written offer to your named delivery point before treating it as a purchasing alternative."
          },
          {
            "question": "Should I choose the cheapest supplier?",
            "answer": "Compare the confirmed total together with the vehicle evidence and services you need. Resolve material gaps before approval. A quote with missing inspection, preparation or destination costs is not yet a complete comparison."
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Copy the wholesale RFQ template",
        "href": "/export-services/buying-guide/request-wholesale-car-quote/"
      },
      {
        "label": "Verify a used car before paying",
        "href": "/export-services/buying-guide/verify-chinese-used-car-before-payment/"
      }
    ]
  },
  "car-order-payment-and-changes": {
    "title": "Car Export Payment Terms: Deposits, Transfers and Order Changes",
    "description": "Agree car export payment milestones with defined evidence, verify the bank beneficiary and document substitutions, delays, refunds and amended release conditions.",
    "answer": "Agree what evidence is due before each deposit, balance or release milestone, then verify the payee through an independently established contact. Put vehicle substitutions, delays and refund conditions into written amendments. The payment method and the commercial contract should be reviewed together; neither a transfer receipt nor a document set establishes every aspect of vehicle condition.",
    "image": "quote",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "payments",
        "label": "International Trade Administration, Trade Finance Guide",
        "href": "https://www.trade.gov/report/trade-finance-guide"
      },
      {
        "id": "fraud",
        "label": "FBI IC3, business email compromise and verification of account changes",
        "href": "https://www.ic3.gov/CrimeInfo/BEC"
      },
      {
        "id": "documents",
        "label": "International Trade Administration, common export documents and their purposes",
        "href": "https://www.trade.gov/common-export-documents"
      },
      {
        "id": "credit",
        "label": "International Trade Administration: letter of credit documentation and bank review",
        "href": "https://www.trade.gov/letter-credit"
      }
    ],
    "sections": [
      {
        "heading": "Tie the car deposit and balance to agreed evidence",
        "paragraphs": [
          "Set payment milestones against decisions your team can actually verify. For an identified used car, that may include the VIN and agreed inspection findings. For a batch being sourced, define when individual cars will be proposed, inspected and approved. There is no single deposit percentage to apply to every order.",
          "Each milestone should show the amount, responsible approver and evidence still due. Keep the seller's acknowledgement and transfer reference with the order, then reconcile the remaining balance before the next request."
        ],
        "table": {
          "caption": "Details to complete for each payment milestone",
          "headers": [
            "Record",
            "What to agree"
          ],
          "rows": [
            [
              "Amount and reference",
              "Currency, instalment amount, contract reference and any bank charges."
            ],
            [
              "Recipient",
              "Contracting seller, beneficiary and documented role of any different payee."
            ],
            [
              "Evidence due first",
              "Vehicle identification, inspection, preparation or shipping record specified for that stage."
            ],
            [
              "Approval",
              "Who checks the evidence and authorizes the transfer."
            ],
            [
              "If the condition is not met",
              "Review, correction, postponement or other action under the agreed terms."
            ],
            [
              "Changes and cancellation",
              "Written amendment, cost allocation and applicable refund procedure."
            ]
          ]
        }
      },
      {
        "heading": "Define the evidence behind each payment milestone",
        "paragraphs": [
          "These milestones are negotiation examples, not a KEEYAK standard deposit schedule. Banks assess documents under the selected instrument and its terms; physical inspection and vehicle acceptance need their own scope. Ask the bank or trade-finance specialist to explain discrepancies, fees and timing before committing to a letter of credit or documentary collection."
        ],
        "table": {
          "caption": "Examples to negotiate for the actual order",
          "headers": [
            "Milestone",
            "Evidence to define in the agreement"
          ],
          "rows": [
            [
              "Order or sourcing commitment",
              "Legal parties, required specification and quantity, price basis, cancellation conditions and what the payment secures. State whether a VIN is allocated."
            ],
            [
              "Vehicle acceptance",
              "VIN list, agreed independent inspection and buyer decision on repairs or exceptions. Identify checks still pending."
            ],
            [
              "Shipment readiness",
              "Applicable export documents, destination-file review and carrier acceptance/booking status. Distinguish an application or draft from an issued document."
            ],
            [
              "Balance or document release",
              "Exact documents, recipients, form of release and timing under the agreed payment instrument. Confirm any originals or carrier release conditions."
            ]
          ]
        },
        "sources": [
          "payments",
          "credit",
          "documents"
        ]
      },
      {
        "heading": "Understand the proposed international payment method",
        "paragraphs": [
          "A bank transfer, letter of credit, documentary collection or open-account arrangement creates different payment conditions. The seller and your bank should confirm what is available, the fees and the documents involved before those terms enter the order.",
          "For a letter of credit, obtain the bank's review of the documentary requirements. A bank's examination of presented documents does not replace your agreed physical inspection and acceptance of the car. Keep both processes consistent with the contract."
        ],
        "sources": [
          "payments",
          "credit"
        ]
      },
      {
        "heading": "Verify a bank transfer and any changed payment instructions",
        "paragraphs": [
          "Compare the beneficiary and account details with the signed instructions held by your finance team. For a new or changed account, contact the seller through an established channel, using a number obtained independently of the payment message. Keep a record of the verification.",
          "IC3 warns that legitimate email accounts can be compromised. A familiar email thread is not sufficient confirmation of a bank change. If instructions conflict, pause the transfer until the seller and your finance team resolve them. If a suspicious transfer has already been made, contact the originating bank promptly."
        ],
        "sources": [
          "fraud"
        ]
      },
      {
        "heading": "Approve substitutions and delays as contract changes",
        "paragraphs": [
          "Use a written contract amendment or revised offer for a substitute vehicle, revised price or changed dispatch date. Identify the old and proposed details. A replacement used car needs its own VIN and condition review; a different EV version can require another charging and destination check.",
          "Record the buyer's decision and the effect on amounts already paid. Resolve the cancellation terms and refund terms in the actual agreement before the next transfer, including who acts and what evidence is needed."
        ],
        "links": [
          {
            "label": "Check the revised export quote",
            "href": "/export-services/buying-guide/compare-car-export-quotes/"
          },
          {
            "label": "Verify a replacement used car",
            "href": "/export-services/buying-guide/verify-chinese-used-car-before-payment/"
          }
        ]
      },
      {
        "heading": "Amend the order before changing the money or the car",
        "items": [
          "Identify the requested change against the original contract: VIN, trim, quantity, price, delivery point, payee or timing. Preserve the earlier version.",
          "Assess the consequences for destination eligibility, charging, inspection, freight, tax estimate and support. A substitute vehicle may need a fresh review.",
          "Record the agreed price difference, evidence, revised dates, costs and the buyer’s acceptance in a written amendment. State what happens if the replacement is not accepted.",
          "Independently verify changed bank instructions using a known contact obtained before the change. IC3 identifies compromised email and payment redirection as business-email-compromise risks.",
          "For a refund or cancellation, define the trigger, refundable amount, permitted deductions, deadline, currency and bank charges in the contract. Save payment and acknowledgment records; do not assume a payment product guarantees recovery."
        ],
        "sources": [
          "fraud"
        ],
        "links": [
          {
            "label": "Recheck a substituted vehicle",
            "href": "/export-services/buying-guide/check-car-import-eligibility/"
          },
          {
            "label": "Reconcile a used unit’s identity and records",
            "href": "/export-services/buying-guide/verify-chinese-used-car-before-payment/"
          }
        ]
      },
      {
        "heading": "Questions before paying for a car from China",
        "sources": [
          "documents"
        ],
        "questions": [
          {
            "question": "Is a car deposit refundable?",
            "answer": "Check the written terms for your order, including what happens if the car is unavailable, fails an agreed inspection or cannot meet a condition. Ask the seller to resolve unclear wording before payment. Do not assume one refund policy applies to every supplier."
          },
          {
            "question": "Does a pro forma invoice prove the car is ready to ship?",
            "answer": "Treat it as part of the proposed commercial terms. Request the vehicle identification, preparation, inspection and booking evidence required by your order before approving the relevant stage. Check the status of each item separately."
          },
          {
            "question": "What should I retain after a transfer?",
            "answer": "Keep the approved instructions, verification record, bank reference and seller’s acknowledgement with the contract. Reconcile the amount received, fees and remaining balance before the next payment request."
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Plan the order-to-arrival stages",
        "href": "/export-services/buying-guide/how-to-buy-cars-from-china/"
      },
      {
        "label": "Prepare the shipment document file",
        "href": "/export-services/buying-guide/car-import-documents-checklist/"
      }
    ]
  },
  "vehicle-arrival-checklist": {
    "title": "Car Delivery Checklist: Arrival Inspection After Import",
    "description": "Use a car arrival checklist for release, VIN matching, condition photos, keys and accessories, then route damage, shortages and technical faults with evidence.",
    "answer": "Prepare the release file and departure condition record before collection. At receipt, match the VINs, document visible condition and count keys and agreed accessories before closing the handover record. Notify the responsible parties promptly under the actual contract, carrier and insurance terms, with a separate record for each discrepancy.",
    "image": "ports",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "carrier",
        "label": "Höegh Autoliners, customer guidelines and cargo claims handling process",
        "href": "https://www.hoeghautoliners.com/customer-centre"
      },
      {
        "id": "documents",
        "label": "International Trade Administration, common export documents and their purposes",
        "href": "https://www.trade.gov/common-export-documents"
      }
    ],
    "sections": [
      {
        "heading": "Prepare the receiving file before the cars arrive",
        "paragraphs": [
          "The receiving file should include the bill of lading or transport reference, VIN list, departure photographs, accepted findings and supplied-item inventory. Confirm customs release, collection authority and terminal access with the responsible parties before arranging the collection.",
          "Set the collection window and identify outstanding charges, including possible port storage charges. A VIN check and a record of missing accessories should be completed at the earliest permitted handover. Note any access limits so the next inspector knows what remains unchecked."
        ],
        "sources": [
          "documents"
        ],
        "table": {
          "caption": "Vehicle arrival inspection checklist",
          "headers": [
            "Check",
            "Record at collection"
          ],
          "rows": [
            [
              "Identity and count",
              "VIN for each unit, model, quantity, collection location, date and time."
            ],
            [
              "Visible condition",
              "Walkaround photographs, affected panels, glass, wheels and any accessible concerns."
            ],
            [
              "Mileage and indicators",
              "Displayed odometer and warning messages where access and operation are permitted."
            ],
            [
              "Supplied items",
              "Agreed keys, tools, charging equipment, manuals and other listed accessories."
            ],
            [
              "Handover",
              "Receiving party, transport reference and any discrepancy noted through the required process."
            ],
            [
              "Next action",
              "Who receives the report and whether a further inspection or other instruction is needed."
            ]
          ]
        }
      },
      {
        "heading": "Match each car with its departure condition record",
        "paragraphs": [
          "Photograph both the vehicle reference and the area being assessed. Compare the arrival views with the departure record, then retain the proof of delivery and any recorded exceptions. State if the underside, cabin or a test function could not be checked at that location.",
          "For a container, have the responsible party record the container seal and reference as applicable, along with opening and unloading evidence. Follow the terminal and packing provider's instructions. Vehicle collection and return of empty equipment can involve separate deadlines and charges."
        ],
        "links": [
          {
            "label": "Review the chosen shipping arrangement",
            "href": "/export-services/buying-guide/container-vs-roro-car-shipping/"
          }
        ]
      },
      {
        "heading": "Inspect in an order that preserves the receiving evidence",
        "items": [
          "Confirm collection authority, release status and safe access with the terminal or carrier. Bring the accepted VIN list, departure photos and accessory inventory.",
          "Record the date, location and receiving parties. Match each VIN before comparing general exterior views and close-ups from equivalent angles.",
          "Count keys, charging cables and other items in the agreed inventory. Record missing or substituted items and any limits on access or testing.",
          "Use the receiving party’s process to note visible discrepancies on the handover record. Keep your own photos and record if a comment cannot be added.",
          "Where safe and permitted, complete the agreed operation checks. Refer suspected battery damage, leaks, severe damage or unsafe operation to the responsible qualified provider before driving, charging or moving the car further."
        ]
      },
      {
        "heading": "What to do about transport damage or a missing item",
        "paragraphs": [
          "Send a notice of claim or initial damage notification through the procedure required by the actual carrier and marine cargo insurance policy. Include the VIN, shipment reference, discovery time and photographs, with the departure and receiving records. Establish whether a survey or further inspection is needed before repair or onward movement.",
          "Höegh Autoliners publishes its own claims guidance; another carrier or insurer can require a different process. Use the instructions and deadlines for your shipment. Keep transport damage, a vehicle fault and missing sales-order items separately identified so each reaches the appropriate provider. Leave an unresolved cause recorded as unresolved."
        ],
        "sources": [
          "carrier"
        ],
        "links": [
          {
            "label": "Prepare an after-sales request",
            "href": "/export-services/buying-guide/car-warranty-and-after-sales/"
          }
        ]
      },
      {
        "heading": "Finish the local handover and registration work",
        "paragraphs": [
          "Have the broker confirm the remaining clearance and registration steps. Keep the final invoice, vehicle list, transport documents and local records together by VIN. Clearance from a terminal does not, by itself, establish that the car is ready for road use.",
          "For an EV, arrange the agreed commissioning and charging check with the appropriate provider. Give the next owner or fleet team the manuals, verified equipment information, maintenance records and support contact supplied for that vehicle. Record anything still outstanding before closing the purchase file."
        ],
        "links": [
          {
            "label": "Check the destination registration route",
            "href": "/export-services/buying-guide/check-car-import-eligibility/"
          },
          {
            "label": "Review the charging setup",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          }
        ]
      },
      {
        "heading": "Send the issue to the right party with one evidence file",
        "paragraphs": [
          "Retain invoice, transport reference, VIN, photos, the receiving record and correspondence under one issue number. Obtain instructions before a non-essential repair or disposal removes evidence. Take necessary safety action through the responsible local professionals and record what was done.",
          "Carrier notice, insurance claim and seller-remedy procedures can have different recipients and deadlines. Read the actual terms and ask for written instructions promptly. No single claim period in a general checklist can replace those shipment-specific requirements."
        ],
        "table": {
          "caption": "Arrival discrepancy triage",
          "headers": [
            "Issue",
            "Initial record and follow-up"
          ],
          "rows": [
            [
              "New visible transport damage",
              "Compare departure and arrival evidence; notify carrier, insurer and commercial contact as applicable. Ask for the required survey and claims procedure."
            ],
            [
              "Missing key, cable or other agreed item",
              "Compare inventory and handover records; establish where the item was last recorded and request the agreed remedy."
            ],
            [
              "Wrong VIN, trim or quantity",
              "Notify the seller and importer; reconcile the physical units and documents before registration or further distribution."
            ],
            [
              "Warning or fault discovered after receipt",
              "Record mileage, symptoms and diagnostics through a qualified provider; review the inspection, transport evidence and applicable support terms without presuming the cause."
            ]
          ]
        },
        "links": [
          {
            "label": "Prepare a technical support request",
            "href": "/export-services/buying-guide/car-warranty-and-after-sales/"
          },
          {
            "label": "Check the release and registration file",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          }
        ]
      },
      {
        "heading": "Questions about collecting imported cars",
        "questions": [
          {
            "question": "Should I wait until the car reaches my showroom to check it?",
            "answer": "Arrange the earliest permitted receiving inspection and record where the condition was checked. A later showroom inspection may still be needed, but preserve the evidence from each handover. Ask the carrier or insurer how to record an issue discovered later."
          },
          {
            "question": "What if the car cannot be started at collection?",
            "answer": "Record the condition and notify the responsible party. Ask for handling and diagnostic instructions from the appropriate provider rather than assuming the cause. Confirm any additional movement or inspection before it is arranged."
          },
          {
            "question": "Is every arrival problem covered by shipping insurance?",
            "answer": "Check the policy, exclusions, insured journey and evidence requirements. Report the facts and let the relevant provider review the issue. Keep any sales-order or warranty request distinct so it reaches the right contact."
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Review the import document file",
        "href": "/export-services/buying-guide/car-import-documents-checklist/"
      },
      {
        "label": "Shipping and delivery services",
        "href": "/export-services/shipping-support/"
      }
    ]
  },
  "car-warranty-and-after-sales": {
    "title": "Imported Car Warranty and After-Sales Support: What to Confirm",
    "description": "Check imported-car warranty by VIN and market, identify who pays diagnosis and repair, verify parts fitment and agree a practical after-sales process.",
    "answer": "Get written support terms for the actual VIN, market and use. Identify who diagnoses a fault, authorizes work, supplies parts and pays labour, freight and other costs. Manufacturer coverage, seller support and a local workshop arrangement can have different scopes, so confirm each separately before purchase.",
    "image": "battery",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "warranty",
        "label": "Toyota Ireland, warranty eligibility for vehicles originating outside the Pan-European market",
        "href": "https://www.toyota.ie/faq"
      },
      {
        "id": "carrier",
        "label": "Höegh Autoliners, customer guidelines and cargo claims handling process",
        "href": "https://www.hoeghautoliners.com/customer-centre"
      },
      {
        "id": "recall",
        "label": "NHTSA: VIN recall lookup scope and exclusions, including international vehicles",
        "href": "https://www.nhtsa.gov/recalls"
      }
    ],
    "sections": [
      {
        "heading": "Who will support the imported car in your market?",
        "paragraphs": [
          "The support file should name the provider, applicable terms and contact for the version being supplied. Record coverage eligibility for its origin, registration history and intended use, along with the local workshop or diagnostic provider.",
          "Parts availability is only one part of the arrangement. Establish access to suitable diagnostic software, the repair authorization process and who pays labour costs, testing and transport. A parts-only commitment needs a budget for the work your business will arrange locally."
        ],
        "table": {
          "caption": "Imported car warranty and support checklist",
          "headers": [
            "Question",
            "Written confirmation to request"
          ],
          "rows": [
            [
              "Eligibility",
              "Covered vehicle, destination, owner or use restrictions and required maintenance history."
            ],
            [
              "Coverage period",
              "Start date, time and mileage limits, and any separate component terms."
            ],
            [
              "Covered costs",
              "Diagnosis, parts, labour, shipping, duties, travel or other charges actually included."
            ],
            [
              "Local repair",
              "Workshop, required approval, evidence to submit and permitted repair process."
            ],
            [
              "Parts supply",
              "Correct part identification, availability, quote, freight and return conditions."
            ],
            [
              "Claims",
              "Named provider, contact, reference process and decisions required before work."
            ]
          ]
        }
      },
      {
        "heading": "Allocate the cost of a repair before it is needed",
        "paragraphs": [
          "A written response can identify a real service gap before it becomes a vehicle problem. If no provider confirms an item, keep it as a buyer cost or unresolved support requirement in the purchase comparison rather than describing it as included."
        ],
        "table": {
          "caption": "Support questions for the written offer",
          "headers": [
            "Cost or action",
            "What the provider should state"
          ],
          "rows": [
            [
              "Diagnosis and fault evidence",
              "Approved workshop or tool, required report and who pays the diagnostic fee."
            ],
            [
              "Repair authorization",
              "Named contact, approval needed before work and treatment of urgent safety action."
            ],
            [
              "Parts",
              "New/replacement part basis, VIN fitment confirmation, supply responsibility and any exclusions."
            ],
            [
              "Labour, freight and import charges",
              "Whether each item is included, capped or payable by the buyer; identify return-shipping requirements."
            ],
            [
              "Vehicle downtime and local movement",
              "Any agreed support or limits. Do not assume replacement transport or lost revenue is covered."
            ],
            [
              "Battery and connected functions",
              "Covered components, applicable terms and the availability of supported diagnostic, software or account services for this market version."
            ]
          ]
        }
      },
      {
        "heading": "Do Chinese car warranties apply overseas?",
        "paragraphs": [
          "Check the terms for the actual car and market. Manufacturer distribution and warranty arrangements can be territorial. As one specific example, Toyota Ireland states that vehicles originating outside the Pan-European market do not have its manufacturer warranty cover in Ireland. That is an Ireland policy example, not a rule for every brand or destination.",
          "Ask the relevant provider to confirm your own case in writing. Keep separate any manufacturer coverage, seller commitment and local support you arrange yourself. If the offer uses the word “warranty” without identifying the provider or scope, request those details before comparing it with another car."
        ],
        "sources": [
          "warranty"
        ]
      },
      {
        "heading": "For an EV battery warranty, read the component terms",
        "paragraphs": [
          "Ask whether the traction battery has separate coverage, a capacity condition, a test method or restrictions on use and maintenance. Confirm the start date and eligibility for the individual vehicle. Do not assume that a headline battery term quoted for a local-market new car transfers to a China-market used unit.",
          "Keep the purchase-time battery report with the warranty evidence. If a later issue arises, the provider will need the vehicle reference, symptoms and the records it requests. A battery state-of-health estimate describes a measurement; it does not itself establish the provider’s coverage decision."
        ],
        "links": [
          {
            "label": "Read the battery health report",
            "href": "/export-services/buying-guide/used-ev-battery-report/"
          }
        ]
      },
      {
        "sources": [
          "recall"
        ],
        "heading": "Send a support request that can be assessed",
        "paragraphs": [
          "Provide the VIN, order reference, mileage, location and a dated description of the symptoms. Include warning messages, photographs and the qualified diagnostic report available, plus any relevant repairs or modifications since delivery.",
          "For a VIN lookup, recall check or service campaign inquiry, use the manufacturer or provider responsible for that vehicle's market version. Confirm whether the tool or provider covers international vehicles. An empty result in a database with a limited market scope does not establish a complete campaign history.",
          "Obtain the provider's next instruction and repair authorization before committing to reimbursable work. For a parts quote, match the part number to the actual car and identify freight, duties and local fitting costs. Keep the battery warranty response separate where it has its own component terms."
        ],
        "items": [
          "Keep each request under one reference with the provider’s response and agreed next action.",
          "Retain service and repair records, including work carried out at destination.",
          "Confirm any return, freight or reimbursement conditions before authorizing the work."
        ],
        "links": [
          {
            "label": "Contact the after-sales team",
            "href": "/export-services/after-sales/"
          }
        ]
      },
      {
        "heading": "Separate an arrival discrepancy from a vehicle warranty issue",
        "paragraphs": [
          "If damage is found at collection, preserve the receiving and departure records and follow the applicable carrier and insurance process. A transport claim and a vehicle warranty request may have different contacts and conditions. Ask the relevant parties to assess the evidence rather than assuming one route covers everything."
        ],
        "sources": [
          "carrier"
        ],
        "links": [
          {
            "label": "Use the arrival inspection checklist",
            "href": "/export-services/buying-guide/vehicle-arrival-checklist/"
          }
        ]
      },
      {
        "heading": "Match parts and service information to the actual vehicle",
        "paragraphs": [
          "For a parts enquiry, provide the VIN, exact version, component location, clear photographs and any legible part number. Ask the supplying party to confirm fitment using the relevant parts information. A same-name model sold locally can use a different component or software version.",
          "For the first fault, record the date, mileage, symptoms, warning messages and circumstances, then obtain the qualified diagnostic report requested by the support provider. Seek repair authorization and a written allocation of costs before ordering non-essential work. Keep replaced-part evidence where required by the claim process.",
          "Ask the manufacturer or responsible market representative how to check recalls and service campaigns for this VIN. NHTSA’s US VIN lookup lists international vehicles among its coverage limitations. A no-result search in an unrelated market does not establish that the China-market unit has no outstanding campaign."
        ],
        "sources": [
          "recall"
        ],
        "links": [
          {
            "label": "Separate an arrival discrepancy from a service request",
            "href": "/export-services/buying-guide/vehicle-arrival-checklist/"
          }
        ]
      },
      {
        "heading": "Questions about after-sales support for an imported car",
        "questions": [
          {
            "question": "Can a dealer repair the car and claim the cost later?",
            "answer": "Confirm the approval and reimbursement process with the provider before arranging work. Ask which evidence, workshop and cost authorization are required. Keep urgent handling or safety instructions from the qualified provider with the case record."
          },
          {
            "question": "What if the seller only offers spare parts?",
            "answer": "Ask which parts, how they are identified, who pays freight and duties, and who handles local diagnosis and fitting. Record those boundaries and budget for the work left to your business."
          },
          {
            "question": "Does a used car keep its remaining original warranty?",
            "answer": "Have the provider check the VIN, origin, ownership, destination, use and maintenance records. Transferability and territorial eligibility come from the applicable terms. Treat unconfirmed remaining coverage as an open purchasing question."
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Compare the support in export quotes",
        "href": "/export-services/buying-guide/compare-car-export-quotes/"
      },
      {
        "label": "Browse destination guides",
        "href": "/export-services/buying-guide/#country-guides"
      }
    ]
  }
};
