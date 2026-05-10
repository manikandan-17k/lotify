import {create} from 'zustand';
import  api  from '@/lib/axios';
import type { Album, Song } from '@/types';

interface MusicStore {
    albums: Album[];
    songs: Song[]; 
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id: number) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs:[],
    isLoading: false,
    error: null,
    currentAlbum: null,
    fetchAlbums: async () => {
        set({isLoading: true, error: null});
        try {
            const response = await api.get('/albums');
            set({albums: response.data});

        } catch (error:any) {
            set({error: error.message, isLoading: false});
        }finally {
            set({isLoading: false});
        }
    },
    fetchAlbumById: async (id: number) => {
        set({isLoading: true, error: null});
        try {
            const response = await api.get(`/albums/${id}`);
            set({songs: response.data.songs, currentAlbum: response.data});
        } catch (error:any) {
            set({error: error.message, isLoading: false});
        }finally {
            set({isLoading: false});
        }
    }
}))