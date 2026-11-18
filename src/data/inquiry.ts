import {normalizeCategory, vehicleCategoryLabel, type VehicleCategory} from './vehicleCategories';

import {powertrainLabel} from './catalogLabels';
import {company} from './company';

export const INQUIRY_DRAFT_KEY = 'keeyak-auto.inquiry-draft.v1';
export const INQUIRY_READY_KEY = 'keeyak-auto.inquiry-ready.v1';
export const INQUIRY_EMAIL = 'contact@keeyak.com';
export const CONTACT_MESSAGE_SERVICE = 'Contact message';
export const CONTACT_TOPICS = ['Buying a car', 'Shipping & export', 'Existing order & after-sales', 'Business partnership', 'Other'] as const;

export type VehicleKind = 'new' | 'used-sourcing';
export type ContactMethod = 'phone' | 'email';
export type VehicleRequest = {
  id: string;
  kind: VehicleKind;
  brand: string;
  category: VehicleCategory | '';
  model: string;
  quantity: string;
  year: string;
  variant: string;
  variantReference: string;
  powertrain: string;
  source: string;
  mileage: string;
  mileageUnit: string;
  condition: string;
};
export type InquiryDraft = {
  version: 1;
  vehicles: VehicleRequest[];
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  contactMethod?: ContactMethod;
  port: string;
  budget: string;
  currency: string;
  delivery: string;
  color: string;
  alternatives: string;
  usedYears: string;
  usedMileage: string;
  notes: string;
  service: string;
  contactTopic?: string;
};
export type PreparedInquiry = { version: 1; preparedAt: string; brief: string; draft: InquiryDraft };
export type InquiryErrors = Record<string, string>;

const text = (value: unknown, limit = 300) => typeof value === 'string' ? value.slice(0, limit) : '';
const supplied = (value: string) => value.trim() || 'Not supplied';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+[1-9]\d{6,14}$/;
const VARIANT_REFERENCE_PATTERN = /^\d{4}-[a-f\d]{8,}$/i;

export function blankVehicle(id = 'vehicle-1'): VehicleRequest {
  return { id, kind: 'new', brand: '', category: '', model: '', quantity: '1', year: '', variant: '', variantReference: '', powertrain: '', source: '', mileage: '', mileageUnit: 'km', condition: '' };
}

export function blankDraft(initialModel = ''): InquiryDraft {
  return { version: 1, vehicles: initialModel ? [{ ...blankVehicle(), model: initialModel }] : [], name: '', company: '', country: '', email: '', phone: '', port: '', budget: '', currency: '', delivery: '', color: '', alternatives: '', usedYears: '', usedMileage: '', notes: '', service: '' };
}

const vehicleDefaults = blankVehicle();
const vehicleFields = (Object.keys(vehicleDefaults) as (keyof VehicleRequest)[]).filter(key => key !== 'id');
export function hasVehicleDetails(vehicle: VehicleRequest) {
  return vehicleFields.some(key => vehicle[key].trim() !== vehicleDefaults[key]);
}

export function normalizeInternationalPhone(value: string) {
  return value.replace(/[\s().-]/g, '');
}

/** Retain both inputs in the editable draft, but send only the selected contact. */
export function selectedContactDraft(draft: InquiryDraft): InquiryDraft {
  if (draft.contactMethod === 'phone') return {...draft, email: ''};
  if (draft.contactMethod === 'email') return {...draft, phone: ''};
  return draft;
}

