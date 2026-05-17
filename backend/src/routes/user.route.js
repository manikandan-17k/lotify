import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controller/user.controller.js";

const router = Router();

console.log("user route loaded");

router.get("/",protectRoute, getAllUsers);

export default router;
