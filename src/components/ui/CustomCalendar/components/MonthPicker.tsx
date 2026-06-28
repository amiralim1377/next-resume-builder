import { useMemo } from "react";
import { getLocalTimeZone } from "@internationalized/date";
import { useCalendarContext } from "../context/CalendarContext";
import { cn } from "@/utils/cn";

export function MonthPicker() {
  const { currentMonth, setCurrentMonth, setView, locale, selectedDate } =
    useCalendarContext();

  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = currentMonth.set({ month: i + 1 });
      const formatter = new Intl.DateTimeFormat(locale, { month: "long" });
      return {
        index: i + 1,
        name: formatter.format(date.toDate(getLocalTimeZone())),
        date,
      };
    });
  }, [currentMonth, locale]);

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(currentMonth.set({ month: monthIndex }));
    setView("day");
  };

  const currentMonthIndex = currentMonth.month;
  const selectedMonthIndex = selectedDate?.month;
  const selectedYear = selectedDate?.year;

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {months.map((month) => {
        const isSelected =
          month.index === selectedMonthIndex &&
          currentMonth.year === selectedYear;
        const isCurrent = month.index === currentMonthIndex;

        return (
          <button
            key={month.index}
            type="button"
            onClick={() => handleMonthSelect(month.index)}
            className={cn(
              "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
              "hover:bg-brandHover focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
              isSelected && "bg-brand text-white hover:bg-brand/90",
              !isSelected && isCurrent && "bg-brandHover text-text-primary",
              !isSelected && !isCurrent && "text-text-secondary",
            )}
          >
            {month.name}
          </button>
        );
      })}
    </div>
  );
}
