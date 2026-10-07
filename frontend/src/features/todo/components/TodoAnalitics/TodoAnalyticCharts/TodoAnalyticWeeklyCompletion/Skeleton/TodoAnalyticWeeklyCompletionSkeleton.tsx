import Skeleton from "../../../../../../../components/Skeleton/Skeleton";

const TodoAnalyticWeeklyCompletionSkeleton = () => (
  <div className="min-w-0 rounded-2xl border border-border bg-surface p-6">
    <div className="mb-5 space-y-2">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-48 max-w-full" />
    </div>
    <div className="flex h-72 items-end gap-4 px-3 pb-3">
      {[42, 68, 34, 82, 56, 28, 72].map((height, index) => (
        <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
          <Skeleton className="w-full rounded-t-lg" style={{ height: `${height}%` }} />
          <Skeleton className="h-3 w-8" />
        </div>
      ))}
    </div>
  </div>
);

export default TodoAnalyticWeeklyCompletionSkeleton;
