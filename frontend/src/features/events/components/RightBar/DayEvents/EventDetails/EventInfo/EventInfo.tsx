import { FiCalendar, FiClock, FiMapPin, FiUsers } from "react-icons/fi";
import InfoRow from "./InfoRow/InfoRow";
import type { Event } from "../../../../../types/events.types";
type Props = {
  event: Event;
};
const EventInfo = ({ event }: Props) => {
  const formatEventDate = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);

    const eventDate = new Date(year, month - 1, day);

    return eventDate.toLocaleDateString("en-US", {
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
        label="Date"
        value={formatEventDate(event.date)}
      />

      <InfoRow
        icon={<FiClock />}
        label="Time"
        value={`${event.startTime} – ${event.endTime}`}
      />

      {event.location && (
        <InfoRow icon={<FiMapPin />} label="Location" value={event.location} />
      )}

      {event.attendees !== undefined && (
        <InfoRow
          icon={<FiUsers />}
          label="Attendees"
          value={`${event.attendees} ${
            event.attendees === 1 ? "person" : "people"
          }`}
        />
      )}
    </div>
  );
};

export default EventInfo;
