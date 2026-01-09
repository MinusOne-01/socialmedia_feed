import { Router } from "express";
import likePost from "./like.controller.js";

const router = Router();

router.post("/:postId", likePost);

export default router;