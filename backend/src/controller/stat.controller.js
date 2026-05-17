import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { db } from "../lib/db.js";

export const getStats = async (req, res, next) => {
  try {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtistsResult] =
      await Promise.all([
        // ✅ count() replaces countDocuments()
        Song.count(),
        Album.count(),
        User.count(),

        // ✅ db.rpc() replaces $unionWith + $group + $count aggregation
        db.rpc("get_unique_artists_count"),
      ]);

    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtistsResult.data ?? 0,
    });
  } catch (error) {
    next(error);
  }
};