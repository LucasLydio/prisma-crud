-- Seed initial admin user
-- NOTE: password is stored as plain text here because hashing is handled at the application layer.

INSERT INTO "User" ("name", "email", "password", "profileId", "createdAt", "updatedAt")
SELECT
  'user',
  'user@user.com',
  'user1234',
  p."id",
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Profile" p
WHERE p."profileName" = 'admin'
ON CONFLICT ("email") DO NOTHING;

