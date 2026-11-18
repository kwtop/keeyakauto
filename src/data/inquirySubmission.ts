export class InquirySubmissionError extends Error{
 constructor(message:string,public code:'network'|'server'|'spam_check'){super(message);}
}

/** Only a confirmed saved record is a successful submission. */
export async function postInquiry(payload:Record<string,unknown>,request:typeof fetch=fetch):Promise<string>{
 let response:Response;
 try{
  response=await request('/api/inquiries/',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',signal:AbortSignal.timeout(25000),body:JSON.stringify(payload)});
 }catch{
  throw new InquirySubmissionError('We could not confirm whether your inquiry was received. Try sending again; your draft is still here.','network');
 }
 const code=response.status===422?'spam_check':'server';
 let result:{saved?:unknown;id?:unknown;error?:unknown};
 try{result=await response.json();}catch{
  throw new InquirySubmissionError('We could not confirm whether your inquiry was received. Try sending again; your draft is still here.',code);
 }
 if(!response.ok||result?.saved!==true||typeof result.id!=='string'||!result.id.trim()||result.id.length>128)throw new InquirySubmissionError(typeof result?.error==='string'?result.error:'Your inquiry could not be saved. Please retry.',code);
 return result.id;
}
