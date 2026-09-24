import {
  PieChart,
  Pie,
  Sector,
  Tooltip,
  ResponsiveContainer,
  type PieSectorShapeProps,
} from "recharts";

import type { TodoAnalyticsItem } from "../../../../types/todoAnalytics.type";

type Props = {
  priorities: TodoAnalyticsItem[];
};

const priorityColors: Record<string, string> = {
  high: "#FFCACA",
  medium: "#F7E9D4",
  low: "#E2E8F1",
};

const PriorityShape = (props: PieSectorShapeProps) => {
  const priority = String(props.payload?.name ?? "");

  return (
    <Sector
      {...props}
      fill={priorityColors[priority] ?? "#E2E8F1"}
    />
  );
};

const TodoAnalyticPriority = ({ priorities }: Props) => {
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5">
        <h2 className="font-semibold text-text">
          Priority distribution
        </h2>

        <p className="text-sm text-text-secondary">
          Number of tasks by priority
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={priorities}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              shape={PriorityShape}
            />

            <Tooltip
              contentStyle={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-5 text-sm text-text-secondary">
        {priorities.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor:
                  priorityColors[item.name] ?? "#E2E8F1",
              }}
            />

            <span>
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoAnalyticPriority;