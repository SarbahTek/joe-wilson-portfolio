import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { masterclassesApi } from "@/api/masterclasses.api";
import { queryKeys } from "@/lib/query-keys";

export default function MasterclassSection() {
  const { data = [] } = useQuery({ queryKey: queryKeys.masterclasses.all, queryFn: masterclassesApi.list });
  const masterclass = data.find(item => item.isPublished !== false && item.status !== "draft" && item.status !== "completed");
  if (!masterclass) return null;
  return <section className="grid md:grid-cols-2 bg-white"><div className="min-h-72 bg-gray-100">{masterclass.coverImageUrl&&<img src={masterclass.coverImageUrl} alt={masterclass.title} className="h-full w-full object-cover"/>}</div><div className="p-10 md:p-16"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#077DA7]">Masterclass</p><h2 className="mt-3 text-3xl font-bold uppercase text-[#077DA7]">{masterclass.title}</h2><p className="mt-5 leading-7 text-gray-600">{masterclass.description}</p><Link to={`/checkout?masterclassId=${encodeURIComponent(masterclass.id)}`} className="mt-7 inline-block bg-[#077DA7] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white">View masterclass</Link></div></section>;
}
