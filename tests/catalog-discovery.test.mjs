import test from 'node:test';
import assert from 'node:assert/strict';
import {vehicles, brands, brandHref} from '../src/data/catalog';
import {newCarBrands} from '../src/data/catalogBrands';
import {blankCatalogFilters, catalogParameters, hasCatalogFilters, matchesCatalog, readCatalogFilters, selectCatalogBrand} from '../src/data/catalogFilters';
import {sortCatalogVehicles} from '../src/data/catalogSort';
import {categoryHref, vehicleCategories, vehicleCategory, vehicleCategoryLabel} from '../src/data/vehicleCategories';
import {bodyGroupLabel} from '../src/data/catalogLabels';
import commercialData from '../src/data/commercial-vehicle-source.json';
import commercialScenes from '../src/data/commercialVehicleScenes.json';
import {blankDraft, blankVehicle, draftFromQuery, inquiryBrief, restoreDraft, sameInquiryDraft, selectedContactDraft, validateInquiry} from '../src/data/inquiry';
import {createInquiryReceipt,restoreInquiryReceipt} from '../src/data/inquiryReceipt';
import {detailRecommendations} from '../src/data/detailRecommendations';
import {detailModelScene} from '../src/data/modelVisuals';
import {assembleVehicleDetails} from '../src/data/vehicleDetailAssembly';
import {resolveSelectableVariantId,resolveVariantId,selectableVehicleVariants} from '../src/data/vehicleDefaultVariant';
import detailedData from '../src/data/vehicle-detail-data.json';
import {comparisonFields,findSpec,specField,summaryMetrics,groupSpecifications} from '../src/components/vehicle-detail/presentation';
import {specificationNote} from '../src/data/keySpecifications';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import usedImportConfig from '../src/data/used-car-import-map.json';
import suppliedUsedData from '../src/data/used-vehicle-data.json';
import {vehicleCardPhoto} from '../src/data/modelVisuals';
import {catalogBrandAsset} from '../src/data/catalogBrandAssets';
import {catalogBrandChoices,popularBrandSlugs} from '../src/data/brandPopularity';
import usedPresentations from '../src/data/used-car-presentations.json';
import usedShowroomCovers from '../src/data/used-car-showroom-covers.json';
import {manufacturerReferences} from '../src/data/manufacturerReferences';
import {homePopularModels} from '../src/data/homePopularModels';
import {vehicleGalleryPhotos} from '../src/data/vehicleGallery';
import {postInquiry,InquirySubmissionError} from '../src/data/inquirySubmission';

test('inquiry sending accepts only an acknowledged saved record, including an idempotent retry',async()=>{
 const payload={draft:{name:'Local QA'},idempotencyKey:'same-attempt-key',acceptPrivacy:true};
 for(const status of [200,201]){
  const id=await postInquiry(payload,async(url,options)=>{
   assert.equal(url,'/api/inquiries/');assert.equal(options.method,'POST');assert.equal(options.credentials,'same-origin');
   assert.deepEqual(JSON.parse(options.body),payload);
   return Response.json({saved:true,id:'confirmed-reference',duplicate:status===200},{status});
  });
  assert.equal(id,'confirmed-reference');
 }
});
test('a successful HTTP response without a valid saved receipt never counts as inquiry success',async()=>{
 for(const result of [{saved:false,id:'not-saved'},{saved:true},{saved:'true',id:'not-confirmed'},{saved:true,id:''},{saved:true,id:'x'.repeat(129)},null]){
  await assert.rejects(postInquiry({},async()=>Response.json(result)),InquirySubmissionError);
 }
 await assert.rejects(postInquiry({},async()=>new Response('<html>not a receipt</html>')),InquirySubmissionError);
});
test('inquiry security and server failures retain their actionable error and remain failures',async()=>{
 for(const status of [422,503])await assert.rejects(postInquiry({},async()=>Response.json({error:'Please retry the security check.'},{status})),e=>e instanceof InquirySubmissionError&&e.code===(status===422?'spam_check':'server')&&e.message==='Please retry the security check.');
});
test('an uncertain network result never creates a successful inquiry confirmation',async()=>{
 await assert.rejects(postInquiry({},async()=>{throw new TypeError('Connection lost');}),e=>e instanceof InquirySubmissionError&&e.code==='network'&&e.message.includes('could not confirm'));
});

test('Tiggo 8 preserves four supplied columns and keeps Tiger and Leopard dimensions separate',()=>{
  const listed=vehicles.find(vehicle=>vehicle.kind==='new'&&vehicle.brandSlug==='chery'&&vehicle.slug==='tiggo-8');
  assert.ok(listed);
  const detailed=assembleVehicleDetails(listed);
  const variants=selectableVehicleVariants(detailed);
  assert.equal(variants.length,4);
  assert.deepEqual(variants.map(variant=>variant.technicalReference.column).sort(),[1,2,3,4]);
  assert.equal(new Set(variants.map(variant=>variant.id)).size,4);
  for(const variant of variants){
    assert.equal(findSpec(variant.specs,'dimensions').value,variant.name.includes('Tiger')?'4749 × 1880 × 1710':'4725 × 1880 × 1705');
    assert.equal(findSpec(variant.specs,'power').value,'147');
    assert.equal(findSpec(variant.specs,'torque').value,'310');
    assert.equal(findSpec(variant.specs,'fuelConsumption').value,'7.20');
    assert.equal(findSpec(variant.specs,'fuelConsumption').testCycle,'WLTC');
    assert.equal(variant.seats,5);
    assert.equal(findSpec(variant.specs,'acceleration'),undefined);
    assert.equal(findSpec(variant.specs,'drive'),undefined);
  }
  assert.equal(detailed.defaultVariantName,'2026 Leopard 1.6T DCT Comfort');
  assert.equal(listed.variants.length,1,'Full comparisons should remain detail-only');
  assert.equal(listed.availability,'Unverified');
});

