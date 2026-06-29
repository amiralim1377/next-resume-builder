import { useState, useMemo, useCallback } from "react";
import {
  CalendarDate,
  today,
  getLocalTimeZone,
  createCalendar,
  toCalendar,
  CalendarIdentifier,
} from "@internationalized/date";
import type { CalendarState, CalendarActions, CalendarView } from "../types";
import { CALENDAR_LOCALES } from "../constants";
import { CalendarType } from "@/types";
import { useLang } from "@/provider/lngProvider";

export function useCalendarState(
  value?: CalendarDate | null,
  onChange?: (date: CalendarDate) => void,
  system: CalendarType = "persian",
): CalendarState & CalendarActions {
  const { lng } = useLang();
  
  // Use locale based on calendar system, not language
  const locale =
    system === "persian" ? CALENDAR_LOCALES.PERSIAN : CALENDAR_LOCALES.GREGORIAN;
  
  // RTL should still be based on language for UI direction
  const isRtl = lng === "fa";

  const activeCalendar = createCalendar(system as CalendarIdentifier);

  const initialMonth = useMemo(() => {
    const baseDate = value || today(getLocalTimeZone());
    return toCalendar(baseDate, activeCalendar);
  }, [value, activeCalendar]);

  const [currentMonth, setCurrentMonth] = useState<CalendarDate>(initialMonth);
  const [view, setView] = useState<CalendarView>("day");

  const handleSetSelectedDate = useCallback(
    (date: CalendarDate) => {
      if (onChange) onChange(date);
    },
    [onChange],
  );

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.add({ months: 1 }));
  }, []);

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.subtract({ months: 1 }));
  }, []);

  const goToNextYear = useCallback(() => {
    setCurrentMonth((prev) => prev.add({ years: 1 }));
  }, []);

  const goToPrevYear = useCallback(() => {
    setCurrentMonth((prev) => prev.subtract({ years: 1 }));
  }, []);

  const goToNextYearRange = useCallback(() => {
    setCurrentMonth((prev) => prev.add({ years: 12 }));
  }, []);

  const goToPrevYearRange = useCallback(() => {
    setCurrentMonth((prev) => prev.subtract({ years: 12 }));
  }, []);

  return {
    currentMonth,
    setCurrentMonth,
    selectedDate: value ? toCalendar(value, activeCalendar) : null,
    setSelectedDate: handleSetSelectedDate,
    goToNextMonth,
    goToPrevMonth,
    goToNextYear,
    goToPrevYear,
    goToNextYearRange,
    goToPrevYearRange,
    calendarSystem: system,
    locale,
    isRtl,
    view,
    setView,
  };
}
