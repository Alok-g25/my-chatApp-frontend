import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthUser";
import { useChatStore } from "../store/useChatStore";
import profile from "../assets/profile.png"


const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-gray-400">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-14 object-cover rounded-full relative">
              <img className="size-14 object-cover rounded-full" src={selectedUser?.image || profile} alt={selectedUser?.name} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-bold+ text-2xl">{selectedUser?.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? <span className="text-emerald-500 font-bold">Online</span> : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button className="cursor-pointer" onClick={() => setSelectedUser(null)}>
          <X  className="size-6"/>
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
