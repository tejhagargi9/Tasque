const Task = require('../models/task.js'); // Assuming Task is a Sequelize model
// User model is no longer needed for getTasks and createTask
// const User = require('../models/User'); 

// GET /api/tasks - Get ALL tasks
const getTasks = async (req, res) => { // CHANGED: Renamed from getTasksByUser
  try {
    // REMOVED: The user_id check and where clause are gone.
    console.log('Fetching all taskss'); // For debugging purposes
    const tasks = await Task.findAll({ 
      order: [['createdAt', 'DESC']] 
    });
    console.log(`Found ${tasks.length} tasks`); // For debugging purposes
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// POST /api/tasks - Create a new task (no user association)
const createTask = async (req, res) => {
  try {
    console.log("Create task request received:", req.body);
    const { title, userId } = req.body; // ✅ Get both from frontend

    if (!title || !userId) {
      return res.status(400).json({ message: 'Title and userId are required' });
    }

    const newTask = await Task.create({ title, status: 'todo', userId }); 
    res.status(201).json(newTask);
  } catch (error) {
    console.error("ERROR CREATING TASK:", error); 
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};


// PUT /api/tasks/:id - Update a task's title or status (NO CHANGE NEEDED)
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title !== undefined) task.title = title;
    if (status !== undefined) task.status = status;

    await task.save();
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// DELETE /api/tasks/:id - Delete a task (NO CHANGE NEEDED)
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};


module.exports = {
  getTasks, // <-- CHANGED: Export the new function name
  createTask,
  updateTask,
  deleteTask,
};