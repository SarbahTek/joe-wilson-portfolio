import { useEffect } from "react";
import { Link } from "react-router-dom";
import MembersNavbar from "../components/MembersNavbar";
import Footer from "@/components/feature/Footer";
import { useMyEnrollments } from "@/hooks/masterclasses/useEnrollments";
import { getErrorMessage } from "@/lib/errors";
import heroImg from "@/assets/home/basemasterclass2.jpg";

export default function DashboardPage() {
  const { data: enrollments = [], isLoading, isError, error } = useMyEnrollments();
  const activeCohorts = enrollments.filter((c) => c.status === "ACTIVE").slice(0, 3);
  const stats = [
    { icon: "ri-book-open-line", label: "Enrolled Courses", value: isLoading || isError ? "—" : String(enrollments.length), color: "#077DA7" },
    { icon: "ri-play-circle-line", label: "Active Courses", value: isLoading || isError ? "—" : String(enrollments.filter(c => c.status === "ACTIVE").length), color: "#2e7d32" },
    { icon: "ri-trophy-line", label: "Completed Courses", value: isLoading || isError ? "—" : String(enrollments.filter(c => c.progressPercent >= 100).length), color: "#e65100" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col font-inter">

      {/* ── Hero with MembersNavbar ── */}
      <div
        className="relative h-[200px] md:h-[260px] overflow-hidden"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <MembersNavbar />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-1.5 md:mb-2"
            style={{ letterSpacing: "0.3em" }}
          >
            Dashboard
          </h1>
          <div
            className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-400 uppercase font-medium"
            style={{ letterSpacing: "0.18em" }}
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-500">/</span>
            <Link to="/members" className="hover:text-white transition-colors">Members Area</Link>
            <span className="text-gray-500">/</span>
            <span className="text-[#2596BE]">Dashboard</span>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <main className="flex-1 w-full max-w-[1100px] mx-auto px-4 md:px-6 py-10">

        {/* ── Welcome ── */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[11px] font-bold text-[#077DA7] uppercase tracking-widest mb-1">Welcome back</p>
            <h2 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">Good to see you again 👋</h2>
            <p className="text-[13px] text-gray-500 mt-1">Here's an overview of your learning progress.</p>
          </div>
          <Link
            to="/members"
            className="inline-flex items-center gap-2 bg-[#077DA7] text-white text-[11px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-[#06658a] transition-colors"
          >
            <i className="ri-play-circle-line text-sm" />
            Browse Masterclasses
          </Link>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 p-5 flex flex-col gap-3 shadow-sm">
              <div
                className="w-10 h-10 rounded-sm flex items-center justify-center"
                style={{ backgroundColor: `${s.color}15` }}
              >
                <i className={`${s.icon} text-xl`} style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-[26px] font-black text-[#1a1a1a] leading-none">{s.value}</p>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Two-column: Active Courses + Upcoming ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mb-6">

          {/* ── Active Courses ── */}
          <div className="bg-white border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[15px] font-bold text-[#1a1a1a]">Active Masterclasses</h3>
              <Link to="/members" className="text-[11px] font-bold text-[#077DA7] hover:underline uppercase tracking-wider">
                View All
              </Link>
            </div>
            {isLoading && (
              <div className="flex justify-center py-8">
                <i className="ri-loader-4-line animate-spin text-2xl text-[#077DA7]" />
              </div>
            )}
            {isError && (
              <p className="text-sm text-red-600">{getErrorMessage(error)}</p>
            )}
            <div className="flex flex-col gap-4">
              {!isLoading && !isError && activeCohorts.length === 0 && <p className="text-sm text-gray-500">No active masterclasses yet.</p>}
              {activeCohorts.map((cohort) => (
                <Link
                  key={cohort.id}
                  to={`/members/${cohort.id}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                    <img
                      src={cohort.image}
                      alt={cohort.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#1a1a1a] group-hover:text-[#077DA7] transition-colors leading-snug">
                      {cohort.title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{cohort.sessions} Sessions</p>
                    {/* Progress bar */}
                    <div className="mt-2 w-full h-[4px] bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#077DA7] rounded-full"
                        style={{ width: `${cohort.progressPercent}%` }}
                      />
                    </div>
                  </div>
                  <i className="ri-arrow-right-s-line text-gray-300 group-hover:text-[#077DA7] transition-colors text-xl flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Upcoming Sessions ── */}
          <div className="bg-white border border-gray-100 p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-5">Upcoming Sessions</h3>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-500">Open an enrolled masterclass to view its session schedule.</p>
            </div>
          </div>

        </div>

        {/* ── Recent Activity ── */}
        <div className="bg-white border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[15px] font-bold text-[#1a1a1a]">Recent Activity</h3>
            <Link to="/members" className="text-[11px] font-bold text-[#077DA7] hover:underline uppercase tracking-wider">
              View All
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-gray-100">
            <p className="text-sm text-gray-500">Your enrolled masterclasses show your saved progress.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
