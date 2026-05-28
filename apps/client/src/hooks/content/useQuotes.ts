import { useMutation } from "@tanstack/react-query";
import { quotesApi } from "@/api/quotes.api";
import type { SubmitQuoteInput } from "@/types/content.types";

export function useSubmitQuote() {
  return useMutation({
    mutationFn: (input: SubmitQuoteInput) => quotesApi.submit(input),
  });
}
