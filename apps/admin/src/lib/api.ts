import type { AxiosResponse } from "axios";

export function dataOf<T>(response: AxiosResponse<{ success?: boolean; data?: T } | T>): T {
  const body = response.data;
  return body && typeof body === "object" && "data" in body ? (body as { data: T }).data : body as T;
}
