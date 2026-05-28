import { apiClient } from "./client";
import { unwrapData } from "@/lib/api-response";
import type { SettingsMap } from "@/types/content.types";

export const settingsApi = {
  getPublic() {
    return apiClient.get<SettingsMap>("/settings/public").then(unwrapData);
  },
};
