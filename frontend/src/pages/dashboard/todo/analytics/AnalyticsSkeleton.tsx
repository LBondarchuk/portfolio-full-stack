import AnalyticsHeaderSkeleton from "../../../../features/todo/components/TodoAnalitics/Skeleton/AnalyticsHeaderSkeleton";
import CompletionRateSkeleton from "../../../../features/todo/components/TodoAnalitics/CompletionRate/Skeleton/CompletionRateSkeleton";
import TodoAnalyticCategorySkeleton from "../../../../features/todo/components/TodoAnalitics/TodoAnalyticCharts/TodoAnalyticCategory/Skeleton/TodoAnalyticCategorySkeleton";
import TodoAnalyticPrioritySkeleton from "../../../../features/todo/components/TodoAnalitics/TodoAnalyticCharts/TodoAnalyticPriority/Skeleton/TodoAnalyticPrioritySkeleton";
import TodoAnalyticStatusSkeleton from "../../../../features/todo/components/TodoAnalitics/TodoAnalyticCharts/TodoAnalyticSattus/Skeleton/TodoAnalyticStatusSkeleton";
import TodoAnalyticWeeklyCompletionSkeleton from "../../../../features/todo/components/TodoAnalitics/TodoAnalyticCharts/TodoAnalyticWeeklyCompletion/Skeleton/TodoAnalyticWeeklyCompletionSkeleton";
import TodoKPISkeleton from "../../../../features/todo/components/TodoAnalitics/TodoKPI/Skeleton/TodoKPISkeleton";

const AnalyticsSkeleton = () => (
  <div className="grid gap-6" aria-busy="true" aria-label="Loading task analytics">
    <AnalyticsHeaderSkeleton />
    <TodoKPISkeleton />
    <CompletionRateSkeleton />
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <TodoAnalyticStatusSkeleton />
      <TodoAnalyticCategorySkeleton />
      <TodoAnalyticPrioritySkeleton />
      <TodoAnalyticWeeklyCompletionSkeleton />
    </div>
  </div>
);

export default AnalyticsSkeleton;
