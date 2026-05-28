import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronDown,
} from "lucide-react";
import listennow1 from "@/assets/home/listennow1.jpg";
import listennow2 from "@/assets/home/listennow2.jpg";
import listennow3 from "@/assets/home/listennow3.jpg";
import listennow4 from "@/assets/home/listennow4.jpg";
import listennow5 from "@/assets/home/listennow5.jpg";

interface AlbumTrack {
  title: string;
  duration: string;
}

interface Track {
  title: string;
  genre: string;
  image: string;
  backgroundColor: string;
  albumTracks: AlbumTrack[];
  description: string;
}

const tracks: Track[] = [
  {
    title: "Dark Canvas",
    genre: "Jazz",
    image: listennow1,
    backgroundColor: "#3D7A8A",
    albumTracks: [
      { title: "Hello", duration: "3:24" },
      { title: "Living Proof", duration: "4:12" },
      { title: "Believe In", duration: "3:58" },
      { title: "Joy The Lord", duration: "5:01" },
    ],
    description:
      "A soulful journey through jazz bass fundamentals, blending classic grooves with modern sensibilities.",
  },
  {
    title: "Bankrupcy",
    genre: "Ballad",
    image: listennow2,
    backgroundColor: "#3D4E8F",
    albumTracks: [
      { title: "Fading Light", duration: "4:30" },
      { title: "Second Chance", duration: "3:55" },
      { title: "Lost & Found", duration: "4:22" },
      { title: "Rise Again", duration: "5:10" },
    ],
    description:
      "Heartfelt ballads driven by deep bass lines and emotional storytelling.",
  },
  {
    title: "Baseless",
    genre: "Rock",
    image: listennow3,
    backgroundColor: "#9CA3AF",
    albumTracks: [
      { title: "Baseless", duration: "3:48" },
      { title: "Rock Solid", duration: "4:05" },
      { title: "Foundation", duration: "3:32" },
      { title: "Ground Zero", duration: "4:44" },
    ],
    description:
      "Heavy grooves and powerful bass lines that anchor every riff and rhythm.",
  },
  {
    title: "Class Act",
    genre: "Disco",
    image: listennow4,
    backgroundColor: "#8B1A1A",
    albumTracks: [
      { title: "Class Act", duration: "4:15" },
      { title: "Funky Town", duration: "3:50" },
      { title: "Dance Floor", duration: "4:28" },
      { title: "Smooth Operator", duration: "5:05" },
    ],
    description:
      "Disco-infused grooves and funk bass lines that keep the dance floor alive.",
  },
  {
    title: "The Spin",
    genre: "Hip-Hop",
    image: listennow5,
    backgroundColor: "#C49A00",
    albumTracks: [
      { title: "The Spin", duration: "3:38" },
      { title: "Bass Drop", duration: "4:00" },
      { title: "Street Vibes", duration: "3:52" },
      { title: "Urban Groove", duration: "4:18" },
    ],
    description:
      "Hip-hop bass lines with an urban edge and gritty street flavor.",
  },
];

function WaveformSVG() {
  const bars = [3, 6, 10, 7, 14, 9, 5, 12, 8, 6, 11, 7, 4, 9, 5];
  return (
    <svg width="16" height="48" viewBox="0 0 16 48" fill="none">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 1.07}
          y={(48 - h) / 2}
          width="0.7"
          height={h}
          fill="rgba(255,255,255,0.3)"
        />
      ))}
    </svg>
  );
}

