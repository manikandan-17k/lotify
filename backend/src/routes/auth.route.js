import { Router } from "express";

const router = Router();

console.log("auth route loaded");

router.get("/", (req, res) => {
  res.send("auth route");
});

export default router;
