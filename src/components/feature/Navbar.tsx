import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo1 from "@/assets/Logo1.svg";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Masterclass", path: "/masterclass" },
  { label: "Music", path: "/music" },
  { label: "Media", path: "/media" },
  { label: "Contact", path: "/contact" },
  { label: "Testimonials", path: "/testimonials" },
];

interface NavbarProps {
  light?: boolean;
}

export default function Navbar({ light = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = light
    ? "bg-white shadow-sm"
    : scrolled
      ? "bg-black/90 backdrop-blur-sm"
      : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center cursor-pointer">
          <img
            src={logo1}
            alt="Joseph Wilson Logo"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${location.pathname === link.path
                  ? "text-[#077DA7] border border-[#077DA7] px-2 py-0.5"
                  : light
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-gray-300 hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="w-8 h-8 flex items-center justify-center cursor-pointer">
            <i className={`ri-user-line text-xl ${light ? "text-gray-900" : "text-white"}`} />
          </Link>
          <Link
            to="/contact"
            className="bg-[#077DA7] text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:bg-[#05637f] transition-colors whitespace-nowrap cursor-pointer"
          >
            Book Me
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden cursor-pointer ${light ? "text-gray-900" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <i className={`text-2xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#1E1E1E] flex flex-col px-6 py-6 h-screen overflow-y-auto">
          <div className="flex items-center justify-between mb-12">
            <Link to="/login" className="w-[50px] h-[50px] rounded-full border-[3px] border-white flex items-center justify-center cursor-pointer overflow-hidden bg-white/10">
              <i className="ri-user-fill text-white text-[32px] mt-2" />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white cursor-pointer"
            >
              <i className="ri-close-line text-3xl font-bold" />
            </button>
          </div>

          <div className="flex flex-col gap-8 font-inter px-4 md:px-8">
            {navLinks.filter(link => link.path !== "/testimonials").map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-[17px] font-medium cursor-pointer ${location.pathname === link.path ? "text-[#077DA7]" : "text-white hover:text-gray-300"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 pb-12">
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-[85%] md:w-full bg-[#077DA7] text-white text-[13px] font-bold py-[18px] flex items-center justify-center rounded-none uppercase tracking-widest cursor-pointer hover:bg-[#066588] transition-colors"
              >
                BOOK ME
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
