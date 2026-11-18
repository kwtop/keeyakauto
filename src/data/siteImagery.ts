import originalImages from './siteImagerySizes.json';
import correctedImages from './brandCorrectedImageSizes.json';

// Badge corrections replace shared illustrations without changing model galleries.
const images={...originalImages,...correctedImages};

type ImageAsset={src:string;width:number;height:number;srcSet:string;small:string;};
// Exact dimensions and responsive copies come from the adopted ImageGen files.
export function siteImage(name:string){
 const image=(images as Record<string,ImageAsset>)[name];
 if(!image)throw new Error('Missing reviewed website image: '+name);
 return {...image,smallWidth:800};
}
export function siteImageProps(name:string){
 const {src,width,height,srcSet}=siteImage(name);
 return {src,width,height,srcset:srcSet};
}
