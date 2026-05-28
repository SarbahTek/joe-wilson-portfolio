import { Link } from "react-router-dom";

import livePerformanceImg from "@/assets/home/servicesliveperformance.jpg";
import studioSessionImg from "@/assets/home/servicesstudio.jpg";
import musicProductionImg from "@/assets/home/servicesmusicproduction.jpg";
import musicDirectionImg from "@/assets/home/servicesmusicdirection.jpg";

const services = [
  {
    id: "live-performance",
    title: "LIVE PERFORMANCE",
    description:
      "Delivering world-class live bass performance for concerts, tours, corporate events, and private shows. Joseph brings electrifying energy and precision to every stage, creating unforgettable experiences that captivate audiences of all sizes.",
    image: livePerformanceImg,
    imageAlt: "Live Performance",
    imageLeft: true,
  },
  {
    id: "studio-session-bass",
    title: "STUDIO &\nSESSION BASS",
    description:
      "Professional studio and session bass recording for albums, film scores, commercials, and digital releases. Remote and in-studio options available with fast turnaround and broadcast-ready quality.",
    image: studioSessionImg,
    imageAlt: "Studio & Session Bass",
    imageLeft: false,
  },
  {
    id: "music-production",
    title: "MUSIC PRODUCTION",
    description:
      "Full-service music production from concept to final master. Leveraging state-of-the-art studio equipment and years of industry experience, Joseph crafts sonic landscapes that push creative boundaries while maintaining commercial appeal.",
    image: musicProductionImg,
    imageAlt: "Music Production",
    imageLeft: true,
  },
  {
    id: "music-direction",
    title: "MUSIC DIRECTION",
    description:
      "Strategic creative leadership for artists, labels, and brands. From album concept to live show production, Joseph guides musical vision with a deep understanding of genre, audience, and artistic integrity.",
    image: musicDirectionImg,
    imageAlt: "Music Direction",
    imageLeft: false,
  },
];

export default function ServicesListSection() {
  return (
    <section className="w-full bg-white">
      {services.map((service) => (
        <div
          key={service.id}
          className="block w-full bg-white px-5 pt-8 pb-0 md:grid md:grid-cols-2 md:min-h-[420px] md:px-0 md:pt-0"
        >
          {/* ── Image Panel ── */}
          <div
            className={`
              relative overflow-hidden md:min-h-[420px]
              ${service.imageLeft ? "md:order-1" : "md:order-2"}
            `}
          >
            {/* Desktop: absolute-fill with hover zoom */}
            <img
              src={service.image}
              alt={service.imageAlt}
              className="hidden md:block absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Mobile: block image, sits inside the row's horizontal padding */}
            <img
              src={service.image}
              alt={service.imageAlt}
              className="block md:hidden w-full h-[240px] object-cover object-center"
            />
          </div>

          {/* ── Text Panel ── */}
          <div
            className={`
              w-full bg-white flex items-center justify-center
              ${service.imageLeft ? "md:order-2" : "md:order-1"}
            `}
          >
            <div className="pt-6 pb-8 w-full md:px-14 md:py-16 md:max-w-[480px]">
              <h3 className="font-black text-[#111] uppercase tracking-[0.06em] leading-tight mb-5 text-[22px] md:text-[26px]">
                {service.title.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h3>

              <p className="text-[#666] leading-[1.75] mb-7 text-[13px] md:text-[13.5px]">
                {service.description}
              </p>

              <Link
                to={`/services/${service.id}`}
                className="inline-block bg-[#2596BE] text-white text-[11px] font-bold tracking-[0.18em] uppercase px-7 py-3 no-underline transition-colors duration-200 hover:bg-[#1C7898]"
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
