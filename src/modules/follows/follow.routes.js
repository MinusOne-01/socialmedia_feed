import { Router } from "express";
import followUser from "./follow.controller.js";

const router = Router();

router.post("/:otherId", followUser);

export default router;