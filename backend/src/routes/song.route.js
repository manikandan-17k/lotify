import { Router } from "express";

const router = Router();

console.log("song route loaded");

router.get("/", (req, res) => {
  res.send("song route");
});

export default router;
