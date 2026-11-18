import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('..');const file=path.join(root,'docs/nest-site-20261019/REVIEW-CATALOG.json');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'checkpoints/nest-site-20261019/catalog-review/MANIFEST.json'),'utf8'));
const finalManifestFile=path.join(root,'checkpoints/nest-site-20261019/catalog-review-final/MANIFEST.json');
const finalManifest=fs.existsSync(finalManifestFile)?JSON.parse(fs.readFileSync(finalManifestFile,'utf8')):[];
const data=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{date:'2026-10-19',reviewerRole:'Independent reviewer; implemented company/contact batch, did not implement catalog/brand/vehicle batch.',threshold:85,rubric:{structure:25,typography:20,imagery:20,procurementTrust:20,mobileReadability:15},referenceLimitation:'Quality score only. New Nest source screenshots remain unavailable; this is not a reference fidelity score.',method:'Every scored URL is viewed using its final 1440px screenshot segmented at 900px panel width and its full 390px screenshot at 1:1 panel width. Actual capture DOM geometry/image/loading data are checked alongside. Grouped panels exclude the shared footer after the final main module; original full screenshots remain linked. Scores are entered after viewing, not generated from template or automated pass.',pages:[]};
const incoming=JSON.parse(process.argv[2]);
for(const r of incoming){
 if(Array.isArray(r.scores))r.scores=Object.fromEntries(Object.keys(data.rubric).map((key,index)=>[key,r.scores[index]]));
 const m=(r.evidenceStage==='final'?finalManifest:manifest).find(p=>p.url===r.url);if(!m||m.status!=='ready')throw Error('No captured evidence '+r.url);
 const total=Object.values(r.scores).reduce((a,b)=>a+b,0);
 const previous=data.pages.find(x=>x.url===r.url);
 const history=previous?[...(previous.history||[]),{reviewedAt:previous.reviewedAt,evidenceStage:previous.evidenceStage||'after',screenshots:previous.screenshots,scores:previous.scores,total:previous.total,pass:previous.pass,observations:previous.observations,issues:previous.issues,viewedPanels:previous.viewedPanels}]:[];
 const record={url:r.url,type:m.type,status:'manually-reviewed-desktop-and-mobile',reviewedAt:new Date().toISOString(),screenshots:[...new Set(m.panels.map(p=>p.source))],viewedPanels:m.panels.map(p=>({file:p.file,viewport:p.viewportWidth,scale:p.displayScale,cssRanges:p.cssRanges})),captureChecks:m.metadata,scores:r.scores,total,pass:total>=85,observations:r.observations,issues:r.issues||[],history,contentRead:'Visible purchasing text, headings, labels and conditions read from 390px native panels; desktop composition/photograph proportions checked in readable segmented panels. No inference of real inventory, exact equipment or order fulfillment from model photos.'};
 record.evidenceStage=r.evidenceStage||'after';
 if(r.imageComparison||previous?.imageComparison)record.imageComparison=r.imageComparison||previous.imageComparison;
 data.pages=data.pages.filter(x=>x.url!==r.url);data.pages.push(record);
}
data.method='Every scored URL is actually viewed using its built 1440px screenshot segmented at 900px panel width and its full 390px screenshot at 1:1 panel width. Evidence stage is after or final per page. Actual capture DOM geometry/image/loading data are checked alongside. Grouped panels exclude the shared footer after the final main module; original full screenshots remain linked. Scores are entered after viewing, not generated from template or automated pass.';
for(const page of data.pages)page.evidenceStage??='after';
data.counts={scored:data.pages.length,passed:data.pages.filter(p=>p.pass).length,belowThreshold:data.pages.filter(p=>!p.pass).length,pending:manifest.length-data.pages.length};
fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify(data.counts));