test('Tiggo 8 homepage entry opens the new detail page and uses its reviewed cover and six unique gallery views',()=>{
  const vehicle=vehicles.find(vehicle=>vehicle.kind==='new'&&vehicle.brandSlug==='chery'&&vehicle.slug==='tiggo-8');
  const home=homePopularModels.find(model=>model.key==='new/chery/tiggo-8');
  assert.ok(home);
  assert.equal(home.href,'/new-cars/chery/tiggo-8/');
  assert.equal(home.image.src,vehicleCardPhoto(vehicle).src);
  assert.equal(vehicle.gallery.length,6);
  const gallery=vehicleGalleryPhotos(vehicle);
  assert.equal(gallery.length,6);
  assert.equal(new Set(gallery.map(photo=>photo.src)).size,6);
  assert.equal(gallery[0].scene,false);
  assert.equal(gallery[0].original,vehicle.gallery[0].original||vehicle.gallery[0].src);
  assert.ok(!gallery.some(photo=>photo.src===home.image.src),'Scene covers stay outside the product gallery');
  for(const photo of gallery)assert.ok(existsSync('public'+photo.src),photo.src);
  assert.ok(!home.image.src.includes('tiggo-7'));
});

test('collapsed catalog brands show the configured popular brands with actual vehicle records',()=>{
  const shown=catalogBrandChoices(newCarBrands,[],false);
  assert.deepEqual(shown.map(brand=>brand.slug),[...popularBrandSlugs]);
  for(const slug of popularBrandSlugs){
    assert.ok(vehicles.some(vehicle=>vehicle.kind==='new'&&vehicle.brandSlug===slug),slug);
    assert.ok(vehicles.some(vehicle=>vehicle.kind==='used'&&vehicle.brandSlug===slug),slug);
  }
});

test('expanded catalog brands include all popular brands once in alphabetical order',()=>{
  const original=newCarBrands.map(brand=>brand.slug);
  const shown=catalogBrandChoices(newCarBrands,['toyota','aion'],true);
  assert.equal(shown.length,newCarBrands.length);
  assert.equal(new Set(shown.map(brand=>brand.slug)).size,shown.length);
  assert.deepEqual(shown.map(brand=>brand.name),[...newCarBrands].map(brand=>brand.name).sort((a,b)=>a.localeCompare(b,'en',{sensitivity:'base'})));
  for(const slug of popularBrandSlugs)assert.ok(shown.some(brand=>brand.slug===slug));
  assert.deepEqual(newCarBrands.map(brand=>brand.slug),original);
});

test('a selected nonpopular brand stays available when the catalog brand list is collapsed',()=>{
  const shown=catalogBrandChoices(newCarBrands,['aion','byd','aion'],false);
  assert.deepEqual(shown.map(brand=>brand.slug),[...popularBrandSlugs,'aion']);
  assert.equal(catalogBrandChoices(newCarBrands,[],false).some(brand=>brand.slug==='aion'),false);
});

test('used cars default to registration recency, not model year, with unknown dates last', () => {
  const items = [
    {name: 'Later model, older registration', year: '2025', usedRecord: {registrationMonth: '2023-12', mileageKm: 12000}},
    {name: 'Older model, newer registration', year: '2023', usedRecord: {registrationMonth: '2025-01', mileageKm: 43877}},
    {name: 'Unknown registration', year: '2026'},
    {name: 'Invalid month', year: '2026', usedRecord: {registrationMonth: '2026-13'}},
  ];
  const before = JSON.stringify(items);
  const sorted = sortCatalogVehicles(items, 'featured', 'used');
  assert.deepEqual(sorted.slice(0, 2).map(item => item.name), [items[1].name, items[0].name]);
  assert.equal(JSON.stringify(items), before);
  assert.deepEqual(sortCatalogVehicles(items, 'featured', 'new'), items);
});

test('lowest mileage sorts zero correctly and keeps missing or invalid mileage at the end', () => {
  const items = [
    {name: 'High mileage', year: '2024', usedRecord: {mileageKm: 43877}},
    {name: 'Unknown', year: '2024'},
    {name: 'Zero mileage', year: '2024', usedRecord: {mileageKm: 0}},
    {name: 'Low mileage', year: '2024', usedRecord: {mileageKm: 8000}},
    {name: 'Invalid', year: '2024', usedRecord: {mileageKm: -1}},
    {name: 'Nonfinite', year: '2024', usedRecord: {mileageKm: NaN}},
  ];
  assert.deepEqual(sortCatalogVehicles(items, 'mileage', 'used').slice(0, 3).map(item => item.name), ['Zero mileage', 'Low mileage', 'High mileage']);
});

test('mileage sorting survives URL round trips, paging and source-return parameters', () => {
  const filters = {...blankCatalogFilters(), brands: ['volkswagen'], sort: 'mileage'};
  const params = catalogParameters(filters, 2, 1, '?source=listing');
  assert.equal(params.get('source'), 'listing');
  assert.equal(params.get('viewpage'), '2');
  assert.deepEqual(readCatalogFilters('?' + params), filters);
  assert.equal(readCatalogFilters('?sort=unknown').sort, 'featured');
  assert.equal(catalogParameters(blankCatalogFilters()).has('sort'), false);
});

test('used-car range filters combine recorded mileage, registration age and engine size', () => {
  const now = new Date('2026-11-04T00:00:00Z');
  const car = {
    name: 'Test used car', brandSlug: 'test', body: 'SUV', powertrain: 'Gasoline',
    usedRecord: {mileageKm: 20000, registrationMonth: '2023-11'},
    specs: [{field: 'engine', value: '1.5T'}],
  };
  const filters = readCatalogFilters('?mileage=20000-50000&age=3-5&displacement=1.5-2', 'used');
  assert.equal(matchesCatalog(car, filters, now), true);
  assert.equal(matchesCatalog(car, {...filters, mileage: '0-20000'}, now), false);
  assert.equal(matchesCatalog(car, {...filters, age: 'under-3'}, now), false);
  const lowerEngineRange = {...filters, displacement: '1-1.5'};
  for (const value of ['1.5L', '1.5T']) {
    const atBoundary = {...car, specs: [{field: 'engine', value}]};
    assert.equal(matchesCatalog(atBoundary, lowerEngineRange, now), true);
    assert.equal(matchesCatalog(atBoundary, filters, now), true);
  }
  assert.equal(matchesCatalog({...car, specs: [{field: 'engine', value: '1.6L'}]}, lowerEngineRange, now), false);
  assert.equal(matchesCatalog({...car, powertrain: 'Pure Electric'}, filters, now), false);
  assert.equal(matchesCatalog({...car, specs: []}, filters, now), false);
  assert.equal(matchesCatalog({...car, specs: [], usedRecord: {...car.usedRecord, trim: '2026 DM-i 1.5T 230km Flagship'}}, filters, now), true);
  assert.equal(matchesCatalog({...car, usedRecord: undefined}, filters, now), false);
});

