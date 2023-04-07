import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout.tsx";
import Sign from "./pages/Sign.tsx";
import TodoList from "./pages/TodoList.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "signup",
        element: <Sign type="signup" />,
      },
      {
        path: "signin",
        element: <Sign type="signin" />,
      },
      {
        path: "todo",
        element: <TodoList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
