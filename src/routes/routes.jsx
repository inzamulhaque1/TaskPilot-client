import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Registration from "../pages/authentication/Registration";
import Login from "../pages/authentication/Login";
import Dashboard from "../layout/Dashboard";
import WorkSpace from "../pages/Dashboard/WorkSpace";
import MyProfile from "../pages/Dashboard/MyProfile";

import Test from "../pages/Dashboard/Test";
import Calendar from "../pages/Dashboard/calender";


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
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "calender",
        element: <Calendar></Calendar>,
      },
      {
        path: "test",
        element: <Test></Test>,
      },
    ],
  },
]);
