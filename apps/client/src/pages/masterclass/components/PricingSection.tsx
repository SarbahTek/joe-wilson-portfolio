import { Link } from "react-router-dom";

const includes = [
  { label: "Full Lifetime Access" },
  { label: "Private Community Access" },
  { label: "Custom Backing Tracks" },
  { label: "Monthly Live Q&A" },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#f0f0f0] py-10 md:py-24 px-4 md:px-16">
      <div className="max-w-[620px] mx-auto">
        {/* White card — sharp edges, generous padding on desktop, tighter on mobile */}
        <div className="bg-white p-7 md:p-14 shadow-sm">
          {/* Label */}
          <p
            className="text-center text-[#2596BE] text-[10px] md:text-[11px] font-bold uppercase mb-2 md:mb-3"
            style={{ letterSpacing: "0.2em" }}
          >
            Lifetime Access
          </p>

          {/* Title */}
          <h2 className="text-center font-inter text-[22px] md:text-[36px] font-extrabold text-[#1a1a1a] leading-[1.1] mb-4 md:mb-6">
            Complete Mastery Suite
          </h2>

          {/* Price */}
          <div className="flex items-baseline justify-center gap-3 mb-6 md:mb-8">
            <span className="text-[#9ca3af] text-[18px] md:text-[22px]">$499</span>
            <span className="text-[#1a1a1a] text-[40px] md:text-[56px] font-black leading-none">$297</span>
          </div>

          {/* Checkmarks — 2 column */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-x-8 md:gap-x-10 gap-y-3 md:gap-y-3.5 mb-6 md:mb-8">
            {includes.map((item, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-2.5">
                <i className="ri-check-line text-[#2596BE] text-[14px] md:text-[16px] flex-shrink-0" />
                <span className="text-[#374151] text-[12px] md:text-[13px]">{item.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link to="/checkout" className="block text-center w-full bg-[#2596BE] text-white text-[13px] md:text-[14px] font-bold py-3.5 md:py-4 uppercase hover:bg-[#1e7fa3] transition-colors duration-200 cursor-pointer tracking-wide">
            Secure Your Spot Today
          </Link>

          {/* Guarantee */}
          <p className="text-center text-[#9ca3af] text-[11px] md:text-[12px] mt-3 md:mt-4">
            30-Day Money Back Guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
