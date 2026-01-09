import { prisma } from "../configs/prisma.js";

export default async function verifyUser( userId ){

    const User = await prisma.users.findUnique({
        where: { id: userId }
    });

    if (!User) {
        throw { status: 401, message: "User doesnt exist!" };
    }

    return User;

}