import { prisma } from "../../configs/prisma.js"

export default async function createFollow_db( userId, otherId ){
    
    return await prisma.follows.create({
        data: {
            followerId: userId,
            followeeId: otherId
        }
    });

}