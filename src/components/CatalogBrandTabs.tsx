import {useEffect, useId, useRef, useState} from 'react';
import {Check, ChevronUp, Ellipsis, LayoutGrid} from 'lucide-react';
import type {BrandChoice} from './BrandPicker';
import {catalogBrandAsset,compactCatalogBrandMarkStyle,catalogBrandCaption} from '../data/catalogBrandAssets';
import BrandPopularityBadge from './BrandPopularityBadge';
import {brandPopularityRank,brandPopularityDescription,catalogBrandChoices} from '../data/brandPopularity';

export default function CatalogBrandTabs({brands, selected, onSelect, onClear}: {
  brands: BrandChoice[]; selected: string[]; onSelect: (slug: string) => void; onClear: () => void;
}) {
  const gridId = useId();
  const container=useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const selection=selected.join('|');
  useEffect(()=>{
    if(selection&&window.matchMedia('(max-width:767px)').matches)setExpanded(false);
  },[selection]);
  const ordered=catalogBrandChoices(brands,selected,expanded);
  const canExpand=brands.some(brand=>!brandPopularityRank(brand.slug));
  function showOtherBrands(){
    setExpanded(true);
    requestAnimationFrame(()=>container.current?.querySelector<HTMLButtonElement>('.catalog-brand-all')?.focus({preventScroll:true}));
  }

  function selectBrand(slug:string){
    onSelect(slug);
    if(window.matchMedia('(max-width:767px)').matches){
      setExpanded(false);
      requestAnimationFrame(()=>{
        container.current?.querySelector<HTMLButtonElement>(`button[data-brand="${slug}"]`)?.focus({preventScroll:true});
        if(container.current&&container.current.getBoundingClientRect().top<88)container.current.scrollIntoView({block:'start'});
      });
    }
  }

  return <div ref={container} className="catalog-brand-tabs" role="group" aria-label="Browse by brand" data-expanded={expanded} data-has-selection={selected.length>0}>
    <div className="catalog-brand-tabs-heading">
      <span>Brand</span>
      {canExpand&&<button className="catalog-brand-mobile-toggle" type="button" aria-expanded={expanded} aria-controls={gridId} onClick={()=>setExpanded(current=>!current)}>{expanded?'Show fewer':'All brands'}{expanded?<ChevronUp size={16} aria-hidden="true"/>:<LayoutGrid size={16} aria-hidden="true"/>}</button>}
    </div>
    <div className="catalog-brand-tabs-items" id={gridId}>
      <button type="button" className="catalog-brand-all" aria-pressed={!selected.length} aria-expanded={canExpand ? expanded : undefined} aria-controls={canExpand ? gridId : undefined} onClick={() => {onClear();setExpanded(true);}}><LayoutGrid size={20} strokeWidth={1.5} aria-hidden="true"/>All brands</button>
      {ordered.map(brand => {
        const asset = catalogBrandAsset(brand.slug);
        const caption = asset ? catalogBrandCaption(brand.slug, brand.name) : null;
        const checked = selected.includes(brand.slug);
        return <button type="button" key={brand.slug} aria-label={brand.name} aria-description={brandPopularityDescription(brand.slug)} title={brand.name} aria-pressed={checked} data-brand={brand.slug} data-popular-rank={brandPopularityRank(brand.slug)} onClick={() => selectBrand(brand.slug)}>
          <span className="catalog-brand-mark">{asset ? <img src={asset.src} style={compactCatalogBrandMarkStyle(brand.slug)} alt="" width={100} height={32}/> : <span className="catalog-brand-wordmark">{brand.name}</span>}</span>
          {caption&&<span className="catalog-brand-caption">{caption}</span>}
          <BrandPopularityBadge slug={brand.slug}/>
          {checked && <Check className="catalog-brand-check" size={15} aria-hidden="true"/>}
        </button>;
      })}
      {selected.length>0&&<button type="button" className="catalog-brand-other" aria-expanded={expanded} aria-controls={gridId} onClick={showOtherBrands}><LayoutGrid size={22} strokeWidth={1.5} aria-hidden="true"/><span>Other brands</span></button>}
      {canExpand&&<button type="button" className="catalog-brand-more" aria-label={expanded ? 'Show fewer brands' : 'Show all brands'} aria-expanded={expanded} aria-controls={gridId} onClick={() => setExpanded(current => !current)}>
        {expanded ? <ChevronUp size={22} strokeWidth={1.5} aria-hidden="true"/> : <Ellipsis size={24} strokeWidth={1.7} aria-hidden="true"/>}
        <span>{expanded ? 'Show fewer' : 'More brands'}</span>
      </button>}
    </div>
  </div>;
}
