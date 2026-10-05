
import { motion } from "motion/react";
import { useSearchParams } from "react-router";

import type { EventListItem } from "../../../../types/events.types";
import EventItemCard from "./EventItemCard/EventItemCard";
import { accentClasses } from "./eventItem.constants";
import { useEventItemInteractions } from "./useEventItemInteractions";

type EventItemProps = {
  event: EventListItem;
  gridColumn: number;
  gridRow: string;
};

const EventItem = ({
  event,
  gridColumn,
  gridRow,
}: EventItemProps) => {
  const [, setParamsId] = useSearchParams();

  const {
    isDragging,
    dragY,
    resizeHeight,
    handleDragStart,
    handleResizeStart,
  } = useEventItemInteractions(event);

  const accent = accentClasses[
    event.priority ?? "medium"
  ];

  const handleClickEvent = (id: string) => {
    if (isDragging) return;

    setParamsId((prev) => {
      prev.set("id", id);

      return prev;
    });
  };

  return (
    <motion.button
      type="button"
      onClick={() =>
        handleClickEvent(event.id)
      }
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
      animate={{
        y: dragY,
        scale: isDragging ? 1.03 : 1,
      }}
      style={{
        gridColumn,
        gridRow,
        height:
          resizeHeight ?? undefined,
      }}
      className={`
        group
        relative
        z-10
        min-w-37.5
        text-left
        ${
          isDragging
            ? "z-50 cursor-grabbing"
            : "cursor-grab"
        }
      `}
    >
      <EventItemCard
        event={event}
        accent={accent}
      />

      <div
        onPointerDown={handleDragStart}
        className="
          absolute
          inset-0
          z-30
          cursor-grab
        "
      />

      <div
        onPointerDown={handleResizeStart}
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-40
          h-2
          cursor-ns-resize
        "
      />
    </motion.button>
  );
};

export default EventItem;

