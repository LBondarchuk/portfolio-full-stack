import { useRef, useState } from "react";
import { toast } from "react-toastify";

import type { EventListItem } from "../../../../types/events.types";
import {
  ROW_HEIGHT,
  TIME_STEP,
} from "../../../../constants/dayEvents";
import { useEvents } from "../../../../store/events.store";
import {
  minutesToTime,
  timeToMinutes,
} from "../../../../utils/timeline";

export const useEventItemInteractions = (
  event: EventListItem,
) => {
  const { updateEvent } = useEvents();

  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [resizeHeight, setResizeHeight] = useState<
    number | null
  >(null);

  const didDragRef = useRef(false);

  const handleDragStart = (
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const startY = e.clientY;

    const startMinutes = timeToMinutes(
      event.startTime,
    );

    const endMinutes = timeToMinutes(
      event.endTime,
    );

    setIsDragging(true);
    didDragRef.current = false;

    const handleMove = (e: PointerEvent) => {
      const deltaY = e.clientY - startY;

      // Вважаємо це drag тільки після
      // реального переміщення миші.
      if (Math.abs(deltaY) > 5) {
        didDragRef.current = true;
      }

      setDragY(deltaY);
    };

    const handleUp = async (e: PointerEvent) => {
      window.removeEventListener(
        "pointermove",
        handleMove,
      );

      window.removeEventListener(
        "pointerup",
        handleUp,
      );

      const deltaY = e.clientY - startY;

      const deltaRows = Math.round(
        deltaY / ROW_HEIGHT,
      );

      const deltaMinutes =
        deltaRows * TIME_STEP;

      const newStartMinutes =
        startMinutes + deltaMinutes;

      const newEndMinutes =
        endMinutes + deltaMinutes;

      setDragY(0);
      setIsDragging(false);

      if (deltaMinutes === 0) {
        return;
      }

      try {
        await updateEvent(
          event.id,
          {
            startTime: minutesToTime(
              newStartMinutes,
            ),
            endTime: minutesToTime(
              newEndMinutes,
            ),
          },
          () => {},
        );
      } catch {
        toast.error(
          "Failed to move event",
        );
      }
    };

    window.addEventListener(
      "pointermove",
      handleMove,
    );

    window.addEventListener(
      "pointerup",
      handleUp,
    );
  };

  const handleResizeStart = (
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const startY = e.clientY;

    const startMinutes = timeToMinutes(
      event.startTime,
    );

    const endMinutes = timeToMinutes(
      event.endTime,
    );

    const durationMinutes =
      endMinutes - startMinutes;

    const initialHeight =
      (durationMinutes / TIME_STEP) *
      ROW_HEIGHT;

    const handleMove = (e: PointerEvent) => {
      const deltaY = e.clientY - startY;

      const newHeight = Math.max(
        ROW_HEIGHT,
        initialHeight + deltaY,
      );

      setResizeHeight(newHeight);
    };

    const handleUp = async (e: PointerEvent) => {
      window.removeEventListener(
        "pointermove",
        handleMove,
      );

      window.removeEventListener(
        "pointerup",
        handleUp,
      );

      const deltaY = e.clientY - startY;

      const newHeight = Math.max(
        ROW_HEIGHT,
        initialHeight + deltaY,
      );

      const rows = Math.max(
        1,
        Math.round(
          newHeight / ROW_HEIGHT,
        ),
      );

      const newDurationMinutes =
        rows * TIME_STEP;

      const newEndMinutes =
        startMinutes +
        newDurationMinutes;

      try {
        await updateEvent(
          event.id,
          {
            endTime: minutesToTime(
              newEndMinutes,
            ),
          },
          () => {},
        );
      } catch {
        toast.error(
          "Failed to update event time",
        );
      } finally {
        setResizeHeight(null);
      }
    };

    window.addEventListener(
      "pointermove",
      handleMove,
    );

    window.addEventListener(
      "pointerup",
      handleUp,
    );
  };

  return {
    isDragging,
    dragY,
    resizeHeight,
    didDragRef,
    handleDragStart,
    handleResizeStart,
  };
};

