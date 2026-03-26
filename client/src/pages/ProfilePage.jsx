import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail, Loader2, Calendar, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-slate-50 dark:bg-dark-surface transition-colors duration-500 px-4">
      <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-500 transition-colors font-bold text-sm group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Chats
          </Link>
          <div className="px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-bold uppercase tracking-widest">
            Profile Settings
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 overflow-hidden">
          {/* Profile Banner */}
          <div className="h-44 bg-gradient-to-tr from-sky-600 via-sky-500 to-sky-400 relative">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="relative group">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-[40px] object-cover border-8 border-white dark:border-slate-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 text-sky-500 hover:text-sky-600 flex items-center justify-center cursor-pointer shadow-xl transition-all hover:scale-110 active:scale-95 ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                >
                  <Camera size={20} />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Profile Bio Section */}
          <div className="pt-20 px-8 md:px-12 pb-12 text-center border-b border-slate-100 dark:border-slate-800/50">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {authUser?.fullName}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium flex items-center justify-center gap-2">
              {isUpdatingProfile ? (
                 <span className="text-sky-500 animate-pulse flex items-center gap-2">
                   <Loader2 size={16} className="animate-spin" />
                   Updating your look...
                 </span>
              ) : (
                <>
                  <ShieldCheck size={16} className="text-green-500" />
                  Verified Member
                </>
              )}
            </p>
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="group">
                <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1 mb-2 block">
                  Full Name
                </label>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all group-hover:border-sky-500/30 group-hover:bg-white dark:group-hover:bg-slate-800">
                  <User size={20} className="text-sky-500" />
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{authUser?.fullName}</span>
                </div>
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1 mb-2 block">
                  Email Address
                </label>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all group-hover:border-sky-500/30 group-hover:bg-white dark:group-hover:bg-slate-800">
                  <Mail size={20} className="text-sky-500" />
                  <span className="text-slate-800 dark:text-slate-200 font-bold truncate">{authUser?.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-[32px] bg-slate-900 dark:bg-slate-800 text-white shadow-xl">
                 <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                   <Calendar size={14} />
                   Account Statistics
                 </h3>
                 <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <span className="text-slate-400 text-sm font-medium">Joined Platform</span>
                     <span className="font-bold text-sky-400">{authUser.createdAt?.split("T")[0]}</span>
                   </div>
                   <div className="h-px bg-slate-800 dark:bg-slate-700" />
                   <div className="flex justify-between items-center">
                     <span className="text-slate-400 text-sm font-medium">Profile Visibility</span>
                     <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-full uppercase tracking-widest border border-green-500/20">
                       Public
                     </span>
                   </div>
                   <div className="h-px bg-slate-800 dark:bg-slate-700" />
                   <div className="flex justify-between items-center">
                     <span className="text-slate-400 text-sm font-medium">Security Status</span>
                     <span className="text-sky-500 text-sm font-bold">Encrypted</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

