import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";

import { Loader2 } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Apply dark mode class to document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-dark-surface transition-colors duration-500">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-sky-500" />
          <div className="absolute inset-0 bg-sky-500/20 blur-xl animate-pulse -z-10" />
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="h-full bg-slate-50 dark:bg-dark-surface transition-colors duration-500">
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: theme === "dark" ? "#1e293b" : "#fff",
              color: theme === "dark" ? "#f1f5f9" : "#0f172a",
              borderRadius: "20px",
              border: theme === "dark" ? "1px solid #334155" : "1px solid #f1f5f9",
              padding: "16px 24px",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
};


export default App;
