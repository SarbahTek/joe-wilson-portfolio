import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CTASection from "@/components/feature/CTASection";
import { albums } from "@/mocks/albums";
import heroImg from "@/assets/music/albumhero.jpg";

const ALBUMS_PER_PAGE = 6;

export default function MusicPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(albums.length / ALBUMS_PER_PAGE) || 4; // Mocking 4 pages for UI parity
  const paginatedAlbums = albums.slice(
    (currentPage - 1) * ALBUMS_PER_PAGE,
    currentPage * ALBUMS_PER_PAGE
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative h-[250px] md:h-[350px] w-full">
        <img
          src={heroImg}
          alt="Albums Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-1 md:mb-2">
            Albums
          </h1>
          <div className="flex items-center gap-2 text-[10px] md:text-[12px] text-white/80 font-medium tracking-widest">
            <Link to="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white">ALBUMS</span>
          </div>
        </div>
      </section>

      {/* ── Main Content Area ── */}
      <main className="flex-1 bg-white">
        {/* Albums Grid */}
        <section className="px-4 md:px-16 py-16 md:py-24">
          <div className="max-w-[1120px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {paginatedAlbums.map((album) => (
                <Link
                  key={album.id}
                  to={`/music/${album.id}`}
                  className="group relative block aspect-square overflow-hidden bg-[#1a1a1a]"
                >
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle gradient overlay at bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Album Info */}
                  <div className="absolute bottom-5 left-5 md:bottom-7 md:left-7 right-5">
                    <h3 className="text-white text-[16px] md:text-[18px] font-bold uppercase tracking-wider mb-0.5 md:mb-1">
                      {album.title}
                    </h3>
                    <p className="text-gray-300 text-[11px] md:text-[12px]">
                      {album.artist}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* ── Pagination ── */}
            <div className="flex items-center justify-center gap-3 mt-16 md:mt-24">
              {[1, 2, 3, 4].map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-[12px] md:text-[13px] font-bold transition-colors cursor-pointer ${currentPage === pageNumber
                      ? "bg-[#2596BE] text-white"
                      : "bg-white text-[#9ca3af] hover:text-[#1a1a1a]"
                    }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-[#9ca3af] hover:text-[#1a1a1a] transition-colors cursor-pointer"
              >
                <i className="ri-arrow-right-s-line text-[14px] md:text-[16px]" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
}
