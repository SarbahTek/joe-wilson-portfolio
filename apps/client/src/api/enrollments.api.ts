import { apiClient } from "./client";
import { unwrapList } from "@/lib/api-response";
import type { Enrollment } from "@/types/masterclass.types";

export const enrollmentsApi = {
  myEnrollments() {
    return apiClient.get<Enrollment[]>("/enrollments/my").then(unwrapList);
  },
};
