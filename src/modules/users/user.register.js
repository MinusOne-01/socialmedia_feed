import { prisma } from "../../configs/prisma.js"

export default async function register(req, res){
    
    const { name } = req.body;

    if(!name){
        return res.status(400).json({
        message: "Name required!"
      });
    }
    
    try{
        const profile = await prisma.users.create({
            data: {
                username: name
            }
        });

        res.status(201).json(profile);
    }
    catch(err){
        next(err);
    }
}
