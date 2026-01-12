-- CreateTable
CREATE TABLE "Feed" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "postCreatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("userId","postId","postCreatedAt")
);

-- CreateIndex
CREATE INDEX "Feed_userId_postCreatedAt_postId_idx" ON "Feed"("userId", "postCreatedAt" DESC, "postId" DESC);

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
