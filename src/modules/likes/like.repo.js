import { prisma } from "../../configs/prisma.js"

export default async function createLike_db( userId, postId ){
    
    return await prisma.likes.create({
        data: {
            userId,
            postId
        }
    });

}

