import type {Vehicle,VehicleVariant} from './catalog';
import type {ProductEditorial} from './productEditorial';
import {findSpec} from '../components/vehicle-detail/presentation';
import {specificationText} from './keySpecifications';

export function corollaProductEditorial(base:ProductEditorial,vehicle:Vehicle,selected?:VehicleVariant):ProductEditorial{
 if(!selected)return base;
 const references=(vehicle.variants??[]).filter(v=>v.technicalReference?.status==='documented');
 const gasoline=references.find(v=>v.powertrain==='Gasoline');
 const hybrids=references.filter(v=>v.powertrain==='Hybrid');
 const gasEngine=gasoline&&findSpec(gasoline.specs,'engine');
 const hybridEngine=hybrids[0]&&findSpec(hybrids[0].specs,'engine');
 const gasTransmission=gasoline&&findSpec(gasoline.specs,'transmission');
 const hybridTransmission=hybrids[0]&&findSpec(hybrids[0].specs,'transmission');
 const gasFuel=gasoline&&findSpec(gasoline.specs,'fuelConsumption');
 const hybridFuel=hybrids.flatMap(v=>{
  const spec=findSpec(v.specs,'fuelConsumption');
  return spec?.testCycle==='WLTC'&&spec.unit==='L/100 km'&&Number.isFinite(Number(spec.value))?[Number(spec.value)]:[];
 });
 const dimensions=findSpec(selected.specs,'dimensions');
 const hybridRange=hybridFuel.length?`${Math.min(...hybridFuel).toFixed(2)}–${Math.max(...hybridFuel).toFixed(2)} L/100 km (WLTC)`:'figures that need a version-specific test cycle';
 const engineSummary=base.technical.split('\n\n')[0];
 const questions=base.questions.map(item=>({...item,paragraphs:[...item.paragraphs]}));
 questions[1]={q:'What should I confirm for a Toyota Corolla left hand drive order?',paragraphs:[
  'The supplied version records mark steering as “To confirm”. State the steering position you need in the enquiry, and request photographs of the actual steering wheel and dashboard with identification evidence for that car.',
  'Before payment, have the supplier confirm the steering position on the written equipment list. Your importer must check import and registration eligibility separately for the destination.',
 ]};
 questions[2]={q:'How do I compare a Toyota Corolla price in China?',paragraphs:[
  'No fixed selling price is listed. When sourcing from China, send each supplier the same model year, full version name, colour, equipment list and quantity, together with your destination. Request an export quote with its currency and validity period.',
  'Compare EXW, FOB or CIF offers at the same named collection point or port. Price preparation, inspection, inland transport, freight, insurance and destination charges separately to see the costs beyond the domestic vehicle price.',
 ]};
 questions[5].paragraphs[0]+=' Obtain diagnostic support and the version-specific service schedule; for a hybrid, include hybrid battery diagnostics in the maintenance review.';
 return {
  ...base,
  intro:'The 2026 Toyota Corolla specs here apply to the supplied China-market versions. Equipment and technical figures can differ in another market, so compare vehicle specifications by the full trim name.',
  selectionHeading:'Toyota Corolla dimensions',
  selection:`The version shown is ${selected.name}.${dimensions?` Its listed dimensions are ${specificationText(dimensions)}.`:''} ${selected.seats?`Toyota Corolla seating capacity is ${selected.seats} seats in this reference.`:'Toyota Corolla seating capacity needs confirmation for the offered version.'} For a version comparison, keep the model year, seating layout, transmission and equipment list with that trim.`,
  technicalHeading:'Toyota Corolla engine specifications',
  technicalNoteHeadings:['Engine options','Transmission','Fuel consumption'],
  technicalNoteIcons:['engine','transmission','fuel'],
  technical:[engineSummary,
   `Toyota Corolla engine size is one difference between the two drivetrains. The Toyota Corolla 1.2 turbo reference lists ${gasEngine?.value??'an engine specification to confirm'}; the Toyota Corolla 1.8 hybrid reference lists ${hybridEngine?.value??'an engine specification to confirm'} for its engine. Compare the drive configuration and stated output basis as well as engine displacement.`,
   `In Toyota Corolla hybrid specs, engine, motor and combined output figures need separate labels. The Toyota Corolla hybrid transmission is recorded as ${hybridTransmission?.value??'to confirm'}; the gasoline Toyota Corolla CVT transmission is listed as ${gasTransmission?.value??'to confirm'}. The hybrid system and gasoline drivetrain need their own service information, even when trim names look similar.`,
   `Toyota Corolla fuel consumption figures need the same test cycle to be comparable. The recorded Toyota Corolla hybrid fuel consumption figures are ${hybridRange}, depending on trim${gasFuel?`; the gasoline reference lists ${specificationText(gasFuel)}`:''}. These test figures do not predict consumption in your driving conditions. Your importer also needs the offered car’s emissions documents for review.`,
  ].join('\n\n'),
  questions,
 };
}
