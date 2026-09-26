import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { masterclassesApi } from "@/api/masterclasses.api";
import { queryKeys } from "@/lib/query-keys";
import { formatPaymentAmount } from "@/lib/mappers/masterclass.mapper";
import { getErrorMessage } from "@/lib/errors";

const includes = [
  { label: "Full Lifetime Access" },
  { label: "Private Community Access" },
  { label: "Custom Backing Tracks" },
  { label: "Monthly Live Q&A" },
];

export default function PricingSection() {
  const { data = [], isPending, error } = useQuery({ queryKey: queryKeys.masterclasses.all, queryFn: masterclassesApi.list });
  const masterclass = data[0];
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
            {masterclass?.title ?? "Masterclass"}
          </h2>

          {/* Price */}
          <div className="flex items-baseline justify-center gap-3 mb-6 md:mb-8">
            <span className="text-[#1a1a1a] text-[40px] md:text-[56px] font-black leading-none">{masterclass ? formatPaymentAmount(masterclass.priceCents, masterclass.currency ?? "USD") : "Coming soon"}</span>
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
          {masterclass && !error ? <Link to={`/checkout?masterclassId=${encodeURIComponent(masterclass.id)}`} className="block text-center w-full bg-[#2596BE] text-white text-[13px] md:text-[14px] font-bold py-3.5 md:py-4 uppercase hover:bg-[#1e7fa3] transition-colors duration-200 cursor-pointer tracking-wide">
            Secure Your Spot Today
          </Link> : <p role={error ? "alert" : "status"} className="text-center text-sm text-gray-600">{isPending ? "Loading availability..." : error ? getErrorMessage(error) : "Enrollment is not open yet. Please check back soon."}</p>}

          {/* Guarantee */}
          <p className="text-center text-[#9ca3af] text-[11px] md:text-[12px] mt-3 md:mt-4">
            30-Day Money Back Guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
