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
  categories: TodoAnalyticsItem[];
};

const categoryColors: Record<string, string> = {
  work: "#DFE7FF",
  study: "#d0cbed",
  personal: "#FCCEE8",
  other: "#c7d5e2",
};

const CategoryBar = (props: BarShapeProps) => {
  const category = String(props.payload?.name ?? "");

  return <Rectangle {...props} fill={categoryColors[category] ?? "#F1F5F9"} />;
};

const TodoAnalyticCategory = ({ categories }: Props) => {
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5">
        <h2 className="font-semibold text-text">Todos by category</h2>

        <p className="text-sm text-text-secondary">
          Where your tasks are concentrated
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={categories}
            layout="vertical"
            margin={{
              top: 0,
              right: 20,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid
              horizontal={false}
              stroke="currentColor"
              opacity={0.08}
            />

            <XAxis
              type="number"
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              stroke="currentColor"
              opacity={0.6}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={70}
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

            <Bar dataKey="value" radius={[0, 8, 8, 0]} shape={CategoryBar} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TodoAnalyticCategory;
