import { useEffect, useState } from "react";
import { useTodo } from "../../../../features/todo/store/todo.store";

const useTodoCompletion = () => {
  const getTodoActivity = useTodo((state) => state.getTodoActivity);
  const todoActivity = useTodo((state) => state.todoActivity);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadActivity = async () => {
      try {
        await getTodoActivity(controller.signal);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to load todo activity:", error);
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadActivity();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [getTodoActivity]);

  const currentCompleted = todoActivity[todoActivity.length - 1]?.completed ?? 0;
  const previousCompleted = todoActivity[todoActivity.length - 2]?.completed ?? 0;
  const difference = currentCompleted - previousCompleted;
  const percentage =
    previousCompleted > 0
      ? Math.round((Math.abs(difference) / previousCompleted) * 100)
      : currentCompleted > 0
        ? 100
        : 0;

  return {
    todoActivity,
    currentCompleted,
    percentage,
    trendIsPositive: difference > 0,
    trendIsNegative: difference < 0,
    isLoading,
  };
};

export default useTodoCompletion;