test('new catalog promotes the homepage best sellers and filters by the documented default engine', () => {
  const cars = vehicles.filter(vehicle => vehicle.kind === 'new');
  const ranked = sortCatalogVehicles(cars, 'featured', 'new');
  const featured = homePopularModels.filter(model => model.key.startsWith('new/'));
  assert.deepEqual(ranked.slice(0, featured.length).map(vehicle => vehicle.name), featured.map(model => model.name));

  const lower = readCatalogFilters('?displacement=1-1.5', 'new');
  const middle = readCatalogFilters('?displacement=1.5-2', 'new');
  const higher = readCatalogFilters('?displacement=2%2B', 'new');
  const cs55 = cars.find(vehicle => vehicle.slug === 'cs55-plus');
  assert.equal(cs55.engineSizeLitres, 1.5);
  assert.ok(matchesCatalog(cs55, lower) && matchesCatalog(cs55, middle));
  assert.ok(!matchesCatalog(cs55, higher));
  assert.ok(!matchesCatalog(cars.find(vehicle => vehicle.slug === 'seagull'), lower));
  assert.ok(hasCatalogFilters(higher, 'new'));
  assert.deepEqual(readCatalogFilters(catalogParameters(higher), 'new'), higher);
  assert.equal(readCatalogFilters('?displacement=invalid', 'new').displacement, '');
});

test('used catalog defaults to lowest mileage and keeps the explicit newest-first sort in shared URLs', () => {
  const defaults = blankCatalogFilters('used');
  assert.equal(defaults.sort, 'mileage');
  assert.equal(hasCatalogFilters(defaults, 'used'), false);
  assert.equal(catalogParameters(defaults, 1, 1, '', 'used').size, 0);
  const filters = readCatalogFilters('?sort=featured&mileage=100000%2B&age=8%2B&displacement=2%2B', 'used');
  const params = catalogParameters(filters, 2, 1, '?source=listing', 'used');
  assert.equal(params.get('sort'), 'featured');
  assert.equal(params.get('viewpage'), '2');
  assert.equal(params.get('source'), 'listing');
  assert.deepEqual(readCatalogFilters('?' + params, 'used'), filters);
  assert.deepEqual(readCatalogFilters('?mileage=invalid&power=Gasoline', 'used'), defaults);
  assert.equal(readCatalogFilters('?power=Gasoline&mileage=0-20000', 'new').power, 'Gasoline');
  assert.equal(readCatalogFilters('?power=Gasoline&mileage=0-20000', 'new').mileage, '');
});

test('supplied used-car records sort across page boundaries and retain historical records', () => {
  const items = vehicles.filter(vehicle => vehicle.kind === 'used');
  for (const sort of ['featured', 'mileage']) {
    const sorted = sortCatalogVehicles(items, sort, 'used');
    assert.equal(sorted.length, items.length);
    assert.deepEqual(new Set(sorted), new Set(items));
    const recorded = sorted.filter(vehicle => vehicle.usedRecord);
    assert.deepEqual(sorted.slice(0, recorded.length), recorded);
    for (let i = 1; i < recorded.length; i++) {
      if (sort === 'featured') assert.ok(recorded[i - 1].usedRecord.registrationMonth >= recorded[i].usedRecord.registrationMonth);
      else assert.ok(recorded[i - 1].usedRecord.mileageKm <= recorded[i].usedRecord.mileageKm);
    }
  }
});

test('detail disclosure groups retain every fact under its own version without mutations',()=>{
 for(const record of Object.values(detailedData.records))for(const version of record.variants){
  const original=JSON.stringify(version.specs);
  const groups=groupSpecifications(version.specs);
  const displayed=groups.flatMap(group=>group.specs);
  assert.equal(displayed.length,version.specs.length,`Lost or duplicated facts: ${version.name}`);
  assert.ok(version.specs.every(spec=>displayed.filter(item=>item===spec).length===1),`Facts reassigned: ${version.name}`);
  assert.equal(new Set(groups.map(group=>group.id)).size,groups.length);
  assert.ok(groups.every(group=>group.specs.length>0));
  assert.equal(JSON.stringify(version.specs),original);
 }
});

test('version disclosure groups keep differing test cycles, qualifications and charge intervals',()=>{
 const destroyer=detailedData.records['byd/destroyer-05'].variants[0];
 const battery=groupSpecifications(destroyer.specs).find(group=>group.id==='battery');
 const ranges=battery.specs.filter(spec=>spec.field==='electricRange');
 assert.deepEqual(ranges.map(spec=>[spec.value,spec.testCycle]),[['46','WLTC'],['55','NEDC']]);
 const hybrid=detailedData.records['toyota/corolla'].variants[0];
 const gasoline=detailedData.records['toyota/corolla'].variants[3];
 const dimensions=version=>groupSpecifications(version.specs).flatMap(group=>group.specs).find(spec=>spec.field==='dimensions').value;
 assert.equal(dimensions(hybrid),'4710 × 1780 × 1435');
 assert.equal(dimensions(gasoline),'4635 × 1780 × 1455');
 const power=groupSpecifications(hybrid.specs).find(group=>group.id==='performance').specs.find(spec=>spec.field==='power');
 assert.match(specificationNote(power),/engine, motor or combined system/);
 for(const record of Object.values(detailedData.records))for(const version of record.variants){
  const charge=version.specs.find(spec=>spec.field==='fastCharging');
  if(charge)assert.ok(groupSpecifications(version.specs).find(group=>group.id==='battery').specs.includes(charge));
 }
});

test('unknown specification fields remain visible without borrowing fields from another version',()=>{
 const partial=[{label:'Recorded equipment',value:'Supplied equipment list',source:'Test fixture'}];
 assert.deepEqual(groupSpecifications(partial).map(group=>group.id),['additional']);
 assert.equal(groupSpecifications(partial)[0].specs[0],partial[0]);
 assert.deepEqual(groupSpecifications([]),[]);
});

