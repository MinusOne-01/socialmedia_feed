import { Router } from "express";
import { create, getPost } from "./post.controller.js";

const router = Router();

router.post("/new", create);
router.get("/:postId", getPost);

export default router;