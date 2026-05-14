import { useAuth, SignInButton, SignOutButton, UserButton } from '@clerk/react'
import { Button } from './components/ui/button'
import './App.css'
function App() {
  const { isSignedIn } = useAuth()

  return (
    <>
      <header>
        {!isSignedIn ? (
          <SignInButton>
            <Button>Sign in</Button>
          </SignInButton>
        ) : (
          <>
            <UserButton />
            <SignOutButton>
              <Button>Sign out</Button>
            </SignOutButton>
          </>
        )}
      </header>
    </>
  )
}

export default App