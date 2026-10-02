import { FiCalendar, FiMaximize2, FiMinimize2, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { useSearchParams } from "react-router";

import Modal from "../../../../../../components/modals/Modal/Modal";
import EventForm from "../../../EventForm/EventForm";
import Button from "../../../../../../components/buttons/Button/Button";

type Props = {
  date: Date;
  eventsLength: number;
 
};

const DayEventsHeader = ({ date, eventsLength }: Props) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const isFullView = searchParams.get("fullView") === "true";

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const handleToggleFullView = () => {
    setSearchParams((prev) => {
      if (isFullView) {
        prev.delete("fullView");
        prev.delete("id");
      } else {
        prev.set("fullView", "true");
      }

      return prev;
    });
  };

  return (
    <div className="shrink-0 border-b border-border px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary-light">
              <FiCalendar className="size-3.5 text-primary" />
            </div>

            <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Daily schedule
            </span>
          </div>

          <h2 className="truncate text-sm font-semibold tracking-tight text-text">
            {formattedDate}
          </h2>

          <p className="mt-1 text-[11px] text-text-secondary">
            {eventsLength === 0
              ? "No events planned"
              : `${eventsLength} ${
                  eventsLength === 1 ? "event" : "events"
                } scheduled`}
          </p>
        </div>

        {eventsLength > 0 && (
          <Button className="shrink-0 px-2!" onClick={() => setFormOpen(true)}>
            <FiPlus className="size-4" />
          </Button>
        )}
      </div>

      {(eventsLength >= 2||  isFullView )&& (
        <button
          type="button"
          onClick={handleToggleFullView}
          className="
          group mt-4 flex w-full cursor-pointer items-center justify-between
          rounded-lg border border-border bg-gray-light/50
          px-3 py-2
          text-[10px] font-medium text-text-secondary
          transition-all duration-200
          hover:border-primary/30
          hover:bg-primary-light
          hover:text-primary
        "
        >
          <span>{isFullView ? "Back to calendar" : "Open full view"}</span>

          {isFullView ? (
            <FiMinimize2
              className="
              size-3.5
              transition-transform duration-200
              group-hover:scale-110
            "
            />
          ) : (
            <FiMaximize2
              className="
              size-3.5
              transition-transform duration-200
              group-hover:scale-110
            "
            />
          )}
        </button>
      )}

      <Modal isOpen={isFormOpen} onClose={() => setFormOpen(false)}>
        <EventForm onClose={() => setFormOpen(false)} />
      </Modal>
    </div>
  );
};

export default DayEventsHeader;
