import {BatteryCharging,CarFront,ClipboardCheck,FileText,PackageCheck,ScanSearch,Wrench} from 'lucide-react';
import type {Vehicle,VehicleVariant} from '../../data/catalog';
import {vehicleBuyerChecks} from '../../data/vehicleBuyerChecks';
const icons={layout:CarFront,battery:BatteryCharging,engine:Wrench,inspection:ScanSearch,quote:FileText,load:PackageCheck};
export default function BuyerChecks({vehicle,selected,unlisted}:{vehicle:Vehicle;selected?:VehicleVariant;unlisted?:boolean}){
 const content=vehicleBuyerChecks(vehicle,{selected,unlisted});
 return (
  <section id={vehicle.kind==='used'?'ordering':undefined} className="vd-section vd-buyer-checks" data-core-module="buyer-checks" aria-labelledby="vehicle-buyer-title">
   <header className="vd-section-heading">
    <h2 id="vehicle-buyer-title">{vehicle.kind==='new'?'Before you order':content.heading}</h2>
    {vehicle.kind==='used'&&<p>{content.intro}</p>}
   </header>
   <div className="vd-buyer-grid">
    {content.checks.map(check=>{
     const Icon=check.icon?icons[check.icon]:ClipboardCheck;
     return (
      <article key={check.title}>
       <span className="vd-buyer-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.6}/></span>
       <h3>{check.title}</h3>
       <p>{check.body}</p>
      </article>
     );
    })}
   </div>
   <div className="vd-buyer-links" role="group" aria-label="Related buying guides">
    {content.links.map(link=><a href={link.href} key={link.href}>{link.label}</a>)}
   </div>
  </section>
 );
}
