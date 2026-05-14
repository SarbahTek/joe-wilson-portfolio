import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import CTASection from "@/components/feature/CTASection";
import homeTestimonials from "@/assets/home/hometestimonials.jpg";
import headshot1 from "@/assets/home/testimonialheadshot1.jpg";
import headshot2 from "@/assets/home/testimonialheadshot2.jpg";
import headshot3 from "@/assets/home/testimonialheadshot3.jpg";
import livePerformanceImg from "@/assets/home/servicesliveperformance.jpg";

const testimonials = [
  {
    title: "Start the Beat",
    name: "Michal Brink",
    role: "Concert Organiser",
    text: "Working with Joseph was an absolute privilege. His stage presence is commanding and his musicianship is second to none. Every audience member left the event talking about his performance.",
    avatar: headshot1,
    stars: 5,
  },
  {
    title: "Blast It Out Loud",
    name: "Eduardo Lindsley",
    role: "Record Producer",
    text: "Joseph delivered an incredible studio session. His feel for the pocket is unlike anything I've experienced in 20 years of production. The tracks he laid down elevated the entire project.",
    avatar: headshot2,
    stars: 5,
  },
  {
    title: "You Sing, We Bring",
    name: "Keneth Conroy",
    role: "Music Director",
    text: "Joseph's musical direction transformed our live show. He brought structure, creativity, and a level of professionalism that made every musician on stage perform at their best.",
    avatar: headshot3,
    stars: 5,
  },
  {
    title: "Beyond Expectations",
    name: "Sarah Mensah",
    role: "Event Planner",
    text: "We hired Joseph for a corporate gala and the feedback from guests was overwhelmingly positive. His performance set the perfect tone for the entire evening. Truly world-class.",
    avatar: headshot1,
    stars: 5,
  },
  {
    title: "Pure Musicianship",
    name: "David Osei",
    role: "Artist Manager",
    text: "Joseph's ability to adapt to any genre while maintaining his signature style is extraordinary. He has an intuitive understanding of what every song needs. A musician's musician.",
    avatar: headshot2,
    stars: 5,
  },
  {
    title: "Class & Mastery",
    name: "Linda Asante",
    role: "Choir Director",
    text: "The masterclass Joseph led for our choir was transformative. He communicated complex musical ideas with such clarity and warmth. Our entire team left inspired and equipped.",
    avatar: headshot3,
    stars: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative h-[250px] md:h-[350px] overflow-hidden">
        <img
          src={livePerformanceImg}
          alt="Testimonials"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,20,35,0.65)" }} />
        <Navbar />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-[#2596BE] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">What They Say</p>
          <h1
            className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-4"
          >
            Testimonials
          </h1>
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-300">Testimonials</span>
          </div>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="bg-white py-14 px-6 md:px-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#2596BE] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Reviews</p>
          <h2
            className="text-[#111] text-3xl md:text-4xl mb-4 leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Voices From The Stage
          </h2>
          <div className="w-10 h-[3px] bg-[#2596BE] mb-6 mx-auto" />
          <p className="text-gray-500 text-sm leading-relaxed">
            From concert halls to recording studios, here's what artists, producers, and event organisers
            are saying about working with Joseph Wilson.
          </p>
        </div>
      </section>

      {/* ── Testimonials Grid ── */}
      <section
        className="w-full bg-black bg-cover bg-center bg-no-repeat px-4 py-16 sm:px-6 md:py-24"
        style={{ backgroundImage: `url(${homeTestimonials})` }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col border border-white/20 bg-transparent p-6 md:min-h-[280px]">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <i key={j} className="ri-star-fill text-[12px] text-[#C9A227]" />
                ))}
              </div>

              <h3 className="mb-3 font-inter text-[18px] font-bold uppercase leading-tight tracking-tight text-white md:text-[20px] md:mb-4">
                {t.title}
              </h3>

              <p className="mb-6 flex-1 font-inter text-[14px] leading-[1.75] text-white/80">{t.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="flex items-center gap-1.5 font-inter text-[14px] text-white">
                  <p className="font-bold">{t.name}</p>
                  <span className="text-white/50">/</span>
                  <p className="text-white/70 text-[13px]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
