import { CalendarContext } from "./context/CalendarContext";
import { useCalendarState } from "./hooks/useCalendarState";
import { CalendarHeader } from "./components/CalendarHeader";
import { CalendarGrid } from "./components/CalendarGrid";
import { MonthPicker } from "./components/MonthPicker";
import { YearPicker } from "./components/YearPicker";
import type { CalendarProps } from "./types";
import { cn } from "@/utils/cn";
import { useCalendarContext } from "./context/CalendarContext";

function CalendarContent() {
  const { view } = useCalendarContext();

  if (view === "month") {
    return <MonthPicker />;
  }

  if (view === "year") {
    return <YearPicker />;
  }

  return <CalendarGrid />;
}

export function Calendar({
  ref,
  value,
  onChange,
  calendarSystem = "persian",
  className,
  children,
  ...props
}: CalendarProps) {
  const state = useCalendarState(value, onChange, calendarSystem);

  return (
    <CalendarContext value={state}>
      <div
        ref={ref}
        dir={state.isRtl ? "rtl" : "ltr"}
        className={cn(
          "bg-card w-full max-w-sm rounded-xl p-4 select-none",
          "border-ui-border border shadow-sm",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CalendarContext>
  );
}

Calendar.Header = CalendarHeader;
Calendar.Grid = CalendarGrid;
Calendar.Content = CalendarContent;
