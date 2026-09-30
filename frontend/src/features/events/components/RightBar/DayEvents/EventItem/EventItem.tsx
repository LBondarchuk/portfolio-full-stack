import { motion } from "motion/react";

import { useSearchParams } from "react-router";
import type { EventListItem } from "../../../../types/events.types";
import EventItemCard from "./EventItemCard/EventItemCard";
type EventItemProps = {
  event: EventListItem;
};

const EventItem = ({ event }: EventItemProps) => {
  const [, setParamsId] = useSearchParams();
  const handleClickEvent = (id: string) => {
    setParamsId((prev) => {
      prev.set("id", id);

      return prev;
    });
  };
  const accentClasses = {
    low: {
      dot: "bg-success",
      border: "border-l-success",
      background: "bg-green-50",
      text: "text-success",
    },
    medium: {
      dot: "bg-primary",
      border: "border-l-primary",
      background: "bg-primary-light",
      text: "text-primary",
    },
    high: {
      dot: "bg-danger",
      border: "border-l-danger",
      background: "bg-red-50",
      text: "text-danger",
    },
  };

  const accent = accentClasses[event.priority ?? "medium"];

  return (
    <motion.button
      type="button"
      onClick={() => handleClickEvent(event.id)}
      variants={{
        hidden: {
          opacity: 0,
          y: 8,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      whileTap={{ scale: 0.985 }}
      className="group relative flex w-full items-start text-left"
    >
      <div className="w-10.5 shrink-0 pt-3">
        <span className="text-[10px] font-semibold tabular-nums text-text-muted">
          {event.startTime}
        </span>
      </div>
      <div className="relative flex w-6 shrink-0 justify-center">
        <span
          className={`relative z-10 mt-3.5 size-2 rounded-full ring-4 ring-surface ${accent.dot}`}
        />
      </div>

      <EventItemCard event={event} accent={accent} />
    </motion.button>
  );
};

export default EventItem;
