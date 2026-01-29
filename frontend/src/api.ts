import axios from "axios";
export const apiUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

api.interceptors.request.use((config) => {
  const userDataStr = localStorage.getItem("userData");
  if (userDataStr) {
    const { token } = JSON.parse(userDataStr);
    if (token) {
      // перевірка headers
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});