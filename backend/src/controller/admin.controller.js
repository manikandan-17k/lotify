import song from "../model/song.model.js";
import db from "../lib/db.js";
import album from "../model/album.model.js";
export const createSong = async (req, res) => {
    try{
        if(!req.files || !req.files.coverImage || !req.files.audioFile) {   
            return res.status(400).json({ message: "Bad Request - Missing required fields" });
    }
    const{title,artist,albumId,duration} = req.body;
    const coverImage = req.files.coverImage;
    const audioFile = req.files.audioFile;

    const song = new song({
        title,
        artist,
        audiourl,
        imageurl,
        duration,
        albumId : albumId || null, 
    });
    await song.save();
  // if song belongs to an album, link it using foreign key
    if (albumId) {
        const { error } = await db
            .from("songs")
            .update({ album_id: albumId })   // 👈 link song to album
            .eq("id", song.id);

        if (error) throw error;
    } 
    res.status(201).json({ message: "Song created successfully", song });
    }catch(error) {
        console.error("Error creating song:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
