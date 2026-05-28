import moments1 from "../../../assets/home/moments1.jpg";
import moments2 from "../../../assets/home/moments2.jpg";
import moments3 from "../../../assets/home/moments3.jpg";
import moments4 from "../../../assets/home/moments4.jpg";

export default function MomentsSection() {
  return (
    <section className="bg-white py-14">
      <h2 className="mb-10 text-center font-inter text-[clamp(28px,3.2vw,42px)] font-bold uppercase tracking-tight text-gray-900">
        Moments
      </h2>

      <div className="w-full flex flex-col md:grid md:grid-cols-3 md:h-[clamp(400px,45vw,600px)]">
        {/* Left Column */}
        <div className="flex flex-col w-full h-auto md:h-full">
          <img
            src={moments1}
            alt="Moments 1"
            className="w-full h-auto md:h-1/2 object-cover md:object-cover object-center"
          />
          <img
            src={moments2}
            alt="Moments 2"
            className="w-full h-auto md:h-1/2 object-cover md:object-cover object-center"
          />
        </div>

        {/* Center Column */}
        <img
          src={moments3}
          alt="Moments 3"
          className="w-full h-auto md:h-full object-cover md:object-cover object-center"
        />

        {/* Right Column */}
        <img
          src={moments4}
          alt="Moments 4"
          className="w-full h-auto md:h-full object-cover md:object-cover object-center"
        />
      </div>

      <div className="mt-14 flex justify-center">
        <button
          type="button"
          className="cursor-pointer border border-[#b8b8b8] bg-transparent px-8 py-2.5 font-inter text-[10px] font-bold uppercase tracking-[0.16em] text-[#111] transition-colors hover:bg-[#111] hover:text-white"
        >
          See More
        </button>
      </div>
    </section>
  );
}
