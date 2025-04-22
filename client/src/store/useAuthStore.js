import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import SignUpPage from "../pages/SignUpPage.jsx";

export const useAuthStore = create((set) => ({
  authUser: null, //Jab user login nahi hai, to authUser null hota hai. Jab login ho jaata hai, to isme user ka data aa jaata hai.
  isSigningUp: false, // Jab signup process chal raha hota hai (jaise form submit hua), to isSigningUp ko true karte hain. Jab khatam ho jaata hai, firse false.
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true, //  App start hote hi check karta hai "kya user already login hai?" Us waqt isCheckingAuth: true. Jab check complete ho jaata hai, isCheckingAuth: false.

  checkAuth: async (req, res) => {
    try {
      const response = axiosInstance.get("/auth/check");
      set({ authUser: response.data, isCheckingAuth: false });
    } catch (error) {
      console.error("Error checking authentication:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  SignUp: async (data) => {
    const response = await axiosInstance.post("/auth/signup", {
      fullName,
      email,
      password,
    });
    set({ authUser: response.data, isSigningUp: false });

  },
}));

// State | Purpose
// false | Default idle state (kuch nahi ho raha)
// true | Process in progress (loading dikhao)
// null | Data abhi nahi mila (ya logout ho gaya)
