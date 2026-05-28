export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export interface Payment {
  id: string;
  userId: string;
  masterclassId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  stripePaymentIntentId?: string;
  receiptUrl?: string | null;
  createdAt: string;
  masterclass?: {
    id: string;
    title: string;
  };
}

export interface CreateCheckoutInput {
  masterclassId: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutSessionResponse {
  checkoutUrl: string;
  sessionId?: string;
}
