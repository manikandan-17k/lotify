import { Router } from "express";
import { getStats } from "../controller/stat.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

console.log("stats route loaded");

router.get("/", protectRoute,requireAdmin,getStats);

export default router;
