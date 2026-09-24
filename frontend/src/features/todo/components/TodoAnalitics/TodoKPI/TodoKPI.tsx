import type { TodoSummary } from "../../../types/todoAnalytics.type";
import TodoKPICard from "./TodoKPICard/TodoKPICard";

type Props = {
  summary: TodoSummary;
};

const TodoKPI = ({ summary }: Props) => {
  const {
    total,
    completed,
    inProgress,
    highPriority,
    completionRate,
  } = summary;

  return (
    <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
      <TodoKPICard
        title="Total Todos"
        value={total}
      />

      <TodoKPICard
        title="Completed"
        value={completed}
        subtitle={`${completionRate}% completion rate`}
      />

      <TodoKPICard
        title="In Progress"
        value={inProgress}
      />

      <TodoKPICard
        title="High Priority"
        value={highPriority}
      />
    </div>
  );
};

export default TodoKPI;