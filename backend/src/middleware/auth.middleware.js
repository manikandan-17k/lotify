import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    if(!req.auth || !req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized - User not authenticated please login" });
        
    }
    next();
};

export const requiredAdmin = async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const currentUser = await clerkClient.users.getUser(userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress.emailAddress;
        if (!isAdmin) {
            return res.status(403).json({ message: "Forbidden - Admin access required" });
        }
        next();
    } catch (error) {
        console.error("Error checking admin status:", error);
        res.status(500).json({ message: "Internal Server Error" });
        next(error);
    }
}