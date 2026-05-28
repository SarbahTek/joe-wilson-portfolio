import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mediaItems, type MediaItem } from "@/mocks/media";

import photo1 from "@/assets/media/photos1.jpg";
import photo2 from "@/assets/media/photos2.jpg";
import photo3 from "@/assets/media/photos3.jpg";
import photo4 from "@/assets/media/photos4.jpg";
import photo5 from "@/assets/media/photos5.jpg";
import photo6 from "@/assets/media/photos6.jpg";
import photo7 from "@/assets/media/photos7.jpg";
import photo8 from "@/assets/media/photos8.jpg";
import photo9 from "@/assets/media/photos9.jpg";

const tabs = [
  { key: "video", label: "Video" },
  { key: "audio", label: "Audio" },
  { key: "photos", label: "Photos" },
];

const filters = [
  { key: "all", label: "ALL" },
  { key: "live", label: "LIVE" },
  { key: "studio", label: "STUDIO" },
  { key: "rehearsal", label: "REHEARSAL" },
  { key: "teaching", label: "TEACHING" },
];

const photoFilters = [
  { key: "all", label: "ALL" },
  { key: "live", label: "LIVE" },
  { key: "studio", label: "STUDIO" },
  { key: "masterclass", label: "MASTERCLASS" },
  { key: "behind_the_scenes", label: "BEHIND THE SCENES" },
];

const photosList = [
  { id: 1, src: photo1, category: "live" },
  { id: 2, src: photo2, category: "studio" },
  { id: 3, src: photo3, category: "live" },
  { id: 4, src: photo4, category: "masterclass" },
  { id: 5, src: photo5, category: "behind_the_scenes" },
  { id: 6, src: photo6, category: "live" },
  { id: 7, src: photo7, category: "studio" },
  { id: 8, src: photo8, category: "live" },
  { id: 9, src: photo9, category: "masterclass" },
  { id: 10, src: photo1, category: "live" },
  { id: 11, src: photo2, category: "studio" },
  { id: 12, src: photo3, category: "behind_the_scenes" },
];

const PAGE_SIZE = 9;

// ─── Lightbox Component ──────────────────────────────────────────────────────

function Lightbox({ photos, currentIndex, onClose, onNavigate }: { photos: any[], currentIndex: number, onClose: () => void, onNavigate: (index: number) => void }) {
  if (currentIndex === null) return null;
  const photo = photos[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative inline-flex items-center justify-center max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={photo.src} alt="Gallery" className="max-w-[90vw] max-h-[75vh] object-contain shadow-2xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 cursor-pointer"
        >
          <i className="ri-close-fill text-2xl" />
        </button>

        {/* Navigation */}
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate((currentIndex - 1 + photos.length) % photos.length); }}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-white text-white hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm"
        >
          <i className="ri-arrow-left-line text-sm" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNavigate((currentIndex + 1) % photos.length); }}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-white text-white hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm"
        >
          <i className="ri-arrow-right-line text-sm" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-8 py-2 border border-white/20 text-white text-[12px] tabular-nums tracking-widest bg-black/80">
          {currentIndex + 1}/{photos.length}
        </div>
      </div>
    </div>
  );
}

// ─── Video Component ─────────────────────────────────────────────────────────

