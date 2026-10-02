type CalendarDayCellProps = {
  date: Date;
  eventCount: number;
};

const CalendarDayCell = ({
  date,
  eventCount,
}: CalendarDayCellProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span className="text-sm font-semibold">
        {date.getDate()}
      </span>

      {eventCount > 0 && (
        <div className="flex h-1.5 items-center justify-center gap-0.5">
          {Array.from({
            length: Math.min(eventCount, 3),
          }).map((_, index) => (
            <span
              key={index}
              className="size-1 rounded-full bg-primary"
            />
          ))}

          {eventCount > 3 && (
            <span className="ml-0.5 text-[8px] font-bold leading-none text-primary">
              +
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarDayCell;