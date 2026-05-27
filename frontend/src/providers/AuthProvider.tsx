import {useAuth} from "@clerk/clerk-react"
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";

const updateApiToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const {getToken,userId} = useAuth();
    const {checkAdminStatus} = useAuthStore();
    const [loading,setLoading] = useState(true);
    const {initSocket,disconnectSocket} = useChatStore();
    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
                console.log("User ID:", userId);
                if(token && userId) {
                    await checkAdminStatus();
                    initSocket(userId);
                }
            } catch (error) {
                updateApiToken(null);
                console.error("Error fetching token:", error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
        return () => {
            disconnectSocket();
        };
    }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);
    if (loading) {
        return <div className="h-screen w-full flex items-center justify-center">
            <Loader className="size-12 text-emerald-600 animate-spin drop-shadow-md" />

            </div>;
    }

    
  return (
    <div>
        {children}
    </div>
  );
};

export default AuthProvider;