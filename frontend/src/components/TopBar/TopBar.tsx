import {
  FiArrowUpRight,
  FiCalendar,
  FiCheckSquare,
} from "react-icons/fi";
import {
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";

import MenuButton from "./MenuButton/MenuButton";

type TodoActivity = {
  day: string;
  completed: number;
};

type Props = {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;

  meetingsToday?: number;
  openTodos?: number;
  todoActivity?: TodoActivity[];
};

const defaultTodoActivity: TodoActivity[] = [
  { day: "Mo", completed: 3 },
  { day: "Di", completed: 5 },
  { day: "Mi", completed: 4 },
  { day: "Do", completed: 7 },
  { day: "Fr", completed: 6 },
  { day: "Sa", completed: 8 },
  { day: "So", completed: 10 },
];

const TopBar = ({
  isSidebarOpen,
  setSidebarOpen,
  meetingsToday = 4,
  openTodos = 7,
  todoActivity = defaultTodoActivity,
}: Props) => {
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const currentCompleted =
    todoActivity[todoActivity.length - 1]?.completed ?? 0;

  const previousCompleted =
    todoActivity[todoActivity.length - 2]?.completed ?? 0;

  const difference = currentCompleted - previousCompleted;

  const percentage =
    previousCompleted > 0
      ? Math.round((difference / previousCompleted) * 100)
      : 0;

  const trendIsPositive = difference >= 0;

  return (
    <header
      className={`
        z-20 flex h-16 items-center justify-between px-4
        transition-colors duration-200
        lg:bg-surface
        ${
          isSidebarOpen
            ? "bg-transparent"
            : "border-b border-border bg-surface"
        }
      `}
    >
      {/* Mobile menu */}
      <div className="z-50 rounded-xl border border-border bg-surface/80 p-1 backdrop-blur-sm lg:hidden">
        <MenuButton
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Statistics */}
      <div className="ml-auto flex items-center gap-4">
        {/* Meetings */}
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary-light text-primary">
            <FiCalendar className="size-4" />
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold tabular-nums text-text">
              {meetingsToday}
            </span>

            <span className="hidden text-xs text-text-muted sm:inline">
              Termine heute
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-border" />

        {/* To-dos */}
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary-light text-primary">
            <FiCheckSquare className="size-4" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-semibold tabular-nums text-text">
                {openTodos}
              </span>

              <span className="hidden text-xs text-text-muted sm:inline">
                To-dos
              </span>
            </div>

            {/* Trend */}
            <div className="hidden items-center gap-1 sm:flex">
              <span
                className={`flex items-center text-[10px] font-semibold ${
                  trendIsPositive ? "text-success" : "text-danger"
                }`}
              >
                <FiArrowUpRight className="size-3" />
                {Math.abs(percentage)}%
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
                        trendIsPositive ? "#22c55e" : "#ef4444"
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
        </div>
      </div>
    </header>
  );
};

export default TopBar;