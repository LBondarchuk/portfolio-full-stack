import { motion } from "framer-motion";
import type { Event } from "../../../../types/events.types";
import EventDetailsHeader from "./EventDetailsHeader/EventDetailsHeader";
import EventTitle from "./EventTitle/EventTitle";
import EventInfo from "./EventInfo/EventInfo";
import Actions from "./Actions/Actions";

type Props = {
  id: string;
  onClose: () => void;
};

const EventDetails = ({ id, onClose }: Props) => {
  const event: Event = {
    id: "1",
    title: "Workout",
    date: "2026-09-29",
    startTime: "09:00",
    endTime: "10:00",
    location: "Gym",
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="flex h-full min-h-0 flex-col border-l border-border bg-surface"
    >
      <EventDetailsHeader title={event.title} onClose={onClose} />
      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          className="space-y-5"
        >
          <EventTitle title={event.title} />
          <EventInfo event={event} />
          {event.description && (
            <div>
              <h4 className="mb-2 text-xs font-semibold text-text">
                Description
              </h4>

              <p className="text-xs leading-5 text-text-secondary">
                {event.description}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <Actions />
    </motion.aside>
  );
};

export default EventDetails;
