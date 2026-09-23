import { useState } from "react";
import Button from "../buttons/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import TodoForm from "../TodoForm/TodoForm";

// import { useTodo } from "../../store/todo.store";

const TodoHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const getTestTodos = useTodo((state) => state.getTestTodos);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">Todo</h1>

          <p className="text-base text-text-secondary">
            Manage your tasks and stay organized.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 sm:justify-end">
          {/* <Button onClick={getTestTodos}>
            Add Test Todos
          </Button> */}

          <Button onClick={toggleModal}>
            Add Todo
          
          </Button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <TodoForm closeModal={toggleModal} />
      </Modal>
    </div>
  );
};

export default TodoHeader;