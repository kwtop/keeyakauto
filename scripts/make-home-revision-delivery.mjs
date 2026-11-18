import {createRequire} from 'node:module';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(process.cwd(),'..'),doc=path.join(root,'docs/home-revision-20261019');
const json=async p=>JSON.parse((await readFile(path.join(root,p),'utf8')).replace(/^\uFEFF/,''));
const before=await json('docs/home-revision-20261019/BEFORE-CAPTURE.json');
const after=await json('docs/home-revision-20261019/AFTER-CAPTURE.json');
const qa=await json('docs/home-revision-20261019/QA.json');
const independent=await json('docs/home-revision-20261019/INDEPENDENT-REVIEW.json');
const changes=await json('docs/home-revision-20261019/SOURCE-CHANGES.json');
const originalPhotos=await json('docs/keeyak-source-home-20261019/IMAGE-INVENTORY.json');
const generated=await json('docs/home-revision-20261019/GENERATED-ASSETS.json');
const ledger=[];
for(const c of after.captures){
 const photos=c.images.filter(i=>!i.src.includes('/brands/'));
 ledger.push({url:'/',state:c.state,viewport:c.viewport,coreModules:c.modules.length,effectivePhotoCount:photos.length,brandLogoCount:c.images.length-photos.length,photoModules:4,moduleNames:c.modules.map(m=>m.name),overflow:c.overflow,brokenImages:c.images.filter(i=>!i.loaded).length,scriptErrors:c.errors,screenshot:c.screenshot,status:independent.accepted&&!c.overflow&&c.images.every(i=>i.loaded)&&!c.errors.length?'accepted':'needs review',visualReview:'Page-level independent review in INDEPENDENT-REVIEW.md; no inherited score'});
}
await writeFile(path.join(doc,'PAGE-ACCEPTANCE.json'),JSON.stringify({scope:'Homepage only; used state is new functionality',qa:{passed:qa.passed,total:qa.total},pageIndependentReview:{score:independent.total,threshold:independent.threshold,accepted:independent.accepted,reviewer:independent.reviewer},screens:ledger},null,2)+'\n');
const primary=after.captures.filter(c=>c.viewport.width===1440);
const modelPhotos=[...new Map(primary.flatMap(c=>c.images.filter(i=>/\/images\/(catalog\/|used-)/.test(i.src)).map(i=>[new URL(i.src).pathname,{file:new URL(i.src).pathname,alt:i.alt,treatment:'Original existing product reference retained; contain; no ImageGen edit',evidence:i.alt.includes('historical')?'historical third-party model reference':'existing supplied model reference'}]))).values()];
const evidence=[];
for(const a of originalPhotos.assets){
 const output=a.outputs[0],file=path.join(root,'workspace/public',output.path.replace(/^\//,''));
 const hash=createHash('sha256').update(await readFile(file)).digest('hex');
 evidence.push({file:output.path,sourcePage:a.sourcePage,sourceImage:a.sourceImage,date:a.date,treatment:'Retained original file, full source ratio, no ImageGen, no new colour or scene changes',sha256:hash,originalHashMatches:hash===output.sha256});
}
await writeFile(path.join(doc,'IMAGE-INVENTORY.json'),JSON.stringify({generatedTool:'built-in image_gen',generated,heroReference:'/images/nest-home-20261018/camry-courtyard.webp',heroMobile:'Existing original Camry scene retained at 3:2; generated wide image only on >=768px',facilityDisclosure:'AI-generated facility concept',modelPhotos,evidence,brandSources:'BRAND-SOURCES.json'},null,2)+'\n');
if(process.env.HOME_DELIVERY_SKIP_CAPTURE!=='1'){
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
try{
 for(const [name,width,viewport] of [['desktop',1440,{width:1600,height:760}],['mobile',390,{width:900,height:1100}]]){
  const page=await browser.newPage({viewport,deviceScaleFactor:1});
  await page.goto(`http://127.0.0.1:4350/?width=${width}&state=new&view=first&capture=1`,{waitUntil:'networkidle'});
  await page.locator('img').evaluateAll(async es=>Promise.all(es.map(i=>i.decode())));
  await page.screenshot({path:path.join(doc,`${name}-before-after.png`),fullPage:true});await page.close();
 }
 const shots=path.join(root,'checkpoints/home-revision-20261019/after');await mkdir(shots,{recursive:true});
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:4322/',{waitUntil:'networkidle'});
  for(const state of ['new','used']){
   await page.getByRole('tab',{name:state==='new'?'New Cars':'Used Cars',exact:true}).click();
   await page.locator(`[data-model-panel=${state}] img`).evaluateAll(async es=>{es.forEach(i=>i.loading='eager');await Promise.all(es.map(i=>i.decode()));});
   await page.locator('.nest-models').screenshot({path:path.join(shots,`models-${state}--${width}.png`),animations:'disabled'});
  }
  await page.close();
 }
}finally{await browser.close();}
}
const table=ledger.map(c=>`| ${c.viewport.width}×${c.viewport.height} | ${c.state==='new'?'新车':'二手（新增）'} | ${c.coreModules} | ${c.effectivePhotoCount} | ${c.brandLogoCount} | ${c.overflow?'溢出':'无溢出'} / ${c.brokenImages}断图 / ${c.scriptErrors.length}脚本错误 | [截图](../../${c.screenshot}) |`).join('\n');
const comparison=before.captures.map(b=>{const a=after.captures.find(c=>c.viewport.width===b.viewport.width&&c.state==='new');return`| ${b.viewport.width}px | ${b.pageHeight}px | ${a.pageHeight}px |`;}).join('\n');
const report=`# 首页交付 — 2026-10-19

已实施正式首页 /。保留现有白色/炭黑/暖沙色、KEEYAK标识、全导航及URL、车辆数据、真实证据和原询盘准备流程。仅本地构建和预览，**未部署生产**。独立视觉复评 **${independent.total}/100，通过${independent.threshold}分门槛**；评审者未编写本轮首页，详见 [INDEPENDENT-REVIEW.md](INDEPENDENT-REVIEW.md)，不继承旧首页评分。

## 预览与对照

- [新版首页](http://127.0.0.1:4322/)；[五档视口前后对照](http://127.0.0.1:4350/)。可切换完整页面/首屏及New/Used。二手状态为新增，改前始终展示原默认首页。
- [桌面前后对照](desktop-before-after.png)；[手机前后对照](mobile-before-after.png)。完整同视口原始截图在上方对照工具及下表，DPR1、100%缩放、同样完整滚读后采集。

## 最重要的改变

1. 原六职责长页收束为用户批准的五模块：Camry首屏→新/旧车型→工厂场景与采购准备→真实来访/洽谈→询盘。四个模块图文结合，询盘按任务组织。
2. 删除重复宣传行与巨大第二衬线副标题。Hero采用72/60/48/40px Georgia400和16–18px Inter，桌面留白在图内，手机文字在上、完整车身在下。
3. 原三张分类卡和横向车型轨道合为可切换网格。新车8款，二手7款按指定顺序，网格4/3/2列；车标使用10个官方原资源，6/5品牌随状态同步，车型年份/动力和历史参考边界保留。
4. 工厂图为明确AI概念，不用作自有工厂或库存证明；真实办公室合影与越南展会照片保持完整原画幅，桌面双图、手机单列。
5. 末尾表单保留车型/数量/目的国必填和GET参数，缩短标题与间距。独立运输图、重复采购说明、两组指南卡移出首页，其原页面与导航继续存在。

| 视口 | 改前全页高度 | 改后全页高度（新车） |
| --- | --- | --- |
${comparison}

## 逐状态验收

有效图片只计真实产品参考、场景和证据照片；Logo、社交图标、srcset重复版本不计。新车12张=8车型+Hero+工厂+2真实照片，二手11张=7车型+同4张。两种状态的隐藏面板不计入各自图片数。

| 视口 | 状态 | 核心模块 | 有效图片 | 品牌Logo | 实际渲染结果 | 原始整页图 |
| --- | --- | --- | --- | --- | --- | --- |
${table}

## 图片处理与来源

| 图位 | 决定与实际采用 | 原因与边界 |
| --- | --- | --- |
| 桌面Hero | 对原Camry庭院图使用ImageGen扩图，1983×793；交付960/1440/1983 WebP | 扩出左侧文字安全区，保留车型造型、轮毂、灯组、车牌；作为车型参考与说明性场景，不证明现货 |
| 手机Hero | 保留现有Camry庭院图3:2及原响应式版本 | 原图适合窄屏完整车身，避免宽图裁掉车辆 |
| 工厂场景 | ImageGen新生成1672×941横图，并基于它生成1448×1086手机版；各3档WebP | 为厂房与两排乘用车提供相同光线/色调的场景；明示“AI-generated facility concept”，非真实工厂 |
| 8新车/7二手 | 保留15张已有车型参考图，使用既有交付映射；contain完整显示 | 保留车型和历史来源，本轮不使用ImageGen重造实车角度、状态或配置 |
| 来访/洽谈 | 两张官网原始证据照片保留，原文件哈希均匹配；桌面16:9列宽配比让4:3与3:4源图等高 | 不修人物、品牌墙、目录或展台；越南仍标May2026/特种车讨论，办公室日期未知不补写 |
| 车标 | 10个官方资源本地保存：8SVG、2透明PNG | 不用ImageGen重画，不擅改色；BYD公开小图按约60px使用，Wuling为官方印尼站区域版本 |

生成3张全部实际采用；桌面Hero为原图编辑，工厂横图为新生成，工厂手机图为基于横图的重新构图。源文件与使用列表见 [IMAGE-INVENTORY.json](IMAGE-INVENTORY.json)，提示词见 [IMAGEGEN-PROMPTS.json](IMAGEGEN-PROMPTS.json)，官方标识来源见 [BRAND-SOURCES.md](BRAND-SOURCES.md)。

## 验证与剩余材料

- 本地静态构建140条既有输出成功；Astro check无错误/警告/hint，见 [CHECK.log](CHECK.log)。
- 静态预览上${qa.passed}/${qa.total}项浏览器检查通过，见 [QA.json](QA.json)：精确车型/品牌顺序与内链、键盘方向/Home/End、隐藏阻焦、切换高度稳定、五档网格、菜单/Escape、搜索、无横溢、输入校验及报价页预填。
- 空值、数量0和1.5均不允许；车型ToyotaCamry/数量3/目的国Vietnam真实GET跳转与报价页预填通过。未点击Email或WhatsApp发送；未测试真实询盘交付，原功能只准备简报。
- 首页title/description/robots不变，继续noindex,nofollow。本轮没有修改车辆/公司/服务数据、Header、Base、QuoteForm或路由源码。改前${changes.baselineCount}个src文件中${changes.unchangedCount}个哈希一致，5个已批准首页组件改变，新增3个文件，见 [SOURCE-CHANGES.json](SOURCE-CHANGES.json)。
- 仍需真实材料：乘用车厂房/仓储/备车实拍可在未来替换概念；办公室访客合影日期未确认；S450L仅有低清历史参考，不生成细节或声称当期库存。它们都已明确边界，不伪造补齐。
- 本轮不重新声称Nest像素级还原，不包含新的源站对照；按用户已确认的五模块方案实施与验收。

## 纠偏与回退

- 第1轮：完成五模块骨架、Hero与图位；修正768px继承旧grid导致说明挤窄，桌面首屏降低标题权重，手机保留完整车图。
- 第2轮：新旧标签与车标全部接入，4/3/2列、稳定panel高度、删除失去用途的轨道箭头；统一圆徽与细长字标视觉尺寸。
- 第3轮：滚读整页并等待图片decode后重采集。第2轮离屏产品图曾未被截图绘制，源图/DOM加载正常；这是截图条件问题，未误写成断图。最终截图和独立评审使用完整绘制的图。
- 独立评审后：限制320px细长品牌标识在各格内容宽度内，避免JETOUR与WULING靠得过近；工厂AI标签两端统一13px/18px。复核并重采集最终截图。
- 设计规范已更新 [DESIGN.md](../../DESIGN.md)，首页规则单列并覆盖历史首页规则；内页规则保留。备份为 checkpoints/home-revision-20261019/source-before/，原图片与生成原文件均保留，可按清单回退。
`;
await writeFile(path.join(doc,'DELIVERY.md'),report);
console.log(JSON.stringify({screens:ledger.length,coreModules:[...new Set(ledger.map(c=>c.coreModules))],modelPhotos:modelPhotos.length,evidenceHashesMatch:evidence.every(i=>i.originalHashMatches),qaPassed:qa.passed,qaTotal:qa.total,sourceChanged:changes.changed.length}));
