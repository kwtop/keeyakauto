import type {GuideEditorial} from './guideEditorial';
export {countryGuidePath} from './guideEditorial';

export const destinationRegions = ['Latin America', 'North Africa'] as const;
export type DestinationGuide = GuideEditorial & {
  slug: string;
  name: string;
  region: typeof destinationRegions[number];
  summary: string;
};

// Country-specific article text; general procurement steps remain in linked specialist guides.
export const destinationGuides: DestinationGuide[] = [
  {
    "slug": "bolivia",
    "name": "Bolivia",
    "region": "Latin America",
    "summary": "Model year, IBMETRO and inland transit",
    "title": "Import Cars from China to Bolivia: Requirements and Costs",
    "description": "Prepare a Bolivia car import with the correct model year, IBMETRO vehicle and hybrid evidence, matching technical records, customs budget and inland transit plan.",
    "answer": "For Bolivia, resolve the model year, vehicle class and applicable acceptance procedure before committing to a unit. For flex-fuel and hybrid files under RM 119/2025, match the technical and test evidence to the declared vehicle type. Budget the sea arrival, transit, border and Bolivian clearance legs together.",
    "image": "ports",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "customs",
        "label": "Bolivia Aduana Nacional, regulation for import for consumption",
        "href": "https://www.aduana.gob.bo/sites/default/files/NormativaVigente/Reglamentos/Reglamento%20para%20el%20R%C3%A9gimen%20de%20Importacion%20para%20el%20Consumo_8.pdf"
      },
      {
        "id": "ibmetro",
        "label": "IBMETRO, vehicle acceptance certificate procedures",
        "href": "https://ibmetro.gob.bo/certificado-de-aceptacion"
      },
      {
        "id": "hybrid",
        "label": "IBMETRO, May 2026 instructions for flex-fuel and hybrid vehicles under RM 119/2025",
        "href": "https://ibmetro.gob.bo/sites/default/files/2026-05/REQUISITOS%20Y%20PASOS%20A%20SEGUIR%20VEHICULOS%20RM%20119%20mayo%202026.pdf"
      },
      {
        "id": "transit",
        "label": "Aduana Nacional, General Customs Law regulation and transit provisions",
        "href": "https://www.aduana.gob.bo/rlga_view"
      }
    ],
    "sections": [
      {
        "heading": "Check the model year and powertrain first",
        "paragraphs": [
          "Bolivia’s customs regulation distinguishes vehicles of the current or a later model year from vehicles of earlier model years. A previous model year can be treated as older even when the car has seen no road use. Ask the broker to confirm the current age and vehicle-class limits for the intended entry date.",
          "IBMETRO provides acceptance certificate procedures. Its May 2026 instructions under RM 119/2025 address flex-fuel and hybrid vehicles and explain how to match technical or test evidence to the declared type. Ask which process applies to the actual gasoline, hybrid or electric vehicle."
        ],
        "sources": [
          "customs",
          "ibmetro",
          "hybrid"
        ]
      },
      {
        "heading": "Match the China-market version to the Bolivian file",
        "paragraphs": [
          "Send the broker the selected version’s data sheet with the RFQ. For a hybrid acceptance application, IBMETRO’s May 2026 instructions require the importer to use the declared vehicle type and supporting technical evidence. Have the importer confirm the procedure before booking the sea and inland legs."
        ],
        "table": {
          "caption": "Align each proposed version with its supporting file",
          "headers": [
            "Model comparison",
            "What the importer should resolve"
          ],
          "rows": [
            [
              "BYD Seal 07 DM-i",
              "Exact plug-in hybrid version, model year and technical evidence for the applicable acceptance procedure. Review the fitted charging equipment separately."
            ],
            [
              "Toyota Corolla gasoline or hybrid",
              "Keep the two powertrains on separate specification files. Confirm the classification and acceptance procedure for the version actually offered."
            ],
            [
              "One named delivery endpoint",
              "Get a dated customs estimate and a separate quote for port handling, transit and inland handover using the same vehicle list."
            ]
          ]
        },
        "sources": [
          "customs",
          "ibmetro",
          "hybrid",
          "transit"
        ],
        "links": [
          {
            "label": "Review BYD Seal 07 DM-i version and charging checks",
            "href": "/new-cars/byd/seal-07-dm-i/"
          },
          {
            "label": "Compare Toyota Corolla gasoline and hybrid versions",
            "href": "/new-cars/toyota/corolla/"
          },
          {
            "label": "Build a landed-cost estimate",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Build the RM 119/2025 hybrid application around matching identifiers",
        "paragraphs": [
          "IBMETRO’s May 2026 instructions distinguish new vehicles by vehicle type and older vehicles by the relevant application. The online application and notarized declaration must agree. Prepare importer and representative details, vehicle quantity, origin and country of dispatch, model year, VIN or the applicable type identifier, engine type and the declared FFV, PHEV, HEV or MHEV category.",
          "The instructions also require the test-report code, issuing laboratory and its accreditation, recognition or designation. The report must correspond to the declared vehicle or engine type/family and meet the procedure’s content requirements. For new vehicles, the stated laboratory-location requirement refers to the country of manufacture; the instructions set a distinct basis for older vehicles. Have the importer check that basis for its application.",
          "Compare the model year, engine identifier and hybrid category across the technical sheet, test report, invoice and declaration before submission. The instructions accept Spanish or English documentation and call for a formal Spanish translation otherwise. A report for another engine family or a similarly named model can leave a substantive gap that a translated sales brochure cannot close."
        ],
        "sources": [
          "hybrid"
        ],
        "links": [
          {
            "label": "Evaluate certificate and vehicle coverage",
            "href": "/export-services/buying-guide/check-car-import-eligibility/"
          }
        ]
      },
      {
        "heading": "Build the file by vehicle class",
        "table": {
          "caption": "Checks to clear before paying for a Bolivian order",
          "headers": [
            "What to check",
            "What to collect"
          ],
          "rows": [
            [
              "Importer and declaration",
              "Importer identification and the broker’s confirmed class, subheading and import route."
            ],
            [
              "Model year and origin",
              "Model data sheet, origin and shipment country, invoice, VIN or vehicle type identifiers as required."
            ],
            [
              "Environmental acceptance",
              "Applicable IBMETRO procedure and supporting technical or emissions test evidence."
            ],
            [
              "Transit arrangements",
              "Named entry port, transit operator, Bolivian customs office, and who handles transit paperwork and handover."
            ]
          ]
        },
        "sources": [
          "customs",
          "ibmetro",
          "hybrid",
          "transit"
        ]
      },
      {
        "heading": "Choosing a Chinese electric car, hybrid or pickup for Bolivia",
        "paragraphs": [
          "When comparing Chinese electric cars for Bolivia, put the vehicle classification and model year beside the exact version. These determine the questions for Customs and IBMETRO. A pickup needs its own classification review rather than approval borrowed from a passenger SUV.",
          "The technical file should identify the fuel and drive system and the applicable acceptance or emissions test evidence. IBMETRO publishes a process for flex-fuel and hybrid vehicles under RM 119/2025. Have the responsible provider identify the evidence for the configuration on the offer.",
          "Specify AC charging and DC fast charging separately for an EV, with inlet photographs and the intended equipment in Bolivia. Confirm the manuals and support for the supplied version before relying on a familiar model name."
        ],
        "sources": [
          "ibmetro",
          "hybrid"
        ],
        "links": [
          {
            "label": "Check GB/T and CCS2 charging compatibility",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          }
        ]
      },
      {
        "heading": "Car import costs in Bolivia: include the transit leg",
        "paragraphs": [
          "A car import tax estimate in Bolivia needs the broker's customs valuation and classification for the actual vehicle. Obtain a dated breakdown, then add the sea leg and inland transit through to the Bolivian receiving point. A foreign destination port can leave border handling and onward transport outside the quoted price.",
          "The transport offer should name the sea port, transit provider and Bolivian clearance point. Check freight insurance for that whole intended journey and identify any storage or collection charges. Registration and final delivery remain separate lines where the budget includes them."
        ],
        "items": [
          "Name the sea port, transit provider, Bolivian clearance point and final receiving address.",
          "Confirm the document handoff and any collection or storage charges at the transit port.",
          "Recheck the budget when the vehicle class, model year or route changes."
        ],
        "links": [
          {
            "label": "Build the full landed-cost worksheet",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          },
          {
            "label": "Compare RoRo and container shipping",
            "href": "/export-services/buying-guide/container-vs-roro-car-shipping/"
          }
        ]
      },
      {
        "heading": "Assign the port-to-Bolivia handovers",
        "paragraphs": [
          "Quote the same final Bolivian delivery point for each route. A low ocean-freight line can leave a substantial inland and border scope unpriced. For a year-sensitive vehicle, have the broker identify the legally relevant date and allow for document or transit delays before accepting the shipment window."
        ],
        "table": {
          "caption": "Items to include in the route and receiving brief",
          "headers": [
            "Handover",
            "Evidence and costs to identify"
          ],
          "rows": [
            [
              "Sea port of arrival",
              "Arrival notice, carrier release, terminal charges, storage terms and the party collecting the vehicle or container."
            ],
            [
              "Customs transit departure",
              "Authorized transit arrangement, responsible operator, vehicle identifiers and the documents required by the countries traversed."
            ],
            [
              "Border and Bolivian customs",
              "Transit closure and import file, applicable acceptance records, broker, valuation and inspection costs."
            ],
            [
              "Final delivery",
              "Destination unloading or collection, local transport, receiving condition record and registration work outside the freight quote."
            ]
          ]
        },
        "sources": [
          "customs",
          "transit"
        ],
        "links": [
          {
            "label": "Allocate each route cost to the batch",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Questions before importing a car to Bolivia",
        "questions": [
          {
            "question": "Does very low mileage make an older-model car eligible in Bolivia?",
            "answer": "Check the model year and vehicle class under the current Bolivian rule. Low mileage does not change the year shown in the technical and registration records. Have the broker resolve the applicable age calculation before the seller identifies the car for shipment."
          },
          {
            "question": "Can the car travel through a port in Chile or Peru?",
            "answer": "Ask the forwarder to quote the actual sea and transit route and confirm who handles each customs movement. Arrival at a foreign sea port is not final delivery in Bolivia. Include the onward transport, documents and charges in the written scope."
          },
          {
            "question": "What should I send when requesting a Bolivia car import quote?",
            "answer": "Provide the exact model, year, vehicle class, powertrain, quantity and final destination. Include the registration history for a used unit and ask which IBMETRO and customs evidence remains outstanding. Request the vehicle and transport prices on a consistent delivery basis."
          }
        ],
        "sources": [
          "customs"
        ],
        "links": [
          {
            "label": "Prepare a supplier RFQ",
            "href": "/export-services/buying-guide/request-wholesale-car-quote/"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "BYD Seagull specifications",
        "href": "/new-cars/byd/seagull/"
      },
      {
        "label": "Changan CS75 Plus specifications",
        "href": "/new-cars/changan/cs75-plus/"
      },
      {
        "label": "GWM Poer specifications",
        "href": "/new-cars/gwm/poer/"
      },
      {
        "label": "Build a landed-cost worksheet",
        "href": "/export-services/buying-guide/calculate-car-landed-cost/"
      }
    ]
  },
  {
    "slug": "peru",
    "name": "Peru",
    "region": "Latin America",
    "summary": "Used car age, mileage and inspection",
    "title": "Import Cars from China to Peru: New and Used Car Checks",
    "description": "Check Peru’s used M1 car limits, 32,000 km evidence, model year, diesel exclusion and the technical and inspection documents needed before shipping.",
    "answer": "For a used passenger car in category M1 under Peru’s ordinary route, SUNAT lists a maximum age of two years counted from the model year and a maximum of 32,000 km. Used M1 diesel cars are prohibited under this route. Verify the exact car against every remaining condition before purchase.",
    "image": "inspection",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "sunat",
        "label": "SUNAT, requirements and documents for used vehicle imports",
        "href": "https://www.gob.pe/6984-requisitos-y-documentos-para-importar-vehiculos-usados"
      },
      {
        "id": "mileage",
        "label": "SUNAT Report 029-2021 on evidence for the mileage requirement",
        "href": "https://www.sunat.gob.pe/legislacion/oficiosAd/2021/2021-INF-029-340000.pdf"
      }
    ],
    "sections": [
      {
        "heading": "Check a used M1 car before booking",
        "table": {
          "caption": "Ordinary used passenger car import checks in Peru",
          "headers": [
            "Check",
            "What SUNAT requires or what the importer should verify"
          ],
          "rows": [
            [
              "Vehicle category and age",
              "Confirm M1 classification and calculate the age from the model year under the applicable rule. The ordinary limit is two years."
            ],
            [
              "Mileage",
              "The M1 limit is 32,000 km. Preserve the required origin ownership, technical-inspection or equivalent record containing the mileage, alongside the import and verification file."
            ],
            [
              "Diesel",
              "The ordinary used M1 route excludes compression-ignition diesel cars. The listed heavy-vehicle exceptions do not apply to M1."
            ],
            [
              "Accident or write-off history",
              "Check whether the car falls within SUNAT’s excluded damage and write-off categories. Ask for condition and registration records."
            ],
            [
              "Steering and emissions",
              "Confirm original left-hand steering and evidence for the applicable emissions requirement."
            ],
            [
              "Technical inspection",
              "Identify the used-vehicle import technical sheet and the authorized physical/documentary inspection report before shipping."
            ]
          ]
        },
        "sources": [
          "sunat",
          "mileage"
        ]
      },
      {
        "heading": "Obtain the mileage evidence and named technical documents",
        "paragraphs": [
          "SUNAT lists the Ficha técnica de importación de vehículos usados y especiales, signed by the importer and an appropriately authorized mechanical or mechanical-electrical engineer, alongside the applicable physical and documentary inspection report from an authorized verification entity. Agree who obtains each document and reviews it against the exact VIN.",
          "SUNAT Report 029-2021 addresses a specific problem: an inspection report states compliance, but the origin title, technical-inspection certificate or equivalent accredited-origin record contains no mileage. Its conclusion says the mileage condition has not been demonstrated in that situation. An odometer photo and a general inspection statement should therefore not be treated as substitutes for the required origin record.",
          "Reconcile the mileage in that record, the current inspected reading and the import documents. If records conflict or a required field is missing, resolve it with the issuer and receiving specialist before shipment. Preserve the original and corrected versions rather than filling the gap yourself."
        ],
        "sources": [
          "sunat",
          "mileage"
        ]
      },
      {
        "heading": "New vs used Chinese cars for Peru",
        "paragraphs": [
          "For a new vehicle, establish the new-car technical and registration file separately from the used M1 checks. For a used car, review the age, mileage, condition, factory steering and emissions requirements together. Reopen that review for any substituted VIN; approval of one unit does not cover another.",
          "Match the technical sheet and exact market version to the proposed procedure before comparing its price with the alternative. Keep first registration and model year as separate fields because they answer different questions."
        ],
        "sources": [
          "sunat",
          "mileage"
        ],
        "links": [
          {
            "label": "Verify a used car before payment",
            "href": "/export-services/buying-guide/verify-chinese-used-car-before-payment/"
          }
        ]
      },
      {
        "heading": "Use age and mileage as an initial screen, then complete the file",
        "paragraphs": [
          "Illustrative screening only: a proposed 2025-model M1 gasoline car showing 28,000 km for a 2026 transaction still needs the broker’s model-year calculation, documented mileage and every other applicable quality check. Being below the mileage ceiling does not settle steering origin, damage history, emissions or documentary acceptance.",
          "Reject the assumption that low mileage compensates for excluded diesel status or substantial damage. SUNAT’s ordinary used-car guidance also addresses original factory left-hand steering and excludes specified serious damage and write-off histories. A converted steering position needs to be screened against that requirement, not priced as a routine preparation item.",
          "For a new car or a used EV, establish its precise category and procedure rather than copying a gasoline M1 file. Keep the technical and battery/charging evidence separate from the customs calculation."
        ],
        "sources": [
          "sunat"
        ],
        "links": [
          {
            "label": "Obtain the vehicle condition evidence",
            "href": "/export-services/buying-guide/inspect-a-used-car-from-china/"
          }
        ]
      },
      {
        "heading": "What determines the cost of importing a car to Peru?",
        "paragraphs": [
          "The car import tax estimate for Peru starts with the actual classification and customs valuation. Obtain the broker's dated calculation for the car and route, then add inspection, terminal handling, clearance and registration work outside the vehicle offer.",
          "Use the same delivery point for the seller and forwarder quotes. Keep freight and insurance in the budget once. EV charging equipment or local work belongs in the total when needed for the version you intend to use."
        ],
        "links": [
          {
            "label": "Use the landed-cost calculator",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          },
          {
            "label": "Compare FOB and CIF prices",
            "href": "/export-services/buying-guide/exw-fob-cif-car-shipping/"
          }
        ]
      },
      {
        "heading": "Importing an electric or hybrid car to Peru",
        "paragraphs": [
          "Specify whether the car is battery-electric, a plug-in hybrid or another hybrid configuration. Ask the importer to check the applicable category and supporting documents. A description such as “new energy” is not precise enough for a technical or customs review.",
          "For a used EV, request the battery report and charging evidence linked to the actual VIN. For any EV, check the AC and DC inlet against the intended local equipment. Price the inspection and support you need instead of treating a dashboard range photograph as the full battery assessment."
        ],
        "links": [
          {
            "label": "Read a used EV battery report",
            "href": "/export-services/buying-guide/used-ev-battery-report/"
          },
          {
            "label": "Check the charging setup",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          }
        ]
      },
      {
        "heading": "Questions about car imports to Peru",
        "questions": [
          {
            "question": "Can a used diesel passenger car be imported to Peru?",
            "answer": "SUNAT’s ordinary used-vehicle guidance excludes used M1 diesel passenger cars. Exceptions listed for certain heavy categories do not establish an M1 route. Check the precise category and any claimed exception with the Peruvian broker before purchase."
          },
          {
            "question": "Is an odometer photo sufficient for Peru’s mileage requirement?",
            "answer": "SUNAT Report 029-2021 states that an inspection or verification report alone does not establish the mileage condition where the required accredited-origin ownership, technical-inspection or equivalent document lacks the mileage. Arrange the accepted record with the importer before shipping and reconcile it with the dated VIN-linked reading."
          },
          {
            "question": "Can a car sold locally under the same model name be imported from China?",
            "answer": "Match the exact trim, technical identifiers and available documents with the proposed Peruvian route. A local model name does not confirm that the offered China-market version has the same equipment or registration evidence."
          }
        ],
        "sources": [
          "sunat",
          "mileage"
        ]
      }
    ],
    "links": [
      {
        "label": "Used car pre-shipment checklist",
        "href": "/export-services/buying-guide/inspect-a-used-car-from-china/"
      },
      {
        "label": "BYD Seagull specifications",
        "href": "/new-cars/byd/seagull/"
      },
      {
        "label": "Toyota Corolla specifications",
        "href": "/new-cars/toyota/corolla/"
      },
      {
        "label": "BYD Seal 07 DM-i specifications",
        "href": "/new-cars/byd/seal-07-dm-i/"
      }
    ]
  },
  {
    "slug": "chile",
    "name": "Chile",
    "region": "Latin America",
    "summary": "New vehicles and 3CV homologation",
    "title": "Import Cars from China to Chile: Approval, Costs and Shipping",
    "description": "Prepare a Chile car import by checking the exact version’s 3CV approval, VIN-linked CHI-e evidence, new/used route, origin documents and full local cost.",
    "answer": "For ordinary dealership sourcing, start with new vehicles. Chile generally prohibits used vehicle imports under Article 21 of Law 18.483, subject to legal exceptions. For a new car, have the importer verify the exact version’s 3CV homologation and registration path before ordering.",
    "image": "ports",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "customs",
        "label": "Chile Servicio Nacional de Aduanas, interpretation of Article 21 of Law 18.483",
        "href": "https://www.bcn.cl/leychile/navegar?i=1063106"
      },
      {
        "id": "3cv",
        "label": "ChileAtiende, homologation of light and medium vehicles",
        "href": "https://www.chileatiende.gob.cl/fichas/7/1/pdf"
      },
      {
        "id": "chi",
        "label": "ChileAtiende, individual electronic homologation certificate (CHI-e)",
        "href": "https://www.chileatiende.gob.cl/fichas/3961/1/pdf"
      }
    ],
    "sections": [
      {
        "heading": "Check the version against 3CV evidence",
        "paragraphs": [
          "For a new car, establish the vehicle homologation or type approval path with the Chilean importer. The transport ministry's 3CV process evaluates the model. The file also needs to explain how the individual CHI or CHI-e certificate will be obtained for the supplied unit.",
          "Match the approved identifiers, drive system and equipment to the quoted version. Chile's ordinary used vehicle restriction is a separate eligibility issue; a locally sold model name and a low odometer reading do not resolve it."
        ],
        "sources": [
          "3cv"
        ]
      },
      {
        "heading": "Connect model approval to the individual vehicle",
        "paragraphs": [
          "ChileAtiende describes model homologation through 3CV and the CHI-e associated with the vehicles covered by approved models. The review includes the relevant constructive, safety and emissions evidence. Ask the importer to identify the actual approval procedure, its covered version and who is authorized to produce the individual documentation.",
          "Obtain the approval or technical-report reference and match engine or motor, model, safety equipment and other relevant configuration fields to the offered car. Then establish how the VIN and engine identifier, where applicable, will enter the unit’s file. A certificate for a local version or a different powertrain should be examined for coverage before it is relied upon.",
          "If the version is not covered, ask the responsible applicant what review, vehicle presentation or tests are required, and obtain costs and dependencies before a purchase commitment. A document application or a same-name model in a showroom is not evidence that this unit’s file is complete."
        ],
        "sources": [
          "3cv",
          "chi"
        ]
      },
      {
        "heading": "Get a written answer on these five points",
        "table": {
          "caption": "Dealer file for a new vehicle import to Chile",
          "headers": [
            "Decision",
            "Evidence to request"
          ],
          "rows": [
            [
              "New or used",
              "New vehicle status and documentary route. If claiming an exception for used cars, have Customs confirm the exact legal basis."
            ],
            [
              "Homologation",
              "Exact configuration, supporting documents and the local CHI or CHI-e path."
            ],
            [
              "Origin and tariff",
              "Proof of origin if claiming preferential treatment, plus the broker’s dated tax calculation."
            ],
            [
              "EV charging and support",
              "Inlet photos, AC and DC compatibility, charger access and local servicing."
            ],
            [
              "Release and registration",
              "Named arrival terminal, local documents and the party handling registration and delivery."
            ]
          ]
        },
        "sources": [
          "customs",
          "3cv"
        ]
      },
      {
        "heading": "Chinese electric cars in Chile: match the approved version",
        "paragraphs": [
          "If a Chinese model is already sold in Chile, ask whether the approval evidence covers the configuration you are importing. Compare the technical identifiers, drive system and equipment, not just the badge and model name. Obtain the importer’s explanation of the certificate path for the actual units.",
          "For an EV or plug-in hybrid, include the charging inlets, onboard charging specification and intended local equipment in the purchase brief. Check essential software, language and service arrangements for the supplied market version. Keep those checks alongside the homologation file."
        ],
        "sources": [
          "3cv"
        ],
        "links": [
          {
            "label": "Check GB/T, Type 2 and CCS2 charging",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          },
          {
            "label": "Confirm imported-car support",
            "href": "/export-services/buying-guide/car-warranty-and-after-sales/"
          }
        ]
      },
      {
        "heading": "Build the Chile car import cost before comparing prices",
        "paragraphs": [
          "For a car import tax estimate in Chile, provide the invoice basis, vehicle details, manufacturing origin and named receiving point. Have the broker identify the customs valuation, applicable duty and import VAT treatment for that transaction. Keep the dated assumptions with the offer.",
          "Establish which certificate of origin or other origin evidence is required for any treatment being claimed. Shipment from China does not by itself establish manufacturing origin. Add customs clearance, registration and transport work outside the seller's scope.",
          "For Chinese electric cars, complete the local charging compatibility review alongside approval and cost checks. Obtain the specifications for the actual inlets and the equipment you intend to use in Chile."
        ],
        "links": [
          {
            "label": "Compare export quotations",
            "href": "/export-services/buying-guide/compare-car-export-quotes/"
          },
          {
            "label": "Calculate landed cost",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Separate country of dispatch from preferential origin",
        "paragraphs": [
          "“Shipped from China” identifies a transport fact. A claim for preferential duty depends on the applicable origin rules and accepted supporting evidence for that product and transaction. Have the Chilean customs specialist identify the current tariff line, origin procedure and required document before treating a preference as part of the saving.",
          "Keep manufacturing origin, exporter, invoice and transport references consistent. Ask the broker about any transit through another country and the evidence needed to preserve an origin claim. Do not assume a general certificate or the badge on the grille establishes preferential treatment.",
          "Compare the price after the broker has included the actual duties, taxes and any local vehicle charges that apply, then add homologation, terminal handling, registration and delivery outside the seller’s scope. Ordinary used-car restrictions and any special exception require their own legal review; an origin document does not remove them."
        ],
        "links": [
          {
            "label": "Reconcile origin and transport documents",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          },
          {
            "label": "Build the complete arrival and registration budget",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Questions about importing cars from China to Chile",
        "questions": [
          {
            "question": "Can I import a used car from China for normal dealer resale in Chile?",
            "answer": "Chile’s ordinary used-car restriction makes this a different question from sourcing a new vehicle. Do not assume a low-mileage car qualifies. Have Customs confirm the specific legal exception if one is proposed before paying for a used unit."
          },
          {
            "question": "What is the CHI or CHI-e for an imported car?",
            "answer": "It is the individual homologation certificate associated with the applicable Chilean approval process. Ask the importer how the exact vehicle will obtain its required certificate and match the vehicle details to the approved configuration."
          },
          {
            "question": "Is the shipping quote enough to start a Chile order?",
            "answer": "Complete the new/used status, version and approval review first. The shipping quote prices a transport service; it does not establish the car’s registration route. Put the remaining documents and acceptance conditions into the order."
          }
        ],
        "sources": [
          "customs",
          "3cv"
        ],
        "links": [
          {
            "label": "Prepare the car import documents",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "BYD Yuan Plus specifications",
        "href": "/new-cars/byd/yuan-plus/"
      },
      {
        "label": "MG4 specifications",
        "href": "/new-cars/mg/mg4/"
      },
      {
        "label": "Toyota Corolla specifications",
        "href": "/new-cars/toyota/corolla/"
      },
      {
        "label": "Check EV charging compatibility",
        "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
      }
    ]
  },
  {
    "slug": "colombia",
    "name": "Colombia",
    "region": "Latin America",
    "summary": "New EVs, VUCE and registration",
    "title": "Import Chinese Cars to Colombia: EVs, Costs and Documents",
    "description": "Prepare Colombia’s car import file with importer/RUT status, exact BEV or hybrid classification, applicable VUCE and ANLA evidence, taxes and registration work.",
    "answer": "To import cars from China to Colombia, establish the importer, classification and any required VUCE procedure before approving the version. Check vehicle registration and the intended use with the local importer. Ordinary commercial passenger-car sourcing and a claimed used-car exception need separate reviews.",
    "image": "charging",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "mincit",
        "label": "Colombia MinCIT, how to import to Colombia",
        "href": "https://www.mincit.gov.co/mincomercioexterior/como-importar-a-colombia"
      },
      {
        "id": "used",
        "label": "Colombia Ministry of Transport, June 2024 official response on used vehicle import and sale",
        "href": "https://mintransporte.gov.co/info/mintransporte/media/anexos/HJzBzDmd.pdf"
      },
      {
        "id": "anla",
        "label": "ANLA, VUCE environmental review for importing vehicles and motorcycles",
        "href": "https://www.anla.gov.co/01_anla/visto-bueno-importacion-vehiculos/informacion-general-vbivm"
      }
    ],
    "sections": [
      {
        "heading": "Confirm who is importing the vehicles",
        "paragraphs": [
          "Use the MinCIT procedure to confirm the importing entity, RUT information and which registrations, approvals or licences apply. VUCE is the single window for the relevant import procedures. The importer or broker should check the exact tariff classification and required approvals before placing a batch order.",
          "The transport ministry’s 2024 response discusses restrictions on import and commercial sale of used vehicles and separately considers narrow situations such as returning diplomatic personnel. Have a broker confirm any exception before treating a used car as eligible."
        ],
        "sources": [
          "mincit",
          "used"
        ]
      },
      {
        "heading": "Identify the approvals behind the VUCE entry",
        "paragraphs": [
          "VUCE is the platform for the permits and prior approvals that apply to the transaction. ANLA’s vehicle guidance explains its environmental review and the role of the Certificado de Emisiones por Prueba Dinámica y Visto Bueno por Protocolo de Montreal (CEPD) under Resolution 0762 of 2022. Have the importer establish the applicable requirements or exception for the exact powertrain and use.",
          "Match the technical evidence and any approval references to the proposed vehicle family and configuration. The person preparing the VUCE file should confirm the identifiers and supporting records required before lodging it. An application, accepted environmental evidence and customs release are different stages.",
          "Keep used-vehicle exceptions separate from ordinary dealer sourcing. The Ministry of Transport’s cited 2024 response addresses a particular returning-beneficiary case and explains prior licensing and registration considerations. It should not be read as general permission to import a used passenger-car batch."
        ],
        "sources": [
          "mincit",
          "anla",
          "used"
        ]
      },
      {
        "heading": "Compare an EV with a plug-in hybrid",
        "table": {
          "caption": "Evidence for a dealer’s vehicle review",
          "headers": [
            "File",
            "What to ask for"
          ],
          "rows": [
            [
              "Importer and VUCE",
              "RUT details and confirmation of the registration, approval or licence route."
            ],
            [
              "Vehicle classification",
              "Technical specification, battery or fuel type and the broker’s proposed tariff subheading. Price BEV and PHEV under their applicable categories."
            ],
            [
              "Technical approval",
              "Version-specific manufacturer evidence and the local registration requirements for that configuration."
            ],
            [
              "Charging and service",
              "Exact AC and DC inlet, charging operator acceptance and parts support for the offered version."
            ],
            [
              "Final cost",
              "Applicable tariff and taxes, clearance, port fees and yard delivery in one currency."
            ]
          ]
        },
        "sources": [
          "mincit"
        ]
      },
      {
        "heading": "Electric vs hybrid cars: prepare a Colombia version file",
        "paragraphs": [
          "When comparing Chinese electric cars in Colombia, state the actual powertrain rather than a broad “new energy” label. Give the importer the battery-electric, plug-in hybrid or other hybrid specification and the intended use. Ask it to review classification and required approvals for each proposed configuration.",
          "Confirm the exact market version before ordering a batch. Include the charging inlets, essential equipment, manuals and available service information. If a supplier proposes another trim, check the effect on the import file and local use before accepting the substitution."
        ],
        "sources": [
          "mincit"
        ],
        "links": [
          {
            "label": "Check Chinese EV charging standards",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          },
          {
            "label": "Compare exact model specifications",
            "href": "/guides/comparisons/"
          }
        ]
      },
      {
        "heading": "Car import tax in Colombia: compare the full transaction",
        "paragraphs": [
          "A car import tax estimate in Colombia needs the exact tariff classification and customs valuation. MinCIT's process starts with identifying the subheading and applicable requirements. Give the broker the actual battery-electric or plug-in hybrid specification and request a dated calculation for that case.",
          "Include the invoice, vehicle list and bill of lading information needed by the importer. Establish whether an import license, registration or other approval is required for this transaction through VUCE; do not treat a powertrain label as an exemption from the file review.",
          "Add handling, brokerage, vehicle registration and delivery outside the supplier's price. For Chinese electric cars, charging compatibility and local support also belong in the version decision, even when their cost is outside the customs calculation."
        ],
        "sources": [
          "mincit"
        ],
        "links": [
          {
            "label": "Build a landed-cost estimate",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Coordinate the importer, VUCE file and shipment",
        "paragraphs": [
          "Name the Colombian importer and the person handling the required VUCE procedure before approving dispatch. Ask them which vehicle documents and approvals need to be ready at each stage. Share the same technical file with the exporter so it can confirm what it will supply.",
          "Before booking, have the forwarder identify the arrival port, release arrangements and transport assumptions. Give the receiving team the VIN list and departure condition record. An estimated sailing date should not conceal an outstanding import requirement."
        ],
        "sources": [
          "mincit"
        ],
        "links": [
          {
            "label": "Prepare the export and import documents",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          },
          {
            "label": "Plan the arrival inspection",
            "href": "/export-services/buying-guide/vehicle-arrival-checklist/"
          }
        ]
      },
      {
        "heading": "Compare the actual BEV and hybrid files side by side",
        "paragraphs": [
          "Use the same currency, customs-value basis and receiving endpoint when comparing costs. A benefit applying to one propulsion category does not establish the treatment of another. Obtain a dated calculation for each candidate and price the local approval and service work outside the vehicle offer."
        ],
        "table": {
          "caption": "Version fields for the Colombian reviewer",
          "headers": [
            "Field",
            "Why it affects the review"
          ],
          "rows": [
            [
              "Propulsion and engine details",
              "Identify battery-electric, plug-in hybrid, non-plug-in hybrid or another configuration; retain displacement and motor data where relevant."
            ],
            [
              "Manufacturing origin and exact version",
              "Support classification, technical evidence and any claimed preferential treatment. A brand or generic “new energy” label is insufficient."
            ],
            [
              "Applicable approvals and tax calculation",
              "Record the broker’s tariff line, tax basis and legal conditions for any relief; identify unresolved ANLA or technical evidence."
            ],
            [
              "Registration and local operation",
              "Identify who completes the local vehicle file, and verify the charging or maintenance plan for the actual version."
            ]
          ]
        },
        "links": [
          {
            "label": "Normalize the supplier quotations",
            "href": "/export-services/buying-guide/compare-car-export-quotes/"
          },
          {
            "label": "Evaluate the actual charging pairing",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          }
        ]
      },
      {
        "heading": "Questions about importing a Chinese car to Colombia",
        "questions": [
          {
            "question": "Can a business use a personal exception to import used cars into Colombia?",
            "answer": "Have the importer identify a legal route for the actual buyer and purpose. The Ministry of Transport treats used-car exceptions separately from ordinary commercial sourcing. An exception for a qualifying individual does not establish a dealer’s resale route."
          },
          {
            "question": "Does importing an electric car remove the VUCE and document checks?",
            "answer": "Ask the importer which registrations, approvals or licences apply to that specific vehicle. Its powertrain is part of the classification file; it does not replace the importer, documentation and local-use review."
          },
          {
            "question": "What should a Colombian dealer include in the first supplier request?",
            "answer": "State the exact model and powertrain, quantity, intended use, destination and required vehicle documents. Add charging and support requirements for an EV. Ask the supplier to identify available units separately from cars still to be sourced."
          }
        ],
        "sources": [
          "mincit",
          "used"
        ],
        "links": [
          {
            "label": "Copy the wholesale car RFQ",
            "href": "/export-services/buying-guide/request-wholesale-car-quote/"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "BYD Yuan Plus model reference",
        "href": "/new-cars/byd/yuan-plus/"
      },
      {
        "label": "BYD Seal 07 DM-i model reference",
        "href": "/new-cars/byd/seal-07-dm-i/"
      },
      {
        "label": "Check EV charging compatibility",
        "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
      },
      {
        "label": "Send a dealer quote request",
        "href": "/export-services/buying-guide/request-wholesale-car-quote/"
      }
    ]
  },
  {
    "slug": "ecuador",
    "name": "Ecuador",
    "region": "Latin America",
    "summary": "New cars, RUC and ECUAPASS",
    "title": "Import Cars from China to Ecuador: Rules, Costs and ECUAPASS",
    "description": "Plan an Ecuador car import around model year and shipment date, RUC and ECUAPASS setup, prior controls, consistent VIN documents and destination costs.",
    "answer": "Under Ecuador’s ordinary COMEX vehicle import rule, plan around a new car of the applicable model year. Verify the version with a registered ECUAPASS importer before booking. The household goods route has separate rules for eligible returning residents.",
    "image": "documents",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "senae",
        "label": "Ecuador SENAE, how to register and import through ECUAPASS",
        "href": "https://www.aduana.gob.ec/servicio-al-ciudadano/para-importar/"
      },
      {
        "id": "comex",
        "label": "Ecuador COMEX Resolution 51, rules for imports of vehicles and parts",
        "href": "https://www.gob.ec/sites/default/files/regulations/2018-09/Documento_Resoluci%C3%B3n-51-COMEX-Disposiciones-importaciones-vehiculos.pdf"
      },
      {
        "id": "migrants",
        "label": "Ecuador SENAE, returning residents and household goods",
        "href": "https://www.aduana.gob.ec/servicio-al-ciudadano/para-migrantes/"
      }
    ],
    "sections": [
      {
        "heading": "Confirm the ordinary commercial route",
        "paragraphs": [
          "SENAE’s process starts with the importer’s RUC, digital signature arrangements and registration in ECUAPASS. Have the importer identify the vehicle subheading and check current COMEX measures and any vehicle controls that must be met before shipment.",
          "COMEX Resolution 51 sets a new-vehicle rule for covered imports, with a model year matching the import year or the following year. It uses the shipment date to determine the import year and the VIN to check the model year. Ask the broker to verify the current rule and any exception for the exact vehicle.",
          "Ecuador’s returning-resident household goods route has its own personal eligibility and vehicle conditions. Confirm any claimed exception with SENAE before using a used-car offer."
        ],
        "sources": [
          "senae",
          "comex",
          "migrants"
        ]
      },
      {
        "heading": "Assemble the ECUAPASS file",
        "table": {
          "caption": "Ecuador buyer and broker checklist",
          "headers": [
            "Item",
            "What to confirm"
          ],
          "rows": [
            [
              "Importer setup",
              "RUC, digital signature and approved ECUAPASS access."
            ],
            [
              "Classification and control",
              "Exact model, year, origin and powertrain. Check control and authorization documents by tariff subheading."
            ],
            [
              "Commercial and shipment records",
              "Invoice, transport document, vehicle list and origin evidence when applicable. Match consignee, quantities and identifiers."
            ],
            [
              "Declaration",
              "Who will submit the Declaración Aduanera de Importación and attach the supporting documents."
            ],
            [
              "Local use",
              "Vehicle approvals, registration documents, intended use and any charging or servicing needs."
            ]
          ]
        },
        "sources": [
          "senae",
          "comex"
        ]
      },
      {
        "heading": "Check model year against the Ecuador shipment plan",
        "paragraphs": [
          "Have the importer review the model year and planned shipment date together. The ordinary new-vehicle rule cited above ties the model-year check to the import year and uses the shipment date in that determination. A price agreed before a year-end delay may therefore need a fresh eligibility review.",
          "Ask the seller to supply the relevant vehicle identifiers and manufacturer information. If a version or production plan changes, send the revised file to the importer before dispatch. Keep the current COMEX and vehicle-control check with the order rather than relying on a model’s local sales name."
        ],
        "sources": [
          "comex"
        ],
        "links": [
          {
            "label": "Check the vehicle’s import eligibility",
            "href": "/export-services/buying-guide/check-car-import-eligibility/"
          }
        ]
      },
      {
        "heading": "Check the year boundary against the actual shipment record",
        "paragraphs": [
          "COMEX Resolution 51’s published amended text uses the shipment date to determine the import year for the ordinary vehicle rule. It permits new vehicles whose model year is the year of import or the following year, and verifies model year through the VIN. Documents identifying another condition do not become new-car records because an advertisement says “unused.”",
          "Illustrative timing: a 2026-model car planned for shipment in December 2026 needs a fresh eligibility check if departure moves into January 2027. A 2027-model car is a different model-year case. Have the broker apply the current rule and amendments to the actual shipment evidence; a reservation or intended sailing date should not be substituted for it.",
          "Keep the VIN/model-year confirmation, booking updates and accepted shipment document in one file. Agree who informs the buyer of a rollover and what happens if the revised timing changes eligibility. Avoid making an irrevocable shipping commitment while this point is unresolved."
        ],
        "sources": [
          "comex"
        ]
      },
      {
        "heading": "Electric cars in Ecuador: separate approval, taxes and charging",
        "paragraphs": [
          "For Chinese electric cars, establish the exact powertrain and category before requesting a car import tax estimate in Ecuador. The broker's classification and the applicable treatment should refer to the actual version and transaction.",
          "Keep vehicle registration and charging compatibility in the local-use review. Obtain the inlet photographs and vehicle documents, then confirm the intended local charging equipment. Price any equipment or support work left outside the supplier's offer."
        ],
        "links": [
          {
            "label": "Review GB/T and CCS2 compatibility",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          },
          {
            "label": "Estimate total landed cost",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Shipping a car to Ecuador: keep the ECUAPASS file consistent",
        "paragraphs": [
          "The importer should check the invoice, vehicle list and transport drafts against one approved set of identifiers. Assign the customs declaration and any required origin or control evidence to the responsible parties. Keep the RUC, digital signature and ECUAPASS setup consistent with the legal importer.",
          "Confirm the departure and arrival points, included handling and collection conditions with the forwarder. Review the model year and shipment date again if the schedule changes. COMEX and vehicle-control requirements should be resolved before the car is dispatched under an incomplete file."
        ],
        "sources": [
          "senae"
        ],
        "links": [
          {
            "label": "Use the document checklist",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          },
          {
            "label": "Compare shipping services",
            "href": "/export-services/buying-guide/container-vs-roro-car-shipping/"
          }
        ]
      },
      {
        "heading": "Give the ECUAPASS file an owner before loading",
        "paragraphs": [
          "For a returning-migrant or another exceptional regime, first establish the eligible person, legal conditions and actual vehicle file. Do not reuse that relief or permission in an ordinary commercial estimate. For an EV, record charging compatibility and support separately from customs or tax treatment."
        ],
        "table": {
          "caption": "Ecuador document and timing controls",
          "headers": [
            "Task",
            "Record to request"
          ],
          "rows": [
            [
              "Importer setup",
              "Responsible importer with the RUC, electronic-signature and ECUAPASS registration arrangements required by SENAE."
            ],
            [
              "Prior controls",
              "Broker’s identification of approvals or supporting documents for the tariff line and exact version; distinguish application from issued acceptance."
            ],
            [
              "Shipment review",
              "Consistent invoice, VIN list, model year, condition and transport data, checked before the document cutoff."
            ],
            [
              "Arrival and local use",
              "Clearance owner, valuation and tax estimate, terminal release, vehicle approval/registration work and delivery scope."
            ]
          ]
        },
        "sources": [
          "senae",
          "migrants"
        ],
        "links": [
          {
            "label": "Manage draft, issued and released documents",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          }
        ]
      },
      {
        "heading": "Questions about importing cars from China to Ecuador",
        "questions": [
          {
            "question": "Can I import a used car under Ecuador’s ordinary dealer route?",
            "answer": "The cited ordinary rule covers new vehicles subject to its model-year conditions. Ask the importer to identify a valid exception before considering a used unit. Returning-resident household goods provisions have their own buyer and vehicle requirements."
          },
          {
            "question": "Can a foreign company simply ship a car to my name in Ecuador?",
            "answer": "Confirm the importer setup and applicable procedure before shipment. SENAE describes RUC, digital-signature and ECUAPASS registration steps for the import process. The buyer and vehicle must have a workable clearance and local-use file."
          },
          {
            "question": "What happens if a quoted car is replaced with another model year?",
            "answer": "Have the importer repeat the year, classification and control review. Update the commercial offer and vehicle list, then confirm the effect on price, documents and timing before accepting the replacement."
          }
        ],
        "sources": [
          "senae",
          "comex",
          "migrants"
        ]
      }
    ],
    "links": [
      {
        "label": "BYD new car references",
        "href": "/new-cars/byd/"
      },
      {
        "label": "Geely new car references",
        "href": "/new-cars/geely/"
      },
      {
        "label": "Changan new car references",
        "href": "/new-cars/changan/"
      },
      {
        "label": "Check the export document file",
        "href": "/export-services/buying-guide/car-import-documents-checklist/"
      }
    ]
  },
  {
    "slug": "mexico",
    "name": "Mexico",
    "region": "Latin America",
    "summary": "2026 tariff lookup and commercial importer file",
    "title": "Import Cars from China to Mexico: Tariffs and Requirements",
    "description": "Review a Mexico car import by exact TIGIE/NICO line, current tariff date, importer status, vehicle version, pedimento evidence and full destination cost.",
    "answer": "For Mexico, obtain a dated customs review of the exact car, tariff fraction and NICO, importer and intended regime before accepting the price. Separate a new-car commercial file from any used-car exception. A tariff headline or the local sale of the same model does not establish the treatment of a China-market unit.",
    "image": "quote",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "tariff",
        "label": "Mexico Diario Oficial de la Federación, December 29, 2025 tariff amendments",
        "href": "https://sidof.segob.gob.mx/notas/docFuente/5777376"
      },
      {
        "id": "snice",
        "label": "Mexico SNICE, tariff modifications",
        "href": "https://www.snice.gob.mx/cs/avi/snice/tarifamodificaciones.html"
      },
      {
        "id": "sat",
        "label": "Mexico SAT, importer registration",
        "href": "https://www.sat.gob.mx/minisitio/PadronImportadoresExportadores/pi_inscripcion.html"
      },
      {
        "id": "used",
        "label": "Mexico Diario Oficial de la Federación, decree on definitive used vehicle imports",
        "href": "https://sidof.segob.gob.mx/notas/docFuente/5742285"
      }
    ],
    "sections": [
      {
        "heading": "Start with the tariff line and date",
        "paragraphs": [
          "Mexico published amendments to its tariff schedule on December 29, 2025. Ask the broker for the current TIGIE tariff fraction, NICO where applicable and the effective date used in your quote. Classify the actual new or used vehicle and its powertrain, then verify any later amendment before the order.",
          "A China shipment and a China-made vehicle describe different facts. Give the broker the manufacturing origin and shipment origin separately. Ask which non-tariff regulations and NOM requirements apply to the exact configuration."
        ],
        "sources": [
          "tariff",
          "snice",
          "sat"
        ]
      },
      {
        "heading": "Ask for a classification response you can use in the order",
        "paragraphs": [
          "The 29 December 2025 tariff amendment is a dated legal reference, not a single tax percentage for every vehicle imported from China. Check later changes in SNICE and the applicable official text for the exact tariff line. A change affecting auto parts does not, by itself, settle the rate for a complete vehicle.",
          "SAT’s importer-register guidance includes active RFC status, a valid electronic signature, tax-compliance and other registration conditions. Have the receiving specialist confirm the general and sector-specific registration requirements, or any lawful exception, for the actual importer and operation."
        ],
        "table": {
          "caption": "Fields for the Mexican customs specialist’s written review",
          "headers": [
            "Field",
            "What the reply should identify"
          ],
          "rows": [
            [
              "Vehicle and tariff identifiers",
              "Exact version, manufacturing origin, powertrain, new/used status, relevant technical data, TIGIE fraction and NICO."
            ],
            [
              "Applicable date and regime",
              "Legal basis and date used for the rate; any importer/programme conditions or later amendment affecting that tariff line."
            ],
            [
              "Customs value and taxes",
              "Accepted valuation inputs and the duties, taxes and fees applicable to that case, with bases and amounts or identified missing data."
            ],
            [
              "Non-tariff and registration requirements",
              "Applicable technical, environmental, safety and registration evidence for the offered configuration."
            ],
            [
              "Evidence due before shipping",
              "Importer status, invoice, transport/VIN file, required permissions and any document that remains pending."
            ]
          ]
        },
        "sources": [
          "tariff",
          "snice",
          "sat"
        ]
      },
      {
        "heading": "Build the commercial import file",
        "table": {
          "caption": "Checks for a Mexico dealer or fleet order",
          "headers": [
            "Check",
            "Evidence to request"
          ],
          "rows": [
            [
              "Importer",
              "Mexican importer identity, RFC and applicable Padrón de Importadores registration confirmed by the broker."
            ],
            [
              "Tariff and taxes",
              "Written classification, effective date, customs value and the taxes and fees included in the calculation."
            ],
            [
              "Pedimento",
              "Broker’s list of supporting invoice, transport, origin and conformity evidence. Match the VIN list to the declaration."
            ],
            [
              "Vehicle standards",
              "Applicable NOM, approvals and the state registration path for the version being quoted."
            ],
            [
              "Used route",
              "The specific legal basis for the vehicle. Check VIN and country of manufacture or assembly against any scheme claimed."
            ]
          ]
        },
        "sources": [
          "sat",
          "tariff",
          "used"
        ]
      },
      {
        "heading": "Chinese cars in Mexico and cars sourced directly from China",
        "paragraphs": [
          "Chinese electric cars advertised by a Mexican distributor can have different equipment from a directly sourced China-market unit. Check the actual version, charging compatibility and available vehicle documents before choosing a trim. Establish the importer and intended registration route for those units.",
          "For used car imports, have the broker identify the legal procedure for the actual country of origin and vehicle. Provisions discussed for cars made or assembled in North America do not become a route for a China-made car simply because it passes through another country."
        ],
        "sources": [
          "sat",
          "used"
        ],
        "links": [
          {
            "label": "Check the exact import requirements",
            "href": "/export-services/buying-guide/check-car-import-eligibility/"
          }
        ]
      },
      {
        "heading": "Mexico car import tax: what a calculator needs",
        "paragraphs": [
          "The Mexico car import tax calculation should name the current TIGIE fraction, NICO where applicable, customs value and date used. Provide the actual new or used status, powertrain and origin evidence. The broker should check later amendments and the applicable NOM requirements for that configuration.",
          "Obtain separate calculations for a battery-electric car and a hybrid when comparing those offers. Any claimed preferential treatment or relief needs its own conditions and supporting origin file.",
          "Add terminal handling, brokerage, conformity work, registration fees and inland delivery outside the vehicle price. Keep the supporting information consistent with the pedimento file. The landed-cost calculator adds your estimates; it does not establish a tariff or approve a car."
        ],
        "sources": [
          "tariff",
          "snice"
        ],
        "links": [
          {
            "label": "Use the landed-cost calculator",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Shipping cars to Mexico: confirm the import file before loading",
        "paragraphs": [
          "Give the exporter and forwarder the same approved vehicle list and importer details. Ask the broker to review the invoice, transport and other supporting information it needs for the pedimento. Resolve version or consignee changes before they create different records in the shipment file.",
          "Compare transport offers to the same Mexican port or final receiving point. Request the charges left outside the freight line, the release arrangements and the receiving inspection record. Keep any technical or NOM review distinct from the carrier’s acceptance of the cars."
        ],
        "links": [
          {
            "label": "Prepare the car import documents",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          },
          {
            "label": "Compare FOB and CIF offers",
            "href": "/export-services/buying-guide/exw-fob-cif-car-shipping/"
          }
        ]
      },
      {
        "heading": "Recheck the file when the offered car or import timing changes",
        "paragraphs": [
          "Ask the broker what date fixes the applicable treatment for the intended customs procedure. If the vehicle, declared origin, propulsion, importer or timing changes, request an updated review and cost sheet. Keep the legal basis and offer expiry alongside the price rather than carrying forward an old screenshot of a tariff.",
          "Compare the China-market technical sheet with the version supported locally: safety equipment, charging inlets, diagnostic access, parts identification, software and warranty. Ask the relevant provider to confirm any claimed local support for the VIN. A locally sold same-name model is useful for questions, but its support terms should not be assumed for the imported version.",
          "A Chinese-built used vehicle does not acquire North-American manufacturing eligibility simply by being routed through the United States. Have the specialist identify the precise legal route and registration evidence before budgeting a used-car purchase."
        ],
        "sources": [
          "used"
        ],
        "links": [
          {
            "label": "Check market-specific support",
            "href": "/export-services/buying-guide/car-warranty-and-after-sales/"
          },
          {
            "label": "Recalculate the complete import budget",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Questions about importing a car from China to Mexico",
        "questions": [
          {
            "question": "Can I use a US used-car import guide for a China-made car?",
            "answer": "Have the broker check manufacturing origin, VIN and the legal provision being claimed. The North American origin conditions in some used-vehicle schemes do not establish eligibility for a China-made vehicle."
          },
          {
            "question": "Does a CIF car price include Mexican clearance and registration?",
            "answer": "Ask the seller to itemize any additional services. Under the standard CIF allocation, the buyer handles import clearance and its costs. Confirm the broker, technical review, registration and local delivery budget separately."
          },
          {
            "question": "Can the local Mexican brand dealer honor the original warranty?",
            "answer": "Request written confirmation for the actual VIN, market version, ownership and use. A familiar brand or model name is not evidence that local distributor or manufacturer coverage applies to a directly sourced China-market car."
          }
        ],
        "links": [
          {
            "label": "Confirm the warranty and support scope",
            "href": "/export-services/buying-guide/car-warranty-and-after-sales/"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "Browse new cars",
        "href": "/new-cars/"
      },
      {
        "label": "Compare a FOB and CIF offer",
        "href": "/export-services/buying-guide/exw-fob-cif-car-shipping/"
      },
      {
        "label": "Build a landed-cost estimate",
        "href": "/export-services/buying-guide/calculate-car-landed-cost/"
      }
    ]
  },
  {
    "slug": "algeria",
    "name": "Algeria",
    "region": "North Africa",
    "summary": "New-car dealers and resident used-car rules",
    "title": "Import Cars from China to Algeria: New and Used Car Routes",
    "description": "Compare Algeria’s new-dealer and resident used-car routes, then check first-circulation age, funding, condition documents, conformity and customs costs.",
    "answer": "Choose the import route before choosing the vehicle. Algeria regulates the new-car dealer activity separately from the resident individual route for recent used vehicles. The latter has its own vehicle age, powertrain, funding and conformity requirements.",
    "image": "ports",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "dealers",
        "label": "Algeria Official Journal No. 76 of 2022, Executive Decree 22-383 on new vehicle dealers",
        "href": "https://www.joradp.dz/FTP/jo-francais/2022/F2022076.pdf"
      },
      {
        "id": "used",
        "label": "Algeria Official Journal No. 11 of 2023, Executive Decree 23-74 on resident used vehicle imports",
        "href": "https://www.joradp.dz/FTP/jo-francais/2023/F2023011.pdf"
      },
      {
        "id": "finance",
        "label": "Algeria Official Journal No. 84 of 2024, Finance Law for 2025",
        "href": "https://www.joradp.dz/FTP/jo-francais/2024/F2024084.pdf"
      }
    ],
    "sections": [
      {
        "heading": "Separate new-car distribution and personal imports",
        "table": {
          "caption": "Two routes to discuss with Algerian Customs",
          "headers": [
            "Route",
            "Who should verify it",
            "What to check first"
          ],
          "rows": [
            [
              "New-car dealer activity",
              "The licensed local dealer and its broker.",
              "Check the authorization, model coverage, conformity and documentation for the proposed units."
            ],
            [
              "Recent used car for a resident individual",
              "The resident buyer and their broker.",
              "Check residence, applicable frequency and funding conditions. Use first circulation and the proposed customs declaration date to check vehicle age."
            ]
          ]
        },
        "sources": [
          "dealers",
          "used"
        ]
      },
      {
        "heading": "Apply the route to the proposed vehicle",
        "paragraphs": [
          "Use the model pages to assemble a proposed vehicle file, then have the Algerian importer or resident buyer confirm its route before a deposit. These model references do not establish approval for an individual unit."
        ],
        "table": {
          "caption": "Model-specific questions for the receiving broker",
          "headers": [
            "Proposed vehicle or decision",
            "Evidence to review"
          ],
          "rows": [
            [
              "New Jetour Traveler",
              "Exact engine, drivetrain and trim; the licensed dealer’s authorization and configuration coverage; conformity and shipment documents."
            ],
            [
              "Used BYD Seagull",
              "VIN-linked foreign registration and ownership records, first circulation date and accepted recent condition evidence. The supplied mileage is a record to verify."
            ],
            [
              "A later transfer of a resident’s used car",
              "Finance Law 2025, Article 208 adds transfer and tax-benefit repayment conditions. Ask for the treatment applicable at clearance and any later transfer, including subsequent amendments."
            ]
          ]
        },
        "sources": [
          "dealers",
          "used",
          "finance"
        ],
        "links": [
          {
            "label": "Prepare the import document checklist",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          },
          {
            "label": "Review the used BYD Seagull record",
            "href": "/used-cars/byd/seagull/"
          },
          {
            "label": "Compare Jetour Traveler configurations",
            "href": "/new-cars/jetour/traveler/"
          }
        ]
      },
      {
        "heading": "Screen a recent used car against the decree",
        "paragraphs": [
          "For the resident individual route in Executive Decree 23-74, the three-year limit runs between first circulation and the declaration for consumption. Its passenger-car definition covers electric, spark-ignition gasoline and gasoline-electric hybrid vehicles. Verify the current rule and any subsequent change for the actual car and declaration date.",
          "For used car imports under that route, establish which roadworthiness certificate or inspection record is accepted and who handles the conformity appraisal. The personal procedure also has its own duty, tax and transfer conditions. Licensed new car dealers operate under a separate framework; a resident's checklist does not establish a dealer batch approval."
        ],
        "items": [
          "Gather residence and identity evidence, foreign registration and ownership transfer documents.",
          "Verify the accepted recent roadworthiness evidence and the local conformity appraisal.",
          "Agree who will handle a failed conformity check, and price clearance and onward delivery before release."
        ],
        "sources": [
          "used",
          "finance"
        ]
      },
      {
        "heading": "Prepare the resident buyer’s evidence before reserving a used car",
        "paragraphs": [
          "Executive Decree 23-74 concerns resident individuals buying for personal use. It provides for one acquisition every three years, counted from the declaration for consumption, and import using the resident’s own foreign currency. Confirm how the current rules and any subsequent amendments apply to the actual buyer before arranging payment.",
          "Article 8 lists identity and residence evidence, foreign registration or equivalent, proof of ownership transfer such as an invoice or sale contract, a roadworthiness document less than three months old from an authorized body in the registration country, and the conformity expert’s report. Agree who obtains each record, its timing and the accepted form for the receiving file.",
          "A seller’s general inspection checklist is useful for purchase due diligence, but the buyer must still establish whether it meets the stated documentary requirement. The decree requires good working order and no major or critical defect; an adverse conformity outcome can require re-export at the resident importer’s cost. Resolve responsibility and contingencies before shipment."
        ],
        "sources": [
          "used"
        ]
      },
      {
        "heading": "What to include in an Algeria car import cost estimate",
        "paragraphs": [
          "For a car import tax estimate in Algeria, give the local broker the invoice, vehicle age, powertrain, importer and intended regime. Request the applicable duties, taxes and clearance charges for that case. Add origin handling, freight and the work needed to reach the named receiving point.",
          "Keep the customs declaration, conformity and registration requirements with the dated estimate. For Chinese electric cars, check charging compatibility and support for the actual version before choosing it on price. Price any equipment and local work outside the transport offer."
        ],
        "links": [
          {
            "label": "Calculate the full landed cost",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          },
          {
            "label": "Compare car export prices",
            "href": "/export-services/buying-guide/compare-car-export-quotes/"
          }
        ]
      },
      {
        "heading": "Electric and hybrid cars: check local use before choosing a version",
        "paragraphs": [
          "Confirm the actual charging inlets, supported charging equipment and service arrangements in Algeria for the version being offered. A car’s battery condition, customs category and local charging compatibility are separate checks. Resolve each before treating the car as ready for use.",
          "For a used EV, request the dated VIN-linked battery evidence and agree how any unresolved findings will be handled. For every order, identify the documents the exporter will supply and the person who will review the file before loading."
        ],
        "links": [
          {
            "label": "Read a used EV battery report",
            "href": "/export-services/buying-guide/used-ev-battery-report/"
          },
          {
            "label": "Check charging compatibility",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          }
        ]
      },
      {
        "heading": "Leave time for the age and document checks",
        "paragraphs": [
          "The three-year vehicle-age window is measured from first circulation to the declaration for consumption. A model-year label, low mileage or the purchase date does not replace those dates. Ask the broker to calculate the window from the registration evidence and the planned declaration, then allow for sailing, clearance or document delays.",
          "For example, if a planned declaration falls close to the three-year boundary, a later sailing can change the decision even when the car has not been driven. Use the actual dates in the broker’s review; do not treat the estimated arrival day as a guaranteed declaration day.",
          "Keep later transfer conditions separate from initial vehicle eligibility. Finance Law 2025 Article 208 contains transfer and tax-benefit repayment provisions; obtain the treatment in force at clearance and before any planned resale. The personal route should not be presented as a commercial batch-import channel."
        ],
        "sources": [
          "used",
          "finance"
        ],
        "links": [
          {
            "label": "Prepare the arrival evidence",
            "href": "/export-services/buying-guide/vehicle-arrival-checklist/"
          },
          {
            "label": "Agree delay and substitution consequences",
            "href": "/export-services/buying-guide/car-order-payment-and-changes/"
          }
        ]
      },
      {
        "heading": "Questions about importing cars from China to Algeria",
        "questions": [
          {
            "question": "Does Algeria’s recent used-car route cover a diesel passenger car?",
            "answer": "The referenced passenger-car definition lists electric, spark-ignition gasoline and gasoline-electric hybrid vehicles. Do not assume a diesel version qualifies under that route. Ask Customs or the broker to confirm the current category for the actual car."
          },
          {
            "question": "Can an Algerian company use a resident individual’s import procedure?",
            "answer": "Identify the legal importer and purpose first. New-car dealer activity has its own framework, separate from the resident individual route. Have the local business confirm its authorization and vehicle approval before requesting batch pricing."
          },
          {
            "question": "Is model year enough to check the recent used-car age condition?",
            "answer": "Obtain the first-circulation evidence and the date used for the declaration review. Ask the broker to apply the current rule to those dates. The model year or date of a supplier photograph does not replace that record."
          }
        ],
        "sources": [
          "dealers",
          "used"
        ]
      }
    ],
    "links": [
      {
        "label": "Browse new car references",
        "href": "/new-cars/"
      },
      {
        "label": "Review the export document checklist",
        "href": "/export-services/buying-guide/car-import-documents-checklist/"
      },
      {
        "label": "Verify a used car before payment",
        "href": "/export-services/buying-guide/verify-chinese-used-car-before-payment/"
      }
    ]
  },
  {
    "slug": "morocco",
    "name": "Morocco",
    "region": "North Africa",
    "summary": "Customs valuation and NARSA registration",
    "title": "Import Cars from China to Morocco: Customs, Costs and Registration",
    "description": "Plan a Morocco car import using MCV and ADIL for customs questions, with a separate version, conformity and registration file and case-specific relief checks.",
    "answer": "Use the applicable Moroccan customs tools and a local specialist to estimate the actual vehicle’s charges, then confirm its separate conformity and registration route. Keep the vehicle identifiers and assumptions behind the estimate. A customs simulation or a personal MRE benefit does not establish commercial-import eligibility or road registration.",
    "image": "ports",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "mcv",
        "label": "Morocco Ministry responsible for Moroccans abroad, vehicle customs clearance and MCV simulator",
        "href": "https://mre.gov.ma/fr/e-services/dedouanement-dun-vehicule-mcv"
      },
      {
        "id": "adil",
        "label": "Morocco official portal, ADIL customs tariff and import measures",
        "href": "https://www.mre.gov.ma/fr/e-services/dedouanement-de-marchandises-adil"
      },
      {
        "id": "registration",
        "label": "Morocco Official Bulletin No. 5878 bis, rules for registration of imported motor vehicles",
        "href": "https://www.sgg.gov.ma/BO/bo_fr/2010/bo_5878-bis_fr.pdf"
      },
      {
        "id": "mre",
        "label": "Morocco ADII, customs allowance application for qualifying older residents abroad",
        "href": "https://www.douane.gov.ma/mcv/pdf/FORMULAIRE-MRE-AGES-AVANCES.pdf"
      }
    ],
    "sections": [
      {
        "heading": "Prepare a version and registration file",
        "table": {
          "caption": "Morocco order screening checklist",
          "headers": [
            "Question",
            "Evidence to request"
          ],
          "rows": [
            [
              "Which route applies?",
              "Commercial importer and vehicle category, or the exact personal regime where relevant. Confirm current age limits for a used car."
            ],
            [
              "How will it clear?",
              "Manufacturer and model details, new or used status, invoice, origin evidence if needed and the dated ADII valuation basis."
            ],
            [
              "How will it be registered?",
              "NARSA process for the variant, identification, required conformity evidence and the local registration file."
            ],
            [
              "Can the owner use and maintain it?",
              "For an EV, exact charging inlet, local charger acceptance and parts or service scope."
            ]
          ]
        },
        "sources": [
          "mcv",
          "adil",
          "registration"
        ]
      },
      {
        "heading": "Morocco car import tax calculator: use MCV and ADIL for the right questions",
        "paragraphs": [
          "Start with MCV, the vehicle customs service linked from Morocco's official MRE portal. Record the version, age, value, origin and regime entered, then have the broker confirm the customs valuation and treatment for the actual transaction. ADII is the customs administration; ADIL provides tariff and trade-measure information.",
          "Keep the assumptions and result with the invoice and technical file. Add handling, brokerage, vehicle registration and delivery outside that estimate. A calculation for another buyer or version does not establish your final bill."
        ],
        "sources": [
          "mcv",
          "adil"
        ],
        "links": [
          {
            "label": "Build a complete landed-cost worksheet",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Keep the assumptions behind an MCV or ADIL result",
        "paragraphs": [
          "The ministry’s MCV service description identifies a vehicle-customs information and simulation tool; ADIL provides information on duties, documents, applicable standards and tariff provisions. Use each for the question it covers and have the specialist confirm which procedure and valuation inputs apply to the proposed transaction.",
          "Save the date, vehicle identity and version, origin, age or first registration where requested, importer/regime and values entered. Retain the result and the legal references it uses. If the exact version is absent or an input is uncertain, identify the gap for ADII or the broker instead of selecting a similar model solely to obtain a lower estimate.",
          "Carry the resulting duties and charges into a full budget with freight, terminal work, local transport and registration/technical costs outside the supplier offer. Refresh the estimate when the car, regime or timing changes; an online calculation is not the customs authority’s final assessment."
        ],
        "sources": [
          "mcv",
          "adil"
        ],
        "links": [
          {
            "label": "Add the costs outside the customs calculation",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "New or used Chinese cars: confirm the Moroccan registration path",
        "paragraphs": [
          "Establish the NARSA identification and approval procedure for the exact version before buying a new or used unit. If a certificate of conformity or individual approval record is requested, identify the issuer and accepted scope rather than assuming an EU document accompanies every car.",
          "For a used unit, provide its first-registration and ownership file. Keep personal MRE relief separate from technical approval and a dealer's commercial calculation. Chinese electric cars and hybrid cars also need their own powertrain information and local-use review."
        ],
        "sources": [
          "registration",
          "mre"
        ],
        "links": [
          {
            "label": "Prepare the import document file",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          }
        ]
      },
      {
        "heading": "Electric and hybrid cars in Morocco: budget for the actual setup",
        "paragraphs": [
          "Give the broker the exact BEV, plug-in hybrid or other hybrid specification when requesting tax and registration estimates. Ask it to identify any treatment or conditions it is relying on. Do not treat “electric” as a complete description of the import charges.",
          "Separately check the charging inlets and the local equipment you will use. Ask the supplier which manuals, software functions, parts and written support apply to the quoted version. Price any charging equipment, diagnosis or local work still needed after delivery."
        ],
        "links": [
          {
            "label": "Check GB/T and CCS2 before ordering",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          },
          {
            "label": "Confirm warranty and after-sales terms",
            "href": "/export-services/buying-guide/car-warranty-and-after-sales/"
          }
        ]
      },
      {
        "heading": "Prepare separate customs and registration evidence",
        "paragraphs": [
          "The cited registration text distinguishes customs clearance evidence from the technical and registration documents. Ask the responsible local authority or authorized specialist to identify the current route for the actual car and who obtains its accepted conformity or individual-approval record. Allow for necessary translation and technical work in the schedule.",
          "The cited advanced-age MRE form relates to a particular personal-benefit application. Its existence does not establish that every returning resident, vehicle or dealer shipment qualifies. Obtain the specific eligibility decision and a cost estimate under the applicable regime before comparing it with ordinary commercial sourcing."
        ],
        "table": {
          "caption": "Two files to have the Moroccan specialists reconcile",
          "headers": [
            "File",
            "Questions and evidence"
          ],
          "rows": [
            [
              "Customs/import file",
              "Legal importer and regime, accepted vehicle category and age, invoice/valuation, origin, transport reference and required customs release records."
            ],
            [
              "Technical/registration file",
              "VIN, exact version, technical characteristics, foreign registration where applicable and the conformity or individual-approval evidence required by the responsible authority."
            ],
            [
              "Any claimed MRE relief",
              "Eligible beneficiary, residence/return evidence, vehicle ownership and the specific benefit conditions. Establish restrictions and supporting documents before using relief in a budget."
            ]
          ]
        },
        "sources": [
          "registration",
          "mre"
        ],
        "links": [
          {
            "label": "Review document coverage and approval gates",
            "href": "/export-services/buying-guide/check-car-import-eligibility/"
          },
          {
            "label": "Control the customs and registration records",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          }
        ]
      },
      {
        "heading": "Questions about importing a car from China to Morocco",
        "questions": [
          {
            "question": "Is the MCV customs estimate my final cost in Morocco?",
            "answer": "Use it within its stated scope and confirm the vehicle details and regime with the broker. Add the remaining terminal, handling, approval, registration and delivery charges. The final budget needs both the customs calculation and the work outside it."
          },
          {
            "question": "Can a dealer use a personal MRE customs allowance for a batch order?",
            "answer": "Confirm the actual buyer and regime. Relief published for qualifying Moroccans residing abroad has personal eligibility and vehicle conditions. Ask the commercial importer for its regular route and calculation rather than applying someone else’s allowance."
          },
          {
            "question": "Can I import a Chinese model already advertised in Morocco?",
            "answer": "Have the importer check the offered version, origin, documents and registration process. Local advertising for a model does not confirm approval or support for a directly sourced China-market unit."
          }
        ],
        "sources": [
          "mcv",
          "registration",
          "mre"
        ]
      }
    ],
    "links": [
      {
        "label": "Compare new cars",
        "href": "/new-cars/"
      },
      {
        "label": "Calculate the full landed cost",
        "href": "/export-services/buying-guide/calculate-car-landed-cost/"
      },
      {
        "label": "Check charging compatibility",
        "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
      }
    ]
  },
  {
    "slug": "tunisia",
    "name": "Tunisia",
    "region": "North Africa",
    "summary": "Ordinary import and returning-resident FCR",
    "title": "Import Cars from China to Tunisia: FCR, Taxes and Requirements",
    "description": "Check Tunisia FCR eligibility, residence and return dates, vehicle age, full or partial relief, ownership documents and the separate commercial import route.",
    "answer": "Start by identifying the importer and legal regime. Tunisia’s FCR is a conditional returning-resident benefit, with residence, timing, vehicle and transfer rules; it is not a commercial sourcing route. Check the buyer and the exact car together before applying relief to a quotation or booking.",
    "image": "documents",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "fcr",
        "label": "Tunisia Customs, permanent return (FCR) conditions and vehicle documents",
        "href": "https://www.douane.gov.tn/retour-definitif/"
      },
      {
        "id": "calculator",
        "label": "Tunisian Customs, vehicle duty and tax estimates by regime",
        "href": "https://www.douane.gov.tn/taxationst/"
      }
    ],
    "sections": [
      {
        "heading": "Use FCR only for the eligible returning resident",
        "paragraphs": [
          "FCR concerns qualifying Tunisians returning after residence abroad. The passenger-car age check under this route uses the vehicle’s first circulation and the date it enters Tunisia. Customs describes full and partial relief, with different registration and transfer conditions. Confirm which form of relief applies to the buyer, and whether any prior benefit affects eligibility.",
          "A business buying several units should ask its Tunisian importer to confirm its own authorization, vehicle approval and customs path. Keep the dealer’s calculation separate from any personal FCR estimate."
        ],
        "sources": [
          "fcr"
        ]
      },
      {
        "heading": "Check the buyer’s dates as well as the vehicle’s age",
        "paragraphs": [
          "The current Customs FCR page, referring to Decree 370 of 2024, sets conditions including Tunisian nationality, minimum age 18, at least two years of residence abroad and no more than 183 days in Tunisia during each relevant 365-day period. It states that the benefit can be renewed once every ten years. Confirm the residence calculation and previous benefit history for the applicant.",
          "The same guidance gives a two-year window for import or qualifying local acquisition from the defined last-entry date. For the covered passenger/professional vehicles, the maximum age is five years measured from first circulation to entry into Tunisia. These are different clocks: save the evidence for each and allow for shipment delays.",
          "For a resident buying on a commercial basis, identify that separate legal procedure before requesting batch prices. An FCR worksheet for one returning person does not establish authorization or relief for a dealer’s stock."
        ],
        "sources": [
          "fcr"
        ]
      },
      {
        "heading": "Send the right evidence for the intended route",
        "table": {
          "caption": "Tunisia buyer checklist",
          "headers": [
            "Check",
            "What to establish"
          ],
          "rows": [
            [
              "Buyer and regime",
              "Commercial importer or eligible returning resident. Confirm residence history and any prior benefit where relevant."
            ],
            [
              "Vehicle age and type",
              "VIN, first circulation date, class and exact powertrain. Ask the broker how to apply the chosen regime."
            ],
            [
              "Ownership and documents",
              "Invoice, ownership and registration evidence, plus any documents required by Customs for the intended relief."
            ],
            [
              "Tax and transfer",
              "Applicable treatment, registration series, transfer limitations and any later regularization cost."
            ],
            [
              "Local approval and handover",
              "Conformity, registration and release steps confirmed before shipment."
            ]
          ]
        },
        "sources": [
          "fcr",
          "calculator"
        ]
      },
      {
        "heading": "Car import tax in Tunisia: select the correct regime",
        "paragraphs": [
          "For a car import tax estimate in Tunisia, select the actual customs regime and enter the vehicle data in the official estimator. FCR concerns qualifying returning residents. Full relief and partial relief have different conditions, so retain the selected option and its written requirements with the buyer's file.",
          "Vehicle age under that route uses first circulation and entry into Tunisia. The buyer's eligibility and the car's eligibility need review together. A commercial importer must establish its own approval and calculation instead of carrying a personal FCR estimate into a dealer order.",
          "Add freight, insurance, terminal release, vehicle registration and delivery outside the estimate. For Chinese electric cars, complete the charging compatibility and support checks for the version being purchased. Keep outstanding costs and eligibility decisions visible before payment."
        ],
        "sources": [
          "calculator",
          "fcr"
        ],
        "links": [
          {
            "label": "Add the complete landed costs",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          }
        ]
      },
      {
        "heading": "Choosing a Chinese electric or hybrid car for Tunisia",
        "paragraphs": [
          "Provide the exact powertrain, vehicle category and version when checking eligibility and tax treatment. Ask the broker to confirm the actual regime instead of assuming that an electric or hybrid badge creates an exemption.",
          "Check the charging equipment and local support plan before committing to a China-market EV. Request the inlet photographs, manual and compatibility evidence for the intended local equipment. For a used unit, keep the battery report and any unresolved inspection findings with the purchase conditions."
        ],
        "links": [
          {
            "label": "Review Chinese EV charging compatibility",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          },
          {
            "label": "Read the used EV battery report",
            "href": "/export-services/buying-guide/used-ev-battery-report/"
          }
        ]
      },
      {
        "heading": "Compare relief conditions and prepare the ownership file",
        "paragraphs": [
          "Full and partial relief have different tax and transfer consequences. The official page describes full-relief vehicles registered in the RS series with restricted transfer except under Customs authorization; partial relief follows a different payment and registration basis. Ask Customs to confirm the calculation and consequences for the chosen option before selecting it on upfront tax alone.",
          "Prepare passport/residence and return records, evidence of ownership, foreign registration or accepted purchase documentation, and the required local identification and customs forms. The official guidance calls for an Arabic translation of records written in a language other than Arabic or French; plan for Chinese documents accordingly.",
          "Have the receiving specialist set a document schedule, including the current-validity requirements for local identification and supporting records. Retain the dated duty estimate, the accepted regime and all conditions with the VIN file. Price terminal work, local formalities and EV charging or maintenance arrangements outside any relief estimate."
        ],
        "sources": [
          "fcr"
        ],
        "links": [
          {
            "label": "Prepare and track the document file",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          },
          {
            "label": "Check the actual EV charging setup",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          }
        ]
      },
      {
        "heading": "Questions about importing a car from China to Tunisia",
        "questions": [
          {
            "question": "Can any Tunisian buyer use FCR to import a car?",
            "answer": "FCR concerns qualifying returning residents and has its own personal and vehicle conditions. Have Customs confirm the buyer’s circumstances and previous benefits where relevant. Do not assume that choosing a qualifying car establishes personal eligibility."
          },
          {
            "question": "Is Tunisia’s FCR age check based only on the model year?",
            "answer": "The official guidance uses first circulation and the vehicle’s entry into Tunisia for the age check. Get those records and have the applicable dates confirmed before shipment. A model-year label alone is not the complete calculation."
          },
          {
            "question": "What should the quote say if FCR eligibility is still pending?",
            "answer": "Identify the pending decision and the documents needed, then agree what happens if the buyer or car fails a condition. Keep the quoted payment, shipment and cancellation terms consistent with that unresolved step."
          }
        ],
        "sources": [
          "fcr"
        ],
        "links": [
          {
            "label": "Agree payment and order changes",
            "href": "/export-services/buying-guide/car-order-payment-and-changes/"
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
        "label": "Prepare the export document file",
        "href": "/export-services/buying-guide/car-import-documents-checklist/"
      },
      {
        "label": "Build a landed-cost estimate",
        "href": "/export-services/buying-guide/calculate-car-landed-cost/"
      }
    ]
  },
  {
    "slug": "egypt",
    "name": "Egypt",
    "region": "North Africa",
    "summary": "Commercial importer, Nafeza and ACID",
    "title": "Import Cars from China to Egypt: Taxes, ACID and Documents",
    "description": "Prepare Egypt car imports with the correct importer, sea-shipment ACI and ACID, Nafeza/CargoX data handoffs, VIN documents and case-specific tax estimates.",
    "answer": "For commercial sourcing, confirm the Egyptian importer’s registration and the vehicle’s clearance route. For sea shipments subject to Advance Cargo Information, arrange the ACID through Nafeza before dispatch and match it to the shipment documents.",
    "image": "documents",
    "reviewed": "2026-11-16",
    "sources": [
      {
        "id": "goeic",
        "label": "Egypt GOEIC, importer register services and registration",
        "href": "https://www.goeic.gov.eg/en/electronicServices/6"
      },
      {
        "id": "nafeza",
        "label": "Egypt Nafeza, Advance Cargo Information procedure",
        "href": "https://www.nafeza.gov.eg/en/pages/16"
      },
      {
        "id": "personal",
        "label": "Egypt government legal archive, Decree 319 of 2024 on personal-use car imports",
        "href": "https://dspace.id.com.eg/items/2f7f4187-b7ed-49ec-87b8-e3f5156f3b33"
      },
      {
        "id": "expats",
        "label": "Egypt Customs, circular on used cars under the expatriate route",
        "href": "https://customs.gov.eg/Home/NewsDetail/139"
      },
      {
        "id": "aci",
        "label": "SCZONE: Advance Cargo Information and Nafeza shipment requirements",
        "href": "https://sczone.eg/aci/"
      },
      {
        "id": "aci-guide",
        "label": "SCZONE, English sea-shipment ACI user guide",
        "href": "https://sczone.eg/uplibrary/Attachments-1/ACI-User-Guide-English-Final2.pdf"
      }
    ],
    "sections": [
      {
        "heading": "Confirm the commercial importer and the vehicle",
        "paragraphs": [
          "Identify the company or importer of record and confirm the applicable GOEIC importer register requirements. Give its broker the actual model, origin, powertrain and intended use to review the clearance, conformity and registration path.",
          "Personal-use imports are covered by separate conditions under Decree 319 of 2024. Egypt Customs also publishes instructions for used cars under its expatriate route. Check the current route for an individual separately from any commercial shipment."
        ],
        "sources": [
          "goeic",
          "personal",
          "expats"
        ]
      },
      {
        "heading": "Complete ACI before shipping",
        "table": {
          "caption": "Egypt sea shipment handoff",
          "headers": [
            "Who",
            "What to confirm"
          ],
          "rows": [
            [
              "Egyptian importer or broker",
              "Confirm ACI applicability, enter the shipment data on Nafeza and obtain the ACID before dispatch."
            ],
            [
              "Exporter",
              "Confirm exporter identifiers and upload the required shipment documents through the specified ACI workflow."
            ],
            [
              "Forwarder or carrier",
              "Check the ACID and matching party and shipment data before issue of the transport document."
            ],
            [
              "Buyer and broker",
              "Verify the invoice, VIN list, origin, quantities, tariff classification and supporting clearance documents together."
            ]
          ]
        },
        "sources": [
          "nafeza"
        ]
      },
      {
        "heading": "Distinguish advance data from the final shipment documents",
        "paragraphs": [
          "SCZONE’s sea-ACI guidance calls for advance cargo information at least 48 hours before export shipment and an importer-led ACID request through Nafeza. Its user guide describes the initial shipment-data and risk-review stage separately from later document exchanges. Allow for review time and the carrier’s cutoff; do not leave the request until the car is already dispatched.",
          "Agree one data register with the Egyptian importer, foreign exporter and carrier. Record the importer and exporter identifiers, ACID, invoice reference, goods and quantity, tariff information and the vehicle list. Ask the carrier or agent to confirm the required identifiers on its transport records and its submission cutoff.",
          "The exporter’s CargoX transmission and the importer’s review of the document set follow the applicable ACI stages. Some final records become available later than the initial request. Have the responsible parties confirm when each item is due rather than assuming every final document must exist when the first data is submitted."
        ],
        "sources": [
          "aci",
          "aci-guide"
        ],
        "links": [
          {
            "label": "Keep the document versions consistent",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          }
        ]
      },
      {
        "heading": "Importing Chinese electric and hybrid cars to Egypt",
        "paragraphs": [
          "Start with the importer and the proposed new or used vehicle route. Send the exact BEV, plug-in hybrid or other hybrid specification, manufacturing origin and intended use to the broker. Ask it to confirm the classification, required vehicle evidence and current treatment before comparing prices.",
          "For an EV, review the actual charging inlets and intended local equipment separately from customs eligibility. Confirm essential language, connected features and support for the market version. A car listed by an exporter is not evidence that these functions or local warranty coverage have been checked."
        ],
        "links": [
          {
            "label": "Check the EV charging arrangement",
            "href": "/export-services/buying-guide/chinese-ev-charging-standards/"
          },
          {
            "label": "Confirm imported-car support",
            "href": "/export-services/buying-guide/car-warranty-and-after-sales/"
          }
        ]
      },
      {
        "heading": "Egypt car import tax: obtain a vehicle-specific breakdown",
        "paragraphs": [
          "For an Egypt car import tax estimate, provide the actual specification, origin, invoice basis, importer of record and intended regime. Obtain a dated calculation with the customs valuation and the duties, taxes and fees in scope. The GOEIC importer review and vehicle eligibility should match the commercial transaction.",
          "Add document handling, terminal release, brokerage, approvals, vehicle registration and inland delivery outside the seller's offer. For Chinese electric cars, identify the exact powertrain and charging equipment in the same version file. Recalculate affected costs if the car, price or importer changes."
        ],
        "links": [
          {
            "label": "Use the landed-cost worksheet",
            "href": "/export-services/buying-guide/calculate-car-landed-cost/"
          },
          {
            "label": "Compare export quotation scopes",
            "href": "/export-services/buying-guide/compare-car-export-quotes/"
          }
        ]
      },
      {
        "heading": "Shipping cars to Egypt: reconcile ACID and vehicle records",
        "paragraphs": [
          "For a sea shipment subject to ACI, coordinate the Egyptian importer, exporter and forwarder before dispatch. Reconcile Nafeza data and the ACID with the commercial invoice, bill of lading information and approved vehicle list. Establish the required acceptance before loading.",
          "ACID identifies the shipment in the advance-information process; the VIN identifies the individual vehicle. Retain both where required and resolve an importer, exporter or vehicle change through the applicable procedure before it creates conflicting records.",
          "Agree who receives arrival notices and handles release. Give the collecting team the departure condition file and vehicle list so it can record the receiving inspection against the same units."
        ],
        "sources": [
          "nafeza",
          "aci"
        ],
        "links": [
          {
            "label": "Prepare the car import documents",
            "href": "/export-services/buying-guide/car-import-documents-checklist/"
          },
          {
            "label": "Use the arrival inspection checklist",
            "href": "/export-services/buying-guide/vehicle-arrival-checklist/"
          }
        ]
      },
      {
        "heading": "Resolve changes before they create conflicting ACI records",
        "paragraphs": [
          "The SCZONE explanation of Decree 38/2021 distinguishes permitted pre-departure amendments from changes to the contracting parties: importer/owner and foreign exporter are excluded from its stated amendment allowance. If one of those parties changes, obtain instructions through the applicable Nafeza procedure before shipping; do not simply overwrite a name on the invoice.",
          "For other changes, have the importer check the permitted process, timing and any required new acceptance. Reconcile the approved data, invoice, VIN list and carrier record after correction. Retain the acknowledgment and tell everyone holding an earlier version.",
          "ACID is an advance-information identifier. It does not replace the importer’s legal eligibility, the exact vehicle’s technical or customs requirements, tax payment or registration. Keep those approvals in the purchase file alongside the shipping workflow."
        ],
        "sources": [
          "aci"
        ],
        "links": [
          {
            "label": "Complete the separate vehicle eligibility review",
            "href": "/export-services/buying-guide/check-car-import-eligibility/"
          },
          {
            "label": "Hand the accepted file to the receiving team",
            "href": "/export-services/buying-guide/vehicle-arrival-checklist/"
          }
        ]
      },
      {
        "heading": "Questions about importing a car from China to Egypt",
        "questions": [
          {
            "question": "Do commercial and personal car imports use the same Egypt checklist?",
            "answer": "Check the importer and vehicle under the actual route. The commercial register, personal-use provisions and expatriate arrangements address different circumstances. Approval or relief for one buyer does not establish eligibility for a dealer’s order."
          },
          {
            "question": "Can the Egyptian importer arrange ACI after the car has shipped?",
            "answer": "Plan the applicable advance-information process before dispatch and confirm the required acceptance with the importer and carrier. Do not treat a shipment subject to ACI as ready to load while its ACID or required data remains unresolved."
          },
          {
            "question": "Does a China EV supplier’s price include Egyptian registration?",
            "answer": "Ask for the exact delivery endpoint and services in writing. Obtain the local clearance, approval, registration and delivery scope from the relevant providers. A vehicle-only or destination-port price does not state those arrangements by itself."
          }
        ],
        "sources": [
          "goeic",
          "personal",
          "expats",
          "nafeza",
          "aci"
        ]
      }
    ],
    "links": [
      {
        "label": "Browse new cars",
        "href": "/new-cars/"
      },
      {
        "label": "Prepare a wholesale car RFQ",
        "href": "/export-services/buying-guide/request-wholesale-car-quote/"
      },
      {
        "label": "Check the export documents",
        "href": "/export-services/buying-guide/car-import-documents-checklist/"
      }
    ]
  }
];
