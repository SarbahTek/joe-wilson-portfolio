import { apiClient } from "./client";
import { unwrapList } from "@/lib/api-response";
import type { Testimonial } from "@/types/content.types";

export const testimonialsApi = {
  list() {
    return apiClient.get<Testimonial[]>("/testimonials").then(unwrapList);
  },
};
