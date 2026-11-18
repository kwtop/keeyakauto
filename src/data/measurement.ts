export const clientEvents = [
  'page_view', 'product_view', 'specifications_expand', 'gallery_view',
  'download_click', 'inquiry_click', 'whatsapp_click', 'email_click',
  'form_start', 'form_submit_failed'
] as const;
export type ClientEvent = typeof clientEvents[number];
export const anonymousEvents: ReadonlySet<ClientEvent> = new Set([
  'page_view', 'product_view', 'whatsapp_click', 'email_click', 'inquiry_click',
]);
export function contactEvent(href:string):'whatsapp_click'|'email_click'|null{
  if(/^mailto:/i.test(href))return 'email_click';
  try{const url=new URL(href);if(url.protocol==='whatsapp:'||(['http:','https:'].includes(url.protocol)&&['wa.me','api.whatsapp.com','web.whatsapp.com'].includes(url.hostname.toLowerCase())))return 'whatsapp_click';}catch{}
  return null;
}
export const statuses = {pending:'待处理',following:'跟进中',completed:'已完成',spam:'垃圾询盘'} as const;
export type InquiryStatus = keyof typeof statuses;
export const eventLabels:Record<string,string> = {
  page_view:'访问页面',product_view:'查看产品',specifications_expand:'查看参数',
  gallery_view:'查看图片',download_click:'点击资料下载',inquiry_click:'点击询价',
  whatsapp_click:'点击 WhatsApp',email_click:'点击邮箱',form_start:'开始填写表单',
  form_submit_failed:'表单提交失败',inquiry_saved:'询盘已保存'
};
export function productPath(value:unknown):string {
  if(typeof value!=='string')return '';
  const path=value.split(/[?#]/)[0];
  return /^\/(?:new-cars|used-cars)\/[a-z0-9-]{1,80}\/[a-z0-9-]{1,100}\/$/.test(path)&&!path.includes('/page/')?path:'';
}
export function pagePath(value:unknown):string {
  if(typeof value!=='string')return '/';
  const path=value.split(/[?#]/)[0];
  return path.startsWith('/')&&!path.startsWith('//')&&path.length<=300&&!/[\s<>\\]/.test(path)?path:'/';
}
