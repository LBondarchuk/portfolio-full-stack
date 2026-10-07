import { useEffect, useState } from "react";
import { useEvents } from "../../../../features/events/store/events.store";

const useCalendarCount = () => {
  const getDayCount = useEvents((state) => state.getDayCount);
  const dayCount = useEvents((state) => state.dayCount);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadDayCount = async () => {
      try {
        await getDayCount(controller.signal);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to load today's event count:", error);
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadDayCount();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [getDayCount]);

  return { dayCount, isLoading };
};

export default useCalendarCount;
