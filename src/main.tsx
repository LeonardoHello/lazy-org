import React from "react";
import ReactDOM from "react-dom/client";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";

import Chart from "./components/routes/chart";
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
    handle: {
      crumb: () => <Link to="/">Home</Link>,
    },
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/chart",
        element: <Chart />,
        handle: {
          crumb: () => <span>Chart</span>,
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
