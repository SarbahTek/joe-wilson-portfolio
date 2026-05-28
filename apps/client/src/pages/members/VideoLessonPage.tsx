import { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import MembersNavbar from "./components/MembersNavbar";
import Footer from "@/components/feature/Footer";
import { useMasterclass } from "@/hooks/masterclasses/useMasterclasses";
import { useSessionUi, useUpdateSessionProgress } from "@/hooks/sessions/useSession";
import { getErrorMessage } from "@/lib/errors";
import heroImg from "@/assets/home/basemasterclass2.jpg";

export default function VideoLessonPage() {
  const { cohortId, sessionId } = useParams();
  const [playing, setPlaying] = useState(false);
  const { data: cohort, isLoading: cohortLoading } = useMasterclass(cohortId);
  const {
    data: sessionDetail,
    uiSession,
    playbackUrl,
    progress,
    isLoading: sessionLoading,
    isError,
    error,
  } = useSessionUi(sessionId);
  const updateProgress = useUpdateSessionProgress(sessionId ?? "");

  const sessions = cohort?.sessionList || [];
  const currentIdx = sessions.findIndex((s) => s.id === sessionId);
  const session = uiSession ?? sessions[currentIdx];

  useEffect(() => {
    window.scrollTo(0, 0);
    setPlaying(false);
  }, [sessionId]);

  const handlePlay = () => {
    setPlaying(true);
    if (sessionId && sessionDetail) {
      updateProgress.mutate({
        watchedSeconds: progress?.watchedSeconds ?? 0,
        completed: false,
      });
    }
  };

  if (cohortLoading || sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <i className="ri-loader-4-line animate-spin text-3xl text-[#077DA7]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-3 px-4">
        <p className="text-sm text-red-600">{getErrorMessage(error)}</p>
        <Link to={`/members/${cohortId}`} className="text-sm text-[#077DA7] hover:underline">Back to Masterclass</Link>
      </div>
    );
  }

  if (!cohort || !session) return <Navigate to={`/members/${cohortId}`} replace />;

  const videoSrc = playbackUrl ?? "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
  const progressPercent = progress?.watchedSeconds && sessionDetail?.durationSeconds
    ? Math.min(100, (progress.watchedSeconds / sessionDetail.durationSeconds) * 100)
    : 35;

  const prevSession = currentIdx > 0 ? sessions[currentIdx - 1] : null;
  const nextSession = currentIdx < sessions.length - 1 ? sessions[currentIdx + 1] : null;

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter">

      {/* ── Hero with MembersNavbar ── */}
      <div
        className="relative h-[180px] md:h-[240px] overflow-hidden"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <MembersNavbar />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-1.5 md:mb-2"
            style={{ letterSpacing: "0.3em" }}
          >
            Video Lesson
          </h1>
          <div
            className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-400 uppercase font-medium flex-wrap justify-center"
            style={{ letterSpacing: "0.15em" }}
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-500">/</span>
            <Link to="/members" className="hover:text-white transition-colors">Members Area</Link>
            <span className="text-gray-500">/</span>
            <Link to={`/members/${cohortId}`} className="hover:text-white transition-colors">Masterclass</Link>
            <span className="text-gray-500">/</span>
            <span className="text-[#2596BE]">Video</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 w-full max-w-[940px] mx-auto px-4 md:px-6 py-8">

        {/* Back link */}
        <Link
          to={`/members/${cohortId}`}
          className="inline-flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-gray-900 mb-5 transition-colors"
        >
          <i className="ri-arrow-left-s-line text-base" />
          Back to Masterclass
        </Link>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">

          {/* ── Left: Video + Info ── */}
          <div className="flex-1 min-w-0">

            {/* ── Video Player ── */}
            <div className="relative w-full bg-black mb-5 overflow-hidden" style={{ aspectRatio: "16/9" }}>
              {/* Live badge */}
              {session.status === "live" && (
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Live Now
                </div>
              )}

              {playing ? (
                <iframe
                  className="w-full h-full"
                  src={videoSrc.includes("youtube") || videoSrc.includes("vimeo") ? videoSrc : videoSrc}
                  title={session.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={cohort.bannerImage || cohort.image}
                    alt={session.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                  >
                    <div className="w-16 h-16 flex items-center justify-center bg-[#077DA7] rounded-full group-hover:scale-110 transition-transform shadow-lg">
                      <i className="ri-play-fill text-white text-3xl ml-1" />
                    </div>
                  </button>

                  {/* Duration / progress bar mock */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="w-full h-[3px] bg-white/20 rounded-full mb-1">
                      <div className="h-full bg-[#077DA7] rounded-full" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-white/70 text-[10px]">
                      <span>0:00</span>
                      <span>35:22</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ── Session Info ── */}
            <h2 className="text-[18px] font-bold text-[#1a1a1a] mb-2">
              Session {session.sessionNumber}: {session.title}
            </h2>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
              {session.description}
            </p>

            {/* ── Prev / Next ── */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
              {prevSession ? (
                <Link
                  to={`/members/${cohortId}/session/${prevSession.id}`}
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 border border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900 transition-colors"
                >
                  <i className="ri-arrow-left-s-line text-base" />
                  Previous Lesson
                </Link>
              ) : (
                <div />
              )}

              {nextSession ? (
                <Link
                  to={`/members/${cohortId}/session/${nextSession.id}`}
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 bg-[#077DA7] text-white hover:bg-[#06658a] transition-colors"
                >
                  Next Lesson
                  <i className="ri-arrow-right-s-line text-base" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* ── Right: Sessions Sidebar ── */}
          <div className="lg:w-[240px] flex-shrink-0">
            <h3 className="text-[22px] font-bold text-[#1a1a1a] mb-4">Sessions</h3>
            <div className="flex flex-col">
              {sessions.map((s, idx) => {
                const isActive = s.id === sessionId;
                return (
                  <Link
                    key={s.id}
                    to={`/members/${cohortId}/session/${s.id}`}
                    className={`flex items-center justify-between px-3 py-3 text-[11px] font-bold uppercase tracking-widest border-b border-gray-200 last:border-b-0 transition-colors ${
                      isActive
                        ? "bg-[#e8f4fa] text-[#077DA7]"
                        : "text-[#1a1a1a] hover:bg-gray-50 hover:text-[#077DA7]"
                    }`}
                  >
                    <span>{idx + 1}.{s.title.toUpperCase()}</span>
                    {s.status === "live" && !isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 ml-1 animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
