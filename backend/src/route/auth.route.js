import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";
const router = Router();
router.get("/", (req, res) => {
  res.send("Auth route is working!");
});
console.log("Auth route loaded"); // test log
router.post("/callback",authCallback);

export default router;