test('version pickers exclude empty catalog placeholders but keep sourced configurations', () => {
  let removed=0;
  for(const car of vehicles.filter(vehicle=>vehicle.kind==='new').map(assembleVehicleDetails)){
    const reference=manufacturerReferences[`${car.brandSlug}/${car.slug}`];
    const choices=selectableVehicleVariants(car,reference?.specs.length?reference.variantId:undefined);
    assert.ok(choices.length>0,`No configuration choices for ${car.name}`);
    assert.ok(choices.some(variant=>variant.id===car.defaultVariantId),`Missing populated default: ${car.name}`);
    assert.deepEqual(choices.filter(variant=>variant.technicalReference?.status==='documented'),car.variants.filter(variant=>variant.technicalReference?.status==='documented'));
    removed+=car.variants.length-choices.length;
    for(const variant of choices){
      assert.ok(variant.technicalReference?.status==='documented'||(variant.id===reference?.variantId&&reference.specs.length>0));
    }
  }
  assert.equal(removed,38);
  const camry=assembleVehicleDetails(vehicles.find(vehicle=>vehicle.kind==='new'&&vehicle.slug==='camry'));
  assert.equal(selectableVehicleVariants(camry).length,4);
  assert.ok(!selectableVehicleVariants(camry).some(variant=>variant.id==='2027-ae7814971c'));
  const bz3x=assembleVehicleDetails(vehicles.find(vehicle=>vehicle.kind==='new'&&vehicle.slug==='bz3x'));
  assert.ok(selectableVehicleVariants(bz3x,manufacturerReferences['toyota/bz3x'].variantId).some(variant=>variant.id==='2026-bfb41a1d46'));
});

test('retired placeholder links select a populated default without aliasing unknown trims', () => {
  const camry=assembleVehicleDetails(vehicles.find(vehicle=>vehicle.kind==='new'&&vehicle.slug==='camry'));
  const choices=selectableVehicleVariants(camry);
  assert.equal(resolveSelectableVariantId(camry,choices,'2027-ae7814971c'),camry.defaultVariantId);
  assert.equal(resolveSelectableVariantId(camry,choices,choices[1].id),choices[1].id);
  assert.equal(resolveSelectableVariantId(camry,choices,'unknown-version'),'unknown-version');
  assert.equal(resolveVariantId(camry,'2027-ae7814971c'),'2027-ae7814971c');
  assert.ok(camry.variants.some(variant=>variant.id==='2027-ae7814971c'));
  const mg4=assembleVehicleDetails(vehicles.find(vehicle=>vehicle.kind==='new'&&vehicle.slug==='mg4'));
  assert.equal(resolveSelectableVariantId(mg4,selectableVehicleVariants(mg4),'2026-954b3df540'),'spec-2026-44292f8f88da');
});

test('new-car discovery includes the original brands and the five imported commercial brands', () => {
  const requested = ['aion','gac-trumpchi','byd','changan','changan-qiyuan','volkswagen','geely','chery','mg','toyota','hyundai','honda','jetour','livan','deepal','chevrolet','fangchengbao','wuling','dfsk','haval','ruichi','xiaomi','li-auto','leapmotor','gwm','lifan','roewe','tank'];
  requested.push('isuzu','jac','jmc','maxus','foton');
  assert.deepEqual(newCarBrands.map(brand => brand.slug), requested);
  assert.equal(new Set(newCarBrands.map(brand => brand.slug)).size, 33);
  assert.deepEqual(brands('new'), newCarBrands);
  assert.equal(vehicles.filter(vehicle => vehicle.kind === 'new').length, 88);
  assert.equal(vehicles.filter(vehicle => vehicle.kind === 'used').length, 31);
  for (const brand of newCarBrands) {
    assert.ok(existsSync('public' + catalogBrandAsset(brand.slug)?.src), `Missing brand mark: ${brand.slug}`);
    assert.equal(brandHref('new', brand.slug), `/new-cars/${brand.slug}/`);
  }
  for (const vehicle of vehicles.filter(vehicle => vehicle.kind === 'new')) {
    assert.ok(requested.includes(vehicle.brandSlug), `Unregistered model brand: ${vehicle.brandSlug}`);
  }
});

test('commercial import preserves the 24 model folders, 152 galleries and 95 separate comparison columns',()=>{
  assert.equal(commercialData.records.length,24);
  assert.equal(commercialData.records.reduce((n,record)=>n+record.gallery.length,0),152);
  assert.equal(commercialData.records.reduce((n,record)=>n+record.variants.length,0),95);
  for(const source of commercialData.records){
    const model=vehicles.find(vehicle=>vehicle.kind==='new'&&vehicle.brandSlug===source.brandSlug&&vehicle.slug===source.slug);
    assert.ok(model,source.name);
    const detail=assembleVehicleDetails(model);
    assert.deepEqual(detail.variants.map(v=>v.id).sort(),source.variants.map(v=>v.id).sort());
    assert.equal(new Set(detail.variants.map(v=>v.id)).size,source.variants.length);
    assert.ok(detail.variants.every(v=>v.technicalReference?.column&&v.specs.every(s=>s.cell?.startsWith('Column '))));
    const scene=commercialScenes[source.brandSlug+'/'+source.slug];
    assert.ok(scene&&existsSync('public'+scene.src)&&existsSync('public'+scene.original));
    for(const photo of model.gallery){
      assert.ok(photo.original&&existsSync('public'+photo.original));
      assert.equal(photo.treatment,'corrected');
    }
  }
  assert.equal(newCars.filter(vehicle=>matchesCatalog(vehicle,readCatalogFilters('?category=Pickup'))).length,15);
  assert.equal(newCars.filter(vehicle=>matchesCatalog(vehicle,readCatalogFilters('?category=Van'))).length,9);
});

test('commercial defaults and conflicts do not merge seating, fuels or charging intervals across columns',()=>{
  const detail=(brand,slug)=>assembleVehicleDetails(vehicles.find(v=>v.kind==='new'&&v.brandSlug===brand&&v.slug===slug));
  const g7=detail('foton','fengjing-g7');
  assert.equal(g7.variants.find(v=>v.id===g7.defaultVariantId).seats,6);
  const g9=detail('foton','fengjing-g9');
  assert.equal(g9.variants.find(v=>v.id===g9.defaultVariantId).seats,6);
  const c36=detail('dfsk','c36');
  assert.equal(c36.variants.find(v=>v.technicalReference.column===3).powertrain,'To confirm');
  assert.equal(c36.variants.find(v=>v.technicalReference.column===4).powertrain,'Gasoline + CNG');
  const lieshou=detail('changan','lieshou');
  const first=lieshou.variants.find(v=>v.technicalReference.column===1);
  const work=lieshou.variants.find(v=>v.technicalReference.column===3);
  assert.equal(first.specs.find(s=>s.field==='electricRange').testCycle,'NEDC');
  assert.equal(first.specs.find(s=>s.field==='fastCharging').chargeRange,undefined);
  assert.equal(work.specs.find(s=>s.field==='fastCharging').chargeRange,'30–88%');
  const r5=detail('ruichi','r5'),ec75=detail('ruichi','ec75');
  assert.ok(r5.variants.every(v=>!v.specs.some(s=>s.field==='fastCharging')));
  assert.ok(ec75.variants.every(v=>v.specs.find(s=>s.field==='fastCharging').value==='18'));
});

