import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import pageNotFoundImg from "@/assets/auth/pagenotfound.jpg";

export default function NotFound() {
  return (
    <div className="flex flex-col overflow-hidden" style={{ height: "100vh" }}>
      <Navbar light />

      {/* Main content */}
      <div className="flex flex-row flex-1 overflow-hidden">

        {/* ── Left: Text Content ── */}
        <div
          className="flex flex-col justify-center items-center md:items-start text-center md:text-left bg-white overflow-hidden"
          style={{ flex: 1, padding: "clamp(28px, 5vw, 64px)" }}
        >
          {/* 404 */}
          <div
            className="font-fraunces select-none"
            style={{
              fontSize: "clamp(96px, 14vw, 220px)",
              fontWeight: 600,
              lineHeight: 0.85,
              letterSpacing: 0,
            }}
          >
            <span style={{ color: "#111" }}>4</span>
            <span style={{ color: "#077DA7" }}>0</span>
            <span style={{ color: "#111" }}>4</span>
          </div>

          {/* PAGE NOT FOUND */}
          <p
            className="font-inter font-semibold tracking-widest uppercase"
            style={{ fontSize: "12px", color: "#077DA7", marginTop: "14px" }}
          >
            Page Not Found
          </p>

          {/* Heading */}
          <h1
            className="font-fraunces"
            style={{
              fontSize: "clamp(30px, 4.2vw, 56px)",
              lineHeight: 1.08,
              fontWeight: 300,
              color: "#111",
              marginTop: "10px",
            }}
          >
            Looks like this
            <br />
            note got{" "}
            <em style={{ fontStyle: "italic", color: "#077DA7" }}>lost</em>
          </h1>

          {/* Description */}
          <p
            className="font-inter"
            style={{
              fontSize: "clamp(14px, 1.1vw, 16px)",
              lineHeight: 1.75,
              color: "#666",
              maxWidth: "420px",
              width: "100%",
              marginTop: "12px",
            }}
          >
            The page you're looking for might have been removed, had its name
            changed, or is temporarily unavailable. Let's get you back on track.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4" style={{ marginTop: "24px" }}>
            <Link
              to="/"
              className="font-inter font-semibold text-sm uppercase text-white transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{
                background: "#077DA7",
                padding: "11px 22px",
                letterSpacing: "0.08em",
              }}
            >
              Back Home
            </Link>
            <Link
              to="/music"
              className="font-inter font-semibold text-sm uppercase whitespace-nowrap"
              style={{
                padding: "11px 4px",
                color: "#333",
                letterSpacing: "0.08em",
                borderBottom: "2px solid #077DA7",
                lineHeight: 1,
              }}
            >
              Browse Music
            </Link>
          </div>
        </div>

        {/* ── Right: Image — hidden on mobile ── */}
        <div className="hidden md:block overflow-hidden" style={{ flex: 1 }}>
          <img
            src={pageNotFoundImg}
            alt="404 illustration"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>

      </div>
    </div>
  );
}
