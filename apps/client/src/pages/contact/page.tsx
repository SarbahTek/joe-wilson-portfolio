import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CTASection from "@/components/feature/CTASection";
import { useSubmitInquiry } from "@/hooks/content/useInquiries";
import { getErrorMessage } from "@/lib/errors";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const submitInquiry = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await submitInquiry.mutateAsync({
        name: formData.name.trim(),
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
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[250px] md:h-[350px] overflow-hidden">
        <div className="absolute inset-0 bg-[#1a1a1a]" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-3 font-inter">
            GET IN TOUCH
          </h1>
          <div className="flex items-center gap-2 text-[12px] text-gray-300 font-inter">
            <Link to="/" className="hover:text-white transition-colors cursor-pointer">Home</Link>
            <span>/</span>
            <span className="text-gray-300">Contact</span>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-12 md:py-20 px-4 md:px-16">
        <div className="max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">

          {/* Left: Form */}
          <div className="flex flex-col font-inter pt-4">
            <h2 className="text-[#1a1a1a] text-2xl md:text-[28px] font-black uppercase mb-12 tracking-wide">
              DROP ME A MAIL
            </h2>

            {submitted ? (
              <div className="py-10 text-[#077DA7] font-bold">Message Sent! I will get back to you soon.</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
                {error && <p className="text-sm text-red-600">{error}</p>}
                <label className="block text-sm">Full name
                  <input required maxLength={255} autoComplete="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="block w-full border-b border-gray-300 py-3 focus:outline-none focus:border-[#077DA7]" />
                </label>
                {/* Email Field */}
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-b border-gray-400 pb-2 focus:outline-none focus:border-[#1a1a1a] bg-transparent text-sm transition-colors rounded-none placeholder:text-[#4a4a4a] placeholder:text-[11px] placeholder:font-bold placeholder:uppercase tracking-wide"
                  required
                />

                {/* Phone Field */}
                <input
                  type="tel"
                  placeholder="PHONE NUMBER"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border-b border-gray-400 pb-2 focus:outline-none focus:border-[#1a1a1a] bg-transparent text-sm transition-colors rounded-none placeholder:text-[#4a4a4a] placeholder:text-[11px] placeholder:font-bold placeholder:uppercase tracking-wide"
                />

                {/* Message Field */}
                <textarea
                  placeholder="MESSAGE"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full border-b border-gray-400 pb-2 focus:outline-none focus:border-[#1a1a1a] bg-transparent text-sm transition-colors resize-none rounded-none placeholder:text-[#4a4a4a] placeholder:text-[11px] placeholder:font-bold placeholder:uppercase tracking-wide"
                  required
                />

                {/* Submit Button */}
                <div className="mt-4 flex">
                  <button
                    type="submit"
                    disabled={submitInquiry.isPending}
                    className="border border-gray-400 text-[#1a1a1a] text-[11px] font-bold px-10 py-4 uppercase tracking-widest hover:border-[#1a1a1a] hover:bg-gray-50 transition-colors cursor-pointer rounded-none disabled:opacity-70"
                  >
                    {submitInquiry.isPending ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Map */}
          <div className="w-full aspect-[4/3] lg:aspect-square bg-gray-100 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.83989823643!2d-0.24168138430087775!3d51.52877184185745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
              className="absolute inset-0 w-full h-full border-0 filter grayscale opacity-70"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Joe Wilson Location - London, UK"
            />
          </div>

        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
