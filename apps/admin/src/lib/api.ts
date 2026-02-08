import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const isAxiosError = axios.isAxiosError;

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let isRefreshing = false;
let refreshQueue: ((token: string | null) => void)[] = [];

const processQueue = (token: string | null) => {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // refresh 요청 자체가 401이면 → 로그아웃
    if (originalRequest.url?.includes("/api/auth/refresh")) {
      useAuthStore.getState().clearAuth();
      window.location.href = "/auth/signin";
      return Promise.reject(error);
    }

    // 이미 재시도한 요청이면 차단
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // refresh 중이면 큐에 쌓기
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push((token) => {
          if (!token) return reject(error);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        {},
        { withCredentials: true }
      );
      const { accessToken } = res.data;
      useAuthStore.getState().setAccessToken(accessToken);

      processQueue(accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(null);
      useAuthStore.getState().clearAuth();
      window.location.href = "/auth/signin";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
