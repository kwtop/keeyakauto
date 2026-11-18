import {CONTACT_MESSAGE_SERVICE,type InquiryDraft} from '../data/inquiry';
import {useInquirySubmission} from './useInquirySubmission';
import InquirySubmissionFields from './InquirySubmissionFields';

export default function SubmitInquiry({draft,onSaved}:{draft:InquiryDraft;onSaved?:(id:string)=>void}){
 const isContactMessage=draft.service===CONTACT_MESSAGE_SERVICE&&draft.vehicles.length===0;
 const needsName=!isContactMessage&&!draft.name.trim();
 const submission=useInquirySubmission({draft,onSaved,enabled:!needsName});
 if(needsName)return <p className="form-note">Add your name to send this inquiry. <a href="/quote/#name">Edit your inquiry</a></p>;
 if(submission.saved)return <div className="inquiry-receipt" role="status"><h3>{isContactMessage?'Message received':'Inquiry received'}</h3>{!isContactMessage&&<p>Your inquiry has been saved. KEEYAK can now review your requirements and contact you.</p>}<p>{isContactMessage?'Reference:':'Inquiry reference:'} <strong>{submission.saved}</strong></p>{!isContactMessage&&<p>An inquiry does not reserve a vehicle or place an order.</p>}</div>;
 return <section className="inquiry-send" aria-labelledby="inquiry-send-title">
  <h3 id="inquiry-send-title">Send to KEEYAK</h3>
  {!submission.receiptChecked&&<p className="form-note" role="status">Checking this tab's submission status...</p>}
  <InquirySubmissionFields submission={submission} isContactMessage={isContactMessage}/>
  <button type="button" className="button button-dark" disabled={!submission.canSubmit} onClick={()=>void submission.submit()}>{submission.busy?'Sending…':isContactMessage?'Send message':'Send inquiry'}</button>
 </section>;
}
