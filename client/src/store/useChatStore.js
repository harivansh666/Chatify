import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
  message: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await axiosInstance.get("/message/users");
      set({ users: response.data });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const response = await axiosInstance.get(`/api/message/${userId.id}`);
      set({ message: response.data });
    } catch {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));
