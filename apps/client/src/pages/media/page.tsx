import Navbar from "@/components/feature/Navbar";
import MediaHero from "./components/MediaHero";
import MediaGrid from "./components/MediaGrid";
import CTASection from "@/components/feature/CTASection";
import Footer from "@/components/feature/Footer";

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <MediaHero />
      <MediaGrid />
      <CTASection />
      <Footer />
    </div>
  );
}
