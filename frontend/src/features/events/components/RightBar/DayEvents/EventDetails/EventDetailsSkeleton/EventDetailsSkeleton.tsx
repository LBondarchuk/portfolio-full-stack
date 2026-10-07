import Skeleton from "../../../../../../../components/Skeleton/Skeleton";

const EventDetailsSkeleton = () => (
  <div className="flex min-h-0 flex-1 flex-col" aria-hidden="true">
    <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="ml-4 flex gap-1">
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="size-8 rounded-lg" />
      </div>
    </div>

    <div className="min-h-0 flex-1 space-y-5 overflow-hidden p-5">
      <div className="rounded-2xl bg-primary-light p-4">
        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="size-2 rounded-full" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-5 w-3/4" />
      </div>

      <div className="space-y-1">
        {["w-32", "w-28", "w-24", "w-20"].map((valueWidth, index) => (
          <div key={index} className="flex items-center gap-3 rounded-xl px-2 py-2.5">
            <Skeleton className="size-8 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <Skeleton className="h-2.5 w-14" />
              <Skeleton className={`h-3 ${valueWidth}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Skeleton className="mb-3 h-3 w-20" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>

    <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-border p-4">
      <Skeleton className="h-9 rounded-md" />
      <Skeleton className="h-9 rounded-md" />
    </div>
  </div>
);

export default EventDetailsSkeleton;
