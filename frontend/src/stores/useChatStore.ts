import {create} from "zustand";
import  api  from "@/lib/axios";



interface ChatStore {
    users : any[];
    isLoading : boolean;
    error : string | null;
    fetchUser : () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
    users : [],
    isLoading : false,
    error : null,
    fetchUser : async () => {
        set({isLoading:true, error:null});
        try {
            const response = await api.get("/users");
            set({ users: response.data });
        } catch (error) {
            set({ error: "Failed to fetch users" });
            console.error("Error fetching users:", error);
        } finally {
            set({isLoading:false});
        }
    }
}));