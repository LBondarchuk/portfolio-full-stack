import Skeleton from "../../../../../../../components/Skeleton/Skeleton";

const DayEventsHeaderSkeleton = () => {
  return (
    <div className="shrink-0 border-b border-border px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Skeleton className="size-7 rounded-lg" />
            <Skeleton className="h-3 w-24 rounded-lg" />
          </div>
          <Skeleton className="h-4 w-40 max-w-full" />
          <Skeleton className="mt-1.5 h-3 w-28" />
        </div>
        <Skeleton className="size-10 shrink-0 rounded-xl" />
      </div>
      <Skeleton className="mt-4 h-10 w-full rounded-xl" />
    </div>
  );
};

export default DayEventsHeaderSkeleton;
