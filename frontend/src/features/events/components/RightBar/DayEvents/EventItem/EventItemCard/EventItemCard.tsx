import { FiClock, FiMapPin } from "react-icons/fi";
import type { EventListItem } from "../../../../../types/events.types";

type Props = {
  event: EventListItem;
  accent: {
    border: string;
    background: string;
    text: string;
  };
};

const EventItemCard = ({ event, accent }: Props) => {
  const getDuration = (start: string, end: string) => {
    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);

    const startTotal = startHours * 60 + startMinutes;
    const endTotal = endHours * 60 + endMinutes;

    const duration = endTotal - startTotal;

    if (duration < 60) {
      return `${duration}m`;
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
  };
  return (
    <div
      className={`
          min-w-0 flex-1 rounded-xl border border-border
          border-l-2 ${accent.border}
          bg-surface px-3.5 py-3
          shadow-sm
          transition-all duration-200
          group-hover:-translate-y-px
          group-hover:border-border
          group-hover:shadow-md
          cursor-pointer
        `}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="truncate text-xs font-semibold text-text">
          {event.title}
        </h3>

        <span
          className={`
              shrink-0 rounded-md px-1.5 py-0.5
              text-[9px] font-semibold
              ${accent.background} ${accent.text}
            `}
        >
          {getDuration(event.startTime, event.endTime)}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-3 text-[10px] text-text-secondary">
        <span className="flex items-center gap-1">
          <FiClock className="size-3" />
          {event.startTime} – {event.endTime}
        </span>
      </div>

      {event.location && (
        <div className="mt-1.5 flex min-w-0 items-center gap-1 text-[10px] text-text-muted">
          <FiMapPin className="size-3 shrink-0" />

          <span className="truncate">{event.location}</span>
        </div>
      )}
    </div>
  );
};

export default EventItemCard;
