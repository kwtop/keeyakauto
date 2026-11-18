import frames from './catalogSceneFraming.json';
type SceneFrame={width:number;height:number;bounds:number[]};
const sceneFrames:Record<string,SceneFrame>=frames;

/** Source-photo bounds cannot safely zoom a different scene composition. */
export function vehicleSceneFraming(source:string){
 const frame=sceneFrames[source];
 if(!frame)return undefined;
 return {objectPosition:'50% 65%'};
}
