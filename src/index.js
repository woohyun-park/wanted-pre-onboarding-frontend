import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout.tsx";
import Sign from "./pages/Sign.tsx";
import Todo from "./pages/Todo.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: (
      <Layout>
        <Sign type="signup" />
      </Layout>
    ),
  },
  {
    path: "/signin",
    element: (
      <Layout>
        <Sign type="signin" />
      </Layout>
    ),
  },
  {
    path: "/todos",
    element: (
      <Layout>
        <Todo />
      </Layout>
    ),
  },
  {
    path: "/*",
    element: <Layout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
