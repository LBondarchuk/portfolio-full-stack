import { FiCheckSquare } from "react-icons/fi";
import Skeleton from "../../../Skeleton/Skeleton";

const TodoToComlateSkeleton = () => (
  <div className="flex items-center gap-2" aria-hidden="true">
    <div className="flex size-8 items-center justify-center rounded-lg bg-primary-light text-primary">
      <FiCheckSquare className="size-4" />
    </div>
    <div className="flex items-center gap-2">
      <div className="flex items-baseline gap-1.5">
        <Skeleton className="h-4 w-5" />
        <Skeleton className="hidden h-3 w-10 sm:block" />
      </div>
      <div className="hidden items-center gap-1 sm:flex">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  </div>
);

export default TodoToComlateSkeleton;
