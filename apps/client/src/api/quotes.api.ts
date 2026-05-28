import { apiClient } from "./client";
import { unwrapData } from "@/lib/api-response";
import type { Quote, SubmitQuoteInput } from "@/types/content.types";

export const quotesApi = {
  submit(input: SubmitQuoteInput) {
    return apiClient.post<Quote>("/quotes", input).then(unwrapData);
  },
};
