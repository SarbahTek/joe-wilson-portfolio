import { apiClient } from "./client";
import { unwrapData } from "@/lib/api-response";
import type { Inquiry, SubmitInquiryInput } from "@/types/content.types";

export const inquiriesApi = {
  submit(input: SubmitInquiryInput) {
    return apiClient.post<Inquiry>("/inquiries", input).then(unwrapData);
  },
};
