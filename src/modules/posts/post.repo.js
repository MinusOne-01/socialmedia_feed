import { prisma } from "../../configs/prisma.js";

export async function createPost_db( userId, content ){

    return await prisma.posts.create({
        data: {
            userId,
            content
        }
    });
}

export async function getPostInfo_db( postId ) {

    return await prisma.posts.findUnique({
        where: {
            id: postId,
        },
        include: {
            // 1. Fetch the 20 most recent comments
            postComments: {
                take: 20,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    users: true, // Optional: includes comment author details
                }
            },
            // 2. Count the number of like records
            _count: {
                select: {
                    postLikes: true,
                },
            },
        },
    });
}