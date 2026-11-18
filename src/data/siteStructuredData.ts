import {company} from './company';

/** Shared IDs describe the same documented operator throughout the site. */
export function siteEntities(origin:string|URL) {
  const url=(path:string)=>new URL(path,origin).href;
  return [
    {'@type':'Organization','@id':url('/#organization'),name:company.legalName,alternateName:company.brand,url:url('/'),
      logo:url('/images/brand/keeyak-wordmark-360.webp'),email:company.email,telephone:company.phone,
      address:{'@type':'PostalAddress',streetAddress:company.officeAddress,addressLocality:'Hangzhou',addressRegion:'Zhejiang',addressCountry:'CN'}},
    {'@type':'WebSite','@id':url('/#website'),url:url('/'),name:'KEEYAK Auto',inLanguage:'en',publisher:{'@id':url('/#organization')}},
  ];
}
