import {create} from 'zustand';
import  api  from '@/lib/axios';

interface MusicStore {
    albums: any[];
    songs: any[];
    isLoading: boolean;
    error: string | null;
    fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs:[],
    isLoading: false,
    error: null,
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
    }
}))