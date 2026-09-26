import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import avatar from '@/assets/avatar.png';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/api/admin.api';

interface NavbarProps {
  onMobileMenuToggle: () => void;
  isMobileSidebarOpen: boolean;
}

export default function Navbar({ onMobileMenuToggle, isMobileSidebarOpen }: NavbarProps) {
  const { data: user } = useQuery({ queryKey: ['admin', 'me'], queryFn: adminApi.me });
  return (
    <header
      style={{ backgroundColor: '#1A1919' }}
      className="sticky top-0 z-20 flex items-center h-16 px-4 lg:px-6 border-b border-white/[0.06]"
    >
      {/* ── Hamburger — mobile only ──────────────────────── */}
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden flex items-center justify-center w-9 h-9 text-white hover:bg-white/[0.08] transition-colors"
        aria-label={isMobileSidebarOpen ? 'Close menu' : 'Open menu'}
      >
        <Menu size={22} strokeWidth={2} />
      </button>

      {/* ── Search — desktop only ────────────────────────── */}
      <div className="hidden lg:flex flex-1 max-w-sm">
        <div className="relative w-full">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search masterclasses, users, payments"
            className="w-full bg-white/[0.06] border border-white/[0.08]
              pl-8 pr-4 py-2 text-[13px] text-white/70 placeholder:text-white/30
              focus:outline-none focus:ring-1 focus:ring-brand/50 focus:border-brand/50
              focus:bg-white/[0.09] transition-all duration-200"
          />
        </div>
      </div>

      {/* ── Right: Bell + Avatar ─────────────────────────── */}
      <div className="ml-auto flex items-center gap-3 lg:gap-4">

        {/* Bell notification */}
        <button
          className="relative flex items-center justify-center w-9 h-9 text-white hover:bg-white/[0.08] transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.75} />
          {/* Red dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-1 ring-[#1A1919]" />
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2.5">
          {/* Name + role — desktop only */}
          <div className="text-right hidden lg:block">
            <p className="text-[13px] font-semibold text-white leading-tight">{user ? `${user.firstName} ${user.lastName}` : 'Administrator'}</p>
            <p className="text-[11px] text-white/40 leading-tight">{user?.role ?? 'Admin'}</p>
          </div>

          {/* Avatar photo — circular, larger on mobile to match reference */}
          <img
            src={user?.avatarUrl || avatar}
            alt={user ? `${user.firstName} ${user.lastName}` : 'Administrator'}
            className="w-9 h-9 lg:w-8 lg:h-8 rounded-full object-cover object-top ring-2 ring-white/20 flex-shrink-0"
          />
        </div>
      </div>
    </header>
  );
}
