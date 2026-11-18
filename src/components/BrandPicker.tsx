import {useId, useState} from 'react';
import {Check, ChevronDown, Search} from 'lucide-react';
import {catalogBrandAsset,compactCatalogBrandMarkStyle,catalogBrandCaption} from '../data/catalogBrandAssets';
import BrandPopularityBadge from './BrandPopularityBadge';
import {brandPopularityRank,brandPopularityDescription} from '../data/brandPopularity';

export type BrandChoice = {name: string; slug: string; count: number};
export default function BrandPicker({brands, selected, onSelect, full = false, onShowAll}: {
  brands: BrandChoice[]; selected: string[]; onSelect: (slug: string) => void; full?: boolean; onShowAll?: () => void;
}) {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const shown = brands.filter(brand => brand.name.toLowerCase().includes(search.trim().toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name,'en',{sensitivity:'base'}));
  return <fieldset className="catalog-brands-picker" data-expanded={full || expanded || !!search} data-many={brands.length > 18}>
    <legend>Browse by brand</legend>
    {(full || brands.length > 18) && <label className="catalog-brand-search"><Search size={17} aria-hidden="true"/><input aria-label="Search brands" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search brands"/></label>}
    <div className="catalog-brands-grid">
      {shown.map((brand, index) => {
        const asset = catalogBrandAsset(brand.slug);
        const caption = asset ? catalogBrandCaption(brand.slug, brand.name) : null;
        const checked = selected.includes(brand.slug);
        return <label className="catalog-brand-choice" key={brand.slug} title={brand.name} data-popular-rank={brandPopularityRank(brand.slug)} data-selected={checked} data-extra={index >= 14} data-mobile-extra={index >= 6}>
          <input id={`${id}-${brand.slug}`} type="radio" name={`${id}-brand`} value={brand.slug} checked={checked} onChange={() => onSelect(brand.slug)} aria-label={brand.name} aria-description={brandPopularityDescription(brand.slug)}/>
          <span className="catalog-brand-mark">{asset ? <img src={asset.src} style={compactCatalogBrandMarkStyle(brand.slug)} alt="" width="100" height="32" loading="lazy"/> : <span className="catalog-brand-wordmark">{brand.name}</span>}</span>
          {caption&&<span className="catalog-brand-caption">{caption}</span>}
          <BrandPopularityBadge slug={brand.slug}/>
          {checked && <Check className="catalog-brand-check" size={14} aria-hidden="true"/>}
        </label>;
      })}
    </div>
    {!shown.length && <p className="catalog-no-brands">No matching brands.</p>}
    {!full && brands.length > 6 && <button type="button" className="catalog-brand-expand" data-desktop-visible={brands.length > 18} aria-expanded={expanded} onClick={() => {
      if (onShowAll && window.matchMedia('(max-width:767px)').matches) onShowAll();
      else setExpanded(value => !value);
    }}>{expanded ? 'Show fewer brands' : 'Show all brands'}<ChevronDown size={16} aria-hidden="true"/></button>}
  </fieldset>;
}
