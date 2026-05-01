import { db } from "../lib/db.js";

// 🎧 Create Song
export const createSong = async (song) => {
  const { data, error } = await db
    .from("songs")
    .insert([song])
    .select();

  if (error) throw error;

  return data[0];
};

// 📥 Get All Songs
export const getAllSongs = async () => {
  const { data, error } = await db
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// 🔍 Get Song by ID
export const getSongById = async (id) => {
  const { data, error } = await db
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

// ✏️ Update Song
export const updateSong = async (id, updates) => {
  const { data, error } = await db
    .from("songs")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data[0];
};

// ❌ Delete Song
export const deleteSong = async (id) => {
  const { error } = await db
    .from("songs")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return { message: "Song deleted" };
};