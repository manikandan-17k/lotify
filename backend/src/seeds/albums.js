  import { createClient } from "@supabase/supabase-js";
  import dotenv from "dotenv";

  dotenv.config();

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  const songs = [
    {
      title: "Stay With Me",
      artist: "Sarah Mitchell",
      image_url: "/cover-images/1.jpg",
      audio_url: "/songs/1.mp3",
      duration: 46,
    },
    {
      title: "Midnight Drive",
      artist: "The Wanderers",
      image_url: "/cover-images/2.jpg",
      audio_url: "/songs/2.mp3",
      duration: 41,
    },
    {
      title: "Lost in Tokyo",
      artist: "Electric Dreams",
      image_url: "/cover-images/3.jpg",
      audio_url: "/songs/3.mp3",
      duration: 24,
    },
    {
      title: "Summer Daze",
      artist: "Coastal Kids",
      image_url: "/cover-images/4.jpg",
      audio_url: "/songs/4.mp3",
      duration: 24,
    },
    {
      title: "Neon Lights",
      artist: "Night Runners",
      image_url: "/cover-images/5.jpg",
      audio_url: "/songs/5.mp3",
      duration: 36,
    },
    {
      title: "Mountain High",
      artist: "The Wild Ones",
      image_url: "/cover-images/6.jpg",
      audio_url: "/songs/6.mp3",
      duration: 40,
    },
    {
      title: "City Rain",
      artist: "Urban Echo",
      image_url: "/cover-images/7.jpg",
      audio_url: "/songs/7.mp3",
      duration: 39,
    },
    {
      title: "Desert Wind",
      artist: "Sahara Sons",
      image_url: "/cover-images/8.jpg",
      audio_url: "/songs/8.mp3",
      duration: 28,
    },
    {
      title: "Ocean Waves",
      artist: "Coastal Drift",
      image_url: "/cover-images/9.jpg",
      audio_url: "/songs/9.mp3",
      duration: 28,
    },
    {
      title: "Starlight",
      artist: "Luna Bay",
      image_url: "/cover-images/10.jpg",
      audio_url: "/songs/10.mp3",
      duration: 30,
    },
    {
      title: "Winter Dreams",
      artist: "Arctic Pulse",
      image_url: "/cover-images/11.jpg",
      audio_url: "/songs/11.mp3",
      duration: 29,
    },
    {
      title: "Purple Sunset",
      artist: "Dream Valley",
      image_url: "/cover-images/12.jpg",
      audio_url: "/songs/12.mp3",
      duration: 17,
    },
    {
      title: "Neon Dreams",
      artist: "Cyber Pulse",
      image_url: "/cover-images/13.jpg",
      audio_url: "/songs/13.mp3",
      duration: 39,
    },
    {
      title: "Moonlight Dance",
      artist: "Silver Shadows",
      image_url: "/cover-images/14.jpg",
      audio_url: "/songs/14.mp3",
      duration: 27,
    },
    {
      title: "Urban Jungle",
      artist: "City Lights",
      image_url: "/cover-images/15.jpg",
      audio_url: "/songs/15.mp3",
      duration: 36,
    },
    {
      title: "Crystal Rain",
      artist: "Echo Valley",
      image_url: "/cover-images/16.jpg",
      audio_url: "/songs/16.mp3",
      duration: 39,
    },
    {
      title: "Neon Tokyo",
      artist: "Future Pulse",
      image_url: "/cover-images/17.jpg",
      audio_url: "/songs/17.mp3",
      duration: 39,
    },
    {
      title: "Midnight Blues",
      artist: "Jazz Cats",
      image_url: "/cover-images/18.jpg",
      audio_url: "/songs/18.mp3",
      duration: 29,
    },
  ];

  const seedSongs = async () => {
    try {
      // optional: clear existing songs
            // insert songs
      const { data, error } = await supabase
        .from("albums")
        .insert(songs);

      if (error) {
        console.error("Error seeding songs:", error);
      } else {
        console.log("Songs seeded successfully!");
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  seedSongs();