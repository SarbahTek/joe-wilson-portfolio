import { Link } from "react-router-dom";
import bassMasterclass1 from "../../../assets/home/bassmasterclass1.jpg";
import bassMasterclass2 from "../../../assets/home/basemasterclass2.jpg";

const statsData = [
  { value: "250K+", label: "Students Enrolled" },
  { value: "35+", label: "Certified Instructors" },
  { value: "97%", label: "Student Satisfaction Rate" },
  { value: "800+", label: "Live Session Hosted" },
];

const bullets = [
  "Technique, timing and groove development",
  "Gospel bass phrasing and practical progressions",
  "Band and live rehearsal settings",
  "Advice for beginners, intermediates and active players",
];

export default function MasterclassSection() {
  return (
    <section className="flex flex-col md:flex-row" style={{ minHeight: "440px" }}>
      {/* Left: Image */}
      <div className="w-full md:w-1/2 overflow-hidden" style={{ minHeight: "300px" }}>
        <img
          src={bassMasterclass1}
          alt="Bass Masterclass"
          className="w-full h-full object-cover object-top"
          style={{ minHeight: "300px" }}
        />
      </div>

      {/* Right: Content */}
      <div
        className="w-full md:w-1/2 bg-white flex flex-col justify-center"
        style={{ padding: "clamp(36px, 5vw, 72px)" }}
      >
        <h2
          className="font-inter font-bold uppercase leading-none"
          style={{
            fontSize: "clamp(32px, 4.5vw, 58px)",
            color: "#077DA7",
            marginBottom: "16px",
            letterSpacing: "0.02em",
          }}
        >
          Bass<br />Masterclass
        </h2>

        <p
          className="font-inter leading-relaxed"
          style={{ fontSize: "clamp(12px, 0.95vw, 14px)", color: "#6B7280", marginBottom: "24px" }}
        >
          A focused learning experience for bass players who want to improve technique, groove,
          musicality, ear training, worship playing and stage confidence.
        </p>

        {/* Sub-layout: thumbnail + bullet points */}
        <div className="flex gap-5 mb-8" style={{ alignItems: "flex-start" }}>
          {/* Thumbnail */}
          <div className="flex-shrink-0 overflow-hidden" style={{ width: "clamp(110px, 14vw, 160px)", height: "clamp(80px, 10vw, 116px)" }}>
            <img
              src={bassMasterclass2}
              alt="Bass lesson"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Bullet points */}
          <ul className="flex flex-col gap-2 flex-1">
            {bullets.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <i className="ri-check-line flex-shrink-0" style={{ color: "#077DA7", fontSize: "15px", marginTop: "1px" }} />
                <span
                  className="font-inter leading-snug"
                  style={{ fontSize: "clamp(11px, 0.85vw, 13px)", color: "#374151" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/masterclass"
          className="font-inter font-bold uppercase tracking-wider text-white transition-colors whitespace-nowrap w-fit"
          style={{
            background: "#077DA7",
            padding: "13px 28px",
            fontSize: "11px",
            letterSpacing: "0.15em",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#05637f")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#077DA7")}
        >
          Join The Masterclass
        </Link>
      </div>
    </section>
  );
}

export function StatsBar() {
  return (
    <div
      className="grid grid-cols-4 w-full"
      style={{ background: "#404040" }}
    >
      {statsData.map((stat, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center"
          style={{
            padding: "clamp(24px, 3vw, 36px) 16px",
          }}
        >
          <span
            className="font-inter font-black text-white"
            style={{ fontSize: "clamp(18px, 4vw, 38px)" }}
          >
            {stat.value}
          </span>
          <span
            className="font-inter text-gray-300 text-center mt-1"
            style={{ fontSize: "clamp(8px, 1.8vw, 12px)" }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
