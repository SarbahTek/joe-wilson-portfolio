import { useEffect } from "react";
import { Link } from "react-router-dom";
import MembersNavbar from "../components/MembersNavbar";
import Footer from "@/components/feature/Footer";
import { cohorts } from "@/mocks/cohorts";
import heroImg from "@/assets/home/basemasterclass2.jpg";

/* ── Mock data ── */
const stats = [
  { icon: "ri-play-circle-line", label: "Sessions Watched", value: "12", color: "#077DA7" },
  { icon: "ri-book-open-line", label: "Active Courses", value: "3", color: "#2e7d32" },
  { icon: "ri-trophy-line", label: "Completed Courses", value: "2", color: "#e65100" },
  { icon: "ri-time-line", label: "Hours Learned", value: "38h", color: "#7b1fa2" },
];

const recentActivity = [
  { sessionTitle: "The Architecture of Rhythm", cohortTitle: "Advanced Sound Design", time: "2 hours ago", status: "completed" },
  { sessionTitle: "Pocket & Timing Fundamentals", cohortTitle: "Advanced Sound Design", time: "Yesterday", status: "live" },
  { sessionTitle: "Harmonic Foundations", cohortTitle: "Modern Jazz Theory", time: "3 days ago", status: "completed" },
  { sessionTitle: "Scoring Intro", cohortTitle: "Scoring For Film", time: "5 days ago", status: "completed" },
];

const upcomingSessions = [
  { sessionTitle: "Slap Technique & Tone Shaping", cohortTitle: "Advanced Sound Design", date: "May 18, 2026", time: "6:00 PM GMT" },
  { sessionTitle: "Modal Interchange", cohortTitle: "Modern Jazz Theory", date: "May 20, 2026", time: "5:00 PM GMT" },
  { sessionTitle: "Theme Development", cohortTitle: "Scoring For Film", date: "May 23, 2026", time: "4:00 PM GMT" },
];

const activeCohorts = cohorts.filter((c) => c.status === "ACTIVE").slice(0, 3);

const statusColor: Record<string, string> = {
  completed: "#2e7d32",
  live: "#077DA7",
  upcoming: "#e65100",
};

export default function DashboardPage() {
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
            <div className="flex flex-col gap-4">
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
                        style={{ width: `${Math.floor(Math.random() * 50) + 20}%` }}
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
              {upcomingSessions.map((u, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                  {/* Date box */}
                  <div className="w-10 flex-shrink-0 flex flex-col items-center justify-center bg-[#077DA7]/10 py-2">
                    <span className="text-[10px] font-black text-[#077DA7] uppercase leading-none">
                      {u.date.split(" ")[0]}
                    </span>
                    <span className="text-[18px] font-black text-[#077DA7] leading-tight">
                      {u.date.split(" ")[1].replace(",", "")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-[#1a1a1a] leading-snug">{u.sessionTitle}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{u.cohortTitle}</p>
                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                      <i className="ri-time-line" />{u.time}
                    </p>
                  </div>
                </div>
              ))}
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
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                {/* Status icon */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${statusColor[a.status]}15` }}
                >
                  <i
                    className={`text-sm ${a.status === "completed" ? "ri-check-line" : "ri-live-line"}`}
                    style={{ color: statusColor[a.status] }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-[#1a1a1a] leading-snug">{a.sessionTitle}</p>
                  <p className="text-[11px] text-gray-400">{a.cohortTitle}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${statusColor[a.status]}15`, color: statusColor[a.status] }}
                  >
                    {a.status === "completed" ? "Completed" : "Watched Live"}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
