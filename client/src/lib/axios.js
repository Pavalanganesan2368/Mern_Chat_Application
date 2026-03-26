import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://mern-stack-chat-application-wntn.onrender.com/api" : "http://localhost:5001/api",
  withCredentials: true,
});
