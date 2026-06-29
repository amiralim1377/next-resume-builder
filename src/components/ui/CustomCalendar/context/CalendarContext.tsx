import { createContext, use } from "react";
import type { CalendarContextType } from "../types";

export const CalendarContext = createContext<CalendarContextType | null>(null);

export function useCalendarContext() {
  const context = use(CalendarContext);
  if (!context) {
    throw new Error(
      "Calendar components must be rendered within a <Calendar> provider.",
    );
  }
  return context;
}
