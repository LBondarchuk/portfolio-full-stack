import { motion } from "framer-motion";
import DayEventsHeader from "./DayEventsHeader/DayEventsHeader";
import EventItem from "./EventItem/EventItem";
import EmptyState from "./EmptyState/EmptyState";
import EventDetails from "./EventDetails/EventDetails";
import { formatTime } from "../../../utils/timeline";
import { ROW_HEIGHT } from "../../../constants/dayEvents";
import { useDayEvents } from "./hooks/useDayEvents";
import DayEventsSkeleton from "./DayEventsSkeleton/DayEventsSkeleton";

interface DayEventsProps {
  date: Date;
  onCreateEvent?: () => void;
}

const DayEvents = ({ date }: DayEventsProps) => {
  const {
    events,
    loading,
    id,
    isFullView,
    sortedEvents,
    positionedEvents,
    times,
    maxColumn,
    getGridLine,
    handleClose,
  } = useDayEvents({ date });

  if (id && !isFullView) {
    return <EventDetails id={id} onClose={handleClose} />;
  }

  if (loading) {
    return <DayEventsSkeleton />;
  }

  return (
    <div className="flex min-h-0  flex-1">
      <aside className="flex h-125 md:h-auto  md:min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface">
        <DayEventsHeader date={date} eventsLength={events.length} />

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 pl-0">
          {sortedEvents.length === 0 && !loading ? (
            <div className="min-h-0 flex-1  px-4 py-4">
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
                    text-center
                    text-[10px]
                    font-semibold
                    tabular-nums
                    text-text-muted
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
