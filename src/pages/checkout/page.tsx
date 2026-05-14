import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        {/* ── Hero ── */}
        <div
          className="relative h-[250px] md:h-[350px] overflow-hidden"
          style={{
            backgroundImage: `url(https://readdy.ai/api/search-image?query=dark%20concert%20stage%20with%20dramatic%20lighting%2C%20bass%20guitar%20musician%20performing%2C%20deep%20shadows%2C%20moody%20atmosphere%2C%20professional%20music%20photography%2C%20dark%20teal%20and%20black%20tones%2C%20cinematic%20wide%20shot&width=1440&height=400&seq=masterclass-hero-bg&orientation=landscape)`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
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
              Payment Successful!
            </h2>
            <p className="text-[#6b7280] text-[14px] md:text-[15px] mb-8 leading-[1.6]">
              Welcome to the Joe Wilson Masterclass. Your lifetime access has been granted and your login details have been emailed to you.
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
        className="relative h-[250px] md:h-[350px] overflow-hidden"
        style={{
          backgroundImage: `url(https://readdy.ai/api/search-image?query=dark%20concert%20stage%20with%20dramatic%20lighting%2C%20bass%20guitar%20musician%20performing%2C%20deep%20shadows%2C%20moody%20atmosphere%2C%20professional%20music%20photography%2C%20dark%20teal%20and%20black%20tones%2C%20cinematic%20wide%20shot&width=1440&height=400&seq=masterclass-hero-bg&orientation=landscape)`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
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
            <form onSubmit={handlePayment}>
              {/* Payment Details Section */}
              <div className="mb-12">
                <h3 className="text-[#077DA7] text-[14px] font-bold uppercase tracking-wide mb-6">
                  Payment Details
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[#4b5563] text-[11px] font-bold uppercase mb-2">Payment Method</label>
                    <div className="relative">
                      <input required type="text" className="w-full border border-gray-300 p-3.5 text-[14px] focus:outline-none focus:border-[#077DA7]" placeholder="Card number" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="absolute right-3 top-1/2 -translate-y-1/2 h-5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#4b5563] text-[11px] font-bold uppercase mb-2">Expiration Date</label>
                      <input required type="text" className="w-full border border-gray-300 p-3.5 text-[14px] focus:outline-none focus:border-[#077DA7]" placeholder="05/26" />
                    </div>
                    <div>
                      <label className="block text-[#4b5563] text-[11px] font-bold uppercase mb-2">Security Code</label>
                      <input required type="text" className="w-full border border-gray-300 p-3.5 text-[14px] focus:outline-none focus:border-[#077DA7]" placeholder="223" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address Section */}
              <div>
                <h3 className="text-[#077DA7] text-[14px] font-bold uppercase tracking-wide mb-6">
                  Billing Address
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[#4b5563] text-[11px] font-bold uppercase mb-2">Full Name</label>
                    <input required type="text" className="w-full border border-gray-300 p-3.5 text-[14px] focus:outline-none focus:border-[#077DA7] placeholder:text-gray-300" placeholder="eg. Ben Doe" />
                  </div>

                  <div>
                    <label className="block text-[#4b5563] text-[11px] font-bold uppercase mb-2">Country or Region</label>
                    <input required type="text" className="w-full border border-gray-300 p-3.5 text-[14px] focus:outline-none focus:border-[#077DA7] placeholder:text-gray-300" placeholder="Ghana" />
                  </div>

                  <div>
                    <label className="block text-[#4b5563] text-[11px] font-bold uppercase mb-2">Address Line</label>
                    <input required type="text" className="w-full border border-gray-300 p-3.5 text-[14px] focus:outline-none focus:border-[#077DA7] placeholder:text-gray-300" placeholder="Address Line 1" />
                  </div>
                </div>
              </div>
              
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
                  Complete Mastery Suite
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
                    <span>$50.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#1a1a1a] mt-2">
                    <span>Due today</span>
                    <span>$50.00</span>
                  </div>
                </div>

                <button
                  onClick={() => document.getElementById("hidden-submit")?.click()}
                  disabled={isProcessing}
                  className="w-full bg-[#077DA7] text-white py-4 text-[13px] font-bold uppercase tracking-wide hover:bg-[#06658a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed mb-6"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin" /> Processing...
                    </span>
                  ) : (
                    "Make Payment"
                  )}
                </button>

                <p className="text-[#6b7280] text-[11px] leading-[1.6]">
                  A one time payment.By Securing your spot you have unlimited access to the platform.By Subscribiing you agree to our <a href="#" className="underline">Terms of Use</a> and have read our <a href="#" className="underline">Privacy Policy</a> and authorize us to charge your payment method
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
