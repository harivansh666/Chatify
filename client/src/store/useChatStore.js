import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
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
      const response = await axiosInstance.get(`/message/${userId}`);
      set({ message: response.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (MessageData) => {
    const { selectedUser, message } = get();
    try {
      const response = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,

        MessageData
      );
      set({ message: [...message, response.data] });
    } catch (error) {
      toast.error("Somthing Went Wrong");
      console.log(error);
    }
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  formatMessageTime: () => {},
}));
