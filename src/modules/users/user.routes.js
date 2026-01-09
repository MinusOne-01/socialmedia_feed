import { Router } from "express";
import register from "./user.register.js";

const router = Router();

router.post("/new", register);

export default router;
