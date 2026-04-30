import './App.css'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Button } from './components/ui/button'
function App() {
  return (
    <>
     <h1 className='text-red-500 text-5xl'>Hello,Developer!</h1>
      <header>
        <Show when="signed-out">
          <SignInButton> 
              <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton>
             <Button variant="outline">Sign Up</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
     
    </>
  )
}

export default App