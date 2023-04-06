import axios from "axios";
import { ITodo } from "./defApi";

export async function createTodo(todo: string) {
  try {
    await axios.post(
      "https://www.pre-onboarding-selection-task.shop/todos",
      { todo },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}

export async function readTodos() {
  try {
    const res = await axios.get(
      "https://www.pre-onboarding-selection-task.shop/todos",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function updateTodos(newTodo: ITodo) {
  try {
    const { id, todo, isCompleted } = newTodo;
    await axios.put(
      `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      { todo, isCompleted },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}

export async function deleteTodos(id: number) {
  try {
    await axios.delete(
      `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}
