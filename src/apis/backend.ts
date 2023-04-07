import axios from "axios";
import { ITodo } from "./def";

const API_URL = "https://www.pre-onboarding-selection-task.shop";

export async function requestSignin(email: string, password: string) {
  return await axios.post(
    `${API_URL}/auth/signin`,
    {
      email,
      password,
    },
    { headers: { "Content-Type": "application/json" } }
  );
}

export async function requestSignup(email: string, password: string) {
  return await axios.post(
    `${API_URL}/auth/signup`,
    {
      email,
      password,
    },
    { headers: { "Content-Type": "application/json" } }
  );
}

export async function createTodo(todo: string) {
  return await axios.post(
    `${API_URL}/todos`,
    { todo },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    }
  );
}

export async function readTodos() {
  const res = await axios.get(`${API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return res.data;
}

export async function updateTodo(newTodo: ITodo) {
  const { id, todo, isCompleted } = newTodo;
  await axios.put(
    `${API_URL}/todos/${id}`,
    { todo, isCompleted },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    }
  );
}

export async function deleteTodos(id: number) {
  await axios.delete(`${API_URL}/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
}
