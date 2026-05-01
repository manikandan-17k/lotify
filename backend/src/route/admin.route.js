import { Router } from "express";
import { createSong } from "../controller/admin.controller.js";
import { protectRoute, requiredAdmin } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/songs", protectRoute, requiredAdmin, createSong );

export default router;   