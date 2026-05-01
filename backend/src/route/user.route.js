import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    req.auth.userId; // Access the authenticated user's ID
    res.send("hello, Developer!");
}  );

export default router;