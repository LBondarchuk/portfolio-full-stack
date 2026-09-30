type CalendarGridProps = {
  children: React.ReactNode;
};

const CalendarGrid = ({ children }: CalendarGridProps) => {
  return <div className="grid grid-cols-7">{children}</div>;
};

export default CalendarGrid;
