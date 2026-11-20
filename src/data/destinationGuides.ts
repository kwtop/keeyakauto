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
    "answer": "For Bolivia, settle the model year, vehicle class and which acceptance procedure applies before you commit to a car. For flex-fuel and hybrid vehicles under RM 119/2025, the technical and test evidence has to match the declared vehicle type. Budget the sea leg, transit, border crossing and Bolivian clearance as one route.",
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
          "Bolivia’s customs regulation treats cars of the current or a later model year differently from earlier model years. A car from a previous model year can count as older even if it has never been driven. Ask the broker to confirm the current age and vehicle-class limits for the date you expect it to enter.",
          "IBMETRO runs the acceptance certificate procedures. Its May 2026 instructions under RM 119/2025 cover flex-fuel and hybrid vehicles and explain how the technical or test evidence must match the declared type. Ask which process fits the actual car, whether it is gasoline, hybrid or electric."
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
          "Send the broker the data sheet for the exact version along with the RFQ. For a hybrid acceptance application, IBMETRO’s May 2026 instructions require the importer to work from the declared vehicle type and its supporting technical evidence. Get the importer to confirm the procedure before you book the sea and inland legs."
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
              "The exact plug-in hybrid version, its model year and the technical evidence for its acceptance procedure. Check the charging equipment fitted to the car separately."
            ],
            [
              "Toyota Corolla gasoline or hybrid",
              "Keep gasoline and hybrid on separate specification files. Confirm the classification and acceptance procedure for the version you are actually offered."
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
          "IBMETRO’s May 2026 instructions distinguish new vehicles by vehicle type and older vehicles by the relevant application. The online application and the notarized declaration must agree. Have these ready: importer and representative details, vehicle quantity, origin and country of dispatch, model year, VIN or the applicable type identifier, engine type, and the declared category (FFV, PHEV, HEV or MHEV).",
          "You also need the test-report code, the issuing laboratory and its accreditation, recognition or designation. The report must match the declared vehicle or engine type/family and meet the procedure’s content requirements. For new vehicles, the laboratory-location requirement refers to the country of manufacture. Older vehicles have a different basis, so the importer should check which one its application falls under.",
          "Before submitting, check that the model year, engine identifier and hybrid category are the same on the technical sheet, test report, invoice and declaration. Documents in Spanish or English are accepted; anything else needs a formal Spanish translation. A test report for another engine family or a similarly named model leaves a real gap, and a translated sales brochure won’t fill it."
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
              "The IBMETRO procedure that applies and the technical or emissions test evidence behind it."
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
          "When comparing Chinese electric cars for Bolivia, list the classification and model year next to each exact version. Those two fields decide what Customs and IBMETRO will ask. A pickup needs its own classification review; it can’t borrow an approval from a passenger SUV.",
          "The technical file should state the fuel and drive system and include the acceptance or emissions test evidence that applies. IBMETRO publishes a process for flex-fuel and hybrid vehicles under RM 119/2025. Ask whoever prepares the file which evidence the offered configuration needs.",
          "For an EV, specify AC charging and DC fast charging separately, with photos of the inlets and the equipment you plan to use in Bolivia. Check the manuals and support for the version actually supplied; a familiar model name doesn’t guarantee them."
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
          "A car import tax estimate in Bolivia needs the broker's customs valuation and classification for the actual vehicle. Get a dated breakdown, then add the sea leg and inland transit to the Bolivian receiving point. If the quote ends at a foreign port, border handling and onward transport may not be in the price.",
          "The transport offer should name the sea port, transit provider and Bolivian clearance point. Make sure freight insurance covers the whole journey, and ask about storage or collection charges. If your budget includes registration and final delivery, keep them as separate lines."
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
          "Price every route to the same final delivery point in Bolivia. A cheap ocean-freight line can hide a lot of unpriced inland and border work. If the model year matters for eligibility, ask the broker which date counts legally, and allow for document or transit delays before you accept the shipment window."
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
              "Arrival notice, carrier release, terminal charges, storage terms and who collects the vehicle or container."
            ],
            [
              "Customs transit departure",
              "The authorized transit arrangement, the operator handling it, vehicle identifiers and the documents each country on the route requires."
            ],
            [
              "Border and Bolivian customs",
              "Transit closure and import file, acceptance records, broker, valuation and inspection costs."
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
            "answer": "Not by itself. Eligibility turns on the model year and vehicle class under the current Bolivian rule, and low mileage doesn’t change the year in the technical and registration records. Have the broker work out the age calculation before the seller allocates a car for shipment."
          },
          {
            "question": "Can the car travel through a port in Chile or Peru?",
            "answer": "Ask the forwarder to quote the actual sea and transit route and say who handles each customs movement. Arriving at a port in another country is not delivery in Bolivia, so the written scope should cover the onward transport, documents and charges."
          },
          {
            "question": "What should I send when requesting a Bolivia car import quote?",
            "answer": "Send the exact model, year, vehicle class, powertrain, quantity and final destination. For a used car, add its registration history and ask which IBMETRO and customs evidence is still missing. Ask for vehicle and transport prices on the same delivery basis."
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
    "answer": "For a used passenger car in category M1 under Peru’s ordinary route, SUNAT lists a maximum age of two years counted from the model year and no more than 32,000 km. Used M1 diesel cars are not allowed on this route. Check the exact car against every other condition before you buy.",
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
              "Confirm the car is M1 and count its age from the model year under the rule that applies. The ordinary limit is two years."
            ],
            [
              "Mileage",
              "The M1 limit is 32,000 km. Keep the required origin ownership, technical-inspection or equivalent record showing the mileage with the import and verification file."
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
              "Confirm the steering is original left-hand drive, and get evidence that the car meets the emissions requirement."
            ],
            [
              "Technical inspection",
              "Arrange the used-vehicle import technical sheet and the authorized physical/documentary inspection report before shipping."
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
          "SUNAT lists the Ficha técnica de importación de vehículos usados y especiales, signed by the importer and an authorized mechanical or mechanical-electrical engineer. It also lists the physical and documentary inspection report from an authorized verification entity. Agree who gets each document and who checks it against the exact VIN.",
          "SUNAT Report 029-2021 deals with a specific problem: the inspection report says the car complies, but the origin title, technical-inspection certificate or equivalent accredited-origin record shows no mileage. The report concludes that in that case the mileage condition has not been demonstrated. So an odometer photo or a general inspection statement can’t stand in for the required origin record.",
          "The mileage in that record, the reading at inspection and the import documents need to line up. If they conflict or a required field is missing, sort it out with the issuer and the receiving specialist before shipment. Keep both the original and corrected versions, and never fill the gap yourself."
        ],
        "sources": [
          "sunat",
          "mileage"
        ]
      },
      {
        "heading": "New vs used Chinese cars for Peru",
        "paragraphs": [
          "A new car needs its own technical and registration file, separate from the used M1 checks. For a used car, review age, mileage, condition, factory steering and emissions together. If the seller swaps in a different VIN, start that review again: clearing one car doesn’t clear another.",
          "Match the technical sheet and exact market version to the proposed procedure before you compare its price with the alternative. Keep first registration and model year as separate fields; they answer different questions."
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
          "An illustration only: a 2025-model M1 gasoline car showing 28,000 km in a 2026 transaction still needs the broker’s model-year calculation, documented mileage and every other quality check. Being under the mileage limit says nothing about steering origin, damage history, emissions or whether the documents will be accepted.",
          "Low mileage doesn’t make up for an excluded diesel engine or serious damage. SUNAT’s ordinary used-car guidance also covers original factory left-hand steering and excludes specified serious damage and write-off histories. A car with converted steering has to be checked against that requirement; don’t price the conversion as routine preparation.",
          "For a new car or a used EV, confirm its exact category and procedure instead of copying a gasoline M1 file. Keep the technical and battery/charging evidence apart from the customs calculation."
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
          "The car import tax estimate for Peru starts with the actual classification and customs valuation. Get the broker's dated calculation for the car and route, then add inspection, terminal handling, clearance and registration, which sit outside the vehicle offer.",
          "Have the seller and forwarder quote to the same delivery point, and count freight and insurance only once. If the version you plan to use needs EV charging equipment or local work, put that in the total too."
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
          "Say whether the car is battery-electric, a plug-in hybrid or another type of hybrid. Ask the importer to check its category and the supporting documents. “New energy” is too vague for a technical or customs review.",
          "For a used EV, ask for the battery report and charging evidence tied to the actual VIN. For any EV, check the AC and DC inlets against the local equipment you plan to use. A photo of the dashboard range is not a battery assessment, so price the inspection and support you actually need."
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
            "answer": "Not under the ordinary route. SUNAT’s used-vehicle guidance excludes used M1 diesel passenger cars, and the exceptions listed for certain heavy categories don’t open an M1 route. Check the exact category and any claimed exception with the Peruvian broker before you buy."
          },
          {
            "question": "Is an odometer photo sufficient for Peru’s mileage requirement?",
            "answer": "No. SUNAT Report 029-2021 says an inspection or verification report alone doesn’t prove the mileage condition if the required accredited-origin ownership, technical-inspection or equivalent document doesn’t show the mileage. Agree the accepted record with the importer before shipping and check it against a dated reading tied to the VIN."
          },
          {
            "question": "Can a car sold locally under the same model name be imported from China?",
            "answer": "Match the exact trim, technical identifiers and available documents to the proposed Peruvian route. A shared model name doesn’t mean the China-market version on offer has the same equipment or registration evidence."
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
    "answer": "For normal dealer sourcing, work with new cars. Chile generally prohibits used vehicle imports under Article 21 of Law 18.483, with some legal exceptions. For a new car, have the importer check the exact version’s 3CV homologation and registration path before you order.",
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
          "For a new car, agree the homologation or type approval path with the Chilean importer. The transport ministry's 3CV process evaluates the model. The file also has to show how each supplied car will get its individual CHI or CHI-e certificate.",
          "Check that the approved identifiers, drive system and equipment match the quoted version. Chile's ordinary used vehicle restriction is a separate question, and neither a model name sold locally nor a low odometer reading gets around it."
        ],
        "sources": [
          "3cv"
        ]
      },
      {
        "heading": "Connect model approval to the individual vehicle",
        "paragraphs": [
          "ChileAtiende describes model homologation through 3CV and the CHI-e for vehicles covered by approved models. The review covers construction, safety and emissions evidence. Ask the importer which approval procedure applies, which version it covers and who is authorized to produce the individual documents.",
          "Get the approval or technical-report reference and check the engine or motor, model, safety equipment and other configuration fields against the offered car. Then work out how the VIN, and the engine identifier if needed, will get into that car’s file. A certificate for a local version or a different powertrain may not cover your car, so check its coverage before relying on it.",
          "If the version isn’t covered, ask the applicant what review, vehicle presentation or tests are needed, and get the costs and what they depend on before you commit to buy. A document application or the same model in a showroom doesn’t prove this car’s file is complete."
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
          "If a Chinese model is already sold in Chile, ask whether the approval evidence covers the configuration you are importing. Compare the technical identifiers, drive system and equipment, not just the badge and model name. Ask the importer to explain how the actual cars will get their certificates.",
          "For an EV or plug-in hybrid, put the charging inlets, onboard charging specification and the local equipment you plan to use in the purchase brief. Check essential software, language and service support for the market version being supplied, and keep those checks with the homologation file."
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
          "For a car import tax estimate in Chile, give the broker the invoice basis, vehicle details, manufacturing origin and named receiving point. The broker should then set out the customs valuation, duty and import VAT treatment for that transaction. Keep those dated assumptions with the offer.",
          "Find out which certificate of origin or other origin evidence you need for any treatment you claim. Shipping from China doesn’t by itself prove manufacturing origin. Then add customs clearance, registration and any transport the seller doesn’t cover.",
          "For Chinese electric cars, run the local charging compatibility check alongside the approval and cost checks. Get the specifications for the actual inlets and for the equipment you plan to use in Chile."
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
          "“Shipped from China” tells you about transport, not origin. Preferential duty depends on the origin rules for that product and transaction, and on supporting evidence that customs accepts. Have the Chilean customs specialist confirm the current tariff line, origin procedure and required document before you count a preference as a saving.",
          "Manufacturing origin, exporter, invoice and transport references must be consistent. If the cars transit another country, ask the broker what evidence keeps the origin claim intact. A general certificate or the badge on the grille doesn’t earn preferential treatment.",
          "Compare prices only after the broker has worked in the actual duties, taxes and any local vehicle charges, and you have added homologation, terminal handling, registration and delivery outside the seller’s scope. Ordinary used-car restrictions and any special exception need their own legal review; an origin document doesn’t lift them."
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
            "answer": "Generally not. Chile’s ordinary used-car restriction makes this a different question from sourcing a new vehicle, and low mileage doesn’t make a car qualify. If someone proposes a legal exception, have Customs confirm it before you pay for a used car."
          },
          {
            "question": "What is the CHI or CHI-e for an imported car?",
            "answer": "It is the individual homologation certificate linked to the Chilean approval process. Ask the importer how your exact car will get its certificate, and check that the car’s details match the approved configuration."
          },
          {
            "question": "Is the shipping quote enough to start a Chile order?",
            "answer": "No. Settle new/used status, version and approval first. A shipping quote prices the transport, not the car’s route to registration. Write the remaining documents and acceptance conditions into the order."
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
    "answer": "To import cars from China to Colombia, settle who the importer is, the classification and any VUCE procedure before you approve a version. Check registration and intended use with the local importer. Normal commercial sourcing of passenger cars and a claimed used-car exception are separate reviews.",
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
          "Follow the MinCIT procedure to confirm the importing entity, its RUT information and which registrations, approvals or licences apply. VUCE is the single window for these import procedures. The importer or broker should check the exact tariff classification and required approvals before you place a batch order.",
          "The transport ministry’s 2024 response discusses restrictions on importing and commercially selling used vehicles, and deals separately with narrow cases such as returning diplomatic personnel. Have a broker confirm any exception before you treat a used car as eligible."
        ],
        "sources": [
          "mincit",
          "used"
        ]
      },
      {
        "heading": "Identify the approvals behind the VUCE entry",
        "paragraphs": [
          "VUCE is the platform for the permits and prior approvals that apply to the transaction. ANLA’s vehicle guidance explains its environmental review and the role of the Certificado de Emisiones por Prueba Dinámica y Visto Bueno por Protocolo de Montreal (CEPD) under Resolution 0762 of 2022. Ask the importer which requirements, or which exception, apply to the exact powertrain and use.",
          "Match the technical evidence and any approval references to the proposed vehicle family and configuration. Whoever prepares the VUCE file should confirm the identifiers and supporting records it needs before lodging it. Filing an application, getting environmental evidence accepted and customs release are three different stages.",
          "Keep used-vehicle exceptions apart from ordinary dealer sourcing. The Ministry of Transport’s 2024 response deals with one returning-beneficiary case and explains the prior licensing and registration points. It is not general permission to import a batch of used passenger cars."
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
              "Technical specification, battery or fuel type and the broker’s proposed tariff subheading. Price BEV and PHEV each under its own category."
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
              "Tariff and taxes, clearance, port fees and yard delivery, all in one currency."
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
          "When comparing Chinese electric cars in Colombia, name the actual powertrain instead of using a broad “new energy” label. Give the importer the battery-electric, plug-in hybrid or other hybrid specification and how the car will be used, and ask for a classification and approvals review of each configuration.",
          "Confirm the exact market version before you order a batch, including the charging inlets, essential equipment, manuals and available service information. If the supplier proposes another trim, check what it changes in the import file and for local use before you accept it."
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
          "A car import tax estimate in Colombia needs the exact tariff classification and customs valuation. MinCIT's process starts by finding the subheading and the requirements that come with it. Give the broker the actual battery-electric or plug-in hybrid specification and ask for a dated calculation for that car.",
          "Include the invoice, vehicle list and bill of lading details the importer needs. Check through VUCE whether this transaction needs an import license, registration or other approval. A powertrain label doesn’t exempt the car from that review.",
          "Then add handling, brokerage, vehicle registration and delivery that the supplier's price doesn’t cover. For Chinese electric cars, charging compatibility and local support belong in the version decision too, even when their cost sits outside the customs calculation."
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
          "Before you approve dispatch, name the Colombian importer and the person handling the VUCE procedure. Ask them which vehicle documents and approvals must be ready at each stage. Share the same technical file with the exporter so it can confirm what it will supply.",
          "Before booking, have the forwarder confirm the arrival port, release arrangements and transport assumptions. Give the receiving team the VIN list and the condition record from departure. Don’t let an estimated sailing date distract from an import requirement that is still open."
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
          "Compare costs in the same currency, on the same customs-value basis and to the same receiving point. A benefit for one propulsion category tells you nothing about another. Get a dated calculation for each candidate, and price the local approval and service work the vehicle offer leaves out."
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
              "State whether it is battery-electric, plug-in hybrid, non-plug-in hybrid or another configuration; keep the displacement and motor data where they matter."
            ],
            [
              "Manufacturing origin and exact version",
              "These support classification, technical evidence and any preferential treatment you claim. A brand or a generic “new energy” label isn’t enough."
            ],
            [
              "Applicable approvals and tax calculation",
              "Record the broker’s tariff line, tax basis and the legal conditions for any relief; list any ANLA or technical evidence still outstanding."
            ],
            [
              "Registration and local operation",
              "Name who completes the local vehicle file, and check the charging or maintenance plan for the actual version."
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
            "answer": "Not as a resale route. The Ministry of Transport treats used-car exceptions separately from ordinary commercial sourcing, and an exception for a qualifying individual doesn’t give a dealer a route to resell. Have the importer find a legal route for the actual buyer and purpose."
          },
          {
            "question": "Does importing an electric car remove the VUCE and document checks?",
            "answer": "No. Ask the importer which registrations, approvals or licences apply to that specific vehicle. The powertrain is one part of the classification file; the importer, documentation and local-use review still apply."
          },
          {
            "question": "What should a Colombian dealer include in the first supplier request?",
            "answer": "State the exact model and powertrain, quantity, intended use, destination and required vehicle documents. For an EV, add charging and support requirements. Ask the supplier to list cars it has available separately from cars it still has to source."
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
    "answer": "Under Ecuador’s ordinary COMEX vehicle import rule, plan on a new car of an eligible model year. Check the version with an importer registered in ECUAPASS before booking. Eligible returning residents use a separate household goods route with its own rules.",
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
          "SENAE’s process starts with the importer’s RUC, a digital signature and registration in ECUAPASS. The importer should then confirm the vehicle subheading and check current COMEX measures and any vehicle controls that must be met before shipment.",
          "COMEX Resolution 51 sets a new-vehicle rule for covered imports: the model year must match the import year or the following year. The shipment date sets the import year, and the VIN is used to check the model year. Ask the broker to confirm the current rule and any exception for the exact vehicle.",
          "Ecuador’s returning-resident household goods route has its own personal eligibility and vehicle conditions. Confirm any claimed exception with SENAE before you act on a used-car offer."
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
              "Invoice, transport document, vehicle list and, if needed, origin evidence. Consignee, quantities and identifiers must match across them."
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
          "Have the importer review the model year and planned shipment date together. Under the ordinary new-vehicle rule above, the model-year check depends on the import year, and the shipment date decides the import year. If shipment slips past year-end, a price agreed earlier may need a fresh eligibility review.",
          "Ask the seller for the vehicle identifiers and manufacturer information. If the version or production plan changes, send the revised file to the importer before dispatch. Keep the current COMEX and vehicle-control check with the order; don’t rely on the model’s local sales name."
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
          "The published amended text of COMEX Resolution 51 uses the shipment date to set the import year for the ordinary vehicle rule. It allows new vehicles whose model year is the year of import or the following year, and checks the model year through the VIN. If the documents show the car in another condition, an advert calling it “unused” doesn’t make it new.",
          "An illustration: a 2026-model car planned to ship in December 2026 needs a fresh eligibility check if departure slips into January 2027. A 2027-model car is a different model-year case. Have the broker apply the current rule and amendments to the actual shipment evidence, not to a reservation or planned sailing date.",
          "Keep the VIN/model-year confirmation, booking updates and accepted shipment document in one file. Agree who tells the buyer if the shipment rolls over, and what happens if the new timing changes eligibility. Don’t make an irrevocable shipping commitment until this is settled."
        ],
        "sources": [
          "comex"
        ]
      },
      {
        "heading": "Electric cars in Ecuador: separate approval, taxes and charging",
        "paragraphs": [
          "For Chinese electric cars, pin down the exact powertrain and category before you ask for a car import tax estimate in Ecuador. The broker's classification and treatment should be for the actual version and transaction.",
          "Vehicle registration and charging compatibility belong in the local-use review. Get the inlet photos and vehicle documents, then confirm the charging equipment you plan to use locally. Price any equipment or support work the supplier's offer leaves out."
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
          "The importer should check the invoice, vehicle list and transport drafts against one approved set of identifiers. Decide who prepares the customs declaration and any required origin or control evidence. The RUC, digital signature and ECUAPASS setup must all match the legal importer.",
          "Confirm the departure and arrival points, included handling and collection conditions with the forwarder. If the schedule changes, check the model year and shipment date again. Resolve COMEX and vehicle-control requirements before the car ships; don’t dispatch on an incomplete file."
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
          "For a returning migrant or another exceptional regime, first confirm the eligible person, the legal conditions and the actual vehicle file. That relief or permission doesn’t carry over to an ordinary commercial estimate. For an EV, record charging compatibility and support separately from customs or tax treatment."
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
              "The legal importer, with the RUC, electronic-signature and ECUAPASS registration arrangements SENAE requires."
            ],
            [
              "Prior controls",
              "The broker’s list of approvals or supporting documents for the tariff line and exact version, showing which are only applied for and which are issued."
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
            "answer": "Not under the ordinary rule, which covers new vehicles that meet its model-year conditions. Ask the importer to find a valid exception before you consider a used car. The returning-resident household goods provisions have their own buyer and vehicle requirements."
          },
          {
            "question": "Can a foreign company simply ship a car to my name in Ecuador?",
            "answer": "Confirm the importer setup and procedure before shipment. SENAE’s import process includes RUC, digital-signature and ECUAPASS registration steps. Both the buyer and the car need a clearance and local-use file that works."
          },
          {
            "question": "What happens if a quoted car is replaced with another model year?",
            "answer": "The importer has to repeat the year, classification and control review. Update the commercial offer and vehicle list, and check what the swap does to price, documents and timing before you accept it."
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
    "answer": "Before you accept a price for Mexico, get a dated customs review that covers the exact car, its tariff fraction and NICO, the importer and the intended regime. Keep a new-car commercial order and any used-car exception in separate files. A tariff headline, or the same model on sale locally, doesn’t tell you how a China-market unit will be treated.",
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
          "Mexico published amendments to its tariff schedule on December 29, 2025. Ask your broker which current TIGIE tariff fraction, NICO (if there is one) and effective date the quote uses. Classify the actual vehicle, new or used, with its powertrain, and check for later amendments before you place the order.",
          "Shipped from China and made in China are two different facts. Give the broker the manufacturing origin and the shipment origin separately, and ask which non-tariff regulations and NOM requirements cover the exact configuration."
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
          "The 29 December 2025 tariff amendment is a dated legal reference. It is not one tax percentage for every vehicle imported from China. Check SNICE for later changes and read the official text for the exact tariff line. A change that affects auto parts doesn’t, on its own, set the rate for a complete vehicle.",
          "SAT’s importer-register guidance covers active RFC status, a valid electronic signature, tax compliance and other registration conditions. Have your customs specialist in Mexico confirm the general and sector-specific registration requirements, or any lawful exception, for the actual importer and operation."
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
              "Exact version, manufacturing origin, powertrain, new/used status, key technical data, TIGIE fraction and NICO."
            ],
            [
              "Applicable date and regime",
              "The legal basis and date behind the rate, plus any importer/programme conditions or later amendment that affects that tariff line."
            ],
            [
              "Customs value and taxes",
              "The valuation inputs customs will accept, and the duties, taxes and fees for this case with bases and amounts, or a note of what data is still missing."
            ],
            [
              "Non-tariff and registration requirements",
              "The technical, environmental, safety and registration evidence the offered configuration needs."
            ],
            [
              "Evidence due before shipping",
              "Importer status, invoice, transport/VIN file, required permissions and any document still pending."
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
              "The Mexican importer’s identity, RFC and Padrón de Importadores registration, confirmed by the broker."
            ],
            [
              "Tariff and taxes",
              "Written classification, effective date, customs value, and which taxes and fees the calculation includes."
            ],
            [
              "Pedimento",
              "The broker’s list of the invoice, transport, origin and conformity evidence it needs. The VIN list must match the declaration."
            ],
            [
              "Vehicle standards",
              "The NOM, approvals and state registration path that apply to the version being quoted."
            ],
            [
              "Used route",
              "The specific legal basis for this vehicle. Check the VIN and the country of manufacture or assembly against any scheme being claimed."
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
          "Chinese electric cars sold by a Mexican distributor may be equipped differently from the same model sourced directly for the China market. Check the actual version, its charging compatibility and the vehicle documents you can get before you pick a trim. Settle who will import those units and how they will be registered.",
          "For used car imports, ask the broker which legal procedure fits the actual vehicle and its country of origin. Provisions for cars made or assembled in North America don’t become a route for a China-made car just because it passes through another country."
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
          "A Mexico car import tax calculation should show the current TIGIE fraction, the NICO if there is one, the customs value and the date used. You supply the new or used status, the powertrain and the origin evidence. The broker should check for later amendments and the NOM requirements for that configuration.",
          "If you are comparing a battery-electric car with a hybrid, get a separate calculation for each. Any preferential treatment or relief you plan to claim has its own conditions and needs its own origin file.",
          "Terminal handling, brokerage, conformity work, registration fees and inland delivery are not in the vehicle price, so add them on top. Keep the supporting figures consistent with the pedimento file. The landed-cost calculator only adds up your estimates; it doesn’t set a tariff or approve a car."
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
          "The exporter and the forwarder should work from the same approved vehicle list and the same importer details. Ask the broker to review the invoice, transport details and anything else it needs for the pedimento. Sort out any change of version or consignee before it leaves conflicting records in the shipment file.",
          "Compare transport offers to the same Mexican port or final delivery point. Ask which charges sit outside the freight line, how release will work and who records the arrival inspection. A carrier accepting the cars is not a technical or NOM review, so keep the two apart."
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
          "Ask the broker which date fixes the treatment under the intended customs procedure. If the vehicle, declared origin, propulsion, importer or timing changes, ask for an updated review and cost sheet. Keep the legal basis and the offer expiry next to the price, rather than relying on an old tariff screenshot.",
          "Compare the China-market technical sheet with the version supported locally: safety equipment, charging inlets, diagnostic access, parts identification, software and warranty. If someone claims local support, ask them to confirm it for the VIN. A model sold locally under the same name is a good reference for questions, but don’t assume its support terms carry over to the imported version.",
          "Routing a Chinese-built used vehicle through the United States does not give it North-American manufacturing eligibility. Have the specialist confirm the precise legal route and registration evidence before you budget for a used-car purchase."
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
            "answer": "Not as a shortcut. Some used-vehicle schemes have North American origin conditions, and a China-made vehicle doesn’t become eligible through them. Have the broker check the manufacturing origin, the VIN and the legal provision being claimed."
          },
          {
            "question": "Does a CIF car price include Mexican clearance and registration?",
            "answer": "Not under the standard CIF allocation: the buyer handles import clearance and pays for it. If the seller offers extra services, ask for them to be itemized. Budget the broker, technical review, registration and local delivery separately."
          },
          {
            "question": "Can the local Mexican brand dealer honor the original warranty?",
            "answer": "Ask for written confirmation for the actual VIN, market version, ownership and use. A familiar brand or model name doesn’t mean local distributor or manufacturer coverage extends to a directly sourced China-market car."
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
    "answer": "Pick the import route before you pick the car. Algeria regulates new-car dealers separately from the route that lets resident individuals import recent used vehicles, and that second route has its own rules on vehicle age, powertrain, funding and conformity.",
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
              "The dealer’s authorization, which models it covers, and the conformity and documents for the proposed units."
            ],
            [
              "Recent used car for a resident individual",
              "The resident buyer and their broker.",
              "Residence, how often the buyer may use the route, and funding conditions. Check vehicle age from first circulation to the planned customs declaration date."
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
          "Use the model pages to put together a file for the car you have in mind, then have the Algerian importer or resident buyer confirm the route before paying a deposit. A model page is a reference, not approval for any individual unit."
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
              "Exact engine, drivetrain and trim; whether the licensed dealer’s authorization covers that configuration; conformity and shipment documents."
            ],
            [
              "Used BYD Seagull",
              "Foreign registration and ownership records tied to the VIN, the first circulation date and recent condition evidence that will be accepted. Treat the stated mileage as something to verify."
            ],
            [
              "A later transfer of a resident’s used car",
              "Finance Law 2025, Article 208 adds transfer and tax-benefit repayment conditions. Ask how the car will be treated at clearance and at any later transfer, taking later amendments into account."
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
          "On the resident individual route under Executive Decree 23-74, the three-year limit runs from first circulation to the declaration for consumption. The decree’s passenger-car definition covers electric, spark-ignition gasoline and gasoline-electric hybrid vehicles. Check the current rule, including any later change, against the actual car and declaration date.",
          "For used car imports on that route, find out which roadworthiness certificate or inspection record is accepted and who carries out the conformity appraisal. The personal procedure also has its own duty, tax and transfer conditions. Licensed new car dealers work under a separate framework, so a resident's checklist says nothing about approval for a dealer batch."
        ],
        "items": [
          "Gather residence and identity evidence, foreign registration and ownership transfer documents.",
          "Confirm which recent roadworthiness evidence is accepted and how the local conformity appraisal works.",
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
          "Executive Decree 23-74 covers resident individuals buying for personal use. It allows one acquisition every three years, counted from the declaration for consumption, and the import must use the resident’s own foreign currency. Before arranging payment, confirm how the current rules, and any later amendments, apply to the actual buyer.",
          "Article 8 lists identity and residence evidence, foreign registration or equivalent, proof of ownership transfer such as an invoice or sale contract, a roadworthiness document less than three months old from an authorized body in the registration country, and the conformity expert’s report. Agree who gets each record, when, and in what form the Algerian file will accept it.",
          "A seller’s general inspection checklist helps with purchase due diligence, but the buyer still has to check whether it meets the decree’s document requirement. The decree requires good working order and no major or critical defect. If the conformity check goes against the car, it can be sent for re-export at the resident importer’s cost, so agree before shipment who is responsible and what happens then."
        ],
        "sources": [
          "used"
        ]
      },
      {
        "heading": "What to include in an Algeria car import cost estimate",
        "paragraphs": [
          "For a car import tax estimate in Algeria, give the local broker the invoice, vehicle age, powertrain, importer and intended regime, and ask for the duties, taxes and clearance charges for that case. Then add origin handling, freight and whatever it takes to get the car to the named delivery point.",
          "Keep the customs declaration, conformity and registration requirements with the dated estimate. For Chinese electric cars, check charging compatibility and support for the actual version before you choose on price. Any equipment and local work not in the transport offer needs its own price."
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
          "For the version on offer, confirm the actual charging inlets, the charging equipment it works with and how it will be serviced in Algeria. Battery condition, customs category and local charging compatibility are three separate checks. Clear each one before you treat the car as ready to use.",
          "For a used EV, ask for dated battery evidence tied to the VIN and agree how any open findings will be handled. On every order, be clear about which documents the exporter supplies and who reviews the file before loading."
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
          "The three-year vehicle-age window runs from first circulation to the declaration for consumption. Model year, low mileage and purchase date don’t replace those dates. Ask the broker to work out the window from the registration evidence and the planned declaration, then leave room for sailing, clearance or document delays.",
          "If the planned declaration falls close to the three-year boundary, a later sailing can change the answer, even if the car hasn’t been driven. Use the actual dates in the broker’s review, and don’t count on the estimated arrival day being the declaration day.",
          "Whether the car can be imported and whether it can later be transferred are separate questions. Finance Law 2025 Article 208 contains transfer and tax-benefit repayment provisions; check the treatment in force at clearance and again before any planned resale. The personal route is not a channel for commercial batch imports."
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
            "answer": "The decree’s passenger-car definition lists electric, spark-ignition gasoline and gasoline-electric hybrid vehicles, so don’t assume a diesel version qualifies under that route. Ask Customs or the broker to confirm the current category for the actual car."
          },
          {
            "question": "Can an Algerian company use a resident individual’s import procedure?",
            "answer": "Start with who the legal importer is and what the import is for. New-car dealer activity has its own framework, separate from the resident individual route. A company should confirm its own authorization and vehicle approval before asking for batch pricing."
          },
          {
            "question": "Is model year enough to check the recent used-car age condition?",
            "answer": "No. Get the first-circulation evidence and the date used for the declaration review, and have the broker apply the current rule to those dates. Neither the model year nor the date on a supplier’s photo replaces that record."
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
    "answer": "Estimate the charges for the actual car with Morocco’s customs tools and a local specialist, then confirm its conformity and registration route as a separate step. Keep the vehicle identifiers and assumptions with the estimate. A customs simulation or a personal MRE benefit doesn’t make a car eligible for commercial import or road registration.",
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
              "Commercial importer and vehicle category, or the exact personal regime for a personal import. Confirm the current age limits for a used car."
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
              "For an EV: the exact charging inlet, whether local chargers accept it, and what parts and service are covered."
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
          "Start with MCV, the vehicle customs service linked from Morocco's official MRE portal. Note the version, age, value, origin and regime you entered, then have the broker confirm the customs valuation and treatment for the real transaction. ADII is the customs administration; ADIL gives tariff and trade-measure information.",
          "Keep the inputs and the result with the invoice and technical file. Handling, brokerage, vehicle registration and delivery come on top of that estimate. A calculation done for another buyer or another version won’t tell you your final bill."
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
          "The ministry describes MCV as a vehicle-customs information and simulation tool. ADIL gives information on duties, documents, standards and tariff provisions. Use each for the question it answers, and have the specialist confirm which procedure and valuation inputs apply to your transaction.",
          "Save the date, the vehicle identity and version, origin, age or first registration if the tool asks for it, the importer and regime, and the values you entered. Keep the result and the legal references it cites. If the exact version isn’t listed or an input is uncertain, raise it with ADII or the broker. Don’t pick a similar model just because it gives a lower estimate.",
          "Carry the duties and charges into a full budget, along with freight, terminal work, local transport and the registration and technical costs that aren’t in the supplier’s offer. Update the estimate whenever the car, regime or timing changes. An online calculation is not the customs authority’s final assessment."
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
          "Before you buy a new or used unit, confirm the NARSA identification and approval procedure for the exact version. If a certificate of conformity or individual approval record is requested, find out who issues it and what it must cover. Don’t assume every car comes with an EU document.",
          "For a used unit, supply its first-registration and ownership file. Personal MRE relief is a separate matter from technical approval and from a dealer's commercial calculation. Chinese electric cars and hybrid cars also need their own powertrain details and a check of how they will work locally."
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
          "When you ask for tax and registration estimates, give the broker the exact specification: BEV, plug-in hybrid or another hybrid. Ask which treatment or conditions the estimate relies on. “Electric” on its own doesn’t tell you what the import charges will be.",
          "As a separate check, match the charging inlets to the local equipment you will use. Ask the supplier which manuals, software functions, parts and written support come with the quoted version. Then price any charging equipment, diagnosis or local work you will still need after delivery."
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
          "The registration rules cited here treat customs clearance evidence and the technical and registration documents as separate things. Ask the local authority or an authorized specialist which route currently applies to the actual car, and who gets its conformity or individual-approval record. Build any translation and technical work into the schedule.",
          "The advanced-age MRE form cited here is for one specific personal-benefit application. It doesn’t mean every returning resident, vehicle or dealer shipment qualifies. Get the eligibility decision and a cost estimate under that regime before you compare it with ordinary commercial sourcing."
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
              "VIN, exact version, technical characteristics, foreign registration if there is one, and the conformity or individual-approval evidence the authority requires."
            ],
            [
              "Any claimed MRE relief",
              "Eligible beneficiary, residence/return evidence, vehicle ownership and the specific benefit conditions. Confirm the restrictions and supporting documents before you count the relief in a budget."
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
            "answer": "No. Use it within its stated scope and have the broker confirm the vehicle details and regime. Terminal, handling, approval, registration and delivery charges come on top, so your final budget needs both the customs calculation and the work outside it."
          },
          {
            "question": "Can a dealer use a personal MRE customs allowance for a batch order?",
            "answer": "Start with who the buyer is and which regime applies. The relief published for qualifying Moroccans residing abroad has personal eligibility and vehicle conditions. A commercial importer should price the order on its own regular route, not on someone else’s allowance."
          },
          {
            "question": "Can I import a Chinese model already advertised in Morocco?",
            "answer": "Have the importer check the offered version, origin, documents and registration process. A model being advertised locally doesn’t mean a directly sourced China-market unit is approved or supported."
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
    "answer": "Start with who is importing and under which legal regime. Tunisia’s FCR is a conditional benefit for returning residents, with rules on residence, timing, the vehicle and transfer. It is not a commercial sourcing route. Check the buyer and the exact car together before you build relief into a quotation or booking.",
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
          "FCR is for qualifying Tunisians returning after living abroad. On this route, the passenger-car age check runs from the vehicle’s first circulation to the date it enters Tunisia. Customs describes full and partial relief, each with its own registration and transfer conditions. Confirm which one applies to the buyer, and whether a benefit used before affects eligibility.",
          "A business buying several units should have its Tunisian importer confirm its own authorization, vehicle approval and customs path. Don’t mix a dealer’s calculation with a personal FCR estimate."
        ],
        "sources": [
          "fcr"
        ]
      },
      {
        "heading": "Check the buyer’s dates as well as the vehicle’s age",
        "paragraphs": [
          "The current Customs FCR page, referring to Decree 370 of 2024, sets conditions including Tunisian nationality, minimum age 18, at least two years of residence abroad and no more than 183 days in Tunisia during each relevant 365-day period. It states that the benefit can be renewed once every ten years. Confirm how the applicant’s residence is counted and whether they have used the benefit before.",
          "The same guidance allows two years from the defined last-entry date to import the car or make a qualifying local acquisition. For the covered passenger/professional vehicles, the maximum age is five years, measured from first circulation to entry into Tunisia. These are two different clocks. Keep the evidence for each, and leave room for shipment delays.",
          "A resident buying on a commercial basis goes through a separate legal procedure; pin that down before asking for batch prices. An FCR worksheet for one returning person gives a dealer no authorization or relief for its stock."
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
              "Commercial importer or eligible returning resident. For FCR, confirm residence history and any earlier benefit."
            ],
            [
              "Vehicle age and type",
              "VIN, first circulation date, class and exact powertrain. Ask the broker how the chosen regime applies to them."
            ],
            [
              "Ownership and documents",
              "Invoice, ownership and registration evidence, plus any documents Customs requires for the relief you intend to claim."
            ],
            [
              "Tax and transfer",
              "The tax treatment, registration series, transfer limits and any later regularization cost."
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
          "For a car import tax estimate in Tunisia, choose the actual customs regime in the official estimator and enter the vehicle data. FCR is for qualifying returning residents. Full relief and partial relief have different conditions, so keep the option you chose and its written requirements in the buyer's file.",
          "On that route, vehicle age runs from first circulation to entry into Tunisia. Review the buyer's eligibility and the car's eligibility together. A commercial importer needs its own approval and its own calculation; a personal FCR estimate doesn’t carry over to a dealer order.",
          "Freight, insurance, terminal release, vehicle registration and delivery come on top of the estimate. For Chinese electric cars, finish the charging compatibility and support checks for the version you are buying. Before payment, make sure any open costs and pending eligibility decisions are clearly listed."
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
          "When checking eligibility and tax treatment, give the exact powertrain, vehicle category and version. Have the broker confirm the actual regime; an electric or hybrid badge doesn’t by itself mean an exemption.",
          "Before committing to a China-market EV, check the charging equipment and how the car will be supported locally. Ask for photos of the inlets, the manual and evidence that it works with the local equipment you plan to use. For a used unit, keep the battery report and any open inspection findings with the purchase conditions."
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
          "Full and partial relief lead to different tax and transfer consequences. According to the official page, full-relief vehicles are registered in the RS series and their transfer is restricted unless Customs authorizes it; partial relief works on a different payment and registration basis. Ask Customs to confirm the calculation and consequences of the option you want before choosing it on upfront tax alone.",
          "Prepare passport/residence and return records, proof of ownership, foreign registration or accepted purchase documents, and the required local identification and customs forms. The official guidance calls for an Arabic translation of records in any language other than Arabic or French, so Chinese documents will need translating.",
          "Have your specialist in Tunisia set a document schedule, including how current the local identification and supporting records must be. Keep the dated duty estimate, the accepted regime and all its conditions with the VIN file. Terminal work, local formalities and EV charging or maintenance need their own prices, outside any relief estimate."
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
            "answer": "No. FCR is for qualifying returning residents and has its own personal and vehicle conditions. Have Customs confirm the buyer’s circumstances and any earlier benefit. Choosing a qualifying car doesn’t make the buyer eligible."
          },
          {
            "question": "Is Tunisia’s FCR age check based only on the model year?",
            "answer": "No. The official guidance measures age from first circulation to the vehicle’s entry into Tunisia. Get those records and have the dates confirmed before shipment; the model year alone doesn’t settle it."
          },
          {
            "question": "What should the quote say if FCR eligibility is still pending?",
            "answer": "It should name the decision still pending and the documents needed, and say what happens if the buyer or the car fails a condition. The payment, shipment and cancellation terms in the quote should allow for that open step."
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
          "Start with the company that will be importer of record and confirm which GOEIC importer register requirements it must meet. Then give its broker the actual model, origin, powertrain and intended use so it can review the clearance, conformity and registration path.",
          "Personal-use imports are covered by separate conditions under Decree 319 of 2024. Egypt Customs also publishes instructions for used cars under its expatriate route. If an individual is importing, check their current route separately from any commercial shipment."
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
              "Confirm whether ACI applies, enter the shipment data on Nafeza and get the ACID before dispatch."
            ],
            [
              "Exporter",
              "Confirm the exporter identifiers and upload the required shipment documents through the specified ACI workflow."
            ],
            [
              "Forwarder or carrier",
              "Check the ACID, and that the party and shipment data match, before the transport document is issued."
            ],
            [
              "Buyer and broker",
              "Check the invoice, VIN list, origin, quantities, tariff classification and supporting clearance documents against each other."
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
          "SCZONE’s sea-ACI guidance calls for advance cargo information at least 48 hours before export shipment, with the importer requesting the ACID through Nafeza. Its user guide treats the first stage, shipment data and risk review, separately from the document exchanges that follow. Leave time for the review and the carrier’s cutoff. Don’t wait until the car has already been dispatched.",
          "Keep one shared data register with the Egyptian importer, the foreign exporter and the carrier. It should hold the importer and exporter identifiers, ACID, invoice reference, goods and quantity, tariff information and the vehicle list. Ask the carrier or its agent which identifiers must appear on its transport records and when its submission cutoff is.",
          "The exporter’s CargoX transmission and the importer’s review of the document set follow the ACI stages. Some final records only become available after the initial request. Ask each party when its items are due, rather than assuming every final document must exist when the first data is submitted."
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
          "Start with the importer and whether the car will go through the new or the used vehicle route. Send the broker the exact specification (BEV, plug-in hybrid or another hybrid), the manufacturing origin and the intended use. Ask it to confirm the classification, the vehicle evidence needed and the current treatment before you compare prices.",
          "For an EV, check the actual charging inlets against the local equipment you plan to use; that is a separate question from customs eligibility. Confirm the essential language settings, connected features and support for that market version. A car in an exporter’s listing doesn’t mean anyone has checked these functions or local warranty coverage."
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
          "For an Egypt car import tax estimate, give the actual specification, origin, invoice basis, importer of record and intended regime. Ask for a dated calculation showing the customs valuation and the duties, taxes and fees it covers. The GOEIC importer review and the vehicle eligibility should both match the actual commercial transaction.",
          "Document handling, terminal release, brokerage, approvals, vehicle registration and inland delivery are not in the seller's offer, so add them. For Chinese electric cars, record the exact powertrain and charging equipment in the same version file. If the car, price or importer changes, recalculate the costs it affects."
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
          "For a sea shipment subject to ACI, the Egyptian importer, exporter and forwarder need to be coordinated before dispatch. The Nafeza data and the ACID must match the commercial invoice, bill of lading information and approved vehicle list. Make sure the required acceptance is in place before loading.",
          "The ACID identifies the shipment in the advance-information process; the VIN identifies each vehicle. Keep both on file. If the importer, exporter or a vehicle changes, handle it through the proper procedure before it leaves conflicting records.",
          "Agree who receives arrival notices and who handles release. Give the team collecting the cars the departure condition file and vehicle list, so the arrival inspection is recorded against the same units."
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
          "SCZONE’s explanation of Decree 38/2021 separates the amendments allowed before departure from changes to the contracting parties. The importer/owner and the foreign exporter are excluded from its stated amendment allowance. If either of them changes, get instructions through the Nafeza procedure before shipping; don’t just overwrite a name on the invoice.",
          "For other changes, have the importer check what process is allowed, the timing and whether a new acceptance is needed. After the correction, make sure the approved data, invoice, VIN list and carrier record all match. Keep the acknowledgment, and tell everyone who holds an earlier version.",
          "The ACID is an advance-information identifier. It doesn’t replace the importer’s legal eligibility, the vehicle’s technical or customs requirements, tax payment or registration. Keep those approvals in the purchase file next to the shipping paperwork."
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
            "answer": "No. The commercial register, the personal-use provisions and the expatriate arrangements cover different situations, so check the importer and the vehicle under the route that actually applies. Approval or relief for one buyer doesn’t make a dealer’s order eligible."
          },
          {
            "question": "Can the Egyptian importer arrange ACI after the car has shipped?",
            "answer": "Plan the advance-information process before dispatch, not after, and confirm the required acceptance with the importer and carrier. A shipment subject to ACI isn’t ready to load while its ACID or required data is still open."
          },
          {
            "question": "Does a China EV supplier’s price include Egyptian registration?",
            "answer": "Only if the quote says so. Ask for the exact delivery point and services in writing, and get the local clearance, approval, registration and delivery scope from the providers who handle them. A vehicle-only or destination-port price doesn’t spell out those arrangements by itself."
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
