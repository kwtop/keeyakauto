import frames from './vehicleCardFraming.json';

type PhotoFrame={width:number;height:number;bounds:number[]};
const sourceFrames:Record<string,PhotoFrame>=frames;

/** Presentation only: match the exact source URL, preserve its aspect ratio. */
export function vehicleCardFraming(source:string){
 const frame=sourceFrames[source];
 if(!frame)return undefined;
 const [left,top,right,bottom]=frame.bounds;
 const bodyWidth=right-left,bodyHeight=bottom-top;
 // Match visible body width; the height limit protects unusually upright views
 // in the shallowest (3:2 desktop) card. Mobile cards provide more vertical room.
 const targetWidth=Math.min(.8,.74*(2/3)*bodyWidth/bodyHeight);
 const width=100*targetWidth*frame.width/bodyWidth;
 const centerX=100*(left+right)/(2*frame.width);
 const groundY=100*bottom/frame.height;
 return {
  width:`${width.toFixed(4)}%`,
  transform:`translate(-${centerX.toFixed(4)}%, -${groundY.toFixed(4)}%)`,
 };
}
