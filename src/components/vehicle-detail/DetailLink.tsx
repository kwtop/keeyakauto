import {ArrowRight} from 'lucide-react';

interface Props {
 href:string;
 label:string;
 purpose:'inspection'|'configuration';
}

export default function DetailLink({href,label,purpose}:Props){
 return <a className={`vd-text-link vd-text-link--${purpose}`} href={href}>
  <span>{label}</span>
  <ArrowRight size={18} aria-hidden="true"/>
 </a>;
}
