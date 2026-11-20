import { useCallback, useEffect, useRef, useState, type SubmitEvent } from 'react';
import { blankDraft, CONTACT_MESSAGE_SERVICE, CONTACT_TOPICS, selectedContactDraft, validateInquiry, type ContactMethod, type InquiryDraft, type InquiryErrors } from '../data/inquiry';
import SubmitInquiry from './SubmitInquiry';
import ContactMethodPicker from './ContactMethodPicker';

export default function ContactForm() {
  const [draft, setDraft] = useState<InquiryDraft>(() => ({
    ...blankDraft(),
    contactMethod:'phone',
    service: CONTACT_MESSAGE_SERVICE,
    contactTopic: CONTACT_TOPICS[0]
  }));
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [review, setReview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const markSaved = useCallback(() => setSaved(true), []);
  const contact=selectedContactDraft(draft);

  useEffect(() => setReady(true), []);

  function update(field: 'name' | 'country' | 'email' | 'phone' | 'contactTopic' | 'notes', value: string) {
    setDraft(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: '' }));
  }

  function reviewMessage(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateInquiry(draft);
    setErrors(validation);
    const firstError = Object.keys(validation)[0];
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }
    setReview(true);
    requestAnimationFrame(() => heading.current?.focus());
  }

  function chooseContactMethod(contactMethod:ContactMethod){
    setDraft(current=>({...current,contactMethod}));
    setErrors(current=>{const next={...current};delete next.phone;delete next.email;return next;});
  }

  if (review) return <div className="contact-form-card">
    {!saved && <>
      <header className="contact-form-heading"><h2 id="contact-message-title" ref={heading} tabIndex={-1}>Review your message</h2><p>Check the details below before sending.</p></header>
      <dl className="contact-review">
        <div><dt>Full name</dt><dd>{draft.name}</dd></div>
        <div><dt>Country</dt><dd>{draft.country}</dd></div>
        {contact.email && <div><dt>Email</dt><dd>{contact.email}</dd></div>}
        {contact.phone && <div><dt>WhatsApp / phone</dt><dd>{contact.phone}</dd></div>}
        <div><dt>Inquiry type</dt><dd>{draft.contactTopic}</dd></div>
        <div><dt>Message</dt><dd>{draft.notes}</dd></div>
      </dl>
      <button type="button" className="text-link" onClick={() => {
        setReview(false);
        requestAnimationFrame(() => document.getElementById('contact-notes')?.focus());
      }}>Edit message</button>
    </>}
    <SubmitInquiry draft={contact} onSaved={markSaved}/>
  </div>;

  const invalid = (field: string) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': [field === 'email' ? 'contact-reply' : '', errors[field] ? `contact-${field}-error` : ''].filter(Boolean).join(' ') || undefined
  });
  const error = (field: string) => errors[field] && <span id={`contact-${field}-error`} className="form-error" role="alert">{errors[field]}</span>;

  return <form className="contact-form-card quote-form" aria-labelledby="contact-message-title" onSubmit={reviewMessage} noValidate>
    <header className="contact-form-heading"><h2 id="contact-message-title">Send us a message</h2><p>Choose how we can reach you, then tell us what you need.</p></header>
    <div className="form-row">
      <label>Full name *<input id="contact-name" name="name" autoComplete="name" maxLength={300} required {...invalid('name')} value={draft.name} onChange={event => update('name', event.target.value)}/>{error('name')}</label>
      <label>Country *<input id="contact-country" name="country" autoComplete="country-name" maxLength={100} required {...invalid('country')} value={draft.country} onChange={event => update('country', event.target.value)}/>{error('country')}</label>
    </div>
    <ContactMethodPicker value={draft.contactMethod==='email'?'email':'phone'} onChange={chooseContactMethod}/>
    <div className="contact-reply-field">
      {draft.contactMethod==='email'
        ? <label>Email address *<input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@company.com" {...invalid('email')} value={draft.email} onChange={event => update('email',event.target.value)}/>{error('email')}</label>
        : <label>Phone number *<input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} required placeholder="+971 50 123 4567" {...invalid('phone')} value={draft.phone} onChange={event => update('phone',event.target.value)}/>{error('phone')}</label>}
      {draft.contactMethod === 'email' && <p id="contact-reply" className="form-note">We’ll reply to this email address.</p>}
    </div>
    <label>Inquiry type
      <select id="contact-contactTopic" name="contactTopic" {...invalid('contactTopic')} value={draft.contactTopic} onChange={event => update('contactTopic', event.target.value)}>
        {CONTACT_TOPICS.map(topic => <option key={topic}>{topic}</option>)}
      </select>
      {error('contactTopic')}
    </label>
    <label>Message *<textarea id="contact-notes" name="notes" required rows={4} maxLength={4000} placeholder="e.g. I need 3 new hybrid SUVs. Please quote with shipping." {...invalid('notes')} value={draft.notes} onChange={event => update('notes', event.target.value)}/>{error('notes')}</label>
    <button type="submit" className="button button-dark" disabled={!ready}>Review message</button>
  </form>;
}
