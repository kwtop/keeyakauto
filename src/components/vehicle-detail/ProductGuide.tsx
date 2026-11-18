import type {Vehicle,VehicleVariant} from '../../data/catalog';
import {productEditorial} from '../../data/productEditorial';
import {Battery,BookOpen,Cog,Cylinder,Engine,FileText,Fuel,Gauge,History,Layers,PlugZap,ReceiptText,ScanSearch,Wrench} from 'lucide-react';
const topicIcons={engine:Engine,transmission:Cog,fuel:Fuel,battery:Battery,charging:PlugZap,diagnostics:ScanSearch,range:Gauge,documents:FileText,inspection:ScanSearch,maintenance:Wrench,cylinder:Cylinder};
export default function ProductGuide({vehicle,focus,selected,unlisted}:{vehicle:Vehicle;focus:string;selected?:VehicleVariant;unlisted?:boolean}){
 const content=productEditorial(vehicle,focus,{selected,unlisted});
 const [technicalSummary,...technicalNotes]=content.technical.split('\n\n');
 const structured=content.technicalNoteHeadings?.length===technicalNotes.length;
 const SelectionIcon=vehicle.kind==='used'?History:Layers;
 return <section className="vd-section vd-product-guide" data-core-module="product-guide" aria-labelledby="product-guide-title">
  <header className="vd-product-lead">
   <h2 id="product-guide-title">{content.heading}</h2>
   <p className="vd-product-intro">{content.focus}</p>
   <div className="vd-product-quote-note">
    <span className="vd-product-quote-icon"><ReceiptText size={20} strokeWidth={1.5} aria-hidden="true"/></span>
    <p>{content.intro}</p>
   </div>
  </header>
  <article className="vd-product-version">
   <div className="vd-product-subheading"><SelectionIcon size={21} strokeWidth={1.5} aria-hidden="true"/><h3>{content.selectionHeading}</h3></div>
   <p>{content.selection}</p>
  </article>
  <article className="vd-product-technical">
   <div className="vd-product-technical-intro">
    <div className="vd-product-subheading"><BookOpen size={21} strokeWidth={1.5} aria-hidden="true"/><h3>{content.technicalHeading}</h3></div>
    <p>{technicalSummary}</p>
   </div>
   <div className="vd-product-notes">{technicalNotes.map((paragraph,index)=>{
    const icon=content.technicalNoteIcons?.[index];
    const TopicIcon=icon?topicIcons[icon]:undefined;
    return structured?<section className="vd-product-topic" key={paragraph}>
     <div className="vd-product-topic-heading">
      {TopicIcon&&<span className="vd-product-topic-icon" aria-hidden="true"><TopicIcon size={20} strokeWidth={1.5}/></span>}
      <h4>{content.technicalNoteHeadings![index]}</h4>
     </div><p>{paragraph}</p>
    </section>:<p key={paragraph}>{paragraph}</p>;
   })}</div>
  </article>
 </section>;
}
