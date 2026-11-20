import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {ArrowLeft,ArrowRight} from 'lucide-react';
import type {Vehicle} from '../../data/catalog';
import {galleryThumbnailPath, vehicleGalleryPhotos} from '../../data/vehicleGallery';
import {track} from '../../scripts/measurement-client';

const galleryPhotoSizes='(min-width:1400px) 790px, (min-width:900px) 57vw, (min-width:810px) calc(100vw - 64px), calc(100vw - 40px)';
// Checked against each original so the entire car fits inside the preview.
const exteriorPreviews:Partial<Record<string,{position:string;widthScale?:number}>>={
 '/images/used-catalog/haval/h6-pro/01.jpg':{position:'68%'},
 '/images/used-catalog/haval/h6-pro/02.jpg':{position:'59%'},
 '/images/used-catalog/haval/h6-pro/03.jpg':{position:'55%'},
 '/images/used-catalog/haval/h6-pro/07.jpg':{position:'70%',widthScale:.91},
 '/images/used-catalog/haval/h6-pro/08.jpg':{position:'62%',widthScale:.91},
 '/images/used-catalog/haval/h6-pro/09.jpg':{position:'64%',widthScale:.91},
};

export default function Gallery({vehicle}:{vehicle:Vehicle}){
 const isUsed=vehicle.kind==='used';
 const photos=vehicleGalleryPhotos(vehicle);
 const [index,setIndex]=useState(0),dialog=useRef<HTMLDialogElement>(null),thumbnailRail=useRef<HTMLDivElement>(null),photo=photos[index]??photos[0];
 const [viewerOpen,setViewerOpen]=useState(false);
 const exteriorPreview=isUsed?exteriorPreviews[photo.original]:undefined;
 const move=(step:number)=>{setIndex(i=>(i+step+photos.length)%photos.length);track('gallery_view','product_gallery');};
 const openPhoto=(next:number)=>{setIndex(next);dialog.current?.showModal();setViewerOpen(true);track('gallery_view','product_gallery');};
 useEffect(()=>{
  const rail=thumbnailRail.current,active=rail?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]');
  if(!rail||!active)return;
  // Follow viewer changes horizontally without scrolling the whole page.
  const viewport=rail.getBoundingClientRect(),bounds=active.getBoundingClientRect();
  if(bounds.left<viewport.left)rail.scrollLeft+=bounds.left-viewport.left-2;
  else if(bounds.right>viewport.right)rail.scrollLeft+=bounds.right-viewport.right+2;
 },[index]);
 return <div className="vd-gallery">
  {isUsed?<div className="vd-photo-stage">
   <button className={'vd-main-photo vd-main-photo--original'+(exteriorPreview?' vd-main-photo--focused':'')}
    style={{'--vd-photo-backdrop':`url("${photos.length>1?galleryThumbnailPath(photo.src):photo.src}")`,...(exteriorPreview&&{'--vd-photo-position':exteriorPreview.position,'--vd-photo-width-scale':exteriorPreview.widthScale})} as CSSProperties}
    type="button" onClick={()=>openPhoto(index)} aria-label={'Enlarge '+vehicle.name+' photograph '+(index+1)}>
    <img className="vd-photo-original" src={photo.src} srcSet={photo.srcSet} sizes={galleryPhotoSizes} alt={photo.alt} width={photo.width} height={photo.height} fetchPriority="high" data-sitemap-image={photo.scene?undefined:''}/>
   </button>
   {photos.length>1&&<>
    <button className="vd-photo-arrow vd-photo-arrow--previous" type="button" onClick={()=>move(-1)} aria-label="Previous photograph"><ArrowLeft size={18} aria-hidden="true"/></button>
    <button className="vd-photo-arrow vd-photo-arrow--next" type="button" onClick={()=>move(1)} aria-label="Next photograph"><ArrowRight size={18} aria-hidden="true"/></button>
    <span className="vd-sr-only" aria-live="polite" aria-atomic="true">Photo {index+1} of {photos.length}</span>
   </>}
  </div>:<button className={'vd-main-photo'+(photo.scene?' vd-main-photo--scene':'')} type="button" onClick={()=>openPhoto(index)} aria-label={'Enlarge '+vehicle.name+' photograph'}><img src={photo.src} srcSet={photo.srcSet} sizes={galleryPhotoSizes} alt={photo.alt} width={1448} height={1086} fetchPriority="high" data-sitemap-image={photo.scene?undefined:''}/></button>}
  {photos.length>1&&<div className="vd-thumbnails" ref={thumbnailRail} role="group" aria-label={vehicle.name+' photographs'}>{photos.map((p,i)=><button key={p.src} className={p.scene?'vd-thumbnail--scene':undefined} type="button" onClick={()=>{setIndex(i);track('gallery_view','product_gallery');}} aria-label={'View photograph '+(i+1)} aria-pressed={i===index}><img src={galleryThumbnailPath(p.src)} width={160} height={120} alt="" loading="lazy" fetchPriority="low" data-sitemap-image={p.scene?undefined:p.src}/></button>)}</div>}
  {vehicle.photoVersionNote&&<p className="vd-photo-version-note">{vehicle.photoVersionNote}. Match the exterior and layout to your selected version.</p>}
  <dialog className="vd-viewer" ref={dialog} aria-label={vehicle.name+' photo gallery'} onClose={()=>{if(!dialog.current?.open)setViewerOpen(false);}} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}} onKeyDown={e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}if(e.key==='ArrowRight'){e.preventDefault();move(1);}}}>
   <div className="vd-viewer-bar"><span>{vehicle.name}</span><button type="button" onClick={()=>dialog.current?.close()} autoFocus>Close</button></div>
   {viewerOpen&&<img src={photo.src} alt={photo.alt}/>}
   <div className="vd-viewer-bar"><button type="button" disabled={photos.length<2} onClick={()=>move(-1)}>Previous</button><span aria-live="polite">{index+1} / {photos.length}</span><a href={photo.original||photo.src} target="_blank" rel="noopener noreferrer">Original photo</a><button type="button" disabled={photos.length<2} onClick={()=>move(1)}>Next</button></div>
  </dialog>
 </div>;
}
