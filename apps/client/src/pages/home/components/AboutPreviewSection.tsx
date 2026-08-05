import { Link } from "react-router-dom";
import aboutImage from "../../../assets/home/homeaboutme.jpeg";

export default function AboutPreviewSection() {
  return (
    <section className="flex flex-col md:flex-row md:min-h-[440px]">
      {/* Left: Image — aspect-ratio locks height on mobile; stretches to match content on desktop */}
      <div className="relative w-full aspect-[4/3] md:aspect-auto md:w-1/2 overflow-hidden md:self-stretch">
        <img
          alt="About Joseph Wilson"
          src={aboutImage}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "50% 18%" }}
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
          Joe Wilson is a seasoned music professional whose career spans performance, production, and project leadership. Beginning as a bass player, Joe built a reputation for musical excellence, creativity, and reliability, which naturally led him into roles as a Music Director, Audio Engineer, Event and Project Manager, and Music Consultant.
        </p>
        <p
          className="font-inter leading-relaxed"
          style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "#6B7280", marginBottom: "12px" }}
        >
          Throughout his career, Joe has worked with a diverse range of international artists across multiple genres, from Gospel and Contemporary Christian music to mainstream secular music and Afrobeats. His versatility, musical insight, and ability to adapt to different creative environments have made him a trusted collaborator on stages, recordings, tours, and live productions around the world.
        </p>
        <p
          className="font-inter leading-relaxed"
          style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "#6B7280", marginBottom: "12px" }}
        >
          With extensive experience managing events, productions, and creative projects, Joe combines technical expertise with strong organizational and leadership skills to deliver exceptional results. His ability to bridge the gap between artistic vision and practical execution has earned him a reputation for excellence among artists, organizations, and production teams alike.
        </p>
        <p
          className="font-inter leading-relaxed"
          style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "#6B7280", marginBottom: "32px" }}
        >
          Beyond his professional achievements, Joe is a devoted family man who values integrity, teamwork, and meaningful relationships. Whether directing a performance, engineering sound, managing an event, or consulting on a project, Joe brings passion, professionalism, and a people-first approach to everything he does.
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
