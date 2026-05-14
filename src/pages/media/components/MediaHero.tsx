import { Link } from "react-router-dom";
import heroImg from "@/assets/home/basemasterclass2.jpg";

export default function MediaHero() {
  return (
    <section
      className="relative h-[250px] md:h-[350px] overflow-hidden"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-1 md:mb-2">
          Media
        </h1>
        <div className="flex items-center gap-2 text-[10px] md:text-[12px] text-white/80 font-medium tracking-widest">
          <Link to="/" className="hover:text-white transition-colors cursor-pointer uppercase">Home</Link>
          <span>/</span>
          <span className="text-white uppercase">Media</span>
        </div>
      </div>
    </section>
  );
}
