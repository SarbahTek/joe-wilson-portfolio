import { apiClient } from "./client";
import { unwrapData } from "@/lib/api-response";
import type { Quote, SubmitQuoteInput } from "@/types/content.types";
import { servicesApi } from "./services.api";

export const quotesApi = {
  async submit(input: SubmitQuoteInput) {
    const service = await servicesApi.getBySlug(input.service);
    if (!service?.id) throw new Error("This service is not available for quotes yet. Please contact us directly.");
    const amounts = input.budgetRange?.match(/\d[\d,]*(?:\.\d{1,2})?/g)?.map(value => Math.round(Number(value.replaceAll(",", "")) * 100));
    return apiClient.post<Quote>("/quotes", {
      serviceId: service.id,
      clientName: input.fullName,
      clientEmail: input.email,
      eventDate: input.eventDate ? new Date(`${input.eventDate}T12:00:00`).toISOString() : undefined,
      eventType: input.eventType,
      budgetMinCents: amounts?.[0],
      budgetMaxCents: amounts?.[1],
      projectNotes: input.notes,
    }).then(unwrapData);
  },
};
