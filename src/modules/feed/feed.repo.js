import { prisma } from "../../configs/prisma.js";

export async function getfollowingList_db( userId ){

    return await prisma.follows.findMany({
        where: { followerId: userId },
        select: { followeeId: true }
    });

}

export async function getPostsList_db( userId, cursorCondition, limit ){

    return await prisma.feed.findMany({
        where: {
            userId,
            ...cursorCondition
        },
        orderBy: [
            { postCreatedAt: "desc" },
            { postId: "desc" }
        ],
        take: limit,
    });

}

export async function getPosts_db( postIds ){

    return await prisma.posts.findMany({
        where: { id:{ in: postIds } },
        orderBy: [
            { createdAt: "desc" },
            { id: "desc" }
        ]
    })

}

export async function getLikCount_db( postIds ){

    return await prisma.likes.groupBy({
        by: ["postId"],
        where: { postId: { in: postIds } },
        _count: true
    });

}

export async function getAuthorInfo_db( authorIds ){

    return await prisma.users.findMany({
        where: { id: { in: authorIds } },
        select: { id: true, username: true }
    });

}

export async function getLikedbyUser_db( userId, postIds ){

    return await prisma.likes.findMany({
        where: {
            postId: { in: postIds },
            userId
        },
        select: { postId: true }
    });

}


