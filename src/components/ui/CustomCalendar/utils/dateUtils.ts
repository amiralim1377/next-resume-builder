import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  CalendarDate,
} from "@internationalized/date";

export function getDaysInMonthGrid(
  currentMonth: CalendarDate,
  locale: string,
): CalendarDate[] {
  const start = startOfWeek(startOfMonth(currentMonth), locale);
  const end = endOfWeek(endOfMonth(currentMonth), locale);

  const dates: CalendarDate[] = [];
  let curr = start;

  while (curr.compare(end) <= 0) {
    dates.push(curr);
    curr = curr.add({ days: 1 });
  }

  return dates;
}
