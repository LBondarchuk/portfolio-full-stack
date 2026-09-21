import TodoBar from "../../../features/todo/components/TodoBar/TodoBar";
import TodoHeader from "../../../features/todo/components/TodoHeader/TodoHeader";
import TodoList from "../../../features/todo/components/TodoList/TodoList";
import { useTodo } from "../../../features/todo/store/todo.store";
import { useEffect } from "react";

const TodoPage = () => {
  const getTodos = useTodo(state => state.getTodos)

  useEffect(() => {
    getTodos()
  },[])

  
  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr] gap-10">
      <TodoHeader />
      <TodoBar/>
      <TodoList />
    </div>
  );
};

export default TodoPage;