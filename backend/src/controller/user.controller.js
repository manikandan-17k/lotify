import { db } from "../lib/db.js";
import { getConversation } from "../models/message.model.js";

export const getAllUsers = async (req, res, next) => {
	try {
		const currentUserId = req.auth.userId;
		const { data, error } = await db
			.from("users")
			.select("*")
			.neq("clerk_id", currentUserId);

		if (error) throw error;

		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

export const getMessages = async (req, res, next) => {
	try {
		const myId = req.auth.userId;
		const { userId } = req.params;
		const messages = await getConversation(myId, userId);

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};  	