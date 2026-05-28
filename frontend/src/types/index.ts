export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  audio_url: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  release_date: string;
  image_url: string;
  songs?: Song[];
}

export interface Stats {
  totalSongs: number;
  totalAlbums: number;
  totalUsers: number;
  totalArtists: number;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  clerk_id: string;
  full_name: string;
  image_url: string;
}