function VideoCard({ item }: { item: MediaItem }) {
  const navigate = useNavigate();
  return (
    <div className="group cursor-pointer" onClick={() => navigate(`/media/${item.id}`)}>
      <div className="relative w-full aspect-[4/3] md:aspect-[1.3] overflow-hidden bg-black mb-4">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />

        {/* Category badge */}
        <div className="absolute top-4 left-4 bg-black/60 px-3 py-1">
          <span className="text-white text-[10px] font-bold uppercase tracking-widest">
            {item.category === "masterclass" ? "teaching" : item.category}
          </span>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[48px] h-[32px] md:w-[56px] md:h-[38px] bg-[#ff0000] flex items-center justify-center group-hover:bg-[#cc0000] transition-colors">
            <i className="ri-play-fill text-white text-xl md:text-2xl" />
          </div>
        </div>
      </div>

      <h3 className="text-[#1a1a1a] text-[15px] font-bold mb-2 transition-colors">
        {item.title}
      </h3>
      <p className="text-[#6b7280] text-[12px] leading-relaxed line-clamp-2">
        {item.description}
      </p>
    </div>
  );
}

// ─── Audio Components ────────────────────────────────────────────────────────

const streamingPlatforms = [
  { name: "Spotify", icon: "ri-spotify-fill", color: "#1DB954", url: "#" },
  { name: "Apple Music", icon: "ri-apple-fill", color: "#fc3c44", url: "#" },
  { name: "YouTube Music", icon: "ri-youtube-fill", color: "#FF0000", url: "#" },
];

const studioSamples = [
  { id: "sample-1", title: "Gospel Bass Groove - Session Clip", duration: "2:14", progress: 35, currentTime: "0:45" },
  { id: "sample-2", title: "Gospel Bass Groove - Session Clip", duration: "2:14", progress: 35, currentTime: "0:45" },
  { id: "sample-3", title: "Gospel Bass Groove - Session Clip", duration: "2:14", progress: 35, currentTime: "0:45" },
];

const mixingShowcase = [
  { id: "mix-1", title: "Progressive Rock Mixdown", progress: 35, currentTime: "0:45", duration: "2:14", thumb: "https://readdy.ai/api/search-image?query=dark%20music%20studio%20mixing%20board%20close%20up%2C%20professional%20audio%20equipment%2C%20dark%20moody%20atmosphere%2C%20recording%20studio%2C%20dramatic%20lighting%2C%20cinematic%20photography&width=500&height=280&seq=mix-thumb-1&orientation=landscape" },
  { id: "mix-2", title: "Progressive Rock Mixdown", progress: 35, currentTime: "0:45", duration: "2:14", thumb: "https://readdy.ai/api/search-image?query=bass%20guitar%20strings%20close%20up%20dark%20background%2C%20professional%20music%20photography%2C%20dramatic%20lighting%2C%20moody%20atmosphere%2C%20studio%20session&width=500&height=280&seq=mix-thumb-2&orientation=landscape" },
  { id: "mix-3", title: "Progressive Rock Mixdown", progress: 35, currentTime: "0:45", duration: "2:14", thumb: "https://readdy.ai/api/search-image?query=musician%20hands%20playing%20bass%20guitar%20dark%20studio%2C%20professional%20photography%2C%20dramatic%20shadows%2C%20music%20recording%20session%2C%20cinematic%20lighting&width=500&height=280&seq=mix-thumb-3&orientation=landscape" },
  { id: "mix-4", title: "Progressive Rock Mixdown", progress: 35, currentTime: "0:45", duration: "2:14", thumb: "https://readdy.ai/api/search-image?query=dark%20concert%20stage%20with%20dramatic%20lighting%2C%20bass%20musician%20performing%2C%20deep%20shadows%2C%20moody%20atmosphere%2C%20professional%20music%20photography&width=500&height=280&seq=mix-thumb-4&orientation=landscape" },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="h-[1px] w-8 bg-[#077DA7]" />
      <h3 className="text-[#077DA7] text-[15px] font-inter font-medium">{title}</h3>
    </div>
  );
}

