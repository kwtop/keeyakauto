import test from 'node:test';
import assert from 'node:assert/strict';
import {vehicles,vehicleHref} from '../src/data/catalog';
import {catalogCardData} from '../src/data/catalogCardData';
import {blankCatalogFilters,matchesCatalog,usedCatalogRanges} from '../src/data/catalogFilters';
import {sortCatalogVehicles} from '../src/data/catalogSort';
import {vehicleCategories} from '../src/data/vehicleCategories';
import {assembleVehicleDetails} from '../src/data/vehicleDetailAssembly';
import {vehicleBuyerChecks} from '../src/data/vehicleBuyerChecks';
import {vehicleStructuredData,vehicleTitle,vehicleDescription} from '../src/data/vehicleSeo';
import {siteEntities} from '../src/data/siteStructuredData';
import {destinationGuides} from '../src/data/destinationGuides';
import {procurementGuides} from '../src/data/procurementGuides';
import {company} from '../src/data/company';
const today=new Date('2026-11-06T00:00:00Z');
const ids=rows=>rows.map(vehicleHref);
test('card projection reduces catalog serialization by at least 70 percent without exporting detailed evidence',()=>{
 for(const kind of ['new','used']){
  const full=vehicles.filter(v=>v.kind===kind),cards=full.map(catalogCardData);
  assert.ok(JSON.stringify(cards).length<JSON.stringify(full).length*.3,kind+' card payload');
  for(let i=0;i<cards.length;i++){
   assert.equal(vehicleHref(cards[i]),vehicleHref(full[i]));assert.equal(cards[i].photo.src.length>0,true);
   for(const key of ['gallery','source','sourceNote','variantAliases','availability'])assert.ok(!(key in cards[i]),key);
   assert.ok((cards[i].specs||[]).every(spec=>spec.field==='engine'));
   assert.equal(cards[i].usedRecord?.mileageKm,full[i].usedRecord?.mileageKm);
  }
 }
});
test('all brand, category, powertrain, range and version searches retain the same results after projection',()=>{
 for(const kind of ['new','used']){
  const full=vehicles.filter(v=>v.kind===kind),cards=full.map(catalogCardData),base=blankCatalogFilters(kind);
  const filters=[base,...vehicleCategories.map(category=>({...base,category})),...[...new Set(full.map(v=>v.brandSlug))].map(brand=>({...base,brands:[brand]})),...[...new Set(full.map(v=>v.powertrain))].map(power=>({...base,power})),...full.map(v=>({...base,q:v.defaultVariantName||v.variants?.[0]?.name||v.name}))];
  if(kind==='used')for(const {key,options}of usedCatalogRanges)for(const option of options)filters.push({...base,[key]:option.value});
  for(const filter of filters)assert.deepEqual(ids(cards.filter(v=>matchesCatalog(v,filter,today))),ids(full.filter(v=>matchesCatalog(v,filter,today))),JSON.stringify(filter));
  for(const sort of ['featured','name','year','mileage'])assert.deepEqual(ids(sortCatalogVehicles(cards,sort,kind)),ids(sortCatalogVehicles(full,sort,kind)));
 }
});
test('full detail variants and gallery stay available outside catalog cards',()=>{
 for(const slug of ['byd/seal-07-dm-i','toyota/corolla','jetour/traveler']){
  const vehicle=vehicles.find(v=>v.kind==='new'&&v.brandSlug+'/'+v.slug===slug),detail=assembleVehicleDetails(vehicle);
  assert.ok(detail.variants.length>1);assert.ok(detail.gallery.length>1);assert.ok(detail.variants.some(v=>v.specs.length>5));
 }
});
test('focused buyer information preserves record provenance and has unique metadata without invented offers',()=>{
 const focused=vehicles.filter(v=>['new/byd/seal-07-dm-i','new/toyota/corolla','new/jetour/traveler','used/byd/seagull'].includes(v.kind+'/'+v.brandSlug+'/'+v.slug));assert.equal(focused.length,4);
 assert.equal(new Set(focused.map(vehicleTitle)).size,4);assert.equal(new Set(focused.map(vehicleDescription)).size,4);
 for(const vehicle of focused){const checks=vehicleBuyerChecks(vehicle);assert.equal(checks.checks.length,3);assert.ok(checks.links.length>=3);assert.doesNotMatch(JSON.stringify(vehicleStructuredData(vehicle,'https://keeyakauto.com')),/"(?:offers|price|aggregateRating)"/);}
 const seagull=focused.find(v=>v.kind==='used');assert.match(vehicleBuyerChecks(seagull).intro,new RegExp(seagull.usedRecord.mileageKm.toLocaleString('en-US')));assert.match(vehicleBuyerChecks(seagull).intro,/Current availability/);
});
test('site identity uses stable canonical IDs and the documented operator and contact',()=>{
 const [org,site]=siteEntities('https://keeyakauto.com');assert.equal(org['@id'],'https://keeyakauto.com/#organization');assert.equal(org.name,company.legalName);assert.equal(org.email,company.email);assert.equal(site['@id'],'https://keeyakauto.com/#website');assert.equal(site.publisher['@id'],org['@id']);assert.doesNotMatch(JSON.stringify([org,site]),/110K|80\+|rating|Offer/);
});
test('country sources remain attached to their jurisdiction and four models link back through relevant guides',()=>{
 assert.equal(destinationGuides.length,10);
 for(const country of destinationGuides){const sourceIds=new Set(country.sources.map(s=>s.id));for(const section of country.sections)for(const id of section.sources||[])assert.ok(sourceIds.has(id),country.slug+':'+id);}
 const a=destinationGuides.find(v=>v.slug==='algeria'),b=destinationGuides.find(v=>v.slug==='bolivia');assert.ok(a.sections.some(s=>s.links?.some(l=>l.href==='/used-cars/byd/seagull/')));assert.ok(b.sections.some(s=>s.links?.some(l=>l.href==='/new-cars/byd/seal-07-dm-i/')));
 for(const [slug,path]of [['chinese-ev-charging-standards','/new-cars/byd/seal-07-dm-i/'],['used-ev-battery-report','/used-cars/byd/seagull/'],['request-wholesale-car-quote','/new-cars/toyota/corolla/'],['container-vs-roro-car-shipping','/new-cars/jetour/traveler/']])assert.ok(procurementGuides[slug].links.some(l=>l.href===path));
});

