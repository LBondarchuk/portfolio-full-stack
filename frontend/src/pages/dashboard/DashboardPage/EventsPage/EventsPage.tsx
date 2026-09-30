import { useEffect, useState } from "react";
import Calendar from "../../../../components/Calendar/Calendar";
import { useSearchParams } from "react-router";
import DayEvents from "../../../../features/events/components/RightBar/DayEvents/DayEvents";
import { useEvents } from "../../../../features/events/store/events.store";
import { formatDateParam } from "../../../../features/events/utils/date";

const EventsPage = () => {
  const { getEventCounts, eventCounts, events } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  const [selectedDate, setSelectedDate] = useState(() => {
    if (!dateParam) return new Date();

    const [year, month, day] = dateParam.split("-").map(Number);

    return new Date(year, month - 1, day);
  });

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);

    const formattedDate = formatDateParam(date);
    setSearchParams({ date: formattedDate });
  };
  useEffect(() => {
    const formatMonth = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    };
    getEventCounts(formatMonth(selectedDate));
  }, [getEventCounts, selectedDate, events]);

useEffect(() => {
  if (!dateParam) return;

  const [year, month, day] = dateParam.split("-").map(Number);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setSelectedDate(new Date(year, month - 1, day));
}, [dateParam]);

  return (
    <div className="grid  md:grid-cols-[minmax(0,1fr)_300px] gap-4">
      <Calendar
        value={selectedDate}
        onChange={handleSelectDate}
        renderCell={(date) => {
          const formattedDate = formatDateParam(date);
          const count = eventCounts[formattedDate] ?? 0;

          return (
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-sm font-semibold">{date.getDate()}</span>

              {count > 0 && (
                <div className="flex h-1.5 items-center justify-center gap-0.5">
                  {Array.from({
                    length: Math.min(count, 3),
                  }).map((_, index) => (
                    <span
                      key={index}
                      className="size-1 rounded-full bg-primary"
                    />
                  ))}

                  {count > 3 && (
                    <span className="ml-0.5 text-[8px] font-bold leading-none text-primary">
                      +
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        }}
      />
      <DayEvents date={selectedDate} />
    </div>
  );
};

export default EventsPage;
