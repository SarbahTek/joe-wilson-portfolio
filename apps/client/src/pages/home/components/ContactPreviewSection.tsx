import { useState } from "react";
import homeDropMeALine from "../../../assets/home/homedropmealine.jpg";
import { useSubmitInquiry } from "@/hooks/content/useInquiries";
import { getErrorMessage } from "@/lib/errors";

export default function ContactPreviewSection() {
  const [formData, setFormData] = useState({ email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const submitInquiry = useSubmitInquiry();

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      setFormData({ ...formData, message: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.message.length > 500) return;
    setError("");
    try {
      await submitInquiry.mutateAsync({
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim(),
        type: "GENERAL",
      });
      setSubmitted(true);
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    }
  };

  return (
    <section className="w-full bg-[#efefef] py-8 md:py-[clamp(36px,5vw,72px)]">
      <div className="relative grid min-h-[clamp(280px,40vw,520px)] w-full grid-cols-1 overflow-hidden bg-[#f4f4f4] md:grid-cols-2">
        <img
          src={homeDropMeALine}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right hidden md:block"
        />
        {/* Where to Find Me */}
        <div className="relative z-10 flex h-full flex-col px-5 py-8 md:px-[clamp(22px,4vw,52px)] md:py-[clamp(28px,4vw,64px)]">
          <h3 className="mb-5 font-inter text-[clamp(18px,2.5vw,36px)] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-gray-900 md:mb-[clamp(18px,2.5vw,36px)]">
            Where to Find Me?
          </h3>
          <div className="flex flex-col gap-[clamp(24px,3vw,40px)]">
            {[
              {
                address: "2972 Westheimer Rd. Santa Ana",
                email: "info@la-studioweb.com",
                phone: "(702) 555-0122",
              },
              {
                address: "4517 Washington Ave. Manchester",
                email: "info@la-studioweb.com",
                phone: "(704) 555-0127",
              },
            ].map(({ address, email, phone }, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#dedede] bg-[#f7f7f7]">
                  <i className="ri-map-pin-fill text-[18px] text-[#C9A227]" />
                </div>
                <div className="pt-0.5">
                  <p className="font-inter text-[14px] leading-[1.8] text-gray-700 md:text-[19px]">
                    {address}
                    <br />
                    {email}
                    <br />
                    {phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drop Me A Line */}
        <div className="relative z-10 px-5 py-8 bg-[#f4f4f4] md:bg-transparent md:px-[clamp(22px,4vw,52px)] md:py-[clamp(28px,4vw,64px)]">
          <h3 className="mb-5 font-inter text-[clamp(18px,2.5vw,36px)] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-gray-900 md:mb-[clamp(18px,2.5vw,36px)]">
            Drop Me A Line
          </h3>
          {submitted ? (
            <div className="text-center py-8">
              <i className="ri-checkbox-circle-line text-4xl text-[#077DA7]" />
              <p className="font-inter font-semibold text-gray-700 mt-3">Message sent!</p>
              <p className="font-inter text-gray-500 text-sm mt-1">I'll get back to you soon.</p>
            </div>
          ) : (
            <form id="home-contact-form" onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5">
              {error && <p className="text-sm text-red-600">{error}</p>}
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-b border-[#bebebe] bg-transparent py-3 font-inter text-[15px] tracking-[0.06em] text-gray-700 placeholder-gray-400 focus:border-[#077DA7] focus:outline-none"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="PHONE NUMBER"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border-b border-[#bebebe] bg-transparent py-3 font-inter text-[15px] tracking-[0.06em] text-gray-700 placeholder-gray-400 focus:border-[#077DA7] focus:outline-none"
                required
              />
              <div>
                <textarea
                  name="message"
                  placeholder="MESSAGE"
                  rows={2}
                  value={formData.message}
                  onChange={handleMessageChange}
                  className="w-full resize-none border-b border-[#bebebe] bg-transparent py-3 font-inter text-[15px] tracking-[0.06em] text-gray-700 placeholder-gray-400 focus:border-[#077DA7] focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitInquiry.isPending}
                className="mt-4 w-fit cursor-pointer whitespace-nowrap border border-[#111] bg-[#efefef] px-[26px] py-[11px] font-inter text-[11px] font-bold uppercase tracking-[0.12em] text-[#111] transition-colors hover:bg-[#111] hover:text-white disabled:opacity-70"
              >
                {submitInquiry.isPending ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
