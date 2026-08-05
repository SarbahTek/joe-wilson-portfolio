import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Pencil,
  Plus,
  Calendar,
  Trash2,
  ExternalLink,
  FileText,
  Users,
  X,
  ChevronDown,
  Upload,
  Search,
} from 'lucide-react';
import { masterclasses, statusConfig, type Status, type Session, type Resource } from '@/data/masterclasses';
import { INITIAL_MEDIA } from '@/data/media';
import DateTimePicker from '@/components/ui/DateTimePicker';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold ${cfg.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ─── Tab types ────────────────────────────────────────────────────────────────

type Tab = 'sessions' | 'enrollments' | 'info';

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MasterclassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('sessions');

  const initialMc = masterclasses.find(m => m.id === Number(id));
  const [cohort, setCohort] = useState(initialMc);

  // Modal states for Add Session
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);

  // Modal states for Attach Files
  const [isAttachFileOpen, setIsAttachFileOpen] = useState(false);
  const [attachFileSessionId, setAttachFileSessionId] = useState<number | null>(null);
  const [mediaSearchQuery, setMediaSearchQuery] = useState('');
  const [selectedResources, setSelectedResources] = useState<Resource[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDatetime, setSessionDatetime] = useState('');
  const [sessionStatus, setSessionStatus] = useState<Status>('upcoming');
  const [sessionLiveUrl, setSessionLiveUrl] = useState('');
  const [sessionReplayUrl, setSessionReplayUrl] = useState('');

  // Modal states for Edit Session
  const [isEditSessionOpen, setIsEditSessionOpen] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<number | null>(null);
  const [editSessionTitle, setEditSessionTitle] = useState('');
  const [editSessionDatetime, setEditSessionDatetime] = useState('');
  const [editSessionStatus, setEditSessionStatus] = useState<Status>('upcoming');
  const [editSessionLiveUrl, setEditSessionLiveUrl] = useState('');
  const [editSessionReplayUrl, setEditSessionReplayUrl] = useState('');

  // Sync state if id changes
  React.useEffect(() => {
    setCohort(masterclasses.find(m => m.id === Number(id)));
  }, [id]);

  if (!cohort) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-32 text-center">
        <p className="text-gray-500 font-medium text-lg">Masterclass not found.</p>
        <button
          onClick={() => navigate('/admin/masterclasses')}
          className="mt-4 text-brand text-sm font-medium hover:underline"
        >
          ← Back to masterclasses
        </button>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'sessions', label: 'Sessions', count: cohort.sessionsData.length },
    { key: 'enrollments', label: 'Enrollments', count: cohort.enrolled },
    { key: 'info', label: 'Info' },
  ];

  const handleOpenAddSession = () => {
    setSessionTitle('');
    setSessionDatetime('');
    setSessionStatus('upcoming');
    setSessionLiveUrl('');
    setSessionReplayUrl('');
    setIsAddSessionOpen(true);
  };

  const parseDatetime = (dtStr: string) => {
    if (!dtStr) return { date: '15', month: 'MAY', datetime: 'May 15, 6:00 PM' };
    const dateObj = new Date(dtStr);
    if (isNaN(dateObj.getTime())) return { date: '15', month: 'MAY', datetime: 'May 15, 6:00 PM' };

    const day = dateObj.getDate().toString();

    const monthsShort = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const monthShort = monthsShort[dateObj.getMonth()];

    const monthsFull = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthFull = monthsFull[dateObj.getMonth()];

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const timeStr = `${hours}:${minutes} ${ampm}`;

    return {
      date: day,
      month: monthShort,
      datetime: `${monthFull} ${day}, ${timeStr}`
    };
  };

  const handleOpenAttachFile = (sessionId: number) => {
    setAttachFileSessionId(sessionId);
    setMediaSearchQuery('');
    setSelectedResources([]);
    setIsAttachFileOpen(true);
  };

  const addMockFiles = (files: FileList) => {
    const newResources: Resource[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let sizeStr = '';
      if (file.size >= 1048576) {
        sizeStr = `${(file.size / 1048576).toFixed(1)} MB`;
      } else {
        sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
      }

      newResources.push({
        name: file.name,
        size: sizeStr,
      });
    }

    setSelectedResources(prev => {
      const existingNames = new Set(prev.map(r => r.name));
      const filtered = newResources.filter(r => !existingNames.has(r.name));
      return [...prev, ...filtered];
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addMockFiles(e.target.files);
    }
  };

  const handleSaveAttachedFiles = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cohort || attachFileSessionId === null) return;

    const updatedSessions = cohort.sessionsData.map(s => {
      if (s.id === attachFileSessionId) {
        const existingNames = new Set(s.resources.map(r => r.name));
        const newResources = selectedResources.filter(r => !existingNames.has(r.name));
        return {
          ...s,
          resources: [...s.resources, ...newResources],
        };
      }
      return s;
    });

    const updatedCohort = {
      ...cohort,
      sessionsData: updatedSessions,
    };

    const idx = masterclasses.findIndex(m => m.id === cohort.id);
    if (idx !== -1) {
      masterclasses[idx] = updatedCohort;
    }

    setCohort(updatedCohort);
    setIsAttachFileOpen(false);
  };

  const handleDeleteResource = (sessionId: number, resourceName: string) => {
    if (!cohort) return;
    const updatedSessions = cohort.sessionsData.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          resources: s.resources.filter(r => r.name !== resourceName),
        };
      }
      return s;
    });

    const updatedCohort = {
      ...cohort,
      sessionsData: updatedSessions,
    };

    const idx = masterclasses.findIndex(m => m.id === cohort.id);
    if (idx !== -1) {
      masterclasses[idx] = updatedCohort;
    }

    setCohort(updatedCohort);
  };

  const formatDatetimeLocal = (displayStr: string, defaultYear = '2026'): string => {
    try {
      const match = displayStr.match(/([A-Za-z]+)\s+(\d+),\s+(\d+):(\d+)\s+(AM|PM)/i);
      if (match) {
        const monthStr = match[1];
        const dayStr = match[2];
        const hourStr = match[3];
        const minuteStr = match[4];
        const ampm = match[5].toUpperCase();

        const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        const monthIdx = months.indexOf(monthStr.toLowerCase());
        if (monthIdx !== -1) {
          const month = (monthIdx + 1).toString().padStart(2, '0');
          const day = dayStr.padStart(2, '0');

          let hour = parseInt(hourStr, 10);
          if (ampm === 'PM' && hour < 12) hour += 12;
          if (ampm === 'AM' && hour === 12) hour = 0;
          const hourVal = hour.toString().padStart(2, '0');
          const minuteVal = minuteStr.padStart(2, '0');

          return `${defaultYear}-${month}-${day}T${hourVal}:${minuteVal}`;
        }
      }
    } catch (e) {
      console.error(e);
    }

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const handleOpenEditSession = (session: Session) => {
    setEditingSessionId(session.id);
    setEditSessionTitle(session.title);

    const yearMatch = cohort.startDate.match(/\d{4}/);
    const cohortYear = yearMatch ? yearMatch[0] : '2026';

    setEditSessionDatetime(formatDatetimeLocal(session.datetime, cohortYear));
    setEditSessionStatus(session.status);
    setEditSessionLiveUrl(session.liveLink || '');
    setEditSessionReplayUrl(session.replayLink || '');
    setIsEditSessionOpen(true);
  };

  const handleSaveSessionChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cohort || editingSessionId === null || !editSessionDatetime) return;

    const { date, month, datetime } = parseDatetime(editSessionDatetime);

    const updatedSessions = cohort.sessionsData.map(s => {
      if (s.id === editingSessionId) {
        const updated: Session = {
          ...s,
          date,
          month,
          title: editSessionTitle,
          datetime,
          status: editSessionStatus,
        };

        if (editSessionLiveUrl.trim()) {
          updated.liveLink = editSessionLiveUrl.trim();
        } else {
          delete updated.liveLink;
        }

        if (editSessionReplayUrl.trim()) {
          updated.replayLink = editSessionReplayUrl.trim();
        } else {
          delete updated.replayLink;
        }

        return updated;
      }
      return s;
    });

    const updatedCohort = {
      ...cohort,
      sessions: updatedSessions.length,
      sessionsData: updatedSessions,
    };

    const idx = masterclasses.findIndex(m => m.id === cohort.id);
    if (idx !== -1) {
      masterclasses[idx] = updatedCohort;
    }

    setCohort(updatedCohort);
    setIsEditSessionOpen(false);
  };

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cohort || !sessionDatetime) return;

    const { date, month, datetime } = parseDatetime(sessionDatetime);

    const newSessionId = cohort.sessionsData.length > 0
      ? Math.max(...cohort.sessionsData.map(s => s.id)) + 1
      : 1;

    const newSession: Session = {
      id: newSessionId,
      date,
      month,
      title: sessionTitle,
      datetime,
      status: sessionStatus,
      resources: [],
    };

    if (sessionLiveUrl.trim()) {
      newSession.liveLink = sessionLiveUrl.trim();
    }
    if (sessionReplayUrl.trim()) {
      newSession.replayLink = sessionReplayUrl.trim();
    }

    const updatedSessions = [...cohort.sessionsData, newSession];
    const updatedCohort = {
      ...cohort,
      sessions: updatedSessions.length,
      sessionsData: updatedSessions,
    };

    // Update global array
    const idx = masterclasses.findIndex(m => m.id === cohort.id);
    if (idx !== -1) {
      masterclasses[idx] = updatedCohort;
    }

    setCohort(updatedCohort);
    setIsAddSessionOpen(false);
  };

  const handleDeleteSession = (sessionId: number) => {
    if (!cohort) return;
    const updatedSessions = cohort.sessionsData.filter(s => s.id !== sessionId);
    const updatedCohort = {
      ...cohort,
      sessions: updatedSessions.length,
      sessionsData: updatedSessions,
    };

    // Update global array
    const idx = masterclasses.findIndex(m => m.id === cohort.id);
    if (idx !== -1) {
      masterclasses[idx] = updatedCohort;
    }

    setCohort(updatedCohort);
  };

  return (
    <div className="p-5 lg:p-7 max-w-[1100px] mx-auto space-y-6 pb-16">

      {/* ── Back link ─────────────────────────────────────────────────── */}
      <Link
        to="/admin/masterclasses"
        className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ChevronLeft size={15} />
        All masterclasses
      </Link>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold text-brand uppercase tracking-widest mb-1">
            Cohort &nbsp;·&nbsp; {cohort.sessionsData.length} Sessions
          </p>
          <h1 className="text-[28px] lg:text-[32px] font-bold text-gray-900 font-heading leading-tight">
            {cohort.title}
          </h1>
          <p className="text-gray-400 text-sm mt-1.5 max-w-xl leading-relaxed">
            {cohort.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center">
          <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Pencil size={13} />
            Edit info
          </button>
          <button
            onClick={handleOpenAddSession}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand text-white text-[13px] font-semibold hover:bg-brand-dark transition-colors"
          >
            <Plus size={14} />
            Add session
          </button>
        </div>
      </div>

      {/* ── Stat cards ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Status */}
        <div className="bg-white border border-gray-100 shadow-card p-5">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Status</p>
          <StatusBadge status={cohort.status} />
        </div>

        {/* Dates */}
        <div className="bg-white border border-gray-100 shadow-card p-5">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Dates</p>
          <p className="text-[15px] font-bold text-gray-900 font-heading leading-tight">{cohort.startDate}</p>
          <p className="text-[12px] text-gray-400 mt-0.5">to {cohort.endDate}</p>
        </div>

        {/* Price */}
        <div className="bg-white border border-gray-100 shadow-card p-5">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Price</p>
          <p className="text-[22px] font-bold text-gray-900 font-heading leading-none">${cohort.price}</p>
        </div>

        {/* Enrolled */}
        <div className="bg-white border border-gray-100 shadow-card p-5">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Enrolled</p>
          <p className="text-[22px] font-bold text-gray-900 font-heading leading-none">{cohort.enrolled}</p>
        </div>
      </div>

      {/* ── Tabs ──────────────────────────────────────────────────────── */}
      <div className="flex items-center border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={[
              'flex items-center gap-1.5 px-5 py-3 text-[13px] font-medium transition-all duration-150',
              'border-b-2 -mb-px',
              activeTab === tab.key
                ? 'border-brand text-brand'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ].join(' ')}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`text-[11px] px-1.5 py-0.5 font-semibold ${activeTab === tab.key ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-500'
                }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Sessions tab ──────────────────────────────────────────────── */}
      {activeTab === 'sessions' && (
        <div className="space-y-4">
          {cohort.sessionsData.map((session, idx) => (
            <div key={session.id} className="bg-white border border-gray-100 shadow-card overflow-hidden">

              {/* Session header row */}
              <div className="flex items-start gap-4 px-5 py-4">

                {/* Date badge */}
                <div className="flex-shrink-0 text-center w-10 pt-0.5">
                  <p className="text-[20px] font-bold text-gray-900 leading-none font-heading">{session.date}</p>
                  <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">{session.month}</p>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <p className="text-[15px] font-semibold text-gray-900">{session.title}</p>
                    <StatusBadge status={session.status} />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 text-[12px] text-gray-400">
                    <Calendar size={11} className="text-brand/60 flex-shrink-0" />
                    {session.datetime}
                  </div>
                  {(session.liveLink || session.replayLink) && (
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {session.liveLink && (
                        <a
                          href={session.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 text-red-600 text-[11px] font-semibold hover:bg-red-100 transition-colors"
                        >
                          <ExternalLink size={10} />
                          Live link
                        </a>
                      )}
                      {session.replayLink && (
                        <a
                          href={session.replayLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-[11px] font-semibold hover:bg-gray-100 transition-colors"
                        >
                          <ExternalLink size={10} />
                          Replay link
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleOpenEditSession(session)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteSession(session.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-50 mx-5" />

              {/* Resources */}
              <div className="px-5 py-3">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Resources ({session.resources.length})
                  </p>
                  <button
                    onClick={() => handleOpenAttachFile(session.id)}
                    className="flex items-center gap-1 text-[12px] font-medium text-brand hover:text-brand-dark transition-colors"
                  >
                    <Plus size={12} />
                    Attach file
                  </button>
                </div>

                {session.resources.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {session.resources.map((res, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 border border-gray-100 group"
                      >
                        <div className="w-7 h-7 bg-brand/10 flex items-center justify-center flex-shrink-0">
                          <FileText size={13} className="text-brand" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-medium text-gray-800 truncate">{res.name}</p>
                          <p className="text-[11px] text-gray-400">{res.size}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteResource(session.id, res.name)}
                          className="p-1 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[12px] text-gray-400">No files attached yet.</p>
                )}
              </div>

              {/* Separator between sessions (except last) */}
              {idx < cohort.sessionsData.length - 1 && (
                <div className="h-px bg-gray-100 mx-5 mt-2" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Enrollments tab ───────────────────────────────────────────── */}
      {activeTab === 'enrollments' && (
        <div className="bg-white border border-gray-100 shadow-card">
          {cohort.enrollees.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users size={32} className="text-gray-300 mb-2" />
              <p className="text-gray-500 font-medium">No enrollments yet</p>
              <p className="text-gray-400 text-sm mt-1">Students who enroll will appear here.</p>
            </div>
          ) : (
            <ul>
              {cohort.enrollees.map((enr, i) => (
                <li
                  key={i}
                  className={[
                    'flex items-center gap-3.5 px-5 py-4',
                    i < cohort.enrollees.length - 1 ? 'border-b border-gray-100' : '',
                  ].join(' ')}
                >
                  {/* Photo avatar */}
                  <img
                    src={enr.avatar}
                    alt={enr.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />

                  {/* Name + email */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-gray-900 leading-tight">{enr.name}</p>
                    <p className="text-[12px] text-gray-400 leading-tight mt-0.5">{enr.email}</p>
                  </div>

                  {/* Enrolled date */}
                  <p className="text-[12px] text-gray-400 flex-shrink-0">
                    Enrolled {enr.joinedDate}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ── Info tab ──────────────────────────────────────────────────── */}
      {activeTab === 'info' && (
        <div className="bg-white border border-gray-100 shadow-card px-6 py-5 space-y-5">

          {/* Title + Price row */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Title</p>
              <p className="text-[14px] font-medium text-gray-900">{cohort.title}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Price</p>
              <p className="text-[14px] font-medium text-gray-900">${cohort.price}</p>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Description</p>
            <p className="text-[13.5px] text-gray-700 leading-relaxed">{cohort.description}</p>
          </div>

        </div>
      )}

      {/* Add Session Modal */}
      {isAddSessionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white border border-gray-100 shadow-2xl relative w-full max-w-lg p-7">
            {/* Close Button */}
            <button
              onClick={() => setIsAddSessionOpen(false)}
              className="absolute top-7 right-7 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-[22px] font-bold text-gray-900 font-heading leading-tight mb-1">
                Add session
              </h2>
              <p className="text-[12.5px] text-gray-400">
                Schedule a session and attach the live and replay links
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAddSession} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={sessionTitle}
                  onChange={e => setSessionTitle(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-3.5 py-2 text-[13px] text-gray-700
                    focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
                />
              </div>

              {/* Date/Time and Status Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                    Date & time
                  </label>
                  <DateTimePicker value={sessionDatetime} onChange={setSessionDatetime} />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                    Status
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={sessionStatus}
                      onChange={e => setSessionStatus(e.target.value as Status)}
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

              {/* Live URL */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Live URL (YouTube)
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/live/...."
                  value={sessionLiveUrl}
                  onChange={e => setSessionLiveUrl(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-3.5 py-2 text-[13px] text-gray-700
                    focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
                />
              </div>

              {/* Replay URL */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Replay URL (YouTube)
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/live/...."
                  value={sessionReplayUrl}
                  onChange={e => setSessionReplayUrl(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-3.5 py-2 text-[13px] text-gray-700
                    focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddSessionOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-[13px] font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand text-white text-[13px] font-semibold
                    hover:bg-brand-dark transition-colors duration-200"
                >
                  Add session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Session Modal */}
      {isEditSessionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white border border-gray-100 shadow-2xl relative w-full max-w-lg p-7">
            {/* Close Button */}
            <button
              onClick={() => setIsEditSessionOpen(false)}
              className="absolute top-7 right-7 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-[22px] font-bold text-gray-900 font-heading leading-tight mb-1">
                Edit session
              </h2>
              <p className="text-[12.5px] text-gray-400">
                Schedule a session and attach the live and replay links
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveSessionChanges} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editSessionTitle}
                  onChange={e => setEditSessionTitle(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-3.5 py-2 text-[13px] text-gray-700
                    focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
                />
              </div>

              {/* Date/Time and Status Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                    Date & time
                  </label>
                  <DateTimePicker value={editSessionDatetime} onChange={setEditSessionDatetime} />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                    Status
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={editSessionStatus}
                      onChange={e => setEditSessionStatus(e.target.value as Status)}
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

              {/* Live URL */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Live URL (YouTube)
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/live/...."
                  value={editSessionLiveUrl}
                  onChange={e => setEditSessionLiveUrl(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-3.5 py-2 text-[13px] text-gray-700
                    focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
                />
              </div>

              {/* Replay URL */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Replay URL (YouTube)
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/live/...."
                  value={editSessionReplayUrl}
                  onChange={e => setEditSessionReplayUrl(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-3.5 py-2 text-[13px] text-gray-700
                    focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditSessionOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-[13px] font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand text-white text-[13px] font-semibold
                    hover:bg-brand-dark transition-colors duration-200"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attach Files Modal */}
      {isAttachFileOpen && (() => {
        const targetSession = cohort.sessionsData.find(s => s.id === attachFileSessionId);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white border border-gray-100 shadow-2xl relative w-full max-w-lg p-7 rounded-none">
              {/* Close Button */}
              <button
                onClick={() => setIsAttachFileOpen(false)}
                className="absolute top-7 right-7 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-[22px] font-bold text-gray-900 font-heading leading-tight mb-1">
                  Attach files to session
                </h2>
                <p className="text-[12.5px] text-gray-400">
                  Files added here become resources for "{targetSession?.title || ''}".
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveAttachedFiles} className="space-y-5">
                {/* Search existing media */}
                <div className="relative">
                  <div className="relative flex items-center">
                    <Search size={14} className="absolute left-3.5 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search for already existing upload in media files"
                      value={mediaSearchQuery}
                      onChange={e => setMediaSearchQuery(e.target.value)}
                      className="w-full bg-white border border-gray-200 pl-9 pr-3.5 py-2 text-[13px] text-gray-700
                        focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
                    />
                  </div>

                  {/* Autocomplete Dropdown */}
                  {mediaSearchQuery.trim() && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 shadow-lg max-h-40 overflow-y-auto z-10 divide-y divide-gray-100">
                      {INITIAL_MEDIA.filter(item =>
                        item.name.toLowerCase().includes(mediaSearchQuery.toLowerCase())
                      ).map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            if (!selectedResources.some(r => r.name === item.name)) {
                              setSelectedResources(prev => [...prev, { name: item.name, size: item.size }]);
                            }
                            setMediaSearchQuery('');
                          }}
                          className="w-full text-left px-3.5 py-2.5 text-[12.5px] text-gray-700 hover:bg-brand/5 transition-colors"
                        >
                          <p className="font-medium truncate">{item.name}</p>
                          <p className="text-[10px] text-gray-400">{item.size} · {item.type}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* OR Divider */}
                <div className="flex items-center my-4">
                  <div className="flex-1 h-px bg-gray-150" />
                  <span className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">OR</span>
                  <div className="flex-1 h-px bg-gray-150" />
                </div>

                {/* Dotted Upload Zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      addMockFiles(e.dataTransfer.files);
                    }
                  }}
                  className="border-2 border-dashed border-brand/20 hover:border-brand/40 bg-brand/[0.02] hover:bg-brand/[0.04] p-8 flex flex-col items-center justify-center cursor-pointer transition-colors"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                  />
                  <Upload size={24} className="text-brand mb-2.5" />
                  <p className="text-[13px] font-semibold text-gray-800 mb-0.5">Drop files here or click to browse</p>
                  <p className="text-[11px] text-gray-400">PDF, audio, images — up to 50 MB each</p>
                </div>

                {/* Queue of Selected Files */}
                {selectedResources.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Selected files to attach ({selectedResources.length})
                    </p>
                    <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                      {selectedResources.map((res, rIdx) => (
                        <div
                          key={rIdx}
                          className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2.5 py-1 text-[12px] font-medium text-gray-750"
                        >
                          <span className="truncate max-w-[150px]">{res.name}</span>
                          <span className="text-gray-400 text-[11px]">({res.size})</span>
                          <button
                            type="button"
                            onClick={() => setSelectedResources(prev => prev.filter((_, idx) => idx !== rIdx))}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-0.5"
                          >
                            <X size={11} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-4 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAttachFileOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-[13px] font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-brand text-white text-[13px] font-semibold
                      hover:bg-brand-dark transition-colors duration-200"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
