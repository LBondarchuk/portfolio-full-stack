import { useState } from "react";
import { useTodo } from "../../../store/todo.store";
import TodoForm from "../../TodoForm/TodoForm";
import Modal from "../../../../../components/Modal/Modal";
import type { Todo } from "../../../types/todo.type";

type Props = {
  todo: Todo
};

const TodoActions = ({  todo }: Props) => {
  const { deleteTodo } = useTodo()
  const [isEditOpen, setEditOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {createdAt, dueDate, ...itemToEdit}= todo
  
  return (
    <div className="grid grid-cols-2 gap-2  items-center">
      <button
        type="button"
        onClick={()=>{setEditOpen(true)}}
        className="rounded-md px-3 py-2 h-fit text-sm text-text-secondary transition-colors duration-200 hover:bg-gray-light hover:text-text cursor-pointer"
      >
        Edit
      </button>

      <button
        type="button"
        onClick={()=> deleteTodo(todo.id)}
        className="rounded-md px-3 py-2  h-fit text-sm text-danger transition-colors duration-200 hover:bg-red-50 cursor-pointer"
      >
        Delete
      </button>
      <Modal isOpen={ isEditOpen} onClose={()=>{setEditOpen(false)}}>
      <TodoForm closeModal={()=>{setEditOpen(false)}} initialValues={itemToEdit}>

        </TodoForm>
        </Modal>
    </div>
  );
};

export default TodoActions;