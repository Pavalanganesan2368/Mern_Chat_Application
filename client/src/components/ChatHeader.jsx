import { ChevronLeft, MoreVertical, Phone, Video } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, typingUsers } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);
  const isTyping = typingUsers[selectedUser._id];

  return (
    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        {/* Back Button (Mobile) */}
        <button
          onClick={() => setSelectedUser(null)}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Avatar */}
        <div className="relative">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800"
          />
          {isOnline && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
          )}
        </div>

        {/* User Info */}
        <div className="min-w-0">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 truncate tracking-tight uppercase text-xs">
            {selectedUser.fullName}
          </h3>
          <div className="h-4 flex items-center">
            {isTyping ? (
              <span className="text-[11px] text-sky-500 font-bold flex items-center gap-1.5">
                typing
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-sky-500 typing-dot" />
                  <span className="w-1 h-1 rounded-full bg-sky-500 typing-dot" />
                  <span className="w-1 h-1 rounded-full bg-sky-500 typing-dot" />
                </span>
              </span>
            ) : isOnline ? (
              <span className="text-[11px] text-green-500 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Online
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 font-medium">Offline</span>
            )}
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-xl text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-all">
          <Phone size={18} />
        </button>
        <button className="p-2 rounded-xl text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-all">
          <Video size={18} />
        </button>
        <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ml-1">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

