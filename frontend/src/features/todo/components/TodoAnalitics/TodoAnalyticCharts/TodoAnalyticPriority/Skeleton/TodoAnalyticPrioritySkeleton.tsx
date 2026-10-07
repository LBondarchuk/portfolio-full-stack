import Skeleton from "../../../../../../../components/Skeleton/Skeleton";

const TodoAnalyticPrioritySkeleton = () => (
  <div className="min-w-0 rounded-2xl border border-border bg-surface p-6">
    <div className="mb-5 space-y-2">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-4 w-48 max-w-full" />
    </div>
    <div className="flex h-72 items-center justify-center">
      <div className="relative size-44">
        <Skeleton className="absolute inset-0 rounded-full" />
        <div className="absolute inset-8 rounded-full bg-surface" />
      </div>
    </div>
    <div className="flex flex-wrap justify-center gap-5">
      {[0, 1, 2].map((item) => (
        <Skeleton key={item} className="h-4 w-16" />
      ))}
    </div>
  </div>
);

export default TodoAnalyticPrioritySkeleton;
