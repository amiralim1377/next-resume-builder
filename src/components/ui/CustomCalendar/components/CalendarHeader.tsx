import { useMemo } from "react";
import { getLocalTimeZone } from "@internationalized/date";
import { useCalendarContext } from "../context/CalendarContext";
import { cn } from "@/utils/cn";
import { ArrowLeft, ArrowRight } from "lucide-react";

function CalendarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const {
    currentMonth,
    goToNextMonth,
    goToPrevMonth,
    goToNextYear,
    goToPrevYear,
    goToNextYearRange,
    goToPrevYearRange,
    isRtl,
    locale,
    view,
    setView,
  } = useCalendarContext();

  const title = useMemo(() => {
    if (view === "year") {
      const startYear = Math.floor(currentMonth.year / 12) * 12;
      const endYear = startYear + 11;
      return `${startYear} - ${endYear}`;
    }

    const formatter = new Intl.DateTimeFormat(locale, {
      month: view === "day" ? "long" : undefined,
      year: "numeric",
    });
    return formatter.format(currentMonth.toDate(getLocalTimeZone()));
  }, [currentMonth, locale, view]);

  const handleTitleClick = () => {
    if (view === "day") {
      setView("month");
    } else if (view === "month") {
      setView("year");
    }
  };

  const handleNext = () => {
    if (view === "year") {
      isRtl ? goToPrevYearRange() : goToNextYearRange();
    } else if (view === "month") {
      isRtl ? goToPrevYear() : goToNextYear();
    } else {
      isRtl ? goToPrevMonth() : goToNextMonth();
    }
  };

  const handlePrev = () => {
    if (view === "year") {
      isRtl ? goToNextYearRange() : goToPrevYearRange();
    } else if (view === "month") {
      isRtl ? goToNextYear() : goToPrevYear();
    } else {
      isRtl ? goToNextMonth() : goToPrevMonth();
    }
  };

  return (
    <div
      className={cn("mb-4 flex items-center justify-between", className)}
      {...props}
    >
      {!isRtl ? (
        <button
          type="button"
          onClick={handlePrev}
          className="hover:bg-brandHover rounded-full p-2 transition-colors focus:outline-none"
          aria-label="Next"
        >
          <span className="text-text-secondary">
            <ArrowLeft size={16} />
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          className="hover:bg-brandHover rounded-full p-2 transition-colors focus:outline-none"
          aria-label="Previous"
        >
          <span className="text-text-secondary">
            <ArrowRight size={16} />
          </span>
        </button>
      )}

      <button
        type="button"
        onClick={handleTitleClick}
        className="text-text-primary hover:bg-brandHover rounded px-3 py-1 text-sm font-semibold transition-colors focus:outline-none"
        aria-live="polite"
      >
        {title}
      </button>

      {!isRtl ? (
        <button
          type="button"
          onClick={handleNext}
          className="hover:bg-brandHover rounded-full p-2 transition-colors focus:outline-none"
          aria-label="Previous"
        >
          <span className="text-text-secondary">
            <ArrowRight size={16} />
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={handlePrev}
          className="hover:bg-brandHover rounded-full p-2 transition-colors focus:outline-none"
          aria-label="Next"
        >
          <span className="text-text-secondary">
            <ArrowLeft size={16} />
          </span>
        </button>
      )}
    </div>
  );
}

export { CalendarHeader };
