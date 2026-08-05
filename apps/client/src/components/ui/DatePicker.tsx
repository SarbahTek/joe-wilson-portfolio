import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import type { FC, ChangeEvent, KeyboardEvent } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay,
  addMonths, subMonths, startOfWeek, endOfWeek, isToday,
} from "date-fns";

interface DatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  className?: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  placeholder?: string;
}

function parseDate(dateStr?: string): Date | null {
  if (!dateStr || dateStr.trim() === "") return null;
  const date = new Date(dateStr);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateForInput(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const ACCENT = "#2596BE";

/**
 * Underlined form-field date picker matching this form's `<select>` fields
 * (bottom border, no box). Replaces the native `<input type="date">`, which
 * renders inconsistently across browsers and lets users type out-of-range
 * years (e.g. "202053").
 */
const DatePicker: FC<DatePickerProps> = ({
  value = "",
  onChange = () => {},
  className = "",
  minDate,
  maxDate,
  disabled = false,
  placeholder = "DD/MM/YYYY",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(() => parseDate(value) ?? new Date());
  const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");
  const [dayInput, setDayInput] = useState(() => { const d = parseDate(value); return d ? format(d, "dd") : ""; });
  const [monthInput, setMonthInput] = useState(() => { const d = parseDate(value); return d ? format(d, "MM") : ""; });
  const [yearInput, setYearInput] = useState(() => { const d = parseDate(value); return d ? format(d, "yyyy") : ""; });
  const pickerRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  // Re-derive the typed fields whenever `value` changes from the outside.
  // Adjusting state during render avoids an extra commit+paint cycle.
  const [syncedValue, setSyncedValue] = useState(value);
  if (value !== syncedValue) {
    setSyncedValue(value);
    const dateObj = parseDate(value);
    if (dateObj) {
      setDayInput(format(dateObj, "dd"));
      setMonthInput(format(dateObj, "MM"));
      setYearInput(format(dateObj, "yyyy"));
      setMonth(dateObj);
    } else {
      setDayInput("");
      setMonthInput("");
      setYearInput("");
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setViewMode("days");
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    return eachDayOfInterval({ start: startOfWeek(monthStart), end: endOfWeek(monthEnd) });
  }, [month]);

  const dateObj = useMemo(() => parseDate(value), [value]);
  const minDateObj = useMemo(() => (minDate ? parseDate(minDate) : null), [minDate]);
  const maxDateObj = useMemo(() => (maxDate ? parseDate(maxDate) : null), [maxDate]);
  const hasValue = dayInput.length > 0 || monthInput.length > 0 || yearInput.length > 0;

  const openPicker = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    setViewMode("days");
    setMonth(dateObj ?? new Date());
  }, [dateObj, disabled]);

  const handleDateSelect = useCallback((date: Date) => {
    onChange(formatDateForInput(date));
    setDayInput(format(date, "dd"));
    setMonthInput(format(date, "MM"));
    setYearInput(format(date, "yyyy"));
    setIsOpen(false);
    setMonth(date);
    setViewMode("days");
  }, [onChange]);

  const handleMonthSelect = useCallback((monthIndex: number) => {
    setMonth((prev) => new Date(prev.getFullYear(), monthIndex, 1));
    setViewMode("days");
  }, []);

  const handleYearSelect = useCallback((year: number) => {
    setMonth((prev) => new Date(year, prev.getMonth(), 1));
    setViewMode("months");
  }, []);

  const navigateMonth = useCallback((direction: "prev" | "next") => {
    if (viewMode === "years") {
      setMonth((prev) => {
        const startYear = Math.floor(prev.getFullYear() / 12) * 12;
        return new Date(direction === "prev" ? startYear - 12 : startYear + 12, prev.getMonth(), 1);
      });
    } else if (viewMode === "months") {
      setMonth((prev) => new Date(prev.getFullYear() + (direction === "prev" ? -1 : 1), prev.getMonth(), 1));
    } else {
      setMonth((prev) => (direction === "prev" ? subMonths(prev, 1) : addMonths(prev, 1)));
    }
  }, [viewMode]);

  const getYearRange = (year: number) => {
    const startYear = Math.floor(year / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  };

  const validateAndUpdateDate = useCallback((d: string, m: string, y: string) => {
    if (d.length !== 2 || m.length !== 2 || y.length !== 4) return false;
    const dayNum = parseInt(d, 10);
    const monthNum = parseInt(m, 10);
    const yearNum = parseInt(y, 10);
    if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) return false;

    const date = new Date(yearNum, monthNum - 1, dayNum);
    if (Number.isNaN(date.getTime()) || date.getMonth() !== monthNum - 1) return false;

    onChange(formatDateForInput(date));
    setMonth(date);
    return true;
  }, [onChange]);

  const handleDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setDayInput(val);
    if (val.length === 2) {
      const dayNum = parseInt(val, 10);
      if (dayNum >= 1 && dayNum <= 31) {
        monthRef.current?.focus();
        if (monthInput.length === 2 && yearInput.length === 4) validateAndUpdateDate(val, monthInput, yearInput);
      }
    }
  };

  const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMonthInput(val);
    if (val.length === 2) {
      const monthNum = parseInt(val, 10);
      if (monthNum >= 1 && monthNum <= 12) {
        yearRef.current?.focus();
        if (dayInput.length === 2 && yearInput.length === 4) validateAndUpdateDate(dayInput, val, yearInput);
      }
    }
  };

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setYearInput(val);
    if (val.length === 4 && dayInput.length === 2 && monthInput.length === 2) {
      validateAndUpdateDate(dayInput, monthInput, val);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, field: "day" | "month" | "year") => {
    if (e.key === "Backspace") {
      if (field === "month" && monthInput === "") dayRef.current?.focus();
      else if (field === "year" && yearInput === "") monthRef.current?.focus();
    } else if (e.key === "ArrowLeft") {
      if (field === "month") dayRef.current?.focus();
      else if (field === "year") monthRef.current?.focus();
    } else if (e.key === "ArrowRight") {
      if (field === "day" && dayInput.length === 2) monthRef.current?.focus();
      else if (field === "month" && monthInput.length === 2) yearRef.current?.focus();
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      const hasFocus = [dayRef, monthRef, yearRef].some((r) => document.activeElement === r.current);
      if (hasFocus || (!dayInput && !monthInput && !yearInput)) return;

      if (!validateAndUpdateDate(dayInput, monthInput, yearInput) && value) {
        const dateObjForReset = parseDate(value);
        if (dateObjForReset) {
          setDayInput(format(dateObjForReset, "dd"));
          setMonthInput(format(dateObjForReset, "MM"));
          setYearInput(format(dateObjForReset, "yyyy"));
        }
      }
    }, 0);
  };

  return (
    <div ref={pickerRef} className={`relative ${className}`}>
      <div
        className={`flex items-center gap-1 w-full border-b border-gray-400 py-2.5 transition-colors ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
        style={{ borderColor: isOpen ? ACCENT : undefined }}
      >
        <input
          ref={dayRef}
          type="text"
          inputMode="numeric"
          value={dayInput}
          onChange={handleDayChange}
          onKeyDown={(e) => handleKeyDown(e, "day")}
          onFocus={(e) => e.target.select()}
          onBlur={handleBlur}
          onClick={openPicker}
          disabled={disabled}
          placeholder="DD"
          maxLength={2}
          className="w-5 text-sm text-gray-700 bg-transparent border-none outline-none placeholder:text-gray-400 text-center tabular-nums disabled:cursor-not-allowed"
        />
        <span className="text-gray-400 select-none">/</span>
        <input
          ref={monthRef}
          type="text"
          inputMode="numeric"
          value={monthInput}
          onChange={handleMonthChange}
          onKeyDown={(e) => handleKeyDown(e, "month")}
          onFocus={(e) => e.target.select()}
          onBlur={handleBlur}
          onClick={openPicker}
          disabled={disabled}
          placeholder="MM"
          maxLength={2}
          className="w-5 text-sm text-gray-700 bg-transparent border-none outline-none placeholder:text-gray-400 text-center tabular-nums disabled:cursor-not-allowed"
        />
        <span className="text-gray-400 select-none">/</span>
        <input
          ref={yearRef}
          type="text"
          inputMode="numeric"
          value={yearInput}
          onChange={handleYearChange}
          onKeyDown={(e) => handleKeyDown(e, "year")}
          onFocus={(e) => e.target.select()}
          onBlur={handleBlur}
          onClick={openPicker}
          disabled={disabled}
          placeholder="YYYY"
          maxLength={4}
          className="w-10 text-sm text-gray-700 bg-transparent border-none outline-none placeholder:text-gray-400 text-center tabular-nums disabled:cursor-not-allowed"
        />
        {!hasValue && (
          <span className="hidden text-[13px] text-gray-400 select-none sm:inline">{placeholder}</span>
        )}
        <Calendar
          className={`ml-auto w-4 h-4 text-gray-400 flex-shrink-0 ${disabled ? "" : "cursor-pointer"}`}
          onClick={openPicker}
        />
      </div>

      {isOpen && !disabled && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setIsOpen(false); setViewMode("days"); }} />
          <div className="absolute z-50 left-0 mt-2 bg-white border border-gray-200 shadow-lg p-2.5 w-64">
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); navigateMonth("prev"); }}
                className="p-1 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode((v) => (v === "days" ? "months" : v === "months" ? "years" : v));
                }}
                className="text-[13px] font-semibold text-gray-900 hover:bg-gray-50 px-2 py-1 transition-colors"
              >
                {viewMode === "days" && format(month, "MMM yyyy")}
                {viewMode === "months" && format(month, "yyyy")}
                {viewMode === "years" && `${Math.floor(month.getFullYear() / 12) * 12}–${Math.floor(month.getFullYear() / 12) * 12 + 11}`}
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); navigateMonth("next"); }}
                className="p-1 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {viewMode === "days" && (
              <div className="w-full">
                <div className="grid grid-cols-7 gap-0.5 mb-1">
                  {WEEKDAY_LABELS.map((day) => (
                    <div key={day} className="text-[10px] font-semibold text-gray-500 text-center py-1">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-0.5">
                  {calendarDays.map((day) => {
                    const isCurrentMonth = isSameMonth(day, month);
                    const isSelected = dateObj !== null && isSameDay(day, dateObj);
                    const isTodayDate = isToday(day);
                    const isOutOfRange = (minDateObj !== null && day < minDateObj) || (maxDateObj !== null && day > maxDateObj);
                    const isDisabled = !isCurrentMonth || isOutOfRange;

                    return (
                      <button
                        key={day.toISOString()}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); if (!isDisabled) handleDateSelect(day); }}
                        disabled={isDisabled}
                        style={{
                          backgroundColor: isSelected ? ACCENT : undefined,
                          boxShadow: isTodayDate && !isSelected ? `inset 0 0 0 1px ${ACCENT}` : undefined,
                        }}
                        className={`w-7 h-7 text-[12px] transition-colors font-medium ${
                          isDisabled ? "text-gray-300 cursor-not-allowed" : "text-gray-800 hover:bg-gray-100"
                        } ${isSelected ? "text-white hover:opacity-90" : ""}`}
                      >
                        {format(day, "d")}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {viewMode === "months" && (
              <div className="grid grid-cols-3 gap-1 mb-1">
                {MONTH_NAMES.map((monthName, idx) => (
                  <button
                    key={monthName}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleMonthSelect(idx); }}
                    style={month.getMonth() === idx ? { backgroundColor: ACCENT } : undefined}
                    className={`py-1.5 text-[12px] transition-colors font-medium ${
                      month.getMonth() === idx ? "text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {monthName}
                  </button>
                ))}
              </div>
            )}

            {viewMode === "years" && (
              <div className="grid grid-cols-3 gap-1 mb-1">
                {getYearRange(month.getFullYear()).map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleYearSelect(year); }}
                    style={month.getFullYear() === year ? { backgroundColor: ACCENT } : undefined}
                    className={`py-1.5 text-[12px] transition-colors font-medium ${
                      month.getFullYear() === year ? "text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-1.5 pt-2 mt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleDateSelect(new Date()); }}
                style={{ color: ACCENT }}
                className="flex-1 px-2 py-1.5 text-[12px] font-semibold hover:bg-gray-50 transition-colors"
              >
                Today
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DatePicker;
