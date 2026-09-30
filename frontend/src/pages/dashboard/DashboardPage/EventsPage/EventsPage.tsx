import { useState } from "react";
import Calendar from "../../../../components/Calendar/Calendar";
import { useSearchParams } from "react-router";
import DayEvents from "../../../../features/events/components/RightBar/DayEvents/DayEvents";

const EventsPage = () => {
  const [dateParams, setDateParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(() => {
    const dateParam = dateParams.get("date");

    if (!dateParam)  return new Date();
  
    const [day, month, year] = dateParam.split("-").map(Number);

    return new Date(year, month - 1, day);
  });

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    const day = date.getDate();
    const month = date.getMonth();
    const yeahr = date.getFullYear();
    setDateParams({ date: `${day}-${month}-${yeahr}` });
  };

  return (
    <div className="grid  md:grid-cols-[minmax(0,1fr)_300px] gap-4">
      <Calendar value={selectedDate} onChange={handleSelectDate} />
      <DayEvents
        date={selectedDate}
      
      />
    
    </div>
  );
};

export default EventsPage;
