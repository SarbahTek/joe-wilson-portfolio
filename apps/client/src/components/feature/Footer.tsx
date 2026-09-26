import { Link } from "react-router-dom";
import socialMediaFooterBg from "../../assets/socialmediafooter.jpg";
import logo1 from "../../assets/Logo1.svg";
import albumArt from "../../assets/music/milestonecover.jpg";
import { useEvents } from "@/hooks/content/useEvents";
import { usePublicSettings } from "@/hooks/content/usePublicSettings";

const upcomingEvents = [
  { date: "Apr 18", event: "London Proms Apollo" },
  { date: "Apr 18", event: "Creamfields South Festival, Chelmsford (UK)" },
  { date: "Apr 18", event: "Summerburst Festival, Göteborg (SE)" },
  { date: "Apr 12", event: "XS, Las Vegas (US)" },
];

const quickMenuLeft = ["Home", "Events", "Gallery", "Videos"];
const quickMenuRight = ["Discography", "News", "Shop", "Contact"];

export default function Footer() {
  const { data: events = [] } = useEvents();
  const { data: settings = {} } = usePublicSettings();
  const socialLinks = [
    { label: "INSTAGRAM", icon: "ri-instagram-fill", href: String(settings.social_instagram ?? "") },
    { label: "FACEBOOK", icon: "ri-facebook-fill", href: String(settings.social_facebook ?? "") },
    { label: "YOUTUBE", icon: "ri-youtube-fill", href: String(settings.social_youtube ?? "") },
  ].filter((item) => item.href);
  const upcomingEvents = events
    .filter((event) => new Date(event.eventDate).getTime() >= Date.now())
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
    .slice(0, 4);
  return (
    <footer className="bg-[#1A1A18]">
      {/* Social Bar */}
      <div
        className="border-b border-white/10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${socialMediaFooterBg})` }}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 md:grid-cols-4">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center justify-center gap-4 border-white/10 py-6 transition-colors hover:bg-white/5 cursor-pointer md:border-l md:first:border-l-0"
            >
              <div className="flex h-5 w-5 items-center justify-center">
                <i className={`${s.icon} text-lg text-white`} />
              </div>
              <span className="whitespace-nowrap font-inter text-[22px] font-bold uppercase leading-none tracking-tight text-white">
                {s.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer Content */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-7 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14 lg:py-14">
        {/* Logo & Socials */}
        <div className="text-center sm:text-left">
          <Link to="/" className="inline-flex items-center mb-4 cursor-pointer">
            <img
              src={logo1}
              alt="Joseph Wilson Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div className="flex gap-4 mt-4 justify-center sm:justify-start">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-6 w-6 items-center justify-center text-gray-300 hover:text-white cursor-pointer"
              >
                <i className={`${s.icon} text-sm`} />
              </a>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="text-center sm:text-left">
          <h4 className="mb-5 font-inter text-[24px] font-semibold leading-none text-white">
            <a href="#events">Upcoming Events</a>
          </h4>
          <ul className="space-y-3.5">
            {upcomingEvents.length ? upcomingEvents.map((ev) => (
              <li key={ev.id} className="flex flex-col gap-1 text-[13px] text-gray-300 sm:flex-row sm:gap-3">
                <span className="whitespace-nowrap font-semibold text-white">{new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(ev.eventDate))}</span>
                <span className="text-gray-400">{ev.title}{ev.location ? `, ${ev.location}` : ""}</span>
              </li>
            )) : <li className="text-[13px] text-gray-400">New dates will be announced soon.</li>}
          </ul>
        </div>

        {/* Quick Menu */}
        <div className="text-center sm:text-left">
          <h4 className="mb-5 font-inter text-[24px] font-semibold leading-none text-white">
            <a href="#menu">Quick Menu</a>
          </h4>
          <div className="flex justify-center gap-12 sm:justify-start">
            <ul className="space-y-2.5">
              {quickMenuLeft.map((item, i) => (
                <li key={i}>
                  <a href="#" rel="nofollow" className="text-[13px] text-gray-400 hover:text-white cursor-pointer">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5">
              {quickMenuRight.map((item, i) => (
                <li key={i}>
                  <a href="#" rel="nofollow" className="text-[13px] text-gray-400 hover:text-white cursor-pointer">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Latest Released */}
        <div className="text-center sm:text-left">
          <h4 className="mb-5 font-inter text-[24px] font-semibold leading-none text-white">
            <a href="#latest">Latest Released</a>
          </h4>
          <div className="mx-auto h-[190px] w-[190px] overflow-hidden sm:mx-0">
            <img
              src={albumArt}
              alt="Milestone — Latest Album"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
