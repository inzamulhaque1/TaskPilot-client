/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import useAuth from "../../hooks/UseAuth";
import { FaBars, FaSun, FaMoon } from "react-icons/fa"; // Icons for menu & theme toggle

const TopRibbon = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply theme on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="h-auto w-full flex items-center justify-between px-6 py-4 shadow-md dark:bg-[#211444] bg-[#143D3A]">
      {/* Toggle Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-4xl text-white focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* User Info Section */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-white text-xl focus:outline-none"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Profile Image & User Name */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:flex">
            <div className="text-white text-center md:text-left">
              <p className="text-sm md:text-lg font-medium">
                {user?.displayName || "Guest User"}
              </p>
              {user?.email && (
                <p className="text-xs md:text-sm font-light">{user.email}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRibbon;
