/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaHome, FaUser, FaCalendarAlt } from "react-icons/fa"; // Icons from react-icons

const Sidebar = ({ isSidebarOpen,toggleSidebar }) => {
  // Sidebar navigation items relevant to TaskPilot
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "profile", label: "My Profile", icon: <FaUser /> },
    { path: "calender", label: "Calendar", icon: <FaCalendarAlt /> },
  ];

 

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-0 md:w-64"
      } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between h-[calc(100vh-104px)] overflow-hidden dark:bg-gray-900 dark:text-gray-100`}
    >
      <div className="p-4" >
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink onClick={toggleSidebar}
                to={item.path} 
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg text-lg transition-all duration-200 ${
                    isActive
                      ? "text-white shimmer-border" // Apply shimmer border effect when active
                      : "text-gray-300 hover:bg-blue-700 hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className={`${isSidebarOpen ? "block" : "hidden md:block"}`}>
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
