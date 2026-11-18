import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin='http://127.0.0.1:4322';
const folder=path.resolve('../checkpoints/nest-site-20261019/company-review-functions');
await mkdir(folder,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const results=[];
const assert=(value,message)=>{if(!value)throw Error(message);};
try{
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:width===1440?900:844},deviceScaleFactor:1});
  await context.route('**/*',r=>r.request().url().startsWith(origin)||r.request().url().startsWith('data:')?r.continue():r.abort());
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/about/',{waitUntil:'domcontentloaded'});
  const form=page.getByRole('form',{name:'Start a vehicle inquiry'});
  await form.getByLabel('Model',{exact:true}).fill('Toyota Camry');
  await form.getByLabel('Quantity',{exact:true}).fill('3');
  await form.getByLabel('Destination country',{exact:true}).fill('Kenya');
  await form.getByRole('button',{name:'Prepare an inquiry',exact:true}).click();
  await page.waitForURL(/\/quote\/\?/);
  await page.waitForFunction(()=>[...document.querySelectorAll('.quote-form input')].some(i=>i.value==='Toyota Camry'));
  assert(await page.getByLabel('Destination country *',{exact:true}).inputValue()==='Kenya','GET destination not restored');
  assert(await page.getByLabel('Quantity *',{exact:true}).inputValue()==='3','GET quantity not restored');
  await page.getByRole('button',{name:'Review inquiry',exact:true}).click();
  await page.getByRole('alert').waitFor();
  assert(await page.locator('[aria-invalid="true"]').count()>0,'Validation feedback missing');
  await page.getByLabel('Email',{exact:true}).fill('qa@example.invalid');
  await page.getByRole('button',{name:'Add another model',exact:true}).click();
  await page.getByLabel('Request type',{exact:true}).nth(1).selectOption('used-sourcing');
  await page.getByLabel('Model or vehicle requirement *',{exact:true}).nth(1).fill('Mercedes-Benz S450L');
  await page.getByLabel('Quantity *',{exact:true}).nth(1).fill('2');
  await page.getByLabel('Mileage requirement',{exact:true}).fill('Below 40000');
  await page.getByLabel('Condition requirement',{exact:true}).fill('No structural damage; actual evidence to review');
  await page.getByRole('button',{name:'Review inquiry',exact:true}).click();
  await page.getByRole('heading',{name:'Ready to share',exact:true}).waitFor();
  const share=page.locator('#quote-sharing');
  const email=await share.getByRole('link',{name:'Open in email',exact:true}).getAttribute('href');
  const whatsapp=await share.getByRole('link',{name:'Open in WhatsApp',exact:true}).getAttribute('href');
  assert(email.startsWith('mailto:contact@keeyak.com'),'Wrong email receiver');
  assert(decodeURIComponent(email).includes('Toyota Camry')&&decodeURIComponent(email).includes('Mercedes-Benz S450L'),'Prepared email lacks one model');
  assert(whatsapp.startsWith('https://wa.me/8617357146027?'),'Wrong WhatsApp receiver');
  assert(await page.locator('.quote-summary-vehicle').count()===2,'Two-model summary missing');
  await page.keyboard.press('Control+Home');await page.waitForTimeout(600);
  await page.screenshot({path:path.join(folder,`quote-populated-${width}.png`),fullPage:true});
  await share.getByRole('link',{name:'View prepared brief',exact:true}).click();
  await page.waitForURL('**/quote/thank-you/');
  await page.locator('.prepared-summary article').nth(1).waitFor();
  assert(await page.locator('.prepared-summary article').count()===2,'Prepared view lost models');
  assert((await page.locator('.nest-inquiry-heading').innerText()).includes('not been sent'),'Prepared notice missing');
  await page.reload({waitUntil:'domcontentloaded'});await page.locator('.prepared-summary article').nth(1).waitFor();
  await page.keyboard.press('Control+Home');await page.waitForTimeout(600);
  await page.screenshot({path:path.join(folder,`prepared-populated-${width}.png`),fullPage:true});
  await page.goto(origin+'/about/news/',{waitUntil:'domcontentloaded'});
  await page.getByRole('button',{name:'Team life',exact:true}).click();
  assert((await page.locator('.au-news-count').textContent())==='4 stories','Team filter count');
  assert(await page.locator('.au-news-feature').isHidden(),'Featured exhibition still shown for team');
  await page.getByRole('button',{name:'Exhibitions',exact:true}).click();
  assert((await page.locator('.au-news-count').textContent())==='4 stories','Exhibition filter count');
  assert(await page.locator('[data-news-group="team"]').isHidden(),'Team group still shown for exhibitions');
  await page.getByRole('button',{name:'All stories',exact:true}).click();
  assert((await page.locator('.au-news-count').textContent())==='8 stories','All filter count');
  const redirects=[];
  for(const [from,to,hash] of [['/about/team/','/about/','#team'],['/about/certifications/','/about/','#company-documents'],['/about/customer-records/','/about/news/','#company-archive']]){
   await page.goto(origin+from+'?qa=redirect-check',{waitUntil:'domcontentloaded'});await page.waitForURL(url=>url.pathname===to&&url.hash===hash);
   assert(new URL(page.url()).searchParams.get('qa')==='redirect-check','Redirect lost query');redirects.push({from,to:page.url()});
  }
  assert(errors.length===0,'Runtime errors: '+errors.join(';'));
  results.push({width,getHandoff:true,validation:true,twoModelUsedFields:true,preparedSummary:true,emailReceiver:true,whatsappReceiver:true,preparedReload:true,newsFilters:true,redirects,errors,sending:'Not exercised. No external channel opened and no inquiry sent.'});
  await context.close();console.log(JSON.stringify(results.at(-1)));
 }
 await writeFile(path.join(folder,'FUNCTIONS.json'),JSON.stringify({origin,checkedAt:new Date().toISOString(),results},null,2));
}finally{await browser.close();}

