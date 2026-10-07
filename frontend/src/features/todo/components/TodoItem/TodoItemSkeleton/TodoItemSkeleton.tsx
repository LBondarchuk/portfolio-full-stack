import Skeleton from "../../../../../components/Skeleton/Skeleton";

const TodoItemSkeleton = () => (
  <article
    aria-hidden="true"
    className="grid grid-cols-[auto_1fr_auto] gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm"
  >
    {/* Checkbox */}
    <Skeleton className="mt-0.5 size-5 rounded-md" />

    {/* Title, description and metadata */}
    <div className="grid min-w-0 gap-3">
      <div className="grid gap-2">
        <Skeleton className="h-4 w-32 sm:w-48" />
        <Skeleton className="h-3 w-40 max-w-full sm:w-64" />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="size-3 rounded-md sm:h-5 sm:w-16" />
        <Skeleton className="size-3 rounded-md sm:h-5 sm:w-20" />
        <Skeleton className="size-3 rounded-md sm:h-5 sm:w-14" />
      </div>
    </div>

    {/* Edit and delete actions */}
    <div className="grid grid-cols-2 items-center gap-1 md:gap-2">
      <Skeleton className="size-10 rounded-xl md:w-20" />
      <Skeleton className="size-10 rounded-xl md:w-20" />
    </div>
  </article>
);

export default TodoItemSkeleton;
