import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import ChatBubble from "./ChatBubble";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
        <ChatHeader />
        <MessageSkeleton />
        <div className="mt-auto">
          <MessageInput />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 transition-colors duration-300">
      <ChatHeader />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 custom-scrollbar bg-slate-50/50 dark:bg-dark-surface/30">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-40 select-none">
            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <span className="text-4xl">👋</span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              No messages yet. Send a greeting to {selectedUser.fullName.split(' ')[0]}!
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatBubble key={message._id} message={message} />
        ))}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

