import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./components/routes/home";
import homeLoader from "./components/routes/home/loader";
import Root from "./components/routes/root";
import RootError from "./components/routes/root/error";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RootError />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
