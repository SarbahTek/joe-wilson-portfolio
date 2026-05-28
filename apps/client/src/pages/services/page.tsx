import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CTASection from "@/components/feature/CTASection";
import ServicesHero from "./components/ServicesHero";
import ServicesListSection from "./components/ServicesListSection";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />
      <ServicesHero />
      <ServicesListSection />
      <CTASection />
      <Footer />
    </div>
  );
}
