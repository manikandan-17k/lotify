import { db } from "../lib/db.js";

export const Song = {
  // Create a new song
  async create({ title, artist, imageUrl, audioUrl, duration, albumId = null }) {
    const { data, error } = await db
      .from("songs")
      .insert([
        {
          title,
          artist,
          image_url: imageUrl,
          audio_url: audioUrl,
          duration,
          album_id: albumId,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Find a song by id
  async findById(id) {
    if (!id) throw new Error("Song id is required");

    const { data, error } = await db
      .from("songs")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data ?? null;
  },

  // Find a song by id — with album details joined
  async findByIdWithAlbum(id) {
    if (!id) throw new Error("Song id is required");

    const { data, error } = await db
      .from("songs")
      .select(`*, albums(*)`)
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data ?? null;
  },

  // Get all songs — sorted by created_at desc
  async findAll({ orderBy = "created_at", ascending = false } = {}) {
    const { data, error } = await db
      .from("songs")
      .select("*")
      .order(orderBy, { ascending });

    if (error) throw new Error(error.message);
    return data;
  },

  // Get all songs with album details joined — sorted by created_at desc
  async findAllWithAlbum({ orderBy = "created_at", ascending = false } = {}) {
    const { data, error } = await db
      .from("songs")
      .select(`*, albums(*)`)
      .order(orderBy, { ascending });

    if (error) throw new Error(error.message);
    return data;
  },

  // Get all songs belonging to a specific album
  async findByAlbumId(albumId) {
    if (!albumId) throw new Error("Album id is required");

    const { data, error } = await db
      .from("songs")
      .select("*")
      .eq("album_id", albumId)
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  },

  // Get all songs NOT linked to any album — sorted by created_at desc
  async findWithoutAlbum({ orderBy = "created_at", ascending = false } = {}) {
    const { data, error } = await db
      .from("songs")
      .select("*")
      .is("album_id", null)
      .order(orderBy, { ascending });

    if (error) throw new Error(error.message);
    return data;
  },

  // Update a song by id — guards against empty update
  async updateById(id, updates = {}) {
    if (!id) throw new Error("Song id is required");

    const fieldMap = {
      title: "title",
      artist: "artist",
      imageUrl: "image_url",
      audioUrl: "audio_url",
      duration: "duration",
      albumId: "album_id",
    };

    // Build only the fields that were actually passed
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
      .from("songs")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete a song by id
  async deleteById(id) {
    if (!id) throw new Error("Song id is required");

    const { error } = await db.from("songs").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  },

  // Delete all songs belonging to a specific album
  async deleteByAlbumId(albumId) {
    if (!albumId) throw new Error("Album id is required");

    const { error } = await db
      .from("songs")
      .delete()
      .eq("album_id", albumId);

    if (error) throw new Error(error.message);
    return { success: true };
  },
};