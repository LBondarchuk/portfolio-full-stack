import { motion } from "motion/react";
import { useSearchParams } from "react-router";
import type { EventListItem } from "../../../../types/events.types";
import EventItemCard from "./EventItemCard/EventItemCard";
import { accentClasses } from "./eventItem.constants";
type EventItemProps = {
  event: EventListItem;
  gridColumn: number;
  gridRow: string;
};
const EventItem = ({ event, gridColumn, gridRow }: EventItemProps) => {
  const [, setParamsId] = useSearchParams();
  const handleClickEvent = (id: string) => {
    setParamsId((prev) => {
      prev.set("id", id);
      return prev;
    });
  };


  const accent = accentClasses[event.priority ?? "medium"];
  return (
    <motion.button
      type="button"
      onClick={() => handleClickEvent(event.id)}
      variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileTap={{ scale: 0.985 }}
      style={{ gridColumn, gridRow }}
      className="group relative z-10  text-left min-w-37.5"
    >
      {" "}
      <EventItemCard event={event} accent={accent} />{" "}
    </motion.button>
  );
};
export default EventItem;
