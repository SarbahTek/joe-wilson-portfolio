import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "@/lib/token-storage";
import { parseApiError } from "@/lib/errors";
import type { LoginResponse } from "@/types/auth.types";
import type { SuccessResponse } from "@/types/api.types";
import { unwrapData } from "@/lib/api-response";

const apiHost = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";

/**
 * In dev, requests go to `/v1` and Vite proxies them to Railway (avoids CORS).
 * In production, requests go directly to `VITE_API_BASE_URL/v1`.
 */
export const baseURL = import.meta.env.DEV ? "/v1" : `${apiHost}/v1`;

if (!apiHost && !import.meta.env.DEV) {
  console.error(
    "[API] VITE_API_BASE_URL is not set. Add it to .env for production builds.",
  );
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30_000,
});

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  refreshQueue = [];
}

function redirectToLogin() {
  tokenStorage.clear();
  const loginPath = "/login";
  const isAuthPage = window.location.pathname.startsWith(loginPath);
  if (!isAuthPage) {
    const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `${loginPath}?returnUrl=${returnUrl}`;
  }
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    if (status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(parseApiError(error));
    }

    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      redirectToLogin();
      return Promise.reject(parseApiError(error));
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await axios.post<SuccessResponse<LoginResponse> | LoginResponse>(
        `${baseURL}/auth/refresh`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } },
      );
      const data = unwrapData(response);
      const accessToken = data.accessToken;
      const newRefreshToken = data.refreshToken;
      tokenStorage.setTokens(accessToken, newRefreshToken);
      processQueue(null, accessToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      redirectToLogin();
      return Promise.reject(parseApiError(refreshError));
    } finally {
      isRefreshing = false;
    }
  },
);
