import { useMutation } from "@tanstack/react-query";
import { inquiriesApi } from "@/api/inquiries.api";
import type { SubmitInquiryInput } from "@/types/content.types";

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: (input: SubmitInquiryInput) => inquiriesApi.submit(input),
  });
}
