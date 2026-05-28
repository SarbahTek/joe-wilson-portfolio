import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MembersNavbar from "./components/MembersNavbar";
import Footer from "@/components/feature/Footer";
import CTASection from "@/components/feature/CTASection";
import { type Cohort } from "@/mocks/cohorts";
import { useMasterclasses } from "@/hooks/masterclasses/useMasterclasses";
import { getErrorMessage } from "@/lib/errors";
import { Clock } from "lucide-react";
import heroImg from "@/assets/home/basemasterclass2.jpg";

const PAGE_SIZE = 6;

export default function MembersPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { data: cohorts = [], isLoading, isError, error } = useMasterclasses();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter">
      <MembersNavbar />

      {/* ── Hero Banner ── */}
      <section
        className="relative h-[250px] md:h-[350px] w-full"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-1 md:mb-2">
            MASTERCLASS
          </h1>
          <div className="flex items-center gap-2 text-[10px] md:text-[12px] text-white/80 font-medium tracking-widest">
            <span className="hover:text-white transition-colors cursor-pointer">HOME</span>
            <span>/</span>
            <span className="hover:text-white transition-colors cursor-pointer">MEMBERS AREA</span>
            <span>/</span>
            <span className="text-white">MASTERCLASS</span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-16">
        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-10">
          Available Cohorts
        </h2>

        {isLoading && (
          <div className="flex justify-center py-16">
            <i className="ri-loader-4-line animate-spin text-3xl text-[#077DA7]" />
          </div>
        )}

        {isError && (
          <div className="py-10 text-center text-sm text-red-600">
            {getErrorMessage(error, "Unable to load masterclasses.")}
          </div>
        )}

        {!isLoading && !isError && cohorts.length === 0 && (
          <p className="text-sm text-gray-500">No masterclasses are available right now.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {cohorts.slice(0, visibleCount).map((cohort) => (
            <CohortCard key={cohort.id} cohort={cohort} />
          ))}
        </div>

        {!isLoading && visibleCount < cohorts.length && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="border border-gray-300 text-[#1a1a1a] text-[11px] font-bold px-10 py-4 uppercase tracking-widest hover:border-[#1a1a1a] hover:bg-gray-50 transition-colors rounded-none"
            >
              LOAD MORE
            </button>
          </div>
        )}
      </main>

      <CTASection />
      <Footer />
    </div>
  );
}

function CohortCard({ cohort }: { cohort: Cohort }) {
  const isActive = cohort.status === "ACTIVE";

  return (
    <div className="flex flex-col bg-white overflow-hidden group h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={cohort.image}
          alt={cohort.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Status Badge */}
        <div
          className={`absolute top-4 left-4 text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded-none ${isActive ? "bg-[#ff0000]" : "bg-black"
            }`}
        >
          {cohort.status}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 py-6">
        <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 leading-tight">
          {cohort.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-6">
          {cohort.description}
        </p>

        {/* Sessions Info */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">
          <Clock size={12} className="text-gray-400" />
          <span>{cohort.sessions} SESSIONS</span>
          <span className="text-gray-300">|</span>
          <span>ENDS {cohort.endDate}</span>
        </div>

        {/* Button */}
        <Link
          to={`/members/${cohort.id}`}
          className={`mt-auto w-full py-4 text-[10px] font-bold uppercase tracking-widest transition-colors rounded-none text-center ${isActive
              ? "bg-[#077DA7] text-white hover:bg-[#05637f] border border-[#077DA7]"
              : "bg-white text-[#1a1a1a] border border-gray-300 hover:border-[#1a1a1a]"
            }`}
        >
          VIEW MASTERCLASS
        </Link>
      </div>
    </div>
  );
}
