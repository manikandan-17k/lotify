import {create} from 'zustand';
import  api  from "@/lib/axios";

interface Authstore{
    isLoading: boolean;
    isAdmin: boolean;
    error : string | null;
    checkAdminStatus: () => Promise<void>;
    reset:()=>void;
}

export const useAuthStore = create<Authstore>((set) => ({
    isLoading: false,
    isAdmin: false,
    error: null,
    checkAdminStatus: async () => {
        set({isLoading: true, error: null});
        try {
            const response = await api.get('/auth/check');
            set({isAdmin: response.data.admin});
        } catch (error: any) {
            set({isLoading: false, error: error.response?.data?.message || 'Failed to check admin status'});
        } finally {
            set({isLoading: false});
        }
    },
    reset: () => {
        set({isLoading: false, isAdmin: false, error: null});
    }
}));