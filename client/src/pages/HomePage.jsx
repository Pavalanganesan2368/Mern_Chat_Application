import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-slate-50 dark:bg-dark-surface transition-colors duration-500">
      <div className="flex items-center justify-center pt-24 pb-6 px-4 h-full">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 w-full max-w-7xl h-full flex overflow-hidden relative">
          
          {/* Sidebar - responsive width */}
          <div className={`${selectedUser ? "hidden md:flex" : "flex"} h-full`}>
            <Sidebar />
          </div>

          {/* Chat / Welcome Area */}
          <div className={`${!selectedUser ? "hidden md:flex" : "flex"} flex-1 h-full`}>
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

