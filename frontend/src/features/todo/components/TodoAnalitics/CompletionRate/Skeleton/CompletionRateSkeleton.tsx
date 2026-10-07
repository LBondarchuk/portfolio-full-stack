import Skeleton from "../../../../../../components/Skeleton/Skeleton";

const CompletionRateSkeleton = () => (
  <div className="rounded-2xl border border-border bg-surface p-6">
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>
      <Skeleton className="h-8 w-16" />
    </div>
    <Skeleton className="h-3 w-full rounded-full" />
  </div>
);

export default CompletionRateSkeleton;
