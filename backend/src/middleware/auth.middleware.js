import { clerkClient, getAuth } from "@clerk/express";

export const protectRoute = (req, res, next) => {
  // ✅ use getAuth(req) instead of req.auth
  const auth = getAuth(req);

  if (!auth?.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    // ✅ use getAuth(req) to get userId
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const currentUser = await clerkClient.users.getUser(userId);
    const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden - Admins only" });
    }

    next();
  } catch (error) {
    console.log("Error in requireAdmin middleware", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};