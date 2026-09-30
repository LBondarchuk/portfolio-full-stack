import { motion } from "framer-motion";
import DayEventsHeader from "./DayEventsHeader/DayEventsHeader";
import EventItem from "./EventItem/EventItem";
import EmptyState from "./EmptyState/EmptyState";
import { useSearchParams } from "react-router";
import EventDetails from "./EventDetails/EventDetails";
import { useEvents } from "../../../store/events.store";

interface DayEventsProps {
  date: Date;
  onCreateEvent?: () => void;
}

const DayEvents = ({ date, onCreateEvent }: DayEventsProps) => {
  const{events}= useEvents()
  const [params, setParams] = useSearchParams();
  const id = params.get("id");
  const handleClose = () => {
    setParams((params) => {
      params.delete("id");
      return params;
    });
  };

  if (id) return <EventDetails id={id} onClose={handleClose} />;

  const sortedEvents = [...events].sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );

  return (
    <aside className="flex  overflow-scroll min-h-0 flex-col border-l border-border bg-surface">
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
