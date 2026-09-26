import { Link } from "react-router-dom";
import { useServices } from "@/hooks/content/useServices";

export default function ServicesPreviewSection() {
  const { data: services = [] } = useServices();
  if (!services.length) return null;
  return <section className="bg-white py-12"><h2 className="mb-8 text-center font-inter text-[clamp(28px,3.2vw,42px)] font-bold uppercase text-gray-900">Services</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">{services.slice(0,4).map(service=><Link key={service.id} to={`/services/${service.slug}`} className="group relative min-h-72 overflow-hidden bg-[#1a1a1a] p-7 flex flex-col justify-end">{service.coverImageUrl&&<img src={service.coverImageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-105"/>}<div className="relative"><h3 className="text-xl font-bold uppercase text-white">{service.title}</h3>{service.tagline&&<p className="mt-3 line-clamp-2 text-sm text-white/80">{service.tagline}</p>}<span className="mt-5 inline-block bg-[#077DA7] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white">Learn more</span></div></Link>)}</div></section>;
}
