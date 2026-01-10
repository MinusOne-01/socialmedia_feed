import { prisma } from "../../configs/prisma.js";

export async function createPost_db( userId, content ){

    return await prisma.posts.create({
        data: {
            userId,
            content
        }
    });
}

export async function getPostInfo_db( postId, userId ) {

    return await prisma.posts.findUnique({
        where: { id: postId },
        include: {
            postComments: {
                take: 20,
                orderBy: { createdAt: 'desc' },
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true
                        }
                    }
                },
            },
            // Spread operator ensures postLikes is only added to the object if userId exists
            ...(userId && {
                postLikes: {
                    where: { userId },
                    select: { userId: true },
                }
            }),
            _count: {
                select: {
                    postLikes: true,
                    postComments: true // Added this for your "stats" requirement
                },
            },
        },
    });
}


export async function getPostComments_db( postId, cursor ) {

    return await prisma.posts.findUnique({
        where: { id: postId },
        include: {
            postComments: {
                take: 20,
                orderBy: [
                    { createdAt: 'desc' },
                    { id: 'desc' }
                ],
                ...(cursor && {
                    where: {
                        OR: [
                            { createdAt: { lt: cursor.createdAt } },
                            {
                                createdAt: cursor.createdAt,
                                id: { lt: cursor.id }
                            }
                        ]
                    }
                })
            }
        },
    });
}