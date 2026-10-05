import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import DayEventsHeader from "./DayEventsHeader/DayEventsHeader";
import EventItem from "./EventItem/EventItem";
import EmptyState from "./EmptyState/EmptyState";
import EventDetails from "./EventDetails/EventDetails";
import { useEvents } from "../../../store/events.store";
import { formatDateParam } from "../../../utils/date";
import {
  assignColumns,
  formatTime,
  timeToMinutes,
} from "../../../utils/timeline";
import {
  PADDING_MINUTES,
  ROW_HEIGHT,
  TIME_STEP,
} from "../../../constants/dayEvents";
import Loader from "../../../../../components/Loader/Loader";
import { toast } from "react-toastify";

interface DayEventsProps {
  date: Date;
  onCreateEvent?: () => void;
}

const DayEvents = ({ date }: DayEventsProps) => {
  const { events, getEvents, loading } = useEvents();
  const [params, setParams] = useSearchParams();

  const id = params.get("id");
  const isFullView = params.get("fullView") === "true";

  useEffect(() => {
    const loadEvents = async () => {
      const formattedDate = formatDateParam(date);
      try {
        await getEvents(formattedDate);
      } catch {
        toast.error("Failed to load events");
      }
    };

    loadEvents();
  }, [date, getEvents]);

  const handleClose = () => {
    setParams((prev) => {
      prev.delete("id");

      return prev;
    });
  };

  if (id && !isFullView) {
    return <EventDetails id={id} onClose={handleClose} />;
  }

  const sortedEvents = [...events].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
  );
  const positionedEvents = assignColumns(sortedEvents);

  const startTime =
    Math.min(
      ...positionedEvents.map((event) => timeToMinutes(event.startTime)),
    ) - PADDING_MINUTES;

  const endTime =
    Math.max(...positionedEvents.map((event) => timeToMinutes(event.endTime))) +
    PADDING_MINUTES;

  const timelineStart = Math.floor(startTime / TIME_STEP) * TIME_STEP;

  const timelineEnd = Math.ceil(endTime / TIME_STEP) * TIME_STEP;

  const times = Array.from(
    {
      length: (timelineEnd - timelineStart) / TIME_STEP + 1,
    },
    (_, index) => timelineStart + index * TIME_STEP,
  );

  const getGridLine = (time: string) => {
    const minutes = timeToMinutes(time);

    return Math.floor((minutes - timelineStart) / TIME_STEP) + 1;
  };

  const maxColumn = Math.max(...positionedEvents.map((event) => event.column));
  if (loading && !isFullView) return <Loader />;
  return (
    <div className="flex min-h-0 flex-1">
      <aside className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface">
        <DayEventsHeader date={date} eventsLength={events.length} />

        <div className="min-h-0 flex-1 overflow-auto px-4 py-4 pl-0 ">
          {sortedEvents.length === 0 && !loading ? (
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <EmptyState />
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.06,
                  },
                },
              }}
              className="grid min-w-max"
              style={{
                gridTemplateColumns: `52px repeat(${maxColumn}, minmax(150px, 1fr))`,
                gridTemplateRows: `repeat(${times.length}, ${ROW_HEIGHT}px)`,
              }}
            >
              {times.map((time, index) => (
                <div
                  key={`time-${time}`}
                  style={{
                    gridColumn: 1,
                    gridRow: index + 1,
                  }}
                  data-time={time}
                  className="
          sticky left-0 z-15
          w-13
          border-b border-r border-border
          bg-surface
          pt-1
          text-[10px]
          font-semibold
          tabular-nums
          text-text-muted
          text-center
        
        "
                >
                  {formatTime(time)}
                </div>
              ))}

              {times.map((time, index) => (
                <div
                  key={`grid-${time}`}
                  style={{
                    gridColumn: `2 / ${maxColumn + 2}`,
                    gridRow: index + 1,
                  }}
                  data-time={time}
                  className="border-b border-border"
                />
              ))}

              {positionedEvents.map((event) => (
                <EventItem
                  key={event.id}
                  event={event}
                  gridColumn={event.column + 1}
                  gridRow={`${getGridLine(event.startTime)} / ${getGridLine(
                    event.endTime,
                  )}`}
                />
              ))}
            </motion.div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default DayEvents;
