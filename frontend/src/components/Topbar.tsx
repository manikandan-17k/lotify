import {UserButton } from '@clerk/react'
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import SignInOAuthButtons  from "./SignInOAuthButtons";

const Topbar = () => {
	const isAdmin = true; // Replace with actual logic to determine if the user is an admin
	console.log({ isAdmin });

	return (
		<div
			className="flex items-center justify-between px-6 py-3 sticky top-0 
			bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 z-50"
			>
			{/* LEFT */}
			<div className="flex items-center gap-2 min-w-0">
				<span className="text-white font-semibold text-lg truncate">
				 Lotify
				</span>
			</div>

			{/* RIGHT */}
			<div className="flex items-center gap-3 flex-shrink-0">
				{/* AUTH (hide on small screens) */}
				<div className="hidden sm:block">
				<SignInOAuthButtons />
				</div>

			</div>
			</div>
	);
};
export default Topbar;