import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;

    // ✅ getAllExcept() replaces User.find({ clerkId: { $ne: currentUserId } })
    const users = await User.getAllExcept(currentUserId);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const myId = req.auth.userId;
    const { userId } = req.params;

    // ✅ findConversation() replaces Message.find({ $or: [...] }).sort()
    const messages = await Message.findConversation(myId, userId, {
      orderBy: "created_at",
      ascending: true, // oldest → newest (chat order)
    });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};