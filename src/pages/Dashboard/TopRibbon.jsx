/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import useAuth from "../../hooks/UseAuth";
import { FaBars, FaSun, FaMoon, FaBell, FaSearch } from "react-icons/fa"; // Icons
import { motion, AnimatePresence } from "framer-motion"; // For animations
import logo from "../../assets/images/logo/TaskPilot.png"; // Import your logo
import { Link } from "react-router-dom";

const TopRibbon = ({ toggleSidebar }) => {
  const { user, logOut } = useAuth();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentNews, setCurrentNews] = useState(0);
  const [imageError, setImageError] = useState(false); // Track if image fails to load

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

  // Key points to display in the breaking news system
  const newsItems = [
    "🚀 New Task Added: Set up task categories (To-Do, In Progress, Done)",
    "⏰ Deadline Approaching: Complete the drag-and-drop feature by tomorrow",
    "🎉 Task Completed: Real-time updates with MongoDB Change Streams implemented",
    "📅 Meeting Reminder: Sync with backend team at 2 PM for API updates",
    "🔔 Urgent: Resolve bug in task persistence after page reload",
    "🔧 Feature Update: Add dark mode toggle for improved UX",
    "📝 Review Needed: Check UI responsiveness on mobile screens",
    "🔍 Performance Alert: Optimize task list loading speed for large data sets",
    "🗣️ User Feedback: Add option for task due date with color indicators",
    "✅ Task Overdue: Complete user authentication setup with Firebase",
  ];

  // Rotate through news items every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 3000); // Change news every 3 seconds
    return () => clearInterval(interval);
  }, [newsItems.length]);

  // Get first letter of displayName for fallback image
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "G"; // Default to "G" for "Guest"
  };

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="h-auto w-full flex items-center justify-between px-6 py-4 shadow-md bg-gradient-to-r from-[#143D3A] to-[#1A5E5A] dark:from-[#211444] dark:to-[#3A2B7E]">
      {/* Logo and Toggle Button (Visible on all devices) */}
      <div className="flex items-center space-x-4">
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
          <span className="text-white text-lg md:text-xl font-bold hidden md:block">
            TaskPilot
          </span>
        </motion.div>
        <motion.button
          onClick={toggleSidebar}
          className="text-4xl text-white focus:outline-none md:hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaBars />
        </motion.button>
      </div>

      {/* Search Bar (Visible on desktop) */}
      <div className="hidden md:flex flex-1 mx-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search tasks, projects..."
            className="w-full px-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" />
        </div>
      </div>

      {/* Breaking News System (Middle Section) */}
      <div className="hidden md:flex flex-1 mx-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNews}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base font-medium text-white text-center w-full"
          >
            {newsItems[currentNews]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* User Info Section */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className="text-white text-xl focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </motion.button>

        {/* Profile Image & Dropdown Menu */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white">
              {imageError || !user?.photoURL ? (
                <div className="w-full h-full bg-blue-500 dark:bg-blue-700 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
                  {getInitial(user?.displayName)}
                </div>
              ) : (
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              )}
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
          </button>

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#2a1b5e] rounded-lg shadow-lg z-50"
              >
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {user?.displayName || "Guest User"}
                  </p>
                  <div className="mt-2 space-y-2">
                    <Link to={'dashboard/profile'} className="w-full text-left text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3a2b7e] p-2 rounded-lg">
                      Profile
                    </Link>
                    <button onClick={logOut} className="w-full text-left text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3a2b7e] p-2 rounded-lg">
                      Logout
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Notification Bell (Moved to Last) */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-white text-xl focus:outline-none relative"
          >
            <FaBell />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>

          {/* Notification Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#2a1b5e] rounded-lg shadow-lg z-50"
              >
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    Notifications
                  </p>
                  <div className="mt-2 space-y-2">
                    <div className="p-2 bg-gray-100 dark:bg-[#3a2b7e] rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        You have 3 new tasks.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default TopRibbon;