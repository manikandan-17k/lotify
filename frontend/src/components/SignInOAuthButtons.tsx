import { useSignIn } from '@clerk/react';
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
	console.log("Rendering SignInOAuthButtons");
	const { signIn } = useSignIn();
	const signInWithGoogle = async () => {
		if (!signIn) {
			console.log("SignIn not ready yet");
			return;
		}

		try {
			await signIn.sso({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectCallbackUrl: "/auth-callback",
			});
		} catch (err) {
			console.error("OAuth error:", err);
		}
		};

	return (
		<Button
			onClick={async()=>{alert("Signing in with Google..."); await signInWithGoogle;}}
			variant="secondary"
			className="w-full h-11 flex items-center justify-center gap-2 
						text-white border border-zinc-200"
			>
			<span>Continue with Google</span>
			</Button>
		); 

};
export default SignInOAuthButtons;