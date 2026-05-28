import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import dropMeALineImg from "@/assets/home/homedropmealine.jpg";
import { useSubmitQuote } from "@/hooks/content/useQuotes";
import { getErrorMessage } from "@/lib/errors";

interface ServiceOption {
  value: string;
  label: string;
}

interface RequestAQuoteSectionProps {
  currentServiceId: string;
}

const serviceOptions: ServiceOption[] = [
  { value: "live-performance", label: "Live Performance" },
  { value: "studio-session-bass", label: "Studio & Session Bass" },
  { value: "music-production", label: "Music Production" },
  { value: "music-direction", label: "Music Direction" },
];

const eventTypes = [
  "Concert / Tour",
  "Corporate Event",
  "Private Show",
  "Festival",
  "Album / EP",
  "Film / TV Score",
  "Remote Session",
  "Brand Partnership",
  "Other",
];

const budgetRanges = [
  "$185 – $700",
  "$700 – $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
];

export default function RequestAQuoteSection({ currentServiceId }: RequestAQuoteSectionProps) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    service: currentServiceId,
    eventDate: "",
    eventType: "",
    budgetRange: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const submitQuote = useSubmitQuote();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await submitQuote.mutateAsync({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        service: form.service,
        eventDate: form.eventDate || undefined,
        eventType: form.eventType || undefined,
        budgetRange: form.budgetRange || undefined,
        notes: form.notes || undefined,
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setForm({ fullName: "", email: "", service: currentServiceId, eventDate: "", eventType: "", budgetRange: "", notes: "" });
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    }
  };

  return (
    <section id="quote" className="relative overflow-hidden bg-[#f4f4f4]">
      {/* Faded background image — same as Drop a Line */}
      <img
        src={dropMeALineImg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-30"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-16 md:py-20 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
        {/* Left — label + title + description */}
        <div>
          <p className="text-[#2596BE] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Request</p>
          <h2 
            className="text-[#111] text-4xl md:text-5xl mb-4 leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Request A<br />Quote
          </h2>
          <div className="w-10 h-[3px] bg-[#2596BE] mb-6" />
          <p className="text-gray-500 text-sm leading-relaxed">
            Tell me about your event or project and I will get back to you with a custom quote.
          </p>
        </div>

        {/* Right — Form */}
        {submitted ? (
          <div className="flex flex-col items-start justify-center py-16 gap-3">
            <i className="ri-checkbox-circle-line text-4xl text-[#2596BE]" />
            <p className="text-[#111] font-bold text-lg">Quote request sent!</p>
            <p className="text-gray-500 text-sm">We'll get back to you with a custom quote within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
            {/* Row 1: Full Name | Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#111] mb-2">Full Name</label>
                <input
                  required
                  value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                  placeholder="Christell Tawiah"
                  className="w-full bg-transparent border-b border-gray-400 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-[#2596BE] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#111] mb-2">Email Address</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="christell@gmail.com"
                  className="w-full bg-transparent border-b border-gray-400 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-[#2596BE] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Service | Event Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#111] mb-2">Service</label>
                <div className="relative">
                  <select
                    value={form.service}
                    onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    className="w-full appearance-none bg-transparent border-b border-gray-400 py-2.5 text-sm text-gray-700 focus:border-[#2596BE] focus:outline-none transition-colors pr-6"
                  >
                    {serviceOptions.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-0 top-2.5 text-gray-400 text-base pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#111] mb-2">Event Date</label>
                <input
                  type="date"
                  value={form.eventDate}
                  onChange={e => setForm(f => ({ ...f, eventDate: e.target.value }))}
                  className="w-full bg-transparent border-b border-gray-400 py-2.5 text-sm text-gray-700 focus:border-[#2596BE] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Event Type | Budget Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#111] mb-2">Event Type</label>
                <div className="relative">
                  <select
                    value={form.eventType}
                    onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))}
                    className="w-full appearance-none bg-transparent border-b border-gray-400 py-2.5 text-sm text-gray-700 focus:border-[#2596BE] focus:outline-none transition-colors pr-6"
                  >
                    <option value="">Select an option</option>
                    {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-0 top-2.5 text-gray-400 text-base pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#111] mb-2">Budget Range</label>
                <input
                  value={form.budgetRange}
                  onChange={e => setForm(f => ({ ...f, budgetRange: e.target.value }))}
                  placeholder="$185 – $700"
                  className="w-full bg-transparent border-b border-gray-400 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:border-[#2596BE] focus:outline-none transition-colors"
                  list="budget-options"
                />
                <datalist id="budget-options">
                  {budgetRanges.map(r => <option key={r} value={r} />)}
                </datalist>
              </div>
            </div>

            {/* Row 4: Notes — full width */}
            <div className="mb-8">
              <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#111] mb-2">Notes</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Tell me more about your event or project"
                className="w-full bg-transparent border-b border-gray-400 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:border-[#2596BE] focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitQuote.isPending}
              className="bg-[#2596BE] text-white text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#1C7898] transition-colors disabled:opacity-70"
            >
              {submitQuote.isPending ? "SUBMITTING..." : "REQUEST A QUOTE"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  Other Services Section                                     */
/* ──────────────────────────────────────────────────────────── */

import livePerformanceImg from "@/assets/home/servicesliveperformance.jpg";
import studioSessionImg from "@/assets/home/servicesstudio.jpg";
import musicProductionImg from "@/assets/home/servicesmusicproduction.jpg";
import musicDirectionImg from "@/assets/home/servicesmusicdirection.jpg";

const allServices = [
  {
    id: "live-performance",
    title: "LIVE\nPERFORMANCE",
    description: "High-energy live bass performances for concerts, tours, and events.",
    image: livePerformanceImg,
  },
  {
    id: "studio-session-bass",
    title: "STUDIO\n& SESSION BASS",
    description: "Remote bass recording and in-studio session work for artists, choirs and producers.",
    image: studioSessionImg,
  },
  {
    id: "music-production",
    title: "MUSIC\nPRODUCTION",
    description: "Full-service production from concept to final master.",
    image: musicProductionImg,
  },
  {
    id: "music-direction",
    title: "MUSIC\nDIRECTION",
    description: "Creative leadership for albums, live shows and artist development.",
    image: musicDirectionImg,
  },
];

interface OtherServicesSectionProps {
  currentServiceId: string;
}

export function OtherServicesSection({ currentServiceId }: OtherServicesSectionProps) {
  const navigate = useNavigate();
  const others = allServices.filter(s => s.id !== currentServiceId);

  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#2596BE] text-[11px] font-bold uppercase tracking-[0.3em] mb-2">Explore</p>
        <h2 className="text-[#111] text-2xl md:text-3xl font-black mb-3">Other Services</h2>
        <div className="w-10 h-[3px] bg-[#2596BE] mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {others.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => navigate(`/services/${s.id}`)}
              className="group relative overflow-hidden cursor-pointer"
              style={{ height: "260px" }}
            >
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/70 transition-colors" />

              {/* First card: full overlay content with description + button */}
              {idx === 0 ? (
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white text-sm font-black uppercase tracking-wide leading-tight mb-2">
                    {s.title.split("\n").map((l, i, a) => (
                      <span key={i}>{l}{i < a.length - 1 && <br />}</span>
                    ))}
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed mb-4">{s.description}</p>
                  <Link
                    to={`/services/${s.id}`}
                    onClick={e => e.stopPropagation()}
                    className="inline-block bg-[#2596BE] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 w-fit hover:bg-[#1C7898] transition-colors"
                  >
                    REQUEST QUOTE
                  </Link>
                </div>
              ) : (
                /* Other cards: just centered title */
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <h3 className="text-white text-lg font-black uppercase tracking-wide leading-tight text-center">
                    {s.title.split("\n").map((l, i, a) => (
                      <span key={i}>{l}{i < a.length - 1 && <br />}</span>
                    ))}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
