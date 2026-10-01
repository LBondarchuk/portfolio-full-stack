import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

import DayEventsHeader from "./DayEventsHeader/DayEventsHeader";
import EventItem from "./EventItem/EventItem";
import EmptyState from "./EmptyState/EmptyState";
import EventDetails from "./EventDetails/EventDetails";
import { useEvents } from "../../../store/events.store";
import { formatDateParam } from "../../../utils/date";

interface DayEventsProps {
  date: Date;
  onCreateEvent?: () => void;
}

const DayEvents = ({ date, onCreateEvent }: DayEventsProps) => {
  const { events, getEvents } = useEvents();
  const [params, setParams] = useSearchParams();
  const id = params.get("id");

 useEffect(() => {
  const formattedDate = formatDateParam(date);

  getEvents(formattedDate);
}, [date, getEvents]);

  const handleClose = () => {
    setParams((params) => {
      params.delete("id");
      return params;
    });
  };

  if (id) {
    return <EventDetails id={id} onClose={handleClose} />;
  }

  const sortedEvents = [...events].sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );

  return (
    <aside className="flex min-h-0 flex-col overflow-hidden border-l border-border bg-surface">
      <DayEventsHeader date={date} eventsLength={events.length} />

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {sortedEvents.length === 0 ? (
          <EmptyState onCreateEvent={onCreateEvent} />
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
            className="relative"
          >
            <div className="absolute bottom-0 left-13.5 top-0 w-px bg-border" />

            <div className="space-y-3">
              {sortedEvents.map((event) => (
                <EventItem key={event.id} event={event} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </aside>
  );
};

export default DayEvents;