export function validateInquiry(draft: InquiryDraft, { requireName = false } = {}): InquiryErrors {
  const errors: InquiryErrors = {};
  const contact = selectedContactDraft(draft);
  const contactMessage = draft.service === CONTACT_MESSAGE_SERVICE && draft.vehicles.length === 0;
  if (contactMessage && draft.contactTopic !== undefined) {
    if (!draft.name.trim()) errors.name = 'Enter your full name.';
    if (!draft.country.trim()) errors.country = 'Enter your country.';
    if (!CONTACT_TOPICS.some(topic => topic === draft.contactTopic)) errors.contactTopic = 'Choose an inquiry type.';
  }
  if (requireName && !contactMessage && !draft.name.trim()) errors.name = 'Enter your name.';
  if (!contactMessage && !draft.country.trim()) errors.country = 'Enter the destination country.';
  if (!contact.email.trim() && !contact.phone.trim()) {
    if (draft.contactMethod === 'phone') errors.phone = 'Enter your WhatsApp or phone number, including the country code.';
    else errors.email = draft.contactMethod === 'email' ? 'Enter your email address.' : 'Enter an email address or an international phone number.';
  }
  if (contact.email.trim() && (!EMAIL_PATTERN.test(contact.email.trim()) || contact.email.trim().length > 254)) errors.email = 'Enter a valid email address.';
  if (contact.phone.trim() && !PHONE_PATTERN.test(normalizeInternationalPhone(contact.phone.trim()))) errors.phone = 'Include + and a country code, with 7 to 15 digits in total.';
  if (!draft.notes.trim()) errors.notes = contactMessage ? 'Enter a message.' : 'Tell us which vehicle you need and any key requirements.';
  if (draft.vehicles.length > 30) errors.vehicles = 'Keep this brief to 30 model requests. Add further requirements in the notes.';
  for (const vehicle of draft.vehicles) {
    if (!/^\d+$/.test(vehicle.quantity) || !Number.isSafeInteger(Number(vehicle.quantity)) || Number(vehicle.quantity) < 1) {
      errors[`${vehicle.id}-quantity`] = 'Enter a positive whole number.';
    }
  }
  return errors;
}

/** Recover only known string fields. A stale or malformed browser draft cannot create stock records. */
export function restoreDraft(value: unknown): InquiryDraft | null {
  if (!value || typeof value !== 'object') return null;
  const input = value as Record<string, unknown>;
  if (input.version !== 1 || !Array.isArray(input.vehicles)) return null;
  const draft = blankDraft();
  const fields = ['name', 'company', 'country', 'email', 'phone', 'port', 'budget', 'currency', 'delivery', 'color', 'alternatives', 'usedYears', 'usedMileage', 'service'] as const;
  for (const field of fields) draft[field] = text(input[field]);
  if (input.contactMethod === 'phone' || input.contactMethod === 'email') draft.contactMethod = input.contactMethod;
  if (draft.service === CONTACT_MESSAGE_SERVICE && input.contactTopic !== undefined) draft.contactTopic = text(input.contactTopic, 100);
  draft.notes = text(input.notes, 4000);
  draft.vehicles = input.vehicles.slice(0, 30).flatMap((item, index) => {
    if (!item || typeof item !== 'object') return [];
    const row = item as Record<string, unknown>;
    const savedVariant = text(row.variant);
    const legacyReference = VARIANT_REFERENCE_PATTERN.test(savedVariant) ? savedVariant : '';
    return [{ id: `vehicle-${index + 1}`, kind: row.kind === 'used-sourcing' ? 'used-sourcing' : 'new', brand: text(row.brand), category: normalizeCategory(row.category), model: text(row.model), quantity: text(row.quantity, 20), year: text(row.year, 40), variant: legacyReference ? '' : savedVariant, variantReference: text(row.variantReference) || legacyReference, powertrain: text(row.powertrain), source: text(row.source, 600), mileage: text(row.mileage), mileageUnit: row.mileageUnit === 'miles' ? 'miles' : 'km', condition: text(row.condition) } satisfies VehicleRequest];
  }).filter(hasVehicleDetails);
  return draft;
}

