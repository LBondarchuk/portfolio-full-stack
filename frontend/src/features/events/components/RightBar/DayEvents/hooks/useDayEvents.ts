import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { useEvents } from "../../../../store/events.store";
import { formatDateParam } from "../../../../utils/date";
import {
  assignColumns,
  timeToMinutes,
} from "../../../../utils/timeline";
import {
  PADDING_MINUTES,
  TIME_STEP,
} from "../../../../constants/dayEvents";

interface UseDayEventsProps {
  date: Date;
}

export const useDayEvents = ({ date }: UseDayEventsProps) => {
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

  const sortedEvents = [...events].sort(
    (a, b) =>
      timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
  );

  const positionedEvents = assignColumns(sortedEvents);

  const startTime =
    Math.min(
      ...positionedEvents.map((event) =>
        timeToMinutes(event.startTime),
      ),
    ) - PADDING_MINUTES;

  const endTime =
    Math.max(
      ...positionedEvents.map((event) =>
        timeToMinutes(event.endTime),
      ),
    ) + PADDING_MINUTES;

  const timelineStart =
    Math.floor(startTime / TIME_STEP) * TIME_STEP;

  const timelineEnd =
    Math.ceil(endTime / TIME_STEP) * TIME_STEP;

  const times = Array.from(
    {
      length:
        (timelineEnd - timelineStart) / TIME_STEP + 1,
    },
    (_, index) => timelineStart + index * TIME_STEP,
  );

  const getGridLine = (time: string) => {
    const minutes = timeToMinutes(time);

    return (
      Math.floor(
        (minutes - timelineStart) / TIME_STEP,
      ) + 1
    );
  };

  const maxColumn = Math.max(
    ...positionedEvents.map((event) => event.column),
  );

  return {
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
  };
};