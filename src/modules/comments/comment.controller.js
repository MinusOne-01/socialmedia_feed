import createComment from "./comment.service.js";
import verifyUser from "../../middleware/auth.js";

export default async function postComment(req, res, next){
    try{

        const { userId, content } = req.body;
        const { postId } = req.params;

        if (!userId || !postId || !content ) {
            return res.status(400).json({
                message: "Content, userId and postId are required"
            });
        }

        await verifyUser(userId);

        const comment = await createComment( userId, postId, content );

        res.status(201).json({ 
            message: "Success!",
            CommentInfo: comment 
        });

    }
    catch(err){
        if (err.message === "INVALID_POST") {
            return res.status(409).json({ message: "Post doesnt exist" });
        }
        next(err);
    }

}