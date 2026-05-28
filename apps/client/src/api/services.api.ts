import { apiClient } from "./client";
import { unwrapData, unwrapList } from "@/lib/api-response";
import type { Service } from "@/types/content.types";

export const servicesApi = {
  list() {
    return apiClient.get<Service[]>("/services").then(unwrapList);
  },

  getBySlug(slug: string) {
    return apiClient.get<Service>(`/services/${slug}`).then(unwrapData);
  },
};
