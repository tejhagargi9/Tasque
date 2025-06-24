const express = require('express');
const router = express.Router();
const {
  getTasks, // <-- CHANGED
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// GET /api/tasks (no query parameter needed)
router.get('/', getTasks); // <-- CHANGED

// POST /api/tasks
router.post('/', createTask);

// PUT /api/tasks/:id
router.put('/:id', updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', deleteTask);

module.exports = router;