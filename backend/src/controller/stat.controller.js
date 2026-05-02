import { db } from "../lib/db.js";

export const getStats = async (req, res, next) => {
  try {
    // run all queries in parallel
    const [
      { count: totalSongs },
      { count: totalAlbums },
      { count: totalUsers },
      { data: songArtists },
      { data: albumArtists },
    ] = await Promise.all([
      db.from("songs").select("*", { count: "exact", head: true }),
      db.from("albums").select("*", { count: "exact", head: true }),
      db.from("users").select("*", { count: "exact", head: true }),

      // get artists from songs
      db.from("songs").select("artist"),

      // get artists from albums
      db.from("albums").select("artist"),
    ]);

    // 🔥 combine & get unique artists
    const allArtists = [
      ...songArtists.map((s) => s.artist),
      ...albumArtists.map((a) => a.artist),
    ];

    const uniqueArtists = [...new Set(allArtists)];

    res.status(200).json({
      totalSongs: totalSongs || 0,
      totalAlbums: totalAlbums || 0,
      totalUsers: totalUsers || 0,
      totalArtists: uniqueArtists.length,
    });
  } catch (error) {
    next(error);
  }
};