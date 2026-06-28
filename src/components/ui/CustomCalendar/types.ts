import type { CalendarDate } from "@internationalized/date";
import type { ReactNode } from "react";

export type CalendarSystem = "persian" | "gregorian";

export type CalendarView = "day" | "month" | "year";

export interface CalendarState {
  currentMonth: CalendarDate;
  selectedDate: CalendarDate | null;
  calendarSystem: CalendarSystem;
  locale: string;
  isRtl: boolean;
  view: CalendarView;
}

export interface CalendarActions {
  setCurrentMonth: (date: CalendarDate) => void;
  setSelectedDate: (date: CalendarDate) => void;
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
  goToNextYear: () => void;
  goToPrevYear: () => void;
  goToNextYearRange: () => void;
  goToPrevYearRange: () => void;
  setView: (view: CalendarView) => void;
}

export type CalendarContextType = CalendarState & CalendarActions;

export interface CalendarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  ref?: React.Ref<HTMLDivElement>;
  value?: CalendarDate | null;
  onChange?: (date: CalendarDate) => void;
  calendarSystem?: CalendarSystem;
  children: ReactNode;
}
