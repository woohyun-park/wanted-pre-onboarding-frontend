import React from "react";
import ReactDOM from "react-dom/client";
import Sign from "./sign.tsx";
import Todo from "./todo.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>default</>,
  },
  {
    path: "/signup",
    element: <Sign type="signup" />,
  },
  {
    path: "/signin",
    element: <Sign type="signin" />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