test('brands without listed new models retain their selection and inquiry identity', () => {
  const listed = vehicles.filter(vehicle => vehicle.kind === 'new');
  const requestOnly = newCarBrands.filter(brand => !listed.some(vehicle => vehicle.brandSlug === brand.slug));
  assert.equal(requestOnly.length, 10);
  for (const brand of requestOnly) {
    const filters = readCatalogFilters(`?brand=${brand.slug}`);
    assert.deepEqual(filters.brands, [brand.slug]);
    assert.equal(listed.filter(vehicle => matchesCatalog(vehicle, filters)).length, 0);
    assert.equal(catalogParameters(filters).get('brand'), brand.slug);
    const draft = draftFromQuery(`?${new URLSearchParams({kind: 'new', brand: brand.name})}`, blankDraft());
    assert.equal(draft.vehicles[0].brand, brand.name);
    assert.equal(draft.vehicles[0].model, '');
    assert.equal(draft.vehicles.length, 1);
  }
});

test('every used-car brand has a local genuine mark and every showroom cover retains its source gallery', () => {
  const used=vehicles.filter(vehicle=>vehicle.kind==='used');
  assert.equal(used.length,31);
  assert.ok(used.every(vehicle=>!['audi','bmw','mercedes-benz','lexus'].includes(vehicle.brandSlug)));
  assert.equal(Object.keys(usedPresentations).length,used.length);
  assert.equal(Object.keys(usedShowroomCovers).length,used.length);
  for(const slug of new Set(used.map(vehicle=>vehicle.brandSlug))){
    const asset=catalogBrandAsset(slug);
    assert.ok(asset,`Missing brand mark: ${slug}`);
    assert.ok(existsSync('public'+asset.src),`Missing brand file: ${slug}`);
  }
  for(const vehicle of used){
    const presentation=vehicle.presentationImage;
    assert.ok(presentation,`Missing used-car presentation: ${vehicle.name}`);
    assert.ok(vehicle.gallery.some(photo=>photo.src===presentation.original));
    assert.ok(vehicle.gallery.every(photo=>photo.treatment==='original'&&photo.src!==presentation.src));
    assert.equal(detailModelScene(vehicle),undefined);
    assert.match(presentation.note,/edited with AI/);
    const cover=vehicleCardPhoto(vehicle);
    const expected=usedShowroomCovers[`${vehicle.brandSlug}/${vehicle.slug}`];
    assert.ok(expected,`Missing showroom cover: ${vehicle.name}`);
    assert.deepEqual(cover,{...expected,'data-ai-showroom':'true'});
    for(const candidate of cover.srcSet.split(', ')){
      assert.ok(existsSync('public'+candidate.split(' ')[0]),`Missing showroom image: ${candidate}`);
    }
    const png=readFileSync('public'+presentation.src);
    assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16)/png.readUInt32BE(20),4/3);
    for(const recommendation of detailRecommendations(vehicle)){
      assert.ok(recommendation.presentationImage,`Recommendation lost presentation: ${recommendation.name}`);
    }
  }
});

const newCars = vehicles.filter(vehicle => vehicle.kind === 'new');

test('supplied used-car records keep individual identity, mileage, registration and four categories', () => {
  const supplied=vehicles.filter(vehicle=>vehicle.usedRecord);
  assert.equal(supplied.length,30);
  assert.equal(new Set(supplied.map(vehicle=>vehicle.usedRecord.reference)).size,30);
  assert.equal(new Set(vehicles.map(vehicle=>`${vehicle.kind}/${vehicle.brandSlug}/${vehicle.slug}`)).size,vehicles.length);
  assert.equal(new Set(supplied.map(vehicle=>vehicle.brandSlug)).size,14);
  assert.deepEqual(Object.fromEntries(vehicleCategories.map(category=>[category,supplied.filter(vehicle=>vehicleCategory(vehicle)===category).length])),{Sedan:8,SUV:19,MPV:2,Pickup:1});
  const tCross=supplied.find(vehicle=>vehicle.slug==='t-cross');
  assert.equal(tCross.usedRecord.mileageKm,43877);
  assert.equal(tCross.usedRecord.registrationMonth,'2025-01');
  assert.match(tCross.usedRecord.conditionNote,/right rear door/);
  assert.equal(supplied.find(vehicle=>vehicle.slug==='lavida').usedRecord.mileageKm,64176);
  assert.ok(supplied.every(vehicle=>vehicle.availability==='Unverified'&&vehicle.referenceOnly));
});

test('conflicting supplied year and powertrain cells do not silently become confirmed facts', () => {
  const supplied=suppliedUsedData.records;
  const expectedYears={7:'2026',24:'2021',34:'2024',87:'2019'};
  for(const [row,year] of Object.entries(expectedYears)){
    const vehicle=supplied.find(vehicle=>vehicle.usedRecord.sourceRow===Number(row));
    assert.equal(vehicle.year,usedImportConfig.resolveConflictsFromTitle?year:'To confirm');
  }
  const seal=supplied.find(vehicle=>vehicle.usedRecord.sourceRow===7);
  assert.equal(seal.powertrain,usedImportConfig.resolveConflictsFromTitle?'PHEV':'To confirm');
  assert.ok(!supplied.some(vehicle=>['2001','201'].includes(vehicle.year)));
});

test('supplied used-car inquiry links retain the distinct vehicle record and trim', () => {
  for(const vehicle of vehicles.filter(vehicle=>vehicle.usedRecord)){
    const params=new URLSearchParams({kind:'used',model:vehicle.name,brand:vehicle.brand,category:vehicle.category,variant:vehicle.usedRecord.reference,trim:vehicle.usedRecord.trim,source:`/used-cars/${vehicle.brandSlug}/${vehicle.slug}/`});
    const draft=draftFromQuery('?'+params,blankDraft());
    assert.equal(draft.vehicles[0].kind,'used-sourcing');
    assert.equal(draft.vehicles[0].variantReference,vehicle.usedRecord.reference);
    assert.equal(restoreDraft(draft).vehicles[0].variant,vehicle.usedRecord.trim);
    assert.match(inquiryBrief(draft),new RegExp(vehicle.usedRecord.reference));
  }
});

