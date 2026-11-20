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
  'Our version records don’t say which side the steering wheel is on, so tell us the steering position you need when you enquire. We’ll ask for photos of the actual dashboard and steering wheel, matched to that car’s VIN.',
  'Before you pay, the steering position should be written on the equipment list. Your importer still needs to confirm the car can be imported and registered in your country.',
 ]};
 questions[2]={q:'How do I compare a Toyota Corolla price in China?',paragraphs:[
  'Prices change with stock, so we quote per order rather than listing one. Give every supplier the same model year, version, colour and quantity, and you’ll get offers you can actually compare. Check the currency and how long each quote is valid.',
  'Make sure the offers use the same term, EXW, FOB or CIF, at the same port. Ask for inspection, inland transport, freight and insurance as separate lines; that’s where the real difference between two quotes usually hides.',
 ]};
 questions[5].paragraphs[0]+=' Obtain diagnostic support and the version-specific service schedule; for a hybrid, include hybrid battery diagnostics in the maintenance review.';
 return {
  ...base,
  intro:'The 2026 Toyota Corolla specs on this page are for the China-market versions we can supply. Toyota Corolla specifications vary by market, so compare cars by their full trim name, not just the model.',
  selectionHeading:'Toyota Corolla dimensions',
  selection:`The version shown is ${selected.name}.${dimensions?` Its listed dimensions are ${specificationText(dimensions)}.`:''} ${selected.seats?`Toyota Corolla seating capacity is ${selected.seats} seats in this reference.`:'Toyota Corolla seating capacity needs confirmation for the offered version.'} When comparing versions, check the model year, transmission and equipment list as well.`,
  technicalHeading:'Toyota Corolla engine specifications',
  technicalNoteHeadings:['Engine options','Transmission','Fuel consumption'],
  technicalNoteIcons:['engine','transmission','fuel'],
  technical:[engineSummary,
   `There are two engines to choose from. The Toyota Corolla 1.2 turbo uses ${gasEngine?.value??'an engine still to be confirmed'}, while the Toyota Corolla 1.8 hybrid pairs ${hybridEngine?.value??'an engine still to be confirmed'} with an electric motor. Toyota Corolla engine size alone doesn’t tell the whole story: the hybrid’s quoted output may include the motor.`,
   `When reading Toyota Corolla hybrid specs, check whether a power figure is for the engine, the motor or both. The Toyota Corolla hybrid transmission is an ${hybridTransmission?.value??'unit still to be confirmed'}; the petrol car uses a Toyota Corolla CVT transmission, listed as ${gasTransmission?.value??'to be confirmed'}. The two drivetrains are serviced differently, so make sure your workshop can handle the one you buy.`,
   `Toyota Corolla fuel consumption figures are only comparable on the same test cycle. Toyota Corolla hybrid fuel consumption is ${hybridRange}, depending on trim${gasFuel?`, against ${specificationText(gasFuel)} for the 1.2 turbo`:''}. Real-world use will differ with roads and climate. Your importer will also want the car’s emissions documents.`,
  ].join('\n\n'),
  questions,
 };
}
