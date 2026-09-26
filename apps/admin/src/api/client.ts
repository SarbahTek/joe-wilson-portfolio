import { createApiClient } from "@joe-wilson/shared/api/client";

const host = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
export const apiClient = createApiClient({
  baseURL: import.meta.env.DEV ? "/v1" : `${host}/v1`,
  loginPath: "/login",
});