export function draftFromQuery(search: string, existing: InquiryDraft): InquiryDraft {
  const query = new URLSearchParams(search);
  const kind = query.get('kind')?.toLowerCase();
  const trimName = text(query.get('trim')).trim();
  const variantValue = text(query.get('variant')).trim();
  const variantIsReference = VARIANT_REFERENCE_PATTERN.test(variantValue);
  const requestedQuantity = query.get('quantity')?.trim() || '';
  const validQuantity = /^[1-9]\d{0,8}$/.test(requestedQuantity) ? requestedQuantity : '';
  const category = normalizeCategory(query.get('category') || query.get('body'));
  const requestedBrands = [...new Set(query.getAll('brand').map(value => text(value, 100).trim()).filter(Boolean))];
  const brandAlternatives = requestedBrands.length > 1 ? `Acceptable brands: ${requestedBrands.join(', ')}` : '';
  const contextualVehicle: VehicleRequest = {
    ...blankVehicle('vehicle-context'),
    kind: kind === 'used' || kind === 'used-sourcing' ? 'used-sourcing' : 'new',
    model: text(query.get('model')) || (category ? `${category === 'MPV' ? vehicleCategoryLabel(category) : category} sourcing` : ''), brand: requestedBrands.length === 1 ? requestedBrands[0] : '', category, year: text(query.get('year'), 40),
    quantity: validQuantity || '1',
    variant: trimName || (variantIsReference ? '' : variantValue),
    variantReference: variantValue && (variantIsReference || (trimName && variantValue !== trimName)) ? variantValue : '',
    powertrain: text(query.get('powertrain')),
    source: text(query.get('source'), 600)
  };
  const draft = {
    ...existing,
    service: text(query.get('service')) || existing.service,
    country: text(query.get('country')).trim() || existing.country,
    alternatives: brandAlternatives && !existing.alternatives.includes(brandAlternatives) ? text([existing.alternatives, brandAlternatives].filter(Boolean).join('; ')) : existing.alternatives
  };
  if (!hasVehicleDetails(contextualVehicle)) return draft;
  const matching = draft.vehicles.find(vehicle =>
    ['kind', 'model', 'brand', 'year', 'source'].every(key => vehicle[key as keyof VehicleRequest] === contextualVehicle[key as keyof VehicleRequest]) &&
    (!vehicle.category || !contextualVehicle.category || vehicle.category === contextualVehicle.category) &&
    (!vehicle.powertrain || !contextualVehicle.powertrain || vehicle.powertrain === contextualVehicle.powertrain) &&
    (contextualVehicle.variantReference ? vehicle.variantReference === contextualVehicle.variantReference : vehicle.variant === contextualVehicle.variant && !vehicle.variantReference)
  );
  if (matching) {
    // A previous draft may have saved only the reference ID. Restore its readable trim without losing quantity or edits.
    const updated = {
      ...matching,
      variant: matching.variant || contextualVehicle.variant,
      powertrain: matching.powertrain || contextualVehicle.powertrain,
      category: matching.category || contextualVehicle.category
    };
    const vehicles = contextualVehicle.model
      ? [updated, ...draft.vehicles.filter(vehicle => vehicle !== matching)]
      : draft.vehicles.map(vehicle => vehicle === matching ? updated : vehicle);
    return { ...draft, vehicles };
  }
  const onlyBlank = draft.vehicles.length === 1 && !hasVehicleDetails(draft.vehicles[0]);
  if (!onlyBlank && draft.vehicles.length >= 30) return draft;
  const incoming = { ...contextualVehicle, id: onlyBlank ? draft.vehicles[0].id : `vehicle-context-${draft.vehicles.length}` };
  const vehicles = onlyBlank ? [incoming] : contextualVehicle.model ? [incoming, ...draft.vehicles] : [...draft.vehicles, incoming];
  return { ...draft, vehicles };
}

export function sameInquiryDraft(left:InquiryDraft,right:InquiryDraft){
  const a=restoreDraft(left),b=restoreDraft(right);
  return JSON.stringify(a&&selectedContactDraft(a))===JSON.stringify(b&&selectedContactDraft(b));
}

