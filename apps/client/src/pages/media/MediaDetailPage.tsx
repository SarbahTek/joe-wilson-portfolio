import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { mediaItems } from "@/mocks/media";
import Navbar from "@/components/feature/Navbar";
import CTASection from "@/components/feature/CTASection";
import Footer from "@/components/feature/Footer";

const categoryColors: Record<string, string> = {
  live: "#1ab8e8",
  studio: "#10b981",
  masterclass: "#f59e0b",
  interview: "#8b5cf6",
};

export default function MediaDetailPage() {
  const { mediaId } = useParams<{ mediaId: string }>();
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  const item = mediaItems.find((m) => m.id === mediaId);
  const related = mediaItems.filter((m) => m.id !== mediaId).slice(0, 4);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPlaying(false);
  }, [mediaId]);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
        <p className="text-white text-xl font-bold">Video not found</p>
        <Link to="/media" className="text-[#1ab8e8] hover:underline cursor-pointer">
          Back to Media
        </Link>
      </div>
    );
  }

  const catColor = categoryColors[item.category] ?? "#1ab8e8";

  return (
    <div className="min-h-screen bg-white">
      {/* ── Dark Hero with Navbar ── */}
      <div className="relative bg-gray-950">
        <Navbar />
        <div className="pt-20 pb-8 px-6 md:px-16 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
            <Link to="/" className="hover:text-[#1ab8e8] transition-colors cursor-pointer">Home</Link>
            <span>/</span>
            <Link to="/media" className="hover:text-[#1ab8e8] transition-colors cursor-pointer">Media</Link>
            <span>/</span>
            <span className="text-gray-300 truncate max-w-xs">{item.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* ── Main Video ── */}
            <div className="flex-1 min-w-0">
              {/* Video Player */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black mb-5">
                {playing ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
                    title={item.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <button
                      onClick={() => setPlaying(true)}
                      className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                    >
                      <div className="w-20 h-20 flex items-center justify-center bg-[#1ab8e8] rounded-full group-hover:scale-110 transition-transform">
                        <i className="ri-play-fill text-white text-4xl ml-1" />
                      </div>
                    </button>
                    {/* Duration badge */}
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
                        {item.duration}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Category + Title */}
              <div className="mb-4">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block"
                  style={{ backgroundColor: `${catColor}20`, color: catColor }}
                >
                  {item.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mt-2 leading-tight">
                  {item.title}
                </h1>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 mb-5 pb-5 border-b border-gray-100">
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-calendar-line text-sm" />
                  </div>
                  {item.date}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-eye-line text-sm" />
                  </div>
                  {item.views} views
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-time-line text-sm" />
                  </div>
                  {item.duration}
                </div>

                {/* Actions */}
                <div className="ml-auto flex items-center gap-3">
                  <button
                    onClick={() => setLiked((l) => !l)}
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                    style={{ color: liked ? catColor : "#9ca3af" }}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className={`${liked ? "ri-heart-fill" : "ri-heart-line"} text-base`} />
                    </div>
                    Like
                  </button>
                  <button className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors cursor-pointer whitespace-nowrap">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-share-line text-base" />
                    </div>
                    Share
                  </button>
                  <button className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors cursor-pointer whitespace-nowrap">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-download-line text-base" />
                    </div>
                    Save
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-gray-900 text-base font-black mb-3">About This Video</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{item.longDescription}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Artist card */}
              <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20male%20musician%20bassist%20portrait%20dark%20background%2C%20confident%20expression%2C%20studio%20lighting%2C%20music%20artist%20headshot&width=56&height=56&seq=artist-avatar-detail&orientation=squarish"
                    alt="Joseph Wilson"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm font-black">Joseph Wilson</p>
                  <p className="text-gray-500 text-xs">Bass Artist · Music Director · Producer</p>
                </div>
                <Link
                  to="/about"
                  className="flex-shrink-0 bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  View Profile
                </Link>
              </div>
            </div>

            {/* ── Sidebar: Related Videos ── */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <h3 className="text-white text-base font-black mb-4 uppercase tracking-wider">
                More Videos
              </h3>
              <div className="space-y-4">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/media/${rel.id}`)}
                    className="flex gap-3 group cursor-pointer"
                  >
                    <div className="relative w-32 h-20 rounded overflow-hidden flex-shrink-0 bg-black">
                      <img
                        src={rel.thumbnail}
                        alt={rel.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <div className="w-8 h-8 flex items-center justify-center bg-[#1ab8e8]/80 rounded-full">
                          <i className="ri-play-fill text-white text-sm ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-1 right-1">
                        <span className="bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                          {rel.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: categoryColors[rel.category] ?? "#1ab8e8" }}
                      >
                        {rel.category}
                      </span>
                      <h4 className="text-gray-200 text-xs font-bold leading-snug mt-0.5 group-hover:text-[#1ab8e8] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-gray-500 text-xs mt-1">{rel.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back to all */}
              <Link
                to="/media"
                className="mt-6 flex items-center gap-2 text-[#1ab8e8] text-sm font-bold hover:underline cursor-pointer"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-left-line text-base" />
                </div>
                All Media
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── More Videos Section (light bg) ── */}
      <section className="bg-white py-14 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-gray-900">You May Also Like</h2>
            <Link
              to="/media"
              className="text-[#1ab8e8] text-sm font-bold hover:underline cursor-pointer whitespace-nowrap"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaItems
              .filter((m) => m.id !== mediaId)
              .slice(0, 4)
              .map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/media/${rel.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black mb-3">
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute top-2 left-2">
                      <span
                        className="text-white text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                        style={{ backgroundColor: categoryColors[rel.category] ?? "#1ab8e8" }}
                      >
                        {rel.category}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <span className="bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                        {rel.duration}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#1ab8e8] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <i className="ri-play-fill text-white text-lg ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-gray-900 text-sm font-bold leading-snug group-hover:text-[#1ab8e8] transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-gray-400 text-xs">{rel.date}</span>
                    <span className="text-gray-400 text-xs">{rel.views} views</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
