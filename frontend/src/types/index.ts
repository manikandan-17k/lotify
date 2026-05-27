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
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  clerkId: string;
  fullName: string;
  imageUrl: string;
}