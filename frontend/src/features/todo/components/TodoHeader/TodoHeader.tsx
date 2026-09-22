import { useState } from "react";
import Button from "../buttons/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import TodoForm from "../TodoForm/TodoForm";
import { useTodo } from "../../store/todo.store";



const TodoHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getTestTodos= useTodo(state => state.getTestTodos)
  const togleModal= () => {
    setIsModalOpen(prev => !prev)
  }
return (
    <div>
      <div className="grid grid-cols-[1fr_auto_auto] items-center">
        <div>
          <h1 className="text-3xl font-bold text-text">Todo</h1>

          <p className="text-base text-text-secondary">
            Manage your tasks and stay organized.
          </p>
        </div>

        <Button onClick={getTestTodos}>Add Test Todos</Button>

        <Button onClick={togleModal}>Add Todo</Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={togleModal}>
        <TodoForm closeModal={togleModal} />
      </Modal>
    </div>
  );
};

export default TodoHeader;