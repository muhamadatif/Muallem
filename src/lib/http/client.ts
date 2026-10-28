import axios from "axios";

const PUBLIC_ENDPOINTS = [
  "/api/auth/send-otp",
  "/api/auth/verify-otp",
  "/api/auth/external-login",
];

const api = axios.create({
  baseURL: "",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  (config.headers as Record<string, string>)["ngrok-skip-browser-warning"] = "true";
  return config;
});

api.interceptors.request.use(async (config) => {
  const url = config.url || "";
  const isPublic = PUBLIC_ENDPOINTS.some((path) => url.startsWith(path));
  if (!isPublic) {
    if (typeof window !== "undefined") {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers = config.headers || {};
          (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
        }
      } catch {}
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const data = response.data as any;
    if (data && typeof data === "object" && "isSuccess" in data) {
      if (data.isSuccess) {
        response.data = data.data;
      } else {
        return Promise.reject({
          response: { data, status: response.status },
        });
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
