export default function AboutHero() {
  return (
    <section className="relative h-[250px] md:h-[350px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1a1a]" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-2">
          About Me
        </h1>
        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest">
          <span>Home</span>
          <span>/</span>
          <span className="text-[#1ab8e8]">About Me</span>
        </div>
      </div>
    </section>
  );
}
