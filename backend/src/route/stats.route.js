import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("stats is working!");
}  );

export default router;