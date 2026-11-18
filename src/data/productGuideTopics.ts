export type ProductGuideIcon='engine'|'transmission'|'fuel'|'battery'|'charging'|'diagnostics'|'range'|'documents'|'inspection'|'maintenance'|'cylinder';
type Topic={heading:string;icon:ProductGuideIcon};

// Presentation metadata follows the existing paragraph order; it never rewrites copy.
const topics:Record<string,Topic[]>={
 'Pure Electric':[
  {heading:'Battery and range',icon:'battery'},
  {heading:'Charging compatibility',icon:'charging'},
  {heading:'Battery diagnostics',icon:'diagnostics'},
 ],
 PHEV:[
  {heading:'Range and fuel consumption',icon:'range'},
  {heading:'Charging compatibility',icon:'charging'},
  {heading:'Battery diagnostics',icon:'diagnostics'},
 ],
 EREV:[
  {heading:'Battery and range',icon:'battery'},
  {heading:'Range extender and charging',icon:'engine'},
  {heading:'Battery diagnostics',icon:'diagnostics'},
 ],
 Hybrid:[
  {heading:'Hybrid system',icon:'battery'},
  {heading:'Engine and transmission',icon:'engine'},
  {heading:'Battery and maintenance',icon:'diagnostics'},
 ],
 Gasoline:[
  {heading:'Engine specifications',icon:'engine'},
  {heading:'Transmission',icon:'transmission'},
  {heading:'Service requirements',icon:'maintenance'},
 ],
 Diesel:[
  {heading:'Diesel engine specifications',icon:'engine'},
  {heading:'Transmission',icon:'transmission'},
  {heading:'Service requirements',icon:'maintenance'},
 ],
 'Gasoline + CNG':[
  {heading:'Fuel and CNG configuration',icon:'fuel'},
  {heading:'Cylinder documentation',icon:'cylinder'},
  {heading:'Maintenance requirements',icon:'maintenance'},
 ],
 'To confirm':[
  {heading:'Vehicle identification',icon:'inspection'},
  {heading:'Equipment and inspection',icon:'documents'},
  {heading:'Service information',icon:'maintenance'},
 ],
};

export function productGuideTopics(powertrain:string){
 return topics[powertrain]??topics['To confirm'];
}
