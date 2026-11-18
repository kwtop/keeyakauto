import {useEffect,useState} from 'react';
import CircularCarousel from './carousel/CircularCarousel';
import './VisitCarousel.css';

export default function VisitCarousel({items}){
 const [paused,setPaused]=useState(false),[small,setSmall]=useState(false),[reduced,setReduced]=useState(false);
 useEffect(()=>{
  const size=matchMedia('(max-width:809px)'),motion=matchMedia('(prefers-reduced-motion:reduce)');
  const update=()=>{setSmall(size.matches);setReduced(motion.matches);};update();
  size.addEventListener('change',update);motion.addEventListener('change',update);
  return()=>{size.removeEventListener('change',update);motion.removeEventListener('change',update);};
 },[]);
 return <div className="keeyak-visits-carousel">
  <div className="keeyak-visits-scene">
   <CircularCarousel id="home-visits-carousel" items={items} preset="cylinder" intro="none" cardWidth={small?310:360} aspectRatio={4/3} gap={32} curve={0.25} segments={4} tilt={-7} perspective={2200} fitMode="focus" autoplay={paused||reduced?'off':'drift'} speed={5} momentum={0.25} parallax={0.06} stretch={0} depthFade={small?0.88:0.65} fadeColor="#ffffff" innerShade={0.9} cornerRadius={20} pauseOnHover draggable snap captions={false} onItemClick={()=>setPaused(value=>!value)} ariaLabel={`Visits and time together; ${items.length} photographs. Drag or use arrow keys to browse. Click or press Space to ${paused?'resume':'pause'}.`}/>
  </div>
 </div>;
}
