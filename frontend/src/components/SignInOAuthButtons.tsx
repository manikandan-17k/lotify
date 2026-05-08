import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  const signInWithGoogle = async () => {
    if (!isLoaded) return;

    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      disabled={!isLoaded}
      variant="secondary"
      className="w-full text-white border-zinc-200 h-11"
    >
      {!isLoaded ? "Loading..." : "Continue with Google"}
    </Button>
  );
};

export default SignInOAuthButtons;