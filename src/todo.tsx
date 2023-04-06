import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IDict, ITodo } from "./api/defApi";
import { createTodo, deleteTodos, readTodos, updateTodos } from "./api/todoApi";

export default function Todo() {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [tempTodos, setTempTodos] = useState<IDict<ITodo>>({});

  useEffect(() => {
    async function init() {
      !localStorage.getItem("access_token") && navigate("/signin");
      setTodos(await readTodos());
    }
    init();
  }, []);

  function toggleUpdate(id: number) {
    if (tempTodos[id]) {
      const newTempTodos = { ...tempTodos };
      delete newTempTodos[id];
      setTempTodos(newTempTodos);
    } else {
      setTempTodos({
        ...tempTodos,
        [id]: todos.find((todo) => todo.id === id),
      });
    }
  }

  return (
    <div className="m-4">
      <div className="flex mb-2">
        <input
          data-testid="new-todo-input"
          className="mr-2 input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.currentTarget.value)}
        />
        <button
          data-testid="new-todo-add-button"
          className="btn"
          onClick={async () => {
            await createTodo(newTodo);
            setTodos(await readTodos());
            setNewTodo("");
          }}
        >
          추가
        </button>
      </div>
      <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md ">
        {todos.map((todo) => (
          <>
            <li className="w-full p-2 border-b rounded-t-lg">
              <label className="flex">
                <input
                  className="w-8 mr-2"
                  type="checkbox"
                  checked={todo.isCompleted}
                  onClick={async () => {
                    await updateTodos({
                      ...todo,
                      isCompleted: !todo.isCompleted,
                    });
                    setTodos(await readTodos());
                  }}
                  disabled={tempTodos[todo.id] ? true : false}
                />
                {!tempTodos[todo.id] ? (
                  <>
                    <span className="flex items-center w-full">
                      {todo.todo}
                    </span>
                    <button
                      className="mr-1 btn"
                      data-testid="modify-button"
                      onClick={() => toggleUpdate(todo.id)}
                    >
                      수정
                    </button>
                    <button
                      className="btn-unfocused"
                      data-testid="delete-button"
                      onClick={async () => {
                        await deleteTodos(todo.id);
                        setTodos(await readTodos());
                      }}
                    >
                      삭제
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      className="flex items-center w-full px-2 mr-1 border-2 border-teal-500 rounded-md"
                      data-testid="modify-input"
                      value={tempTodos[todo.id].todo}
                      onChange={(e) =>
                        setTempTodos({
                          ...tempTodos,
                          [todo.id]: {
                            ...tempTodos[todo.id],
                            todo: e.currentTarget.value,
                          },
                        })
                      }
                    />
                    <button
                      data-testid="submit-button"
                      className="mr-1 btn-submit"
                      onClick={async () => {
                        await updateTodos({
                          ...tempTodos[todo.id],
                        });
                        toggleUpdate(todo.id);
                        setTodos(
                          todos.map((newTodo) => {
                            if (newTodo.id === todo.id)
                              return tempTodos[todo.id];
                            return newTodo;
                          })
                        );
                      }}
                    >
                      제출
                    </button>
                    <button
                      data-testid="cancel-button"
                      className="btn-unfocused"
                      onClick={async () => {
                        toggleUpdate(todo.id);
                      }}
                    >
                      취소
                    </button>
                  </>
                )}
              </label>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}
