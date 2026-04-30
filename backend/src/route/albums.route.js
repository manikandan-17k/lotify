import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("albumRoutes is working!");
}  );

export default router;