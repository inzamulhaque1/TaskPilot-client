// Dashboard.jsx
import { useEffect, useState } from "react";
import TopRibbon from "../pages/Dashboard/TopRibbon";
import Sidebar from "../pages/Dashboard/Sidebar";
import useAuth from "../hooks/UseAuth";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logOut,user } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  if (!user) {
    window.location.href = "/login";
  }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="exo2">
      <TopRibbon 
        toggleSidebar={toggleSidebar} 
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <div style={{ height: "calc(100vh - 100px)" }} className="flex">
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0 md:w-64"
          } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between overflow-hidden`}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <div className="p-4">
            <button
              onClick={logOut}
              className="bg-red-500 hover:bg-red-600 w-full p-2 rounded text-center"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1 bg-gray-100 overflow-y-auto h-full dark:bg-[#0B0716]">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;