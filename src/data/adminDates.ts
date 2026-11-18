export type DatePreset='today'|'yesterday'|'7days'|'30days';
export const datePresets:[DatePreset,string][]=[['today','今日'],['yesterday','昨天'],['7days','最近 7 天'],['30days','最近 30 天']];
const DAY=86400000,TZ=8*3600000;
export const shanghaiDate=(now=Date.now())=>new Date(now+TZ).toISOString().slice(0,10);
export function presetDates(preset:DatePreset,now=Date.now()){
  const end=preset==='yesterday'?now-DAY:now;
  const days=preset==='7days'?7:preset==='30days'?30:1;
  return {from:shanghaiDate(end-(days-1)*DAY),to:shanghaiDate(end)};
}
export function activeDatePreset(from:string,to:string,now=Date.now()){
  return datePresets.find(([preset])=>{const range=presetDates(preset,now);return range.from===from&&range.to===to;})?.[0];
}
