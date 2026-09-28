const getMondayIndex = (weekday: number) => {
  if (weekday === 0) return 6;

  return weekday - 1;
};

const createDays = (year: number, month: number, count: number) => {
  return Array.from(
    { length: count },
    (_, index) => new Date(year, month, index + 1),
  );
};

export const createCalendarCells = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const firstWeekday = getMondayIndex(firstDay.getDay());

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const previousMonthDaysCount = new Date(
    year,
    month,
    0,
  ).getDate();

  const previousMonthCells = Array.from(
    { length: firstWeekday },
    (_, index) =>
      new Date(
        year,
        month - 1,
        previousMonthDaysCount - firstWeekday + index + 1,
      ),
  );

  const currentMonthCells = createDays(
    year,
    month,
    daysInMonth,
  );

  const totalCells = firstWeekday + daysInMonth;

  const calendarCells = totalCells <= 35 ? 35 : 42;

  const nextMonthCells = Array.from(
    { length: calendarCells - totalCells },
    (_, index) => new Date(year, month + 1, index + 1),
  );

  return {
    previousMonthCells,
    currentMonthCells,
    nextMonthCells,
  };
};