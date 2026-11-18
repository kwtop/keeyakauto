import BrandLogo from '../BrandLogo';
import type {DetailRecommendation} from '../../data/detailRecommendations';
import {bodyGroupLabel,powertrainLabel} from '../../data/catalogLabels';
import {vehicleDisplayImage} from '../../data/imageDelivery';
import {detailModelScene,vehicleCardPhoto} from '../../data/modelVisuals';
export default function RelatedModels({models}:{models:DetailRecommendation[]}){
 const vehicleHref=(v:DetailRecommendation)=>`/${v.kind==='new'?'new-cars':'used-cars'}/${v.brandSlug}/${v.slug}/`;
 const isUsed=models[0]?.kind==='used';
 const photoSizes=isUsed?'(min-width:1400px) 425px, (min-width:810px) 31vw, 46vw':'(min-width:1200px) 320px, (min-width:810px) 23vw, 46vw';
 return <section className="vd-section vd-alternatives" data-core-module="alternatives" aria-labelledby="related-models-heading"><div className="vd-section-heading"><h2 id="related-models-heading">{isUsed?'More used cars to consider':'Similar models to compare'}</h2></div><div className="vd-related-grid">{models.map(v=>{
  const scene=detailModelScene(v);
  const photo=v.kind==='used'?vehicleCardPhoto(v):{src:scene?.src||vehicleDisplayImage(v.image),srcSet:scene?.srcSet};
  const facts=v.kind==='used'
   ? [v.year,typeof v.mileageKm==='number'?v.mileageKm.toLocaleString('en-US')+' km':'',powertrainLabel(v.powertrain)].filter(Boolean).join(' · ')
   : bodyGroupLabel(v.body,v.kind)+' · '+powertrainLabel(v.powertrain);
  return <article key={vehicleHref(v)}><a className={'vd-related-photo'+(scene?' vd-related-photo--scene':'')} href={vehicleHref(v)} tabIndex={-1} aria-hidden="true"><img {...photo} sizes={photoSizes} alt="" width={600} height={450} loading="lazy"/></a><div className="vd-related-copy"><h3 className="brand-title brand-title--compact"><BrandLogo slug={v.brandSlug}/><a href={vehicleHref(v)}>{v.name}</a></h3><p>{facts}</p></div></article>;
 })}</div></section>;
}
