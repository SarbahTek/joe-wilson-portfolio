import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Mail,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ALL_USERS, type PaymentStatus } from '@/data/users';
import DatePicker from '@/components/ui/DatePicker';
import { ddmmyyyyToIso, isoToDdmmyyyy } from '@/lib/dateFormat';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

function UserAvatar({ user }: { user: typeof ALL_USERS[0] }) {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
      <span className="text-lg sm:text-xl font-semibold text-gray-500">{getInitials(user.name)}</span>
    </div>
  );
}

// ─── Status badge for masterclass cohort tiles ─────────────────────────────

type CohortStatus = 'active' | 'upcoming' | 'completed';
const cohortStatusConfig: Record<CohortStatus, { label: string; pill: string; dot: string }> = {
  active:    { label: 'Active',    dot: 'bg-emerald-400', pill: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  upcoming:  { label: 'Upcoming',  dot: 'bg-brand',       pill: 'bg-blue-50 text-brand border border-blue-200' },
  completed: { label: 'Completed', dot: 'bg-gray-400',    pill: 'bg-gray-100 text-gray-600 border border-gray-200' },
};

function CohortBadge({ status }: { status: CohortStatus }) {
  const cfg = cohortStatusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold ${cfg.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ─── Payment status badge ─────────────────────────────────────────────────────

const paymentStatusConfig: Record<PaymentStatus, { label: string; classes: string }> = {
  successful: { label: 'Successful', classes: 'border border-emerald-300 text-emerald-700 bg-emerald-50' },
  refunded:   { label: 'Refunded',   classes: 'border border-amber-300 text-amber-700 bg-amber-50' },
  failed:     { label: 'Failed',     classes: 'border border-red-300 text-red-600 bg-red-50' },
};

function PaymentBadge({ status }: { status: PaymentStatus }) {
  const cfg = paymentStatusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-[11px] font-semibold ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [masterclassOpen, setMasterclassOpen] = useState(true);
  const [startDate, setStartDate] = useState('15/05/2025');
  const [endDate, setEndDate] = useState('12/05/2026');

  const user = ALL_USERS.find(u => u.id === id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-gray-500 font-medium text-lg">User not found.</p>
        <button
          onClick={() => navigate('/admin/users')}
          className="mt-4 text-brand text-sm font-medium hover:underline"
        >
          ← Back to users
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-7 max-w-[1000px] mx-auto space-y-6 pb-16">

      {/* ── Back link ─────────────────────────────────────────────────── */}
      <Link
        to="/admin/users"
        className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ChevronLeft size={15} />
        All Users
      </Link>

      {/* ── Profile header — no card, just inline ─────────────────────── */}
      <div className="flex items-center gap-4 sm:gap-5">
        <UserAvatar user={user} />
        <div>
          <h1 className="text-[24px] sm:text-[30px] font-bold text-gray-900 font-heading leading-tight">
            {user.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
              <Mail size={13} className="text-gray-400 flex-shrink-0" />
              <span>{user.email}</span>
            </div>
            {user.lastActive && (
              <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                <Calendar size={13} className="text-gray-400 flex-shrink-0" />
                <span>{user.lastActive}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Enrolled Masterclasses (collapsible) ──────────────────────── */}
      <div className="bg-white border border-gray-200">
        {/* Accordion header */}
        <button
          onClick={() => setMasterclassOpen(v => !v)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50/60 transition-colors"
        >
          <span className="text-[13px] font-semibold text-gray-900">Enrolled Masterclasses</span>
          {masterclassOpen
            ? <ChevronUp size={16} className="text-gray-400" />
            : <ChevronDown size={16} className="text-gray-400" />
          }
        </button>

        {/* Accordion body */}
        {masterclassOpen && (
          <div className="border-t border-gray-100 p-4">
            {user.enrolledCohorts.length === 0 ? (
              <p className="text-[13px] text-gray-400 py-4 text-center">Not enrolled in any masterclasses.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.enrolledCohorts.map((cohort, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(`/admin/masterclasses/${cohort.masterclassId}`)}
                    className="flex flex-col gap-1 px-4 py-3.5 bg-gray-50 border border-gray-100 cursor-pointer hover:border-brand/30 hover:bg-blue-50/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13px] font-semibold text-gray-900 leading-snug">{cohort.title}</p>
                      <CohortBadge status={cohort.status} />
                    </div>
                    <p className="text-[11px] text-gray-400">{cohort.dateRange}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Payment History ───────────────────────────────────────────── */}
      <div>
        <h2 className="text-[15px] font-bold text-gray-900 mb-4">Payment History</h2>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Start date */}
          <DatePicker
            value={ddmmyyyyToIso(startDate)}
            onChange={iso => setStartDate(isoToDdmmyyyy(iso))}
          />

          {/* Dash separator */}
          <span className="text-gray-400">—</span>

          {/* End date */}
          <DatePicker
            value={ddmmyyyyToIso(endDate)}
            onChange={iso => setEndDate(isoToDdmmyyyy(iso))}
            dropdownAlign="right"
          />

          {/* Status filter */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-[12px] text-gray-600 cursor-pointer">
            <span>All</span>
            <ChevronDown size={12} className="text-gray-400" />
          </div>
        </div>

        {/* Table — horizontally scrollable on mobile */}
        <div className="overflow-x-auto -mx-5 sm:mx-0">
          <div className="min-w-[560px] bg-white border border-gray-200">

            {/* Dark header */}
            <div
              className="grid items-center px-5 py-3.5"
              style={{ backgroundColor: '#1A1919', gridTemplateColumns: '2fr 1fr 90px 120px' }}
            >
              <p className="text-[10px] font-semibold text-white/60 uppercase tracking-widest">Masterclass</p>
              <p className="text-[10px] font-semibold text-white/60 uppercase tracking-widest">Date</p>
              <p className="text-[10px] font-semibold text-white/60 uppercase tracking-widest">Amount</p>
              <p className="text-[10px] font-semibold text-white/60 uppercase tracking-widest text-right">Status</p>
            </div>

            {/* Rows */}
            {user.payments.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-400 text-sm">No payment records found.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-50">
                {user.payments.map(payment => (
                  <li
                    key={payment.id}
                    className="grid items-center px-5 py-4 hover:bg-gray-50/70 transition-colors"
                    style={{ gridTemplateColumns: '2fr 1fr 90px 120px' }}
                  >
                    <p className="text-[13px] text-gray-800 font-medium pr-3">{payment.masterclass}</p>
                    <p className="text-[13px] text-gray-500">{payment.date}</p>
                    <p className="text-[13px] font-bold text-gray-900">${payment.amount}</p>
                    <div className="flex justify-end">
                      <PaymentBadge status={payment.status} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
