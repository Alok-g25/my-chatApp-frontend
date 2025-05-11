import React from 'react'
import Sidebar from '../components/Sidebar'
import { useChatStore } from '../store/useChatStore'
import SkeltonHomePage from '../components/SkeltonHomePage'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  const { selectedUser } = useChatStore()
  return (
    <div className="h-screen" style={{ backgroundColor: "#d2e0f7" }}>
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="text-black rounded-lg shadow-cl w-full h-[calc(100vh-80px)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {selectedUser ? <ChatContainer /> :<SkeltonHomePage />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage






