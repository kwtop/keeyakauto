-- Visitor lookup, timeline cursor and all-date follow-up queries.
CREATE INDEX IF NOT EXISTS idx_inquiries_visitor_time ON inquiries(visitor_id, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status_time ON inquiries(status, created_at, id);
CREATE INDEX IF NOT EXISTS idx_events_visitor_order ON events(visitor_id, created_at DESC, received_order DESC, id DESC);
