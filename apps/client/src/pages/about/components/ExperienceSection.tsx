import band1 from "@/assets/about/theband1.png";
import band2 from "@/assets/about/theband2.png";
import band3 from "@/assets/about/theband3.png";
import experienceBg from "@/assets/about/experiencebackground.jpg";

const artists = [
  "Major Gospel Artists",
  "International Soloists",
  "Contemporary Worship Teams",
];

const stages = [
  "Global Arenas",
  "Live DVD Recordings",
  "Festival Mainstages",
];

const iconButtons = [
  { icon: band1 },
  { icon: band2 },
  { icon: band3 },
];

export default function ExperienceSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image & dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url(${experienceBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#161616]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-16 lg:py-24">
        {/* Inner dark container */}
        <div className="bg-[#111111] border border-[#000000] p-6 md:p-10 lg:p-16 rounded-sm shadow-2xl">
          
          {/* Top row: 3 cards (2:1:1 ratio) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Years card (Spans 2 columns) */}
            <div
              className="md:col-span-2 flex flex-col justify-center"
              style={{
                background: "#1c1c1c",
                border: "1px solid rgba(255,255,255,0.03)",
                padding: "clamp(24px,4vw,40px)",
              }}
            >
              <span
                className="font-inter font-black leading-none mb-3"
                style={{ fontSize: "clamp(48px,6vw,72px)", color: "#00e5ff" }}
              >
                12+
              </span>
              <p
                className="font-inter font-bold text-white mb-2"
                style={{ fontSize: "clamp(15px,1.2vw,18px)" }}
              >
                Years of Excellence
              </p>
              <p
                className="font-inter leading-relaxed"
                style={{ fontSize: "clamp(13px,1vw,14px)", color: "#9CA3AF" }}
              >
                Consistent growth across live worship, studio production, and music direction.
              </p>
            </div>

            {/* Artists card (Spans 1 column) */}
            <div
              className="md:col-span-1 flex flex-col"
              style={{
                background: "#1c1c1c",
                border: "1px solid rgba(255,255,255,0.03)",
                padding: "clamp(24px,4vw,40px)",
              }}
            >
              <h3
                className="font-inter font-bold mb-6"
                style={{ fontSize: "clamp(20px,2.5vw,28px)", color: "#facc15" }}
              >
                Artists
              </h3>
              <ul className="flex flex-col gap-4">
                {artists.map((a, i) => (
                  <li
                    key={i}
                    className="font-inter flex items-start gap-3"
                    style={{ fontSize: "clamp(13px,1vw,14px)", color: "#D1D5DB" }}
                  >
                    <span style={{ color: "#D1D5DB" }}>•</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stages card (Spans 1 column) */}
            <div
              className="md:col-span-1 flex flex-col"
              style={{
                background: "#1c1c1c",
                border: "1px solid rgba(255,255,255,0.03)",
                padding: "clamp(24px,4vw,40px)",
              }}
            >
              <h3
                className="font-inter font-bold mb-6"
                style={{ fontSize: "clamp(20px,2.5vw,28px)", color: "#facc15" }}
              >
                Stages
              </h3>
              <ul className="flex flex-col gap-4">
                {stages.map((s, i) => (
                  <li
                    key={i}
                    className="font-inter flex items-start gap-3"
                    style={{ fontSize: "clamp(13px,1vw,14px)", color: "#D1D5DB" }}
                  >
                    <span style={{ color: "#D1D5DB" }}>•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom: Wide quote card */}
          <div
            className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8"
            style={{
              background: "#1c1c1c",
              border: "1px solid rgba(255,255,255,0.03)",
              padding: "clamp(24px,4vw,40px)",
            }}
          >
            <div className="flex-1 min-w-0 max-w-2xl">
              <p
                className="font-inter font-bold mb-3"
                style={{ fontSize: "clamp(18px,1.8vw,24px)", color: "#fff" }}
              >
                "The Foundation of the Band"
              </p>
              <p
                className="font-inter leading-relaxed"
                style={{ fontSize: "clamp(13px,1vw,15px)", color: "#9CA3AF" }}
              >
                A reputation built on reliability, impeccable timing, and a deep understanding of music theory and arrangement.
              </p>
            </div>

            {/* Icons */}
            <div className="flex gap-4 flex-shrink-0">
              {iconButtons.map((btn, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center rounded-md overflow-hidden"
                  style={{
                    width: 48,
                    height: 48,
                    background: "#000000",
                  }}
                >
                  <img src={btn.icon} alt="" className="w-5 h-5 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
