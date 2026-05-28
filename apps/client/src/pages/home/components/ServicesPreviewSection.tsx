import { useState } from "react";
import { Link } from "react-router-dom";
import livePerformance from "../../../assets/home/servicesliveperformance.jpg";
import sessionRecording from "../../../assets/home/servicesstudio.jpg";
import musicProduction from "../../../assets/home/servicesmusicproduction.jpg";
import musicDirection from "../../../assets/home/servicesmusicdirection.jpg";

interface Service {
  title: string;
  image: string;
  description?: string;
  active?: boolean;
}

const services: Service[] = [
  {
    title: "Live\nPerformance",
    image: livePerformance,
  },
  {
    title: "Studio\n& Session Bass",
    image: sessionRecording,
    description:
      "Remote bass recording and in-studio session work for artists, choirs and producers.",
    active: true,
  },
  {
    title: "Music\nProduction",
    image: musicProduction,
  },
  {
    title: "Music\nDirection",
    image: musicDirection,
  },
];

export default function ServicesPreviewSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col">
      {/* Section header */}
      <div className="py-10 bg-white">
        <h2 className="mb-4 text-center font-inter text-[clamp(28px,3.2vw,42px)] font-bold uppercase tracking-tight text-gray-900">
          Services
        </h2>
      </div>
      <section className="w-full flex flex-col md:flex-row h-auto md:h-[clamp(240px,28vw,340px)]">
        {services.map((service, i) => {
          const isActive = service.active;
          const isHovered = hovered === i;

          return (
            <div
              key={i}
              className="relative flex-none h-[250px] md:h-auto md:flex-1 overflow-hidden cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Background image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Content */}
              {isActive ? (
                /* Active card */
                <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-6 md:justify-end md:pb-8">
                  <h3
                    className="font-bold uppercase text-white leading-tight mb-3 whitespace-pre-line"
                    style={{
                      fontSize: "clamp(22px, 1.7vw, 26px)",
                      letterSpacing: "0.04em",
                      textShadow: "0px 0px 30px rgba(255, 255, 255, 0.42)",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-white leading-relaxed mb-5"
                    style={{ fontSize: "clamp(13px, 0.85vw, 13px)", opacity: 0.88 }}
                  >
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-block font-bold uppercase text-white tracking-wider transition-colors whitespace-nowrap self-start"
                    style={{
                      backgroundColor: "#077DA7",
                      padding: "9px 18px",
                      fontSize: "clamp(11px, 0.7vw, 11px)",
                      letterSpacing: "0.12em",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.backgroundColor = "#05637f")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.backgroundColor = "#077DA7")
                    }
                  >
                    Request Quote
                  </Link>
                </div>
              ) : (
                /* Inactive card */
                <div className="absolute inset-0 flex items-end justify-center text-center pb-8 px-6 md:justify-start md:text-left">
                  <h3
                    className="font-bold uppercase text-white leading-tight whitespace-pre-line"
                    style={{
                      fontSize: "clamp(20px, 1.5vw, 22px)",
                      letterSpacing: "0.04em",
                      textShadow: "0px 0px 30px rgba(255, 255, 255, 0.42)",
                    }}
                  >
                    {service.title}
                  </h3>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