function AudioTab() {
  return (
    <div className="w-full">
      {/* Streaming Platforms */}
      <div className="mb-16">
        <SectionHeader title="Listen on Streaming Platforms" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {streamingPlatforms.map((p, i) => (
            <a
              key={i}
              href={p.url}
              className="flex items-center gap-5 bg-[#F5F6FA] px-8 py-7 hover:bg-[#e5e7eb] transition-colors"
            >
              <i className={`${p.icon} text-[32px]`} style={{ color: p.color }} />
              <div className="flex flex-col justify-center">
                <span className="text-gray-400 text-[9px] uppercase font-bold tracking-widest mb-1">AVAILABLE ON</span>
                <span className="text-[#1a1a1a] text-[15px] font-bold">{p.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Studio Samples */}
      <div className="mb-20">
        <SectionHeader title="Studio Samples" />
        <div className="flex flex-col gap-4">
          {studioSamples.map((track) => (
            <div key={track.id} className="bg-[#F5F6FA] flex flex-col md:flex-row md:items-center gap-3 md:gap-6 px-5 md:px-6 py-4 md:py-4">

              {/* Mobile Title (Only visible on mobile) */}
              <span className="text-[#1a1a1a] text-[13px] md:text-[14px] font-medium block md:hidden mb-1">
                {track.title}
              </span>

              <div className="flex items-center gap-3 md:gap-6 w-full">
                {/* Play button */}
                <button className="w-10 h-10 md:w-12 md:h-12 bg-[#077DA7] flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-[#066588] transition-colors rounded-[4px] md:rounded-none">
                  <i className="ri-play-fill text-white text-lg md:text-xl" />
                </button>

                {/* Desktop Title (Only visible on desktop) */}
                <span className="text-[#1a1a1a] text-[14px] font-medium hidden md:block w-64 flex-shrink-0">
                  {track.title}
                </span>

                {/* Progress */}
                <div className="flex-1 flex items-center gap-2 md:gap-4 min-w-0">
                  <span className="text-gray-400 text-[10px] md:text-[11px] tabular-nums">{track.currentTime}</span>
                  <div className="flex-1 h-2 md:h-2 bg-[#C1DCE8] relative rounded-full md:rounded-none">
                    <div className="absolute top-0 left-0 h-full bg-[#077DA7] rounded-full md:rounded-none" style={{ width: `${track.progress}%` }} />
                  </div>
                  <span className="text-gray-400 text-[10px] md:text-[11px] tabular-nums">{track.duration}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 ml-1 md:ml-4">
                  <button className="text-gray-400 hover:text-[#077DA7] cursor-pointer transition-colors">
                    <i className="ri-download-2-line text-base md:text-lg" />
                  </button>
                  <button className="text-gray-400 hover:text-[#077DA7] cursor-pointer transition-colors">
                    <i className="ri-share-line text-base md:text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mixing Showcase */}
      <div>
        <SectionHeader title="Mixing Showcase" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mixingShowcase.map((mix) => (
            <div key={mix.id} className="relative aspect-[16/9] md:aspect-[1.8] bg-[#1a1a1a] group">
              <img src={mix.thumb} alt={mix.title} className="w-full h-full object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-50" />

              {/* Tags */}
              <div className="absolute top-6 left-6 flex">
                <span className="bg-[#077DA7] text-white text-[10px] font-bold px-4 py-2 uppercase tracking-widest">
                  FINAL MIX
                </span>
                <span className="bg-[#111] text-gray-400 text-[10px] font-bold px-4 py-2 uppercase tracking-widest">
                  RAW DI
                </span>
              </div>

              {/* Title */}
              <h4 className="absolute bottom-20 left-6 right-6 text-white text-[20px] md:text-[24px] font-bold">
                {mix.title}
              </h4>

              {/* Player */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center flex-shrink-0 cursor-pointer">
                  <i className="ri-play-fill text-[#077DA7] text-xl" />
                </button>
                <span className="text-gray-400 text-[11px] tabular-nums">{mix.currentTime}</span>
                <div className="flex-1 h-1 bg-white/20 relative">
                  <div className="absolute top-0 left-0 h-full bg-[#077DA7]" style={{ width: `${mix.progress}%` }} />
                </div>
                <span className="text-gray-400 text-[11px] tabular-nums">{mix.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function MediaGrid() {
  const [activeTab, setActiveTab] = useState("photos"); // Defaulting to Photos to show the new UI
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter Logic
  const filteredVideos = mediaItems.filter((item) => {
    if (activeFilter === "all") return true;
    const cat = item.category === "masterclass" ? "teaching" : item.category;
    if (activeFilter !== "all" && cat !== activeFilter && item.category !== activeFilter) return false;
    return true;
  });

  const filteredPhotos = photosList.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  const visibleVideos = filteredVideos.slice(0, visibleCount);
  const visiblePhotos = filteredPhotos.slice(0, visibleCount);

  const hasMoreVideos = visibleCount < filteredVideos.length;
  const hasMorePhotos = visibleCount < filteredPhotos.length;

  return (
    <section className="bg-white py-16 px-4 md:px-16">
      <div className="max-w-[1120px] mx-auto">
        {/* Tabs */}
        <div className="flex items-center gap-6 md:gap-10 border-b border-[#e5e7eb] mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setActiveFilter("all"); setVisibleCount(PAGE_SIZE); }}
              className={`pb-3 text-[13px] md:text-[14px] font-medium tracking-wide transition-colors cursor-pointer relative ${activeTab === tab.key
                  ? "text-[#077DA7]"
                  : "text-[#6b7280] hover:text-[#1a1a1a]"
                }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#077DA7]" />
              )}
            </button>
          ))}
        </div>

        {/* Filters for Video */}
        {activeTab === "video" && (
          <div className="flex flex-wrap items-center gap-4 mb-10">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => { setActiveFilter(f.key); setVisibleCount(PAGE_SIZE); }}
                className={`px-8 py-3 text-[13px] font-inter uppercase tracking-wide transition-colors cursor-pointer ${activeFilter === f.key
                    ? "bg-[#077DA7] text-white"
                    : "bg-[#F5F6FA] text-[#4b5563] hover:bg-[#e5e7eb]"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Filters for Photos */}
        {activeTab === "photos" && (
          <div className="flex flex-wrap items-center gap-4 mb-10">
            {photoFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => { setActiveFilter(f.key); setVisibleCount(PAGE_SIZE); }}
                className={`px-8 py-3 text-[13px] font-inter uppercase tracking-wide transition-colors cursor-pointer ${activeFilter === f.key
                    ? "bg-[#077DA7] text-white"
                    : "bg-[#F5F6FA] text-[#4b5563] hover:bg-[#e5e7eb]"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Video Grid */}
        {activeTab === "video" && (
          <>
            {visibleVideos.length === 0 ? (
              <div className="text-center py-16 text-[#6b7280]">
                <p className="text-sm">No videos found for this filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-12">
                {visibleVideos.map((item) => (
                  <VideoCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {hasMoreVideos && (
              <div className="flex justify-center mt-16">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="border border-[#e5e7eb] text-[#1a1a1a] text-[11px] font-bold px-10 py-3 uppercase tracking-widest hover:border-[#1a1a1a] transition-colors cursor-pointer"
                >
                  LOAD MORE
                </button>
              </div>
            )}
          </>
        )}

        {/* Audio Grid */}
        {activeTab === "audio" && <AudioTab />}

        {/* Photos Grid */}
        {activeTab === "photos" && (
          <>
            {visiblePhotos.length === 0 ? (
              <div className="text-center py-16 text-[#6b7280]">
                <p className="text-sm">No photos found for this filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {visiblePhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="relative aspect-[4/3] cursor-pointer group bg-[#f3f4f6] overflow-hidden"
                    onClick={() => setLightboxIndex(index)}
                  >
                    <img
                      src={photo.src}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Gallery item"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                ))}
              </div>
            )}

            {hasMorePhotos && (
              <div className="flex justify-center mt-16">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="border border-[#e5e7eb] text-[#1a1a1a] text-[11px] font-bold px-10 py-3 uppercase tracking-widest hover:border-[#1a1a1a] transition-colors cursor-pointer"
                >
                  LOAD MORE
                </button>
              </div>
            )}

            {/* Lightbox */}
            {lightboxIndex !== null && (
              <Lightbox
                photos={filteredPhotos}
                currentIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onNavigate={(idx) => setLightboxIndex(idx)}
              />
            )}
          </>
        )}

      </div>
    </section>
  );
}
