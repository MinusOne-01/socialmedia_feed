import verifyUser from "../../middleware/auth.js";
import { buildFeed } from "./feed.service.js";

export async function getFeed(req, res, next){
    try{
        const { userId } = req.body;
        const { cursorId, cursorTime } = req.query;
        
        const cursor = cursorId && cursorTime 
        ? { id: cursorId, createdAt: cursorTime } 
        : null;

        if (!userId) {
            return res.status(400).json({
                message: "userId required"
            });
        }    
        
        await verifyUser( userId );
        const limit = 20;

        const feed = await buildFeed( userId, cursor, limit);

        res.json({ feed });

    }
    catch(err){
        next(err);
    }

}