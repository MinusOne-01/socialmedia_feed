import { prisma } from "../../configs/prisma.js"

export default async function createComment_db( userId, postId, content ){
    
    return await prisma.comments.create({
        data: {
            userId,
            postId,
            content
        }
    });

}