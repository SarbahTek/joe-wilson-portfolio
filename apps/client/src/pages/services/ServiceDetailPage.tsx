import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CTASection from "@/components/feature/CTASection";
import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/api/services.api";
import RequestAQuoteSection from "./components/RequestAQuoteSection";

export default function ServiceDetailPage() {
  const { slug = "" } = useParams();
  const service = useQuery({ queryKey: ["services", slug], queryFn: () => servicesApi.getBySlug(slug), enabled: Boolean(slug) });
  return <div className="min-h-screen bg-white"><Navbar />
    {service.isPending ? <main className="p-20 text-center">Loading service…</main> : service.isError || !service.data ? <main className="p-20 text-center"><h1 className="text-3xl font-bold">Service not found</h1><Link className="text-brand mt-4 inline-block" to="/services">View services</Link></main> : <>
      <main><section className="relative min-h-[440px] bg-[#161616] grid items-end overflow-hidden">{service.data.coverImageUrl && <img src={service.data.coverImageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />}<div className="relative max-w-6xl mx-auto w-full px-6 md:px-12 py-16 text-white"><p className="text-brand uppercase tracking-[.25em] text-xs mb-3">Services</p><h1 className="text-4xl md:text-6xl font-black uppercase">{service.data.title}</h1>{service.data.tagline && <p className="mt-5 max-w-2xl text-lg text-white/80">{service.data.tagline}</p>}</div></section><section className="max-w-4xl mx-auto px-6 py-16 md:py-24"><p className="text-gray-700 leading-8 whitespace-pre-wrap">{service.data.description || service.data.tagline || "Service details are coming soon."}</p></section></main>
      <RequestAQuoteSection currentServiceId={service.data.slug} /><CTASection />
    </>}<Footer /></div>;
}
