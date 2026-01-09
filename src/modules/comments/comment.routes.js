import { Router } from "express";
import postComment from "./comment.controller.js";

const router = Router();

router.post("/:postId", postComment);

export default router;