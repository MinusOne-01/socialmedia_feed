import { prisma } from "../../configs/prisma.js";

export async function getfollowingList_db( userId ){

    return await prisma.follows.findMany({
        where: { followerId: userId },
        select: { followeeId: true }
    });

}

export async function getPostsList_db( followedIds, cursorCondition, limit ){

    return await prisma.posts.findMany({
        where: {
            userId: { in: followedIds },
            ...cursorCondition
        },
        orderBy: [
            { createdAt: "desc" },
            { id: "desc" }
        ],
        take: limit,
    });

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


