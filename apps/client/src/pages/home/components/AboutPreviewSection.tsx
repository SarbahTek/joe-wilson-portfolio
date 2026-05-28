import { Link } from "react-router-dom";
import aboutImage from "../../../assets/home/homeaboutme.png";

export default function AboutPreviewSection() {
  return (
    <section className="flex flex-col md:flex-row" style={{ minHeight: "440px" }}>
      {/* Left: Image */}
      <div className="w-full md:w-1/2 overflow-hidden" style={{ minHeight: "300px" }}>
        <img
          alt="About Joseph Wilson"
          src={aboutImage}
          className="w-full h-full object-cover object-top"
          style={{ minHeight: "300px" }}
        />
      </div>

      {/* Right: Content */}
      <div
        className="w-full md:w-1/2 bg-white flex flex-col justify-center"
        style={{ padding: "clamp(40px, 6vw, 80px)" }}
      >

        <h2
          className="font-inter font-bold uppercase leading-tight"
          style={{
            fontSize: "clamp(22px, 3vw, 36px)",
            color: "#077DA7",
            marginBottom: "20px",
            letterSpacing: "0.05em",
          }}
        >
          About Me
        </h2>
        <p
          className="font-inter leading-relaxed"
          style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "#6B7280", marginBottom: "12px" }}
        >
          Joseph Wilson is a world-class bassist, music director, and performer with over a decade of
          experience commanding stages across the globe. His raw energy, technical mastery, and magnetic
          stage presence have made him one of the most electrifying live performers in the industry.
        </p>
        <p
          className="font-inter leading-relaxed"
          style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "#6B7280", marginBottom: "32px" }}
        >
          From intimate venues to sold-out arenas, Joseph brings an unmatched intensity to every
          performance — blending funk, soul, and contemporary bass into a sound that is entirely his own.
          Beyond the stage, he is a dedicated educator and music director, shaping the next generation of
          musicians.
        </p>
        <Link
          to="/about"
          className="font-inter font-bold uppercase tracking-wider transition-colors whitespace-nowrap w-fit"
          style={{
            border: "1px solid #111",
            color: "#111",
            padding: "12px 28px",
            fontSize: "11px",
            letterSpacing: "0.15em",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "#111";
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#111";
          }}
        >
          More Info
        </Link>
      </div>
    </section>
  );
}
