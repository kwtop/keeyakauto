/** Questions to resolve for an offer, not specifications asserted for a car. */
export function vehicleConfigurationQuestions(powertrain:string, seats:number|null|undefined) {
  const questions = [
    {label:'Layout & equipment',detail:`${seats?`Match the recorded ${seats}-seat layout and `:'Specify the seating layout, '}steering side, equipment list and exact market version.`},
  ];
  if (powertrain==='Pure Electric') {
    questions.push({label:'Battery & charging',detail:'Request battery capacity, range with its test cycle, connector type and AC/DC charging specifications for the offered version.'});
  } else if (powertrain==='PHEV'||powertrain==='EREV') {
    questions.push({label:'Engine, battery & charging',detail:'Request engine and battery specifications, electric range with its test cycle, charging connector and charging capability.'});
  } else if (powertrain==='Hybrid') {
    questions.push({label:'Hybrid system',detail:'Request the engine, hybrid battery, transmission and drive configuration. Verify whether external charging applies to the offered version.'});
  } else if (['Gasoline','Diesel','Gasoline + CNG'].includes(powertrain)) {
    questions.push({label:'Engine & driveline',detail:'Request the engine code and displacement, transmission, drive configuration and emissions documents for the offered version.'});
  } else {
    questions.push({label:'Powertrain identification',detail:'Resolve the exact powertrain and trim before comparing engine, battery, range or charging figures.'});
  }
  questions.push({label:'Destination & documents',detail:'Match production information, available vehicle documents, language, connectivity and support arrangements to your destination.'});
  return questions;
}
