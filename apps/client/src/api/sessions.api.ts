import { apiClient } from "./client";
import { unwrapData } from "@/lib/api-response";
import type { SessionDetail, UpdateProgressInput } from "@/types/masterclass.types";

export const sessionsApi = {
  getById(id: string) {
    return apiClient.get<SessionDetail>(`/sessions/${id}`).then(unwrapData);
  },

  updateProgress(id: string, input: UpdateProgressInput) {
    return apiClient.post(`/sessions/${id}/progress`, input).then(unwrapData);
  },
};
