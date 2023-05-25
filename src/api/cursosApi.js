import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = "http://localhost:3000/api";

export const cursosApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

cursosApi.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
