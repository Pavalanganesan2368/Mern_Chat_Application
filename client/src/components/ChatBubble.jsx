import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Check, CheckCheck } from "lucide-react";

const ChatBubble = ({ message }) => {
  const { authUser } = useAuthStore();
  const isOwnMessage = message.senderId === authUser._id;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-1 px-2 message-enter`}>
      <div
        className={`relative max-w-[85%] sm:max-w-[70%] lg:max-w-[60%] group ${
          isOwnMessage ? "items-end" : "items-start"
        } flex flex-col`}
      >
        <div
          className={`px-4 py-2.5 shadow-sm transition-all duration-300 ${
            isOwnMessage
              ? "bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-2xl rounded-tr-none"
              : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700/50"
          }`}
        >
          {/* Image Content */}
          {message.image && (
            <div className="mb-2 relative group/img overflow-hidden rounded-xl">
              <img
                src={message.image}
                alt="Attachment"
                className="max-w-full max-h-72 object-cover transition-transform duration-500 group-hover/img:scale-105 cursor-zoom-in"
                onClick={() => window.open(message.image, "_blank")}
              />
              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors" />
            </div>
          )}

          {/* Text Content */}
          {message.text && (
            <p className="text-[14.5px] leading-relaxed break-words font-medium">
              {message.text}
            </p>
          )}

          {/* Metadata Row (Time + Status) */}
          <div className={`flex items-center gap-1.5 mt-1.5 ${isOwnMessage ? "justify-end" : "justify-start"}`}>
            <span
              className={`text-[10px] font-bold ${
                isOwnMessage ? "text-sky-100/80" : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {formatMessageTime(message.createdAt)}
            </span>
            {isOwnMessage && (
              <CheckCheck size={12} className="text-sky-100/80" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;

