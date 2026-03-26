import { MessageSquare, Shield, Zap, Image as ImageIcon } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-dark-surface/30 p-8 text-center animate-in fade-in duration-700">
      <div className="max-w-md w-full space-y-8">
        {/* Animated Illustration Area */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-sky-500/20 to-sky-400/20 flex items-center justify-center animate-bounce duration-[2000ms]">
              <MessageSquare className="w-12 h-12 text-sky-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center animate-pulse">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
            Select a conversation
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Welcome to <span className="text-sky-500 font-bold tracking-tight">ChatVibe</span>. Select a friend from the sidebar to start a secure, real-time conversation.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center gap-2">
            <Shield className="w-5 h-5 text-sky-500" />
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">Secure</span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center gap-2">
            <ImageIcon className="w-5 h-5 text-sky-500" />
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">Media</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