test('every vehicle has buyer checks, distinct metadata and valid guide links without changing its source records',()=>{
 const before=JSON.stringify(vehicles),titles=[],descriptions=[];
 const guides=new Set([...Object.keys(procurementGuides).map(slug=>`/export-services/buying-guide/${slug}/`),...destinationGuides.map(c=>`/export-services/buying-guide/countries/${c.slug}/`)]);
 for(const vehicle of vehicles){
  const detail=assembleVehicleDetails(vehicle),checks=vehicleBuyerChecks(detail);
  assert.ok(checks.heading.includes(vehicle.name),vehicleHref(vehicle));
  assert.equal(checks.checks.length,3);assert.equal(new Set(checks.checks.map(c=>c.title)).size,3);
  assert.equal(new Set(checks.links.map(l=>l.href)).size,3);
  for(const link of checks.links)assert.ok(guides.has(link.href),vehicleHref(vehicle)+': '+link.href);
  if(vehicle.usedRecord){assert.ok(checks.intro.includes(vehicle.usedRecord.mileageKm.toLocaleString('en-US')));assert.ok(checks.intro.includes(vehicle.usedRecord.registrationMonth));}
  titles.push(vehicleTitle(vehicle));descriptions.push(vehicleDescription(detail));
 }
 assert.equal(new Set(titles).size,vehicles.length);assert.equal(new Set(descriptions).size,vehicles.length);
 assert.equal(JSON.stringify(vehicles),before);
});

test('buyer advice follows the selected drivetrain and an unknown version never inherits the default advice',()=>{
 const base=assembleVehicleDetails(vehicles.find(v=>v.kind==='new'&&v.brandSlug==='deepal'&&v.slug==='s07'));
 const source=base.variants[0];
 for(const powertrain of ['Pure Electric','PHEV','EREV','Hybrid','Gasoline','Diesel','Gasoline + CNG','To confirm']){
  const selected={...source,powertrain},checks=vehicleBuyerChecks(base,{selected}),text=checks.checks.map(c=>c.title+' '+c.body).join(' ');
  const plugin=['Pure Electric','PHEV','EREV'].includes(powertrain);
  assert.equal(checks.links.some(l=>l.href.includes('chinese-ev-charging-standards')),plugin,powertrain);
  if(powertrain==='Gasoline')assert.match(text,/gasoline engine/);
  if(powertrain==='Diesel')assert.match(text,/diesel engine/);
  if(powertrain==='Gasoline + CNG')assert.match(text,/CNG system/);
  if(powertrain==='To confirm')assert.match(text,/Resolve the powertrain first/);
  if(powertrain==='EREV')assert.match(text,/range-extender/);
 }
 const unlisted=vehicleBuyerChecks(base,{unlisted:true});assert.match(unlisted.intro,/linked version is not listed/);assert.ok(!unlisted.links.some(l=>l.href.includes('charging-standards')));
 const focused=vehicles.find(v=>v.kind==='new'&&v.brandSlug==='byd'&&v.slug==='seal-07-dm-i');assert.match(vehicleBuyerChecks(focused,{unlisted:true}).intro,/linked version is not listed/);
});

test('used reference and unresolved records retain their evidence boundaries and combustion cars do not get EV checks',()=>{
 const legacy=vehicles.find(v=>v.kind==='used'&&!v.usedRecord);assert.ok(legacy);
 const reference=vehicleBuyerChecks(legacy);assert.match(reference.intro,/past model reference/);assert.match(reference.intro,/without a current unit-specific mileage or registration record/);
 for(const vehicle of vehicles.filter(v=>v.kind==='used'&&['Gasoline','Diesel'].includes(v.powertrain))){
  const checks=vehicleBuyerChecks(vehicle);assert.ok(!checks.links.some(l=>l.href.includes('used-ev-battery-report')));assert.match(checks.checks[1].body,/engine and transmission/);
 }
 const vehicle=vehicles.find(v=>v.kind==='used'&&v.usedRecord&&v.slug!=='seagull');
 const unknown={...vehicle,powertrain:'To confirm',usedRecord:{...vehicle.usedRecord,needsReview:true}};
 const checks=vehicleBuyerChecks(unknown);assert.match(checks.checks[0].body,/flagged source details/);assert.match(checks.checks[1].body,/Confirm the fuel type/);assert.ok(!checks.links.some(l=>l.href.includes('battery-report')));
});
