import { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { SkipBack, Play, SkipForward } from "lucide-react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CTASection from "@/components/feature/CTASection";
import { albums } from "@/mocks/albums";
import heroImg from "@/assets/music/singlealbumhero.jpg";

export default function AlbumDetailPage() {
  const { albumId } = useParams<{ albumId: string }>();
  const album = albums.find((a) => a.id === albumId);
  const otherAlbums = albums.filter((a) => a.id !== albumId).slice(0, 4);

  // Scroll to top when album changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [albumId]);

  if (!album) return <Navigate to="/music" replace />;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative h-[250px] md:h-[350px] w-full">
        <img
          src={heroImg}
          alt="Single Album Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-1 md:mb-2">
            Single Album
          </h1>
          <div className="flex items-center gap-2 text-[10px] md:text-[12px] text-white/80 font-medium tracking-widest">
            <Link to="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <Link to="/music" className="hover:text-white transition-colors">ALBUMS</Link>
            <span>/</span>
            <span className="text-white uppercase">{album.title}</span>
          </div>
        </div>
      </section>

      {/* ── Main Content Area ── */}
      <main className="flex-1 bg-white">
        <section className="px-4 md:px-16 pt-16 md:pt-24 pb-8 md:pb-16">
          <div className="max-w-[1120px] mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16">

              {/* Left Column: Cover & Player */}
              <div className="w-full md:w-[45%] lg:w-[400px] flex-shrink-0">
                <div className="relative aspect-square w-full">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Media Player Overlay (matching ListenNowSection) */}
                  <div
                    className="absolute bottom-2 left-2 right-2 px-2 pt-1 pb-2"
                    style={{ background: "rgba(255, 255, 255, 0.8)" }}
                  >
                    {/* Controls row */}
                    <div className="flex items-center justify-center gap-3 mb-1">
                      <button className="text-gray-900 hover:text-white transition-colors cursor-pointer">
                        <SkipBack size={12} />
                      </button>
                      <button className="text-gray-900 hover:text-white/80 transition-colors cursor-pointer">
                        <Play size={14} />
                      </button>
                      <button className="text-gray-900 hover:text-white transition-colors cursor-pointer">
                        <SkipForward size={12} />
                      </button>
                    </div>

                    {/* Progress bar + timestamps */}
                    <div className="flex items-center gap-3">
                      <span className="text-gray-900 text-[10px] tabular-nums leading-none flex-shrink-0">
                        00:00
                      </span>
                      <div className="relative flex-1 h-px bg-gray-900">
                        <div className="absolute left-0 top-0 h-full bg-gray-900 w-0" />
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-900"
                          style={{ left: "-3px" }}
                        />
                      </div>
                      <span className="text-gray-900 text-[10px] tabular-nums leading-none flex-shrink-0">
                        00:00
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Title & Tracklist */}
              <div className="flex-1 mt-2 md:mt-0">
                <h2 className="text-[28px] md:text-[42px] font-black text-[#1a1a1a] uppercase leading-tight mb-4">
                  {album.title}
                </h2>
                <p className="text-[#6b7280] text-[13px] md:text-[14px] leading-[1.8] max-w-[600px] mb-10">
                  {album.description}
                </p>

                {/* Tracklist */}
                <div className="border-t border-[#e5e7eb]">
                  {album.tracks.map((track) => (
                    <button
                      key={track.id}
                      className="w-full flex items-center justify-between py-3.5 border-b border-[#e5e7eb] group cursor-pointer hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-[12px] font-bold text-gray-800 uppercase tracking-widest group-hover:text-gray-900 transition-colors">
                        {track.title}
                      </span>
                      <Play
                        size={12}
                        className="text-gray-400 group-hover:text-gray-700 transition-colors flex-shrink-0 ml-4"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Other Albums ── */}
        <section className="px-4 md:px-16 pt-8 md:pt-16 pb-16 md:pb-24 border-t border-transparent">
          <div className="max-w-[1120px] mx-auto">
            <h2 className="text-center text-[22px] md:text-[28px] font-black text-[#1a1a1a] uppercase tracking-widest mb-10 md:mb-16">
              Other Albums
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              {otherAlbums.map((a) => (
                <Link
                  key={a.id}
                  to={`/music/${a.id}`}
                  className="group block"
                >
                  <div className="relative aspect-square w-full bg-[#1a1a1a] mb-0 md:mb-4">
                    <img
                      src={a.coverImage}
                      alt={a.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Mobile Only Overlay */}
                    <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                      <h4 className="text-white text-[16px] font-bold uppercase tracking-wider mb-0.5">
                        {a.title}
                      </h4>
                      <p className="text-gray-300 text-[11px]">{a.artist}</p>
                    </div>
                  </div>

                  {/* Desktop Only Text Below */}
                  <div className="hidden md:block">
                    <h4 className="text-[#1a1a1a] text-[13px] font-bold uppercase tracking-widest mb-1 group-hover:text-[#2596BE] transition-colors">
                      {a.title}
                    </h4>
                    <p className="text-[#9ca3af] text-[11px]">{a.artist}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
}
