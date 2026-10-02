import TodoKPI from "../../../../features/todo/components/TodoAnalitics/TodoKPI/TodoKPI";
import { useEffect } from "react";
import { useTodo } from "../../../../features/todo/store/todo.store";
import CompletionRate from "../../../../features/todo/components/TodoAnalitics/CompletionRate/CompletionRate";
import TodoAnalyticCategory from "../../../../features/todo/components/TodoAnalitics/TodoAnalyticCharts/TodoAnalyticCategory/TodoAnalyticCategory";
import TodoAnalyticPriority from "../../../../features/todo/components/TodoAnalitics/TodoAnalyticCharts/TodoAnalyticPriority/TodoAnalyticPriority";
import TodoAnalyticSattus from "../../../../features/todo/components/TodoAnalitics/TodoAnalyticCharts/TodoAnalyticSattus/TodoAnalyticSattus";
import TodoAnalyticWeeklyCompletion from "../../../../features/todo/components/TodoAnalitics/TodoAnalyticCharts/TodoAnalyticWeeklyCompletion/TodoAnalyticWeeklyCompletion";
import PageHeader from "../../../../components/PageHeader/PageHeader";
import { toast } from "react-toastify";

const TodoAnalyticsPage = () => {
  const { analytics, getTodoAnalytics } = useTodo();

 useEffect(() => {
  const loadAnalytics = async () => {
    try {
      await getTodoAnalytics();
    } catch {
      toast.error("Failed to load analytics");
    }
  };

  loadAnalytics();
}, [getTodoAnalytics]);

  if (!analytics) return;

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Analytics"
        description="Track your productivity and get insights into your tasks."
      />
      <TodoKPI summary={analytics.summary} />
      <CompletionRate completionRate={analytics.summary.completionRate} />
      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        <TodoAnalyticSattus status={analytics.status} />
        <TodoAnalyticCategory categories={analytics.categories} />
        <TodoAnalyticPriority priorities={analytics.priorities} />
        <TodoAnalyticWeeklyCompletion
          weeklyCompletion={analytics.weeklyCompletion}
        />
      </div>
    </div>
  );
};

export default TodoAnalyticsPage;
