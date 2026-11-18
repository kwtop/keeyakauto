import type {useInquirySubmission} from './useInquirySubmission';
export default function InquirySubmissionFields({submission,isContactMessage=false}:{submission:ReturnType<typeof useInquirySubmission>;isContactMessage?:boolean}){
 return <div className="inquiry-submission-fields">
  <label className="inquiry-honeypot" aria-hidden="true">Website<input id="inquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off"/></label>
  <label className="inquiry-privacy"><input type="checkbox" checked={submission.accepted} onChange={event=>submission.setAccepted(event.target.checked)}/><span>I agree that KEEYAK may save my {isContactMessage?'message':'inquiry'} and contact me about it. <a href="/privacy/" target="_blank" rel="noreferrer">Privacy</a></span></label>
  <div ref={submission.widget}/>
  {submission.error&&<div role="alert"><p className="form-error">{submission.error}</p>{submission.errorKind!=='submission'&&<button className="text-link" type="button" onClick={submission.retry}>{submission.errorKind==='service'?'Try again':'Retry security check'}</button>}</div>}
 </div>;
}
