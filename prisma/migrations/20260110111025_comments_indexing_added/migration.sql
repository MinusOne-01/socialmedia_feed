-- DropIndex
DROP INDEX "Comments_postId_createdAt_idx";

-- CreateIndex
CREATE INDEX "Comments_postId_createdAt_id_idx" ON "Comments"("postId", "createdAt" DESC, "id" DESC);
