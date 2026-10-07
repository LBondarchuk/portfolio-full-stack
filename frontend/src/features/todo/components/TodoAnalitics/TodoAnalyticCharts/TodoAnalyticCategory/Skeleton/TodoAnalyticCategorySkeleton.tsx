import Skeleton from "../../../../../../../components/Skeleton/Skeleton";

const TodoAnalyticCategorySkeleton = () => (
  <div className="min-w-0 rounded-2xl border border-border bg-surface p-6">
    <div className="mb-5 space-y-2">
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-4 w-48 max-w-full" />
    </div>
    <div className="flex h-72 flex-col justify-center gap-5">
      {["w-4/5", "w-3/5", "w-2/3", "w-1/2"].map((width, index) => (
        <div key={index} className="flex items-center gap-3">
          <Skeleton className="h-3 w-12" />
          <Skeleton className={`h-5 ${width}`} />
        </div>
      ))}
    </div>
  </div>
);

export default TodoAnalyticCategorySkeleton;
