import "./App.css";

import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/home/HomePage.tsx";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage.tsx";
import ChatPage from "./pages/chat/ChatPage.tsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

import MainLayout from "./layout/MainLayout.jsx";

function App() {
  return (
    <Routes>
      {/* Clerk Callback */}
      <Route
        path="/sso-callback"
        element={
          <AuthenticateWithRedirectCallback
            signInForceRedirectUrl="/auth-callback"
          />
        }
      />

      {/* Auth Callback */}
      <Route
        path="/auth-callback"
        element={<AuthCallbackPage />}
      />

      {/* Layout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
}

export default App;