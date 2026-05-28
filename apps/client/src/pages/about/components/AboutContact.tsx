import { useState } from "react";
import { useSubmitInquiry } from "@/hooks/content/useInquiries";
import { getErrorMessage } from "@/lib/errors";

export default function AboutContact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState("");
  const submitInquiry = useSubmitInquiry();

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      setFormData({ ...formData, message: e.target.value });
      setCharCount(e.target.value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.message.length > 500) return;
    setError("");
    const message = formData.subject
      ? `Subject: ${formData.subject}\n\n${formData.message}`
      : formData.message;

    try {
      await submitInquiry.mutateAsync({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: message.trim(),
        type: "GENERAL",
      });
      setSubmitted(true);
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    }
  };

  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Where to Find Me */}
        <div>
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-6">
            Where to Find Me?
          </h3>
          <div className="space-y-5">
            <div className="flex gap-3">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className="ri-map-pin-fill text-[#1ab8e8] text-base" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">New York, USA</p>
                <p className="text-xs text-gray-500">123 Music Avenue, Manhattan, NY 10001</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className="ri-map-pin-fill text-[#1ab8e8] text-base" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">London, UK</p>
                <p className="text-xs text-gray-500">45 Bass Street, Soho, London W1D 3QY</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className="ri-map-pin-fill text-[#1ab8e8] text-base" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Los Angeles, USA</p>
                <p className="text-xs text-gray-500">789 Groove Blvd, Hollywood, CA 90028</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className="ri-phone-fill text-[#1ab8e8] text-base" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">+1 (212) 555-0198</p>
                <p className="text-xs text-gray-500">Mon – Fri, 9am – 6pm EST</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className="ri-mail-fill text-[#1ab8e8] text-base" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">booking@josephwilson.com</p>
                <p className="text-xs text-gray-500">For bookings and inquiries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Drop Me A Line */}
        <div>
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-6">
            Drop Me A Line
          </h3>
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <i className="ri-checkbox-circle-line text-[#1ab8e8] text-4xl" />
              </div>
              <p className="text-gray-700 font-semibold">Message sent!</p>
              <p className="text-gray-500 text-sm mt-1">I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form
              id="about-contact-form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {error && <p className="text-sm text-red-600">{error}</p>}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-b border-gray-300 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1a7fa8] bg-transparent"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-b border-gray-300 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1a7fa8] bg-transparent"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full border-b border-gray-300 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1a7fa8] bg-transparent"
                required
              />
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleMessageChange}
                  className="w-full border-b border-gray-300 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1a7fa8] bg-transparent resize-none"
                  required
                />
                <p className="text-xs text-gray-400 text-right mt-1">{charCount}/500</p>
              </div>
              <button
                type="submit"
                disabled={submitInquiry.isPending}
                className="border border-gray-900 text-gray-900 text-xs font-bold px-6 py-2.5 uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors whitespace-nowrap cursor-pointer disabled:opacity-70"
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
