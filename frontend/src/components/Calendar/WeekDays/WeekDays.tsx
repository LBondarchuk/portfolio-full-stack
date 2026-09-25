const WeekDays = () => {
  const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  return (
    <div className="grid grid-cols-7">
      {weekDays.map((day) => (
        <div key={day} className="p-2 text-center font-medium text-gray-600">
          {day}
        </div>
      ))}
    </div>
  );
};

export default WeekDays;
