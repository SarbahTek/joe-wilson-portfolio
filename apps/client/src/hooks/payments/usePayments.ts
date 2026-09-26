import { useMutation, useQuery } from "@tanstack/react-query";
import { paymentsApi } from "@/api/payments.api";
import { queryKeys } from "@/lib/query-keys";
import { formatPaymentAmount } from "@/lib/mappers/masterclass.mapper";
import type { CreateCheckoutInput } from "@/types/payment.types";

export function useMyPayments() {
  return useQuery({
    queryKey: queryKeys.payments.my,
    queryFn: paymentsApi.myPayments,
  });
}

export function useCreateCheckout() {
  return useMutation({
    mutationFn: async (input: CreateCheckoutInput) => {
      const data = await paymentsApi.createCheckout(input);
      if (!data.checkoutUrl || !data.checkoutUrl.startsWith("https://")) {
        throw new Error("Checkout is unavailable. Please try again later.");
      }
      return data;
    },
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    },
  });
}

export function formatPaymentForDisplay(payment: {
  amountCents: number;
  currency: string;
  createdAt: string;
  masterclass?: { title: string };
}) {
  return {
    title: payment.masterclass?.title ?? "Masterclass Purchase",
    date: new Date(payment.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    amount: formatPaymentAmount(payment.amountCents, payment.currency),
  };
}
