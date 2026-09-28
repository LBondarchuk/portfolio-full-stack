import { useState } from "react";
import CalendarGrid from "./CalendarGrid/CalendarGrid";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import WeekDays from "./WeekDays/WeekDays";
import CalendarCell from "./CalendarGrid/CalendarCell/CalendarCell";
import { createCalendarCells } from "./calendarUtils";

const isSameDate = (firstDate: Date, secondDate: Date) => {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};
export type CalendarVariant = "default" | "picker";
type CalendarProps = {
  variant?: CalendarVariant;
  value: Date;
  onChange: (date: Date) => void;
};

const Calendar = ({
  variant = "default",
  value,
  onChange,
}: CalendarProps) => {
  const [viewDate, setViewDate] = useState(new Date());


  const handleYearChange = (year: number) => {
    const newDate = new Date(viewDate);

    newDate.setFullYear(year);

    setViewDate(newDate);
  };

  const handleMonthChange = (amount: number) => {
    const newDate = new Date(viewDate);

    newDate.setMonth(newDate.getMonth() + amount);

    setViewDate(newDate);
  };

const handleDateSelect = (date: Date) => {
  const newDate = new Date(date);

  onChange(newDate);
  setViewDate(newDate);
};
  const handleToday = () => {
    const today = new Date();

    onChange(today);
    setViewDate(today);
  };

  const { previousMonthCells, currentMonthCells, nextMonthCells } =
    createCalendarCells(viewDate);

  return (
    <div
      className={
        variant === "picker"
          ? "w-80 rounded-2xl border border-gray-200 bg-white shadow-lg p-3 box-border"
          : "w-full"
      }
    >
      <CalendarHeader
        variant={variant}
        currentDate={viewDate}
        onChangeYear={handleYearChange}
        onPreviousMonth={() => handleMonthChange(-1)}
        onNextMonth={() => handleMonthChange(1)}
        onToday={handleToday}
      />

      <WeekDays />

      <CalendarGrid>
        <>
          {previousMonthCells.map((date) => (
            <CalendarCell
              key={`prev-${date.getTime()}`}
              type="adjacent"
              date={date}
              onClick={() => handleDateSelect(date)}
            >
              {date.getDate()}
            </CalendarCell>
          ))}

          {currentMonthCells.map((date) => (
            <CalendarCell
              key={`current-${date.getTime()}`}
              date={date}
             isActive={isSameDate(value, date)}
              onClick={() => handleDateSelect(date)}
              calendarVariant={variant}
            >
              {date.getDate()}
            </CalendarCell>
          ))}

          {nextMonthCells.map((date) => (
            <CalendarCell
              key={`next-${date.getTime()}`}
              type="adjacent"
              date={date}
              onClick={() => handleDateSelect(date)}
            >
              {date.getDate()}
            </CalendarCell>
          ))}
        </>
      </CalendarGrid>
    </div>
  );
};

export default Calendar;
