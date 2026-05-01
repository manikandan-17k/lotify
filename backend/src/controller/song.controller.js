import { db } from "../lib/db.js";

export const getAllSongs = async (req, res, next) => {
  try {
    const { data, error } = await db
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false }); // newest first

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};
export const getFeaturedSongs = async (req, res, next) => {
  try {
    const { data, error } = await db
      .from("songs")
      .select("id, title, artist, image_url, audio_url")
      .order("random") // 🎯 replaces $sample
      .limit(6);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const { data, error } = await db
      .from("songs")
      .select("id, title, artist, image_url, audio_url")
      .order("random")
      .limit(4);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    const { data, error } = await db
      .from("songs")
      .select("id, title, artist, image_url, audio_url")
      .order("random")
      .limit(4);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

