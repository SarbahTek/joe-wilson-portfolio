import { createApiClient } from "@joe-wilson/shared/api/client";

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

export const apiClient = createApiClient({ baseURL });
