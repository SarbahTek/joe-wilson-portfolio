import churchMusician from "@/assets/masterclass/isthisforyou1.png";
import studioImg from "@/assets/masterclass/isthisforyou2.jpg";

export default function IsThisForYouSection() {
  return (
    <section className="bg-[#f0f0f0] py-10 md:py-24 px-4 md:px-16">
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-inter text-[26px] md:text-[42px] font-bold text-[#1a1a1a] leading-[1.15]">
            Is This For You?
          </h2>
          <p className="text-[#6b7280] text-[13px] md:text-[14px] mt-2 md:mt-3 max-w-[480px] mx-auto leading-[1.7]">
            We've designed paths for every stage of the musical calling.
          </p>
        </div>

        {/* Top row — stacks on mobile */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 mb-3 md:mb-4">
          {/* Church Musician — image card */}
          <div className="md:col-span-7 relative overflow-hidden min-h-[220px] md:min-h-[300px] flex flex-col justify-end p-5 md:p-7">
            <img
              src={churchMusician}
              alt="The Church Musician"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-white text-[19px] md:text-[26px] font-bold mb-1.5 md:mb-2">
                The Church Musician
              </h3>
              <p className="text-gray-300 text-[12px] md:text-[13px] leading-[1.7] max-w-[400px]">
                Master the sensitivity and dynamics required for live worship and spontaneous musical moments.
              </p>
            </div>
          </div>

          {/* Aspiring Pro — solid teal */}
          <div className="md:col-span-5 bg-[#2596BE] p-5 md:p-7 flex flex-col min-h-[200px] md:min-h-[300px]">
            <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white/15 mb-auto">
              <i className="ri-flashlight-line text-white text-lg md:text-xl" />
            </div>
            <div className="mt-6 md:mt-auto">
              <h3 className="text-white text-[19px] md:text-[26px] font-bold mb-1.5 md:mb-2">
                The Aspiring Pro
              </h3>
              <p className="text-white/80 text-[12px] md:text-[13px] leading-[1.7]">
                Develop the technical precision and theory knowledge needed for professional session work.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row — stacks on mobile */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4">
          {/* Music Director */}
          <div className="md:col-span-4 bg-[#e8e8e8] p-5 md:p-7 flex flex-col min-h-[200px] md:min-h-[260px]">
            <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#2596BE]/15 mb-auto">
              <i className="ri-clipboard-line text-[#2596BE] text-lg md:text-xl" />
            </div>
            <div className="mt-6 md:mt-auto">
              <h3 className="text-[#1a1a1a] text-[19px] md:text-[24px] font-bold mb-1.5 md:mb-2">
                The Music Director
              </h3>
              <p className="text-[#6b7280] text-[12px] md:text-[13px] leading-[1.7]">
                Understand the big picture of arrangement and how the bass drives the entire ensemble.
              </p>
            </div>
          </div>

          {/* Self-Taught Talent */}
          <div className="md:col-span-8 bg-white p-5 md:p-7 flex flex-col md:flex-row gap-4 md:gap-6 min-h-[200px] md:min-h-[260px]">
            <div className="w-full md:w-[200px] h-[160px] md:h-auto overflow-hidden flex-shrink-0">
              <img
                src={studioImg}
                alt="The Self-Taught Talent"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-[#1a1a1a] text-[19px] md:text-[26px] font-bold mb-1.5 md:mb-2">
                The Self-Taught Talent
              </h3>
              <p className="text-[#6b7280] text-[13px] md:text-[14px] leading-[1.7]">
                Fill in the gaps of your theory and technique to move from 'playing by ear' to 'knowing by heart'.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
