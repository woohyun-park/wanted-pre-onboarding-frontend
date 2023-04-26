import { useState } from "react";
import { deleteTodos, updateTodo } from "../apis/todo";
import { useInput } from "../hooks/useInput";
import { ITodo } from "../interfaces";

interface ITodoItem {
  todo: ITodo;
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

export default function TodoItem({ todo, todos, setTodos }: ITodoItem) {
  const [isEditing, setIsEditing] = useState(false);
  const { inputValue, updateValue, handleChange, handleSubmit } = useInput(
    todo,
    onSubmit
  );

  async function onSubmit() {
    await updateTodo({
      ...inputValue,
    });
    setTodos(
      todos.map((newTodo) => {
        if (newTodo.id === inputValue.id) return inputValue;
        return newTodo;
      })
    );
    updateValue(inputValue);
    setIsEditing(!setIsEditing);
  }

  function handleCancel() {
    updateValue(todo);
    toggleEdit();
  }

  async function handleDelete() {
    await deleteTodos(inputValue.id);
    const newTodos = todos.filter((todo) => todo.id !== inputValue.id);
    setTodos(newTodos);
  }

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  async function toggleComplete() {
    const newTodo = {
      ...inputValue,
      isCompleted: !todo.isCompleted,
    };
    await updateTodo(newTodo);
    setTodos(todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo)));
    isEditing && toggleEdit();
  }

  return (
    <>
      <li className="w-full p-2 border-b rounded-t-lg">
        <label className="flex">
          <input
            className="w-8 mr-2"
            type="checkbox"
            checked={todo.isCompleted}
            onChange={toggleComplete}
          />
          {!isEditing ? (
            <>
              <span className="flex items-center w-full">
                {inputValue.todo}
              </span>
              <button
                className="mr-1 btn"
                data-testid="modify-button"
                onClick={toggleEdit}
              >
                수정
              </button>
              <button
                className="btn-unfocused"
                data-testid="delete-button"
                onClick={handleDelete}
              >
                삭제
              </button>
            </>
          ) : (
            <>
              <input
                name="todo"
                data-testid="modify-input"
                className="flex items-center w-full px-2 mr-1 border-2 border-teal-500 rounded-md"
                value={inputValue.todo}
                onChange={handleChange}
              />
              <button
                data-testid="submit-button"
                className="mr-1 btn-submit"
                onClick={handleSubmit}
              >
                제출
              </button>
              <button
                data-testid="cancel-button"
                className="btn-unfocused"
                onClick={handleCancel}
              >
                취소
              </button>
            </>
          )}
        </label>
      </li>
    </>
  );
}
