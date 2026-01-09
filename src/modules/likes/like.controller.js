import createLike from "./like.service.js";
import verifyUser from "../../middleware/auth.js";

export default async function likePost(req, res, next){
    try{

        const { userId } = req.body;
        const { postId } = req.params;

        if (!userId || !postId) {
            return res.status(400).json({
                message: "userId and postId are required"
            });
        }

        await verifyUser(userId);

        const like = await createLike( userId, postId );

        res.status(201).json({ 
            message: "Success!",
            LikeInfo: like 
        });

    }
    catch(err){
        if (err.message === "INVALID_POST") {
            return res.status(409).json({ message: "Post doesnt exist" });
        }
        next(err);
    }

}