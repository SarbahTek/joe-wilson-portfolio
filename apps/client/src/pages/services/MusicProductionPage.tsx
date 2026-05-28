import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CTASection from "@/components/feature/CTASection";
import RequestAQuoteSection, { OtherServicesSection } from "./components/RequestAQuoteSection";
import musicProductionImg from "@/assets/home/servicesmusicproduction.jpg";

/* ── What's Included ── */
const opportunities = [
  {
    icon: "ri-equalizer-line",
    title: "Beat Making",
    desc: "Custom beats and full musical arrangements built around your unique artistic identity.",
  },
  {
    icon: "ri-headphone-line",
    title: "Mixing & Mastering",
    desc: "Industry-standard mixing and mastering for streaming, radio, and physical distribution.",
  },
  {
    icon: "ri-music-line",
    title: "Full Production",
    desc: "End-to-end production from initial concept and demo through to a commercially ready final master.",
  },
  {
    icon: "ri-team-line",
    title: "Artist Collaboration",
    desc: "Co-production sessions for independent artists, choirs, and label-signed acts.",
  },
];

/* ── Videos ── */
const videos = [
  {
    id: "v1",
    title: "Behind The Production",
    category: "Music Production",
    duration: "7:24",
    thumb: musicProductionImg,
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "v2",
    title: "Studio Playback Session",
    category: "Music Production",
    duration: "4:55",
    thumb: musicProductionImg,
    youtubeId: "dQw4w9WgXcQ",
  },
];

/* ── Process Steps ── */
const steps = [
  {
    num: "01",
    icon: "ri-mail-send-line",
    title: "Submit Request",
    desc: "Share your project brief, genre references, and timeline via the quote form below.",
  },
  {
    num: "02",
    icon: "ri-discuss-line",
    title: "Discuss Requirements",
    desc: "We'll connect to map out the production scope, sound direction, and deliverables.",
  },
  {
    num: "03",
    icon: "ri-shake-hands-line",
    title: "Confirm Booking",
    desc: "Receive a tailored production proposal, sign the contract, and begin the creative process.",
  },
  {
    num: "04",
    icon: "ri-record-circle-line",
    title: "Deliver Service",
    desc: "Receive polished, master-ready tracks delivered on schedule and built to stand out.",
  },
];

export default function MusicProductionPage() {
  const [playing, setPlaying] = useState(false);
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <div className="relative h-[250px] md:h-[350px] overflow-hidden">
        <img
          src={musicProductionImg}
          alt="Music Production"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,20,35,0.65)" }} />
        <Navbar />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-[#2596BE] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Our Services</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-4">
            Music Production
          </h1>
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-gray-300">Music Production</span>
          </div>
        </div>
      </div>

      {/* ── What's Included ── */}
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#2596BE] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Whats Included</p>
          <h2
            className="text-[#111] text-3xl md:text-4xl mb-4 leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Production<br />Services
          </h2>
          <div className="w-10 h-[3px] bg-[#2596BE] mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {opportunities.map((o) => (
              <div key={o.title} className="flex flex-col gap-3">
                <i className={`${o.icon} text-[#2596BE] text-3xl`} />
                <h3 className="text-[#111] font-black text-sm uppercase tracking-wide">{o.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Videos & Audios ── */}
      <section className="bg-[#0d0d0d] py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#2596BE] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Whats Included</p>
          <h2
            className="text-white text-3xl md:text-4xl mb-10 leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Videos &amp; Audios
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
            {/* Main Player */}
            <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
              {playing ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                  title={activeVideo.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={activeVideo.thumb}
                    alt={activeVideo.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <button
                    onClick={() => setPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                  >
                    <div className="w-16 h-16 flex items-center justify-center bg-[#2596BE] rounded-full group-hover:scale-110 transition-transform">
                      <i className="ri-play-fill text-white text-3xl ml-1" />
                    </div>
                  </button>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Check out highlights from past productions and studio sessions
              </p>
              <div className="flex flex-col gap-4">
                {videos.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => { setActiveVideo(v); setPlaying(false); }}
                    className="flex gap-3 group cursor-pointer"
                  >
                    <div className="relative w-28 h-[70px] flex-shrink-0 overflow-hidden bg-black">
                      <img
                        src={v.thumb}
                        alt={v.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-7 h-7 flex items-center justify-center bg-[#2596BE]/80 rounded-full">
                          <i className="ri-play-fill text-white text-xs ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#2596BE] text-[10px] font-bold uppercase tracking-wider">{v.category}</p>
                      <p className="text-gray-200 text-xs font-bold leading-snug mt-0.5 group-hover:text-[#2596BE] transition-colors line-clamp-2">
                        {v.title}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">{v.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/media"
              className="inline-block border border-white text-white text-[11px] font-bold uppercase tracking-[0.2em] px-10 py-3 hover:bg-white hover:text-[#0d0d0d] transition-colors"
            >
              VIDEOS
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#2596BE] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Process</p>
          <h2
            className="text-[#111] text-3xl md:text-4xl mb-10 leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#ccc] text-2xl font-black leading-none">{s.num}</span>
                  <i className={`${s.icon} text-[#2596BE] text-xl`} />
                </div>
                <h3 className="text-[#111] font-black text-sm uppercase tracking-wide">{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RequestAQuoteSection currentServiceId="music-production" />
      <OtherServicesSection currentServiceId="music-production" />
      <CTASection />
      <Footer />
    </div>
  );
}
