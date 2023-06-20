import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
export const HTTP = axios.create({});

HTTP.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
