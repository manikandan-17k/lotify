import { SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";

const Topbar = () => {
  const {isAdmin} = useAuthStore();
  console.log("isAdmin", isAdmin);
 

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900/75 backdrop-blur-md z-10">
      {/* LEFT */}
      <div className="flex gap-2 items-center">
        <span className="text-white font-semibold text-lg truncate">
          Lotify
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {isAdmin ? (
          <>
            <SignOutButton>
              <button className="text-white bg-red-500 px-3 py-1 rounded">
                Logout
              </button>
            </SignOutButton>
            <UserButton />
          </>
        ) : (
          <SignInOAuthButtons />
        )}
      </div>
    </div>
  );
};

export default Topbar;