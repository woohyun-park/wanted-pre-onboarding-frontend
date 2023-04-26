import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ITodo } from "../interfaces";
import { readTodos } from "../apis/todo";
import TodoNew from "../components/TodoNew";
import TodoItem from "../components/TodoItem";

export default function Todo() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    async function init() {
      setTodos(await readTodos());
    }
    init();
  }, [navigate]);

  return (
    <div className="m-4">
      <TodoNew todos={todos} setTodos={setTodos} />
      <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md ">
        {todos.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              key={todo.id}
            />
          );
        })}
      </ul>
    </div>
  );
}
