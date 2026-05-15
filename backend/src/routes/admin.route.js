import { Router } from "express";

const router = Router();

console.log("admin route loaded");

router.get("/", (req, res) => {
  res.send("admin route");
});

export default router;
