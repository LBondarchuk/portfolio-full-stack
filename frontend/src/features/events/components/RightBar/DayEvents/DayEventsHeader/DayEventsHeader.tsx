import { FiCalendar, FiPlus } from "react-icons/fi";
import { useState } from "react";
import Modal from "../../../../../../components/modals/Modal/Modal";
import CreateEventForm from "../../../CreateEventForm/CreateEventForm";
import Button from "../../../../../../components/buttons/Button/Button";
type Props = {
  date: Date;
  eventsLength: number;
  onCreateEvent: () => void;
};
const DayEventsHeader = ({ date, eventsLength }: Props) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="shrink-0 border-b border-border px-5 py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary-light">
              <FiCalendar className="size-3.5 text-primary" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              Daily schedule
            </span>
          </div>

          <h2 className="text-base font-semibold tracking-tight text-text">
            {formattedDate}
          </h2>

          <p className="mt-1 text-xs text-text-secondary">
            {eventsLength === 0
              ? "No events planned"
              : `${eventsLength} ${
                  eventsLength === 1 ? "event" : "events"
                } scheduled`}
          </p>
        </div>

        {eventsLength > 0 && (
          <Button className="px-2! cursor-pointer" onClick={() => setFormOpen(true)}>
            <FiPlus className="size-4" />
          </Button>
        )}
      </div>
      <Modal isOpen={isFormOpen} onClose={() => setFormOpen(false)}>
        <CreateEventForm onClose={() => setFormOpen(false)} />
      </Modal>
    </div>
  );
};

export default DayEventsHeader;
