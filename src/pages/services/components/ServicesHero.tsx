import { Link } from "react-router-dom";
import livePerformanceImg from "@/assets/home/servicesliveperformance.jpg";

export default function ServicesHero() {
  return (
    <section className="relative h-[250px] md:h-[350px] overflow-hidden">
      <img
        src={livePerformanceImg}
        alt="Our Services"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark overlay with slight blue tint to match UI */}
      <div className="absolute inset-0 bg-black/60" style={{ backgroundColor: "rgba(10,20,35,0.65)" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-4">
          OUR SERVICES
        </h1>
        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-white cursor-pointer transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-300">Our Service</span>
        </div>
      </div>
    </section>
  );
}
