import { useSignIn } from '@clerk/react';
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  const { signIn, fetchStatus } = useSignIn();

  const signInWithGoogle = async () => {
    if (fetchStatus === 'fetching') return; // prevent double clicks

    const { error } = await signIn.sso({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectCallbackUrl: "/auth-callback",
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={() => {alert("Signing in with Google..."); signInWithGoogle;}}
      disabled={fetchStatus === 'fetching'}
      variant={"secondary"}
      className='w-full text-white border-zinc-200 h-11'
    >
      {fetchStatus === 'fetching' ? 'Redirecting...' : 'Continue with Google'}
    </Button>
  );
};

export default SignInOAuthButtons;