import { db } from "../lib/db.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const { data, error } = await db
      .from("albums")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;

    const { data, error } = await db
      .from("albums")
      .select(`
        *,
        songs (*)
      `)
      .eq("id", albumId)
      .single();

    if (error) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};