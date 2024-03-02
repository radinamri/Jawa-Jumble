import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Profile";
import Wares from "./pages/Wares/Wares";
import Login from "./pages/Registration-Login/Login";
import Registration from "./pages/Registration-Login/Registration";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/wares",
    element: <Wares />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
