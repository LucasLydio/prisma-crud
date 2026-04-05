-- Rename Task fields from PT-BR to EN

ALTER TABLE "Task" DROP CONSTRAINT IF EXISTS "Task_usuarioId_fkey";
DROP INDEX IF EXISTS "Task_usuarioId_idx";

ALTER TABLE "Task" RENAME COLUMN "titulo" TO "title";
ALTER TABLE "Task" RENAME COLUMN "concluida" TO "done";
ALTER TABLE "Task" RENAME COLUMN "usuarioId" TO "userId";

CREATE INDEX "Task_userId_idx" ON "Task"("userId");

ALTER TABLE "Task"
ADD CONSTRAINT "Task_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

