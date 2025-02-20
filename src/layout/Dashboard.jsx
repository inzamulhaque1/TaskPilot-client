import { useState } from "react";
import TopRibbon from "../pages/Dashboard/TopRibbon";
import Sidebar from "../pages/Dashboard/Sidebar";
import WorkSpace from "../pages/Dashboard/WorkSpace";
import useAuth from "../hooks/UseAuth";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logOut } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle the sidebar visibility
  };

  return (
    <div>
      <TopRibbon toggleSidebar={toggleSidebar} />{" "}
      {/* Pass the toggle function */}
      <div style={{ height: "calc(100vh - 100px)" }} className="flex  ">
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0 md:w-64"
          } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between`}
        >
          {/*! Sidebar */}
          <Sidebar isSidebarOpen={isSidebarOpen} /> {/* Bottom Section */}
          <div className="p-4">
            <button
              onClick={logOut}
              className="bg-red-500 hover:bg-red-600 w-full p-2 rounded text-center"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 overflow-y-auto h-full dark:bg-[#0B0716] ">
          <WorkSpace></WorkSpace>
        </div>
      </div>
      {/* Pass the state to Sidebar */}
    </div>
  );
};

export default Dashboard;
