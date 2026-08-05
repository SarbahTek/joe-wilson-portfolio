import avatar1 from "@/assets/home/testimonialheadshot1.jpg";
import avatar2 from "@/assets/home/testimonialheadshot2.jpg";
import avatar3 from "@/assets/home/testimonialheadshot3.jpg";

const endorsements = [
  {
    name: "Noel Robinson",
    role: "Worship Leader, UK",
    avatar: avatar1,
    quote:
      "Joe Wilson's musicality is extraordinary. His ability to lock in with any drummer and lead a band while playing bass is a rare gift. A truly consummate professional.",
  },
  {
    name: "Jason Nelson",
    role: "Gospel Artist, USA",
    avatar: avatar2,
    quote:
      "Working with Joe is seamless. He brings such depth of knowledge — both as a bass player and a music director — that every session feels elevated from the first note.",
  },
  {
    name: "Joe Mettle",
    role: "Gospel Artist, Ghana",
    avatar: avatar3,
    quote:
      "Joe Wilson's mastery of bass and his people-first approach to music make him one of the most reliable professionals I have had the pleasure of working with across Africa.",
  },
];

export default function EndorsementsSection() {
  return (
    <section className="bg-white py-10 md:py-24 px-4 md:px-16">
      <div className="max-w-[1120px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-inter text-[26px] md:text-[42px] font-extrabold text-[#1a1a1a] leading-[1.15]">
            Artist Endorsements
          </h2>
          <p className="text-[#6b7280] text-[13px] md:text-[14px] mt-2 md:mt-3 max-w-[360px] mx-auto leading-[1.7]">
            Hear from the players who transformed their sound through the Masterclass.
          </p>
        </div>

        {/* Cards — 1 col mobile, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {endorsements.map((e, i) => (
            <div
              key={i}
              className="relative bg-[#EDEEEF] p-8 md:p-10 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between mt-6"
            >
              {/* Quotation mark / 99 */}
              <div className="absolute -top-6 -left-2 md:-top-8 md:-left-4 z-10 pointer-events-none">
                <span className="material-symbols-outlined text-[#077DA7]/30 text-[70px] md:text-[90px] leading-none select-none">
                  format_quote
                </span>
              </div>

              <div className="relative z-20">
                <p className="text-[#1a1a1a] font-inter text-[16px] md:text-[18px] leading-[1.6] mb-8">
                  "{e.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 relative z-20">
                <div className="w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-xl flex-shrink-0">
                  <img
                    src={e.avatar}
                    alt={e.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <p className="text-[#1a1a1a] text-[15px] md:text-[17px] font-bold leading-tight mb-1">{e.name}</p>
                  <p className="text-[#6b7280] text-[13px] md:text-[14px] leading-tight">{e.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
