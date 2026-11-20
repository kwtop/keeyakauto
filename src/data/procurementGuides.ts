import type {GuideEditorial} from './guideEditorial';

// Buying Guide article text. Sources and section citations are maintained with each article.
export const procurementGuides: Record<string, GuideEditorial> = {
  "exw-fob-cif-car-shipping": {
    "title": "EXW, FOB and CIF Car Shipping: Costs and Responsibilities",
    "description": "Compare EXW, FOB and CIF car shipping from China: delivery and risk points, named ports, CIF insurance and a clearly qualified cost example.",
    "answer": "Under EXW you arrange collection and most of the transport. Under FOB the seller delivers the car on board at the named shipment port. CIF adds the seller’s freight and insurance to the named destination port. With both FOB and CIF, transit risk passes to you once the car is on board at origin. Before you pick the lower price, make sure both quotes reach the same endpoint with the same insurance.",
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
          "Always write the term with a named port or place and the Incoterms edition, for example “FOB Shanghai, Incoterms 2020”. “FOB China” doesn’t say which port, and “CIF destination” doesn’t say where the cars arrive. If the terminal or collection address changes the handling charges, name it as well.",
          "If you already work with a forwarder, FOB usually gives you more control over freight. CIF suits you if you’d rather the seller book the main sea carriage, as long as the sailing, destination charges and insurance work for you. Neither term sets payment terms, transfers ownership on its own or guarantees the car can be registered.",
          "If the cars go into containers and are handed to a carrier at a terminal before loading, talk about FCA at that handover point. A seller can still arrange the main carriage under a suitable C rule without risk moving to arrival. Pick the rule that matches where the cars are physically handed over, not the term printed on an old quotation."
        ],
        "sources": [
          "icc"
        ]
      },
      {
        "heading": "Which quote works out cheaper?",
        "paragraphs": [
          "Illustration only, in USD. Both offers below assume the same car, route, destination charges and a hypothetical tax amount, so the only difference is freight and insurance. In practice, a different assessable value can change duties and taxes too, so have your broker recalculate each real offer."
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
          "The CIF price is $1,200 above FOB. If you can buy freight and insurance yourself for less than that, with the same charges and cover, FOB comes out cheaper.",
          "If your forwarder can’t match the route, or your policy excludes damage you want covered, price that gap before you count on the $125 saving."
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
              "Port of destination. Name the port of shipment too."
            ],
            [
              "Who arranges main carriage?",
              "Buyer.",
              "Seller arranges and pays freight to the named destination port."
            ],
            [
              "Who obtains cargo insurance?",
              "Neither side has to insure under FOB. The buyer can arrange cover.",
              "Seller buys the default minimum cover, Institute Cargo Clauses (C) or similar, unless you agree different cover."
            ],
            [
              "When does transit risk pass?",
              "When the vehicle is on board the vessel at the port of shipment.",
              "Also once it is on board at the port of shipment, even though the seller pays carriage beyond that."
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
          "The named port and the real handover point have to match. FOB shipping means delivery on board the vessel at the shipment port. If the container is handed to a carrier at a terminal before it is loaded, use FCA when you arrange the carriage, or CIP when the seller arranges carriage and insurance. Write the chosen rule, the exact place and the Incoterms 2020 edition into the delivery terms.",
          "With CIF shipping the seller pays freight charges to the named destination port, but under the standard rule the risk transfer still happens at the shipment port. Check the marine cargo insurance evidence on its own: which journey is insured, the exclusions, the deductible and who handles claims. The quote should also show export clearance, unloading charges and the import clearance costs you pay."
        ],
        "sources": [
          "icc"
        ]
      },
      {
        "heading": "EXW vs FOB: what happens before the car reaches the ship?",
        "paragraphs": [
          "An EXW vehicle price stops at the seller’s named premises. Ask your forwarder to price collection, loading, the inland move and the export work you are left with. A cheap showroom price can hide several unpriced steps before the car reaches the ship, so confirm who will actually do them for this order.",
          "FOB names a port of shipment, and delivery happens on board the vessel. It is a rule for sea or inland-waterway transport. If a container is handed to a carrier at a yard or terminal, ask whether FCA fits that handover better. Write the rule, the named point and “Incoterms® 2020” together."
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
          "Give the seller the destination port you actually plan to use. Ask who the carrier or forwarder is, what routing they assume, when the quote expires and what you’ll pay on arrival. A CIF offer to one port can’t be compared with FOB plus freight to another port until you add the rest of the journey.",
          "Keep the insurance evidence with the quote. Check the insured value, the covered journey, the deductible, the exclusions and who handles a claim. If you need wider cover, get it priced before you accept the offer. Remember that who pays freight and where risk transfers are two different questions."
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
          "CIF under Incoterms® 2020 normally calls for minimum cargo cover similar to Institute Cargo Clauses (C), unless you agree broader cover. That won’t cover every scratch, mechanical fault or existing defect. Ask for the policy or certificate and check the insured value, excess, exclusions, claims contact and who is entitled to claim.",
          "A workable quotation line looks like this: “CIF [named destination port], Incoterms® 2020; [specified vehicle and quantity]; freight and insurance included; destination terminal handling, customs clearance, duties and inland delivery [included/excluded].” Fill in the brackets for your actual shipment, and put the evidence and payment terms in the contract."
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
            "answer": "No. Under standard CIF, you handle import clearance and pay for it. Get a separate destination estimate for duties, taxes, terminal release, local delivery and registration. If the seller offers any extra service, it should be listed in writing."
          },
          {
            "question": "Is FOB always cheaper than CIF?",
            "answer": "No. Compare freight, insurance and handling for the same route and the same cars. The example above is one comparison, not a current shipping rate. With a different forwarder or different insurance needs, your answer may come out the other way."
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
    "answer": "Start with the vehicle price, then add every cost it takes to reach one named endpoint: origin work, freight, insurance, destination clearance, taxes and local preparation or delivery. Mark each figure as confirmed, estimated or still missing. The calculator only adds up what you enter. It won’t work out a country’s tax rate or tell you whether the car can be imported.",
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
          "First decide where your budget ends: customs release, delivery to your yard, or a registered car. Write that endpoint, the quoted trade term and the exchange rate date at the top of the worksheet. Four cars delivered to a yard need different cost lines from one registered vehicle.",
          "Landed cost per car = vehicle price + origin charges outside the quote + freight charges and marine cargo insurance outside the quote + applicable import duty and taxes + destination handling and customs broker fees + local work in scope.",
          "Take import VAT and any other tax from the broker's calculation, along with the valuation basis and date. If your endpoint includes them, registration fees and inland transport belong in the budget too. A seller's port price doesn't cover these, so leave them marked as missing until someone quotes them."
        ],
        "sources": [
          "icc"
        ]
      },
      {
        "heading": "Work through a four-car example",
        "paragraphs": [
          "These figures are made-up budgeting inputs, not a supplier offer or a tax schedule. The USD 1,540 duty-and-tax allowance is an amount we assumed for this example. Don’t turn it into a percentage and apply it to another car or country.",
          "Assume four identical cars sharing freight and insurance equally, with all figures in illustrative USD. The tax line stands for the amount a broker would calculate under the destination’s rules. It is not a standard rate applied to the subtotal."
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
          "Enter every amount in one currency. In this worksheet, freight and insurance are costs for the whole batch. Put zero for anything already included in the unit price, and use your broker’s estimate for duties and taxes."
        ],
        "calculator": true
      },
      {
        "heading": "Audit the numbers before ordering",
        "items": [
          "Attach the dated offers from the seller, carrier and broker. Mark each line confirmed, estimated or missing.",
          "If a CIF quote already includes freight and insurance, delete those lines so you don’t count them twice, but keep any extra cover you’ve agreed.",
          "Ask the broker how they classified the car, what value and exchange rate they used, and what tax assumptions they made. Check registration and port charges separately.",
          "For a mixed batch, split shared charges the way the forwarder prices them, for example by unit, space or handling.",
          "Add a contingency line for things like storage or currency movement, and keep it apart from the confirmed costs."
        ]
      },
      {
        "heading": "What changes the car shipping cost from China?",
        "paragraphs": [
          "Give the forwarder the departure point, destination, number of cars, dimensions, powertrain and condition. Ask for a dated RoRo or container quote that states its booking assumptions. Then ask whether inland collection, loading, terminal handling, documents and destination release are included. A freight-only figure leaves all of that open, so your car shipping cost from China will look lower than it is.",
          "For a mixed batch, ask how the forwarder actually splits the charges. An equal split can hide the extra space or handling a larger vehicle needs. Keep a total shipment budget and a per-vehicle worksheet, and make sure they agree before you look at resale margins."
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
          "This car import cost calculator adds up the amounts you enter. It won’t classify the car or work out a country’s tax for you. Ask the destination broker for the classification, customs value, rates, fees and calculation date for the exact new or used vehicle you’re buying.",
          "Keep the broker’s tax worksheet next to the supplier’s quote. Note whether the broker included freight and insurance in the valuation, and which exchange rate they used. If the tariff, version, price or destination changes, ask for a new calculation rather than copying the old tax line into the new order.",
          "The destination guides help you prepare for that conversation, but they don’t replace a clearance estimate for your shipment. An exemption or personal import route that works for one buyer may not apply to a dealer’s commercial batch."
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
          "Charges that belong to one VIN stay on that car. A repair, inspection or registration fee for one vehicle shouldn’t disappear into a batch average. For freight that really is shared, write down how you agreed to split it, such as the forwarder’s chargeable space or an equal split you both know about.",
          "Hypothetical mixed batch: shared freight is USD 2,400 for two sedans and one larger pickup. If the forwarder’s agreed chargeable-space weights are 1, 1 and 2, allocate USD 600, USD 600 and USD 1,200. An equal split would be USD 800 each. Both add up to USD 2,400, but the margin on each car comes out different. Use the split that matches your booking, and stick with it when you compare resale costs."
        ]
      },
      {
        "heading": "Test the budget against freight and exchange-rate changes",
        "paragraphs": [
          "In the four-car example above, an extra USD 300 freight per car adds USD 1,200 to the batch budget, before any knock-on tax change. If a hypothetical USD 58,000 payment is converted at 5.00 units of local currency per USD, it costs 290,000; at 5.20 it costs 301,600. That 11,600 difference doesn’t include bank fees or changes to locally assessed taxes.",
          "Keep a cash total that includes the tax you pay at clearance. If a local accountant confirms you can credit or recover some of it later, show that separately in your margin analysis, with the timing and conditions. Money you might get back later doesn’t release the cars from the port today.",
          "Before you order, close the biggest gaps. For every estimate, know when the offer expires, which exchange rate it uses and who quoted it. Never put zero for a charge nobody has quoted. Keep the contingency apart from confirmed supplier prices so you can replace it as real quotes come in."
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
            "answer": "Mark it as missing in your purchasing worksheet and ask for the quote. A zero in the calculator adds nothing to the total, but that doesn’t make the service free. A total with missing items is an incomplete budget."
          },
          {
            "question": "Does a low vehicle price mean a better import margin?",
            "answer": "Not necessarily. Compare costs to the same endpoint, including any preparation, inspection and support you have to arrange yourself. Keep expected resale income apart from confirmed costs, and check the margin again if the route, exchange rate or tax estimate changes."
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
    "answer": "Agree in writing what will be checked on the actual VIN before you book the inspection. The report should cover identity, mileage, condition and operation, list what was found and what couldn’t be checked, and back it up with dated evidence. Then use it to decide, before the next payment or release: accept the car, ask for repair and a re-check, or turn it down.",
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
              "Sort out any mismatch with the seller and inspector."
            ],
            [
              "Odometer",
              "Dated reading and accessible maintenance, inspection or registration records.",
              "Ask about gaps, resets and records that don’t agree."
            ],
            [
              "Body and structure",
              "Walkaround, underbody access, repair observations and agreed paint readings.",
              "Agree which repairs you’ll accept, and get a price or a replacement car if needed."
            ],
            [
              "Mechanical operation",
              "Cold start, warning lamps, leaks, brakes, tyres and road test where permitted.",
              "Note what couldn’t be checked and who will follow up."
            ],
            [
              "Cabin and equipment",
              "Keys, HVAC, locks, cameras, controls and the equipment in the offer.",
              "Note missing items before you approve handover."
            ],
            [
              "Electrified vehicle",
              "Battery report or agreed diagnostics, charge test where available, visible damage and faults.",
              "Agree a further test, or walk away if serious risks are still open."
            ]
          ]
        }
      },
      {
        "heading": "Agree on the inspection and release criteria",
        "paragraphs": [
          "Before you pay for the inspection, agree who the inspector is, where the car is, the checklist and how the evidence will be presented. Confirm what access they’ll have, especially for an underbody check, battery diagnostics or a road test. A good report separates a pass, a finding and a check the inspector couldn’t do.",
          "China’s used vehicle export framework calls for a third-party product inspection report. Ask the exporter which export report applies, and agree any extra checks your purchase needs. A report prepared for export doesn’t decide whether your country will register the car.",
          "With a batch, inspecting a sample tells you nothing certain about the cars nobody looked at. Decide which identity, damage and operation checks every VIN gets, which deeper tests can be sampled, and who signs off an exception. The inspection company’s service and the statutory export inspection are two different things, so confirm what each one covers."
        ],
        "sources": [
          "used-export"
        ]
      },
      {
        "heading": "What to save at handover",
        "items": [
          "File the dated inspection, photos and written acceptance together under each VIN.",
          "If repairs were agreed, ask for the repair record and a re-check of that work before release.",
          "If time has passed since the inspection, ask for a fresh condition record at handover."
        ]
      },
      {
        "heading": "Pre-purchase inspection or pre-shipment inspection?",
        "paragraphs": [
          "A used car pre-purchase inspection helps you decide whether to take a specific car and what repairs or price changes to ask for. A pre-shipment inspection, done close to dispatch, checks that car against the condition and release terms you agreed. When you book, say which of these decisions the inspection is for.",
          "If one report has to do both jobs, note its date and what happens between inspection and loading. In that gap a car can be moved, repaired or swapped. Ask for new identity and condition photos at handover, and a re-check of any agreed work."
        ]
      },
      {
        "sources": [
          "used-export",
          "inspection-scope"
        ],
        "heading": "Ask for findings you can act on",
        "paragraphs": [
          "Start with VIN verification and an odometer check against whatever records exist for that car. The report should show the photographed VIN, the reading, the date and anything that doesn't add up. The inspector should keep what they saw separate from what they conclude about the car's history.",
          "For paint thickness, ask for the panel, the measurement and a photo. If the inspector suspects accident damage, they should explain the physical evidence and what they couldn't reach. Only include an underbody inspection and OBD diagnostics if the provider has the equipment and permission and it's in the agreed scope. A clean scan or a single paint reading doesn't prove the car's full repair history.",
          "Then decide: accept the car as recorded, agree repairs and a re-check, order another test, or look at a replacement. Keep the road test result and every check that wasn't done in the same decision file."
        ],
        "items": [
          "For a road test, note whether it happened and any limits on route or speed.",
          "For a used EV, list the battery diagnostics and charging checks separately from the general walkaround.",
          "For a batch, say which checks every VIN gets. A report on one sample car doesn’t tell you the condition of the rest."
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
          "These are examples of how to handle findings, not universal pass limits. Set the real standards with the inspector for the model, age, use and budget. A report covers what the inspector could see and reach; it can’t rule out every hidden defect or confirm the full accident history.",
          "After a repair, keep the original finding, the repair invoice or work record, the new test result and your decision together. Before loading, check the VIN, odometer and visible condition against that file. If there is extra mileage or damage, get it explained; don’t overwrite the earlier record."
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
              "Save a close-up, its location and a description, then note that you accepted it or the price adjustment you agreed."
            ],
            [
              "Repair promised before shipment",
              "Write down the repair, who does it and by when; ask for evidence of the work and an independent recheck of the affected function."
            ],
            [
              "Warning lamp, abnormal operation or suspected structural damage",
              "Hold approval. Ask the qualified inspector what it means, what further test is needed and what they couldn’t check. A cleared warning light is not proof of repair."
            ],
            [
              "Road test, lift inspection or diagnostic scan not completed",
              "Mark it “not tested” and say why. Either arrange the missing check or have the buyer accept the risk in writing."
            ],
            [
              "VIN or registration record mismatch",
              "Don’t release the car until its identity and documents match."
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
            "answer": "No. Ask for an odometer photo and the dated records it was compared with. The inspector should point out gaps or entries that conflict. A current reading on its own can’t prove the car’s full mileage history."
          },
          {
            "question": "How much does a pre-shipment car inspection cost?",
            "answer": "It depends on the job. Ask for a quote that covers the location, number of cars, access, tests, report language and any re-inspection, and compare what each quote includes before you compare fees. If you need battery diagnostics, a lift inspection or a road test, name them in the request."
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
    "answer": "Compare real services you can actually book, on the same route to the same endpoint. Look at whether the carrier accepts your cars, the sailings, loading and securing, destination handling and the total cost. RoRo and container rules differ by carrier and by the car’s condition, so get the carrier’s acceptance before you treat a freight estimate as a booked shipment.",
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
              "Ask which terminal receives the cars, the cutoff and who records their condition.",
              "Ask who collects the cars, where they are packed and who provides the packing record."
            ],
            [
              "What is included in the rate?",
              "Get the terminal, document, transfer and vehicle release charges.",
              "Get the equipment, packing, securing, terminal and unpacking charges."
            ],
            [
              "What does the policy cover?",
              "Compare insured value, deductible, loading or unloading cover, and any exclusions.",
              "Check the same points, plus cover for the agreed packing and transport route."
            ],
            [
              "Who collects and when?",
              "Confirm collection authority, deadline and storage terms.",
              "Confirm who handles release, free time, unpacking and returning the empty equipment."
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
          "Send the quantity, dimensions, weight, condition and powertrain for each vehicle. Say upfront if any car has battery damage, missing keys or doesn’t run.",
          "Ask for the named ports, any transshipment stops, how long the booking holds and which charges can change.",
          "Ask whether the route takes your exact vehicle type and what the carrier needs on the booking date. A quote on its own doesn’t reserve space."
        ]
      },
      {
        "heading": "Keep a condition record for both options",
        "paragraphs": [
          "Keep dated departure photos with the vehicle list and the bill of lading or other transport reference. For a container, the loading plan should show which cars are inside and the vehicle lashing arrangements. Get the packing and securing records too; the receiving team needs them to unload and compare condition.",
          "Price terminal handling charges, packing or unpacking, and any port storage that sit outside the freight offer. Check that the cargo insurance covers the same handover points and route. Electric vehicle shipping also needs the carrier's current instructions on battery status and condition. A quotation alone doesn't mean the carrier has accepted the car."
        ],
        "sources": [
          "ctu",
          "css"
        ]
      },
      {
        "heading": "How many cars fit in a container?",
        "paragraphs": [
          "Ask the loading provider for a plan based on the real length, width, height, weight and ground clearance of each model. It should cover the container, securing equipment, access for loading and unloading, and any limits on stacking or racking. Don’t price an order on a generic cars-per-container figure.",
          "For a mix of SUVs, sedans or vans, confirm which VINs go in each load. Ask for the loading photos and the agreed securing record. At the other end, someone needs an unloading plan and has to take charge of returning the empty equipment."
        ],
        "sources": [
          "ctu"
        ]
      },
      {
        "heading": "Shipping electric cars and non-running vehicles",
        "paragraphs": [
          "Get the carrier’s written acceptance for the exact powertrain and condition before you commit to a route. Supply the battery and damage information they ask for at booking. Ask what state of charge, keys, isolation or other preparation that service needs. Don’t assume a rule from another carrier or sailing applies.",
          "A car that can’t be driven may need different handling, or the service may refuse it. Mention the condition when you ask for a rate. Get any extra handling price and the carrier’s acceptance in writing; don’t assume a container or RoRo booking covers it."
        ]
      },
      {
        "heading": "Move from a freight estimate to a confirmed booking",
        "items": [
          "Send the forwarder the exact dimensions, weight, running condition, ground clearance and powertrain. Point out any battery damage, faults or modifications instead of listing every unit simply as a car.",
          "Get the carrier’s acceptance for that condition and route, plus the documents and preparation it needs. If they ask for battery test information, confirm exactly what evidence they want. One carrier’s battery charge limit doesn’t apply to every EV shipment.",
          "Confirm the booking reference, receiving location, vehicle and document cutoffs, planned vessel, and who tells you about a rollover or route change. A planned departure is not a guaranteed arrival date.",
          "For containers, have a competent loading provider approve the measured layout, access, securing points and equipment. The CTU and CSS guidance covers safe packing and securing; it doesn’t tell you how many cars will fit in your container."
        ],
        "sources": [
          "ctu",
          "css"
        ]
      },
      {
        "heading": "Price the delay and receiving work before choosing",
        "paragraphs": [
          "Ask whoever quoted to list origin storage, destination terminal storage, container detention and any other time-based charges, what triggers them and any free period. Names and tariffs vary, so ask for the actual schedule rather than going by the label.",
          "Decide in the order and transport brief who pays if documents are late, a receiving cutoff is missed, a car is refused or customs release is delayed. For container delivery, confirm unloading equipment, safe access and how the empty is returned. For RoRo, confirm who can collect, the release conditions and the move from the terminal.",
          "Keep the departure condition photos, keys and accessory list with the booking. They let the receiving team tell a mark that was already recorded from new damage that needs looking into at arrival."
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
            "answer": "It depends on the shipment. Compare complete quotes for the same vehicle list, handover points and dates, because RoRo and container offers can include different terminal, packing, securing and unpacking costs. Once those gaps are filled, run both through the landed-cost worksheet."
          },
          {
            "question": "How long will car shipping from China take?",
            "answer": "Ask for the proposed sailing, cutoffs, any transshipment and the estimated arrival. Add preparation, inspection, release and collection time on top. Check which dates are booked and which are estimates, and what happens if a sailing changes."
          },
          {
            "question": "Can spare parts travel inside the car?",
            "answer": "Only if the carrier and customs broker agree first. Write down what’s allowed, how it must be packed and how it’s declared. Don’t put unlisted goods in a car and assume the vehicle booking covers them."
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
    "answer": "Keep one vehicle register and check every invoice, transport and approval document against it. Give each document an issuer, a reviewer and a due date, then track whether it is a draft, an issued copy, an original or an accepted release. The China export file, the destination customs file and the road-registration file each do a different job.",
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
              "VIN, registration and the export inspection records that apply."
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
          "Ask who the exporter of record is and which licence and inspection rules apply to your cars. China’s published measures include used car licensing and third-party inspection requirements. For used vehicles applying for export within 180 days of registration, including day 180, the current notice calls for a manufacturer-issued after-sales maintenance service confirmation. China also applies export licensing to pure-electric passenger cars covered by Announcement No. 54.",
          "Send the draft commercial and transport documents to the importer before they are issued. Agree where originals or authenticated copies are needed and who fixes mistakes."
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
          "Give every car its own row: VIN, exact model and version, model year, first registration for used cars, powertrain, quantity, seller and consignee. Add the document numbers and any approved alternative. For a new-car order where VINs aren’t allocated yet, mark them pending and agree when the final list must be accepted.",
          "Check spelling and company names as carefully as the vehicle data. If the invoice names one importer, the transport release another and the approval a third, that is more than a typo to fix. Ask the issuer and the receiving broker to sort it out before the next cutoff."
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
              "Check the vehicle and party details. A draft doesn’t prove the final document has been issued."
            ],
            [
              "Issued copy",
              "Note the number, date and issuer, and check whether a copy is enough for the next step."
            ],
            [
              "Original or authenticated version required",
              "Note who receives it, how it is sent and by when. Allow time for translation or authentication if the receiving authority asks for it."
            ],
            [
              "Release or acceptance confirmed",
              "Save the confirmation from the issuer, carrier or broker, including any conditions still open."
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
          "The commercial invoice records the sale. The packing list or vehicle list shows what is shipped. The bill of lading or sea waybill records the transport. Before you approve the drafts, check that company names, quantities, ports and the vehicle identification number for each unit match across all of them, and that the consignee fits the release arrangement.",
          "A certificate of origin backs up an origin claim when one is needed. It does a different job from ownership documents, an export declaration or an import declaration. The exporter and destination broker should tell you who issues each record this shipment needs and in what form it will be accepted.",
          "If a car is swapped, update its order, inspection and shipment records together. Customs clearance and road registration can ask for different technical evidence. If the authority asks for a certificate of conformity, find out exactly which document and vehicle version it will accept. A China-market car doesn’t normally come with an EU certificate."
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
          "Ask the seller exactly which document it means by “export certificate,” who issues it and what it is for. A translated label could mean a registration, a licence, an inspection or something else. Then match it against what your destination authority or broker actually asks for.",
          "Customs clearance and road registration can need different evidence. Get the destination checklist for the exact version and importer before you pay for the car. If you need conformity or technical approval evidence, ask who can issue it and whether it covers the quoted vehicle. Don’t assume every car has an EU Certificate of Conformity."
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
          "Agree the bill of lading arrangement with the carrier or its authorized agent. With negotiable originals, settle who holds them and how they are surrendered. With a sea waybill or authorized electronic release, confirm how that process works. A PDF the seller emails you doesn’t prove the carrier has authorized delivery.",
          "Check drafts before the carrier’s amendment cutoff. If a VIN, consignee or quantity changes, update every record it affects and ask who pays amendment fees or delay costs. Never edit an issued certificate yourself. Keep the corrected version from the issuer and tell everyone holding the old one."
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
            "answer": "It depends on who receives the document. Have the broker, carrier and any payment provider confirm what they need for each one, and note the accepted format, delivery method and deadline before shipment. A scan is fine for checking a draft but may not be enough for final release."
          },
          {
            "question": "Who corrects a wrong VIN or consignee name?",
            "answer": "The issuer does, through the seller or forwarder, using its amendment procedure. Tell the broker which other documents carry the same detail. Keep the corrected, approved set together and check before arrival whether the change affects release."
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
    "answer": "The same VIN should appear on the offer, the registration and ownership papers, the inspection and the proposed export documents. Separately, confirm who the legal seller, the exporter and the bank beneficiary are. Clear up anything that doesn’t match before you pay. A VIN lookup, a video call or a business licence on its own doesn’t prove the whole deal is sound.",
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
          "Ask for a dated vehicle file: a photo of the VIN on the car, registration details, an odometer reading and condition photos. Ask the seller to confirm the quoted car is still available and whether they might swap in another one. If the car changes, run the identity and inspection checks again on the new VIN.",
          "Work from records the seller and inspector can lawfully access. A matching VIN tells you which car the records are about. Condition, mileage history and the right to sell each still need their own evidence."
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
              "The company named on the offer and its business registration details.",
              "Company details change, or the offer comes from a different company with no explanation."
            ],
            [
              "Authority over the car",
              "Registration or ownership papers, or written authority to sell.",
              "The seller can’t connect the VIN and the legal owner to the offer."
            ],
            [
              "Exporter of record",
              "The exporting company and the licence or export file that applies.",
              "The exporter can’t explain how it will get the records it needs."
            ],
            [
              "Bank beneficiary",
              "Payee information in the signed order. Confirm using an established contact.",
              "New instructions arrive through a different email, number or beneficiary."
            ],
            [
              "Payment milestone",
              "What evidence is due before each instalment, and the cancellation terms.",
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
          "China’s used-vehicle export framework ties the export application to vehicle and transaction records, including third-party inspection and contractual after-sales content. Ask the named exporter which records it will provide for this car. Checking the company’s registration doesn’t replace those vehicle-specific requirements."
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
              "Legal name, registration details, authority to sign and a reliable business contact. You should be able to trace any trading name back to the legal company."
            ],
            [
              "Registered owner and vehicle",
              "Ownership or transfer records linked to the VIN, and an explanation of why the seller is entitled to sell the car."
            ],
            [
              "Named exporter",
              "Who they are, their export qualification and who is responsible for the vehicle’s export licence and paperwork. Get any separate service arrangement in writing."
            ],
            [
              "Bank beneficiary",
              "Must match the instructions in the contract. If another company collects payment, ask for the written reason and verify it yourself before you transfer."
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
          "Ask the exporter for the registration date and the planned export application date. For a used export application within 180 days of registration, including day 180, China’s current notice requires an additional confirmation from the vehicle manufacturer covering destination after-sales service. Find out who will provide it before you treat the order as ready to export."
        ],
        "sources": [
          "recent-registration"
        ]
      },
      {
        "heading": "What a VIN check can tell you",
        "paragraphs": [
          "For a used car VIN check, start with a clear photo of the VIN on the actual car and compare it with the registration, the inspection and the written offer. If anything doesn’t match, get the seller to explain it. A model name or a decoder result isn’t confirmation on its own.",
          "A VIN decoder only reads the identity data coded into the number. It won’t confirm ownership, current condition, accident history or mileage. Ask which history records exist for that car, who supplied them and what dates they cover. A blank history result means missing evidence, not proof that nothing happened."
        ]
      },
      {
        "heading": "Build a mileage and condition timeline",
        "paragraphs": [
          "A vehicle history report is only as good as the records and dates it covers. Put the service, registration, inspection and repair entries in date order, keeping originals next to any translation. Compare the odometer readings over time with a current photo. A reading that doesn’t fit is a reason to dig further for odometer fraud. Keep any unexplained gap on your open-issues list until the records or inspection explain it.",
          "Compare any past damage with an independent inspection and the seller's written description. The file should show what evidence backs up accident, flood or mileage claims and what is still missing. Ownership documents and the seller's business registration prove different things, so keep both.",
          "Confirm which export license and vehicle records the named exporter will get for the actual export route. Bank account verification is a separate finance check, and it matters most if the beneficiary changes. For every open item, agree the next step before any money is due."
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
          "Before the first transfer, check that the legal seller, contract reference and beneficiary line up. If payment instructions change, call a contact you already know on a number you already have, not one in the new message. Ask them to confirm the change, and to document the relationship if the payee isn’t the seller. IC3 recommends verifying account changes through a separate channel."
        ],
        "sources": [
          "payment-verification"
        ]
      },
      {
        "heading": "Resolve a discrepancy without losing the earlier evidence",
        "paragraphs": [
          "A later odometer reading that is higher than an earlier one may just mean the car was driven; ask for the dates, units and reason. A later reading that is lower, an unexplained VIN difference or a missing ownership link needs looking into. Keep both records. Don’t accept a new image that simply makes the contradiction disappear.",
          "Each issue ends one of three ways: you accept an explanation backed by evidence and note it; you ask for a specific document or independent check before going further; or you turn the car down. If the seller swaps in another car, repeat the identity, condition and eligibility checks on its VIN. Don’t carry over the first car’s approval.",
          "For a car registered 180 days or less before its export application, make sure the manufacturer-issued after-sales confirmation required under the notice effective 1 January 2026 is in place. That is an extra export-document condition. It doesn’t make a nearly unused car count as new in the destination market."
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
            "answer": "Not necessarily. “Zero mileage” describes the odometer, not the car’s legal status or whether your country will accept it. Ask for the registration history and export route, check the current rules for recently registered vehicles with the exporter, and compare the car’s support terms with a new-car offer."
          },
          {
            "question": "What if the quoted car is sold before I pay?",
            "answer": "Have the seller name the replacement and send a revised offer. Run the VIN, record and inspection checks again on that car. Your approval of the first car doesn’t carry over to a substitute."
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
    "answer": "A used EV battery-health percentage means little until you know how it was measured and against what. Check that the report matches the VIN and the pack actually fitted, then look at usable capacity, faults, temperature and which charging tests were completed. A high charge level or a good dashboard range doesn’t prove how much capacity the battery has kept, how long it will last or whether the warranty applies.",
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
              "Name of the metric, baseline, data source and method. Is it a diagnostic estimate or a measured capacity test?"
            ],
            [
              "Test conditions",
              "State of charge, temperature, equipment and anything that limited the check."
            ],
            [
              "Warnings or damage",
              "Diagnostic faults, visible underside or enclosure damage, and anything the inspection didn’t cover."
            ],
            [
              "Charging",
              "AC and DC tests if agreed and possible. Note which charger was used and what actually completed."
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
          "A state-of-health value only makes sense once you know its reference and method. Dashboard remaining range moves with driving and conditions. To compare two used EVs, use the same diagnostics on both, or ask the inspector how the different methods affect the comparison.",
          "If the pack has been replaced, ask for the service record and check that the report covers the pack now fitted. If there are open warnings, physical damage or a missing test, ask the provider what it can still verify before you accept the car."
        ]
      },
      {
        "heading": "Read a capacity result with its reference attached",
        "paragraphs": [
          "Hypothetical example: a qualified provider measures 55.2 kWh of usable energy and compares it with a 60.0 kWh usable-energy reference for the same pack and compatible test conditions. The ratio is 55.2 ÷ 60.0 × 100 = 92%. That figure describes this one energy comparison. It doesn’t mean the car will reach 92% of its advertised range, and it says nothing about remaining service life.",
          "Ask where both numbers came from. A gross nameplate capacity, a usable-energy reference and an estimate from the battery-management system can measure different things. A report that just says “92% SOH” with no baseline can’t be checked from a dashboard photo.",
          "The government-hosted technical recommendations discuss a harmonized certified-energy metric under UN GTR No. 22, which shows why definitions matter. A seller’s diagnostic printout should still state its own method and scope. Quoting a regulation doesn’t turn it into an independent certification of that used car."
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
          "A good test on one charger only proves the car charged on that setup. Check the car’s actual inlet against the chargers at your destination.",
          "Before booking, ask the carrier what it accepts for the car’s condition and battery status.",
          "File the report and charging result under the VIN with the rest of the inspection evidence."
        ]
      },
      {
        "heading": "State of charge, battery health and range are different readings",
        "paragraphs": [
          "State of charge is how full the battery is right now. A battery state-of-health figure is its condition against whatever reference the report uses. A battery can be nearly full and still have lost a good part of its original usable capacity.",
          "Ask whether the EV battery health check reports usable energy, some other capacity measure or a diagnostic estimate, and ask for the baseline and units. If two reports use different definitions, have the testing provider tell you whether the figures are comparable before you rank the cars by percentage.",
          "Treat dashboard remaining range as a reading taken under particular conditions, nothing more. For the buying decision, ask separately for evidence of battery condition and of the range you need. A manufacturer’s range figure and the range shown after a recent drive answer different questions."
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
          "A battery diagnostic report should name the pack fitted and explain each measurement. If it reports battery cycle count, battery temperature or cell voltage imbalance, keep the units and test conditions with them. The provider should tell you which limits apply to that pack and method. Leave missing fields marked as unavailable. No single diagnostic value predicts remaining life.",
          "To judge battery degradation, compare usable battery capacity only against a stated reference, using a compatible method. If a result can’t be explained, the qualified testing provider should say what to check next. A dashboard photo and a measured capacity test tell you different things, so get comparable evidence before choosing between cars.",
          "Record the DC fast charging result separately from the health estimate, with the charger used and any limits you saw. Battery warranty eligibility depends on the provider's written terms for that VIN and market. When you approve the purchase, keep the report, charging result and warranty answer together."
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
              "Ask each provider for the metric definition and baseline, and get results on a compatible method before ranking percentages."
            ],
            [
              "Unknown test temperature, SOC or date",
              "Ask for the original test record and its conditions. If they can’t be found, note that gap."
            ],
            [
              "Pack replacement or software change",
              "Get a new report that matches the fitted pack and its service history, and find out which earlier results still count."
            ],
            [
              "Fault, enclosure damage or unexplained cell readings",
              "Have a qualified EV technician set out a safe further assessment. Never open or probe the high-voltage pack yourself."
            ],
            [
              "Only a successful fast-charge session",
              "Keep the charger, time, starting/ending SOC and any restrictions as proof the car charges. If you need capacity evidence to accept the car, ask for it separately."
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
            "answer": "There is no single answer. Set your own pass level for how you’ll use the car and the test method you’ve agreed, then weigh the result with faults, damage, repair history, charging and support. One percentage is not a universal pass mark or a forecast of remaining life."
          },
          {
            "question": "Does a battery health report prove that a warranty applies?",
            "answer": "No. Ask the warranty provider to confirm cover for the VIN, market, ownership, use and maintenance history. The report is evidence of condition. Whether the warranty applies, and any capacity threshold, depends on the written warranty terms."
          },
          {
            "question": "Can a healthy used EV charge at my destination?",
            "answer": "Only if its connectors match. Check the car’s actual AC and DC inlets against the chargers you plan to use; a healthy battery doesn’t tell you that. Save the confirmed charger pairing in the vehicle file."
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
    "answer": "Send one brief per exact version, with quantities, destination, required equipment, new or used, and the named delivery point. Keep must-haves apart from alternatives you’d accept. Ask the supplier to say which units they have now and which they still need to source, how long the quote holds, and every cost or approval left for you.",
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
          "Say what would make a car useless to you: an import route your country won’t accept, the wrong steering side, a missing safety feature, unsuitable charging equipment or a different seating layout. Put these ahead of preferences such as paint colour. For used cars, set the condition evidence you need as well as age and mileage limits.",
          "Illustrative brief: “Three five-seat hybrid sedans in the specified trim and one gasoline four-wheel-drive SUV; left-hand drive required; two listed exterior colours acceptable; no drivetrain substitution; quote to the same named port.” This is only a sample request, not a statement of KEEYAK stock or minimum order. Your completed RFQ should carry your real versions and quantities.",
          "If your broker hasn’t checked the exact version yet, say the review is pending and list the documents the supplier must send back. You can ask for prices while that review runs, but a price request is not approval to ship."
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
              "Exact trim, model year, equipment and quantity by version. Ask which details are still to be confirmed."
            ],
            [
              "Delivery basis",
              "Named place, included services, freight or insurance if quoted, and the destination costs you still pay."
            ],
            [
              "Used vehicle evidence",
              "VIN-linked photos, first registration, mileage and agreed inspection evidence for each proposed unit."
            ],
            [
              "Schedule and payment",
              "When the offer expires, estimated handover, who gets paid and what evidence is due before each payment."
            ]
          ]
        },
        "paragraphs": [
          "Ask the supplier to mark each line with where it stands: VIN allocated and location known; car proposed but not yet inspected; or model still being sourced with no car allocated. Ask who can confirm that and when it will be checked again. A catalogue image or a general model price doesn’t mean a car is reserved for you."
        ]
      },
      {
        "heading": "Compare the same order before choosing",
        "paragraphs": [
          "If one quote allows a substitute and the other names an exact trim, agree which version you’ll accept before comparing prices. If a supplier quotes a cheaper port or route, ask for the cost to your original handover point before comparing totals."
        ]
      },
      {
        "heading": "Describe the batch a supplier can actually quote",
        "paragraphs": [
          "When requesting wholesale cars from China, break the quantity down by exact model and version. Say which colors, equipment and alternatives you’ll accept. Give every supplier the same destination and target handover window. If the quantity isn’t final, say what the first order needs and what might come later.",
          "Ask the China car exporter who the contracting seller and exporter of record are, and what role it will play itself. Ask for a reply that separates cars already identified from cars still to be sourced. A showroom photo or catalog entry doesn’t prove there is stock for the quantity you need.",
          "For used cars, set limits on registration age, mileage and condition, and ask for a proposed VIN list with records for each car. For EVs, include charging compatibility and the battery evidence you need. “Electric” alone is not a purchasing specification."
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
          "Name the importer and how the cars will be used, then add the destination port and any inland delivery. Set out the inspection requirements and payment terms you want suppliers to answer. If you give a target price, state the currency and whether it is for the car alone or the full cost at destination.",
          "If you want EXW, FOB and CIF options, ask for a separate price for each, with its named place and quote validity, and keep the vehicle specification the same across them. Ask for the minimum order quantity for that version and availability. A batch price doesn’t automatically apply to one car."
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
          "One line for each requested trim and quantity, including any shortfall or proposed alternative, with the original requirement shown next to the change.",
          "Unit price, currency, validity, named Incoterm endpoint and any extras priced separately. Freight estimates that may change before booking should be flagged.",
          "The evidence available now, and what is due before deposit, balance or release: version sheet, VIN allocation, inspection, ownership and export documents, whichever apply.",
          "An estimated readiness window and what it depends on, such as allocation, inspection or document review. Keep this apart from a confirmed carrier booking."
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
            "answer": "No. Ask for the minimum quantity and how pricing works for that model, its availability and the shipment. Don’t assume a batch price applies to one car, and keep your first order separate from any possible future volume."
          },
          {
            "question": "Should I include a budget in the RFQ?",
            "answer": "You can. State the currency and whether the budget covers the car only or the full cost at destination. Ask the supplier to quote the specification you asked for and list any alternatives separately. That way a lower price can’t quietly change the car or what’s included."
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
    "answer": "Check the car’s actual inlet, charging mode and supported communication against the chargers you’ll really use. Type 2 AC and CCS2 DC are separate checks, and a China-market version can differ from the export model with the same name. If someone proposes a GB/T adapter, confirm its direction, electrical limits and that it works with that exact car and charger.",
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
              "Photo and manual for the actual trim, the inlet standard and the onboard charger limits.",
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
              "Written confirmation from the equipment supplier or charger operator, including any limits."
            ],
            [
              "Commissioning",
              "Test results from the agreed car and charger pairing.",
              "Who can inspect the installation, test it and support it after delivery."
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
          "Ask for separate photos of the AC and DC inlets if the car has both. The export version of a model can differ from the domestic one, so confirm the equipment on the quoted trim, and on the VIN once you have it. Type 2 AC and CCS Combo 2 DC are separate checks even when the car has a combined inlet.",
          "A plug that fits doesn’t mean the car and charger will talk to each other. Before you rely on an adapter, get written compatibility and a supervised test with the equipment you’ll use. Don’t plan a fleet order around a conversion nobody has tested."
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
          "For AC charging, the supply, the installed equipment, the cable and the car’s onboard charger can each limit power. A higher-rated wallbox won’t push more power through a lower-rated onboard charger. Ask for the supported phases, voltage and current, and get the local installation assessed.",
          "The SAMR listing checked for this revision marks GB/T 20234.2-2015, the AC coupler standard, as current. MIIT’s 2023 publication covers the general and DC coupler parts. A standard number is useful background, but the evidence for the car you’re buying is its installed inlet and its own documentation."
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
              "Check the car and equipment interfaces, the supply, the cable or adapter, protection requirements and the onboard-charger rating. Get advice from a qualified installer."
            ],
            [
              "GB/T DC vehicle at a CCS2 public charger",
              "Check the conversion direction from charger to car, communication support, voltage/current range, whether the operator accepts it, and written compatibility for the exact equipment. A matching plug shape isn’t enough."
            ],
            [
              "China-market and export-market cars with the same name",
              "Compare photos and manufacturer documents for both versions. Don’t assume the local model’s inlet applies to the car you’re quoted."
            ],
            [
              "Depot fleet with several charging sites",
              "List each charger/operator and hardware version. Test the pairings you plan to use and decide how you’ll handle untested combinations."
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
          "List the charging sites, the operators and whether the cars will use AC or DC.",
          "Ask the supplier which vehicle documents, cable and local service information they can provide.",
          "For a batch, agree how you’ll test a sample of the exact version before accepting the rest."
        ]
      },
      {
        "heading": "GB/T vs CCS2, and Type 2 vs CCS2",
        "paragraphs": [
          "List AC charging and DC fast charging separately in the order. GB/T charging uses different AC and DC interfaces. Type 2 charging and CCS2 charging are also different arrangements, so spell out the actual inlet, supported mode and equipment for the car you’re buying.",
          "Connector compatibility covers the charging protocol and the electrical interface, not just the plug. The onboard charger specification matters for AC; your DC setup needs its own check of car and station. Have the charger operator or a qualified equipment provider review the exact pairing before the order depends on it."
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
          "Before ordering a GB/T to CCS2 adapter, be clear about the direction: which side takes the station connector and which side fits the car's inlet. Get the supported vehicle list, charging mode, voltage and current limits, approvals and operating instructions for that exact product.",
          "A charging test record should name the car, the station, any approved adapter and what actually worked. Keep the result and any limits with the order. An online product listing or a test on another model doesn’t prove this pairing works. Settle it with the vehicle manufacturer and equipment provider before you commit to a batch."
        ],
        "sources": [
          "charging-compatibility"
        ]
      },
      {
        "heading": "Define a charging acceptance record",
        "paragraphs": [
          "Before you commit to a fleet, run a supervised test with the equipment you’ll use if you can. Record VIN and trim, charger operator and model, adapter model and firmware if used, date, starting SOC, duration, energy delivered, any limits and faults. Note every pairing that hasn’t been tested.",
          "If a session fails, have the equipment provider and operator explain why and what needs fixing. Keep a successful result as evidence for that setup only; it doesn’t guarantee every public charger, future software release or battery condition. Confirm who supports the cars at destination and which modifications could affect warranty or approval."
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
            "answer": "Don’t assume so when you buy. Check the inlet, communication, electrical limits and operator acceptance for the actual version. One successful session proves that setup worked once, not that the car works across the whole network."
          },
          {
            "question": "Will the car reach its advertised charging power?",
            "answer": "Not necessarily. Ask what conditions the quoted figure assumes and what limits the car, the charger and any approved equipment add. Ask for a test record from a setup like yours; a charger’s nameplate rating is not what the car will actually draw."
          },
          {
            "question": "Can I change the charging inlet after delivery?",
            "answer": "Don’t budget on it being a simple connector swap. Ask the manufacturer or an authorized technical provider about compatibility, approval, warranty and local rules for that exact car. It’s far better to settle charging before you choose the version."
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
          "If you’re buying wholesale cars for a dealership, you need an agreed version and a way to tell every unit in the batch apart. If you’re a private buyer, you need a specific car and a realistic way to register it. Either way, sort out the destination rules before you pay to reserve a model.",
          "Each of the six stages below ends with something in writing. Keep the sourcing brief, quote revisions and approvals in one place, so whoever releases payment can see exactly what was agreed."
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
              "Which vehicles are yours, payment milestones, changes and the export route that applies.",
              "The written order, vehicle list and payment instructions."
            ],
            [
              "4. Inspection and release",
              "Inspection scope, findings, repairs and acceptance before release.",
              "A dated report and photos tied to the VIN wherever possible."
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
          "Give every open item an owner and a deadline. If a substitute trim changes the battery inlet or the conformity paperwork, send it back through that check before you accept it. A paid invoice, an inspection result and a carrier booking each prove something different; none of them covers the whole purchase."
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
              "Importer and route settled, and the exact version and its technical papers reviewed by a local specialist. Note any approvals still open."
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
              "An inspection tied to each VIN, and your decision on repairs, exceptions and any checks that weren’t done."
            ],
            [
              "Shipment release",
              "Accepted export and destination file, carrier booking/acceptance and agreed payment/release conditions."
            ],
            [
              "Arrival and use",
              "Release documents, receiving condition record, registration work and named after-sales contacts."
            ]
          ]
        }
      },
      {
        "heading": "Choose a car that fits your destination",
        "paragraphs": [
          "Start with a car you can actually register and use. Ask your broker which rules apply to the exact vehicle category, model year, steering side, emissions or powertrain, and to you as importer. Keep the answer with the offer, so a later substitution doesn’t quietly undo the check.",
          "For new cars from China, compare the model year, trim, equipment, production timing and market version. For used cars from China, add the individual VIN, first registration, current mileage, condition and repair records. A familiar model name doesn’t tell you the specification of the car on offer.",
          "This applies to Chinese brands and equally to a China-market Toyota, Volkswagen or other international brand. Ask for the actual version details and check software, language, parts and service support in your market. The country guides are a good starting checklist; your destination broker confirms the current route.",
          "Keep three things apart: the model’s general specification, the unit actually proposed, and whether it’s available. A model page on a website is a starting point for discussion. The written offer should name the market version and equipment, and say whether units are allocated, awaiting inspection or still being sourced. If the same model name is sold locally, that doesn’t mean a China-market trim has the same approval, software or support."
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
          "When choosing a car exporter in China, find out who sells the vehicle, who receives the money and who handles the export. Ask for the registered legal name and company details, and check they match the offer, contract and payment instructions. If payment goes to a different beneficiary or a third party is involved, get the seller to explain why in writing.",
          "Ask which export licence and vehicle records your order needs. China’s 2024 used vehicle export announcement sets out the requirements for exporters, licensing and vehicle documents. A company profile or exhibition certificate shows the business exists, but says nothing about your car, so ask for the papers that cover your car and export route.",
          "Registration timing also matters. From January 1, 2026, China’s additional rules require a manufacturer-issued after-sales service confirmation for used vehicles applying for export within 180 days of registration, including day 180. If a recently registered car is offered as used, get that paperwork sorted before you pay."
        ],
        "items": [
          "Ask for a dated offer that names the car, or says how vehicles will be allocated to your order.",
          "If the bank account changes, call a contact you already deal with, on a number you already have.",
          "Agree on inspection access and on what happens if the car doesn’t match the offer.",
          "Keep one list of the seller, exporter, inspector and forwarder, showing who is responsible for what."
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
          "The cost example below is hypothetical, with assumed freight, fees and taxes. It shows how costs add up to one delivery endpoint; it isn’t a current offer or any country’s tax rate. Before you base a payment decision on an estimate, get dated figures for your own vehicle and importer.",
          "The cost to import a car from China is the vehicle price plus every charge needed to reach your chosen endpoint. That may be release at the destination port, delivery to your yard or a registered car ready for use. Compare offers using the same endpoint, currency, vehicle specification and quantity.",
          "List origin handling, freight, insurance, import duties and taxes, destination handling, brokerage and any local delivery or registration. Count each cost only once. Ask the seller what the quoted Incoterms® rule and named place already include: these rules split costs, risks and obligations between buyer and seller.",
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
          "When comparing cheap electric cars from China, check that the advertised price is for the exact trim, quantity and export arrangement you need.",
          "Keep your broker’s destination tax calculation separate, and note the valuation basis, date and assumptions behind it.",
          "Ask who pays for storage, document amendments or a delayed collection. Keep any cost that isn’t confirmed as an open line in your budget."
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
          "Match the powertrain to how the car will be used. For electric cars from China, ask for the battery and charging specification of the exact version. For Chinese hybrid cars, check whether the offer is a conventional hybrid, a plug-in hybrid or an extended-range vehicle, then confirm the equipment and maintenance support for that version.",
          "A Chinese EV SUV needs the same version checks as a smaller electric car, plus the passenger space, payload and equipment your use calls for. For a small city car or mini EV from China, ask for the manufacturer’s vehicle category and technical data. Then check that it can be registered and that it suits the roads it will drive on.",
          "For charging, get photos of the car’s actual AC and DC inlets (where fitted), the manual and the onboard charging limits. Have your local equipment provider check that the car and charger work together, including any adapter. For a used EV, ask for a dated battery report tied to the VIN, with the test method and any open faults.",
          "China’s Announcement No. 54 of 2025 introduced export licensing from January 1, 2026 for the battery-electric passenger vehicles within its stated scope. Ask the exporter to confirm how the quoted car is classified and which licence it needs, at the same time as your destination checks."
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
          "Build the car import documents checklist with the exporter, forwarder and destination broker before you place the order. Which papers you need depends on the vehicle, the export route and the destination. Give each document an owner and a handover date.",
          "Go through the file again whenever the car, consignee, route or delivery point changes. One corrected invoice can mean corrections elsewhere in the pack."
        ],
        "items": [
          "Commercial invoice and order: match the parties, vehicle description, quantity, currency, price and agreed delivery term.",
          "Vehicle list and identity records: match the VINs, model details and any registration records for used cars.",
          "Export licence and inspection evidence: ask the exporter which records cover the individual car or batch.",
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
          "For a used car inspection, agree on the VIN, location, access, checklist and report format up front. Ask for dated photos and findings for every check in your order. A useful report says what was checked, what was found and what the inspector couldn’t verify.",
          "Go through the odometer evidence, body and structure, how the car runs, cabin equipment and supplied items. For an electrified vehicle, agree which battery and charging checks can be done at that location. Write down any repair and the re-check you expect before you authorise release.",
          "List each payment milestone with its amount, beneficiary and the evidence due first. Agree what happens after a failed check, a substitute car or a new dispatch date. Keep approved changes with the original order, so whoever authorises payment can see what was accepted."
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
          "Car shipping from China depends on the loading and destination ports, whether the car is ready, whether the carrier accepts it, available space and the import arrangements. Ask the forwarder to quote every option on the same vehicle list and delivery point, and give them dimensions, running condition, powertrain and any loading restrictions.",
          "For RoRo versus container car shipping, compare the services that actually run on your route. Ask how the car is received, secured and handed over, what can travel with it and which charges sit outside the freight quote. For an EV, check the carrier’s battery and acceptance rules before you count on the booking.",
          "A shipping-time estimate should split out preparation in China, the booked transport and release at destination. Ask what each date assumes. The sailing time is only one part of the order-to-arrival timeline."
        ],
        "items": [
          "Before departure: allow for vehicle allocation, inspection, agreed repairs, export documents and the carrier’s booking cutoff.",
          "In transit: record the route, any transshipment, departure confirmation and the carrier’s current arrival estimate.",
          "At destination: confirm document availability, clearance, collection deadlines and onward delivery.",
          "If a date changes: agree who tells you, and who pays any extra charges."
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
          "At collection, check the car’s identity, condition and supplied items against the departure record and the order. Photograph any discrepancy and report it to the agreed contact under the claims procedure. File receiving, transport and inspection records together by VIN.",
          "Before buying, ask who handles warranty questions, diagnosis, parts and repair approvals in your market. Get the scope, exclusions, provider, procedure and any transport or labour costs in writing. For a used car, ask what coverage, if any, applies to that individual vehicle.",
          "When you ask about support for software, apps, charging equipment or parts, give the exact version and destination. Keep the written answer with the offer, so you know what happens after handover before you decide to buy."
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
            "answer": "Ask for a single-car quote and check that the unit price, preparation and freight are priced for one vehicle. An advertised batch price may assume a larger quantity. Before you commit, confirm availability, the export route and the destination rules for that exact car."
          },
          {
            "question": "Can I buy a car from China online?",
            "answer": "Use the online listing to pick a model and ask for an offer. Before you order, verify the seller, the vehicle details, the payment instructions and how documents will be handed over. Agree how the car will be inspected and accepted, and keep the written contract and records."
          },
          {
            "question": "What should I send for an accurate car price?",
            "answer": "Send the brand, model, model year, trim, new or used requirement, quantity and destination country and port. For used cars, add acceptable mileage and condition. For EVs and hybrids, include charging and equipment requirements. Name the delivery point too, so everyone knows what the price covers."
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
          "Start with the model, intended use, quantity and delivery point your business needs, and ask suppliers to quote both options on that basis. A new sedan for a fleet and a used SUV for resale do different jobs, so comparing their starting prices tells you very little.",
          "Then pin down the exact cars behind the prices. A new-car offer should name the model year, trim, market version and equipment. A used-car offer should name the specific unit and the records that come with it. Ask which details are still provisional and when the seller will name the vehicles for your order."
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
              "Check what coverage this individual car has, and the local repair and parts plan."
            ]
          ]
        }
      },
      {
        "heading": "Match the choice to how the cars will earn their keep",
        "paragraphs": [
          "Work from your own numbers: how long you’ll keep the cars, distance, utilization and how much time off the road you can accept. Without local evidence to compare, a new or used label tells you nothing reliable about depreciation, reliability or resale value."
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
              "Required quantity in the same configuration, inspection and preparation completion, registration work, keys and service arrangements. Ask for proof the cars are ready; new doesn’t automatically mean available now."
            ],
            [
              "Dealer buying individually priced used cars",
              "Per-VIN condition and history, repair or cosmetic work, customer disclosure and locally supported equipment. Keep margins per unit."
            ],
            [
              "Longer planned ownership",
              "Maintenance plan, parts identification, qualified repair access and the written scope of any warranty. Ask for support that covers the exact market version."
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
          "“Zero mileage” or “nearly new” doesn’t decide the export category. China’s used-vehicle framework defines a used car by registration and transfer of ownership, not by what the odometer shows. Ask for the registration history and the export route the exporter plans to use.",
          "Under the current Chinese requirements, a recently registered car may also need extra export paperwork. Get the exporter to confirm whether that applies and which documents it will provide, before you treat a low-mileage offer as ready to ship."
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
          "Compare the actual charging inlets, supported equipment and battery evidence. A model sold in your market may have different charging hardware or software from a China-market version with the same name. Ask for the specification of the car you’re actually being quoted.",
          "For a used EV, add the fitted battery’s report, repairs and charging test results to the comparison. Ask what the health figure measures and how it was taken. Don’t confuse it with the manufacturer’s published range figure or the charge percentage on the dashboard."
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
          "For a used car, price the work to bring it up to the condition you need: inspection, agreed repairs, preparation and any re-check. Add freight, destination charges and registration work on the same basis as the new-car offer. Keep confirmed amounts apart from estimates and from charges nobody has quoted yet.",
          "Depreciation is one part of ownership cost; don’t treat a lower used-car price as a guaranteed saving. Over the time you plan to keep the car, compare purchase cost, the work it needs and the support you can actually get. For a used EV, battery health and warranty coverage each need their own evidence.",
          "For a fleet, say which equipment must be the same across the batch. For resale, think about the records you can hand to the next owner. Write down which substitutions you’ll accept, and recheck the destination rules a different version affects before you agree to it."
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
          "First, drop any offer that fails a must-have: an unavailable import route, missing approval evidence, unsuitable seating or steering, unresolved structural damage, or charging that can’t be supported for the intended use. A lower price doesn’t fix any of these.",
          "For the cars left, compare model year (or note the difference), engine or battery version, drivetrain, safety equipment and delivery point. Add inspection, repairs, tyres or other preparation each unit needs, plus registration and local setup. Keep uncertain costs in plain sight.",
          "For a recently registered used car exported from China, check whether the manufacturer after-sales confirmation is required and get it sorted. At destination, the local specialist decides the car’s legal status from its records. “Zero-mileage” in an advertisement doesn’t replace that review."
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
            "answer": "The vehicle price may be lower, but compare the full cost at destination, including preparation, for each car. Inspection findings, parts, transport and registration rules can change the answer. Work both calculations to the same delivery endpoint."
          },
          {
            "question": "Can a low-mileage car be imported wherever new cars are allowed?",
            "answer": "Not necessarily. Check how your destination defines that vehicle and which route it takes. Low mileage doesn’t make a car eligible, and approval of a new version doesn’t automatically cover a used unit that has been registered. Ask your broker to review its actual registration history."
          },
          {
            "question": "Which option is better for a first order?",
            "answer": "Pick the offer where you can verify eligibility, specification or condition, full costs and support. If either one has gaps, ask for the missing evidence before you choose. A smaller first order still needs the same checks."
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
    "answer": "Your car has to pass four separate gates: China export, destination import clearance, technical conformity and road registration. Check each one for the exact vehicle and legal importer, using the actual version and its documents, and note what evidence is still missing before you buy or ship. Passing one gate doesn’t settle the others.",
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
          "Car import requirements depend on the actual vehicle and how it is imported. Start with the model year, country of origin, registration history, powertrain and intended use. Add the steering side (left-hand drive or otherwise) and whatever technical evidence the emissions standards call for.",
          "Who imports the car matters too. A dealer batch, a private purchase and a returning-resident scheme can each come with different conditions. The broker should tell you about any import license, approval or registration requirement for this buyer and this exact configuration."
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
              "Importer registration, permits and limits for that route."
            ],
            [
              "Vehicle identity",
              "Make, exact version, model year, VIN when available and manufacturing origin.",
              "Written confirmation of the vehicle category and information still needed."
            ],
            [
              "Registration history",
              "New or previously registered status, first registration and supporting records.",
              "How the car is classed (new or used) and any age or other vehicle restrictions."
            ],
            [
              "Technical evidence",
              "Powertrain, steering side, emissions or conformity documents and charging inlets for an EV.",
              "Required approval evidence and who can issue or validate it."
            ],
            [
              "Arrival and registration",
              "Port or border, final use location and proposed timing.",
              "Clearance, inspection and registration steps, and who handles each."
            ]
          ]
        }
      },
      {
        "heading": "Record a separate answer for each approval gate",
        "paragraphs": [
          "Note who gave each answer, when, and what it covers. A forwarder agreeing to carry the car is a transport decision. A customs estimate is a cost calculation. Neither tells you the car will pass technical approval or registration."
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
              "Named exporter, vehicle status and the export documents or licence it needs. The exporter should explain its procedure for the actual unit."
            ],
            [
              "Destination import",
              "Importer of record, legal regime, new/used status, age, category and any licence or prior authorization. Get a review for that specific country."
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
          "Vehicle homologation or type approval is about technical approval. Customs entry and vehicle registration can need other records on top of that. Find out which authority reviews each part of the file, and which decisions you need in hand before shipment.",
          "If a certificate of conformity is asked for, check that its issuer and scope match the version on offer. Don’t assume every China-market car has an EU certificate. Used car import rules can also turn on age, condition and registration history; a low odometer reading doesn’t settle that.",
          "For an EV, add charging compatibility for the actual inlets and local equipment. Keep software, language and service needs in the same purchasing brief, so any substitution sends you back to the checks it affects."
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
          "Ask who the exporter of record will be and which export category the car falls into. For a used vehicle, ask for the registration, licensing and inspection file. Check that the exporter can tie those records to the individual VINs in your order.",
          "Keep the China export check and the destination approval in one purchasing file, with a named person for each. If the car’s registration status, model or exporter changes, have the route checked again before payment or dispatch."
        ],
        "sources": [
          "used-export"
        ]
      },
      {
        "heading": "Importing an electric car from China: add local-use checks",
        "paragraphs": [
          "Confirm the car’s actual AC and DC charging setup, the equipment it supports and where it will charge. Ask whether the local provider can support the exact version. Check that the software, language, connected features and parts support you rely on will work.",
          "Ask the supplier to say what it has verified and what is still unconfirmed. A feature that works in China may depend on an account, network or service that doesn’t operate in your destination. If a feature matters to the purchase, agree before you order what evidence you’ll accept that it works."
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
          "Latin America and North Africa aren’t single import regimes. Start with the destination guide, then ask the local broker to check current requirements for your importer and vehicle. Make sure the broker’s written answer includes the date, the official reference and any conditions still open."
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
          "Read the document title, issuing organization, number, validity and vehicle identifiers. Work out what it actually is: a manufacturer technical sheet, a test report, an approval for a vehicle type, a VIN-specific document or a destination authority’s acceptance. Each supports a different stage, and one can’t stand in for another.",
          "Check the engine or battery configuration, drivetrain, body type and key equipment against the quoted version. Ask the local reviewer to point out any gap and the accepted way to close it. You may need a translation or authentication, but translating a document doesn’t widen what it covers.",
          "Reopen the review if any of these change: importer, legal regime, VIN, model year, powertrain, steering, equipment that affects approval, or shipment timing. Save the accepted version before the order moves on. Use the country guides to prepare your questions, then get a decision for your own case."
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
            "answer": "Not automatically. An advertisement doesn’t make a car eligible for your destination or for you as importer. Ask for the exact vehicle file and have the local route checked before you commit. Note any permits, conformity evidence or registration conditions still outstanding."
          },
          {
            "question": "Does shipping from China prove the car was made in China?",
            "answer": "Not on its own. Where the car was made and where it shipped from are separate facts, so record them separately. Give the broker origin evidence for the actual vehicle, especially if tariff treatment or the import route depends on origin."
          },
          {
            "question": "What should I do if eligibility is not yet confirmed?",
            "answer": "Keep the quote provisional and write down the missing document or decision, who owns it and when you’ll review it next. A freight or tax estimate doesn’t confirm that the car can be imported and registered."
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
    "answer": "First make sure the quotes cover the same vehicle specification, condition, quantity, currency and delivery endpoint. Then add the work each offer leaves out, flag anything unpriced and read the payment, supply and validity conditions. Only then can you tell whether the lowest headline price is really the best deal.",
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
          "Send every supplier the same specification brief. Compare model year, trim, powertrain and equipment, and note the quantity each unit price is based on. Each offer should say which units are already identified and which still have to be sourced.",
          "Note who the contracting seller and exporter of record are. For a used car, compare the actual VIN, registration and condition file, and the preparation and repairs included in the offer. Have any alternative priced as a separate option, so a lower total can’t hide a different car."
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
              "Check it’s the same endpoint and services."
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
          "Write the trade rule, named place and edition next to each price. An FOB car price and a CIF car price cover different parts of the journey. Add the freight and insurance the FOB offer leaves out, and check both offers for destination handling before you compare totals.",
          "Use the same port, yard or registration endpoint for the local estimate. The worked Incoterms example shows the arithmetic; for real freight, insurance and destination charges you need current quotes for your vehicle list."
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
          "These numbers are made up to show how the comparison works. The FOB and CIF offers are for the same shipment and destination port, with comparable freight and cover. Offer A looks cheaper, but once the listed costs are added its subtotal is USD 850 higher. You’d still need to check customs valuation, local taxes and other charges for each real offer.",
          "If Offer B’s freight is only an estimate, note that next to its price and ask how long it’s valid and what booking it assumes. If either quote leaves terminal handling unpriced, mark it as missing. Don’t fill the gap with zero or with the other supplier’s number."
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
              "Get figures for your case",
              "Get figures for your case"
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
          "Check whether the lower offer depends on a different trim, colour or loading point, a mixed or larger batch, earlier payment, or work you have to arrange yourself. Ask for your original requirement and any alternative to be priced separately. If a mandatory safety feature or approval record is missing, comparing prices is pointless until that’s fixed.",
          "Keep the unknowns visible. “Freight to follow,” “subject to inspection” and “documents to be confirmed” are open items, not free inclusions. For each, ask who is responsible, what evidence to expect and up to what point the price or order can still change."
        ],
        "items": [
          "Confirm the contracting seller and the entity that will export the cars.",
          "Separate cars available now from those with only an estimated sourcing or production window.",
          "Find out who inspects, what they check and who can approve release.",
          "Check the exact support terms instead of comparing a general warranty headline."
        ]
      },
      {
        "heading": "Ask for a revised written offer before choosing",
        "paragraphs": [
          "Send each seller the open differences and ask for an updated quotation. Keep the quote date, reference and validity with your comparison, so nobody on your team approves an expired price or an out-of-date specification.",
          "When a substitution, route or schedule changes, update the costs and destination check it affects. Check the payment milestones against the revised order. You’re done when the chosen offer describes the car and work you mean to buy, including what stays your responsibility."
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
            "answer": "Enough comparable offers to understand the specification, service scope and open costs. More offers only help if every supplier gets the same brief. The RFQ template keeps the responses comparable."
          },
          {
            "question": "Can I compare an online car price with a written export offer?",
            "answer": "Only once you know what the online price covers: version, condition, quantity, currency and validity. Ask for a written offer to your named delivery point before you treat it as a real alternative."
          },
          {
            "question": "Should I choose the cheapest supplier?",
            "answer": "Not on price alone. Compare the confirmed total alongside the vehicle evidence and services you need, and close any significant gaps before you approve. A quote missing inspection, preparation or destination costs isn’t a complete comparison yet."
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
    "answer": "Agree what evidence you’ll see before each deposit, balance or release milestone, and verify the payee through a contact you found yourself. Put vehicle substitutions, delays and refund conditions into written amendments. Review the payment method and the contract together: neither a transfer receipt nor a set of documents tells you everything about the car’s condition.",
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
          "Tie each payment milestone to something your team can actually check. For a specific used car, that might be the VIN and the agreed inspection findings. For a batch still being sourced, agree when individual cars will be proposed, inspected and approved. No single deposit percentage fits every order.",
          "For each milestone, note the amount, who approves it and what evidence is still due. Keep the seller's acknowledgement and transfer reference with the order, and reconcile the remaining balance before the next request."
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
              "Vehicle identification, inspection, preparation or shipping record agreed for that stage."
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
              "Written amendment, who bears which costs, and the refund procedure."
            ]
          ]
        }
      },
      {
        "heading": "Define the evidence behind each payment milestone",
        "paragraphs": [
          "These milestones are examples to negotiate from, not a standard KEEYAK deposit schedule. Banks check documents under the payment instrument you choose and its terms; they don’t inspect the car, so physical inspection and acceptance need their own agreed scope. Before you commit to a letter of credit or documentary collection, ask your bank or a trade-finance specialist to explain discrepancies, fees and timing."
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
              "VIN list, agreed independent inspection and buyer decision on repairs or exceptions. Note any checks still pending."
            ],
            [
              "Shipment readiness",
              "Export documents, destination-file review and carrier acceptance/booking status. An application or draft is not an issued document."
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
          "A bank transfer, letter of credit, documentary collection and open account each work differently. Before any of them goes into the order, get the seller and your bank to confirm what’s available, what it costs and which documents are involved.",
          "For a letter of credit, have the bank review the documentary requirements. The bank checks the documents presented; that doesn’t replace your physical inspection and acceptance of the car. Make sure both line up with the contract."
        ],
        "sources": [
          "payments",
          "credit"
        ]
      },
      {
        "heading": "Verify a bank transfer and any changed payment instructions",
        "paragraphs": [
          "Before any bank transfer, check the beneficiary and account details against the signed instructions your finance team holds. If the account is new or has changed, call the seller through a channel you already use, on a number you didn’t get from the payment message. Write down that you checked.",
          "IC3 warns that genuine email accounts can be compromised, so a familiar email thread isn’t enough to confirm a bank change. If instructions conflict, hold the transfer until the seller and your finance team sort it out. If a suspicious transfer has already gone, contact the bank you sent it from straight away."
        ],
        "sources": [
          "fraud"
        ]
      },
      {
        "heading": "Approve substitutions and delays as contract changes",
        "paragraphs": [
          "A substitute vehicle, revised price or changed dispatch date needs a written contract amendment or revised offer showing the old and new details. A replacement used car needs its own VIN and condition review; a different EV version may need its charging and destination checks redone.",
          "Record the buyer's decision and what it means for money already paid. Settle the cancellation terms and refund terms in the agreement before the next transfer, including who does what and what evidence is needed."
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
          "Set the requested change against the original contract: VIN, trim, quantity, price, delivery point, payee or timing. Keep the earlier version.",
          "Work out what it changes for destination eligibility, charging, inspection, freight, the tax estimate and support. A substitute vehicle may need a fresh review.",
          "Record the agreed price difference, evidence, revised dates, costs and the buyer’s acceptance in a written amendment. State what happens if the replacement is not accepted.",
          "Check changed bank instructions with a contact you had before the change. IC3 lists compromised email and payment redirection as business-email-compromise risks.",
          "For a refund or cancellation, define the trigger, refundable amount, permitted deductions, deadline, currency and bank charges in the contract. Keep payment and acknowledgment records, and don’t assume any payment product guarantees you’ll get the money back."
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
            "answer": "It depends on the written terms for your order. Check what happens if the car is unavailable, fails an agreed inspection or can’t meet a condition, and get the seller to clear up any vague wording before you pay. Don’t assume every supplier has the same refund policy."
          },
          {
            "question": "Does a pro forma invoice prove the car is ready to ship?",
            "answer": "No. It’s part of the proposed commercial terms. Before approving each stage, ask for the vehicle identification, preparation, inspection and booking evidence your order calls for, and check each item on its own."
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
    "answer": "Have the release file and departure condition record ready before collection. When the cars arrive, match the VINs, record their visible condition and count keys and agreed accessories before you close the handover record. Report problems quickly under your contract, carrier and insurance terms, with a separate record for each discrepancy.",
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
          "Your receiving file should hold the bill of lading or transport reference, VIN list, departure photographs, accepted findings and the list of supplied items. Before you arrange collection, confirm customs release, your authority to collect and terminal access.",
          "Set the collection window and find out what charges are still outstanding, including any port storage charges. Do the VIN check and note any missing accessories at the first handover you’re allowed to attend. Write down any access limits, so the next inspector knows what hasn’t been checked."
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
              "Odometer reading and warning messages, if you’re allowed to access and switch on the car."
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
          "Photograph the vehicle reference as well as the area you’re checking. Compare the arrival photos with the departure record, then keep the proof of delivery and any exceptions noted on it. Say so if the underside, cabin or a test function couldn’t be checked there.",
          "For a container, have whoever opens it record the container seal and reference, and photograph the opening and unloading. Follow the terminal and packing provider's instructions. Collecting the cars and returning the empty equipment can have separate deadlines and charges."
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
          "Note the date, location and who is receiving. Match each VIN first, then compare overall exterior views and close-ups taken from the same angles.",
          "Count keys, charging cables and other items in the agreed inventory. Record missing or substituted items and any limits on access or testing.",
          "Note visible discrepancies on the handover record using the receiving party’s process. Keep your own photos, and write down if you weren’t able to add a comment.",
          "If it’s safe and allowed, run the agreed operation checks. If you suspect battery damage, leaks, severe damage or unsafe operation, get a qualified provider to look at it before the car is driven, charged or moved any further."
        ]
      },
      {
        "heading": "What to do about transport damage or a missing item",
        "paragraphs": [
          "Send a notice of claim or initial damage notification the way your carrier and marine cargo insurance policy require. Include the VIN, shipment reference, when you found the damage and photographs, along with the departure and receiving records. Ask whether a survey or further inspection is needed before any repair or onward movement.",
          "Höegh Autoliners publishes its own claims guidance; another carrier or insurer may use a different process. Follow the instructions and deadlines for your shipment. Keep transport damage, vehicle faults and items missing from the sales order as separate issues, so each goes to the right provider. If the cause isn’t clear yet, record it as unresolved."
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
          "Have the broker confirm the clearance and registration steps still to do. Keep the final invoice, vehicle list, transport documents and local records together by VIN. A car cleared out of the terminal isn’t necessarily ready for the road.",
          "For an EV, book the agreed commissioning and charging check with the right provider. Hand the next owner or fleet team the manuals, checked equipment details, maintenance records and the support contact for that vehicle. Note anything still outstanding before you close the purchase file."
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
          "Keep the invoice, transport reference, VIN, photos, receiving record and correspondence under one issue number. Get instructions before a non-essential repair or disposal destroys evidence. Anything needed for safety should be done by qualified local professionals, and written down.",
          "A carrier notice, an insurance claim and a claim against the seller can each go to different people, with different deadlines. Read your actual terms and ask for written instructions early. A general checklist can’t give you one claim period that fits every shipment."
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
              "Compare departure and arrival evidence; notify the carrier, insurer and commercial contact as needed. Ask which survey and claims procedure they require."
            ],
            [
              "Missing key, cable or other agreed item",
              "Compare inventory and handover records; find out where the item was last recorded and ask for the agreed remedy."
            ],
            [
              "Wrong VIN, trim or quantity",
              "Notify the seller and importer; reconcile the physical units and documents before registration or further distribution."
            ],
            [
              "Warning or fault discovered after receipt",
              "Record mileage and symptoms and have a qualified provider diagnose; review the inspection, transport evidence and support terms without guessing the cause."
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
            "answer": "No. Inspect at the earliest handover you’re allowed to and note where the car was checked. You may still need a showroom check later, but keep the evidence from every handover. Ask the carrier or insurer how to report an issue found later."
          },
          {
            "question": "What if the car cannot be started at collection?",
            "answer": "Record the condition and tell the responsible party. Get handling and diagnostic instructions from the right provider rather than guessing the cause, and agree any extra movement or inspection before it’s arranged."
          },
          {
            "question": "Is every arrival problem covered by shipping insurance?",
            "answer": "Not necessarily. Check the policy, exclusions, insured journey and evidence requirements. Report the facts and let the provider review the issue. Keep any sales-order or warranty request separate so it reaches the right contact."
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
    "answer": "Get written support terms for the actual VIN, market and use. Find out who diagnoses a fault, who approves the work, who supplies parts and who pays labour, freight and other costs. Manufacturer coverage, seller support and a local workshop can each cover different things, so confirm each one before you buy.",
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
          "For the version you’re buying, the support file should name the provider, the terms and a contact. Note whether the car qualifies for coverage given its origin, registration history and intended use, and which local workshop or diagnostic provider you’ll use.",
          "Parts availability is only one piece. Check access to the right diagnostic software, the repair authorization process and who pays labour costs, testing and transport. If the seller commits to parts only, budget for the work your business will have to arrange locally."
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
          "Answers in writing show you the service gaps before a car breaks down. If no provider confirms an item, count it in your comparison as a buyer cost or an open support question, not as included."
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
              "Named contact, approval needed before work and how urgent safety work is handled."
            ],
            [
              "Parts",
              "New/replacement part basis, VIN fitment confirmation, supply responsibility and any exclusions."
            ],
            [
              "Labour, freight and import charges",
              "Whether each item is included, capped or payable by the buyer, plus any return-shipping requirements."
            ],
            [
              "Vehicle downtime and local movement",
              "Any agreed support or limits. Don’t assume replacement transport or lost revenue is covered."
            ],
            [
              "Battery and connected functions",
              "Covered components, terms, and whether diagnostic, software or account services are available for this market version."
            ]
          ]
        }
      },
      {
        "heading": "Do Chinese car warranties apply overseas?",
        "paragraphs": [
          "It depends on the terms for the actual car and market. Manufacturer distribution and warranty arrangements can be territorial. For example, Toyota Ireland states that vehicles originating outside the Pan-European market do not have its manufacturer warranty cover in Ireland. That is an Ireland policy example, not a rule for every brand or destination.",
          "Ask the provider to confirm your case in writing. Keep manufacturer coverage, seller commitments and any local support you arrange yourself as separate items. If an offer says “warranty” without naming the provider or scope, ask for both before you compare it with another car."
        ],
        "sources": [
          "warranty"
        ]
      },
      {
        "heading": "For an EV battery warranty, read the component terms",
        "paragraphs": [
          "Ask whether the traction battery has separate coverage, a capacity condition, a test method or restrictions on use and maintenance. Confirm the start date and whether this individual car qualifies. A headline battery term quoted for a new local-market car doesn’t automatically carry over to a used China-market unit.",
          "File the battery report from purchase with the warranty evidence. If a problem comes up later, the provider will want the vehicle reference, the symptoms and whatever records it asks for. A battery state-of-health estimate is a measurement; the provider still makes its own coverage decision."
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
          "Send the VIN, order reference, mileage, location and a dated description of the symptoms. Add warning messages, photos and any diagnostic report from a qualified provider, plus repairs or modifications since delivery.",
          "For a VIN lookup, recall check or service campaign inquiry, go to the manufacturer or provider responsible for that vehicle's market version, and check whether its tool covers international vehicles. An empty result from a database that only covers some markets doesn’t mean the car has no campaigns.",
          "Wait for the provider's next instruction and repair authorization before you commit to work you want reimbursed. For a parts quote, match the part number to the actual car and find out the freight, duties and local fitting costs. If the battery warranty has its own component terms, keep that response separate."
        ],
        "items": [
          "Keep each request under one reference with the provider’s response and agreed next action.",
          "Keep service and repair records, including work done at destination.",
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
          "If you find damage at collection, keep the receiving and departure records and follow the carrier and insurance process. A transport claim and a vehicle warranty request can have different contacts and conditions. Let each party assess the evidence; don’t assume one route covers everything."
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
          "For a parts enquiry, send the VIN, exact version, where the component sits, clear photos and any part number you can read. Ask the supplier to confirm fitment from the parts information for that car. A model sold locally under the same name can use a different component or software version.",
          "When the first fault appears, note the date, mileage, symptoms, warning messages and circumstances, then get the qualified diagnostic report the support provider asks for. Before ordering non-essential work, get repair authorization and written agreement on who pays what. Keep replaced-part evidence if the claim process requires it.",
          "Ask the manufacturer or its representative for that market how to check recalls and service campaigns for this VIN. NHTSA’s US VIN lookup lists international vehicles among its coverage limitations, so a blank result in another market’s database doesn’t prove the China-market car has no outstanding campaign."
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
            "answer": "Check with the provider first. Confirm the approval and reimbursement process before any work is arranged, including which evidence, workshop and cost authorization it needs. Keep any urgent or safety instructions from the qualified provider in the case record."
          },
          {
            "question": "What if the seller only offers spare parts?",
            "answer": "Ask which parts, how they are identified, who pays freight and duties, and who handles local diagnosis and fitting. Write those limits down and budget for the work that falls to your business."
          },
          {
            "question": "Does a used car keep its remaining original warranty?",
            "answer": "It depends on the provider’s terms, which decide whether coverage transfers and where it applies. Have the provider check the VIN, origin, ownership, destination, use and maintenance records. Until it confirms, treat any remaining coverage as an open question."
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
