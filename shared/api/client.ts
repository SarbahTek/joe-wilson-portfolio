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

/* Refresh state belongs to each client, so separate API hosts cannot share tokens. */
export function createApiClient({ baseURL, loginPath = "/login" }: ApiClientOptions) {
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
      const isPublicAuthRequest = /^\/auth\/(login|register|refresh|forgot-password|reset-password)\/?$/.test(originalRequest?.url ?? "");

      if (status !== 401 || !originalRequest || isPublicAuthRequest || !originalRequest.headers.Authorization) {
        return Promise.reject(parseApiError(error));
      }
      if (originalRequest._retry) {
        redirectToLogin();
        return Promise.reject(parseApiError(error));
      }

      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) {
        redirectToLogin();
        return Promise.reject(parseApiError(error));
      }

      originalRequest._retry = true;
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

      isRefreshing = true;

      try {
        const response = await axios.post<SuccessResponse<LoginResponse> | LoginResponse>(
          `${baseURL}/auth/refresh`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" }, timeout: 30_000 },
        );
        const data = unwrapData(response);
        const accessToken = data.accessToken;
        const newRefreshToken = data.refreshToken ?? refreshToken;
        if (!accessToken || typeof accessToken !== "string") {
          throw new Error("The server returned an invalid session. Please try again.");
        }
        tokenStorage.setTokens(accessToken, newRefreshToken);
        processQueue(null, accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        processQueue(parseApiError(refreshError), null);
        const refreshStatus = (refreshError as AxiosError).response?.status;
        if (refreshStatus === 401 || refreshStatus === 403) redirectToLogin();
        return Promise.reject(parseApiError(refreshError));
      } finally {
        isRefreshing = false;
      }
    },
  );

  return client;
}
