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

import type { TodoAnalyticsDay } from "../../../../types/todoAnalytics.type";

type Props = {
  weeklyCompletion: TodoAnalyticsDay[];
};

const dayColors: Record<string, string> = {
  Mon: "#DFE7FF",
  Tue: "#ECE9FF",
  Wed: "#FCCEE8",
  Thu: "#F1F5F9",
  Fri: "#D2E0F4",
  Sat: "#DEF2ED",
  Sun: "#F7E9D4",
};

const WeeklyBar = (props: BarShapeProps) => {
  const day = String(props.payload?.day ?? "");

  return <Rectangle {...props} fill={dayColors[day] ?? "#F1F5F9"} />;
};

const TodoAnalyticWeeklyCompletion = ({ weeklyCompletion }: Props) => {
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5">
        <h2 className="font-semibold text-text">Weekly progress</h2>

        <p className="text-sm text-text-secondary">Completed tasks this week</p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyCompletion}
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
              dataKey="day"
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
            />

            <Bar dataKey="value" radius={[8, 8, 0, 0]} shape={WeeklyBar} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TodoAnalyticWeeklyCompletion;
