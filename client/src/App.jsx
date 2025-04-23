import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";

import "./App.css";

import { Toaster } from "react-hot-toast";

// state
import { useAuthStore } from "./store/useAuthStore";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import SignUpPage from "./pages/SignUpPage";

//components
import Navbar from "./components/Navbar";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/signUp"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route path="/settings" element={<SettingPage />} />

        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
