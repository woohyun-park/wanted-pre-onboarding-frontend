import { ITodo } from "../interfaces";
import http from "./http";

function getHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  };
}

export async function createTodo(todo: string) {
  return await http.post("/todos", { todo }, getHeaders());
}

export async function readTodos() {
  const res = await http.get("/todos", getHeaders());
  return res.data;
}

export async function updateTodo(newTodo: ITodo) {
  const { id, todo, isCompleted } = newTodo;
  await http.put(`/todos/${id}`, { todo, isCompleted }, getHeaders());
}

export async function deleteTodos(id: number) {
  await http.delete(`/todos/${id}`, getHeaders());
}
