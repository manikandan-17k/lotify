import { Router } from "express";
import { createSong,deleteSong,createAlbum,deleteAlbum,checkAdmin } from "../controller/admin.controller.js";
import { protectRoute, requiredAdmin } from "../middleware/auth.middleware.js";
const router = Router();
router.use(protectRoute,requiredAdmin);
router.get("/check", checkAdmin);
router.post("/songs", createSong );
router.delete("/songs/:id", deleteSong );
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;   