import { FiCalendar, FiClock, FiMapPin, FiUsers } from "react-icons/fi";
import InfoRow from "./InfoRow/InfoRow";
import type { Event } from "../../../../../types/events.types";
type Props = {
  event: Event;
};
const EventInfo = ({ event }: Props) => {
  const formatEventDate = (date: string) => {
    const [year, month, day] = date.split("T")[0].split('-').map(Number);

    const eventDate = new Date(year, month - 1, day);

    return eventDate.toLocaleDateString("de-DE", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-1">
      <InfoRow
        icon={<FiCalendar />}
        label="Datum"
        value={formatEventDate(event.date)}
      />

      <InfoRow
        icon={<FiClock />}
        label="Uhrzeit"
        value={`${event.startTime} – ${event.endTime}`}
      />

      {event.location && (
        <InfoRow icon={<FiMapPin />} label="Ort" value={event.location} />
      )}

      {event.attendees !== undefined && (
        <InfoRow
          icon={<FiUsers />}
          label="Teilnehmende"
          value={`${event.attendees} ${
            event.attendees === 1 ? "Person" : "Personen"
          }`}
        />
      )}
    </div>
  );
};

export default EventInfo;