test('supplied used-car galleries preserve original bytes and do not inherit generated model scenes', () => {
  const audit=JSON.parse(readFileSync('docs/used-cars-import-20261026/source-manifest.json','utf8'));
  const hash=path=>createHash('sha256').update(readFileSync(path)).digest('hex');
  assert.equal(hash('../'+audit.workbook),audit.workbookSha256);
  let count=0;
  for(const entry of audit.records){
    for(const photo of entry.photos){
      assert.equal(hash('public'+photo.src),photo.sha256);
      assert.equal(hash('../'+photo.sourceFile),photo.sha256);
      count++;
    }
  }
  assert.equal(count,268);
  for(const vehicle of vehicles.filter(vehicle=>vehicle.usedRecord)){
    assert.equal(detailModelScene(vehicle),undefined);
    assert.ok(vehicle.gallery.every(photo=>photo.treatment==='original'));
    assert.match(vehicleCardPhoto(vehicle).src,/\.webp$/);
    if(vehicle.presentationImage){
      assert.ok(vehicle.gallery.some(photo=>photo.src===vehicle.presentationImage.original));
      assert.match(vehicle.presentationImage.note,/edited with AI/);
    }
  }
  assert.doesNotMatch(JSON.stringify(suppliedUsedData),/chaboshi|开票金额|销售价格|车架号/);
});

test('Sedans labels are consistent without changing saved filters or inquiry values', () => {
  const filters=readCatalogFilters('?category=Sedan');
  const result=newCars.filter(vehicle=>matchesCatalog(vehicle,filters));
  assert.equal(vehicleCategoryLabel(filters.category),'Sedans');
  assert.ok(result.some(vehicle=>vehicle.slug==='bingo'));
  assert.equal(catalogParameters(filters).get('category'),'Sedan');
  assert.equal(categoryHref('new','Sedan'),'/new-cars/?category=Sedan');
  assert.equal(bodyGroupLabel('Sedan','new'),'Sedans');
  assert.equal(bodyGroupLabel('Sedan','used'),'Sedans');
  const draft=draftFromQuery('?category=Sedan&model=Wuling+Bingo',blankDraft());
  assert.match(inquiryBrief(draft),/Category: Sedans/);
  assert.equal(draft.vehicles[0].category,'Sedan');
  assert.equal(restoreDraft(draft).vehicles[0].category,'Sedan');
});

test('public Toyota hybrid versions and Gods Eye trims use consistent readable names', () => {
  for(const car of newCars.map(assembleVehicleDetails)){
    for(const version of car.variants){
      assert.doesNotMatch(version.name,/Dual Engine|Gods Eye/,`${car.name}: ${version.name}`);
      if(car.brandSlug==='toyota'&&version.powertrain==='Hybrid')assert.match(version.name,/Hybrid/);
    }
  }
  const bao=assembleVehicleDetails(newCars.find(vehicle=>vehicle.brandSlug==='fangchengbao'&&vehicle.slug==='bao-5'));
  assert.ok(bao.variants.filter(version=>version.name.includes("God's Eye")).length>=4);
});

test('MG4 shows each trim once while both existing version links still resolve', () => {
  const original=newCars.find(vehicle=>vehicle.brandSlug==='mg'&&vehicle.slug==='mg4');
  const car=assembleVehicleDetails(original);
  assert.equal(car.variants.length,4);
  assert.equal(new Set(car.variants.map(variant=>variant.name)).size,4);
  const oldId='2026-954b3df540',documentedId='spec-2026-44292f8f88da';
  for(const id of [oldId,documentedId]){
    const version=car.variants.find(variant=>variant.id===resolveVariantId(car,id));
    assert.equal(version.name,'2026 Revised 437 Free Choice');
    assert.equal(version.technicalReference.status,'documented');
    assert.ok(version.specs.some(spec=>spec.field==='electricRange'&&spec.testCycle==='CLTC'&&spec.value==='437'));
  }
  assert.equal(original.variants[0].id,oldId);
  assert.equal(original.variants[0].technicalReference,undefined);
  assert.equal(resolveVariantId(car,'unknown-version'),'unknown-version');
});

test('every existing catalog and documented version ID survives assembly', () => {
  for(const original of newCars){
    const car=assembleVehicleDetails(original);
    const documented=detailedData.records[`${car.brandSlug}/${car.slug}`].variants;
    for(const version of [...original.variants,...documented]){
      assert.ok(car.variants.some(candidate=>candidate.id===resolveVariantId(car,version.id)),`${car.name}: ${version.id}`);
    }
  }
});

test('a saved inquiry receipt survives draft restoration without repeating contact details', async () => {
  const draft=draftFromQuery('?model=MG4&kind=new&quantity=2&category=Sedan',blankDraft());
  draft.email='local-copy-test@example.invalid';draft.country='UAE';draft.notes='Check the selected trim.';
  draft.vehicles[0].id='vehicle-context-unique';
  const receipt=await createInquiryReceipt('local-test-saved-reference',draft);
  const restored=restoreDraft(JSON.parse(JSON.stringify(draft)));
  assert.ok(sameInquiryDraft(draft,restored));
  assert.equal((await restoreInquiryReceipt(JSON.parse(JSON.stringify(receipt)),restored)).id,receipt.id);
  assert.ok(!JSON.stringify(receipt).includes(draft.email));
  assert.ok(!JSON.stringify(receipt).includes(draft.notes));
});

test('edits to a submitted request cannot inherit its confirmation', async () => {
  const draft=blankDraft('MG4');draft.email='local-copy-test@example.invalid';draft.country='UAE';
  const receipt=await createInquiryReceipt('local-test-saved-reference',draft);
  for(const [field,value] of [['email','another@example.invalid'],['country','Mexico'],['notes','Not supplied'],['service','Inspection'],['name','Another buyer']]){
    const changed={...draft,[field]:value};
    assert.equal(sameInquiryDraft(draft,changed),false,field);
    assert.equal(await restoreInquiryReceipt(receipt,changed),null,field);
  }
  for(const [field,value] of [['model','MG7'],['quantity','3'],['variantReference','spec-other']]){
    const changed={...draft,vehicles:[{...draft.vehicles[0],[field]:value}]};
    assert.equal(await restoreInquiryReceipt(receipt,changed),null,field);
  }
});

