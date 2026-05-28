import pocketGrooveImg from "@/assets/masterclass/pocketngroove.png";

export default function IntroSection() {
  return (
    <section className="bg-white py-10 md:py-24 px-4 md:px-16">
      <div className="max-w-[1120px] mx-auto">
        {/* Heading */}
        <div className="mb-7 md:mb-10">
          <h2 className="font-inter text-[26px] md:text-[42px] font-bold text-[#1a1a1a] leading-[1.15] mb-3 md:mb-4">
            Master the <span className="text-[#2596BE] italic">Entire</span><br className="hidden md:block" />
            <span className="text-[#2596BE] italic">Spectrum</span> of Sound
          </h2>
          <p className="text-[#6b7280] text-[13px] md:text-[14px] leading-[1.7] max-w-[520px]">
            Master the art of bass from the inside out—develop your touch, refine your groove, and understand the full journey from stage to studio.
          </p>
        </div>

        {/* Bento grid — stacks on mobile */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4">

          {/* Pocket & Groove — full width on mobile */}
          <div className="md:col-span-5 relative overflow-hidden bg-[#1a1a2e] min-h-[240px] md:min-h-[360px] flex flex-col justify-end p-5 md:p-7">
            <img
              src={pocketGrooveImg}
              alt="Pocket & Groove"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a]/90 via-[#0d0d1a]/40 to-transparent z-0" />

            {/* Top Left Icon */}
            <div className="absolute top-6 left-6 z-10">
              <div className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-sm">
                <i className="ri-apps-2-fill text-white/70 text-[22px]" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-white text-[19px] md:text-[24px] font-bold mb-1.5 md:mb-2">
                Pocket &amp; Groove
              </h3>
              <p className="text-gray-300 text-[12px] md:text-[13px] leading-[1.6] max-w-[90%]">
                Learn the rhythmic 'pocket' that makes gospel music feel alive and infectious.
              </p>
            </div>

            {/* Faint GROOVE text at the bottom */}
            <div className="absolute bottom-[-5px] left-0 right-0 flex justify-center z-0 pointer-events-none overflow-hidden">
              <span className="text-[3rem] md:text-[4rem] font-black tracking-[0.4em] text-white/[0.03] select-none leading-none whitespace-nowrap">
                GROOVE
              </span>
            </div>
          </div>

          {/* Right column — 2 top + 1 bottom spanning */}
          <div className="md:col-span-7 flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-4">
            {/* Chord Tones */}
            <div className="bg-[#f5f7fa] p-5 md:p-8 flex flex-col justify-between min-h-[140px] md:min-h-[170px]">
              <div className="mb-4 md:mb-5">
                <i className="ri-music-fill text-[#2596BE] text-[28px]" />
              </div>
              <div>
                <h4 className="text-[#1a1a1a] text-[14px] md:text-[16px] font-bold mb-1.5">
                  Chord Tones
                </h4>
                <p className="text-[#6b7280] text-[12px] md:text-[13px] leading-[1.6]">
                  Navigate the neck with confidence using modern harmonic concepts.
                </p>
              </div>
            </div>

            {/* Tone Sculpting */}
            <div className="bg-[#f5f7fa] p-5 md:p-8 flex flex-col justify-between min-h-[140px] md:min-h-[170px]">
              <div className="mb-4 md:mb-5">
                <i className="ri-bar-chart-fill text-[#2596BE] text-[28px]" />
              </div>
              <div>
                <h4 className="text-[#1a1a1a] text-[14px] md:text-[16px] font-bold mb-1.5">
                  Tone Sculpting
                </h4>
                <p className="text-[#6b7280] text-[12px] md:text-[13px] leading-[1.6]">
                  Craft your signature sound using EQ, pedals, and technique.
                </p>
              </div>
            </div>

            {/* Recording Mastery — full width on both */}
            <div className="md:col-span-2 bg-[#f5f7fa] p-5 md:p-8 flex items-start md:items-center gap-4 md:gap-6 flex-col md:flex-row">
              <div className="w-14 h-14 flex items-center justify-center bg-[#2596BE] flex-shrink-0">
                <i className="ri-mic-line text-white text-[28px]" />
              </div>
              <div>
                <h4 className="text-[#1a1a1a] text-[14px] md:text-[16px] font-bold mb-1">
                  Recording Mastery
                </h4>
                <p className="text-[#6b7280] text-[12px] md:text-[13px] leading-[1.6]">
                  The pro secrets for capturing studio-quality bass from home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
