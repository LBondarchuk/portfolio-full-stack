import Modal from "../../../../../components/modals/Modal/Modal";
import type { Todo } from "../../../types/todo.type";
import TodoActions from "../TodoActions/TodoActions";
import TodoMeta from "../TodoContent/TodoMeta/TodoMeta";

type Props = {
  todo: Todo;
  isOpen: boolean;
  onClose: () => void;
};

const formatDateTime = (date: string) => {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const TodoModal = ({ todo, isOpen, onClose }: Props) => {
  const {
    title,
    description,
    category,
    status,
    priority,
    createdAt,
    dueDate,
  } = todo;

  const isDone = status === "done";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid gap-6">
        <div>
          <h2
            className={`text-2xl font-semibold ${
              isDone
                ? "text-text-secondary line-through opacity-60"
                : "text-text"
            }`}
          >
            {title}
          </h2>
        </div>

        <div className="max-h-80 overflow-y-auto">
          <p className="wrap-break-word whitespace-pre-wrap text-sm leading-6 text-text-secondary">
            {description || "No description"}
          </p>
        </div>

        <TodoMeta
          category={category}
          status={status}
          priority={priority}
          isDone={isDone}
        />

        <div className="grid gap-2 text-sm text-text-secondary">
          <div>
            <span className="font-medium text-text">Created:</span>{" "}
            {formatDateTime(createdAt)}
          </div>

          {dueDate && (
            <div>
              <span className="font-medium text-text">Due date:</span>{" "}
              {formatDateTime(dueDate)}
            </div>
          )}
        </div>

        <TodoActions todo={todo} />
      </div>
    </Modal>
  );
};

export default TodoModal;