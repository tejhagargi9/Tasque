// taskRoutes.js (Corrected)

const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const authenticate = require('../middleware/auth');

// This route still gets ALL tasks. We'll address this next.
router.get('/', authenticate, getTasks); 

router.post('/', authenticate, createTask);

router.put('/:id', authenticate, updateTask);

router.delete('/:id', authenticate, deleteTask);

module.exports = router;