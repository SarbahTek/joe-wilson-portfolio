import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import HeroSection from "./components/HeroSection";
import AboutPreviewSection from "./components/AboutPreviewSection";
import ServicesPreviewSection from "./components/ServicesPreviewSection";
import MasterclassSection from "./components/MasterclassSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactPreviewSection from "./components/ContactPreviewSection";
import CTASection from "../../components/feature/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="font-inter">
        <HeroSection />
        <AboutPreviewSection />
        <ServicesPreviewSection />
        <div className="pt-16 md:pt-20"><MasterclassSection /></div>
        <TestimonialsSection />
        <ContactPreviewSection />
      </div>
      <CTASection />
      <Footer />
    </div>
  );
}