test('missing, legacy or malformed receipts never confirm an unsent draft', async () => {
  const draft=blankDraft('MG4');
  for(const value of [null,{},'saved',{id:'old-reference',at:Date.now()},{version:1,id:'test',at:Date.now(),signature:'not-a-signature'}]){
    assert.equal(await restoreInquiryReceipt(value,draft),null);
  }
  const receipt=await createInquiryReceipt('local-test-saved-reference',draft);
  assert.equal(await restoreInquiryReceipt({...receipt,id:''},draft),null);
  assert.equal(await restoreInquiryReceipt({...receipt,at:Date.now()+3600000},draft),null);
});

test('powertrain labels cannot be mistaken for maximum power', () => {
  const powertrain = {label: 'Powertrain', value: 'Gasoline', source: 'Catalog'};
  assert.equal(specField(powertrain), 'powertrain');
  assert.equal(findSpec([powertrain], 'power'), undefined);
  for (const label of ['Motor power', 'Maximum power (as listed)', 'Combined system power']) {
    assert.equal(specField({...powertrain, label, value: '100', unit: 'kW'}), 'power');
  }
});

test('every assembled version has unique summary metrics and correctly typed power', () => {
  for (const car of newCars.map(assembleVehicleDetails)) {
    for (const version of car.variants ?? []) {
      const metrics = summaryMetrics(version.specs, version.powertrain, version.seats, version.year);
      assert.equal(new Set(metrics.map(metric => metric.label)).size, metrics.length, `${car.name}: ${version.name}`);
      const power = findSpec(version.specs, 'power');
      assert.notEqual(power?.value, version.powertrain, `${car.name}: power is not a fuel type`);
      assert.ok(!comparisonFields(version, version).includes('powertrain'));
    }
  }
});

test('power qualifiers survive in summary metrics without changing source records', () => {
  const source = {field: 'power', label: 'Maximum power (as listed)', value: '100', unit: 'kW', source: 'Comparison', note: 'The source table does not identify this figure as engine, motor or combined system output.'};
  const metrics = summaryMetrics([source], 'Hybrid', 5, '2026');
  assert.equal(metrics.find(metric => /power/i.test(metric.label))?.note, specificationNote(source));
  assert.match(specificationNote(source), /engine, motor or combined system/);
  assert.match(source.note, /^The source table/);
});

test('Han L recommendations have colour scenes linked to their own original model photos', () => {
  const han = newCars.find(vehicle => vehicle.brandSlug === 'byd' && vehicle.slug === 'han-l');
  assert.ok(han);
  const recommendations = detailRecommendations(han);
  assert.equal(recommendations.length, 4);
  for (const model of recommendations) {
    const scene = detailModelScene(model);
    const original = vehicles.find(vehicle => vehicle.kind === model.kind && vehicle.brandSlug === model.brandSlug && vehicle.slug === model.slug);
    assert.ok(scene?.srcSet, `Missing colour scene for ${model.name}`);
    assert.ok(original?.gallery?.some(photo => photo.src === scene.original), `Scene source does not belong to ${model.name}`);
  }
});

test('detail images do not reintroduce the mismatched UNI-V crossover scene', () => {
  assert.equal(detailModelScene({kind: 'new', brandSlug: 'changan', slug: 'uni-v'}), undefined);
});
test('legacy multi-brand links use the first brand and retain the category', () => {
  const filters = readCatalogFilters('?brand=toyota&brand=volkswagen&category=SUV');
  const result = newCars.filter(vehicle => matchesCatalog(vehicle, filters));
  assert.ok(result.some(vehicle => vehicle.slug === 'rav4'));
  assert.ok(!result.some(vehicle => vehicle.slug === 'tayron'));
  assert.ok(result.every(vehicle => vehicle.brandSlug === 'toyota' && vehicle.body === 'SUV'));
  assert.ok(!result.some(vehicle => vehicle.slug === 'camry' || vehicle.slug === 'id-3'));
});

test('powertrain further narrows the selected single-brand category', () => {
  const result = newCars.filter(vehicle => matchesCatalog(vehicle, readCatalogFilters('?brand=toyota&brand=volkswagen&category=SUV&power=Hybrid')));
  assert.ok(result.some(vehicle => vehicle.slug === 'rav4'));
  assert.ok(result.every(vehicle => vehicle.powertrain === 'Hybrid'));
});

test('legacy single-brand and body links normalize without losing the selection', () => {
  const filters = readCatalogFilters('?brand=toyota&body=SUV&power=Hybrid');
  assert.deepEqual(filters.brands, ['toyota']);
  assert.equal(filters.category, 'SUV');
  const query = catalogParameters(filters);
  assert.equal(query.get('category'), 'SUV');
  assert.equal(query.has('body'), false);
  assert.deepEqual(readCatalogFilters(query.toString()), filters);
});

test('legacy multi-brand links normalize to one brand during serialization', () => {
  const filters = readCatalogFilters('?brand=toyota&brand=volkswagen&brand=toyota&category=mpv');
  assert.deepEqual(filters.brands, ['toyota']);
  assert.equal(filters.category, 'MPV');
  assert.deepEqual(readCatalogFilters(catalogParameters(filters).toString()), filters);
  assert.deepEqual(catalogParameters({...filters,brands:['byd','toyota']}).getAll('brand'), ['byd']);
});

test('selecting a brand replaces the previous selection for new and used catalogs', () => {
  for (const kind of ['new','used']) {
    const original={...blankCatalogFilters(kind),brands:['toyota'],category:'SUV',q:'test',power:kind==='new'?'Hybrid':'',mileage:kind==='used'?'0-20000':''};
    const selected=selectCatalogBrand(original,'byd');
    assert.deepEqual(selected,{...original,brands:['byd']});
    assert.deepEqual(original.brands,['toyota']);
    assert.deepEqual(selectCatalogBrand(selected,'byd'),selected);
    assert.deepEqual(readCatalogFilters('?brand=&brand=byd&brand=toyota',kind).brands,['byd']);
  }
});

test('reset on a static later-page route explicitly encodes the first result page', () => {
  assert.equal(catalogParameters(blankCatalogFilters(), 1, 6).get('viewpage'), '1');
  assert.equal(catalogParameters(blankCatalogFilters(), 6, 6).has('viewpage'), false);
  assert.equal(catalogParameters(readCatalogFilters('?category=SUV'), 2).get('viewpage'), '2');
});

test('unknown brands produce an empty result instead of silently broadening the search', () => {
  assert.equal(newCars.filter(vehicle => matchesCatalog(vehicle, readCatalogFilters('?brand=not-in-the-catalog'))).length, 0);
});

