import { axiosInstance } from "@/lib/axios";
import {create} from "zustand";
import { type Album, type Song,type Stats } from "@/types";
interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  featuredLoading: boolean;   // ✅ add
  trendingLoading: boolean;   // ✅ add
  madeForYouLoading: boolean; // ✅ add
  error: string | null;
  currentAlbum: Album | null;
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  featuredSongs: Song[];
  stats: Stats;
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  featuredLoading: false,   // ✅ add
  trendingLoading: false,   // ✅ add
  madeForYouLoading: false, // ✅ add
  error: null,
  currentAlbum: null,
  stats:{
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0 
  },
  isSongsLoading: false,
  isStatsLoading: false,
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ Each fetch uses its own loading flag
  fetchMadeForYouSongs: async () => {
    set({ madeForYouLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ madeForYouLoading: false });
    }
  },
  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs");
      set({ songs: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

   fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },    


  fetchTrendingSongs: async () => {
    set({ trendingLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/trending");
      set({ trendingSongs: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ trendingLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ featuredLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ featuredSongs: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ featuredLoading: false });
    }
  },
}));