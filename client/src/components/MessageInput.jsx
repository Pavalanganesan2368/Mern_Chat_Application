import { useRef, useState, useCallback } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Image, Send, X, Smile, Loader2, Paperclip } from "lucide-react";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import { useThemeStore } from "../store/useThemeStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const { sendMessage, selectedUser } = useChatStore();
  const { socket } = useAuthStore();
  const { theme } = useThemeStore();

  const handleTyping = useCallback(() => {
    if (socket && selectedUser) {
      socket.emit("typing", { receiverId: selectedUser._id });
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stopTyping", { receiverId: selectedUser._id });
      }, 1500);
    }
  }, [socket, selectedUser]);

  const handleImageChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => {
    handleImageChange(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    setIsSending(true);
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setShowEmojiPicker(false);
      if (socket && selectedUser) {
        socket.emit("stopTyping", { receiverId: selectedUser._id });
      }
    } catch {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const addEmoji = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-slate-100 dark:border-slate-800">
      {/* File Preview area */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Emoji Picker container */}
      {showEmojiPicker && (
        <div className="absolute bottom-24 left-4 z-50 animate-in fade-in zoom-in-95 duration-200 shadow-2xl rounded-2xl overflow-hidden">
          <EmojiPicker
            theme={theme}
            onEmojiClick={addEmoji}
            lazyLoadEmojis={true}
          />
        </div>
      )}



      {/* Input row */}
      <form onSubmit={handleSendMessage} className="flex items-end gap-2 max-w-5xl mx-auto">
        <div className={`flex-1 flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl px-3 py-2 transition-all ${isDragging ? 'ring-2 ring-sky-500' : ''}`}
             onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
          
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`p-2 rounded-xl transition-colors ${showEmojiPicker ? 'text-sky-500 bg-sky-50 dark:bg-sky-500/10' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
          >
            <Smile size={20} />
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <Paperclip size={20} />
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileInput} />
          </button>

          <textarea
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 resize-none max-h-32 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            placeholder={isDragging ? "Drop image here..." : "Type a message..."}
            rows={1}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleTyping();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
        </div>

        <button
          type="submit"
          disabled={(!text.trim() && !imagePreview) || isSending}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-95 ${
            (text.trim() || imagePreview) && !isSending
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30 hover:bg-sky-600"
              : "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed"
          }`}
        >
          {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className={text.trim() || imagePreview ? "translate-x-0.5 -translate-y-0.5 rotate-[-15deg]" : ""} />}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

