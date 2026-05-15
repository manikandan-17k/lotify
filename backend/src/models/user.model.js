import { db } from "../lib/db.js";

export const User = {
  // Create a new user
  async create({ fullName, imageUrl, clerkId }) {
    const { data, error } = await db
      .from("users")
      .insert([{ full_name: fullName, image_url: imageUrl, clerk_id: clerkId }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Find a user by clerkId
  async findByClerkId(clerkId) {
    const { data, error } = await db
      .from("users")
      .select("*")
      .eq("clerk_id", clerkId)
      .single();

    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data;
  },

  // Find a user by id
  async findById(id) {
    const { data, error } = await db
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data;
  },

  // Get all users
  async findAll() {
    const { data, error } = await db.from("users").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  // Update a user by clerkId
  async updateByClerkId(clerkId, updates) {
    const { fullName, imageUrl } = updates;
    const { data, error } = await db
      .from("users")
      .update({
        ...(fullName && { full_name: fullName }),
        ...(imageUrl && { image_url: imageUrl }),
      })
      .eq("clerk_id", clerkId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete a user by clerkId
  async deleteByClerkId(clerkId) {
    const { error } = await db
      .from("users")
      .delete()
      .eq("clerk_id", clerkId);

    if (error) throw new Error(error.message);
    return { success: true };
  },
};