import createFollow from "./follow.service.js";
import verifyUser from "../../middleware/auth.js";

export default async function followUser(req, res, next){
    try{

        const { userId } = req.body;
        const { otherId } = req.params;

        if (!userId || !otherId) {
            return res.status(400).json({
                message: "userId and otherId are required"
            });
        }

        if(userId === otherId) {
            return res.status(400).json({
                message: "userId and otherId cant be same!"
            });
        }

        await verifyUser(userId);
        await verifyUser(otherId);

        const follow = await createFollow( userId, otherId );

        res.status(201).json({ 
            message: "Follow successful",
            followedUser: follow 
        });

    }
    catch(err){
        if (err.message === "ALREADY_FOLLOWING") {
            return res.status(409).json({ message: "You are already following this user" });
        }
        next(err);
    }

}