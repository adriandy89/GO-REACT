import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Intercept  GET
api.interceptors.request.use((config) => {
  if (config.method === "get") {
    config.params = {
      ...config.params,
      _: new Date().getTime(),
    };
  }
  return config;
});

export default api;
