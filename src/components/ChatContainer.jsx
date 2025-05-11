import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import profile from "../assets/profile.png"
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "../store/useAuthUser";
import { formatMessageTime } from "../lib/FormatMessageTime";
import { MessageSquare } from "lucide-react";


const ChatContainer = () => {

  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages()
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, unsubscribeFromMessages, subscribeToMessages]);



  useEffect(() => {
    if (!messages || messages.length === 0) return;

    const images = document.querySelectorAll(".message-container img");

    if (images.length === 0) {
      // No images, scroll immediately
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      let loadedCount = 0;
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
          if (loadedCount === images.length) {
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }
          };
        }
      });
    }
  }, [messages]);
  ;

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto custom-scrollbar">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  // console.log(messages, "**************")
  return (
    <div className="flex-1 flex flex-col overflow-auto custom-scrollbar">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {
          authUser && messages.length > 0 ? (messages.map((message) => (
            <div
              key={message?._id}
              className={`chat message-container ${message?.senderId?.toString() === authUser?._id?.toString() ? "chat-end" : "chat-start"
                }`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-8 rounded-full border border-white">
                  <img
                    src={
                      message?.senderId === authUser?._id
                        ? authUser?.profilePic || profile
                        : selectedUser?.profilePic || profile
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {message?.messageFile && (
                  <img
                    src={message?.messageFile}
                    alt="Attachment"
                    className="sm:max-w-[250px] rounded-md object-fit-cover"
                  />
                )}

                {message.text && (
                  <div className="chat-bubble text-black bg-[#a2bff0] py-1 px-2">
                    <p className="text-lg">{message.text}</p>
                  </div>
                )}
              </div>

              <div className="chat-footer mb-1">
                <time className="text-[10px] opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
          ))) :
            (
              <div className="flex h-full justify-center items-center flex-col">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce" >
                  <MessageSquare className="w-12 h-12 text-primary " />
                </div>
                <p className="text-lg font-medium">No messages yet</p>
                <p className="text-sm">Start the conversation now!</p>
              </div>
            )
        }
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
