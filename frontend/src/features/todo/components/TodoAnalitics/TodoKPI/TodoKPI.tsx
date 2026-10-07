import type { TodoSummary } from "../../../types/todoAnalytics.type";
import TodoKPICard from "./TodoKPICard/TodoKPICard";

type Props = {
  summary: TodoSummary;
};

const TodoKPI = ({ summary }: Props) => {
  const { total, completed, inProgress, highPriority, completionRate } =
    summary;

  return (
    <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
      <TodoKPICard title="Aufgaben insgesamt" value={total} />

      <TodoKPICard
        title="Erledigt"
        value={completed}
        subtitle={`${completionRate}% erledigt`}
      />

      <TodoKPICard title="In Bearbeitung" value={inProgress} />

      <TodoKPICard title="Hohe Priorität" value={highPriority} />
    </div>
  );
};

export default TodoKPI;
