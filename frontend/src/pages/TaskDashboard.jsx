import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit2, Trash2, User, LogOut } from "lucide-react";

// The base URL for your backend API, configured in your .env file
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const TaskDashboard = () => {
  // Initialize tasks state as an empty array
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // To show a loading state

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();
  const userName = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).name
    : "";

  const usersId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : "";
  const token = localStorage.getItem("token");

  // 1. Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const filteredTasks = response.data.filter(
          (task) => task.userId === usersId // ✅ Filter tasks by userId
        );
        setTasks(filteredTasks);
        console.log("Fetched tasks:", response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Failed to fetch tasks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []); // CHANGED: Dependency array is now empty to fetch only once on mount.

  // 2. Add a new task
  const addTask = async () => {
    const usersId = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).id
      : "";

    if (newTaskTitle.trim()) {
      try {
        const response = await axios.post(
          `${API_URL}/tasks`,
          {
            title: newTaskTitle.trim(),
            userId: usersId, // ✅ Include userId in the body
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Add the new task returned from the API to the top of the list
        setTasks([response.data, ...tasks]);
        setNewTaskTitle("");
      } catch (error) {
        console.error("Error creating task:", error);
        alert("Failed to create task.");
      }
    }
  };

  // 3. Generic update function (NO CHANGE NEEDED)
  const handleUpdateTask = async (taskId, updateData) => {
    try {
      const response = await axios.put(
        `${API_URL}/tasks/${taskId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(
        tasks.map((task) => (task.id === taskId ? response.data.task : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task.");
    }
  };

  const updateTaskStatus = (id, newStatus) => {
    handleUpdateTask(id, { status: newStatus });
  };

  const saveEdit = () => {
    if (editTitle.trim()) {
      handleUpdateTask(editingTask, { title: editTitle.trim() });
    }
    setEditingTask(null);
    setEditTitle("");
  };

  // 4. Delete a task (NO CHANGE NEEDED)
  const deleteTask = async (id) => {
    const originalTasks = [...tasks];
    setTasks(tasks.filter((task) => task.id !== id));

    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Reverting changes.");
      setTasks(originalTasks);
    }
  };

  // --- END OF API INTEGRATION ---

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login"); // Redirect to login page
  };

  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTitle("");
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusTasks = (status) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  const getTaskCardBorder = (status) => {
    switch (status) {
      case "todo":
        return "border-l-4 border-l-red-500 border-2 border-gray-300";
      case "in-progress":
        return "border-l-4 border-l-yellow-500 border-2 border-gray-300";
      case "done":
        return "border-l-4 border-l-green-500 border-2 border-gray-300";
      default:
        return "border-2 border-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "text-red-600 bg-red-50";
      case "in-progress":
        return "text-yellow-600 bg-yellow-50";
      case "done":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const TaskCard = ({ task }) => (
    <div
      className={`bg-white ${getTaskCardBorder(
        task.status
      )} p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      {editingTask === task.id ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border-2 border-blue-300 rounded-md bg-white text-black focus:outline-none focus:border-blue-500"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="bg-green-500 text-white px-3 py-1 text-sm rounded-md hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="border-2 border-gray-300 text-gray-700 px-3 py-1 text-sm rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-gray-800 font-medium mb-3">{task.title}</h3>
          <div className="flex items-center justify-between">
            <select
              value={task.status}
              onChange={(e) => updateTaskStatus(task.id, e.target.value)}
              className={`border-2 border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:border-blue-500 ${getStatusColor(
                task.status
              )}`}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(task)}
                className="p-1 hover:bg-blue-100 border border-blue-300 rounded-md transition-colors"
              >
                <Edit2 size={16} className="text-blue-600" />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1 hover:bg-red-100 border border-red-300 rounded-md transition-colors"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b-4 border-blue-500 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-500 pl-3">
            Task Manager
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-300">
              <User size={20} className="text-blue-600" />
              {userName ? (
                <span className="text-gray-700 font-medium">{userName}</span>
              ) : (
                <span className="text-gray-400 italic">Guest</span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border-2 border-red-300 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut size={16} className="text-red-600" />
              <span className="text-red-600 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Add Task Form */}
        <div className="bg-white border-2 border-green-300 border-l-4 border-l-green-500 p-6 mb-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Plus size={24} className="text-green-500" />
            Add New Task
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title..."
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-green-500"
            />
            <button
              onClick={addTask}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 flex items-center gap-2 transition-colors shadow-sm"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border-2 border-purple-300 border-l-4 border-l-purple-500 p-4 mb-6 rounded-lg shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-3 top-3 text-purple-500"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-10 p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-purple-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        {/* Task Columns */}
        {isLoading ? (
          <div className="text-center text-gray-500 text-xl py-10">
            Loading tasks...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* To Do Column */}
            <div className="bg-white border-2 border-red-300 border-t-4 border-t-red-500 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-red-700 mb-4 border-b-2 border-red-200 pb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                To Do ({getStatusTasks("todo").length})
              </h2>
              {getStatusTasks("todo").map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>

            {/* In Progress Column */}
            <div className="bg-white border-2 border-yellow-300 border-t-4 border-t-yellow-500 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-yellow-700 mb-4 border-b-2 border-yellow-200 pb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                In Progress ({getStatusTasks("in-progress").length})
              </h2>
              {getStatusTasks("in-progress").map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>

            {/* Done Column */}
            <div className="bg-white border-2 border-green-300 border-t-4 border-t-green-500 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-green-700 mb-4 border-b-2 border-green-200 pb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Done ({getStatusTasks("done").length})
              </h2>
              {getStatusTasks("done").map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
