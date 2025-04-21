import { useState } from "react";
import { Routes, Route } from "react-router";

import "./App.css";

// state
import { useAuthStore } from "./store/useAuthStore";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const { authUser } = useAuthStore();
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <h1 className="bg-amber-500">sdh</h1>
    </>
  );
}

export default App;
