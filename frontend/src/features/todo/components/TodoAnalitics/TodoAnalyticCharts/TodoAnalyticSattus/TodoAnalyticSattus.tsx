import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type BarShapeProps,
} from "recharts";
import type { TodoAnalyticsItem } from "../../../../types/todoAnalytics.type";
import { getTodoLabel } from "../../../../utils/todoLabels";

type Props = {
  status: TodoAnalyticsItem[];
};

const statusColors: Record<string, string> = {
  todo: "var(--chart-status-todo)",
  "in-progress": "var(--chart-status-progress)",
  done: "var(--chart-status-done)",
};

const StatusBar = (props: BarShapeProps) => {
  const status = String(props.payload?.name ?? "");

  return <Rectangle {...props} fill={statusColors[status] ?? "var(--chart-status-todo)"} />;
};

const TodoAnalyticStatus = ({ status }: Props) => {
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5">
        <h2 className="font-semibold text-text">Aufgaben nach Status</h2>

        <p className="text-sm text-text-secondary">Aktuelle Aufgabenverteilung</p>
      </div>

      <div className="h-72 text-text-secondary">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={status}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="currentColor"
              opacity={0.3}
            />

            <XAxis
              dataKey="name"
              tickFormatter={getTodoLabel}
              tickLine={false}
              axisLine={false}
              stroke="currentColor"
              opacity={0.6}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              stroke="currentColor"
              opacity={0.6}
            />

            <Tooltip
              contentStyle={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
              }}
              labelStyle={{
                color: "var(--color-text)",
                fontWeight: 600,
              }}
              itemStyle={{ color: "var(--color-text-secondary)" }}
            />

            <Bar dataKey="value" radius={[8, 8, 0, 0]} shape={StatusBar} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TodoAnalyticStatus;
