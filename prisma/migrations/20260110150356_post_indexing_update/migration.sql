-- DropIndex
DROP INDEX "Posts_userId_idx";

-- CreateIndex
CREATE INDEX "Posts_userId_createdAt_id_idx" ON "Posts"("userId", "createdAt" DESC, "id" DESC);
