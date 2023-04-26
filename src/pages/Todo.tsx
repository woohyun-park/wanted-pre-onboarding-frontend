import { Children, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IDict, ITodo } from "../interfaces";
import { createTodo, deleteTodos, readTodos, updateTodo } from "../apis/todo";

export default function Todo() {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [edits, setEdits] = useState<IDict<ITodo>>({});

  useEffect(() => {
    async function init() {
      setTodos(await readTodos());
    }
    init();
  }, [navigate]);

  function toggleEdit(id: number) {
    if (edits[id]) {
      const newEdits = { ...edits };
      delete newEdits[id];
      setEdits(newEdits);
    } else {
      setEdits({
        ...edits,
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
            const res = await createTodo(newTodo);
            setTodos([...todos, res.data]);
            setNewTodo("");
          }}
        >
          추가
        </button>
      </div>
      <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md ">
        {Children.toArray(
          todos.map((each) => {
            const { id, isCompleted, todo } = each;
            const edit = edits[id];
            return (
              <>
                <li className="w-full p-2 border-b rounded-t-lg">
                  <label className="flex">
                    <input
                      className="w-8 mr-2"
                      type="checkbox"
                      checked={isCompleted}
                      onChange={async () => {
                        const newTodo = {
                          ...each,
                          todo: edit ? edit.todo : todo,
                          isCompleted: !isCompleted,
                        };
                        await updateTodo(newTodo);
                        setTodos(
                          todos.map((todo) =>
                            todo.id === newTodo.id ? newTodo : todo
                          )
                        );
                        edit && toggleEdit(id);
                      }}
                    />
                    {!edit ? (
                      <>
                        <span className="flex items-center w-full">{todo}</span>
                        <button
                          className="mr-1 btn"
                          data-testid="modify-button"
                          onClick={() => toggleEdit(id)}
                        >
                          수정
                        </button>
                        <button
                          className="btn-unfocused"
                          data-testid="delete-button"
                          onClick={async () => {
                            await deleteTodos(id);
                            setTodos(todos.filter((todo) => todo.id !== id));
                          }}
                        >
                          삭제
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          data-testid="modify-input"
                          className="flex items-center w-full px-2 mr-1 border-2 border-teal-500 rounded-md"
                          value={edit.todo}
                          onChange={(e) =>
                            setEdits({
                              ...edits,
                              [id]: {
                                ...edits[id],
                                todo: e.currentTarget.value,
                              },
                            })
                          }
                        />
                        <button
                          data-testid="submit-button"
                          className="mr-1 btn-submit"
                          onClick={async () => {
                            await updateTodo({
                              ...edit,
                            });
                            setTodos(
                              todos.map((newTodo) => {
                                if (newTodo.id === id) return edit;
                                return newTodo;
                              })
                            );
                            toggleEdit(id);
                          }}
                        >
                          제출
                        </button>
                        <button
                          data-testid="cancel-button"
                          className="btn-unfocused"
                          onClick={() => toggleEdit(id)}
                        >
                          취소
                        </button>
                      </>
                    )}
                  </label>
                </li>
              </>
            );
          })
        )}
      </ul>
    </div>
  );
}
