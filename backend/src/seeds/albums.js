import { db } from "../lib/db.js";
import { config } from "dotenv";

config();

// helper delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    // Clear existing data
    const { error: deleteSongsError } = await db
      .from("songs")
      .delete()
      .not("id", "is", null);
    if (deleteSongsError) throw new Error(deleteSongsError.message);

    const { error: deleteAlbumsError } = await db
      .from("albums")
      .delete()
      .not("id", "is", null);
    if (deleteAlbumsError) throw new Error(deleteAlbumsError.message);

    console.log("Existing data cleared ✅");

    // Insert all songs first
    const { data: createdSongs, error: songsError } = await db
      .from("songs")
      .insert([
        { title: "City Rain",       artist: "Urban Echo",      image_url: "/cover-images/7.jpg",  audio_url: "/songs/7.mp3",  duration: 39 },
        { title: "Neon Lights",     artist: "Night Runners",   image_url: "/cover-images/5.jpg",  audio_url: "/songs/5.mp3",  duration: 36 },
        { title: "Urban Jungle",    artist: "City Lights",     image_url: "/cover-images/15.jpg", audio_url: "/songs/15.mp3", duration: 36 },
        { title: "Neon Dreams",     artist: "Cyber Pulse",     image_url: "/cover-images/13.jpg", audio_url: "/songs/13.mp3", duration: 39 },
        { title: "Summer Daze",     artist: "Coastal Kids",    image_url: "/cover-images/4.jpg",  audio_url: "/songs/4.mp3",  duration: 24 },
        { title: "Ocean Waves",     artist: "Coastal Drift",   image_url: "/cover-images/9.jpg",  audio_url: "/songs/9.mp3",  duration: 28 },
        { title: "Crystal Rain",    artist: "Echo Valley",     image_url: "/cover-images/16.jpg", audio_url: "/songs/16.mp3", duration: 39 },
        { title: "Starlight",       artist: "Luna Bay",        image_url: "/cover-images/10.jpg", audio_url: "/songs/10.mp3", duration: 30 },
        { title: "Stay With Me",    artist: "Sarah Mitchell",  image_url: "/cover-images/1.jpg",  audio_url: "/songs/1.mp3",  duration: 46 },
        { title: "Midnight Drive",  artist: "The Wanderers",   image_url: "/cover-images/2.jpg",  audio_url: "/songs/2.mp3",  duration: 41 },
        { title: "Moonlight Dance", artist: "Silver Shadows",  image_url: "/cover-images/14.jpg", audio_url: "/songs/14.mp3", duration: 27 },
        { title: "Lost in Tokyo",   artist: "Electric Dreams", image_url: "/cover-images/3.jpg",  audio_url: "/songs/3.mp3",  duration: 24 },
        { title: "Neon Tokyo",      artist: "Future Pulse",    image_url: "/cover-images/17.jpg", audio_url: "/songs/17.mp3", duration: 39 },
        { title: "Purple Sunset",   artist: "Dream Valley",    image_url: "/cover-images/12.jpg", audio_url: "/songs/12.mp3", duration: 17 },
      ])
      .select();

    if (songsError) throw new Error(songsError.message);
    console.log(`${createdSongs.length} songs inserted ✅`);

    // Insert all albums
    const { data: createdAlbums, error: albumsError } = await db
      .from("albums")
      .insert([
        { title: "Urban Nights",      artist: "Various Artists", image_url: "/albums/1.jpg", release_year: 2024 },
        { title: "Coastal Dreaming",  artist: "Various Artists", image_url: "/albums/2.jpg", release_year: 2024 },
        { title: "Midnight Sessions", artist: "Various Artists", image_url: "/albums/3.jpg", release_year: 2024 },
        { title: "Eastern Dreams",    artist: "Various Artists", image_url: "/albums/4.jpg", release_year: 2024 },
      ])
      .select();

    if (albumsError) throw new Error(albumsError.message);
    console.log(`${createdAlbums.length} albums inserted ✅`);

    // Link songs to albums with delay between each to avoid fetch timeout
    const albumSongRanges = [
      { album: createdAlbums[0], songs: createdSongs.slice(0, 4)  },
      { album: createdAlbums[1], songs: createdSongs.slice(4, 8)  },
      { album: createdAlbums[2], songs: createdSongs.slice(8, 11) },
      { album: createdAlbums[3], songs: createdSongs.slice(11, 14)},
    ];

    for (const { album, songs } of albumSongRanges) {
      const songIds = songs.map((s) => s.id);

      const { error: updateError } = await db
        .from("songs")
        .update({ album_id: album.id })
        .in("id", songIds);

      if (updateError) throw new Error(updateError.message);
      console.log(`Linked ${songIds.length} songs to "${album.title}" ✅`);

      // ✅ pause between requests to avoid overwhelming Supabase
      await delay(1000);
    }

    console.log("Database seeded successfully! 🎉");

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();