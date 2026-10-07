import Skeleton from "../../../../../../components/Skeleton/Skeleton";

const KpiCardSkeleton = ({ hasSubtitle = false }: { hasSubtitle?: boolean }) => (
  <div className="rounded-2xl border border-border bg-surface p-5">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="mt-3 h-9 w-16" />
    {hasSubtitle && <Skeleton className="mt-2 h-4 w-32" />}
  </div>
);

const TodoKPISkeleton = () => (
  <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
    <KpiCardSkeleton />
    <KpiCardSkeleton hasSubtitle />
    <KpiCardSkeleton />
    <KpiCardSkeleton />
  </div>
);

export default TodoKPISkeleton;
