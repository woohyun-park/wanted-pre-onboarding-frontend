import { createTodo } from "../apis/todo";
import { useInput } from "../hooks/useInput";
import { ITodo } from "../interfaces";

interface ITodoNew {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

export default function TodoNew({ todos, setTodos }: ITodoNew) {
  const { inputValue, handleChange, handleSubmit } = useInput(
    {
      todo: "",
    },
    async () => {
      const res = await createTodo(inputValue.todo);
      setTodos([...todos, res.data]);
    }
  );

  return (
    <div className="flex mb-2">
      <input
        name="todo"
        data-testid="new-todo-input"
        className="mr-2 input"
        value={inputValue.todo}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button
        data-testid="new-todo-add-button"
        className="btn"
        onClick={handleSubmit}
      >
        추가
      </button>
    </div>
  );
}
