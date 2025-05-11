import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const BASE_URL = "http://localhost:8001"
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isLogout: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("user/check");
      // console.log(res, "**************")
      set({ authUser: res?.data?.user });
      get().connectSocket()
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },


  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/signup", data);
      set({ authUser: res?.data?.user });
      toast.success(res?.data?.message);
      get().connectSocket()
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/user/login", data);
      set({ authUser: res?.data?.user });

      toast.success(res?.data?.message);
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.get("/user/logout");
      set({ authUser: null });
      toast.success(res?.data?.message);
      get().disConnectSocket()
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },

  updateProfile: async (formData) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/user/update-profile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ authUser: res?.data?.user });
      toast.success(res?.data?.message);
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id
      }
    })
    socket.connect(socket);
    set({ socket: socket })

    socket.on("getOnlineUsers", (userId) => {
      // console.log(userId,"userId***************")
      set({ onlineUsers: userId })
    })
  },
  disConnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  }

}))  
