import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import { useCreateCheckout } from "@/hooks/payments/usePayments";
import { useQuery } from "@tanstack/react-query";
import { masterclassesApi } from "@/api/masterclasses.api";
import { queryKeys } from "@/lib/query-keys";
import { formatPaymentAmount } from "@/lib/mappers/masterclass.mapper";
import { getErrorMessage } from "@/lib/errors";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [checkoutError, setCheckoutError] = useState("");
  const createCheckout = useCreateCheckout();
  const { data: masterclasses = [], isPending, error } = useQuery({ queryKey: queryKeys.masterclasses.all, queryFn: masterclassesApi.list });
  const isSuccess = searchParams.get("success") === "true";

  const masterclassId = searchParams.get("masterclassId") ?? masterclasses[0]?.id;
  const masterclass = masterclasses.find(item => item.id === masterclassId);
  const price = masterclass ? formatPaymentAmount(masterclass.priceCents, masterclass.currency ?? "USD") : "—";

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError("");

    if (!masterclass || createCheckout.isPending) {
      setCheckoutError("No masterclass is available for checkout.");
      return;
    }

    const origin = window.location.origin;
    const basePath = __BASE_PATH__.replace(/\/$/, "");

    try {
      await createCheckout.mutateAsync({
        masterclassId,
        successUrl: `${origin}${basePath}/checkout?success=true&masterclassId=${encodeURIComponent(masterclass.id)}`,
        cancelUrl: `${origin}${basePath}/checkout?masterclassId=${encodeURIComponent(masterclass.id)}`,
      });
    } catch (error) {
      setCheckoutError(getErrorMessage(error, "Unable to start checkout. Please try again."));
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        {/* ── Hero ── */}
        <div
          className="relative h-[250px] md:h-[350px] overflow-hidden bg-[#1a1a1a]"
        >
          <div className="absolute inset-0 bg-black/50" />
          <Navbar />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1
              className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-1.5 md:mb-2"
              style={{ letterSpacing: "0.3em" }}
            >
              Checkout
            </h1>
            <div
              className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-400 uppercase font-medium"
              style={{ letterSpacing: "0.18em" }}
            >
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-gray-500">/</span>
              <Link to="/masterclass" className="hover:text-white transition-colors">Masterclass</Link>
              <span className="text-gray-500">/</span>
              <span className="text-[#2596BE]">Checkout</span>
            </div>
          </div>
        </div>

        {/* ── Success Card ── */}
        <div className="flex items-center justify-center p-8 py-20">
          <div className="max-w-[500px] w-full text-center">
            <div className="w-16 h-16 bg-[#077DA7]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-check-line text-[#077DA7] text-3xl" />
            </div>
            <h2 className="font-inter text-[24px] md:text-[32px] font-bold text-[#1a1a1a] mb-3">
              Checkout submitted
            </h2>
            <p className="text-[#6b7280] text-[14px] md:text-[15px] mb-8 leading-[1.6]">
              Your access will appear in the members area once your payment has been confirmed. If it is still processing, please check again shortly.
            </p>
            <button
              onClick={() => navigate("/members")}
              className="bg-[#077DA7] text-white w-full py-4 text-[14px] font-bold uppercase tracking-wide hover:bg-[#06658a] transition-colors"
            >
              Access Members Area
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* ── Masterclass Hero ── */}
      <div
        className="relative h-[250px] md:h-[350px] overflow-hidden bg-[#1a1a1a]"
      >
        <div className="absolute inset-0 bg-black/50" />
        <Navbar />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1
            className="font-inter text-[18px] md:text-[30px] font-black text-white uppercase mb-1.5 md:mb-2"
            style={{ letterSpacing: "0.3em" }}
          >
            Checkout
          </h1>
          <div
            className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-400 uppercase font-medium"
            style={{ letterSpacing: "0.18em" }}
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-500">/</span>
            <Link to="/masterclass" className="hover:text-white transition-colors">Masterclass</Link>
            <span className="text-gray-500">/</span>
            <span className="text-[#2596BE]">Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        {/* Divider line */}
        <div className="h-[1px] bg-gray-200 w-full mb-12 md:mb-16" />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 pb-24">
          {/* Left Column: Form */}
          <div className="flex-1 lg:max-w-[500px]">
            {isPending && <p role="status">Loading checkout...</p>}
            {error && <p role="alert" className="text-red-600 mb-4">{getErrorMessage(error)}</p>}
            {!isPending && !error && !masterclass && <p role="status" className="mb-4">This masterclass is not currently available. <Link to="/masterclass" className="underline">View masterclasses</Link></p>}
            {checkoutError && (
              <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm">
                {checkoutError}
              </div>
            )}
            <form onSubmit={handlePayment}>
              <h3 className="text-[#077DA7] text-sm font-bold uppercase mb-6">Secure checkout</h3>
              <p className="text-gray-600 leading-relaxed">Continue to our payment provider to enter your payment details and review the final total.</p>
              {/* Mobile Submit Button (hidden on desktop, summary button handles it, but semantic HTML needs a submit inside form if used outside) */}
              <button id="hidden-submit" type="submit" className="hidden" />
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="flex-1 lg:max-w-[420px]">
            <div className="sticky top-8 pt-2">
              <div className="mb-8">
                <p className="text-[#077DA7] text-[11px] font-bold uppercase tracking-wide mb-2">
                  Lifetime Access
                </p>
                <h2 className="text-[#1a1a1a] text-[20px] font-bold uppercase mb-6">
                  {masterclass?.title ?? "Masterclass"}
                </h2>

                <ul className="space-y-4 mb-10">
                  {["Full Lifetime Access", "Monthly Live Q&A", "Private Community Access", "Custom Backing Tracks"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[13px] text-[#374151]">
                      <i className="ri-check-line text-[#077DA7] text-[16px]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-200 pt-6 space-y-4 text-[13px] text-[#374151] mb-6">
                  <div className="flex justify-between">
                    <span>One time payment</span>
                    <span>{price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#1a1a1a] mt-2">
                    <span>Course price</span>
                    <span>{price}</span>
                  </div>
                </div>

                <button
                  onClick={() => document.getElementById("hidden-submit")?.click()}
                  disabled={createCheckout.isPending || isPending || Boolean(error) || !masterclass}
                  className="w-full bg-[#077DA7] text-white py-4 text-[13px] font-bold uppercase tracking-wide hover:bg-[#06658a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed mb-6"
                >
                  {createCheckout.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin" /> Processing...
                    </span>
                  ) : (
                    "Make Payment"
                  )}
                </button>

                <p className="text-[#6b7280] text-[11px] leading-[1.6]">Review the final amount on the secure payment page before paying.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
