import { Router } from "express";

const router = Router();

console.log("stats route loaded");

router.get("/", (req, res) => {
  res.send("stats route");
});

export default router;
