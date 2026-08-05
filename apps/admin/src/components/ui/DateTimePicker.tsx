import type { FC } from "react";
import DatePicker from "./DatePicker";

interface DateTimePickerProps {
  /** Combined "yyyy-MM-ddTHH:mm" value, same shape `<input type="datetime-local">` used. */
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

function splitDatetime(value?: string): { date: string; time: string } {
  if (!value) return { date: "", time: "" };
  const [date = "", time = ""] = value.split("T");
  return { date, time };
}

/**
 * Pairs the custom `DatePicker` with a native `<input type="time">` — time
 * inputs don't suffer the cross-browser/free-typing corruption that date
 * inputs do, so only the date half needed replacing.
 */
const DateTimePicker: FC<DateTimePickerProps> = ({ value = "", onChange = () => {}, className = "", disabled = false }) => {
  const { date, time } = splitDatetime(value);

  const emit = (nextDate: string, nextTime: string) => {
    if (!nextDate) {
      onChange("");
      return;
    }
    onChange(`${nextDate}T${nextTime || "00:00"}`);
  };

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <DatePicker
        variant="form"
        value={date}
        onChange={(d) => emit(d, time)}
        disabled={disabled}
        className="flex-1 min-w-[150px]"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => emit(date, e.target.value)}
        disabled={disabled || !date}
        className="w-[104px] bg-white border border-gray-200 px-2.5 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default DateTimePicker;
