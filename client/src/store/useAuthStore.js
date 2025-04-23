import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null, //Jab user login nahi hai, to authUser null hota hai. Jab login ho jaata hai, to isme user ka data aa jaata hai.
  isSigningUp: false, // Jab signup process chal raha hota hai (jaise form submit hua), to isSigningUp ko true karte hain. Jab khatam ho jaata hai, firse false.
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true, //  App start hote hi check karta hai "kya user already login hai?" Us waqt isCheckingAuth: true. Jab check complete ho jaata hai, isCheckingAuth: false.

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check", {
        withCredentials: true,
      });

      set({ authUser: response.data });
    } catch (error) {
      console.error("Error checking authentication:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  SignUp: async (data) => {
    try {
      set({ isSigningUp: true });
      const { fullName, email, password } = data;
      console.log("Sending signup data:", data);

      const response = await axiosInstance.post("/auth/signup", {
        fullName,
        email,
        password,
      });

      set({ authUser: response.data });

      toast.success("Successfully Signup!");
    } catch {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out succesfully");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(error.response.data.message);
    }
  },
}));

// State | Purpose
// false | Default idle state (kuch nahi ho raha)
// true | Process in progress (loading dikhao)
// null | Data abhi nahi mila (ya logout ho gaya)
