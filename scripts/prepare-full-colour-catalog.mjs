import {build} from 'esbuild';
import {mkdir,writeFile,access} from 'node:fs/promises';
import path from 'node:path';
const folder=path.resolve('../docs/catalog-full-colour-20261021');
await mkdir(folder,{recursive:true});
const manifestPath=path.join(folder,'GENERATIONS.json');
try {await access(manifestPath);throw new Error('Manifest already exists; preserve completed work.');} catch(error) {if(error.code!=='ENOENT')throw error;}
const bundle=await build({stdin:{contents:"import {vehicles} from './src/data/catalog'; import {modelScene,vehicleCardPhoto} from './src/data/modelVisuals'; export const rows=vehicles.filter(v=>v.kind==='new').map(v=>({key:v.brandSlug+'/'+v.slug,name:v.name,photo:vehicleCardPhoto(v),scene:modelScene(v),gallery:v.gallery}));",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'node'});
const {rows}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
const plans=[
 ['wuling/xingguang','riverside-brick','a quiet riverside promenade beside russet brick townhouses, mature green trees and pale stone paving; clear soft morning light'],
 ['mg/mg5','blue-cultural-centre','a contemporary cultural centre with deep petrol-blue glazed tiles, warm oak doors and a small planted courtyard; clean daylight'],
 ['mg/mg7','copper-gallery','a refined modern art gallery clad in weathered copper and dark glass, a single amber-leaf tree, smooth charcoal paving; afternoon light'],
 ['byd/seal-05-dm-i','olive-courtyard','a sunlit Mediterranean courtyard with olive trees, cream plaster arches and pale peach walls; muted warm colours'],
 ['byd/seal-06-dm-i','redbrick-design-district','a restored redbrick design district with tall black-framed workshop windows, cobalt-blue doors and a clean stone forecourt'],
 ['byd/seal-07-dm-i','botanical-pavilion','a botanical garden visitor pavilion of timber slats and moss-green glass, restrained tropical foliage and a clean driveway'],
 ['byd/seagull','coral-neighbourhood','a cheerful quiet residential lane with coral-pink and pale mint stucco walls, small trees and warm grey pavement'],
 ['byd/destroyer-05','marina-boardwalk','a calm marina-side paved promenade with turquoise water, timber decking and low white sail masts in the distance; soft blue daylight'],
 ['byd/han-l','burgundy-hotel','an understated contemporary hotel entrance with burgundy stone panels, bronze details and warm interior light; late afternoon'],
 ['byd/qin-l-dm-i','ginkgo-boulevard','a quiet modern boulevard lined with golden ginkgo trees and pale limestone offices, warm early autumn light'],
 ['byd/qin-plus','library-forecourt','a civic library forecourt with tall terracotta fins, cool pale stone pavement and broad green planting beds; bright overcast daylight'],
 ['toyota/corolla-cross','garden-house','a modern residential garden entrance with honey-coloured stone, natural cedar, clipped green hedges and a wide clean driveway'],
 ['toyota/bz3x','teal-science-campus','a clean contemporary science campus with teal-glazed facade panels, pale concrete arcades and young landscaped trees; crisp daylight'],
 ['volkswagen/tayron','red-sandstone-campus','a low contemporary campus in red sandstone, slender pine trees and textured warm grey paving; soft afternoon light'],
 ['volkswagen/t-roc','ochre-cafe-street','a calm European-style side street with ochre plaster facades, dark green shutters and restrained cafe planters; clear daylight without people'],
 ['volkswagen/tharu','timber-sports-pavilion','a modern timber sports pavilion with a muted forest-green metal roof and landscaped grass beyond a clean asphalt forecourt'],
 ['volkswagen/teramont','ochre-canyon-road','a wide paved roadside turnout in an arid ochre canyon, horizontal red rock strata and a clear pale blue sky; no mountains or lake'],
 ['geely/xingyue-l','stone-estate','a refined stone courtyard outside a low country estate with russet tile roofs, sculpted greenery and warm light'],
 ['geely/binyue','turquoise-urban-square','a small contemporary urban square with turquoise ceramic walls, sand-coloured paving and a few flowering shrubs; bright clean daylight'],
 ['jetour/x70l','vineyard-winery','a quiet winery forecourt with warm brick, cedar doors and orderly green vineyard rows in the background; gentle afternoon sun'],
 ['jetour/x70-plus','terracotta-holiday-home','a relaxed contemporary holiday-home driveway with terracotta walls, slender palms and pale patterned stone paving'],
 ['jetour/x90-plus','equestrian-courtyard','a spacious country courtyard beside a redbrick and dark-timber pavilion, green fields beyond and crisp morning light; no horses or people'],
 ['jetour/dashing','yellow-modernist-building','a restrained mustard-yellow modernist building with deep shadowed recesses, dark steel frames and clean concrete paving'],
 ['jetour/ziyouzhe','sage-desert-lodge','a quiet desert lodge entrance with sage-green stucco, stone walls and sparse dry grasses, warm sand tones and pale sky'],
 ['fangchengbao/bao-8','rugged-pine-lodge','a stone and dark cedar lodge forecourt with tall pine trees and warm late-afternoon highlights, clean packed gravel; no lake or mountains'],
 ['fangchengbao/tai-3','creative-industrial-yard','a refurbished industrial creative courtyard with rust-red corrugated steel, charcoal brick and sculptural green plants; clean daylight'],
 ['fangchengbao/tai-7','clay-visitor-centre','a low clay-coloured visitor centre with deep red rammed-earth walls, broad steps and hardy green shrubs beside a paved approach'],
 ['byd/sea-lion-05-dm-i','bougainvillea-villa','a pale limestone villa driveway with restrained magenta bougainvillea, dark green gates and clear summer daylight'],
 ['byd/sea-lion-06-dm-i','brick-riverside-warehouse','a converted riverside warehouse with deep red brick, large olive-green doors and sunlit paving, a narrow glimpse of calm water beyond'],
 ['byd/yuan-up','mint-community-centre','a compact neighbourhood community centre with mint-green glazed tiles, terracotta pots and pale paving; friendly bright daylight'],
 ['byd/tang-dm-i','cedar-wellness-retreat','a quiet contemporary wellness retreat entrance with amber cedar cladding, bronze glass and a landscaped courtyard of green ferns'],
 ['byd/tang-l','stone-opera-plaza','a spacious modern performing-arts plaza with rose-tinted stone, deep bronze window frames and a single green tree; crisp afternoon light'],
 ['byd/song-l','violet-contemporary-gallery','a contemporary gallery courtyard with muted aubergine metal panels, warm travertine walls and a low planter of sage-green grasses'],
 ['byd/song-pro-dm-i','orchard-courtyard','a sunny orchard visitor courtyard with honey-coloured brick walls, dark red doors and leafy fruit trees beyond clean warm paving'],
 ['deepal/s05','cobalt-tram-depot','a carefully renovated old tram depot with cobalt-blue steel doors, warm brick and arched windows, clean pale concrete apron; no rails or vehicles'],
 ['deepal/s07','bronze-office-campus','a sculptural office campus with bronze metal fins, dark blue glass and restrained green landscaping; clear side-lit afternoon'],
 ['livan/x3-pro','ochre-market-square','a small quiet market square with warm ochre arcades, muted red shop shutters and olive trees; clean morning light, no stalls or people'],
 ['livan/7','brick-loft-courtyard','a sophisticated brick loft courtyard with deep blue painted doors, climbing green vines and light grey cobbles; soft daylight'],
 ['livan/9','cedar-residential-lane','a modern family residential lane with natural cedar facades, a dark olive garage door, flowering trees and warm grey paving'],
 ['changan/x5-plus','crimson-design-studio','a restrained architectural design studio with crimson ceramic cladding, pale exposed concrete and small green shrubs; bright afternoon light'],
 ['changan/uni-k','olive-art-museum','a contemporary art museum facade of olive-green patinated metal and cream stone, sculptural shadows across a clean plaza'],
 ['changan/uni-z','sunset-business-court','a clean business courtyard with burnt-orange brick, dark bronze glazing and a few green trees; warm soft sunset, natural colours'],
 ['changan/cs55-plus','rose-stone-neighbourhood','a quiet rose-beige stone residential street with blue-grey timber shutters and small street trees; soft spring daylight'],
 ['changan/cs75-plus','timber-campus-courtyard','a broad technology-campus courtyard with reddish timber slats, muted teal glazing and clean sandstone paving; balanced daylight'],
 ['changan/cs75','terracotta-botanical-gate','a botanical park entrance with terracotta stone walls, a dark green gate and mature shade trees; a clean sunlit paved forecourt'],
 ['changan-qiyuan/q05','blue-grey-resort','a restrained coastal resort entrance with blue-grey stucco, warm timber screens, a few palms and pale paving; no sea or mountain panorama'],
 ['changan-qiyuan/q07','sandstone-urban-garden','a contemporary urban garden courtyard with warm sandstone walls, a dark teal pavilion and carefully composed green planting; fresh morning light']
];
const pending=rows.filter(row=>!row.scene);
if(pending.length!==47||plans.length!==47)throw new Error('Re-inventory before proceeding.');
const jobs=pending.map(row=>{
 const plan=plans.find(p=>p[0]===row.key);if(!plan)throw new Error('Missing scene '+row.key);
 const original=row.key==='byd/yuan-up'?'/images/catalog/byd/yuan-up/byd-yuan-up-front-three-quarter-01.webp':row.photo.src;
 const reference=path.resolve('public',original.slice(1)).replaceAll('\\','/');
 const prompt=`Use case: precise-object-edit. Asset: one photorealistic automotive catalogue image, 4:3 landscape. The input photograph is the EXACT ${row.name} to preserve, including its original body paint, silhouette, wheel design, lamps, grille, factory badges and camera angle. Change only the white studio surroundings into ${plan[2]}. Keep the car facing LEFT: front bumper on the LEFT, rear on the RIGHT, matching the source view; do not mirror letters or badges and do not rotate the vehicle to face the viewer. Match the existing warm, natural editorial automotive photography of a professional B2B website. CONSISTENT FRAMING: complete car centred horizontally, outer bumper-to-bumper width exactly about 80% of the image (10% clear margin each side), tyre contact baseline at 82% image height, all tyres and mirrors uncut; retain this standard even for tall SUVs or low sedans. Preserve natural body proportions with a 55mm-equivalent lens and realistic reflections, tyre contact and grounded shadows. Empty, believable location with restrained architectural colour and planting; no other vehicles, people, company premises claims, sales signs, watermarks, UI or text. Keep factory emblem shape unchanged; plate should be plain neutral without KEEYAK text. No mountains-and-lake backdrop. This is an illustrative scene, not inventory or delivery evidence. Output one finished photograph, no collage or border.`;
 return {key:row.key,name:row.name,id:row.key.replaceAll('/','-')+'-'+plan[1],reference,original,scene:plan[2],prompt,status:'pending'};
});
await writeFile(path.join(folder,'source-inventory.json'),JSON.stringify(rows,null,2)+'\n');
await writeFile(manifestPath,JSON.stringify({date:'2026-10-21',workflow:'draw-ui asset workflow / built-in ImageGen',checkpoint:'D:/keeyak/keeyakauto/checkpoints/catalog-full-colour-20261021/src',framing:{aspect:'4:3',bodyWidth:.80,tyreBaseline:.82},jobs},null,2)+'\n');
console.log(JSON.stringify({total:rows.length,existingScenes:rows.filter(r=>r.scene).length,toGenerate:jobs.length,manifestPath}));
