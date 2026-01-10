import { createPost, getPostInfo, getPostComments } from "./post.service.js";
import verifyUser from "../../middleware/auth.js";

export async function create(req, res, next){
    try {
        const { userId, content } = req.body;

        if (!userId || !content) {
            return res.status(400).json({
                message: "userId and content are required"
            });
        }

        await verifyUser(userId);
        const post = await createPost(userId, content);

        res.json({ PostInfo: post });

    }
    catch (err) {
        next(err);
    }
}

export async function getPost(req, res, next){
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({
                message: "postId required"
            });
        }

        const post = await getPostInfo( postId );

        if (!post) {
            return res.status(409).json({ message: "Post doesnt exist" });
        }

        res.json({ PostInfo: post });

    }
    catch (err) {
        next(err);
    }
}

export async function getComments(req, res, next){
    try{
        const { postId } = req.params;
        const { cursorId, cursorTime } = req.query;
        
        const cursor = cursorId && cursorTime 
        ? { id: cursorId, createdAt: cursorTime } 
        : null;

        if (!postId) {
            return res.status(400).json({
                message: "postId required"
            });
        }

        const comments = await getPostComments( postId, cursor );

        if (!comments) {
            return res.status(409).json({ message: "No more comments" });
        }

        res.json({ comments });

    }
    catch(err){
        next(err);
    }
}