export function inquiryBrief(draft: InquiryDraft): string {
  draft = selectedContactDraft(draft);
  if (draft.service === CONTACT_MESSAGE_SERVICE && draft.vehicles.length === 0) {
    return [
      'KEEYAK AUTO: CONTACT MESSAGE',
      `Name: ${supplied(draft.name)}`,
      ...(draft.country.trim() ? [`Country: ${draft.country.trim()}`] : []),
      ...(draft.contactTopic ? [`Inquiry type: ${draft.contactTopic}`] : []),
      `Email: ${supplied(draft.email)}`,
      `Phone / WhatsApp: ${supplied(draft.phone)}`,
      '', draft.notes.trim()
    ].join('\n');
  }
  const vehicles = draft.vehicles.flatMap((vehicle, index) => [
    `Vehicle ${index + 1}: ${vehicle.kind === 'new' ? 'New model request' : 'Used vehicle sourcing request'}`,
    `Brand: ${supplied(vehicle.brand)}`,
    ...(vehicle.category ? [`Category: ${vehicleCategoryLabel(vehicle.category)}`] : []),
    `Model / sourcing requirement: ${supplied(vehicle.model)}`,
    `Quantity: ${supplied(vehicle.quantity)}`,
    `Year / year range: ${supplied(vehicle.year)}`,
    ...(vehicle.kind === 'used-sourcing' ? [`Mileage requirement: ${vehicle.mileage.trim() ? `${vehicle.mileage} ${vehicle.mileageUnit}` : 'Not supplied'}`, `Condition requirement: ${supplied(vehicle.condition)}`] : []),
    `Variant / configuration: ${supplied(vehicle.variant)}`,
    ...(vehicle.variantReference ? [`Version reference: ${vehicle.variantReference}`] : []),
    `Powertrain: ${supplied(powertrainLabel(vehicle.powertrain))}`,
    `Reference page or source: ${supplied(vehicle.source)}`,
    ''
  ]);
  return [
    'KEEYAK AUTO: VEHICLE INQUIRY', '', ...vehicles,
    `Destination country: ${supplied(draft.country)}`,
    `Destination port: ${supplied(draft.port)}`,
    `Email: ${supplied(draft.email)}`,
    `International phone / WhatsApp: ${supplied(draft.phone)}`,
    `Contact name: ${supplied(draft.name)}`,
    `Company: ${supplied(draft.company)}`, '',
    'ADDITIONAL REQUIREMENTS',
    `Budget: ${[draft.budget.trim(), draft.currency.trim()].filter(Boolean).join(' ') || 'Not supplied'}`,
    `Target delivery: ${supplied(draft.delivery)}`,
    `Preferred color: ${supplied(draft.color)}`,
    `Acceptable alternatives: ${supplied(draft.alternatives)}`,
    ...(draft.usedYears || draft.usedMileage ? ['GENERAL REQUIREMENTS FROM SAVED DRAFT (not assigned to an individual vehicle)', `Used vehicle year range: ${supplied(draft.usedYears)}`, `Used vehicle mileage range: ${supplied(draft.usedMileage)}`] : []),
    `Other requirements: ${supplied(draft.notes)}`,
    `Service requested: ${supplied(draft.service)}`, '',
    draft.vehicles.length ? 'Please confirm availability and the configuration you can offer. I would also like a written quote and the details needed to check whether the vehicle is suitable for my destination.' : 'Please contact me to discuss my inquiry.',
    'This inquiry does not place an order or reserve a vehicle.'
  ].join('\n');
}

export function inquiryChannels(brief: string) {
  return {
    email: `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent('KEEYAK AUTO: vehicle inquiry')}&body=${encodeURIComponent(brief)}`,
    whatsapp: `${company.whatsapp}?text=${encodeURIComponent(brief)}`
  };
}

export function restorePreparedInquiry(value: unknown): PreparedInquiry | null {
  if (!value || typeof value !== 'object') return null;
  const input = value as Record<string, unknown>;
  const restored = restoreDraft(input.draft);
  const draft = restored && selectedContactDraft(restored);
  if (input.version !== 1 || !draft || Object.keys(validateInquiry(draft)).length || typeof input.preparedAt !== 'string' || Number.isNaN(Date.parse(input.preparedAt))) return null;
  return { version: 1, preparedAt: input.preparedAt, brief: inquiryBrief(draft), draft };
}
