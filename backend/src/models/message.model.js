import { db } from "../lib/db.js";

// 📩 Send Message
export const sendMessage = async (message) => {
  const { data, error } = await db
    .from("messages")
    .insert([message])
    .select();

  if (error) throw error;

  return data[0];
};

// 📥 Get conversation between two users
export const getConversation = async (user1, user2) => {
  const { data, error } = await db
    .from("messages")
    .select("*")
    .or(
      `and(sender_id.eq.${user1},receiver_id.eq.${user2}),
       and(sender_id.eq.${user2},receiver_id.eq.${user1})`
    )
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data;
};

// 📬 Get all messages for a user
export const getUserMessages = async (userId) => {
  const { data, error } = await db
    .from("messages")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// ❌ Delete message
export const deleteMessage = async (id) => {
  const { error } = await db
    .from("messages")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return { message: "Deleted" };
};