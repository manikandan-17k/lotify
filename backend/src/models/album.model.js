import { db } from "../lib/db.js";

// 🎧 Create Album
export const createAlbum = async (album) => {
  const { data, error } = await db
    .from("albums")
    .insert([album])
    .select();

  if (error) throw error;

  return data[0];
};

// 📥 Get All Albums
export const getAllAlbums = async () => {
  const { data, error } = await db
    .from("albums")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// 🔍 Get Album by ID
export const getAlbumById = async (id) => {
  const { data, error } = await db
    .from("albums")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

// 🎵 Get Album with Songs (IMPORTANT 🔥)
export const getAlbumWithSongs = async (id) => {
  const { data, error } = await db
    .from("albums")
    .select(`
      *,
      songs (*)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

// ✏️ Update Album
export const updateAlbum = async (id, updates) => {
  const { data, error } = await db
    .from("albums")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data[0];
};

// ❌ Delete Album
export const deleteAlbum = async (id) => {
  const { error } = await db
    .from("albums")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return { message: "Album deleted" };
};