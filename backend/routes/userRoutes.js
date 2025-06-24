const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/userController');

// POST /api/signup
router.post('/signup', signupUser);

// POST /api/login
router.post('/login', loginUser);

// auth route
// router.get('/profile', authenticate, getProfile);

module.exports = router;
