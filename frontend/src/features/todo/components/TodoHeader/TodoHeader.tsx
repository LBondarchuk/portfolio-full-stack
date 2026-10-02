import { useState } from "react";

import Modal from "../../../../components/modals/Modal/Modal";
import TodoForm from "../TodoForm/TodoForm";
import Button from "../../../../components/buttons/Button/Button";
import PageHeader from "../../../../components/PageHeader/PageHeader";

// import { useTodo } from "../../store/todo.store";

const TodoHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const getTestTodos = useTodo((state) => state.createTestTodos);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="To Do"
          description="Manage your tasks and stay organized."
        />

        <div className="flex flex-wrap gap-3 sm:justify-end">
          {/* <Button onClick={getTestTodos}>
            Add Test Todos
          </Button> */}

          <Button onClick={toggleModal}>Add Todo</Button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <TodoForm closeModal={toggleModal} />
      </Modal>
    </div>
  );
};

export default TodoHeader;
