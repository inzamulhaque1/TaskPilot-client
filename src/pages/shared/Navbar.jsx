import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/UseAuth";
import { FaSun, FaMoon } from "react-icons/fa"; // Icons for dark mode toggle
import logo from "../../assets/images/logo/TaskPilot1.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply theme on mount and on toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".avatar-container")) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#1B4D3E] dark:bg-[#211444] transition-colors duration-300 sticky top-0 z-50 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-60">
      <div className="p-4 w-9/12 mx-auto flex justify-between items-center">
        <div className="text-white text-2xl libre font-bold">
          <img className="h-[60px] rounded-xl" src={logo} alt="TaskPilot Logo" />
        </div>

        {/* Center Menu Items */}
        <div className="flex flex-1 justify-center space-x-6">
          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300"
                activeClassName="text-blue-500"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/dashboard"
                className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300"
                activeClassName="text-blue-500"
              >
                Tasks
              </NavLink>
              <NavLink
                to="/dashboard"
                className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300"
                activeClassName="text-blue-500"
              >
                Profile
              </NavLink>
            </>
          ) : null}
        </div>

        <div className="flex space-x-4 items-center">
          {/* Dark Mode Toggle with Animation */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-white text-xl focus:outline-none relative w-6 h-6 flex items-center justify-center"
            aria-label="Toggle dark mode"
          >
            <span
              className={`absolute transition-all duration-500 ease-in-out ${
                darkMode
                  ? "opacity-0 rotate-90 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            >
              <FaMoon />
            </span>
            <span
              className={`absolute hover:rotate-360 transition-all duration-500 ease-in-out ${
                darkMode
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-0"
              }`}
            >
              <FaSun />
            </span>
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/registration"
                className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
              >
                Registration
              </Link>
            </>
          ) : (
            <div className="flex justify-center items-center gap-4 font-bold">
              {/* User Avatar with Tooltip */}
              <div className="relative avatar-container">
                <div
                  className="avatar online cursor-pointer"
                  onClick={() => setShowTooltip((prev) => !prev)}
                >
                  <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full">
                    <img
                      className="h-10 w-10 lg:h-12 lg:w-12 rounded-full"
                      src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                      alt="User Avatar"
                    />
                  </div>
                </div>

                {/* Tooltip Button */}
                {showTooltip && (
                  <div className="absolute z-10 top-full mt-2 -right-10 bg-lime-500 p-2 text-black shadow-lg rounded-md flex flex-col gap-2">
                    <Link
                      to="/dashboard"
                      className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logOut}
                      className="bg-white text-red-500 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
