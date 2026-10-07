import Skeleton from "../../../Skeleton/Skeleton";
import CalendarIcon from "../../../Icons/Calendar";

const CalendarCountSkeleton = () => (
  <div className="flex items-center gap-2" aria-hidden="true">
    <div className="flex size-8 items-center justify-center rounded-lg bg-primary-light text-primary">
      <CalendarIcon className="size-4!" />
    </div>
    <div className="flex items-baseline gap-1.5">
      <Skeleton className="h-4 w-5" />
      <Skeleton className="hidden h-3 w-24 sm:block" />
    </div>
  </div>
);

export default CalendarCountSkeleton;
