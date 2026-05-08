import { Loader } from "lucide-react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import api from "@/lib/axios";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const { getToken } = useAuth();  // ← get token manually
  const navigate = useNavigate();
  const syncAttempted = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempted.current) return;

      try {
        syncAttempted.current = true;

        // ← manually set token before API call
        const token = await getToken();
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        await api.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress, // ← also send email
        });

      } catch (error) {
        console.log("Error in auth callback", error);
      } finally {
        navigate("/");  // always redirect home
      }
    };

    syncUser();
  }, [isLoaded, user, navigate, getToken]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Loader className="size-8 text-emerald-500 animate-spin" />  {/* ← show spinner */}
    </div>
  );
};

export default AuthCallbackPage;