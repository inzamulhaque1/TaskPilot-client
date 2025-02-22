/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import moment from "moment";
import io from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";


const API_URL = "https://taskpilot-server-pied.vercel.app";
const socket = io(API_URL);

const WorkSpace = () => {
  const [tasks, setTasks] = useState({
    "To-Do": [],
    "In Progress": [],
    Done: [],
  });
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  // Add new state for editing
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    fetchTasks();
  
    socket.on("taskCreated", handleTaskCreated);
    socket.on("taskUpdated", (task) => {
      setTasks((prev) => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach((category) => {
          newTasks[category] = newTasks[category].filter(
            (t) => t._id !== task._id
          );
        });
        newTasks[task.category].push(task);
        return newTasks;
      });
    });
    socket.on("taskDeleted", handleTaskDeleted);
  
    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      const tasksByCategory = {
        "To-Do": [],
        "In Progress": [],
        Done: [],
      };

      response.data.forEach((task) => {
        if (task._id && tasksByCategory[task.category]) {
          tasksByCategory[task.category].push(task);
        }
      });

      setTasks(tasksByCategory);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskCreated = (task) => {
    if (task._id && task.category) {
      setTasks((prev) => ({
        ...prev,
        [task.category]: [...prev[task.category], task],
      }));
    }
  };

  const handleTaskUpdated = (task) => {
    if (task._id && task.category) {
      setTasks((prev) => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach((category) => {
          newTasks[category] = newTasks[category].filter(
            (t) => t._id !== task._id
          );
        });
        newTasks[task.category].push(task);
        return newTasks;
      });
    }
  };

  const handleTaskDeleted = (taskId) => {
    if (taskId) {
      setTasks((prev) => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach((category) => {
          newTasks[category] = newTasks[category].filter(
            (t) => t._id !== taskId
          );
        });
        return newTasks;
      });
    }
  };

  //

  const handleEditTask = (task) => {
    setEditingTask(task._id);
    setEditedTask({
      title: task.title,
      description: task.description || "",
      category: task.category,
    });
  };

  const handleUpdateTask = async (taskId, e) => {
    e.preventDefault();
    if (!editedTask.title) return;
  
    try {
      const response = await axios.put(
        `${API_URL}/tasks/${taskId}`,
        editedTask
      );
      const updatedTask = response.data; // Assuming the server returns the updated task
  
      // Update the state immediately
      setTasks((prev) => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach((category) => {
          newTasks[category] = newTasks[category].map((task) =>
            task._id === taskId ? { ...task, ...editedTask } : task
          );
        });
        // newTasks[updatedTask.category].push(updatedTask);
        return newTasks;
      });
  
      // Reset the editing state
      setEditingTask(null);
      setEditedTask({ title: "", description: "", category: "" });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditedTask({ title: "", description: "", category: "" });
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside the list or at the same position, do nothing
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const sourceCategory = source.droppableId;
    const destCategory = destination.droppableId;

    // Copy the current task state
    const updatedTasks = { ...tasks };
    const sourceTasks = [...updatedTasks[sourceCategory]];
    const destTasks =
      sourceCategory === destCategory
        ? sourceTasks
        : [...updatedTasks[destCategory]];

    // Find the dragged task
    const movingTask = sourceTasks[source.index];

    if (!movingTask) return;

    // Remove from source
    sourceTasks.splice(source.index, 1);

    // Insert into destination
    destTasks.splice(destination.index, 0, movingTask);

    // Update category immediately
  movingTask.category = destCategory;

    // Update the state
    setTasks((prev) => ({
      ...prev,
      [sourceCategory]: sourceTasks,
      [destCategory]: destTasks,
    }));

    try {
      // Update the task category and position in the backend
      const tasksToUpdate = destTasks.map((task, index) => ({
        ...task,
        category: destCategory,
        position: index, // Add position field
      }));

      // Send all updated tasks in the destination category to the backend
      await Promise.all(
        tasksToUpdate.map((task) =>
          axios.put(`${API_URL}/tasks/${task._id}`, {
            category: task.category,
            position: task.position,
          })
        )
      );
      handleTaskUpdated();

      // Notify other clients through WebSocket
      tasksToUpdate.forEach((task) => {
        socket.emit("taskUpdated", task);
      });
    } catch (error) {
      console.error("Error updating task order:", error);
      fetchTasks(); // Revert to the original state if the update fails
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;
  
    try {
      const response = await axios.post(`${API_URL}/tasks`, newTask);
      const createdTask = response.data; // Assuming the server returns the created task
  
      // Update the state immediately
      setTasks((prev) => ({
        ...prev,
        [createdTask.category]: [...prev[createdTask.category], createdTask],
      }));
  
      // Reset the form
      setNewTask({
        title: "",
        description: "",
        category: "To-Do",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };



  const handleDeleteTask = async (taskId) => {
    if (!taskId) return;
  
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (!result.isConfirmed) return; // User canceled
  
    // Optimistically remove task from UI
    const previousTasks = { ...tasks };
    setTasks((prev) => {
      const newTasks = { ...prev };
      Object.keys(newTasks).forEach((category) => {
        newTasks[category] = newTasks[category].filter((t) => t._id !== taskId);
      });
      return newTasks;
    });
  
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
  
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting task:", error);
  
      // Restore previous tasks if API call fails
      setTasks(previousTasks);
  
      Swal.fire("Error!", "Failed to delete task. Please try again.", "error");
    }
  };
  

  const handleCategoryChange = async (taskId, newCategory) => {
    try {
      const taskToUpdate =
        tasks["To-Do"].find((t) => t._id === taskId) ||
        tasks["In Progress"].find((t) => t._id === taskId) ||
        tasks["Done"].find((t) => t._id === taskId);

      if (taskToUpdate) {
        await axios.put(`${API_URL}/tasks/${taskId}`, {
          category: newCategory,
        });
        handleTaskUpdated({ ...taskToUpdate, category: newCategory });
      }
    } catch (error) {
      console.error("Error changing task category:", error);
    }
  };

  return (
    <div className="p-6">
<div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
  <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3">
    {/* Task Title Input */}
    <input
      type="text"
      placeholder="Task title"
      value={newTask.title}
      onChange={(e) =>
        setNewTask((prev) => ({ ...prev, title: e.target.value }))
      }
      maxLength={50}
      required
      className="w-full sm:flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 text-sm"
    />

    {/* Task Description Textarea */}
    <textarea
      placeholder="Description (optional)"
      value={newTask.description}
      onChange={(e) =>
        setNewTask((prev) => ({ ...prev, description: e.target.value }))
      }
      maxLength={200}
      rows={2}
      className="w-full sm:flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 resize-none text-sm"
    />

    {/* Task Category Dropdown */}
    <select
      value={newTask.category}
      onChange={(e) =>
        setNewTask((prev) => ({ ...prev, category: e.target.value }))
      }
      className="w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200 appearance-none text-sm"
    >
      <option value="To-Do">To-Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>

    {/* Add Task Button */}
    <button
      type="submit"
      className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 shadow-md hover:shadow-lg active:bg-blue-700 text-sm"
    >
      Add Task
    </button>
  </form>
</div>



<DragDropContext onDragEnd={handleDragEnd}>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 md:p-6 ">
    {Object.entries(tasks).map(([category, categoryTasks]) => (
      <div 
        key={category} 
        className={`rounded-2xl shadow-xl p-3 sm:p-4 transition-all duration-300 ${
          category === "Done"
            ? "bg-green-50 dark:bg-green-900/20"
            : category === "In Progress"
            ? "bg-yellow-50 dark:bg-yellow-900/20"
            : "bg-blue-50 dark:bg-blue-900/20"
        }`}
      >
        <h2 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-center text-gray-800 dark:text-gray-100 truncate">
          {category}
        </h2>
        <Droppable droppableId={category}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`min-h-[150px] sm:min-h-[200px] rounded-xl p-2 sm:p-3 ${
                snapshot.isDraggingOver 
                  ? "bg-gray-100 dark:bg-gray-800/50" 
                  : "bg-white dark:bg-gray-800"
              } transition-colors duration-200 overflow-y-auto max-h-[calc(100vh-200px)]`}
            >
              {categoryTasks.map((task, index) => (
                <Draggable
                  key={task._id}
                  draggableId={task._id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`mb-3 sm:mb-4 rounded-xl shadow-md cursor-move bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
                        snapshot.isDragging
                          ? "shadow-xl ring-2 ring-indigo-500 dark:ring-indigo-400 scale-[1.02]"
                          : "hover:shadow-lg"
                      } transition-all duration-200`}
                    >
                      {editingTask === task._id ? (
                        // Edit Form
                        <form
                          onSubmit={(e) => handleUpdateTask(task._id, e)}
                          className="p-3 sm:p-4 space-y-3"
                        >
                          <input
                            type="text"
                            value={editedTask.title}
                            onChange={(e) =>
                              setEditedTask((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            maxLength={50}
                            required
                            className="w-full px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200 text-sm sm:text-base"
                          />
                          <textarea
                            value={editedTask.description}
                            onChange={(e) =>
                              setEditedTask((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                            maxLength={200}
                            className="w-full px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 min-h-[60px] sm:min-h-[80px] resize-y transition-all duration-200 text-sm sm:text-base"
                          />
                          <div className="flex gap-2 flex-wrap justify-end">
                            <button
                              type="submit"
                              className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 text-sm sm:text-base"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 text-sm sm:text-base"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        // Display Mode
                        <div className="p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
                          {/* Top Section: Number and Title */}
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              <span
                                className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-medium text-sm sm:text-base ${
                                  task.category === "Done"
                                    ? "bg-green-500 text-white"
                                    : task.category === "In Progress"
                                    ? "bg-yellow-500 text-white"
                                    : "bg-blue-500 text-white"
                                }`}
                              >
                                {index + 1}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate flex-1">
                              {task.title}
                            </h3>
                          </div>

                          {/* Middle Section: Description */}
                          {task.description && (
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {moment(task.timestamp).format("MMM DD, YYYY | hh:mm A")}
                          </p>

                          {/* Bottom Section: Actions */}
                          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
                            <select
                              value={task.category}
                              onChange={(e) =>
                                handleCategoryChange(task._id, e.target.value)
                              }
                              className={`w-full sm:w-32 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 appearance-none cursor-pointer bg-gradient-to-r transition-all duration-200 ${
                                task.category === "Done"
                                  ? "from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                                  : task.category === "In Progress"
                                  ? "from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700"
                                  : "from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                              }`}
                            >
                              <option value="To-Do">To-Do</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Done">Done</option>
                            </select>
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => handleEditTask(task)}
                                className="p-1 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-500 dark:hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                title="Edit Task"
                              >
                                <CiEdit size={18} className="sm:w-5 sm:h-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteTask(task._id)}
                                className="p-1 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500 dark:hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                                title="Delete Task"
                              >
                                <MdDeleteForever size={18} className="sm:w-5 sm:h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    ))}
  </div>
</DragDropContext>


    </div>
  );
};

export default WorkSpace;
