import { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { FaChevronLeft, FaChevronRight, FaSnowflake } from "react-icons/fa";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/tasks");
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("Expected an array of tasks, but got:", response.data);
          setTasks([]);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  // Get tasks for a specific date (fixed to use timestamp)
  const getTasksForDate = (date) =>
    tasks.filter((task) => isSameDay(parseISO(task.timestamp), date));

  // Calendar dates
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Navigation
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleDateClick = (day) => setSelectedDate(day);

  // Snowfall effect with random positioning across the full width
  const snowflakes = Array.from({ length: 30 }).map((_, i) => {
    const randomX = () => Math.random() * 10000; // Random X position (0-100%)
    return (
      <motion.div
        key={i}
        className="absolute text-white dark:text-gray-300 pointer-events-none"
        initial={{ x: `${randomX()}%`, y: -20 }}
        animate={{
          y: "100vh",
          x: `${randomX() + (Math.random() - 0.5) * 20}%`, // Slight random sway
          rotate: Math.random() * 360,
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: Math.random() * 2,
        }}
      >
        <FaSnowflake size={Math.random() * 20 + 10} opacity={0.7} />
      </motion.div>
    );
  });

  // Animation variants
  const dayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative mt-10 max-w-4xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-purple-100 via-blue-100 to-teal-100 dark:from-gray-900 dark:via-indigo-900 dark:to-teal-900 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
      {/* Snowfall Effect */}
      <div className="absolute inset-0 z-0">{snowflakes}</div>

      {/* Calendar Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToPreviousMonth}
          className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-md"
        >
          <FaChevronLeft size={18} />
        </motion.button>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-bold text-indigo-800 dark:text-indigo-200"
        >
          {format(currentDate, "MMMM yyyy")}
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToNextMonth}
          className="p-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 shadow-md"
        >
          <FaChevronRight size={18} />
        </motion.button>
      </div>

      {/* Weekday Headers */}
      <div className="relative z-10 grid grid-cols-7 gap-2 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-indigo-600 dark:text-indigo-300"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <AnimatePresence>
        <motion.div
          key={currentDate.toISOString()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-10 grid grid-cols-7 gap-2"
        >
          {days.map((day, index) => (
            <motion.div
              key={index}
              variants={dayVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => handleDateClick(day)}
              className={`p-2 sm:p-3 rounded-xl cursor-pointer transition-all duration-200 text-center ${
                !isSameMonth(day, monthStart)
                  ? "text-gray-400 dark:text-gray-600 bg-transparent"
                  : isSameDay(day, new Date())
                  ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-indigo-900"
              }`}
            >
              <div
                className={`text-sm sm:text-base font-medium ${
                  isSameDay(day, new Date())
                    ? "text-white"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {format(day, "d")}
              </div>
              {/* Task Indicators */}
              {getTasksForDate(day).length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-1 flex justify-center gap-1"
                >
                  {getTasksForDate(day).slice(0, 3).map((task) => (
                    <div
                      key={task._id}
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500"
                      title={task.title}
                    />
                  ))}
                  {getTasksForDate(day).length > 3 && (
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      +{getTasksForDate(day).length - 3}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Selected Date Details */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200">
            Tasks for {format(selectedDate, "MMMM d, yyyy")}
          </h3>
          <ul className="mt-2 space-y-2 max-h-40 overflow-y-auto">
            {getTasksForDate(selectedDate).map((task) => (
              <motion.li
                key={task._id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-sm p-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-indigo-900 dark:to-teal-900 rounded-lg text-gray-700 dark:text-gray-300"
              >
                {task.title}
              </motion.li>
            ))}
            {getTasksForDate(selectedDate).length === 0 && (
              <li className="text-sm text-gray-500 dark:text-gray-400">
                No tasks for this day.
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Calendar;