/* ─── Listen Album Modal ─────────────────────────────────────────────────── */
function ListenModal({
  track,
  onClose,
}: {
  track: Track;
  onClose: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/60 p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full shadow-2xl flex flex-col md:flex-row my-auto"
        style={{ maxWidth: 1000 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* X – top-right corner of modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors z-10"
        >
          <X size={16} />
        </button>

        {/* ── LEFT: padded image + player ── */}
        <div className="flex-shrink-0 p-6 md:p-8 w-full md:w-[450px]">
          {/* image wrapper — player overlaid at its bottom */}
          <div className="relative w-full aspect-square md:h-[400px] md:aspect-auto">
            <img
              src={track.image}
              alt={track.title}
              className="w-full h-full object-cover"
            />

            {/* Mini player — dark bar overlaid at bottom of image */}
            <div
              className="absolute bottom-2 left-2 right-2 px-2 pt-1 pb-2"
              style={{ background: "rgba(255, 255, 255, 0.8)" }}
            >
              {/* Controls row */}
              <div className="flex items-center justify-center gap-3 mb-1">
                <button
                  className="text-gray-900 hover:text-white transition-colors"
                  onClick={() => setActiveTrack((p) => Math.max(0, p - 1))}
                >
                  <SkipBack size={12} />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-gray-900 hover:text-white/80 transition-colors"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button
                  className="text-gray-900 hover:text-white transition-colors"
                  onClick={() =>
                    setActiveTrack((p) =>
                      Math.min(track.albumTracks.length - 1, p + 1)
                    )
                  }
                >
                  <SkipForward size={12} />
                </button>
              </div>

              {/* Progress bar + timestamps */}
              <div className="flex items-center gap-3">
                <span className="text-gray-900 text-[10px] tabular-nums leading-none flex-shrink-0">
                  00:00
                </span>
                <div className="relative flex-1 h-px bg-gray-900 ">
                  <div className="absolute left-0 top-0 h-full bg-gray-900 w-0" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-900"
                    style={{ left: "-3px" }}
                  />
                </div>
                <span className="text-gray-900 text-[10px] tabular-nums leading-none flex-shrink-0">
                  {track.albumTracks[activeTrack]?.duration ?? "00:00"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: title, description, tracklist ── */}
        <div className="flex-1 flex flex-col min-w-0 px-6 pb-8 md:py-6 md:pr-8 md:pl-4">
          {/* Title */}
          <h2
            className="font-bold uppercase text-gray-900 leading-none mb-4"
            style={{ fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "0.03em" }}
          >
            {track.title}
          </h2>

          {/* Description */}
          <p className="text-xs text-gray-500 leading-relaxed mb-5">
            {track.description}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-0" />

          {/* Flat tracklist: name left, ► right */}
          <div className="flex-1 overflow-y-auto">
            {track.albumTracks.map((albumTrack, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveTrack(i);
                  setIsPlaying(true);
                }}
                className="w-full flex items-center justify-between py-3.5 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left group"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-gray-800 group-hover:text-gray-900">
                  {albumTrack.title}
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
  );
}

/* ─── Book Me Modal ──────────────────────────────────────────────────────── */
function BookModal({
  onClose,
}: {
  track: Track;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-2xl w-full"
        style={{ maxWidth: 580 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 font-inter">Request A Quote</h2>

            <p className="text-xs text-gray-900 mt-0.5">
              They'll get an email with a one-time link to set up their account.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors ml-4 mt-0.5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full name</label>
              <input
                type="text"
                placeholder="Welcome and Foundations"
                className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="jane@example.com"
                className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Service</label>
              <div className="relative">
                <select className="w-full appearance-none border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white pr-8">
                  <option>Live Performance</option>
                  <option>Music Direction</option>
                  <option>Studio Session</option>
                  <option>Masterclass</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Event Date</label>
              <input
                type="text"
                placeholder="MM / DD / YYYY"
                className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="jane@example.com"
                className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Budget Range</label>
              <input
                type="text"
                placeholder="eg.$185 – $200"
                className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              placeholder="Tell me more about your event or project"
              rows={4}
              className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-end">
          <button
            className="text-white font-bold text-sm px-5 py-2.5 transition-colors"
            style={{ backgroundColor: "#077DA7" }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = "#066894")}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = "#077DA7")}
          >

            Request A Quote
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function ListenNowSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [listenModal, setListenModal] = useState<number | null>(null);
  const [bookModal, setBookModal] = useState<number | null>(null);

  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % tracks.length);

  const visibleItems = [-2, -1, 0, 1, 2].map((offset) => {
    const index = (activeIndex + offset + tracks.length) % tracks.length;
    return { ...tracks[index], originalIndex: index, offset, isActive: offset === 0 };
  });

  return (
    <section className="bg-white py-16 overflow-hidden">
      {/* Title */}
      <h2 className="mb-10 text-center font-inter text-[clamp(28px,3.2vw,42px)] font-bold uppercase tracking-tight text-gray-900">
        Listen Now
      </h2>

      {/* Carousel */}
      <div className="relative">
        {/* Cards row — bottoms aligned */}
        <div className="flex items-end justify-center gap-6">
          {visibleItems.map(({ originalIndex, isActive, image, title, genre }) => {
            const cardW = isActive ? 280 : 196;
            const cardH = isActive ? 280 : 196;

            return (
              <div
                key={originalIndex}
                className="flex flex-col items-center flex-shrink-0"
                style={{ transition: "all 0.4s ease" }}
              >
                {/* Card — just the image, no background, buttons overlaid on it */}
                <div
                  className="relative overflow-hidden"
                  style={{ width: cardW, height: cardH, flexShrink: 0, transition: "all 0.4s ease" }}
                >
                  {/* Image fills the entire card */}
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />

                  {/* Waveform on non-active cards */}
                  {!isActive && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                      <WaveformSVG />
                    </div>
                  )}

                  {/* Action buttons — overlaid ON the image, near the bottom */}
                  {isActive && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 z-10">
                      <button
                        onClick={() => setListenModal(originalIndex)}
                        className="text-white text-[11px] font-bold px-5 py-2.5 tracking-wide"
                        style={{ backgroundColor: "#077DA7" }}
                      >
                        LISTEN ALBUM
                      </button>
                      <button
                        onClick={() => setBookModal(originalIndex)}
                        className="bg-white text-gray-900 text-[11px] font-bold px-5 py-2.5 tracking-wide"
                      >
                        BOOK ME
                      </button>
                    </div>
                  )}
                </div>

                {/* Genre label */}
                <p className="mt-2 text-[10px] uppercase tracking-widest text-gray-400 leading-none">
                  {genre}
                </p>
                {/* Album title */}
                <p
                  className="font-black uppercase text-gray-900 tracking-wide leading-tight mt-0.5"
                  style={{ fontSize: isActive ? 14 : 12 }}
                >
                  {title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Left navigation arrow — between card -1 and card 0 */}
        <button
          onClick={handlePrev}
          className="absolute z-20 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          style={{
            left: "calc(50% - 168px)",
            top: 140,
            transform: "translateY(-50%)",
          }}
        >
          <ChevronLeft size={15} />
        </button>

        {/* Right navigation arrow — between card 0 and card +1 */}
        <button
          onClick={handleNext}
          className="absolute z-20 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          style={{
            right: "calc(50% - 168px)",
            top: 140,
            transform: "translateY(-50%)",
          }}
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Listen Album Modal */}
      {listenModal !== null && (
        <ListenModal
          track={tracks[listenModal]}
          onClose={() => setListenModal(null)}
        />
      )}

      {/* Book Me Modal */}
      {bookModal !== null && (
        <BookModal
          track={tracks[bookModal]}
          onClose={() => setBookModal(null)}
        />
      )}
    </section>
  );
}
