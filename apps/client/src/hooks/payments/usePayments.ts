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
    mutationFn: (input: CreateCheckoutInput) => paymentsApi.createCheckout(input),
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    },
  });
}

export function formatPaymentForDisplay(payment: {
  amount: number;
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
    amount: formatPaymentAmount(payment.amount, payment.currency),
  };
}
