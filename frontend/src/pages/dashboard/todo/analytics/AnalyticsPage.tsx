import TodoKPI from "../../../../features/todo/components/TodoAnalitics/TodoKPI/TodoKPI";
import { useEffect, useState } from "react";
import { useTodo } from "../../../../features/todo/store/todo.store";
import CompletionRate from "../../../../features/todo/components/TodoAnalitics/CompletionRate/CompletionRate";
import TodoAnalyticCategory from "../../../../features/todo/components/TodoAnalitics/TodoAnalyticCharts/TodoAnalyticCategory/TodoAnalyticCategory";
import TodoAnalyticPriority from "../../../../features/todo/components/TodoAnalitics/TodoAnalyticCharts/TodoAnalyticPriority/TodoAnalyticPriority";
import TodoAnalyticSattus from "../../../../features/todo/components/TodoAnalitics/TodoAnalyticCharts/TodoAnalyticSattus/TodoAnalyticSattus";
import TodoAnalyticWeeklyCompletion from "../../../../features/todo/components/TodoAnalitics/TodoAnalyticCharts/TodoAnalyticWeeklyCompletion/TodoAnalyticWeeklyCompletion";
import PageHeader from "../../../../components/PageHeader/PageHeader";
import { toast } from "react-toastify";
import AnalyticsSkeleton from "./AnalyticsSkeleton";

const TodoAnalyticsPage = () => {
  const { analytics, analyticsLoading, getTodoAnalytics } = useTodo();
  const [initialRequestComplete, setInitialRequestComplete] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadAnalytics = async () => {
      try {
        await getTodoAnalytics(controller.signal);
      } catch {
        if (!controller.signal.aborted) toast.error("Auswertung konnte nicht geladen werden.");
      } finally {
        if (isMounted) setInitialRequestComplete(true);
      }
    };

    loadAnalytics();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [getTodoAnalytics]);

  if (analyticsLoading || !initialRequestComplete) return <AnalyticsSkeleton />;

  if (!analytics) {
    return (
      <div className="grid gap-6 h-full overflow-scroll">
        <PageHeader
          title="FokusFlow · Einblicke"
          description="Behalte deine Produktivität im Blick und erhalte Einblicke in deine Aufgaben."
        />
        <p role="alert" className="rounded-xl border border-border bg-surface p-5 text-sm text-text-secondary">
          Die Auswertung konnte nicht geladen werden. Bitte versuche es später erneut.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        title="FokusFlow · Einblicke"
        description="Behalte deine Produktivität im Blick und erhalte Einblicke in deine Aufgaben."
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
