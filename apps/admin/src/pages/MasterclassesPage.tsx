import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Calendar,
  Users,
  ArrowRight,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  BookOpen,
  X,
  ChevronDown,
} from 'lucide-react';
import { masterclasses, statusConfig, type Status, type Masterclass } from '@/data/masterclasses';
import img1 from '@/assets/bassmasterclass1.jpg';
import DatePicker from '@/components/ui/DatePicker';
import { ddmmyyyyToIso, isoToDdmmyyyy } from '@/lib/dateFormat';

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold ${cfg.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function ActionMenu({ id }: { id: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <MoreVertical size={15} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 w-40 bg-white border border-gray-100 shadow-card-hover py-1">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">
              <Eye size={14} className="text-brand" /> View details
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">
              <Edit3 size={14} className="text-amber-500" /> Edit
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 transition-colors">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function MasterclassCard({ mc }: { mc: Masterclass }) {
  const navigate = useNavigate();
  const goToDetail = () => navigate(`/admin/masterclasses/${mc.id}`);

  return (
    <div className="bg-white border border-gray-100 shadow-card flex flex-col overflow-hidden hover:shadow-card-hover transition-shadow duration-200 group">
      {/* Image — clickable */}
      <div
        className="relative h-[200px] overflow-hidden flex-shrink-0 cursor-pointer"
        onClick={goToDetail}
      >
        <img
          src={mc.image}
          alt={mc.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <StatusBadge status={mc.status} />
        </div>
        <div className="absolute top-2 right-2" onClick={e => e.stopPropagation()}>
          <ActionMenu id={mc.id} />
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-heading font-semibold text-[17px] text-gray-900 leading-snug mb-2 cursor-pointer hover:text-brand transition-colors"
          onClick={goToDetail}
        >
          {mc.title}
        </h3>
        <p className="text-[12.5px] text-gray-400 leading-relaxed line-clamp-2 flex-1">
          {mc.description}
        </p>

        {/* Meta */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
            <Calendar size={13} className="text-brand/70 flex-shrink-0" />
            <span>{mc.startDate} — {mc.endDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
              <Users size={13} className="text-brand/70 flex-shrink-0" />
              <span>{mc.enrolled} enrolled &nbsp;·&nbsp; {mc.sessions} sessions</span>
            </div>
            <span className="text-[15px] font-bold text-gray-900 font-heading">${mc.price}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={goToDetail}
          className="mt-4 flex items-center gap-1 text-[12.5px] font-semibold text-brand hover:text-brand-dark transition-colors group/link"
        >
          Open masterclass
          <ArrowRight size={13} className="transition-transform duration-200 group-hover/link:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────

const FILTERS: { label: string; value: Status | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Completed', value: 'completed' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MasterclassesPage() {
  const [list, setList] = useState<Masterclass[]>(masterclasses);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<Status | 'all'>('all');
  const [startDate, setStartDate] = useState('15/05/2025');
  const [endDate, setEndDate] = useState('12/05/2026');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalStartDate, setModalStartDate] = useState('15/05/2025');
  const [modalEndDate, setModalEndDate] = useState('15/05/2025');
  const [modalPrice, setModalPrice] = useState('540');
  const [modalStatus, setModalStatus] = useState<Status>('upcoming');

  const filtered = list.filter(mc => {
    const matchesSearch = mc.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = activeFilter === 'all' || mc.status === activeFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: list.length,
    active: list.filter(m => m.status === 'active').length,
    upcoming: list.filter(m => m.status === 'upcoming').length,
    completed: list.filter(m => m.status === 'completed').length,
  };

  const handleOpenModal = () => {
    setModalTitle('');
    setModalDescription('');
    setModalStartDate('15/05/2025');
    setModalEndDate('15/05/2025');
    setModalPrice('540');
    setModalStatus('upcoming');
    setIsModalOpen(true);
  };

  const formatDisplayDate = (dateStr: string): string => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (month >= 1 && month <= 12) {
          return `${months[month - 1]} ${day}, ${year}`;
        }
      }
    }
    return dateStr;
  };

  const handleCreateMasterclass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalStartDate || !modalEndDate) return;
    const newMc: Masterclass = {
      id: list.length > 0 ? Math.max(...list.map(m => m.id)) + 1 : 1,
      title: modalTitle,
      description: modalDescription,
      image: img1,
      status: modalStatus,
      startDate: formatDisplayDate(modalStartDate),
      endDate: formatDisplayDate(modalEndDate),
      enrolled: 0,
      sessions: 0,
      price: Number(modalPrice) || 0,
      sessionsData: [],
      enrollees: [],
      infoText: modalDescription,
    };

    masterclasses.push(newMc);
    setList([...masterclasses]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-5 lg:p-7 max-w-[1280px] mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold text-brand uppercase tracking-widest mb-1">Programs</p>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Masterclasses</h1>
          <p className="text-gray-400 text-sm mt-1">
            Cohort-based programs are the heartbeat of the studio. Manage every detail from sessions to enrollments.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-[13px] font-semibold
            hover:bg-brand-dark transition-colors duration-200 flex-shrink-0 self-start sm:self-center"
        >
          <Plus size={15} />
          New masterclass
        </button>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="w-full bg-white border border-gray-200 pl-8 pr-4 py-2 text-[13px] text-gray-700
              placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand/40
              focus:border-brand/60 transition-all duration-200"
          />
        </div>

        {/* Date range */}
        <div className="flex items-center gap-2">
          <DatePicker
            value={ddmmyyyyToIso(startDate)}
            onChange={iso => setStartDate(isoToDdmmyyyy(iso))}
          />
          <span className="text-gray-400 text-sm">—</span>
          <DatePicker
            value={ddmmyyyyToIso(endDate)}
            onChange={iso => setEndDate(isoToDdmmyyyy(iso))}
            dropdownAlign="right"
          />
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={[
              'flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-all duration-150',
              'border-b-2 -mb-px',
              activeFilter === f.value
                ? 'border-brand text-brand'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ].join(' ')}
          >
            {f.label}
            <span className={`text-[11px] px-1.5 py-0.5 font-semibold ${
              activeFilter === f.value ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-500'
            }`}>
              {counts[f.value]}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(mc => (
              <MasterclassCard key={mc.id} mc={mc} />
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center pt-4 pb-2">
            <button className="px-8 py-2.5 border border-gray-300 text-[13px] font-semibold text-gray-700
              hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 tracking-wide uppercase">
              Load more
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen size={36} className="text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No masterclasses found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter.</p>
        </div>
      )}

      {/* New Masterclass Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white border border-gray-100 shadow-2xl relative w-full max-w-lg p-7">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-7 right-7 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-[22px] font-bold text-gray-900 font-heading leading-tight mb-1">
                New Masterclass
              </h2>
              <p className="text-[12.5px] text-gray-400">
                Define the cohort. You can add sessions and enrollments after.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateMasterclass} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={modalTitle}
                  onChange={e => setModalTitle(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-3.5 py-2 text-[13px] text-gray-700
                    focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={modalDescription}
                  onChange={e => setModalDescription(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-3.5 py-2 text-[13px] text-gray-700
                    focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all resize-none"
                />
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                    Start date
                  </label>
                  <DatePicker
                    variant="form"
                    value={ddmmyyyyToIso(modalStartDate)}
                    onChange={iso => setModalStartDate(isoToDdmmyyyy(iso))}
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                    End date
                  </label>
                  <DatePicker
                    variant="form"
                    value={ddmmyyyyToIso(modalEndDate)}
                    onChange={iso => setModalEndDate(isoToDdmmyyyy(iso))}
                  />
                </div>
              </div>

              {/* Price and Status Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                    Price(USD)
                  </label>
                  <input
                    type="number"
                    required
                    value={modalPrice}
                    onChange={e => setModalPrice(e.target.value)}
                    className="w-full bg-white border border-gray-200 px-3.5 py-2 text-[13px] text-gray-700
                      focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                    Status
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={modalStatus}
                      onChange={e => setModalStatus(e.target.value as Status)}
                      className="w-full bg-white border border-gray-200 pl-3.5 pr-10 py-2 text-[13px] text-gray-700
                        appearance-none focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-[13px] font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand text-white text-[13px] font-semibold
                    hover:bg-brand-dark transition-colors duration-200"
                >
                  Create Masterclass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
