/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaHome, FaUser,  FaCalendarAlt } from "react-icons/fa"; // Icons from react-icons

const Sidebar = ({ isSidebarOpen }) => {
  // Sidebar navigation items relevant to TaskPilot
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "dashboard/profile", label: "My Profile", icon: <FaUser /> },
    { path: "/calendar", label: "Calendar", icon: <FaCalendarAlt /> },
   
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-0 md:w-64"
      } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between h-[calc(100vh-104px)] overflow-hidden`}
    >
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg text-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
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