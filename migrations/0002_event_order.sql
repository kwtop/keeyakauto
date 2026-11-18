ALTER TABLE events ADD COLUMN received_order INTEGER NOT NULL DEFAULT 0;
UPDATE events SET received_order=rowid;
