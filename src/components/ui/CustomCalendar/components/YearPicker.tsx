import { useMemo } from "react";
import { useCalendarContext } from "../context/CalendarContext";
import { cn } from "@/utils/cn";

export function YearPicker() {
  const { currentMonth, setCurrentMonth, setView, selectedDate } =
    useCalendarContext();

  const years = useMemo(() => {
    const startYear = Math.floor(currentMonth.year / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  }, [currentMonth.year]);

  const handleYearSelect = (year: number) => {
    setCurrentMonth(currentMonth.set({ year }));
    setView("month");
  };

  const currentYear = currentMonth.year;
  const selectedYear = selectedDate?.year;

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {years.map((year) => {
        const isSelected = year === selectedYear;
        const isCurrent = year === currentYear;

        return (
          <button
            key={year}
            type="button"
            onClick={() => handleYearSelect(year)}
            className={cn(
              "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
              "hover:bg-brandHover focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
              isSelected && "bg-brand text-white hover:bg-brand/90",
              !isSelected && isCurrent && "bg-brandHover text-text-primary",
              !isSelected && !isCurrent && "text-text-secondary",
            )}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}
