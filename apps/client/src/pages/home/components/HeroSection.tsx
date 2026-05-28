import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import heroBackground from "../../../assets/home/homehero.png";

export default function HeroSection() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setProgress(pct);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeRef.current) return;
    const rect = volumeRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setVolume(pct);
  };

  return (
    <section className="relative w-full h-screen" style={{ minHeight: "600px" }}>

      {/* Background image */}
      <img
        src={heroBackground}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Minimal overlay — just enough for text contrast, preserves image quality */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* ── Centered hero content ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-start md:items-center justify-center text-left md:text-center px-6 md:px-12">

        {/* Subtitle row */}
        <div className="flex items-center justify-start md:justify-center mb-2 md:mb-4 w-full">
          <span
            className="font-inter font-bold uppercase whitespace-nowrap text-[#4ED1FF]"
            style={{ 
              fontSize: "clamp(11.5px, 3.2vw, 19px)",
              letterSpacing: "0.06em"
            }}
          >
            BASS GUITARIST &bull; MUSIC DIRECTOR &bull; PRODUCER
          </span>
        </div>

        {/* Main title */}
        <h1
          className="font-inter font-bold text-white uppercase leading-[1.05] tracking-tight mb-8"
          style={{ fontSize: "clamp(46px, 12vw, 96px)" }}
        >
          Joe Wilson<br className="block md:hidden" />
          <span className="hidden md:inline"> </span>Bass
        </h1>

        {/* CTA buttons */}
        <div className="flex flex-row flex-nowrap gap-3 md:gap-4 justify-start md:justify-center w-full">
          <Link
            to="/contact"
            className="font-inter font-bold uppercase tracking-wider text-white transition-colors whitespace-nowrap cursor-pointer text-center"
            style={{
              background: "#077DA7",
              padding: "clamp(10px, 2.5vw, 13px) clamp(16px, 4vw, 28px)",
              fontSize: "clamp(9px, 2.2vw, 11px)",
              letterSpacing: "0.15em",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#05637f")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#077DA7")}
          >
            Book Me
          </Link>
          <Link
            to="/masterclass"
            className="font-inter font-bold uppercase tracking-wider text-white transition-colors whitespace-nowrap cursor-pointer text-center"
            style={{
              border: "1px solid rgba(255,255,255,0.7)",
              padding: "clamp(10px, 2.5vw, 13px) clamp(16px, 4vw, 28px)",
              fontSize: "clamp(9px, 2.2vw, 11px)",
              letterSpacing: "0.15em",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "#fff";
              (e.currentTarget as HTMLElement).style.color = "#111";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
          >
            Join Bass Masterclass
          </Link>
        </div>
      </div>

      {/* ── Audio player — centered, floating above bottom ── */}
      <div
        className="absolute z-20 flex items-center"
        style={{
          bottom: "48px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(860px, 90%)",
          background: "rgba(12,12,12,0.88)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "6px",
          padding: "0 16px",
          height: "58px",
          gap: "12px",
        }}
      >
        {/* Album art */}
        <div className="hidden md:block flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border border-white/20">
          <img
            src="https://readdy.ai/api/search-image?query=album%20cover%20art%20gospel%20music%20his%20glory%20spiritual%20worship%20dark%20cinematic&width=36&height=36&seq=hero-album-art&orientation=squarish"
            alt="His Glory"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Track info */}
        <div className="hidden md:flex flex-shrink-0 flex-col" style={{ minWidth: "90px", maxWidth: "110px" }}>
          <span className="font-inter font-bold text-white truncate" style={{ fontSize: "11px" }}>
            His Glory
          </span>
          <span className="font-inter truncate" style={{ fontSize: "10px", color: "#077DA7" }}>
            His Presence Album
          </span>
        </div>

        {/* Playback controls — 3 buttons only */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <button className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">
            <i className="ri-skip-back-fill text-xs md:text-sm" />
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white cursor-pointer transition-colors hover:text-[#077DA7]"
          >
            <i className={`text-lg md:text-xl ${playing ? "ri-pause-fill" : "ri-play-fill"}`} />
          </button>
          <button className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">
            <i className="ri-skip-forward-fill text-xs md:text-sm" />
          </button>
        </div>

        {/* Progress bar + timestamps */}
        <div className="flex-1 flex items-center gap-2 md:gap-3 min-w-0">
          <span className="font-inter text-gray-500 whitespace-nowrap hidden md:block" style={{ fontSize: "10px" }}>
            0:00
          </span>
          <div
            ref={progressRef}
            className="flex-1 rounded-full cursor-pointer relative"
            style={{ height: "3px", background: "rgba(255,255,255,0.15)" }}
            onClick={handleProgressClick}
          >
            <div
               className="h-full rounded-full relative"
               style={{ width: `${progress}%`, background: "#077DA7" }}
            >
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md" />
            </div>
          </div>
          <span className="font-inter text-gray-500 whitespace-nowrap block" style={{ fontSize: "10px" }}>
            0:00
          </span>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <i className="ri-volume-up-line text-gray-400" style={{ fontSize: "14px" }} />
          <div
            ref={volumeRef}
            className="hidden md:block rounded-full cursor-pointer relative"
            style={{ width: "64px", height: "3px", background: "rgba(255,255,255,0.15)" }}
            onClick={handleVolumeClick}
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${volume}%`, background: "#6B7280" }}
            />
          </div>
        </div>

        {/* Available on */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <span className="font-inter text-gray-500 whitespace-nowrap" style={{ fontSize: "10px" }}>
            Available on:
          </span>
          <a href="#" rel="nofollow" className="text-gray-400 hover:text-[#1DB954] transition-colors cursor-pointer">
            <i className="ri-spotify-fill" style={{ fontSize: "16px" }} />
          </a>
          <a href="#" rel="nofollow" className="text-gray-400 hover:text-[#FF0000] transition-colors cursor-pointer">
            <i className="ri-youtube-fill" style={{ fontSize: "16px" }} />
          </a>
          <a href="#" rel="nofollow" className="text-gray-400 hover:text-[#FF5500] transition-colors cursor-pointer">
            <i className="ri-soundcloud-fill" style={{ fontSize: "16px" }} />
          </a>
          <a href="#" rel="nofollow" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
            <i className="ri-amazon-fill" style={{ fontSize: "16px" }} />
          </a>
        </div>
      </div>
    </section>
  );
}
