import { useSearchParams } from "react-router";
import TodoBar from "../../../features/todo/components/TodoBar/TodoBar";
import TodoHeader from "../../../features/todo/components/TodoHeader/TodoHeader";
import TodoList from "../../../features/todo/components/TodoList/TodoList";
import { useTodo } from "../../../features/todo/store/todo.store";
import { useEffect } from "react";
import Pagination from "../../../components/Pagination/Pagination";

const TodoPage = () => {
  const { getTodos, totalPages, } = useTodo();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;

  useEffect(() => {
    getTodos(searchParams);
  }, [getTodos, searchParams]);

  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr] gap-2 md:gap-4 lg:gap-10">
      <TodoHeader />
      <TodoBar />
      <TodoList />
      <div className="grid justify-center">
       {totalPages> 1&& <Pagination
          page={page || 1}
          maxPages={totalPages}
          onPageChange={(nextPage) => {
            setSearchParams((prev) => {
              if (nextPage === 1 || nextPage < 1 || nextPage > totalPages) {
                prev.delete("page");
              } else {
                prev.set("page", String(nextPage));
              }
              return prev;
            });
          }}
        />}
      </div>
    </div>
  );
};

export default TodoPage;
