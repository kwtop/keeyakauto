import {useRef,useState} from 'react';
export type StudyPhoto={src:string;srcSet?:string;alt:string;original?:string;note?:string};
export function Gallery({photos,white=false}:{photos:StudyPhoto[];white?:boolean}){
 const [index,setIndex]=useState(0),dialog=useRef<HTMLDialogElement>(null),photo=photos[index];
 const move=(n:number)=>setIndex(i=>(i+n+photos.length)%photos.length);
 return <div className={'cs-gallery'+(white?' cs-gallery-white':'')}>
  <button className="cs-main-photo" type="button" onClick={()=>dialog.current?.showModal()} aria-label="Enlarge Corolla photograph"><img src={photo.src} srcSet={photo.srcSet} sizes="(min-width:1200px) 780px, (min-width:810px) 56vw, calc(100vw - 40px)" width="1448" height="1086" alt={photo.alt} fetchPriority="high"/></button>
  <div className="cs-thumbnails" role="group" aria-label="Corolla exterior photographs">{photos.map((p,i)=><button key={p.src} type="button" aria-label={`View photograph ${i+1}`} aria-pressed={i===index} onClick={()=>setIndex(i)}><img src={p.src} width="144" height="108" alt="" loading="lazy"/></button>)}</div>
  <dialog className="cs-viewer" ref={dialog} aria-label="Corolla exterior gallery" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}} onKeyDown={e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}if(e.key==='ArrowRight'){e.preventDefault();move(1);}}}>
   <div className="cs-viewer-bar"><span>Toyota Corolla</span><button type="button" onClick={()=>dialog.current?.close()} autoFocus>Close</button></div><img src={photo.src} alt={photo.alt}/><div className="cs-viewer-bar"><button type="button" onClick={()=>move(-1)}>Previous</button><span>{index+1} / {photos.length}</span><a href={photo.original||photo.src} target="_blank" rel="noopener noreferrer">Original photo</a><button type="button" onClick={()=>move(1)}>Next</button></div>
  </dialog>
 </div>;
}
