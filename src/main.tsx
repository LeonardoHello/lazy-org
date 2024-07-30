import React from "react";
import ReactDOM from "react-dom/client";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";

import axios from "axios";

import Chart from "./components/routes/chart";
import chartLoader from "./components/routes/chart/loader";
import Home from "./components/routes/home";
import homeLoader from "./components/routes/home/loader";
import Root from "./components/routes/root";
import RootError from "./components/routes/root/error";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";

axios.defaults.baseURL = "http://localhost:8000/api/employees";

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
        loader: chartLoader,
        handle: {
          crumb: () => <span>Chart</span>,
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
