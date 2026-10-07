import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { useEvents } from "../../../../store/events.store";
import EventDetailsHeader from "./EventDetailsHeader/EventDetailsHeader";
import EventTitle from "./EventTitle/EventTitle";
import EventInfo from "./EventInfo/EventInfo";
import Actions from "./Actions/Actions";
import EventDetailsSkeleton from "./EventDetailsSkeleton/EventDetailsSkeleton";

type Props = {
  id: string;
  onClose: () => void;
};

const EventDetails = ({ id, onClose }: Props) => {
  const { getEvent, event } = useEvents();
  const [loadingId, setLoadingId] = useState<string | null>(id);
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingId(id);
    setErrorId(null);

    const loadEvent = async () => {
      try {
        await getEvent(id, controller.signal);
        if (isActive) setLoadedId(id);
      } catch {
        if (isActive && !controller.signal.aborted) {
          setErrorId(id);
          toast.error("Termin konnte nicht geladen werden.");
        }
      } finally {
        if (isActive) setLoadingId(null);
      }
    };

    loadEvent();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [getEvent, id]);

  const currentEvent = event?.id === id ? event : null;
  const isLoading =
    loadingId === id || (loadedId !== id && errorId !== id);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      aria-busy={isLoading}
      className="flex h-full min-h-0 flex-col border-l border-border bg-surface"
    >
      {isLoading ? (
        <EventDetailsSkeleton />
      ) : currentEvent ? (
        <>
          <EventDetailsHeader title={currentEvent.title} onClose={onClose} />
          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-5"
            >
              <EventTitle title={currentEvent.title} />
              <EventInfo event={currentEvent} />
              {currentEvent.description && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-text">
                    Description
                  </h4>
                  <p className="text-xs leading-5 text-text-secondary">
                    {currentEvent.description}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
          <Actions />
        </>
      ) : (
        <>
          <EventDetailsHeader title="Termin nicht verfügbar" onClose={onClose} />
          <div className="flex flex-1 items-center justify-center p-5 text-sm text-text-secondary">
            Die Termindetails konnten nicht angezeigt werden.
          </div>
        </>
      )}
    </motion.aside>
  );
};

export default EventDetails;
