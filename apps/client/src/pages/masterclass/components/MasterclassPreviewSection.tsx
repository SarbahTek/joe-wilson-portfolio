import { useState } from "react";

export default function MasterclassPreviewSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-[#f0f0f0] py-10 md:py-24 px-4 md:px-16">
      <div className="max-w-[960px] mx-auto">
        {/* Header */}
        <div className="text-center mb-7 md:mb-10">
          <h2 className="font-inter text-[24px] md:text-[42px] font-bold text-[#1a1a1a] leading-[1.15]">
            Masterclass Preview
          </h2>
          <p className="text-[#6b7280] text-[13px] md:text-[14px] mt-2 md:mt-3 max-w-[480px] mx-auto leading-[1.7]">
            Get a glimpse of the production quality and teaching style.
          </p>
        </div>

        {/* Video — sharp edges, full width */}
        <div className="relative w-full aspect-video overflow-hidden bg-black mb-6 md:mb-10 shadow-md">
          {playing ? (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Masterclass Full Preview"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <>
              <div className="w-full h-full bg-black" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setPlaying(true)}
                  className="w-[56px] h-[40px] md:w-[68px] md:h-[48px] flex items-center justify-center bg-[#FF0000] hover:bg-[#cc0000] transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <i className="ri-play-fill text-white text-[22px] md:text-[26px] ml-0.5" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Bottom features — stack on mobile */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4 md:gap-12">
          <div className="flex items-start md:items-center gap-2.5">
            <i className="ri-verified-badge-line text-[#2596BE] text-[18px] md:text-[20px] flex-shrink-0 mt-0.5 md:mt-0" />
            <p className="text-[#4b5563] text-[12px] md:text-[13px] leading-[1.6]">
              4K Ultra-HD multicam production for clear finger-viewing
            </p>
          </div>
          <div className="flex items-start md:items-center gap-2.5">
            <i className="ri-verified-badge-line text-[#2596BE] text-[18px] md:text-[20px] flex-shrink-0 mt-0.5 md:mt-0" />
            <p className="text-[#4b5563] text-[12px] md:text-[13px] leading-[1.6]">
              Downloadable sheet music and backing tracks included
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
