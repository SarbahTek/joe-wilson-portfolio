const steps = [
  {
    number: 1,
    title: "Register",
    desc: "Secure your spot in the masterclass with a one-time lifetime enrollment fee.",
  },
  {
    number: 2,
    title: "Access Sessions",
    desc: "Log in to the dashboard and dive into over 20+ hours of professional video content.",
  },
  {
    number: 3,
    title: "Join Live",
    desc: "Participate in monthly live Q&A sessions and performance reviews with Joseph.",
  },
];

export default function PathToMasterySection() {
  return (
    <section className="bg-white py-10 md:py-24 px-4 md:px-16">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-inter text-[24px] md:text-[36px] font-bold text-[#1a1a1a] leading-[1.2]">
            The Path to Mastery
          </h2>
        </div>

        {/* Steps — vertical on mobile, horizontal on desktop */}
        <div className="relative">
          {/* Horizontal connector line — desktop only */}
          <div className="hidden md:block absolute top-[28px] left-0 right-0 w-full h-[1px] bg-[#e5e7eb] z-0" />

          <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center">

                {/* Mobile: vertical connector line between steps */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute left-[28px] top-[56px] w-[1px] h-[calc(100%+1.5rem)] bg-[#e5e7eb] z-0" />
                )}

                {/* Number square */}
                <div className={`w-[56px] h-[56px] flex-shrink-0 flex items-center justify-center ${index === 0 ? "bg-[#077DA7]" : "bg-[#353534]"} md:mb-5 relative z-10`}>
                  <span className="text-white text-[22px] font-bold">{step.number}</span>
                </div>

                <div className="pb-2 md:pb-0">
                  <h3 className="text-[#1a1a1a] text-[15px] md:text-[16px] font-bold mb-1.5 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#6b7280] text-[12px] md:text-[13px] leading-[1.7] md:max-w-[240px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
