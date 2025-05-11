const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              <div className="text-black bg-[#a2bff0] w-full h-full rounded-full" />
            </div>
          </div>

          <div className="chat-header mb-1">
            <div className="text-black bg-[#a2bff0] h-4 w-16" />
          </div>
          <div className="p-0 text-black bg-[#a2bff0] flex flex-col">
            <div className="h-16 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
