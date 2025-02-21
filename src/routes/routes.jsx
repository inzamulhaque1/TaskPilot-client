import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Registration from "../pages/authentication/Registration";
import Login from "../pages/authentication/Login";
import Dashboard from "../layout/Dashboard";
import WorkSpace from "../pages/Dashboard/WorkSpace";
import MyProfile from "../pages/Dashboard/MyProfile";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/registration",
    element: <Registration></Registration>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard",
        element: <WorkSpace></WorkSpace>,
      },
      {
        path: "dashboard/profile",
        element: <MyProfile></MyProfile>,
      },
    ],
  },
]);