test('category keys cover all four groups while physical body values stay intact', () => {
  assert.deepEqual(vehicleCategories, ['Sedan', 'SUV', 'MPV', 'Pickup']);
  assert.equal(vehicleCategoryLabel('MPV'), 'Van');
  assert.equal(bodyGroupLabel('MPV', 'new'), 'Van');
  assert.equal(bodyGroupLabel('MPV', 'used'), 'Van');
  assert.deepEqual(readCatalogFilters('?category=Van'), readCatalogFilters('?category=MPV'));
  assert.equal(vehicleCategory({body: 'Hatchback', category: 'Sedan'}), 'Sedan');
  const id3 = newCars.find(vehicle => vehicle.slug === 'id-3');
  assert.ok(id3);
  assert.equal(id3.body, 'Sedan');
  assert.equal(id3.category, 'Sedan');
});

test('used MPV discovery finds the existing Vellfire reference', () => {
  const result = vehicles.filter(vehicle => vehicle.kind === 'used' && matchesCatalog(vehicle, readCatalogFilters('?category=MPV')));
  assert.ok(result.some(vehicle => vehicle.slug === 'crown-vellfire-hybrid'));
});

test('category-only sourcing prepopulates a request without inventing a model', () => {
  const draft = draftFromQuery('?kind=new&category=MPV', blankDraft());
  assert.equal(draft.vehicles[0].category, 'MPV');
  assert.equal(draft.vehicles[0].model, 'Van sourcing');
  assert.equal(draft.vehicles[0].brand, '');
  assert.equal(validateInquiry(draft)['vehicle-1-model'], undefined);
  assert.match(inquiryBrief(draft), /Category: Van/);
});

test('multiple acceptable brands remain alternatives and do not create fictitious model rows', () => {
  const original = blankDraft();
  original.alternatives = 'Left-hand drive';
  const query = '?kind=new&category=Pickup&brand=Toyota&brand=Volkswagen';
  const draft = draftFromQuery(query, original);
  assert.equal(draft.vehicles.length, 1);
  assert.equal(draft.vehicles[0].brand, '');
  assert.equal(draft.vehicles[0].category, 'Pickup');
  assert.match(draft.alternatives, /Left-hand drive/);
  assert.match(draft.alternatives, /Acceptable brands: Toyota, Volkswagen/);
  const again = draftFromQuery(query, draft);
  assert.equal(again.vehicles.length, 1);
  assert.equal(again.alternatives, draft.alternatives);
});

test('old v1 drafts without a category keep their quantity, trim reference and contacts', () => {
  const legacy = JSON.parse(JSON.stringify(blankDraft('Toyota Camry')));
  delete legacy.vehicles[0].category;
  legacy.vehicles[0].quantity = '12';
  legacy.vehicles[0].variant = '2026-abcdef123456';
  legacy.country = 'United Arab Emirates';
  legacy.email = 'buyer@example.com';
  const draft = restoreDraft(legacy);
  assert.ok(draft);
  assert.equal(draft.vehicles[0].category, '');
  assert.equal(draft.vehicles[0].quantity, '12');
  assert.equal(draft.vehicles[0].variantReference, '2026-abcdef123456');
  assert.equal(draft.country, legacy.country);
  assert.equal(draft.email, legacy.email);
});

test('an inquiry can be restored and validated without vehicles and with either contact method', () => {
  const base = {...blankDraft(), country: 'United Arab Emirates', notes: 'Please help me choose a hybrid SUV.'};
  assert.ok(validateInquiry(base).email);
  for (const contact of [{email: 'buyer@example.invalid'}, {phone: '+971 50 123 4567'}]) {
    const restored = restoreDraft({...base, ...contact, vehicles: [blankVehicle()]});
    assert.ok(restored);
    assert.deepEqual(restored.vehicles, []);
    assert.deepEqual(validateInquiry(restored), {});
    assert.doesNotMatch(inquiryBrief(restored), /Vehicle 1:/);
    assert.ok(validateInquiry({...restored, country: ''}).country);
  }
});

test('quote contact selection validates the selected method and excludes the other contact from the brief', () => {
  const base = {...blankDraft(), name:'Buyer', country:'Algeria', notes:'I need three hybrid SUVs.'};
  for (const draft of [
    {...base,contactMethod:'phone',phone:'+971 50 123 4567',email:'unfinished email'},
    {...base,contactMethod:'email',email:'buyer@example.invalid',phone:'unfinished phone'}
  ]) {
    assert.deepEqual(validateInquiry(draft,{requireName:true}),{});
    const selected=selectedContactDraft(draft);
    assert.equal(selected[draft.contactMethod==='phone'?'email':'phone'],'');
    assert.doesNotMatch(inquiryBrief(draft),/unfinished/);
    assert.ok(sameInquiryDraft(draft,selected));
  }
  assert.ok(validateInquiry({...base,contactMethod:'phone',email:'buyer@example.invalid'}).phone);
  assert.ok(validateInquiry({...base,contactMethod:'email',phone:'+971501234567'}).email);
});

test('quote drafts retain the selected method and both editable inputs across restoration', () => {
  const draft={...blankDraft(),contactMethod:'email',email:'buyer@example.invalid',phone:'+971501234567'};
  const restored=restoreDraft(JSON.parse(JSON.stringify(draft)));
  assert.equal(restored.contactMethod,'email');
  assert.equal(restored.email,draft.email);
  assert.equal(restored.phone,draft.phone);
  assert.equal(selectedContactDraft(restored).phone,'');
  assert.equal(restoreDraft(blankDraft()).contactMethod,undefined);
});

test('vehicle inquiry messages cannot be empty or whitespace', () => {
  const draft={...blankDraft('BYD Seagull'),country:'Algeria',contactMethod:'phone',phone:'+971501234567'};
  for (const notes of ['', '  \n\t']) assert.ok(validateInquiry({...draft,notes}).notes);
  assert.deepEqual(validateInquiry({...draft,notes:'Please quote three new vehicles.'}),{});
});

test('the category survives draft storage and appears in the readable inquiry', () => {
  const draft = draftFromQuery('?kind=used&category=MPV&brand=Toyota', blankDraft());
  draft.vehicles[0].quantity = '3';
  const restored = restoreDraft(JSON.parse(JSON.stringify(draft)));
  assert.ok(restored);
  assert.equal(restored.vehicles[0].category, 'MPV');
  assert.match(inquiryBrief(restored), /Used vehicle sourcing request/);
  assert.match(inquiryBrief(restored), /Category: Van/);
  assert.match(inquiryBrief(restored), /Quantity: 3/);
});
