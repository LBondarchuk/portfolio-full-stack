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
import { getTodoLabel } from "../../../../utils/todoLabels";

type Props = {
  weeklyCompletion: TodoAnalyticsDay[];
};

const dayColors: Record<string, string> = {
  Mon: "var(--chart-week-1)",
  Tue: "var(--chart-week-2)",
  Wed: "var(--chart-week-3)",
  Thu: "var(--chart-week-4)",
  Fri: "var(--chart-week-5)",
  Sat: "var(--chart-week-6)",
  Sun: "var(--chart-week-7)",
};

const WeeklyBar = (props: BarShapeProps) => {
  const day = String(props.payload?.day ?? "");

  return <Rectangle {...props} fill={dayColors[day] ?? "var(--chart-week-1)"} />;
};

const TodoAnalyticWeeklyCompletion = ({ weeklyCompletion }: Props) => {
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5">
        <h2 className="font-semibold text-text">Wöchentlicher Fortschritt</h2>

        <p className="text-sm text-text-secondary">Diese Woche erledigte Aufgaben</p>
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
              opacity={0.3}
            />

            <XAxis
              dataKey="day"
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
              labelStyle={{ color: "var(--color-text)", fontWeight: 600 }}
              itemStyle={{ color: "var(--color-text-secondary)" }}
            />

            <Bar dataKey="value" radius={[8, 8, 0, 0]} shape={WeeklyBar} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TodoAnalyticWeeklyCompletion;
