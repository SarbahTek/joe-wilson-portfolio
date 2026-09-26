import { useTestimonialCards } from "@/hooks/content/useTestimonialCards";

export default function AboutTestimonials() {
  const { cards, isPending, error } = useTestimonialCards();
  if (!isPending && !error && cards.length === 0) return null;
  return <section className="bg-gray-950 py-16 px-6 md:px-16"><h2 className="text-center text-2xl font-black text-white tracking-widest uppercase mb-10">Testimonials</h2>{isPending?<p className="text-center text-gray-400">Loading testimonials…</p>:error?<p className="text-center text-red-300">Testimonials are temporarily unavailable.</p>:<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">{cards.map((t,i)=><article key={`${t.name}-${i}`} className="bg-gray-900 p-6"><div className="flex gap-1 mb-3">{Array.from({length:t.stars}).map((_,j)=><i key={j} className="ri-star-fill text-yellow-400 text-xs"/>)}</div><p className="text-gray-400 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p><div className="flex items-center gap-3 border-t border-gray-800 pt-4">{t.avatar&&<img src={t.avatar} alt="" className="w-9 h-9 rounded-full object-cover"/>}<div><p className="text-white text-xs font-semibold">{t.name}</p><p className="text-gray-500 text-xs">{t.role}</p></div></div></article>)}</div>}</section>;
}
