import { Link } from "react-router-dom";

export default function MasterclassHero() {
  return (
    <section
      className="relative h-[250px] md:h-[350px] overflow-hidden"
      style={{
        backgroundImage: `url(https://readdy.ai/api/search-image?query=dark%20concert%20stage%20with%20dramatic%20lighting%2C%20bass%20guitar%20musician%20performing%2C%20deep%20shadows%2C%20moody%20atmosphere%2C%20professional%20music%20photography%2C%20dark%20teal%20and%20black%20tones%2C%20cinematic%20wide%20shot&width=1440&height=400&seq=masterclass-hero-bg&orientation=landscape)`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1
          className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-1.5 md:mb-2"
          style={{ letterSpacing: "0.3em" }}
        >
          Masterclass
        </h1>
        <div
          className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-400 uppercase font-medium"
          style={{ letterSpacing: "0.18em" }}
        >
          <Link to="/" className="hover:text-white transition-colors duration-200 cursor-pointer">
            Home
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-[#2596BE]">Masterclass</span>
        </div>
      </div>
    </section>
  );
}
