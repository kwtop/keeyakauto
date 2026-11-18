import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('..');
const folder=path.join(root,'docs/nest-site-20261019');
const target=path.join(folder,'REVIEW-CATALOG.json');
const review=JSON.parse(fs.readFileSync(target,'utf8'));
const assigned=JSON.parse(fs.readFileSync(path.join(folder,'REVIEW-CATALOG-ASSIGNMENT.json'),'utf8'));
review.scope={formalCatalogUrls:98,thisReviewer:66,delegatedReviewer:assigned.reviewer,delegatedUrls:assigned.urls,ownUnreviewed:66-review.pages.length};
review.limitations=[
 'Quality rubric scores are subjective independent assessments, not measured Nest fidelity percentages.',
 'New live Nest full-page screenshots and computed styles could not be obtained in this session; the source-access gap remains.',
 'All 66 entries were individually viewed at 1440 and 390 using the exact segmented screenshot paths stored per record. Shared footer is excluded from these panels, and full original captures remain linked.',
 `After-phase captures are retained for pages whose main content was unchanged; ${review.pages.filter(p=>p.evidenceStage==='final').length} affected URLs were re-reviewed from final captures after the grid/image and final wording fixes.`,
 'Visible content, photograph composition and operative labels were reviewed per page; not every filter, gallery or inquiry action was clicked separately per URL. Parent project interaction tests remain a separate evidence set.',
 'Model years, trim names and listed engine designations were read as project source data, not independently certified against manufacturers; unknown configurations remain explicitly unknown.'
];
fs.writeFileSync(target,JSON.stringify(review,null,2)+'\n');
const link=(file,label)=>`[${label}](../../${file})`;
const rows=review.pages.sort((a,b)=>a.url.localeCompare(b.url)).map(p=>{
 const scoreKeys=Object.keys(review.rubric);
 const screenshots=p.screenshots.map((file,i)=>link(file,i===0?'1440全页':'390全页')).join(' · ');
 const panels=p.viewedPanels.map((panel,i)=>link(panel.file,`${panel.viewport}-${i+1}`)).join(' · ');
 return `| ${p.url} | ${p.evidenceStage} | ${scoreKeys.map(k=>p.scores[k]).join(' / ')} | **${p.total}** | ${p.captureChecks.moduleCount} / ${p.captureChecks.uniqueImages} | ${p.observations.join('；').replaceAll('|','/')} | ${p.issues.length?p.issues.map(i=>`${i.severity}: ${i.detail}`).join('；'):'无阻断问题'} | ${screenshots}<br>${panels} |`;
});
const history=review.pages.filter(p=>p.history?.length).map(p=>`- ${p.url}: ${p.history.map(h=>`${h.evidenceStage} ${h.total} 分${h.pass?'':'（不通过）'}`).join(' → ')} → final **${p.total} 分**。${p.observations[0]}`);
const md=`# 目录、品牌与车型页独立交叉评审\n\n日期：2026-10-19。评审者负责公司/联系批次，没有编写这里的目录/车型页面；未采用目录作者的评分。\n\n本文件覆盖本评审者实际看过的 **66 个 URL × 桌面/手机**，当前 66 个达 85 分门槛。另 32 个 URL 由独立出口页评审者处理，明确列表见 [分工清单](REVIEW-CATALOG-ASSIGNMENT.json)，本文件不冒称已经看过其页面。合并时须保留各自评审来源。\n\n## 评分和实际查看方式\n\n结构与层级25、字体与留白20、图片构图20、采购信息与信任20、手机/操作可读性15，总分100，门槛85。此分数是主观页面质量门槛，不是 Nest 还原度百分比。\n\n每个记录均实际查看1440px桌面截图的可读分段板（900px单片宽度、对应0.625显示比例），及390px手机截图的原像素分段板，覆盖该 URL 全部 main 内容。没有用极小全页缩略图替代逐页查看。每张板保留来源和 CSS y 范围；完整原截图也有链接。全站公共 Footer 由主 Agent 另审，不在本分段板范围。\n\n逐页截图有两个明确阶段：after 是首个完整构建采集；final 为修正后最终构建采集。未改的 main 内容沿用实际看过的 after；BYD目录、SeaLion06详情、Changan/Fangchengbao/Livan目录已用final双端重新完整查看。\n\n## 阻断修正与复评历史\n\n${history.join('\n')}\n\nSeaLion06另实际并看原始 [05.jpg](../../workspace/public/images/catalog/byd/sea-lion-06-dm-i/05.jpg) 和 [背景适配图](../../workspace/public/images/nest-site-20261019/sea-lion-06-dm-i-studio.webp)：未观察到轮毂分支、灯轮廓、可见侧门把、车顶行李架/窗框和整体轴距关系的明显重要变化。反射/明暗有变化；不是像素保真或配置验证。原图入口和 AI 背景说明在最终页常显，侧后实图仍保留。\n\n## 逐 URL 记录\n\n分项依次为结构/字体留白/图片/采购信任/手机。模块与图片数量来自对应真实 capture DOM，图片为不同引用计数，不将缩略图重复计数。\n\n| URL | 证据阶段 | 分项 | 总分 | 模块 / 不同图片 | 实际观察 | 保留问题 | 实际查看截图 |\n|---|---|---|---|---|---|---|---|\n${rows.join('\n')}\n\n## 未验证和待补\n\n${review.limitations.map(x=>`- ${x}`).join('\n')}\n- MG7和Han L缺少确切版本/动力等资料，多数车型还缺确认后的转向与座位。页面保持明确待确认，不靠推断补值。\n- 少量手机相关车型DM-i的i孤行、X5 PLUS/Xingyue L/X70L等首图主体尺度略小、部分黑车侧照偏暗，已逐页作为非阻断问题记录，没有为过线删除问题。\n- 无部署、无真实询盘发送、无外部业务状态变更。\n`;
const finalWording='最终小修又完整查看了 SeaLion05、SeaLion06、Seal06、SongPro、TangDM-i、Bao5、Bao8 和长品牌标题 A06 的双端 final 分段图。Request your 冠词和DM-i整词换行均正常；旧孤立i问题已经修复，没有为了记录这次小修抬高原分。其余原始车辆信息、图库和采购条件保持。';
review.finalRefinementReview={urls:['/new-cars/byd/sea-lion-05-dm-i/','/new-cars/byd/sea-lion-06-dm-i/','/new-cars/byd/seal-06-dm-i/','/new-cars/byd/song-pro-dm-i/','/new-cars/byd/tang-dm-i/','/new-cars/fangchengbao/bao-5/','/new-cars/fangchengbao/bao-8/','/new-cars/changan-qiyuan/a06/'],status:'manually-rechecked-final-desktop-and-mobile',summary:finalWording};
fs.writeFileSync(target,JSON.stringify(review,null,2)+'\n');
const currentMd=md.replace('## 逐 URL 记录',`${finalWording}\n\n## 逐 URL 记录`).replace('少量手机相关车型DM-i的i孤行、X5 PLUS/Xingyue L/X70L等首图主体尺度略小、部分黑车侧照偏暗，已逐页作为非阻断问题记录，没有为过线删除问题。','手机相关车型DM-i孤立i已复核修复。X5 PLUS/Xingyue L/X70L等首图主体尺度略小、部分黑车侧照偏暗仍作为非阻断问题逐页记录，没有为过线删除问题。');
fs.writeFileSync(path.join(folder,'REVIEW-CATALOG.md'),currentMd);
console.log(JSON.stringify({reviewed:review.pages.length,passed:review.pages.filter(p=>p.pass).length,finalReviewed:review.pages.filter(p=>p.evidenceStage==='final').length,delegated:assigned.urls.length,historyEntries:history.length}));
