import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  ChevronDown,
  Upload,
  FileText,
  Music,
  Image as ImageIcon,
  Trash2,
  CheckCircle,
  Inbox,
  AlertCircle,
  X,
  FileUp
} from 'lucide-react';
import { INITIAL_MEDIA, type MediaItem } from '@/data/media';
import DatePicker from '@/components/ui/DatePicker';

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>(() => INITIAL_MEDIA);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'document' | 'audio' | 'image'>('all');
  const [startDate, setStartDate] = useState('2025-05-15');
  const [endDate, setEndDate] = useState('2026-05-12');
  
  // Pagination / Load more
  const [visibleCount, setVisibleCount] = useState(8);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated Toast notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Filter logic
  const filteredMedia = useMemo(() => {
    return mediaList.filter(item => {
      // Type Filter
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;

      // Search Filter
      const q = search.toLowerCase().trim();
      if (q && !item.name.toLowerCase().includes(q)) return false;

      // Date Range Filter
      const itemTime = new Date(item.timestamp).getTime();
      const startVal = startDate ? new Date(startDate).getTime() : 0;
      // Set end date to end of that day
      const endVal = endDate ? new Date(endDate).getTime() + 86400000 : Infinity;
      if (itemTime < startVal || itemTime > endVal) return false;

      return true;
    });
  }, [mediaList, typeFilter, search, startDate, endDate]);

  // Statistics calculation based on total list (or filtered, let's keep it based on total to match mockup counts)
  const stats = useMemo(() => {
    const docs = mediaList.filter(m => m.type === 'document').length;
    const audio = mediaList.filter(m => m.type === 'audio').length;
    const images = mediaList.filter(m => m.type === 'image').length;
    return { docs, audio, images };
  }, [mediaList]);

  // Handle load more
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
    showToast('Loaded more assets', 'info');
  };

  // Handle item deletion
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setMediaList(prev => prev.filter(m => m.id !== id));
      showToast('Asset deleted successfully', 'success');
    }
  };

  // Dropzone file handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStagedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setStagedFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const removeStagedFile = (idx: number) => {
    setStagedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSaveChanges = () => {
    if (stagedFiles.length === 0) {
      showToast('Please select or drop files to upload', 'error');
      return;
    }

    const now = new Date();
    const newItems: MediaItem[] = stagedFiles.map((file, index) => {
      // Map file extension to media type
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let type: 'document' | 'audio' | 'image' = 'document';
      if (['mp3', 'wav', 'aac', 'm4a', 'zip', 'rar'].includes(ext)) {
        type = 'audio';
      } else if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) {
        type = 'image';
      }

      // Format file size
      let sizeStr = '0 KB';
      if (file.size >= 1048576) {
        sizeStr = `${(file.size / 1048576).toFixed(1)} MB`;
      } else {
        sizeStr = `${Math.round(file.size / 1024)} KB`;
      }

      return {
        id: `m-${Date.now()}-${index}`,
        name: file.name,
        size: sizeStr,
        sizeBytes: file.size,
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        timestamp: now.toISOString(),
        type
      };
    });

    setMediaList(prev => [...newItems, ...prev]);
    setIsModalOpen(false);
    setStagedFiles([]);
    showToast(`${stagedFiles.length} file(s) uploaded successfully!`, 'success');
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setStagedFiles([]);
  };

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  const pagedMedia = filteredMedia.slice(0, visibleCount);

  return (
    <div className="p-5 lg:p-7 max-w-[1280px] mx-auto space-y-6 pb-16 relative">
      
      {/* Toast popup */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 border border-gray-200 bg-white shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          {toast.type === 'success' && <CheckCircle size={16} className="text-emerald-500" />}
          {toast.type === 'info' && <Inbox size={16} className="text-brand" />}
          {toast.type === 'error' && <AlertCircle size={16} className="text-red-500" />}
          <span className="text-[13px] font-semibold text-gray-700">{toast.message}</span>
        </div>
      )}

      {/* ── Title Header Block ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold text-brand uppercase tracking-widest mb-1">Library</p>
          <h1 className="text-[34px] font-bold text-gray-900 font-heading leading-tight">Media</h1>
          <p className="text-gray-400 text-sm mt-1">
            Files used across masterclasses, sessions, and site content.
          </p>
        </div>

        {/* Trigger Modal Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-center bg-[#077DA7] hover:bg-[#056d93] text-white px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Upload size={15} />
          <span>Upload files</span>
        </button>
      </div>

      <hr className="border-gray-200" />

      {/* ── Filters Row ────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Side: Filter inputs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          {/* Search bar */}
          <div className="relative w-full sm:w-64 flex-shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search files..."
              className="w-full bg-white border border-gray-250 pl-9 pr-4 py-2 text-[13px] text-gray-755 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
            />
          </div>

          {/* Date range pickers */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DatePicker value={startDate} onChange={setStartDate} className="w-full sm:w-auto" />

            <span className="text-gray-400 flex-shrink-0">—</span>

            <DatePicker value={endDate} onChange={setEndDate} className="w-full sm:w-auto" dropdownAlign="right" />
          </div>

          {/* Type Dropdown */}
          <div className="relative w-full sm:w-40">
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value as any)}
              className="w-full appearance-none bg-white border border-gray-250 pl-3 pr-8 py-2 text-[13px] text-gray-700 font-semibold focus:outline-none cursor-pointer hover:bg-gray-50"
            >
              <option value="all">All</option>
              <option value="document">Documents</option>
              <option value="audio">Audio</option>
              <option value="image">Images</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Right Side: Counts display */}
        <div className="text-[12.5px] text-gray-400 font-semibold self-start md:self-center">
          {stats.docs} documents &nbsp;·&nbsp; {stats.audio} audio &nbsp;·&nbsp; {stats.images} images
        </div>
      </div>

      {/* ── Assets Grid ────────────────────────────────────────────────── */}
      {filteredMedia.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-gray-200 bg-white text-center">
          <Inbox className="text-gray-300 mb-2" size={40} />
          <p className="text-[14px] font-bold text-gray-500">No assets found</p>
          <p className="text-[12px] text-gray-450 mt-1 max-w-[280px]">
            No files match your filter settings. Try uploading some files.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pagedMedia.map(item => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 flex flex-col group relative hover:shadow-md transition-shadow duration-200"
            >
              {/* Type colored header thumbnail */}
              <div
                className={`h-36 flex items-center justify-center border-b border-gray-100 transition-colors ${
                  item.type === 'document'
                    ? 'bg-[#FDEDEC]'
                    : item.type === 'audio'
                    ? 'bg-[#F5EEF8]'
                    : 'bg-[#EBF5FB]'
                }`}
              >
                {item.type === 'document' && <FileText size={34} className="text-[#C0392B]" />}
                {item.type === 'audio' && <Music size={34} className="text-[#8E44AD]" />}
                {item.type === 'image' && <ImageIcon size={34} className="text-[#2980B9]" />}
              </div>

              {/* Card info footer */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-[13.5px] font-bold text-gray-900 truncate" title={item.name}>
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold mt-2.5">
                    <span>{item.size}</span>
                    <span className="text-gray-400 font-medium">{item.date}</span>
                  </div>
                </div>
              </div>

              {/* Hover delete overlay action */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id, item.name);
                }}
                className="absolute top-2 right-2 p-1.5 bg-white/90 border border-gray-200 text-gray-400 hover:text-red-650 hover:bg-red-50 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-150"
                title="Delete Asset"
              >
                <Trash2 size={13.5} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Load More button ───────────────────────────────────────────── */}
      {filteredMedia.length > visibleCount && (
        <button
          onClick={handleLoadMore}
          className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-[11.5px] font-bold uppercase tracking-wider px-6 py-2.5 mx-auto block mt-8 transition-colors"
        >
          Load More
        </button>
      )}

      {/* ── Upload Modal Overlay ───────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity">
          {/* Modal Box */}
          <div className="bg-white border border-gray-250 shadow-2xl max-w-xl w-full p-6 flex flex-col gap-5 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Cross */}
            <button
              onClick={handleCancelModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              title="Close Dialog"
            >
              <X size={18} />
            </button>

            {/* Modal Title & Subtitle */}
            <div>
              <h2 className="text-[20px] font-bold text-gray-900 font-heading leading-tight">Upload files</h2>
              <p className="text-gray-400 text-[12px] mt-1 font-medium">
                Add documents, audio, or images to your library.
              </p>
            </div>

            {/* Interactive Dropzone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerBrowse}
              className={`border-2 border-dashed p-8 text-center flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-brand bg-[#F4F9FC]/60'
                  : 'border-brand/40 bg-[#F4F9FC] hover:border-brand/60 hover:bg-[#F4F9FC]/40'
              }`}
            >
              <input
                type="file"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <FileUp size={30} className="text-gray-650 mb-2" />
              <p className="text-[13px] font-bold text-gray-800">
                Drop files here or click to browse
              </p>
              <p className="text-[11px] text-gray-450 mt-1">
                PDF, audio, images — up to 50 MB each
              </p>
            </div>

            {/* Staged file list preview */}
            {stagedFiles.length > 0 && (
              <div className="border border-gray-200 max-h-40 overflow-y-auto divide-y divide-gray-100 bg-gray-50/50">
                {stagedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between px-3 py-2 text-[12.5px] text-gray-700">
                    <span className="truncate max-w-[340px] font-medium">{file.name}</span>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-[11px] text-gray-400">
                        {(file.size / 1024).toFixed(0)} KB
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeStagedFile(idx);
                        }}
                        className="text-gray-400 hover:text-red-650 transition-colors"
                        title="Remove File"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Actions Footer */}
            <div className="flex justify-end gap-3 mt-1.5">
              <button
                onClick={handleCancelModal}
                className="text-gray-500 hover:text-gray-800 text-[12.5px] font-bold uppercase tracking-wider px-3 py-2 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={stagedFiles.length === 0}
                className="bg-[#077DA7] hover:bg-[#056d93] text-white px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
