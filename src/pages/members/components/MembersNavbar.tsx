import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo1 from "@/assets/Logo1.svg";

const navLinks = [
  { label: "Dashboard", path: "/members/dashboard" },
  { label: "Masterclass", path: "/members" },
  { label: "Account", path: "/members/account" },
];

export default function MembersNavbar({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = theme === "light" && !scrolled;
  const navBg = scrolled ? "bg-black/90 backdrop-blur-sm shadow-sm" : "bg-transparent";
  const textColor = isLight ? "text-[#1a1a1a]" : "text-white";
  const logoTextColor = isLight ? "text-[#1a1a1a]" : "text-white";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center cursor-pointer">
          <img
            src={logo1}
            alt="Joseph Wilson Logo"
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                location.pathname === link.path
                  ? `text-[#077DA7] border border-[#077DA7] px-4 py-1`
                  : `${textColor} hover:text-[#077DA7]`
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
          </div>
          <button className="bg-[#077DA7] text-white text-[10px] font-bold px-4 py-2 rounded-none uppercase tracking-wider hover:bg-[#05637f] transition-colors cursor-pointer">
            LOGOUT
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden cursor-pointer ${textColor}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <i className={`text-2xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#1E1E1E] flex flex-col px-6 py-6 h-screen overflow-y-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-[3px] border-white flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white cursor-pointer"
            >
              <i className="ri-close-line text-3xl font-bold" />
            </button>
          </div>

          <div className="flex flex-col gap-8 font-inter px-4 md:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-[17px] font-medium cursor-pointer ${
                  location.pathname === link.path ? "text-[#077DA7]" : "text-white hover:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="mt-4 pb-12">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-[85%] md:w-full bg-[#077DA7] text-white text-[13px] font-bold py-[18px] flex items-center justify-center rounded-none uppercase tracking-widest cursor-pointer hover:bg-[#066588] transition-colors"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
