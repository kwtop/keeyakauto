import type {Vehicle,VehicleVariant} from '../../data/catalog';
import {productEditorial} from '../../data/productEditorial';
export default function OrderFAQ({vehicle,selected,unlisted,focus}:{vehicle:Vehicle;selected?:VehicleVariant;unlisted?:boolean;focus:string}){
 const content=productEditorial(vehicle,focus,{selected,unlisted});
 return <section id={vehicle.kind==='used'?'used-model-questions':'ordering'} className="vd-section vd-faq" data-core-module="faq" aria-labelledby="model-questions"><div className="vd-section-heading"><h2 id="model-questions">{vehicle.kind==='used'?'Questions about this used '+vehicle.name:vehicle.name+' buying questions'}</h2></div><div className="vd-faq-list">{content.questions.map(item=><details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><div>{item.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div></details>)}</div></section>;
}
