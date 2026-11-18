import {Flame} from 'lucide-react';
import {brandPopularityRank} from '../data/brandPopularity';
import '../styles/brand-popularity.css';

export default function BrandPopularityBadge({slug}:{slug:string}) {
  const rank=brandPopularityRank(slug);
  if(!rank)return null;
  return <span className={`brand-popular-badge${rank<=3?' brand-popular-badge--ranked':''}`} data-rank={rank} aria-hidden="true">
    <Flame size={rank<=3?11:13} strokeWidth={1.8}/>
    {rank<=3&&<span className="brand-popular-badge-number">{rank}</span>}
  </span>;
}
