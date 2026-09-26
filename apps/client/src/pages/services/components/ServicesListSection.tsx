import { Link } from "react-router-dom";
import { useServices } from "@/hooks/content/useServices";

export default function ServicesListSection() {
  const { data: services = [], isPending, isError } = useServices();
  if (isPending) return <section className="bg-white p-16 text-center text-gray-500">Loading services…</section>;
  if (isError) return <section className="bg-white p-16 text-center text-gray-500">Services are unavailable right now.</section>;
  if (!services.length) return <section className="bg-white p-16 text-center text-gray-500">Services will appear here when they are published.</section>;
  return (
    <section className="w-full bg-white">
      {services.map((service, index) => (
        <div
          key={service.id}
          className="block w-full bg-white px-5 pt-8 pb-0 md:grid md:grid-cols-2 md:min-h-[420px] md:px-0 md:pt-0"
        >
          {/* ── Image Panel ── */}
          <div
            className={`
              relative overflow-hidden md:min-h-[420px]
              ${index % 2 === 0 ? "md:order-1" : "md:order-2"}
            `}
          >
            {/* Desktop: absolute-fill with hover zoom */}
            <img
              src={service.coverImageUrl || ""}
              alt={service.title}
              className="hidden md:block absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {!service.coverImageUrl && <div className="h-[240px] md:hidden grid place-items-center text-sm text-gray-400">No cover image</div>}
          </div>

          {/* ── Text Panel ── */}
          <div
            className={`
              w-full bg-white flex items-center justify-center
              ${index % 2 === 0 ? "md:order-2" : "md:order-1"}
            `}
          >
            <div className="pt-6 pb-8 w-full md:px-14 md:py-16 md:max-w-[480px]">
              <h3 className="font-black text-[#111] uppercase tracking-[0.06em] leading-tight mb-5 text-[22px] md:text-[26px]">
                {service.title}
              </h3>

              <p className="text-[#666] leading-[1.75] mb-7 text-[13px] md:text-[13.5px]">
                {service.description || service.tagline || "Details coming soon."}
              </p>

              <Link
                to={`/services/${service.slug}`}
                className="inline-block bg-[#2596BE] text-white text-[11px] font-bold tracking-[0.18em] uppercase px-7 py-3 no-underline transition-colors duration-200 hover:bg-[#1C7898]"
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
