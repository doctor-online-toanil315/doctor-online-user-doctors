import { Outlet } from "react-router-dom";
import { NavigationManager } from "../HOC";
import { Login } from "../pages";
import { SignUp } from "../pages/SignUp";

const routes = [
  {
    path: "/*",
    element: (
      <NavigationManager>
        <Outlet />
      </NavigationManager>
    ),
    children: [
      {
        index: true,
        element: <p>Auth App</p>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
