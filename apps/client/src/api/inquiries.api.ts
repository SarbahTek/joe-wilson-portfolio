import { apiClient } from "./client";
import { unwrapData } from "@/lib/api-response";
import type { Inquiry, SubmitInquiryInput } from "@/types/content.types";

export const inquiriesApi = {
  submit(input: SubmitInquiryInput) {
    return apiClient.post<Inquiry>("/inquiries", {
      senderName: input.name,
      senderEmail: input.email,
      senderPhone: input.phone,
      message: input.message,
      type: input.type === "BOOKING" ? "booking" : "general",
    }).then(unwrapData);
  },
};
