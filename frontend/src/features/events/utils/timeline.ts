/* eslint-disable @typescript-eslint/no-explicit-any */
export const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};
export const minutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};
export const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

export const isOverlap = (
  startA: number,
  endA: number,
  startB: number,
  endB: number,
) => {
  return startA < endB && startB < endA;
};

export const getFirstFreeColumn = (occupiedColumns: number[]) => {
  let column = 1;

  while (occupiedColumns.includes(column)) {
    column++;
  }

  return column;
};

export const assignColumns = (events: any[]) => {
  const result: any[] = [];

  for (const event of events) {
    const occupiedColumns: number[] = [];

    for (const previousEvent of result) {
      const overlap = isOverlap(
        timeToMinutes(event.startTime),
        timeToMinutes(event.endTime),
        timeToMinutes(previousEvent.startTime),
        timeToMinutes(previousEvent.endTime),
      );

      if (overlap) {
        occupiedColumns.push(previousEvent.column);
      }
    }

    const column = getFirstFreeColumn(occupiedColumns);

    result.push({
      ...event,
      column,
    });
  }

  return result;
};

  export const getDuration = (start: string, end: string) => {
    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);

    const startTotal = startHours * 60 + startMinutes;
    const endTotal = endHours * 60 + endMinutes;

    const duration = endTotal - startTotal;

    if (duration < 60) {
      return `${duration}m`;
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
  };


