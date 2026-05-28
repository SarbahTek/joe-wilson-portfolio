import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "../lib/token-storage";
import { parseApiError } from "../lib/errors";
import type { LoginResponse } from "../types/auth.types";
import type { SuccessResponse } from "../types/api.types";
import { unwrapData } from "../lib/api-response";

export interface ApiClientOptions {
  /**
   * The versioned API base URL, e.g. "/v1" (dev proxy) or "https://api.domain.com/v1".
   * Each app provides its own based on its Vite env vars.
   */
  baseURL: string;
  /** Path to redirect on auth failure (default: "/login") */
  loginPath?: string;
}

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

/**
 * Creates a configured axios instance with JWT auth, token refresh,
 * and redirect-to-login on 401.
 *
 * Usage:
 *   import { createApiClient } from "@shared/api/client";
 *   export const apiClient = createApiClient({ baseURL: import.meta.env.DEV ? "/v1" : `${VITE_API_BASE_URL}/v1` });
 */
export function createApiClient({ baseURL, loginPath = "/login" }: ApiClientOptions) {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: 30_000,
  });

  function redirectToLogin() {
    tokenStorage.clear();
    const isAuthPage = window.location.pathname.startsWith(loginPath);
    if (!isAuthPage) {
      const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `${loginPath}?returnUrl=${returnUrl}`;
    }
  }

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
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
              resolve(client(originalRequest));
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
        return client(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        redirectToLogin();
        return Promise.reject(parseApiError(refreshError));
      } finally {
        isRefreshing = false;
      }
    },
  );

  return client;
}
