const curriculumItems = [
  {
    number: 1,
    title: "Foundation & Tone",
    desc: "Mastering the touch and equipment settings for that signature warm gospel sound.",
  },
  {
    number: 2,
    title: "The Harmonic Language",
    desc: "Extended chords, inversions, and the 'Gospel Number System' decoded.",
  },
  {
    number: 3,
    title: "Advanced Improvisation",
    desc: "Creating sophisticated fills that serve the song without overplaying.",
  },
];

const featureCards = [
  {
    icon: "ri-computer-line",
    title: "48 HD Video Lessons",
    desc: "Multi-angle 4K instruction",
  },
  {
    icon: "ri-file-pdf-2-line",
    title: "PDF Workbooks",
    desc: "Tablature and sheet music",
  },
  {
    icon: "ri-headphone-line",
    title: "Backing Tracks",
    desc: "Professionally recorded stems",
  },
  {
    icon: "ri-group-line",
    title: "Private Community",
    desc: "Weekly feedback from instructors",
  },
];

export default function CurriculumSection() {
  return (
    <section className="bg-white py-10 md:py-24 px-4 md:px-16">
      <div className="max-w-[1120px] mx-auto">
        {/* Mobile: stack vertically. Desktop: side-by-side */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left: Curriculum list */}
          <div className="w-full lg:max-w-[400px] flex-shrink-0">
            <h2 className="font-inter text-[24px] md:text-[36px] font-black text-[#1a1a1a] leading-[1.15] mb-2 md:mb-3">
              The Curriculum
            </h2>
            <p className="text-[#6b7280] text-[12px] md:text-[13px] leading-[1.7] mb-6 md:mb-8">
              A 12-week comprehensive journey from fundamental pocket to advanced harmonic substitution.
            </p>

            {/* Numbered list — sharp square badges, no connector lines */}
            <div className="space-y-4 md:space-y-5">
              {curriculumItems.map((item) => (
                <div key={item.number} className="flex gap-3 md:gap-4 items-start">
                  <div className="w-[24px] h-[24px] md:w-[26px] md:h-[26px] flex-shrink-0 flex items-center justify-center bg-[#2596BE]">
                    <span className="text-white text-[11px] md:text-[12px] font-bold leading-none">{item.number}</span>
                  </div>
                  <div>
                    <h4 className="text-[#1a1a1a] text-[13px] md:text-[14px] font-bold mb-0.5 md:mb-1 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[#6b7280] text-[11px] md:text-[12px] leading-[1.6]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Feature grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {featureCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-[#f5f7fa] p-5 md:p-8 flex flex-col items-center text-center min-h-[130px] md:min-h-[170px] justify-center"
                >
                  <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-[#2596BE]/10 mb-3 md:mb-4">
                    <i className={`${card.icon} text-[#2596BE] text-[18px] md:text-[22px]`} />
                  </div>
                  <h4 className="text-[#1a1a1a] text-[12px] md:text-[14px] font-bold mb-0.5 md:mb-1">
                    {card.title}
                  </h4>
                  <p className="text-[#6b7280] text-[10px] md:text-[12px] leading-[1.5]">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
