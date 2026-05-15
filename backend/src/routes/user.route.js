import { Router } from "express";

const router = Router();

console.log("user route loaded");

router.get("/", (req, res) => {
  res.send("user route");
});

export default router;
