import { useState } from "react";

const faqs = [
  {
    q: "Do I need prior experience?",
    a: "No prior experience is needed. The masterclass is designed to take you from beginner to advanced at your own pace.",
  },
  {
    q: "How do I access the masterclass after registering?",
    a: "Once you register, you will receive an email with your login credentials to access the full course dashboard immediately.",
  },
  {
    q: "Are the sessions live or pre-recorded?",
    a: "The core lessons are professionally pre-recorded for you to watch at any time. Monthly live Q&A sessions are also included with your enrollment.",
  },
  {
    q: "Will I have access to replays?",
    a: "Yes. All live sessions are recorded and uploaded to the dashboard within 24 hours so you never miss anything.",
  },
  {
    q: "Can I join from any country?",
    a: "Yes. The masterclass is accessible online, so you can join from anywhere in the world.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Absolutely. We offer a full 30-day money-back guarantee with no questions asked.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(4);

  return (
    <section className="bg-white py-10 md:py-24 px-4 md:px-16">
      <div className="max-w-[760px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="font-inter text-[18px] md:text-[30px] font-bold text-[#1a1a1a] uppercase"
            style={{ letterSpacing: "0.08em" }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-[#6b7280] text-[12px] md:text-[13px] mt-2 md:mt-3 leading-[1.7]">
            Everything you will need to know about joining the masterclass
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="border-t border-[#e5e7eb]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-[#e5e7eb]">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-3.5 md:py-4 text-left cursor-pointer"
                >
                  <span
                    className={`text-[12px] md:text-[13px] font-medium leading-snug pr-4 transition-colors duration-200 ${
                      isOpen ? "text-[#2596BE]" : "text-[#1a1a1a]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <i
                    className={`text-[#9ca3af] text-[16px] md:text-[18px] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[200px] opacity-100 pb-3 md:pb-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[#6b7280] text-[11px] md:text-[13px] leading-[1.7]">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
