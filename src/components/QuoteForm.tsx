import { useCallback, useEffect, useMemo, useRef, useState, type SubmitEvent } from 'react';
import { CarFront, ChevronDown, Mail, MapPin, RotateCcw, UserRound } from 'lucide-react';
import ContactMethodPicker from './ContactMethodPicker';
import { company } from '../data/company';
import {vehicleCategories,vehicleCategoryLabel} from '../data/vehicleCategories';
import {powertrainLabel} from '../data/catalogLabels';
import {useInquirySubmission} from './useInquirySubmission';
import InquirySubmissionFields from './InquirySubmissionFields';
import {InquirySuccess} from './InquiryConfirmation';
import {track} from '../scripts/measurement-client';
import {INQUIRY_RECEIPT_KEY} from '../data/inquiryReceipt';
import {
  INQUIRY_DRAFT_KEY, INQUIRY_READY_KEY, INQUIRY_EMAIL,
  blankDraft, blankVehicle, draftFromQuery, hasVehicleDetails, inquiryBrief,
  restoreDraft, selectedContactDraft, validateInquiry,
  type ContactMethod, type InquiryDraft, type InquiryErrors, type PreparedInquiry, type VehicleRequest
} from '../data/inquiry';

function readSession(key: string): unknown {
  try { const saved = window.sessionStorage.getItem(key); return saved ? JSON.parse(saved) : null; }
  catch { return null; }
}

const emptyVehicle = blankVehicle();

