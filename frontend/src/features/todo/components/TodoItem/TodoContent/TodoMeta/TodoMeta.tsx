import { useState } from "react";
import type { Category, Priority, Status } from "../../../../types/todo.type";
import { MetaStyles } from "./todoMeta.styles";
import { getTodoLabel } from "../../../../utils/todoLabels";

type BadgeKey = "category" | "status" | "priority";

type Props = {
  category: Category;
  status: Status;
  priority: Priority;
  isDone: boolean;
  compactOnMobile?: boolean;
};

const TodoMeta = ({
  category,
  status,
  priority,
  isDone,
  compactOnMobile = false,
}: Props) => {
  const [expandedBadge, setExpandedBadge] = useState<BadgeKey | null>(null);
  const doneClass = isDone
    ? "bg-gray-light text-text-secondary border border-border"
    : "";

  const badges: { key: BadgeKey; label: string; styles: string }[] = [
    { key: "category", label: getTodoLabel(category), styles: MetaStyles.category[category] },
    { key: "status", label: getTodoLabel(status), styles: MetaStyles.status[status] },
    { key: "priority", label: getTodoLabel(priority), styles: MetaStyles.priority[priority] },
  ];

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {badges.map(({ key, label, styles }) => {
        const badgeStyles = isDone ? doneClass : styles;

        if (!compactOnMobile) {
          return (
            <span
              key={key}
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs ${badgeStyles}`}
            >
              {label}
            </span>
          );
        }

        const isExpanded = expandedBadge === key;

        return (
          <button
            key={key}
            type="button"
            aria-label={`Kennzeichnung: ${label}`}
            aria-expanded={isExpanded}
            onClick={(event) => {
              event.stopPropagation();
              setExpandedBadge((current) => (current === key ? null : key));
            }}
            className="
            cursor-pointer md:cursor-auto
            inline-flex min-h-8 min-w-8 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:min-h-0 sm:min-w-0"
          >
            <span
              className={`inline-flex
             items-center justify-center overflow-hidden

             whitespace-nowrap rounded-md text-xs transition-all duration-200 ${badgeStyles} ${isExpanded ? "h-auto w-auto px-2 py-1 text-xs" : "size-3 p-0 text-[0px]"} sm:h-auto sm:w-auto sm:px-2 sm:py-1 sm:text-xs`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TodoMeta;
