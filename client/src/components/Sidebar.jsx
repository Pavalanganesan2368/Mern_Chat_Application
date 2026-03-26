import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, Filter } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOnline = showOnlineOnly ? onlineUsers.includes(user._id) : true;
    return matchesSearch && matchesOnline;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900 transition-all duration-300">
      {/* Sidebar Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Users size={20} />
            </div>
            <h2 className="font-bold text-slate-800 dark:text-slate-100 hidden lg:block tracking-tight">
              Messages
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <span>{onlineUsers.length > 0 ? onlineUsers.length - 1 : 0} Online</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative hidden lg:block group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Toggle */}
        <div className="hidden lg:flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setShowOnlineOnly(!showOnlineOnly)}>
            <div className={`w-8 h-4 rounded-full transition-all relative ${showOnlineOnly ? 'bg-sky-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${showOnlineOnly ? 'left-4.5' : 'left-0.5'}`} />
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200">
              Online only
            </span>
          </div>
          <Filter size={14} className="text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pt-2 space-y-0.5 px-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 relative group ${
              selectedUser?._id === user._id
                ? "bg-sky-50 dark:bg-sky-500/10 shadow-sm"
                : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
            }`}
          >
            {/* Avatar Section */}
            <div className="relative flex-shrink-0 mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className={`w-12 h-12 rounded-2xl object-cover ring-2 ring-white dark:ring-slate-900 transition-all ${
                  selectedUser?._id === user._id ? "scale-105" : "grayscale-[0.2] group-hover:grayscale-0"
                }`}
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                </span>
              )}
            </div>

            {/* Info Section (lg only) */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <span className={`font-bold transition-colors truncate ${
                  selectedUser?._id === user._id ? "text-sky-600 dark:text-sky-400" : "text-slate-700 dark:text-slate-200"
                }`}>
                  {user.fullName}
                </span>
                <span className="text-[10px] text-slate-400">
                  {onlineUsers.includes(user._id) ? "just now" : ""}
                </span>
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500 truncate flex items-center gap-1">
                {onlineUsers.includes(user._id) ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Available
                  </span>
                ) : (
                  "Offline"
                )}
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedUser?._id === user._id && (
              <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
            )}
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600 mb-3">
              <Users size={24} />
            </div>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500">No contacts found</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

