import refinedMedia from './aboutRefinedMedia.json';

type DeliveryImage = {src:string;srcset:string;width:number;height:number};
const delivery = refinedMedia as Record<string,DeliveryImage>;
const originals = {
 office:{original:'/images/keeyak-home-source-20261019/office-visitor-group.webp',width:1600,height:1200,alt:'Six colleagues and visitors at the KEEYAK Hangzhou office',caption:'Our Hangzhou office'},
 mexico:{original:'/images/company/about-selected/mexico-exhibition-01.webp',width:1706,height:1279,alt:'Five participants at the KEEYAK Mexico exhibition booth',caption:'Mexico · February 2026',href:'/about/news/mexico-exhibition-2026/'},
 spring:{original:'/images/company/about-selected/spring-festival-2025.webp',width:2400,height:1730,alt:'KEEYAK colleagues with Spring Festival gifts in the office',caption:'Spring Festival · January 2025',href:'/about/news/spring-festival-2025/'},
 vietnam:{original:'/images/company/about-selected/vietnam-booth-2026-wide.webp',width:1707,height:1280,alt:'The KEEYAK special-vehicle booth at the Vietnam exhibition',caption:'Vietnam · May 2026',href:'/about/news/vietnam-exhibition-2026/'},
 indonesia:{original:'/images/company/records/indonesia-2024-03.webp',width:1800,height:1350,alt:'Two participants discussing a catalogue at the KEEYAK INAPA exhibition booth',caption:'Indonesia · May 2024',href:'/about/news/indonesia-exhibition-2024/'},
 annual:{original:'/images/company/records/annual-gathering-2026.webp',width:1800,height:1350,alt:'KEEYAK colleagues at the January 2026 annual gathering',caption:'Annual gathering · January 2026',href:'/about/news/annual-gathering-2026/'},
 chongqing:{original:'/images/company/team-chongqing-2025.webp',width:2400,height:1800,alt:'KEEYAK colleagues on a team trip in Chongqing',caption:'Chongqing · September 2025',href:'/about/news/chongqing-team-day-2025/'},
 meeting:{original:'/images/company/team-office-2024.webp',width:2400,height:1800,alt:'Colleagues sharing a birthday cake and fruit around a table in the Hangzhou office',caption:'An office birthday gathering'},
 discussion:{original:'/images/company/about-selected/vietnam-discussion-2026-wide.webp',width:2400,height:1800,alt:'Two exhibition participants reviewing a laptop and catalogue at the Vietnam booth',caption:'A conversation in Vietnam',href:'/about/news/vietnam-exhibition-2026/'}
};
export type AboutPhotoId = keyof typeof originals;
export function aboutPhoto(id:AboutPhotoId){
 const original=originals[id];
 const image=delivery[id];
 return {...original,href:'href' in original?original.href:undefined,...(image??{src:original.original,srcset:undefined,width:original.width,height:original.height}),refined:Boolean(image)};
}
