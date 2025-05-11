import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthUser";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/user/all");
      set({ users: res?.data?.users });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/all/${userId}`);
      set({ messages: res?.data?.messages });
    } catch (error) {
      console.log(error?.response?.data?.message)
      set({ messages: [] });
      // toast.error(error?.response?.data?.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    console.log(messageData)
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/create/${selectedUser._id}`, messageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ messages: [...messages, res?.data?.message] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get()
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      // const isMessageSentFromSelector = newMessage.senderId === selectedUser?.id;
      // if (!isMessageSentFromSelector) return;
      set({ messages: [...get().messages, newMessage] })
    })
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage")
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

}));
