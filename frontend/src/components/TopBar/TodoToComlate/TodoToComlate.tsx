import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiCheckSquare,
} from "react-icons/fi";
import { Link } from "react-router";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import TodoToComlateSkeleton from "./Skeleton/TodoToComlateSkeleton";
import useTodoCompletion from "./hooks/useTodoCompletion";

const TodoToComlate = () => {
  const {
    todoActivity,
    currentCompleted,
    percentage,
    trendIsPositive,
    trendIsNegative,
    isLoading,
  } = useTodoCompletion();

  if (isLoading) return <TodoToComlateSkeleton />;
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary-light text-primary">
        <FiCheckSquare className="size-4" />
      </div>

      <Link to="/dashboard/todo">
        <div className="flex items-center gap-2">


          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold tabular-nums text-text">
              {currentCompleted}
            </span>

            <span className="hidden text-xs text-text-muted sm:inline">
              To-dos
            </span>
          </div>

          <div className="hidden items-center gap-1 sm:flex">
            <span
              className={`flex items-center text-[10px] font-semibold ${
                trendIsPositive
                  ? "text-success"
                  : trendIsNegative
                    ? "text-danger"
                    : "text-text-muted"
              }`}
            >
              {trendIsPositive ? (
                <FiArrowUpRight className="size-3" />
              ) : trendIsNegative ? (
                <FiArrowDownRight className="size-3" />
              ) : null}
              {percentage}%
            </span>

            <div className="h-6 w-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={todoActivity}
                  margin={{
                    top: 4,
                    right: 0,
                    bottom: 4,
                    left: 0,
                  }}
                >
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke={
                      trendIsPositive
                        ? "#22c55e"
                        : trendIsNegative
                          ? "#ef4444"
                          : "#94a3b8"
                    }
                    strokeWidth={1.8}
                    dot={false}
                    activeDot={false}
                    isAnimationActive
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TodoToComlate;
