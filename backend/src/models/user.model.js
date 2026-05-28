import { db } from "../lib/db.js";

export const User = {
  // Create a new user
  async create({ full_name, image_url, clerk_id }) {
    const { data, error } = await db
      .from("users")
      .insert([{ full_name: full_name, image_url: image_url, clerk_id: clerk_id }])
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
    const { full_name, image_url } = updates;
    const { data, error } = await db
      .from("users")
      .update({
        ...(full_name && { full_name: full_name }),
        ...(image_url && { image_url: image_url }),
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
  // Get all users except the current logged-in user
// replaces User.find({ clerkId: { $ne: currentUserId } })
async getAllExcept(clerkId) {
  if (!clerkId) throw new Error("clerkId is required");

  const { data, error } = await db
    .from("users")
    .select("*")
    .neq("clerk_id", clerkId)        // $ne → .neq()
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
},
// Count total users
async count() {
  const { count, error } = await db
    .from("users")
    .select("*", { count: "exact", head: true });

  if (error) throw new Error(error.message);
  return count;
},
};