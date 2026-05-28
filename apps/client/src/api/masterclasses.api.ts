import { apiClient } from "./client";
import { unwrapData, unwrapList } from "@/lib/api-response";
import type { Masterclass, MasterclassWithSessions, Session } from "@/types/masterclass.types";

export const masterclassesApi = {
  list() {
    return apiClient.get<Masterclass[]>("/masterclasses").then(unwrapList);
  },

  getById(id: string) {
    return apiClient.get<MasterclassWithSessions>(`/masterclasses/${id}`).then(unwrapData);
  },

  getSessions(masterclassId: string) {
    return apiClient.get<Session[]>(`/masterclasses/${masterclassId}/sessions`).then(unwrapList);
  },
};
