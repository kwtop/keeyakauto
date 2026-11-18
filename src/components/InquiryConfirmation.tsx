import {useEffect,useState} from 'react';
import {CircleCheck,Clock3} from 'lucide-react';
import {INQUIRY_DRAFT_KEY,INQUIRY_READY_KEY,restorePreparedInquiry} from '../data/inquiry';
import {INQUIRY_RECEIPT_KEY,restoreInquiryReceipt} from '../data/inquiryReceipt';
import '../styles/inquiry-confirmation.css';

export function InquirySuccess({reference}:{reference:string}){
 function startAnother(){
  try{[INQUIRY_DRAFT_KEY,INQUIRY_READY_KEY,INQUIRY_RECEIPT_KEY].forEach(key=>sessionStorage.removeItem(key));}catch{}
  window.location.assign('/quote/');
 }
 return <section className="inquiry-confirmation" aria-labelledby="inquiry-confirmation-title">
  <span className="inquiry-confirmation-mark" aria-hidden="true"><CircleCheck size={36} strokeWidth={1.5}/></span>
  <h1 id="inquiry-confirmation-title" tabIndex={-1}>Inquiry sent successfully</h1>
  <p>Your vehicle requirements have been received.</p>
  <p className="inquiry-confirmation-response"><Clock3 size={20} aria-hidden="true"/>We’ll contact you within 12 hours.</p>
  <p className="inquiry-confirmation-reference">Inquiry reference <strong>{reference}</strong></p>
  <div className="inquiry-confirmation-actions"><a className="button button-dark" href="/new-cars/">Browse cars</a><button type="button" className="button button-light" onClick={startAnother}>Send another inquiry</button></div>
 </section>;
}

export default function InquiryConfirmation(){
 const [reference,setReference]=useState(''),[loaded,setLoaded]=useState(false);
 useEffect(()=>{
  let active=true;
  async function restore(){
   try{
    const prepared=restorePreparedInquiry(JSON.parse(sessionStorage.getItem(INQUIRY_READY_KEY)||'null'));
    const receipt=prepared&&await restoreInquiryReceipt(JSON.parse(sessionStorage.getItem(INQUIRY_RECEIPT_KEY)||'null'),prepared.draft);
    if(active&&receipt)setReference(receipt.id);
   }catch{}finally{if(active)setLoaded(true);}
  }
  void restore();return()=>{active=false;};
 },[]);
 if(!loaded)return <section className="inquiry-confirmation" aria-live="polite"><h1>Checking your inquiry</h1><p>Loading your submission confirmation…</p></section>;
 if(reference)return <InquirySuccess reference={reference}/>;
 return <section className="inquiry-confirmation"><h1>No confirmed inquiry in this tab</h1><p>This page cannot confirm a submission without its saved receipt. If you have already sent your inquiry, contact us for help checking it.</p><a className="button button-dark" href="/quote/">Return to the inquiry form</a></section>;
}
