import type { AxiosResponse } from "axios";
import type { PaginatedResponse, SuccessResponse } from "../types/api.types";

/** Unwrap `{ success, data }` or return raw payload when backend omits the envelope. */
export function unwrapData<T>(response: AxiosResponse<SuccessResponse<T> | T>): T {
  const payload = response.data;
  if (payload && typeof payload === "object" && "data" in payload && "success" in payload) {
    return (payload as SuccessResponse<T>).data;
  }
  return payload as T;
}

export function unwrapList<T>(response: AxiosResponse<PaginatedResponse<T> | SuccessResponse<T[]> | T[]>): T[] {
  const payload = response.data;
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && typeof payload === "object") {
    if ("data" in payload && Array.isArray((payload as SuccessResponse<T[]>).data)) {
      return (payload as SuccessResponse<T[]>).data;
    }
  }
  return [];
}
