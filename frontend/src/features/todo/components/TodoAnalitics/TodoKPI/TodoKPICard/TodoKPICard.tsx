import { useEffect, useState } from "react";
import { animate } from "motion";

type TodoKPICardProps = {
  title: string;
  value: number;
  subtitle?: string;
};

const TodoKPICard = ({
  title,
  value,
  subtitle,
}: TodoKPICardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = Math.min(1.5, 0.5 + value / 50);

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCount(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [value]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-sm text-text-secondary">{title}</p>

      <p className="mt-2 text-3xl font-bold text-text">
        {count}
      </p>

      {subtitle && (
        <p className="mt-1 text-sm text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default TodoKPICard;