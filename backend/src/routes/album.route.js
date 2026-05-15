import { Router } from "express";

const router = Router();

console.log("album route loaded");

router.get("/", (req, res) => {
  res.send("album route");
});

export default router;
