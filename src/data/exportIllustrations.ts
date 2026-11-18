export type ExportIllustration={image?:string;placement?:'aside'|'feature';items?:string[]};

// Presentation only: the service copy and FAQ answers remain in their original data files.
export const exportIllustrations:Record<string,Record<string,ExportIllustration>>={
 overview:{services:{items:['vehicle-search-brief','refined-inspection','shipping-route-coordination','guide-repair-approval']},records:{image:'vehicle-records-review',placement:'feature'}},
 'buying-guide':{
  process:{image:'planning',placement:'feature'},
  destination:{image:'destination-compatibility-check'},
  quotation:{image:'vehicle-quotation-review',placement:'feature'},
  documents:{image:'guide-order-documents',placement:'feature'},
  warranty:{image:'support-order-review'}
 },
 'sourcing-inspection':{
  requirement:{image:'vehicle-request-planning',placement:'feature'},
  scope:{image:'refined-inspection'},
  evidence:{image:'inspection-report-review'},
  exceptions:{image:'guide-inspection-follow-up'}
 },
 'shipping-support':{
  cost:{image:'shipping-route-coordination',placement:'feature'},
  documents:{image:'shipping-document-review',placement:'feature'},
  'pre-departure':{image:'refined-handover'},
  handover:{image:'guide-arrival-check',placement:'feature'}
 },
 'after-sales':{
  coverage:{image:'guide-repair-approval',placement:'feature'},
  report:{image:'support-issue-report',placement:'feature'},
  parts:{image:'parts-reference-match'}
 }
};

export const exportFaqIllustrations:Record<string,string>={
 choosing:'vehicle-search-brief',
 ordering:'guide-order-documents',
 inspection:'guide-inspection-follow-up',
 shipping:'guide-arrival-check',
 support:'guide-repair-approval'
};
