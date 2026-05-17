import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    // ✅ findAll() with default sort createdAt descending (newest → oldest)
    const songs = await Song.findAll({ orderBy: "created_at", ascending: false });
    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // ✅ Supabase has no $sample — use PostgreSQL random() to get 6 random songs
    const songs = await Song.getRandomSongs(6);
    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    // ✅ 4 random songs
    const songs = await Song.getRandomSongs(4);
    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    // ✅ 4 random songs
    const songs = await Song.getRandomSongs(4);
    res.json(songs);
  } catch (error) {
    next(error);
  }
};