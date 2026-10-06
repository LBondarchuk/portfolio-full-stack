import { Link } from "react-router";
import CalendarIcon from "../../Icons/Calendar";
import { useEvents } from "../../../features/events/store/events.store";
import { useEffect } from "react";

const CalendarCount = () => {
  const { getDayCount, dayCount } = useEvents();

  useEffect(() => {
    getDayCount();
  }, [getDayCount]);

  const meetingsToday = dayCount ?? 0;

  const meetingsText =
    meetingsToday === 0
      ? "Keine Termine heute"
      : meetingsToday === 1
        ? "Termin heute"
        : "Termine heute";

  return (
    <Link to="/dashboard/events">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary-light text-primary">
          <CalendarIcon className="size-4!" />
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-semibold tabular-nums text-text">
            {meetingsToday}
          </span>

          <span className="hidden text-xs text-text-muted sm:inline">
            {meetingsText}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CalendarCount;
