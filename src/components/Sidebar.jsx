import { Users } from 'lucide-react'
import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import profile from "../assets/profile.png"
import SidebarSkeleton from './SidebarSkeleton';
import { useAuthStore } from '../store/useAuthUser';


function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore()

  useEffect(() => {
    getUsers();
  }, [getUsers])

  if (isUsersLoading) return <SidebarSkeleton />

  console.log(onlineUsers, "*******onlineUsers********")
  return (
    <aside className="h-full w-80 flex flex-col transition-all duration-200 shadow-lg">
      <div className="w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 custom-scrollbar">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-[#93c5fd] cursor-pointer transition-colors
              `}
          >
            <div className="relative ">
              <img
                src={user?.image || profile}
                alt={user?.name}
                className="size-12 object-cover rounded-full"
              />
              {Array.isArray(onlineUsers) && onlineUsers.includes(user?._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-green-500" />
              )}

              {/* <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-green-500" /> */}

            </div>

            <div className="text-left min-w-0">
              <div className="font-medium truncate text-xl">{user?.name}</div>
              <div className="text-md text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
