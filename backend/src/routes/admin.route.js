import { Router } from "express";
import { deleteAlbum,createSong,deleteSong,createAlbum,checkAdmin } from "../controller/admin.controller.js";
import { protectRoute,requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

console.log("admin route loaded");
router.use(protectRoute,requireAdmin);
router.get("/check", checkAdmin);
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
router.post("/albums", createAlbum);  
router.delete("/albums/:id", deleteAlbum);

export default router;
