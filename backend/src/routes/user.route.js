import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers, getMessages } from "../controller/user.controller.js";

const router = Router();

console.log("user route loaded");

router.get("/",protectRoute, getAllUsers);
router.get("/message/:userId", protectRoute, getMessages);

export default router;
