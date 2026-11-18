import {restoreDraft,type InquiryDraft} from './inquiry';

export const INQUIRY_RECEIPT_KEY='keeyak.inquiry-receipt.v1';
type InquiryReceipt={version:1;id:string;at:number;signature:string};

async function draftSignature(draft:InquiryDraft){
  // Normalisation survives restored row IDs without copying contact details into the receipt.
  const content=JSON.stringify(restoreDraft(draft)??draft);
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(content));
  return [...new Uint8Array(digest)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
}

export async function createInquiryReceipt(id:string,draft:InquiryDraft):Promise<InquiryReceipt>{
  return {version:1,id,at:Date.now(),signature:await draftSignature(draft)};
}

export async function restoreInquiryReceipt(value:unknown,draft:InquiryDraft):Promise<InquiryReceipt|null>{
  if(!value||typeof value!=='object')return null;
  const receipt=value as Partial<InquiryReceipt>;
  if(receipt.version!==1||typeof receipt.id!=='string'||!receipt.id.trim()||receipt.id.length>128
    ||typeof receipt.at!=='number'||!Number.isFinite(receipt.at)||receipt.at<=0||receipt.at>Date.now()+60000
    ||typeof receipt.signature!=='string'||!/^[a-f0-9]{64}$/.test(receipt.signature))return null;
  return receipt.signature===await draftSignature(draft)?receipt as InquiryReceipt:null;
}
