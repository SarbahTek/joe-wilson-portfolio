import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CTASection from "@/components/feature/CTASection";
import { useQuery } from "@tanstack/react-query";
import { masterclassesApi } from "@/api/masterclasses.api";
import { queryKeys } from "@/lib/query-keys";
import { formatPaymentAmount } from "@/lib/mappers/masterclass.mapper";
import { getErrorMessage } from "@/lib/errors";

export default function MasterclassPage() {
  const { data = [], isPending, error } = useQuery({ queryKey: queryKeys.masterclasses.all, queryFn: masterclassesApi.list });
  const classes = data.filter(item => item.isPublished !== false && item.status !== "draft" && item.status !== "completed");
  return <div className="min-h-screen bg-white"><Navbar /><header className="bg-[#101c24] px-6 py-32 text-center text-white"><p className="text-[#2596BE] text-xs uppercase tracking-[.3em] mb-4">Learn with Joe Wilson</p><h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider">Masterclasses</h1><p className="max-w-2xl mx-auto mt-5 text-white/70">Explore current programs and enroll in the class that is right for you.</p></header><main className="max-w-6xl mx-auto px-6 py-16">{isPending?<p className="text-center text-gray-500">Loading masterclasses…</p>:error?<p role="alert" className="text-center text-red-600">{getErrorMessage(error)}</p>:classes.length===0?<div className="max-w-xl mx-auto border border-dashed p-12 text-center"><h2 className="text-2xl font-bold">No masterclasses are available yet</h2><p className="text-gray-500 mt-3">Please check back soon for upcoming programs.</p></div>:<div className="grid md:grid-cols-2 gap-8">{classes.map(item=><article key={item.id} className="border bg-white overflow-hidden flex flex-col">{item.coverImageUrl?<img src={item.coverImageUrl} alt="" className="h-64 w-full object-cover"/>:<div className="h-64 bg-gray-100 grid place-items-center text-gray-400">Course cover coming soon</div>}<div className="p-7 flex flex-col flex-1"><p className="text-xs font-bold text-[#2596BE] uppercase">{item.status}</p><h2 className="text-2xl font-bold mt-2">{item.title}</h2><p className="text-gray-600 mt-4 leading-relaxed flex-1">{item.description}</p><div className="flex items-center justify-between mt-7"><strong className="text-xl">{formatPaymentAmount(item.priceCents,item.currency??"USD")}</strong><Link to={`/checkout?masterclassId=${encodeURIComponent(item.id)}`} className="bg-[#2596BE] text-white px-5 py-3 font-semibold">View enrollment</Link></div></div></article>)}</div>}</main><CTASection/><Footer/></div>;
}
