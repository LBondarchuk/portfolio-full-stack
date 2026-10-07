import Skeleton from "../../../../../../components/Skeleton/Skeleton";
import { ROW_HEIGHT } from "../../../../constants/dayEvents";
import DayEventsHeaderSkeleton from "./DayEventsHeaderSkeleton/DayEventsHeaderSkeleton";

const skeletonEvents = [
  { row: 0, duration: 1 },
  { row: 2, duration: 2 },
  { row: 5, duration: 1 },
  { row: 6, duration: 3 },
];

const DayEventsSkeleton = () => {
  return (
    <div className="flex min-h-0 flex-1" aria-hidden="true">
      <aside className="flex h-125 min-w-0 flex-1 flex-col overflow-hidden bg-surface md:h-auto md:min-h-0">
        <DayEventsHeaderSkeleton />

        <div className="min-h-0 flex-1 overflow-hidden px-4 py-4 pl-0">
          {Array.from({ length: 9 }).map((_, index) => {
            const event = skeletonEvents.find((item) => item.row === index);

            return (
              <div
                key={index}
                style={{ height: ROW_HEIGHT }}
                className="flex items-start border-b border-border"
              >
                <div className="w-13 shrink-0 px-2 pt-2">
                  <Skeleton className="h-3 w-8" />
                </div>

                <div className="flex h-full flex-1 border-l border-border px-2">
                  {event && (
                    <Skeleton
                      className="w-full rounded-lg"
                      style={{ height: `${event.duration * ROW_HEIGHT}px` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default DayEventsSkeleton;
