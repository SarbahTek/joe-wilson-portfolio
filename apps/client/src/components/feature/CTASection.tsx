import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section
      className="text-center"
      style={{ background: "#0E0E0E", padding: "180px 42px" }}
    >
      <h2
        className="font-fraunces font-black text-white leading-tight"
        style={{ fontSize: "clamp(34px, 4.8vw, 62px)", marginBottom: "42px" }}
      >
        Looking to work<br />together?
      </h2>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          to="/contact"
          className="font-inter font-bold  tracking-wider text-gray-900 transition-colors whitespace-nowrap cursor-pointer"
          style={{
            background: "#2596BE",
            padding: "17px 40px",
            fontSize: "14px",
            letterSpacing: "0.15em",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#1C7898")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#2596BE")}
        >
          Book Joseph
        </Link>
        <Link
          to="/masterclass"
          className="font-inter font-bold  tracking-wider text-white transition-colors whitespace-nowrap cursor-pointer"
          style={{
            border: "1px solid rgba(255,255,255,0.5)",
            padding: "17px 40px",
            fontSize: "14px",
            letterSpacing: "0.15em",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "#fff";
            (e.currentTarget as HTMLElement).style.color = "#111";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }}
        >
          Join Masterclass
        </Link>
      </div>
    </section>
  );
}
