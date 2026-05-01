import { db } from "../lib/db.js";
import cloudinary from "../lib/cloudinary.js";

// ☁️ Upload helper
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Cloudinary error:", error);
    throw new Error("Upload failed");
  }
};



// 🎧 CREATE SONG
export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" });
    }

    const { title, artist, albumId, duration } = req.body;

    const audioUrl = await uploadToCloudinary(req.files.audioFile);
    const imageUrl = await uploadToCloudinary(req.files.imageFile);

    const { data, error } = await db
      .from("songs")
      .insert([
        {
          title,
          artist,
          audio_url: audioUrl,
          image_url: imageUrl,
          duration,
          album_id: albumId || null,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.log("Error in createSong:", error.message);
    next(error);
  }
};



// ❌ DELETE SONG
export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await db
      .from("songs")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log("Error in deleteSong:", error.message);
    next(error);
  }
};



// 📀 CREATE ALBUM
export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;

    const imageUrl = await uploadToCloudinary(req.files.imageFile);

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
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.log("Error in createAlbum:", error.message);
    next(error);
  }
};



// 🗑️ DELETE ALBUM
export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await db
      .from("albums")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAlbum:", error.message);
    next(error);
  }
};



// ✅ ADMIN CHECK
export const checkAdmin = async (req, res) => {
  res.status(200).json({ admin: true });
};