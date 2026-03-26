import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { MessageSquare, Sun, Moon, LogOut, User as UserIcon } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-2xl glass shadow-sm transition-all duration-300">
      <div className="mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-sky-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            ChatVibe
          </span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {authUser && (
            <div className="flex items-center gap-2 ml-2 pl-4 border-l border-slate-200 dark:border-slate-800">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-1 py-1 rounded-full group hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <div className="relative">
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full shadow-sm" />
                </div>
                <span className="hidden md:inline text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-sky-500">
                  {authUser.fullName.split(" ")[0]}
                </span>
              </Link>

              <button
                onClick={logout}
                className="p-2.5 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all active:scale-95 group"
                title="Logout"
              >
                <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
