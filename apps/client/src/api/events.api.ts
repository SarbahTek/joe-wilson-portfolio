import { apiClient } from "./client";
import { unwrapList } from "@/lib/api-response";
import type { Event } from "@/types/content.types";

export const eventsApi = {
  list() {
    return apiClient.get<Event[]>("/events").then(unwrapList);
  },
};
