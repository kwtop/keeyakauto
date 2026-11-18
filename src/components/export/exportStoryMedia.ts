import {siteImage} from '../../data/siteImagery';
import {innerGuideImage} from '../../data/innerGuideImages';
// Illustrative reading aids only; these scenes do not establish a transaction or record.
export const recordsScene = {
  ...innerGuideImage('quotation-desk'),
  alt:'AI-generated purchasing still life with blank papers, a vehicle key and a Toyota Camry outside a sunlit pavilion; not transaction records',
  caption:''
};

export const shippingLandscape = {
  ...innerGuideImage('port-overview'),
  alt:'AI-generated Toyota Camry at a sunlit coastal vehicle terminal; not a company shipment',
  caption:''
};

export const reviewScene = {
  ...siteImage('guide-quotation'),
  alt:'AI-edited illustration of blank quotation papers, a key and Toyota RAV4 outside an urban meeting space; not transaction evidence',
  caption:''
};

export const cabinScene = {
  ...innerGuideImage('cabin-detail'),
  alt:'AI-generated sunlit passenger-car cabin with ivory upholstery; not an exact vehicle configuration',
  caption:''
};
