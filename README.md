> 2026-10-13 已将用户确认的首页风格扩展到内页：减少小字与重复，统一卡片、表格、服务、公司和询价布局，保留原车型资料和功能。最新本地开发预览为 [4400](http://127.0.0.1:4400/)，本轮证据见 [内页精修验证](design-exploration/interior-refinement-20261013/REVIEW.md)。本次没有生产构建、部署或真实发送。已确认首页的前轮记录见 [首页精修验证](design-exploration/home-refinement-20261013/REVIEW.md)。

> 此前在 2026-10-13 补齐 About Us 的 Company Profile、Team & Office、Company Documents 与采购指南页脚章节入口，并生成过构建。该历史构建未包含当前参考图调整；真实资料来源见 [补充记录](docs/ABOUT_FOOTER_REVIEW_20261013.md)。

# KEEYAK AUTO — 参考图方向全站设计

> 2026-10-13 已按确认的 [页面内容蓝图](docs/PAGE_MODULE_BLUEPRINT_20261013.md) 实施本站内容闭环：保留六个一级导航，新增 Customer & Company Records、News & Updates 和四篇真实活动记录；采购文件与售后直接进入指南章节。分类、品牌与70个车型参考页补齐选型、图片、已知参数及采购核查入口，车型到询价携带动力、版本和来源，目录返回保留筛选。企业内容在本站阅读，主站作为出处。20张企业原图与3张 Imagegen 处理图的网页副本见 `src/data/site-media.json`，原件与提示词保留。当前保持预览索引保护，没有部署或真实发送。

当前版本学习用户参考图的居中摄影首屏、图文流程和黑色页脚，使用本地 DM Sans 常规标题、圆角按钮与完整车型照片。用户追加批注后，首屏车型入口条及四个数字卡片已删除。首页第二个板块展示三个真实车型参考，保留新车/二手切换及品牌/车身筛选，完整目录继承当前筛选；随后为三步采购图文、两张摄影阅读入口与询价。视觉规则见 [DESIGN.md](../DESIGN.md)，页面任务依据 [网站最终规划 V2](../KEEYAK_AUTO_网站最终规划_V2.docx)。技术栈保留 Astro + React：Astro 输出主要内容与路由，React 负责目录筛选、版本与图库交互、询价草稿。

## 本地运行

公开页面的 `Accept: text/markdown` 内容协商已加入 Pages Functions，构建时与 HTML 同源生成；默认浏览器响应保持 HTML。构建、测试及发布所需文件见 [Markdown 内容协商](docs/MARKDOWN_NEGOTIATION.md)。此功能需使用下面文档中的 Pages 本地预览验证，Astro 单独运行不会执行 Functions。

在 `D:\keeyak\keeyakauto\workspace` 执行：

```powershell
npm install
$env:NODE_ENV = 'development'
npm run dev -- --port 4400
```

打开 [http://127.0.0.1:4400/](http://127.0.0.1:4400/)。Windows 开发服务显式设置 `NODE_ENV=development`，避免既有生产环境变量影响 React 开发运行时。检查与静态构建：

```powershell
npm run check
npm run build
npm run preview -- --port 4398
```

构建输出在 `dist/`；preview 用于查看已构建结果。目录内容变化后需重新构建，不将构建时间当作库存或技术参数核实日期。

当前使用 [http://127.0.0.1:4400/](http://127.0.0.1:4400/) 审查内页与已选首页，证据以[本轮精修验证](design-exploration/interior-refinement-20261013/REVIEW.md)及开发服务的新截图为准；不将历史构建当作当前验收。历史构建与资料见 [构建与资料 QA](docs/CATALOG_QA_20261012.md)，设计历史见 [浏览器与设计 QA](design-qa.md)，此前 About 与页脚补充见 [补充记录](docs/ABOUT_FOOTER_REVIEW_20261013.md)。

## 页面与内容

主导航按 Word 规划保留 Home、New Cars、Used Cars、Export Services、About Us、Contact Us，右侧统一进入 Request a Quote。

- 新车总览、品牌、车型与静态分页由同一目录数据生成；原图、参数来源和版本标识随车型保留。
- 二手车总览与详情承接车型寻车请求，没有伪装成真实库存或单车检测报告。
- 出口服务包含采购、检测、运输说明；完整交易流程集中在 [Buying Guide](src/data/editorial.ts)，涵盖目的国核实、报价、付款、文件、售后与 FAQ。
- 公司与联系页保留现有 KEEYAK 企业主体、杭州办公与官方联系信息，并明确已有特种车背景材料的范围。
- About Us 的团队页展示官网已公开的两张公司活动照片；文件页展示对应企业主体的供应商评估证书及纸面日期，保留原图。企业背景材料不作为乘用车负责人指派、库存、交付或汽车进出口资格证明。
- 页脚直接进入采购指南的报价、付款、目的国核查、售后和 FAQ 章节；保留完整服务和企业资料入口。
- Privacy、Website Terms、404 与询价草稿确认页已提供。缺少真实材料的 Customer Deliveries、News 和逐国家指南没有生成公开占位入口。
- 原 `/export/` 与 `/guides/` 地址仍可读取，并引导至新的采购帮助结构。此前设计探索保存在 `design-exploration/`，其记录属于历史提案，旧 `/design/` 预览不属于当前站点。

## 车辆资料

当前公开目录包含 **63 个新车车型、14 个新车品牌、377 张对应原始资料图片**，以及 **7 个历史二手车型参考、5 个二手品牌**。这是资料与车型数量，不是现货数量。

新车数据来自用户的 `参考资料/参数/独立站新车基本参数.xlsx` 和 `参考资料/独立站新车图片素材/`，于 2026-10-12 导入。源集合共有 64 个车型；BYD Sea Lion 07 DM-i 的图片与 SUV 记录不符，因此未进入公开目录。未标测试标准的续航数字和其他源表冲突没有被猜测或修正成公开事实。二手表为空，保留的 7 个二手参考来自原站第三方历史资料。

事实与图片映射见 [catalog.ts](src/data/catalog.ts)、[vehicle-source-data.json](src/data/vehicle-source-data.json)，源表差异、范围与导入命令见 [VEHICLE_DATA.md](docs/VEHICLE_DATA.md)。所有当前条目的供应状态未核实；网站没有真实 Stock ID、VIN、里程、报价、批次数量或交付记录。原始参考资料未修改。

## 图片与设计

车型原图与资料映射保留。网页仅采用比原文件更小的同尺寸WebP副本；383张源图片前后SHA256一致，131张较小副本被采用，净节省641,645字节。详见 [图片交付审计](docs/CATALOG_IMAGE_DELIVERY_20261012.md)。

既有概念图 `public/images/monumental/hero-coast.webp`（海岸匿名SUV）与 `body-detail.webp`（车门及后视镜局部）用于桌面首屏、流程及服务阅读，不作为车型或工厂证据。来源见 [既有图片记录](docs/IMAGE_PROVENANCE_MONUMENTAL_20261012.md)。手机沿用前轮竖幅概念图，原 PNG 和完整提示词见 [前轮图片来源](design-exploration/home-reference-20261013/IMAGE-PROVENANCE.md)。本次使用内置 image_gen 新增两张汽车/港口摄影，项目 PNG 与页面 WebP 存于 `public/images/home-refinement/`，完整提示词和用途见 [本轮图片来源](design-exploration/home-refinement-20261013/IMAGE-PROVENANCE.md)。

公司及服务资料中的真实档案来自KEEYAK特种车背景材料，保留原标牌，不推导乘用车工厂所有权、厂家授权、供应关系或交付结果。详见 [工厂来源审计](docs/FACTORY_SOURCE_AUDIT_20261012.md)。

## 询价流程与当前状态

统一询价支持多车型分别填写数量、目的国、一种有效联系方式及可选采购条件；车型链接可带入品牌、车型、版本和来源。草稿与准备好的需求快照保存在当前浏览器标签的 `sessionStorage`，并有清除操作。页面地址不包含姓名、联系方式或完整采购内容。

“准备需求”与确认页只表示简报已在浏览器中准备完成，不表示团队收到询价。用户可复制完整简报，或打开含简报的 Email / WhatsApp，再自行发送至 `contact@keeyak.com` 或 `+8617357146027`。当前没有后台接收、支付、库存预订或自动发送功能。

当前是本地设计与功能审查版本：页面保留 `noindex,nofollow`，`robots.txt` 禁止抓取。本轮没有部署。公开发布前需按真实业务确认乘用车供应、资料及图片使用范围、服务和合同条款、联系渠道与接收处理方式，再决定索引与发布范围。

