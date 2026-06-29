import { useMemo } from "react";
import {
  getLocalTimeZone,
  isSameDay,
  isSameMonth,
} from "@internationalized/date";
import { getDaysInMonthGrid } from "../utils/dateUtils";
import { useCalendarContext } from "../context/CalendarContext";
import { CalendarCell } from "./CalendarCell";

export function CalendarGrid({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { currentMonth, selectedDate, setSelectedDate, locale, calendarSystem } =
    useCalendarContext();

  const days = useMemo(
    () => getDaysInMonthGrid(currentMonth, locale),
    [currentMonth, locale],
  );

  const weekDays = useMemo(() => {
    return days
      .slice(0, 7)
      .map((date) =>
        new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
          date.toDate(getLocalTimeZone()),
        ),
      );
  }, [days, locale]);

  return (
    <div className={className} role="grid">
      <div className="mb-2 grid grid-cols-7 gap-1" role="row">
        {weekDays.map((day, i) => (
          <div
            key={i}
            className="text-text-primary text-center text-xs font-medium"
            role="columnheader"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1" role="row">
        {days.map((date) => (
          <CalendarCell
            key={date.toString()}
            date={date}
            isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
            isOutsideMonth={!isSameMonth(date, currentMonth)}
            locale={locale}
            calendarSystem={calendarSystem}
            onSelect={setSelectedDate}
          />
        ))}
      </div>
    </div>
  );
}
