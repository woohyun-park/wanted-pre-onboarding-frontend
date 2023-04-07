import { useEffect, useState } from "react";

import { IDict, ITodo } from "../apis/def";
import {
  createTodo,
  deleteTodos,
  readTodos,
  updateTodos,
} from "../apis/backend";

export default function Todo() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [edits, setEdits] = useState<IDict<ITodo>>({});

  useEffect(() => {
    async function init() {
      setTodos(await readTodos());
    }
    init();
  }, []);

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

  function Todo({ todo }: { todo: ITodo }) {
    const { id, isCompleted } = todo;
    const edit = edits[id];
    return (
      <li className="flex w-full p-2 break-all border-b rounded-t-lg">
        <label className="flex w-full">
          <input
            className="w-8 mr-2"
            type="checkbox"
            checked={isCompleted}
            onClick={async () => {
              await updateTodos({
                ...todo,
                todo: edit ? edit.todo : todo.todo,
                isCompleted: !isCompleted,
              });
              setTodos(await readTodos());
              edit && toggleEdit(id);
            }}
          />
          {!edit ? (
            <span className="flex items-center w-full">{todo.todo}</span>
          ) : (
            <input
              data-testid="modify-input"
              className="flex items-center w-full px-2 mr-1 border-2 border-teal-500 rounded-md"
              value={edit.todo}
              onChange={(e) =>
                setEdits({
                  ...edits,
                  [id]: {
                    ...edit,
                    todo: e.currentTarget.value,
                  },
                })
              }
            />
          )}
        </label>
        {!edit ? (
          <>
            <button
              data-testid="modify-button"
              className="mr-1 btn"
              onClick={() => toggleEdit(id)}
            >
              수정
            </button>
            <button
              data-testid="delete-button"
              className="btn-unfocused"
              onClick={async () => {
                await deleteTodos(id);
                setTodos(await readTodos());
              }}
            >
              삭제
            </button>
          </>
        ) : (
          <>
            <button
              data-testid="submit-button"
              className="mr-1 btn-submit"
              onClick={async () => {
                await updateTodos({ ...edit });
                toggleEdit(id);
                setTodos(
                  todos.map((newTodo) => {
                    if (newTodo.id === id) return edit;
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
              onClick={() => toggleEdit(id)}
            >
              취소
            </button>
          </>
        )}
      </li>
    );
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
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}
