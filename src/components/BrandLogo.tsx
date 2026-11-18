import {catalogBrandAsset, catalogBrandMarkStyle} from '../data/catalogBrandAssets';
import '../styles/brand-identity.css';

/** Decorative beside a labelled model or brand link; no duplicate spoken label. */
export default function BrandLogo({slug, name, className = '', light = false, catalogSize = false}: {slug: string; name?: string; className?: string; light?: boolean; catalogSize?: boolean}) {
  const asset = catalogBrandAsset(slug);
  if (!asset) return null;
  return <img className={`brand-emblem ${className}`} src={asset.src} style={catalogSize ? {...catalogBrandMarkStyle(slug), flexBasis: 'auto'} : undefined} alt="" title={name} width={46} height={32} loading="lazy" data-light={light || undefined}/>;
}
