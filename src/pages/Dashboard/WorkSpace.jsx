/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import moment from "moment";
import io from "socket.io-client";
import axios from "axios";

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
          newTasks[category] = newTasks[category].filter(
            (t) => t._id !== taskId
          );
        });
        newTasks[updatedTask.category].push(updatedTask);
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
  
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
  
      // Update the state immediately
      setTasks((prev) => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach((category) => {
          newTasks[category] = newTasks[category].filter((t) => t._id !== taskId);
        });
        return newTasks;
      });
    } catch (error) {
      console.error("Error deleting task:", error);
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
      <div className="mb-6">
        <form onSubmit={handleAddTask} className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
            maxLength={50}
            required
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description (optional)"
            value={newTask.description}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
            maxLength={200}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newTask.category}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, category: e.target.value }))
            }
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </form>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {Object.entries(tasks).map(([category, categoryTasks]) => (
            <div key={category} className={`rounded-lg shadow-lg p-2  ${
                category === "Done"
                  ? "bg-green-100 "
                  : category === "In Progress"
                  ? "bg-yellow-100 "
                  : "bg-blue-100 rounded-full "
              }`}>
              <h2 className="font-bold text-lg mb-4 text-center ">{category}</h2>
              <Droppable droppableId={category}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] rounded-lg p-2 ${
                      snapshot.isDraggingOver ? "bg-blue-50" : ""
                    }`}
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
                            className={`task-container mb-4 bg-white rounded-lg shadow cursor-move ${
                              snapshot.isDragging
                                ? "shadow-lg ring-2 ring-blue-500"
                                : ""
                            } hover:bg-gray-50`}
                          >
                            {editingTask === task._id ? (
                              // Edit Form
                              <form
                                onSubmit={(e) => handleUpdateTask(task._id, e)}
                                className="space-y-2"
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
                                  className="w-full px-2 py-1 border rounded"
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
                                  className="w-full px-2 py-1 border rounded"
                                />
                                <div className="flex gap-2">
                                  <button
                                    type="submit"
                                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-blue-600"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </form>
                            ) : (
                              // Display Mode
                              <div
                                className={`flex items-center justify-between p-2  dark:bg-gray-800 rounded-lg shadow-sm hover:border transition-shadow ${
                                  task.category === "Done"
                                    ? "bg-green-50 border-green-500 "
                                    : task.category === "In Progress"
                                    ? "bg-yellow-50 border-yellow-500 "
                                    : "bg-blue-50 border-blue-500 "
                                }`}
                              >
                                {/* Left Section: Task Number */}
                                <div className="w-10 flex justify-center">
                                  <span
                                    className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${
                                      task.category === "Done"
                                        ? "bg-green-500 text-white"
                                        : task.category === "In Progress"
                                        ? "bg-yellow-800 text-yellow-50"
                                        : "bg-blue-800 text-white"
                                    }`}
                                  >
                                    {index + 1}
                                  </span>
                                </div>

                                {/* Middle Section: Task Title & Description (Takes Full Space) */}
                                <div className="flex-1 pl-4">
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {task.title}
                                  </h3>
                                  {task.description && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                      {task.description}
                                    </p>
                                  )}
                                  <p className="text-sm text-gray-500">
  {moment(task.timestamp).format("MMM DD, YYYY | hh:mm A")}
</p>
                                </div>

                                {/* Right Section: Options Dropdown & Action Buttons */}
                                <div className="flex flex-col gap-1 items-center">
                                  {/* Edit & Delete Buttons Below Dropdown */}
                                  <div className="mt-2 flex gap-2">
                                    <button
                                      onClick={() => handleEditTask(task)}
                                      className={`p-2 cursor-pointer rounded-md ${
                                        task.category === "Done"
                                          ? "bg-green-500 text-white"
                                          : task.category === "In Progress"
                                          ? "bg-yellow-200 text-yellow-800"
                                          : "bg-blue-500 rounded-full text-white"
                                      }`}
                                      title="Edit Task"
                                    >
                                      <CiEdit />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteTask(task._id)}
                                      className="p-2  cursor-pointer rounded-md bg-red-500 dark:bg-red-900 text-white dark:text-red-300 hover:bg-red-500 dark:hover:bg-red-700 hover:text-white transition"
                                      title="Delete Task"
                                    >
                                      <MdDeleteForever />
                                    </button>
                                  </div>
                                  <div>
                                    {/* Category Dropdown */}
                                    <select
                                      value={task.category}
                                      onChange={(e) =>
                                        handleCategoryChange(
                                          task._id,
                                          e.target.value
                                        )
                                      }
                                      className={`relative px-3 py-2 text-sm text-center font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer ${
                                        task.category === "Done"
                                          ? "bg-green-500 text-white hover:bg-green-900"
                                          : task.category === "In Progress"
                                          ? "bg-yellow-200 text-yellow-900 hover:bg-yellow-900 hover:text-yellow-100"
                                          : "bg-blue-500 text-white hover:bg-blue-900"
                                      }`}
                                    >
                                      <option value="To-Do">
                                        To-Do
                                      </option>
                                      <option value="In Progress">
                                        In Progress
                                      </option>
                                      <option value="Done">Done</option>
                                      {/* Custom Arrow Icon */}
                                    </select>
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
