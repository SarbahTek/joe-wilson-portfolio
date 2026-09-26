import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CTASection from "@/components/feature/CTASection";
import heroImg from "@/assets/music/albumhero.jpg";

export default function MusicPage() {
  return <div className="min-h-screen flex flex-col bg-white"><Navbar /><main className="flex-1"><section className="relative h-[250px] md:h-[350px]"><img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-black/55 grid place-items-center"><h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white">Music</h1></div></section><section className="px-6 py-24 text-center"><p className="mx-auto max-w-xl leading-7 text-gray-600">Music releases will be available here once they have been published.</p></section></main><CTASection /><Footer /></div>;
}
