PRAGMA foreign_keys = ON;

CREATE TABLE visitors (
  id TEXT PRIMARY KEY,
  first_seen INTEGER NOT NULL,
  last_seen INTEGER NOT NULL
);
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  visitor_id TEXT NOT NULL REFERENCES visitors(id),
  started_at INTEGER NOT NULL,
  last_seen INTEGER NOT NULL,
  landing_page TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'unknown',
  medium TEXT NOT NULL DEFAULT 'unknown',
  campaign TEXT NOT NULL DEFAULT '',
  referrer_host TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT 'unknown',
  device TEXT NOT NULL DEFAULT 'unknown',
  language TEXT NOT NULL DEFAULT 'unknown',
  is_returning INTEGER NOT NULL DEFAULT 0,
  is_test INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX sessions_visitor_time ON sessions(visitor_id, started_at);

CREATE TABLE inquiries (
  id TEXT PRIMARY KEY,
  idempotency_key TEXT NOT NULL UNIQUE,
  fingerprint TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  requirements TEXT NOT NULL,
  draft_json TEXT NOT NULL,
  products_json TEXT NOT NULL,
  page TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'unknown',
  source TEXT NOT NULL DEFAULT 'unknown',
  referrer_host TEXT NOT NULL DEFAULT '',
  visit_country TEXT NOT NULL DEFAULT 'unknown',
  visitor_id TEXT REFERENCES visitors(id),
  session_id TEXT REFERENCES sessions(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','following','completed','spam')),
  is_read INTEGER NOT NULL DEFAULT 0,
  is_test INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX inquiries_created ON inquiries(created_at DESC);
CREATE INDEX inquiries_fingerprint ON inquiries(fingerprint, created_at);
CREATE INDEX inquiries_visitor ON inquiries(visitor_id, created_at);
CREATE INDEX inquiries_status ON inquiries(status, is_read, created_at);
CREATE TABLE inquiry_notes (
  id TEXT PRIMARY KEY,
  inquiry_id TEXT NOT NULL REFERENCES inquiries(id),
  created_at INTEGER NOT NULL,
  author TEXT NOT NULL,
  note TEXT NOT NULL
);
CREATE INDEX notes_inquiry ON inquiry_notes(inquiry_id, created_at);

CREATE TABLE events (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  name TEXT NOT NULL CHECK (name IN ('page_view','product_view','specifications_expand','gallery_view','download_click','inquiry_click','whatsapp_click','email_click','form_start','form_submit_failed','inquiry_saved')),
  page TEXT NOT NULL,
  product TEXT NOT NULL DEFAULT '',
  language TEXT NOT NULL DEFAULT 'unknown',
  position TEXT NOT NULL DEFAULT 'unknown',
  source TEXT NOT NULL DEFAULT 'unknown',
  country TEXT NOT NULL DEFAULT 'unknown',
  device TEXT NOT NULL DEFAULT 'unknown',
  visitor_id TEXT REFERENCES visitors(id),
  session_id TEXT REFERENCES sessions(id),
  inquiry_id TEXT REFERENCES inquiries(id),
  is_returning INTEGER NOT NULL DEFAULT 0,
  is_test INTEGER NOT NULL DEFAULT 0,
  failure_code TEXT NOT NULL DEFAULT ''
);
CREATE INDEX events_time_name ON events(created_at, name);
CREATE INDEX events_visitor_time ON events(visitor_id, created_at DESC);
CREATE INDEX events_filters ON events(source, country, language, created_at);
CREATE INDEX events_product ON events(product, created_at);

CREATE TABLE admin_sessions (
  token_hash TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE TABLE rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE TABLE admin_audit (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL
);
