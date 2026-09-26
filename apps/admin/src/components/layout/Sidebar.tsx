import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
  FolderOpen,
  CreditCard,
  Settings,
  LogOut,
  PanelLeft,
  User,
  FileText,
  BriefcaseBusiness,
  CalendarDays,
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/Logo1.svg';
import { tokenStorage } from '@joe-wilson/shared/lib/token-storage';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Masterclasses', icon: BookOpen, path: '/admin/masterclasses' },
  { label: 'Services', icon: BriefcaseBusiness, path: '/admin/services' },
  { label: 'Events', icon: CalendarDays, path: '/admin/events' },
  { label: 'Users', icon: Users, path: '/admin/users' },
  { label: 'Inquiries', icon: MessageSquare, path: '/admin/inquiries' },
  { label: 'Quote Requests', icon: FileText, path: '/admin/quote-requests' },
  { label: 'Media Library', icon: FolderOpen, path: '/admin/media-library' },
  { label: 'Payments', icon: CreditCard, path: '/admin/payments' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
  { label: 'Account', icon: User, path: '/admin/account' },
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  desktopCollapsed: boolean;
  onDesktopToggle: () => void;
}

export default function Sidebar({
  mobileOpen,
  onMobileClose,
  desktopCollapsed,
  onDesktopToggle,
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        style={{ backgroundColor: '#1A1919' }}
        className={[
          'fixed top-0 left-0 z-40 h-full flex flex-col',
          'border-r border-white/[0.06]',
          'sidebar-transition overflow-hidden flex-shrink-0',
          // Mobile slide
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop always visible, width toggles
          'lg:translate-x-0 lg:static lg:z-auto',
          desktopCollapsed ? 'lg:w-[68px]' : 'lg:w-[240px]',
          'w-[240px]',
        ].join(' ')}
      >

        {/* ── Header: Logo + Panel toggle ─────────────────────────────── */}
        <div className="flex items-center justify-between px-4 h-[64px] flex-shrink-0">

          {/* Logo — shown when expanded, or on mobile always */}
          <div
            className={[
              'flex items-center min-w-0 overflow-hidden',
              desktopCollapsed ? 'lg:hidden' : 'flex-1',
            ].join(' ')}
          >
            {/*
              Logo1.svg has a 1600×1098 viewBox — a landscape wordmark.
              We pin the height so it fits the header, width scales naturally.
              The SVG has both the circular icon + "Joseph Wilson" text in one file.
            */}
            <img
              src={logo}
              alt="Joseph Wilson"
              className="h-8 w-auto object-contain object-left"
              style={{ maxWidth: '170px' }}
            />
          </div>

          {/* Panel toggle — always visible, right-aligned */}
          <button
            onClick={onDesktopToggle}
            className={[
              'hidden lg:flex items-center justify-center w-8 h-8 flex-shrink-0',
              'text-white/40 hover:text-white/80 transition-colors duration-200',
              desktopCollapsed ? 'mx-auto' : 'ml-2',
            ].join(' ')}
            aria-label={desktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={desktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {/* Panel icon — matches the reference UI toggle glyph */}
            <PanelLeft size={18} />
          </button>

          {/* Mobile menu close — only on mobile when open */}
          <div className="lg:hidden flex items-center">
            {desktopCollapsed && (
              <img
                src={logo}
                alt="Joseph Wilson"
                className="h-7 w-auto object-contain object-left"
                style={{ maxWidth: '150px' }}
              />
            )}
          </div>
        </div>

        {/* ── Navigation ───────────────────────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide py-2">
          <ul>
            {navItems.map(({ label, icon: Icon, path }) => {
              const isActive =
                location.pathname === path ||
                (path !== '/admin/dashboard' && location.pathname.startsWith(path));

              return (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={onMobileClose}
                    title={desktopCollapsed ? label : undefined}
                    className={[
                      'flex items-center gap-4 px-5 py-[14px]',
                      'transition-colors duration-150 select-none',
                      desktopCollapsed ? 'lg:justify-center lg:px-0' : '',
                      isActive
                        ? 'bg-[#077DA7] text-white'
                        : 'text-white/50 hover:bg-white/[0.06] hover:text-white/90',
                    ].join(' ')}
                  >
                    <Icon
                      size={20}
                      className="flex-shrink-0"
                      strokeWidth={1.75}
                    />
                    <span
                      className={[
                        'text-[14px] font-medium whitespace-nowrap',
                        desktopCollapsed ? 'lg:hidden' : '',
                      ].join(' ')}
                    >
                      {label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Logout ───────────────────────────────────────────────────── */}
        <div className="flex-shrink-0 p-3">
          <button
            onClick={() => { tokenStorage.clear(); navigate('/login', { replace: true }); }}
            className={[
              'w-full flex items-center gap-4 px-5 py-[14px]',
              'bg-white/[0.08] hover:bg-white/[0.12]',
              'text-white/70 hover:text-white',
              'transition-colors duration-150',
              desktopCollapsed ? 'lg:justify-center lg:px-0' : '',
            ].join(' ')}
          >
            <LogOut size={20} className="flex-shrink-0" strokeWidth={1.75} />
            <span
              className={[
                'text-[14px] font-medium',
                desktopCollapsed ? 'lg:hidden' : '',
              ].join(' ')}
            >
              Logout
            </span>
          </button>
        </div>

      </aside>
    </>
  );
}
