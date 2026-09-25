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

type Props = {
  status: TodoAnalyticsItem[];
};

const statusColors: Record<string, string> = {
  todo: "#e2e8f0",
  "in-progress": "#c4d5ed",
  done: "#c1ddd6",
};

const StatusBar = (props: BarShapeProps) => {
  const status = String(props.payload?.name ?? "");

  return <Rectangle {...props} fill={statusColors[status] ?? "#e2e8f0"} />;
};

const TodoAnalyticStatus = ({ status }: Props) => {
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5">
        <h2 className="font-semibold text-text">Todos by status</h2>

        <p className="text-sm text-text-secondary">Current task distribution</p>
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
              opacity={0.08}
            />

            <XAxis
              dataKey="name"
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
            />

            <Bar dataKey="value" radius={[8, 8, 0, 0]} shape={StatusBar} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TodoAnalyticStatus;
