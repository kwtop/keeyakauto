import type {D1Database} from '@cloudflare/workers-types';
export interface Env {
  DB:D1Database;
  APP_ENV?:string;
  AUTH_MODE?:string;
  ADMIN_USERNAME?:string;
  ADMIN_PASSWORD_HASH?:string;
  PRIVACY_SALT?:string;
  CF_ACCESS_TEAM_DOMAIN?:string;
  CF_ACCESS_AUD?:string;
  ADMIN_EMAILS?:string;
  TURNSTILE_SITE_KEY?:string;
  TURNSTILE_SECRET_KEY?:string;
  SITE_ORIGINS?:string;
  INTERNAL_IPS?:string;
}
export interface SessionRow {
  id:string;visitor_id:string;started_at:number;last_seen:number;landing_page:string;
  source:string;medium:string;campaign:string;referrer_host:string;country:string;
  device:string;language:string;is_returning:number;is_test:number;
}
export interface InquiryRow {
  id:string;idempotency_key:string;fingerprint:string;created_at:number;updated_at:number;
  version:number;name:string;company:string;email:string;phone:string;country:string;
  requirements:string;draft_json:string;products_json:string;page:string;language:string;
  source:string;referrer_host:string;visit_country:string;visitor_id:string|null;session_id:string|null;
  status:'pending'|'following'|'completed'|'spam';is_read:number;is_test:number;
}
