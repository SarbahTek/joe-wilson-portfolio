import recordingIcon from "@/assets/about/recording.png";
import mixingIcon from "@/assets/about/mixing.png";
import masteringIcon from "@/assets/about/mastering.png";
import bioPhoto from "@/assets/about/biophoto.jpg";

const services = [
  {
    icon: recordingIcon,
    title: "BASS PERFORMANCE",
    text: "17 years of live bass performance across global stages — from intimate venues to sold-out arenas spanning Africa, the UK, and America.",
  },
  {
    icon: mixingIcon,
    title: "MUSIC DIRECTION",
    text: "Strategic creative leadership for artists and productions — bridging artistic vision with practical execution on stages and recordings worldwide.",
  },
  {
    icon: masteringIcon,
    title: "AUDIO ENGINEERING",
    text: "Expert audio engineering and project management for live productions, studio sessions, tours, and events across multiple genres.",
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
              src={bioPhoto}
              alt="Joseph Wilson"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "grayscale(100%)", objectPosition: "50% 20%" }}
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
              Joe Wilson is a seasoned music professional whose 17-year career spans performance, production, and project leadership. Beginning as a bass player, he built a reputation for musical excellence, creativity, and reliability — which naturally led him into roles as a Music Director, Audio Engineer, Event Manager, and Music Consultant.
            </p>
            <p
              className="font-inter leading-relaxed"
              style={{ fontSize: 14, color: "#4B5563" }}
            >
              Throughout his career, Joe has worked with a diverse range of international artists across Gospel, Contemporary Christian, Afrobeats, and mainstream secular music. His versatility and ability to adapt to different creative environments have made him a trusted collaborator on stages, recordings, tours, and live productions around the world.
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
