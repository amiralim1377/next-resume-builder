import { memo } from "react";
import {
  CalendarDate,
  isSameDay,
  today,
  getLocalTimeZone,
} from "@internationalized/date";
import { cn } from "@/utils/cn";

interface CalendarCellProps {
  date: CalendarDate;
  isSelected: boolean;
  isOutsideMonth: boolean;
  locale: string;
  onSelect: (date: CalendarDate) => void;
}

export const CalendarCell = memo(function CalendarCell({
  date,
  isSelected,
  isOutsideMonth,
  locale,
  onSelect,
}: CalendarCellProps) {
  const isToday = isSameDay(date, today(getLocalTimeZone()));
  const dayNumber = new Intl.DateTimeFormat(locale, { day: "numeric" }).format(
    date.toDate(getLocalTimeZone()),
  );

  return (
    <button
      type="button"
      onClick={() => onSelect(date)}
      disabled={isOutsideMonth}
      aria-selected={isSelected}
      role="gridcell"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        isSelected
          ? "bg-blue-600 font-semibold text-white shadow-md"
          : "text-text-primary hover:bg-accentLight",
        isOutsideMonth && "cursor-not-allowed opacity-30",
        isToday && !isSelected && "border border-blue-500 text-blue-600",
      )}
    >
      {dayNumber}
    </button>
  );
});
