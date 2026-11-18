import {siteImage} from './siteImagery';

// Editorial illustrations only. Never a stock, facility or inspection record.
export const exportMedia={
 overview:{...siteImage('port-overview'),alt:'Illustrative Toyota Camry beside a vehicle carrier at a seaport'},
 inspection:{...siteImage('inspection-detail'),alt:'Illustrative paintwork check with a gloved hand and a blank-display thickness gauge'},
 inspectionDetail:{src:'/images/home-coral-preview-20261016/inspection-portrait.webp',small:'/images/home-coral-preview-20261016/inspection-portrait-960.webp',width:1122,height:1402,alt:'AI-created inspection scene with hands, a tool and a tire; no inspection result is represented'},
 shipping:{...siteImage('port-overview'),alt:'Illustrative Toyota Camry and a roll-on-roll-off vessel at a quiet seaport'},
 documents:{...siteImage('quotation-desk'),alt:'Illustrative purchasing workspace with blank papers, a key and a laptop'},
 diagnosis:{...siteImage('support-diagnosis'),alt:'Illustrative technician with a tablet beside a Toyota RAV4; not a workshop record'},
 shippingDetail:{...siteImage('shipping-portrait'),alt:'Illustrative silver Toyota Camry beside a vehicle-carrier loading ramp at a working port'}
};
