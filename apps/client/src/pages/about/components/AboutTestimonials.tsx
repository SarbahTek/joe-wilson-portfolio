const testimonials = [
  {
    name: "Tony Herrera",
    role: "Music Director",
    text: "Joseph Wilson is one of the most gifted bassists I have ever worked with. His ability to lock in with any drummer and elevate the entire band is truly extraordinary. A consummate professional.",
    avatar: "https://readdy.ai/api/search-image?query=professional%20male%20music%20director%20portrait%20headshot%2C%20dark%20background%2C%20confident%20expression%2C%20music%20industry%20professional%2C%20mature%20man&width=48&height=48&seq=about-avatar-1&orientation=squarish",
    stars: 5,
  },
  {
    name: "Mary St. Claire",
    role: "Concert Promoter",
    text: "We have worked with Joseph on multiple tours and he never disappoints. His stage presence is magnetic and the crowd absolutely loves him. Booking him was the best decision we ever made.",
    avatar: "https://readdy.ai/api/search-image?query=professional%20female%20concert%20promoter%20portrait%20headshot%2C%20dark%20background%2C%20confident%20smile%2C%20business%20professional%20woman&width=48&height=48&seq=about-avatar-2&orientation=squarish",
    stars: 5,
  },
  {
    name: "Calvin Phillips",
    role: "Studio Engineer",
    text: "Recording with Joseph is a dream. He nails takes in one or two passes, always comes prepared, and brings creative ideas that make every track better. Truly world-class talent.",
    avatar: "https://readdy.ai/api/search-image?query=professional%20male%20studio%20engineer%20portrait%20headshot%2C%20dark%20background%2C%20friendly%20expression%2C%20audio%20engineer&width=48&height=48&seq=about-avatar-3&orientation=squarish",
    stars: 5,
  },
];

export default function AboutTestimonials() {
  return (
    <section className="bg-gray-950 py-16 px-6 md:px-16">
      <h2 className="text-center text-2xl font-black text-white tracking-widest uppercase mb-10">
        Testimonials
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-gray-900 p-6">
            {/* Teal name label at top */}
            <p className="text-[#1ab8e8] text-xs font-bold uppercase tracking-widest mb-3">
              {t.name}
            </p>
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.stars }).map((_, j) => (
                <i key={j} className="ri-star-fill text-yellow-400 text-xs" />
              ))}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 italic">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 border-t border-gray-800 pt-4">
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
