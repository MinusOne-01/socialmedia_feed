import { Router } from "express";
import { create, getComments, getPost } from "./post.controller.js";

const router = Router();

router.post("/new", create);
router.get("/:postId", getPost);
router.get("/:postId/comments", getComments);

export default router;