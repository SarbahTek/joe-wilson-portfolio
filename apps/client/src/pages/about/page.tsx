import Navbar from "@/components/feature/Navbar";
import AboutHero from "./components/AboutHero";
import BioSection from "./components/BioSection";
import ExperienceSection from "./components/ExperienceSection";
import ClientsSection from "./components/ClientsSection";
import VideoSection from "./components/VideoSection";
import TestimonialsSection from "@/pages/home/components/TestimonialsSection";
import ContactPreviewSection from "@/pages/home/components/ContactPreviewSection";
import CTASection from "@/components/feature/CTASection";
import Footer from "@/components/feature/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AboutHero />
      <BioSection />
      <ExperienceSection />
      <ClientsSection />
      <VideoSection />
      <TestimonialsSection />
      <ContactPreviewSection />
      <CTASection />
      <Footer />
    </main>
  );
}
