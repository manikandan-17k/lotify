import { db } from "../lib/db.js";

export const Album = {
  // Create a new album
  async create({ title, artist, imageUrl, releaseYear }) {
    if (!title) throw new Error("title is required");
    if (!artist) throw new Error("artist is required");
    if (!imageUrl) throw new Error("imageUrl is required");
    if (!releaseYear) throw new Error("releaseYear is required");

    const { data, error } = await db
      .from("albums")
      .insert([
        {
          title,
          artist,
          image_url: imageUrl,
          release_year: releaseYear,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get all albums — sorted by newest first
  async findAll({ orderBy = "created_at", ascending = false } = {}) {
    const { data, error } = await db
      .from("albums")
      .select("*")
      .order(orderBy, { ascending });

    if (error) throw new Error(error.message);
    return data;
  },

  // Get all albums with their songs joined (replaces mongoose .populate("songs"))
  async findAllWithSongs({ orderBy = "created_at", ascending = false } = {}) {
    const { data, error } = await db
      .from("albums")
      .select(`*, songs(*)`)
      .order(orderBy, { ascending });

    if (error) throw new Error(error.message);
    return data;
  },

  // Find album by id
  async findById(id) {
    if (!id) throw new Error("Album id is required");

    const { data, error } = await db
      .from("albums")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data ?? null;
  },

  // Find album by id with songs joined
  async findByIdWithSongs(id) {
    if (!id) throw new Error("Album id is required");

    const { data, error } = await db
      .from("albums")
      .select(`*, songs(*)`)
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data ?? null;
  },

  // Find albums by artist
  async findByArtist(artist, { orderBy = "release_year", ascending = false } = {}) {
    if (!artist) throw new Error("artist is required");

    const { data, error } = await db
      .from("albums")
      .select("*")
      .ilike("artist", `%${artist}%`) // case-insensitive search
      .order(orderBy, { ascending });

    if (error) throw new Error(error.message);
    return data;
  },

  // Update album by id
  async updateById(id, updates = {}) {
    if (!id) throw new Error("Album id is required");

    const fieldMap = {
      title: "title",
      artist: "artist",
      imageUrl: "image_url",
      releaseYear: "release_year",
    };

    // Build only fields that were actually passed
    const payload = Object.entries(updates).reduce((acc, [key, value]) => {
      if (fieldMap[key] && value !== undefined) {
        acc[fieldMap[key]] = value;
      }
      return acc;
    }, {});

    // Guard: nothing to update
    if (Object.keys(payload).length === 0) {
      throw new Error("No valid fields provided for update");
    }

    const { data, error } = await db
      .from("albums")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete album by id (songs.album_id will be set to NULL via ON DELETE SET NULL)
  async deleteById(id) {
    if (!id) throw new Error("Album id is required");

    const { error } = await db.from("albums").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  },

  // Delete album and all its songs together
  async deleteByIdWithSongs(id) {
    if (!id) throw new Error("Album id is required");

    // Delete songs first, then album
    const { error: songsError } = await db
      .from("songs")
      .delete()
      .eq("album_id", id);

    if (songsError) throw new Error(songsError.message);

    const { error: albumError } = await db
      .from("albums")
      .delete()
      .eq("id", id);

    if (albumError) throw new Error(albumError.message);
    return { success: true };
  },
};