import type {InquiryDraft} from '../../data/inquiry';
import type {InquiryRow} from '../../../server/types';
export type Inquiry=Omit<InquiryRow,'fingerprint'|'idempotency_key'|'draft_json'|'products_json'>&{draft:InquiryDraft;products:string[]};
export type InquiryPreview=Pick<Inquiry,'id'|'created_at'|'name'|'company'|'email'|'phone'|'country'|'status'|'is_read'|'is_test'|'source'>&{vehicles:Pick<InquiryDraft['vehicles'][number],'model'|'quantity'|'variant'>[]};
export interface Note{id:string;created_at:number;author:string;note:string;}
export interface InquiryDetail{inquiry:Inquiry;notes:Note[];}
export interface PageResult<T>{rows:T[];total:number;page:number;pageSize:number;counts?:Record<string,number>;summary?:Record<string,number>;}
export interface Visitor{id:string;first_seen:number;last_seen:number;visits:number;pageviews:number;country:string;source:string;device:string;language:string;inquiries:number;is_test:number;contacts:number;whatsapp_clicks:number;email_clicks:number;last_page:string;customer_name:string;customer_company:string;}
export interface TimelineEvent{id:string;created_at:number;name:string;page:string;product:string;language:string;position:string;source:string;country:string;device:string;inquiry_id:string|null;session_id?:string|null;is_test:number;failure_code:string;}
export type Activity=Omit<TimelineEvent,'device'|'failure_code'>&{visitor_id:string|null};
export interface VisitorDetail{visitor:Pick<Visitor,'id'|'first_seen'|'last_seen'>;customer:Pick<Inquiry,'name'|'company'|'email'|'phone'>|null;summary:Record<string,number>;events:TimelineEvent[];inquiries:Pick<Inquiry,'id'|'created_at'|'name'|'company'|'status'>[];sessions:{session_id:string;first_at:number;last_at:number;started_at:number;pageviews:number;events:number}[];hasMore:boolean;nextBefore:string|null;}
export interface DailyTraffic{date:string;visitors:number;pageviews:number;anonymousPageviews:number;}
export interface Insights{range:{from:string;to:string;previousStart:number;previousEnd:number};current:Record<string,number>;previous:Record<string,number>;trend:Array<Record<string,unknown>&{label:string;at:number;previous:Record<string,number>}>;daily:DailyTraffic[];breakdowns:Record<string,Array<{value:string;views:number;visitors:number}>>;queue:{counts:Record<string,number>;items:InquiryPreview[]};observedAt:number;granularity:'hour'|'day';}
