-- Seed base profiles/roles

INSERT INTO "Profile" ("profileName", "createdAt", "updatedAt")
VALUES
  ('admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('user', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("profileName") DO NOTHING;

