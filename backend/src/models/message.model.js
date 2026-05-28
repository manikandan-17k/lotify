import { db } from "../lib/db.js";

export const Message = {
  // Create a new message
  async create({ sender_id, receiver_id, content }) {
    if (!sender_id) throw new Error("sender_id is required");
    if (!receiver_id) throw new Error("receiver_id is required");
    if (!content?.trim()) throw new Error("content is required");

    const { data, error } = await db
      .from("messages")
      .insert([
        {
          sender_id: sender_id,
          receiver_id: receiver_id ,
          content: content.trim(),
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get all messages between two users (conversation)
  async findConversation(userOneId, userTwoId, { orderBy = "created_at", ascending = true } = {}) {
    if (!userOneId || !userTwoId) throw new Error("Both user IDs are required");

    const { data, error } = await db
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${userOneId},receiver_id.eq.${userTwoId}),and(sender_id.eq.${userTwoId},receiver_id.eq.${userOneId})`
      )
      .order(orderBy, { ascending });

    if (error) throw new Error(error.message);
    return data;
  },

  // Get all messages sent by a user
  async findBySender(senderId, { orderBy = "created_at", ascending = false } = {}) {
    if (!senderId) throw new Error("senderId is required");

    const { data, error } = await db
      .from("messages")
      .select("*")
      .eq("sender_id", senderId)
      .order(orderBy, { ascending });

    if (error) throw new Error(error.message);
    return data;
  },

  // Get all messages received by a user
  async findByReceiver(receiverId, { orderBy = "created_at", ascending = false } = {}) {
    if (!receiverId) throw new Error("receiverId is required");

    const { data, error } = await db
      .from("messages")
      .select("*")
      .eq("receiver_id", receiverId)
      .order(orderBy, { ascending });

    if (error) throw new Error(error.message);
    return data;
  },

  // Get a single message by id
  async findById(id) {
    if (!id) throw new Error("Message id is required");

    const { data, error } = await db
      .from("messages")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data ?? null;
  },

  // Get all messages (admin use) — sorted by newest first
  async findAll({ orderBy = "created_at", ascending = false } = {}) {
    const { data, error } = await db
      .from("messages")
      .select("*")
      .order(orderBy, { ascending });

    if (error) throw new Error(error.message);
    return data;
  },

  // Update message content by id
  async updateById(id, { content }) {
    if (!id) throw new Error("Message id is required");
    if (!content?.trim()) throw new Error("content is required");

    const { data, error } = await db
      .from("messages")
      .update({ content: content.trim() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete a message by id
  async deleteById(id) {
    if (!id) throw new Error("Message id is required");

    const { error } = await db.from("messages").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  },

  // Delete entire conversation between two users
  async deleteConversation(userOneId, userTwoId) {
    if (!userOneId || !userTwoId) throw new Error("Both user IDs are required");

    const { error } = await db
      .from("messages")
      .delete()
      .or(
        `and(sender_id.eq.${userOneId},receiver_id.eq.${userTwoId}),and(sender_id.eq.${userTwoId},receiver_id.eq.${userOneId})`
      );

    if (error) throw new Error(error.message);
    return { success: true };
  },
};