function DirectContacts() {
  return <ul className="quote-direct-contacts" aria-label="Contact KEEYAK">
    <li><a href={`mailto:${INQUIRY_EMAIL}`} aria-label={`Email ${INQUIRY_EMAIL}`}><Mail size={18} aria-hidden="true"/><span>{INQUIRY_EMAIL}</span></a></li>
    <li><a href={company.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${company.phone}`}><img src="/images/brand/whatsapp.svg" width={18} height={18} alt=""/><span>{company.phone}</span></a></li>
    <li><a href="/contact/#office"><MapPin size={18} aria-hidden="true"/><span>{company.officeAddress}</span></a></li>
  </ul>;
}

export default function QuoteForm({ initialModel = '' }: { initialModel?: string }) {
  const [draft, setDraft] = useState<InquiryDraft>(() => ({...blankDraft(initialModel), contactMethod: 'phone'}));
  const [hydrated, setHydrated] = useState(false);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [sentReference,setSentReference]=useState('');
  const [storageMessage, setStorageMessage] = useState('');
  const [status, setStatus] = useState('');
  const vehicleDetails = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const restored = restoreDraft(readSession(INQUIRY_DRAFT_KEY));
    const incoming = draftFromQuery(window.location.search, restored || blankDraft(initialModel));
    incoming.contactMethod ??= incoming.phone.trim() || !incoming.email.trim() ? 'phone' : 'email';
    const cleanUrl=new URL(window.location.href);
    ['name','email','phone','notes'].forEach(key=>cleanUrl.searchParams.delete(key));
    if(cleanUrl.href!==window.location.href)window.history.replaceState(null,'',cleanUrl);
    setDraft(incoming);
    setHydrated(true);
  }, [initialModel]);

  useEffect(() => {
    if (!hydrated) return;
    try { window.sessionStorage.setItem(INQUIRY_DRAFT_KEY, JSON.stringify(draft)); }
    catch { setStorageMessage('This browser cannot save your draft.'); }
  }, [draft, hydrated]);

  const submissionDraft=useMemo(()=>selectedContactDraft({...draft,vehicles:draft.vehicles.filter(hasVehicleDetails)}),[draft]);
  const onSaved=useCallback((id:string)=>setSentReference(id),[]);
  const submission = useInquirySubmission({draft: submissionDraft, onSaved, enabled: hydrated, defaultAccepted: true});
  useEffect(()=>{
    if(!sentReference)return;
    try{
      const snapshot:PreparedInquiry={version:1,preparedAt:new Date().toISOString(),brief:inquiryBrief(submissionDraft),draft:submissionDraft};
      sessionStorage.setItem(INQUIRY_READY_KEY,JSON.stringify(snapshot));
      if(readSession(INQUIRY_RECEIPT_KEY)&&sessionStorage.getItem(INQUIRY_READY_KEY))window.location.assign('/quote/thank-you/');
    }catch{ /* The confirmed success view remains visible when tab storage is unavailable. */ }
    const heading=document.getElementById('inquiry-confirmation-title');
    heading?.focus({preventScroll:true});heading?.scrollIntoView({block:'start'});
  },[sentReference,submissionDraft]);

  const requestedVehicles = draft.vehicles.filter(hasVehicleDetails);
  const vehicles = draft.vehicles.length ? draft.vehicles : [emptyVehicle];
  const firstVehicle = requestedVehicles[0];
  const hasSummary = requestedVehicles.length > 0 || Boolean(draft.country.trim());
  const hasDraft = draft.vehicles.length > 1 || requestedVehicles.length > 0 || Object.entries(draft).some(
    ([field, value]) => field !== 'contactMethod' && typeof value === 'string' && Boolean(value.trim())
  );
  const errorFor = (id: string) => errors[id] ? <span className="form-error" id={`${id}-error`}>{errors[id]}</span> : null;
  const fieldProps = (id: string) => ({
    id,
    'aria-invalid': !!errors[id],
    'aria-describedby': errors[id] ? `${id}-error` : undefined
  });

  function updateDraft(update: (current: InquiryDraft) => InquiryDraft) {
    setDraft(update);
    setStatus('');
    try { window.sessionStorage.removeItem(INQUIRY_READY_KEY); } catch { /* The current form remains usable. */ }
  }
  function updateField(field: keyof Omit<InquiryDraft, 'version' | 'vehicles'>, value: string) {
    updateDraft(current => ({ ...current, [field]: value }));
    setErrors(current => { const next = { ...current }; delete next[field]; return next; });
  }
  function chooseContactMethod(method: ContactMethod) {
    updateDraft(current => ({...current, contactMethod: method}));
    setErrors(current => {const next = {...current}; delete next.email; delete next.phone; return next;});
  }
  function updateVehicle(id: string, field: keyof Omit<VehicleRequest, 'id'>, value: string) {
    updateDraft(current => ({ ...current, vehicles: (current.vehicles.length ? current.vehicles : [emptyVehicle]).map(vehicle => vehicle.id === id ? { ...vehicle, [field]: value } : vehicle) }));
    setErrors(current => { const next = { ...current }; delete next[`${id}-${field}`]; return next; });
  }
  function addVehicle() {
    updateDraft(current => current.vehicles.length >= 30 ? current : ({ ...current, vehicles: [...(current.vehicles.length ? current.vehicles : [emptyVehicle]), blankVehicle(`vehicle-${crypto.randomUUID()}`)] }));
  }
  function removeVehicle(id: string) {
    updateDraft(current => ({ ...current, vehicles: current.vehicles.filter(vehicle => vehicle.id !== id) }));
    setErrors(current => Object.fromEntries(Object.entries(current).filter(([field]) => !field.startsWith(`${id}-`))));
  }
  function clearDraft() {
    try { window.sessionStorage.removeItem(INQUIRY_DRAFT_KEY); window.sessionStorage.removeItem(INQUIRY_READY_KEY); window.sessionStorage.removeItem(INQUIRY_RECEIPT_KEY); } catch { /* Reset the visible draft even if storage is blocked. */ }
    if (vehicleDetails.current) vehicleDetails.current.open = false;
    setDraft({...blankDraft(), contactMethod: 'phone'}); setErrors({}); setStatus('Draft cleared.');
  }
  async function sendInquiry(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const reviewedDraft = selectedContactDraft({ ...draft, vehicles: requestedVehicles });
    const validation = validateInquiry(reviewedDraft, { requireName: true });
    setErrors(validation);
    setStatus('');
    if (Object.keys(validation).length) {
      track('form_submit_failed','quote_form','validation');
      const first = Object.keys(validation)[0];
      if (vehicleDetails.current && (first === 'vehicles' || first.endsWith('-quantity'))) vehicleDetails.current.open = true;
      window.requestAnimationFrame(() => document.getElementById(first)?.focus());
      return;
    }
    await submission.submit();
  }

  if(sentReference)return <InquirySuccess reference={sentReference}/>;

  return <div className="quote-grid">
    <form className="quote-form" id="quote-form-content" onSubmit={event=>void sendInquiry(event)} noValidate>
      <fieldset className="quote-fields" disabled={!hydrated||submission.busy}>
        <legend className="quote-sr-only">Vehicle inquiry</legend>
        <section className="quote-section quote-contact-section" aria-labelledby="quote-contact-heading">
        <h2 className="quote-section-title" id="quote-contact-heading"><UserRound size={21} aria-hidden="true"/>Your details</h2>
        <fieldset className="quote-stage" data-module="destination-and-contact" data-core-module="destination-contact">
          <legend className="quote-sr-only">Destination and contact</legend>
          <div className="form-row">
            <label>Name *<input {...fieldProps('name')} value={draft.name} onChange={event => updateField('name', event.target.value)} autoComplete="name" maxLength={300} required />{errorFor('name')}</label>
            <label>Destination country *<input {...fieldProps('country')} value={draft.country} onChange={event => updateField('country', event.target.value)} autoComplete="country-name" maxLength={300} required />{errorFor('country')}</label>
          </div>
          <div className="quote-contact-fields">
            <ContactMethodPicker value={draft.contactMethod==='email'?'email':'phone'} onChange={chooseContactMethod}/>
            {draft.contactMethod === 'email'
              ? <div className="quote-contact-input"><label htmlFor="email">Email address *</label><input {...fieldProps('email')} value={draft.email} onChange={event => updateField('email', event.target.value)} type="email" autoComplete="email" placeholder="you@company.com" maxLength={254} required/>{errorFor('email')}</div>
              : <div className="quote-contact-input"><label htmlFor="phone">WhatsApp / Phone number *</label><input {...fieldProps('phone')} value={draft.phone} onChange={event => updateField('phone', event.target.value)} type="tel" autoComplete="tel" placeholder="+971 50 123 4567" maxLength={40} required/>{errorFor('phone')}</div>}
          </div>
        </fieldset>
        </section>
        <section className="quote-section quote-request-section" aria-labelledby="quote-request-heading">
        <h2 className="quote-section-title" id="quote-request-heading"><CarFront size={21} aria-hidden="true"/>Your requirements</h2>
        <div className="quote-message"><label htmlFor="notes">Message *</label><textarea {...fieldProps('notes')} value={draft.notes} onChange={event => updateField('notes', event.target.value)} placeholder="e.g. I need 3 new hybrid SUVs. Please quote with shipping." rows={4} maxLength={4000} required/>{errorFor('notes')}</div>
        <details ref={vehicleDetails} className="quote-options quote-optional-details">
        <summary>
          <span>Vehicle and shipping details <small>(optional)</small></span>
          {firstVehicle && <span className="quote-vehicle-selection">{firstVehicle.model.trim() || firstVehicle.brand || (firstVehicle.kind === 'used-sourcing' ? 'Used car' : 'New car')}{requestedVehicles.length > 1 && ` +${requestedVehicles.length - 1}`}</span>}
          <ChevronDown size={16} aria-hidden="true" />
        </summary>
        <div className="quote-optional-body">
        <section className="quote-vehicle-fields" data-module="vehicle-requirements" data-core-module="vehicles" aria-labelledby="quote-vehicles-heading">
        <h3 id="quote-vehicles-heading">Vehicles</h3>
        {vehicles.map((vehicle, index) => <fieldset className="vehicle-entry" key={vehicle.id}>
          {vehicles.length > 1 && <legend className="vehicle-entry-title"><span>Vehicle {index + 1}</span><button className="quote-remove-model" type="button" onClick={() => removeVehicle(vehicle.id)} aria-label={`Remove vehicle ${index + 1}`}>Remove</button></legend>}
          <div className="form-row quote-vehicle-basics">
            <label className="quote-model-field">Model or type of car<input {...fieldProps(`${vehicle.id}-model`)} value={vehicle.model} onChange={event => updateVehicle(vehicle.id, 'model', event.target.value)} placeholder="e.g. Toyota Camry or a 7-seat SUV" maxLength={300} /></label>
            <label>Request type<select value={vehicle.kind} onChange={event => updateVehicle(vehicle.id, 'kind', event.target.value)}><option value="new">New car</option><option value="used-sourcing">Used-car request</option></select></label>
            <label>Quantity<input {...fieldProps(`${vehicle.id}-quantity`)} value={vehicle.quantity} onChange={event => updateVehicle(vehicle.id, 'quantity', event.target.value)} inputMode="numeric" maxLength={16} />{errorFor(`${vehicle.id}-quantity`)}</label>
          </div>
          <details className="quote-options"><summary>More vehicle details <span>(optional)</span></summary>
          <label>Version or configuration<input value={vehicle.variant} onChange={event => updateVehicle(vehicle.id, 'variant', event.target.value)} placeholder="Trim or key requirements" maxLength={300} /></label>
          <label>Category<select value={vehicle.category} onChange={event => updateVehicle(vehicle.id, 'category', event.target.value)}><option value="">Any category</option>{vehicleCategories.map(category => <option key={category} value={category}>{vehicleCategoryLabel(category)}</option>)}</select></label>
          <div className="form-row"><label>Brand<input value={vehicle.brand} onChange={event => updateVehicle(vehicle.id, 'brand', event.target.value)} maxLength={300} /></label><label>Year or year range<input value={vehicle.year} onChange={event => updateVehicle(vehicle.id, 'year', event.target.value)} placeholder="If known" maxLength={40} /></label></div>
          {vehicle.kind === 'used-sourcing' ? <div className="used-vehicle-requirements"><div className="form-row"><label>Mileage limit or range<input value={vehicle.mileage} onChange={event=>updateVehicle(vehicle.id,'mileage',event.target.value)} placeholder="e.g. Below 60,000" maxLength={300}/></label><label>Mileage unit<select aria-label="Mileage unit" value={vehicle.mileageUnit} onChange={event=>updateVehicle(vehicle.id,'mileageUnit',event.target.value)}><option value="km">km</option><option value="miles">miles</option></select></label></div><label>Condition requirements<input value={vehicle.condition} onChange={event=>updateVehicle(vehicle.id,'condition',event.target.value)} placeholder="Acceptable wear, repairs or other limits" maxLength={300}/></label></div> : null}
          <label>Powertrain<input value={powertrainLabel(vehicle.powertrain)} onChange={event => updateVehicle(vehicle.id, 'powertrain', event.target.value)} maxLength={300} /></label>{vehicle.variantReference ? <label>Version reference<input value={vehicle.variantReference} onChange={event => updateVehicle(vehicle.id, 'variantReference', event.target.value)} maxLength={300} /></label> : null}<label>Reference page or source<input value={vehicle.source} onChange={event => updateVehicle(vehicle.id, 'source', event.target.value)} maxLength={600} /></label></details>
        </fieldset>)}
        {errors.vehicles ? <p className="form-error" id="vehicles" tabIndex={-1}>{errors.vehicles}</p> : null}
        <div className="quote-vehicle-actions">
          <button className="quote-add-model" type="button" onClick={addVehicle} disabled={draft.vehicles.length >= 30}>Add another model</button>
          {vehicles.length === 1 && requestedVehicles.length === 1 && <button className="quote-remove-model" type="button" onClick={() => removeVehicle(vehicles[0].id)}>Remove vehicle</button>}
        </div>
        {draft.vehicles.length >= 30 ? <p className="form-note">You can add up to 30 models. Use Message for any further requirements.</p> : null}
        </section>
        <section className="quote-extra" data-module="optional-requirements" aria-labelledby="quote-extra-heading">
          <h3 id="quote-extra-heading">Shipping and preferences</h3>
          <label>Company<input value={draft.company} onChange={event => updateField('company', event.target.value)} autoComplete="organization" maxLength={300} /></label>
          <label>Destination port<input value={draft.port} onChange={event => updateField('port', event.target.value)} maxLength={300} /></label>
          <div className="form-row"><label>Budget<input value={draft.budget} onChange={event => updateField('budget', event.target.value)} placeholder="Amount or range" maxLength={300} /></label><label>Currency<input value={draft.currency} onChange={event => updateField('currency', event.target.value)} placeholder="USD, EUR, CNY or other" maxLength={300} /></label></div>
          <div className="form-row"><label>Preferred delivery date<input value={draft.delivery} onChange={event => updateField('delivery', event.target.value)} placeholder="Date or time frame" maxLength={300} /></label><label>Preferred color<input value={draft.color} onChange={event => updateField('color', event.target.value)} maxLength={300} /></label></div>
          <label>Alternative models or versions<input value={draft.alternatives} onChange={event => updateField('alternatives', event.target.value)} maxLength={300} /></label>
          {draft.usedYears || draft.usedMileage ? <div className="form-row"><label>Saved year range<input value={draft.usedYears} onChange={event=>updateField('usedYears',event.target.value)} maxLength={300}/></label><label>Saved mileage range<input value={draft.usedMileage} onChange={event=>updateField('usedMileage',event.target.value)} maxLength={300}/></label></div> : null}

          {draft.service ? <label>Service requested<input value={draft.service} onChange={event => updateField('service', event.target.value)} maxLength={300} /></label> : null}
        </section>
        </div>
        </details>
        </section>
        <div className="quote-review-footer">
        {Object.keys(errors).length ? <p className="form-error" role="alert">Check the highlighted fields.</p> : null}
        <InquirySubmissionFields submission={submission}/>
        <div className="quote-submit-group"><button className="button button-dark form-submit" type="submit" disabled={!submission.canSubmit}>{submission.busy?'Sending…':'Send inquiry'}</button>{submission.busy&&<p className="form-note" role="status">Sending your inquiry…</p>}</div>
        {hasDraft && <button className="quote-clear-draft" type="button" onClick={clearDraft}><RotateCcw size={14} aria-hidden="true"/>Clear draft</button>}
        </div>
      </fieldset>
      {status ? <p className="form-note" role="status">{status}</p> : null}
      {hasDraft && storageMessage ? <p className="form-note" role="status">{storageMessage}</p> : null}
      <noscript><p>Enable JavaScript to use this form, or contact KEEYAK directly.</p><DirectContacts /></noscript>
    </form>
    <aside className="quote-aside" aria-label="Inquiry information">
      {hasSummary && <section className="quote-summary" data-module="review-summary" data-core-module="review" aria-labelledby="quote-summary-heading">
        <h2 id="quote-summary-heading">Inquiry summary</h2>
        {requestedVehicles.map(vehicle=><div className="quote-summary-vehicle" key={vehicle.id}><h3>{vehicle.model || vehicle.brand || (vehicle.kind === 'used-sourcing' ? 'Used car' : 'New car')}</h3><p>Quantity: {vehicle.quantity || 'To complete'} · {vehicle.kind === 'new' ? 'New car' : 'Used-car request'}</p>{vehicle.variant && <p>{vehicle.variant}</p>}</div>)}
        {draft.country.trim() && <dl><div><dt>Destination</dt><dd>{draft.country}</dd></div></dl>}
      </section>}
      <section className="quote-contact-card" aria-labelledby="quote-direct-heading">
        <h2 id="quote-direct-heading">Prefer to talk first?</h2>
        <DirectContacts />
      </section>
    </aside>
  </div>;
}

