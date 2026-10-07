
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
  const { events, getEvents, eventsLoading } = useEvents();
  const [params, setParams] = useSearchParams();

  const id = params.get("id");
  const isFullView = params.get("fullView") === "true";

  useEffect(() => {
    const loadEvents = async () => {
      try {
        await getEvents(formatDateParam(date));
      } catch {
        toast.error("Termine konnten nicht geladen werden.");
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
      timeToMinutes(a.startTime) -
      timeToMinutes(b.startTime),
  );

  const positionedEvents = assignColumns(sortedEvents);
  const startTime =
    positionedEvents.length > 0
      ? Math.min(
          ...positionedEvents.map((event) =>
            timeToMinutes(event.startTime),
          ),
        ) - PADDING_MINUTES
      : 0;

  const endTime =
    positionedEvents.length > 0
      ? Math.max(
          ...positionedEvents.map((event) =>
            timeToMinutes(event.endTime),
          ),
        ) + PADDING_MINUTES
      : 24 * 60;

  const timelineStart =
    Math.floor(startTime / TIME_STEP) * TIME_STEP;

  const timelineEnd =
    Math.ceil(endTime / TIME_STEP) * TIME_STEP;

  const times = Array.from(
    {
      length:
        (timelineEnd - timelineStart) / TIME_STEP + 1,
    },
    (_, index) =>
      timelineStart + index * TIME_STEP,
  );

  const getGridLine = (time: string) => {
    const minutes = timeToMinutes(time);

    return (
      Math.floor(
        (minutes - timelineStart) / TIME_STEP,
      ) + 1
    );
  };

  const maxColumn =
    positionedEvents.length > 0
      ? Math.max(
          ...positionedEvents.map(
            (event) => event.column,
          ),
        )
      : 1;

  return {
    events,
    loading: eventsLoading,
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
