import { Router } from "express";
import { db } from "../lib/db.js";

const router = Router();
router.get("/song", async (req, res) => {
  const { data, error } = await db.from("songs").select("*");
  console.log(data, error);
  if (error) return res.status(500).json(error);

  res.json(data);
});
router.get("/", (req, res) => {
    res.send("songs is working!");
}  );
router.get("/songs1", async (req, res) => {
  const { data, error } = await db
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

export default router;

