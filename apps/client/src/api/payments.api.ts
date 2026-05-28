import { apiClient } from "./client";
import { unwrapData, unwrapList } from "@/lib/api-response";
import type { CheckoutSessionResponse, CreateCheckoutInput, Payment } from "@/types/payment.types";

export const paymentsApi = {
  createCheckout(input: CreateCheckoutInput) {
    return apiClient.post<CheckoutSessionResponse>("/payments/checkout", input).then(unwrapData);
  },

  myPayments() {
    return apiClient.get<Payment[]>("/payments/my").then(unwrapList);
  },
};
