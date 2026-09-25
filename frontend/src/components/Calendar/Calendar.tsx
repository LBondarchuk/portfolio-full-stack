import { useState } from "react";
import CalendarGrid from "./CalendarGrid/CalendarGrid";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import WeekDays from "./WeekDays/WeekDays";
import CalendarCell from "./CalendarGrid/CalendarCell/CalendarCell";
import { createCalendarCells } from "./calendarUtils";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeYear = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
  };

  const switchMonth = (amount: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + amount);
    setCurrentDate(newDate);
  };

  const { previousMonthCells, currentMonthCells, nextMonthCells } =
    createCalendarCells(currentDate);

  return (
    <div>
      <CalendarHeader
        onChangeYear={changeYear}
        currentDate={currentDate}
        onPreviousMonth={() => switchMonth(-1)}
        onNextMonth={() => switchMonth(1)}
        onToday={() => setCurrentDate(new Date())}
      />

      <WeekDays />

      <CalendarGrid>
        <>
          {previousMonthCells.map((day) => (
            <CalendarCell
              key={`prev-${day}`}
              type="adjacent"
              onClick={() => switchMonth(-1)}
            >
              {day}
            </CalendarCell>
          ))}

          {currentMonthCells.map((day) => (
            <CalendarCell key={`current-${day}`}>{day}</CalendarCell>
          ))}

          {nextMonthCells.map((day) => (
            <CalendarCell
              key={`next-${day}`}
              type="adjacent"
              onClick={() => switchMonth(1)}
            >
              {day}
            </CalendarCell>
          ))}
        </>
      </CalendarGrid>
    </div>
  );
};

export default Calendar;
