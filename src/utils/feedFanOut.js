import { prisma } from "../configs/prisma.js"

export async function handleFanout({ postId, authorId, createdAt }){

    const followers = await prisma.follows.findMany({
        where: { followeeId: authorId },
        select: { followerId: true }
    });

    const userIds = [ authorId, ...followers.map(f => f.followerId) ];

    const BATCH_SIZE = 1000;

    for (let i = 0; i < userIds.length; i += BATCH_SIZE) {
        const batch = userIds.slice(i, i + BATCH_SIZE);

        await prisma.feed.createMany({
            data: batch.map(userId => ({
                userId,
                postId,
                postCreatedAt: createdAt,
                authorId
            })),
            skipDuplicates: true
        });
    }

}