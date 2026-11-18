import {CarFront,ClipboardList,Download,Eye,FilePenLine,Gauge,Images,Mail,MessageCircle,MousePointerClick,Send,TriangleAlert,type LucideIcon} from 'lucide-react';
const icons:Record<string,LucideIcon>={inquiry_saved:Send,whatsapp_click:MessageCircle,email_click:Mail,page_view:Eye,product_view:CarFront,specifications_expand:Gauge,gallery_view:Images,download_click:Download,inquiry_click:ClipboardList,form_start:FilePenLine,form_submit_failed:TriangleAlert};
export default function ActivityIcon({name,size=18}:{name:string;size?:number}){
  const Icon=icons[name]||MousePointerClick;
  return <span className={'adm-event-icon adm-event-icon--'+name}><Icon size={size} strokeWidth={1.7} aria-hidden="true"/></span>;
}
