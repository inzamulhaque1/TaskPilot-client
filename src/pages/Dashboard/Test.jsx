import  { useState, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const Test = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]); // Initialize as an empty array

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/tasks");
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("Expected an array of tasks, but got:", response.data);
          setTasks([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setTasks([]); // Fallback to an empty array
      }
    };

    fetchTasks();
  }, []);

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    if (!Array.isArray(tasks)) {
      return []; // Return an empty array if tasks is not an array
    }
    return tasks.filter((task) => isSameDay(new Date(task.date), date));
  };

  // Get the start and end of the current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  // Generate all days in the current month
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Handle date selection
  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <FaChevronRight className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Weekday Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)}
            className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400 dark:text-gray-600"
                : isSameDay(day, new Date())
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <div className="text-center">{format(day, "d")}</div>
            {/* Display Tasks for the Day */}
            {getTasksForDate(day).map((task) => (
              <div
                key={task._id}
                className="text-xs mt-1 p-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded truncate"
              >
                {task.title}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Tasks for {format(selectedDate, "MMMM d, yyyy")}
          </h3>
          <ul className="mt-2 space-y-2">
            {getTasksForDate(selectedDate).map((task) => (
              <li
                key={task._id}
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                {task.title}
              </li>
            ))}
            {getTasksForDate(selectedDate).length === 0 && (
              <li className="text-sm text-gray-500 dark:text-gray-400">
                No tasks for this day.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Test;