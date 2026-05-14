import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import MembersNavbar from "./components/MembersNavbar";
import Footer from "@/components/feature/Footer";
import CTASection from "@/components/feature/CTASection";
import { cohorts } from "@/mocks/cohorts";
import heroImg from "@/assets/home/basemasterclass2.jpg";

/* ── Status badge config ── */
const statusConfig = {
  completed: {
    label: "Watch Replay",
    icon: "ri-play-circle-line",
    pillClass: "bg-[#e8f5e9] text-[#2e7d32]",
    actionClass: "border border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9]",
    actionLabel: "Watch Replay",
  },
  live: {
    label: "Live",
    icon: "ri-live-line",
    pillClass: "bg-[#fff3e0] text-[#e65100]",
    actionClass: "bg-[#077DA7] text-white hover:bg-[#06658a]",
    actionLabel: "Join Live Session",
  },
  upcoming: {
    label: "Upcoming",
    icon: "ri-time-line",
    pillClass: "bg-[#e3f2fd] text-[#1565c0]",
    actionClass: "border border-gray-300 text-gray-400 cursor-not-allowed",
    actionLabel: "Upcoming",
  },
};

export default function MasterclassDetailPage() {
  const { cohortId } = useParams();
  const cohort = cohorts.find((c) => c.id === cohortId) || cohorts[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cohortId]);

  if (!cohort) return <Navigate to="/members" replace />;

  const sessions = cohort.sessionList || [];
  const resources = cohort.resourceList || [];

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter">

      {/* ── Hero with MembersNavbar ── */}
      <div
        className="relative h-[220px] md:h-[280px] overflow-hidden"
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
            Masterclass
          </h1>
          <div
            className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-400 uppercase font-medium"
            style={{ letterSpacing: "0.18em" }}
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-500">/</span>
            <Link to="/members" className="hover:text-white transition-colors">Members Area</Link>
            <span className="text-gray-500">/</span>
            <span className="text-[#2596BE]">Masterclass</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 w-full max-w-[940px] mx-auto px-4 md:px-6 py-8">

        {/* Back link */}
        <Link
          to="/members"
          className="inline-flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-gray-900 mb-5 transition-colors"
        >
          <i className="ri-arrow-left-s-line text-base" />
          Back to Masterclasses
        </Link>

        {/* ── Wide Banner Image ── */}
        <div className="w-full overflow-hidden mb-8" style={{ height: "220px" }}>
          <img
            src={cohort.bannerImage || cohort.image}
            alt={cohort.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* ── About ── */}
        <div className="mb-8">
          <h2 className="text-[18px] font-bold text-[#1a1a1a] mb-3">About this Masterclass</h2>
          <p className="text-[13px] text-gray-500 leading-relaxed max-w-2xl">
            {cohort.description}
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="h-[1px] bg-gray-200 mb-8" />

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-28">

          {/* ── Left: Sessions ── */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-6">Sessions</h3>

            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200" />

              <div className="flex flex-col gap-0">
                {sessions.map((session) => {
                  const cfg = statusConfig[session.status];
                  return (
                    <div key={session.id} className="relative pl-8 pb-7 last:pb-0">
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-0 top-1.5 w-[16px] h-[16px] rounded-full border-2 border-white ring-2 ${session.status === "completed"
                          ? "ring-[#2e7d32] bg-[#2e7d32]"
                          : session.status === "live"
                            ? "ring-[#077DA7] bg-[#077DA7]"
                            : "ring-gray-300 bg-white"
                          }`}
                      />

                      {/* Session card */}
                      <div className="bg-white border border-gray-100 p-4 shadow-sm">
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                              Session {session.sessionNumber}
                            </p>
                            <h4 className="text-[14px] font-bold text-[#1a1a1a] leading-snug">
                              {session.title}
                            </h4>
                          </div>
                          <span className={`flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full ${cfg.pillClass}`}>
                            {cfg.label}
                          </span>
                        </div>

                        <p className="text-[12px] text-gray-400 leading-relaxed mb-3">
                          {session.description}
                        </p>

                        {/* Action button */}
                        {session.status !== "upcoming" ? (
                          <Link
                            to={`/members/${cohort.id}/session/${session.id}`}
                            className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-4 py-2 transition-colors ${cfg.actionClass}`}
                          >
                            <i className={`${cfg.icon} text-sm`} />
                            {cfg.actionLabel}
                          </Link>
                        ) : (
                          <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-4 py-2 ${cfg.actionClass}`}>
                            <i className={`${cfg.icon} text-sm`} />
                            {cfg.actionLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Resources ── */}
          <div className="lg:w-[280px] lg:ml-auto flex-shrink-0">
            <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-5">Resources</h3>

            <div className="bg-gray-50 border border-gray-100 p-4">
              <div className="flex flex-col divide-y divide-gray-200">
                {resources.map((res) => (
                  <div
                    key={res.id}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <i
                          className={`text-sm ${res.type === "pdf"
                            ? "ri-file-pdf-line text-red-400"
                            : res.type === "audio"
                              ? "ri-music-line text-[#077DA7]"
                              : "ri-file-line text-gray-400"
                            }`}
                        />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-[#1a1a1a] leading-none mb-0.5">
                          {res.title}
                        </p>
                        <p className="text-[10px] text-gray-400">{res.fileSize}</p>
                      </div>
                    </div>
                    <button className="text-gray-300 group-hover:text-[#077DA7] transition-colors ml-2">
                      <i className="ri-download-line text-base" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <button className="text-[11px] font-bold text-[#077DA7] hover:underline uppercase tracking-wider">
                  View All Session Resources
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
}
