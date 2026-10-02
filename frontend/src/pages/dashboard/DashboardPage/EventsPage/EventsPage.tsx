import { useEffect, useState } from "react";
import Calendar from "../../../../components/Calendar/Calendar";
import { useSearchParams } from "react-router";
import DayEvents from "../../../../features/events/components/RightBar/DayEvents/DayEvents";
import { useEvents } from "../../../../features/events/store/events.store";
import {
  formatDateParam,
  formatMonth,
  parseDateParam,
} from "../../../../features/events/utils/date";
import EventDetails from "../../../../features/events/components/RightBar/DayEvents/EventDetails/EventDetails";
import PageHeader from "../../../../components/PageHeader/PageHeader";
import CalendarDayCell from "../../../../features/events/components/CalendarDayCell/CalendarDayCell";
import { toast } from "react-toastify";

const EventsPage = () => {
  const { getEventCounts, eventCounts } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  const isFullView = searchParams.get("fullView") === "true";
  const id = searchParams.get("id");
  const [selectedDate, setSelectedDate] = useState(() => {
    if (!dateParam) return new Date();
    return parseDateParam(dateParam);
  });

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);

    const formattedDate = formatDateParam(date);
    setSearchParams({ date: formattedDate });
  };
  useEffect(() => {
    const loadEventCounts = async () => {
      try {
        await getEventCounts(formatMonth(selectedDate));
      } catch {
        toast.error("Failed to load event counts");
      }
    };

    loadEventCounts();
  }, [getEventCounts, selectedDate]);

  useEffect(() => {
    if (!dateParam) return;

    const [year, month, day] = dateParam.split("-").map(Number);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedDate(new Date(year, month - 1, day));
  }, [dateParam]);

  const gridCols =
    isFullView && id
      ? "grid md:grid-cols-[minmax(0,1fr)_300px]"
      : isFullView
        ? "grid md:grid-cols-[minmax(0,1fr)] "
        : "grid md:grid-cols-[minmax(0,1fr)_300px]";

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 md:gap-4 lg:gap-10">
      <PageHeader
        title="Events"
        description="Plan your events and keep your schedule organized."
      />
      <div className={`${gridCols} min-h-0 flex-1 gap-2`}>
        {!isFullView && (
          <div>
            <Calendar
              value={selectedDate}
              onChange={handleSelectDate}
              renderCell={(date) => {
                const formattedDate = formatDateParam(date);
                const count = eventCounts[formattedDate] ?? 0;

                return <CalendarDayCell date={date} eventCount={count} />;
              }}
            />
          </div>
        )}

        <DayEvents date={selectedDate} />

        {isFullView && id && (
          <aside className="min-h-0 overflow-hidden">
            <EventDetails
              id={id}
              onClose={() =>
                setSearchParams((prev) => {
                  prev.delete("id");
                  return prev;
                })
              }
            />
          </aside>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
