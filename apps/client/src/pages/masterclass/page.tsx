import Navbar from "@/components/feature/Navbar";
import MasterclassHero from "./components/MasterclassHero";
import IntroSection from "./components/IntroSection";
import IsThisForYouSection from "./components/IsThisForYouSection";
import PathToMasterySection from "./components/PathToMasterySection";
import MasterclassPreviewSection from "./components/MasterclassPreviewSection";
import CurriculumSection from "./components/CurriculumSection";
import EndorsementsSection from "./components/EndorsementsSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import CTASection from "@/components/feature/CTASection";
import Footer from "@/components/feature/Footer";

export default function MasterclassPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <MasterclassHero />
      <IntroSection />
      <IsThisForYouSection />
      <PathToMasterySection />
      <MasterclassPreviewSection />
      <CurriculumSection />
      <EndorsementsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
