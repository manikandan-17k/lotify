import { axiosInstance } from "@/lib/axios";
import {create} from "zustand";
import { type Album, type Song } from "@/types";

interface MusicStore {
	albums: Album[];
	songs: Song[];
	isLoading: boolean;
	error: string | null;
	currentAlbum: Album | null;
	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: string) => Promise<void>;
}	


export const useMusicStore = create<MusicStore>((set) => ({
	albums: [],
	songs: [],
	isLoading: false,
	error:null,
	currentAlbum: null,
	fetchAlbums: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/albums");
			console.log("Fetched albums:", response.data);
			set({ albums: response.data});
		} catch (error) {
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
			console.log("Fetched album by ID:", response.data);
		} catch (error) {
			set({ error: error.message });
			throw error;
		} finally {
			set({ isLoading: false });
		}
	}
}));