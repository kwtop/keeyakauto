import {Mail,Phone} from 'lucide-react';
import type {ContactMethod} from '../data/inquiry';
import '../styles/contact-method.css';

export default function ContactMethodPicker({value,onChange}:{value:ContactMethod;onChange:(value:ContactMethod)=>void}){
 return <fieldset className="quote-contact-method contact-method-picker">
  <legend className="contact-method-legend">Preferred contact method</legend>
  <div className="quote-contact-options contact-method-options">
   <label><input type="radio" name="contactMethod" value="phone" checked={value==='phone'} onChange={()=>onChange('phone')}/><Phone size={17} aria-hidden="true"/><span>WhatsApp / Phone</span></label>
   <label><input type="radio" name="contactMethod" value="email" checked={value==='email'} onChange={()=>onChange('email')}/><Mail size={17} aria-hidden="true"/><span>Email</span></label>
  </div>
 </fieldset>;
}
