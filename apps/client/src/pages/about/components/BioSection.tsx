import recordingIcon from "@/assets/about/recording.png";
import mixingIcon from "@/assets/about/mixing.png";
import masteringIcon from "@/assets/about/mastering.png";

const services = [
  {
    icon: recordingIcon,
    title: "RECORDING",
    text: "Velit egestas dui id ornare arcu. Nibh sit amet commodo nulla facilisi nullam vehicula. Arcu dictum varius duis at.",
  },
  {
    icon: mixingIcon,
    title: "MIXING",
    text: "Velit egestas dui id ornare arcu. Nibh sit amet commodo nulla facilisi nullam vehicula. Arcu dictum varius duis at.",
  },
  {
    icon: masteringIcon,
    title: "MASTERING",
    text: "Velit egestas dui id ornare arcu. Nibh sit amet commodo nulla facilisi nullam vehicula. Arcu dictum varius duis at.",
  },
];

export default function BioSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Main Bio Row */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 mb-16">
          {/* Left: Photo */}
          <div
            className="relative overflow-hidden order-2 md:order-1"
            style={{ minHeight: "clamp(260px,45vw,520px)" }}
          >
            <img
              src="https://storage.readdy-site.link/project_files/c0c1db3d-22db-46b5-85e9-428db5f1168e/b505d7f1-a2cb-4b31-94d3-6f633474031c_871badd755a5afb1a73b6976ceb11bc693cce248.jpg?v=9b1cc5aeb513872a2a091ef6b7fb7e81"
              alt="Joseph Wilson"
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ filter: "grayscale(100%)" }}
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center justify-center border border-white cursor-pointer transition-all hover:bg-white/20"
                style={{ width: 80, height: 80 }}
              >
                <i className="ri-play-fill text-white text-3xl" style={{ marginLeft: 3 }} />
              </div>
            </div>
          </div>

          {/* Right: Bio content */}
          <div className="flex flex-col justify-center order-1 md:order-2">
            <p
              className="font-inter font-bold uppercase tracking-[0.18em] mb-2"
              style={{ fontSize: 18, color: "#0099cc" }}
            >
              I Am
            </p>
            <h2
              className="font-inter font-black uppercase leading-[1.1] mb-6"
              style={{ fontSize: "clamp(32px,4vw,56px)", color: "#111" }}
            >
              Joseph Wilson
            </h2>
            <p
              className="font-inter leading-relaxed mb-6"
              style={{ fontSize: 14, color: "#4B5563" }}
            >
              Joseph Wilson is a UK-based bass guitarist, music director, and producer known for his deep groove, musical sensitivity, and commitment to excellence in gospel and live music. With years of experience across church platforms, live events, and studio sessions, he has developed a sound that supports and elevates every musical moment.
            </p>
            <p
              className="font-inter leading-relaxed"
              style={{ fontSize: 14, color: "#4B5563" }}
            >
              Whether leading bands, recording sessions, or performing on stage, Joseph focuses on serving the music with precision, tone, and feel. Passionate about growth and mentorship, he is dedicated to helping other musicians develop their skill, confidence, and understanding of bass in both live and studio environments.
            </p>
          </div>
        </div>

        {/* Services Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="flex items-start gap-6">
              <img src={s.icon} alt={s.title} className="flex-shrink-0 w-16 h-16 object-contain" />
              <div>
                <h4
                  className="font-inter font-bold uppercase tracking-wider mb-2"
                  style={{ fontSize: 16, color: "#111" }}
                >
                  {s.title}
                </h4>
                <p
                  className="font-inter leading-relaxed"
                  style={{ fontSize: 12, color: "#9CA3AF" }}
                >
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
